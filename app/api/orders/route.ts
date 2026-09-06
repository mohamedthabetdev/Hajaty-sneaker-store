import { NextRequest, NextResponse } from "next/server";
import { product } from "@/config/product";
import { governorates } from "@/config/governorates";
import { appendOrderToSheet } from "@/lib/google-sheets";
import { calculateOrderPrice, formatOrderDate, generateOrderId, validateOrder } from "@/lib/order";
import type { CreateOrderResponse, OrderFormData, PieceSelection } from "@/types/order";

// --- Very small in-memory rate limiter (per server instance) ---------------
// Prevents obvious abuse/spam without adding an external dependency.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function sanitizePieces(value: unknown): PieceSelection[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 10).map((p) => ({
    color: sanitize((p as PieceSelection)?.color) || undefined,
    size: sanitize((p as PieceSelection)?.size) || undefined,
  }));
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      const response: CreateOrderResponse = {
        success: false,
        message: "عدد كبير من المحاولات، من فضلك حاول مرة أخرى بعد قليل.",
      };
      return NextResponse.json(response, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      const response: CreateOrderResponse = {
        success: false,
        message: "حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const formData: OrderFormData = {
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      phone2: sanitize(body.phone2),
      governorate: sanitize(body.governorate),
      address: sanitize(body.address),
      quantity: Number(body.quantity) || 0,
      variantId: sanitize(body.variantId),
      pieceSelections: sanitizePieces(body.pieceSelections),
      coupon: sanitize(body.coupon) || undefined,
    };

    const errors = validateOrder(formData);
    if (!governorates.includes(formData.governorate)) {
      errors.governorate = "من فضلك اختر محافظة صحيحة من القائمة";
    }

    if (Object.keys(errors).length > 0) {
      const response: CreateOrderResponse & { errors: typeof errors } = {
        success: false,
        message: "من فضلك تأكد من صحة البيانات المدخلة.",
        errors,
      };
      return NextResponse.json(response, { status: 422 });
    }

    // NEVER trust price/total values from the client — always recompute here.
    const variant = product.variants.find((v) => v.id === formData.variantId)!;
    const { unitPrice, totalProducts, shipping, grandTotal } = calculateOrderPrice(
      formData.variantId,
      formData.quantity,
    );
    const totalPieces = variant.quantity * formData.quantity;

    const orderId = generateOrderId();
    const date = formatOrderDate();

    // Build a readable "piece 1: color/size | piece 2: color/size" summary for the sheet.
    const showPieceNumber = variant.quantity > 1;
    const colorAndSize =
      formData.pieceSelections
        .map((piece, index) => {
          const parts = [piece.color, piece.size].filter(Boolean).join("/");
          if (!parts) return null;
          return showPieceNumber ? `قطعة ${index + 1}: ${parts}` : parts;
        })
        .filter(Boolean)
        .join(" | ") || "-";

    try {
      await appendOrderToSheet({
        name: formData.name,
        phone: [formData.phone, formData.phone2].filter(Boolean).join(" / "),
        governorate: formData.governorate,
        address: formData.address,
        quantity: totalPieces,
        unitPrice,
        totalProducts,
        shipping,
        grandTotal,
        productName: product.name,
        colorAndSize,
        orderId,
        taagerId: product.taagerId || process.env.TAAGER_ID || "",
        date,
      });
    } catch (sheetError) {
      console.error("[orders] Failed to write to Google Sheets:", sheetError);
      const response: CreateOrderResponse = {
        success: false,
        message: "حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.",
      };
      return NextResponse.json(response, { status: 502 });
    }

    const response: CreateOrderResponse = {
      success: true,
      orderId,
      message: "تم استلام طلبك بنجاح، سنتواصل معك قريبًا لتأكيد الطلب.",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[orders] Unexpected error:", error);
    const response: CreateOrderResponse = {
      success: false,
      message: "حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
