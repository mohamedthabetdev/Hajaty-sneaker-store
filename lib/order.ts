import { product } from "@/config/product";
import type { OrderCalculation, OrderFormData } from "@/types/order";

/**
 * Generates a unique, human-readable order ID.
 * Format: ORD-YYYYMMDD-XXXX (XXXX is a random uppercase hex/alphanumeric suffix).
 */
export function generateOrderId(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${y}${m}${d}-${suffix}`;
}

/**
 * Formats a date as "DD/MM/YYYY HH:mm" in Africa/Cairo local time.
 */
export function formatOrderDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";

  return `${get("day")}/${get("month")}/${get("year")} ${get("hour")}:${get("minute")}`;
}

/**
 * Calculates final pricing server-side using ONLY trusted product configuration.
 * Never trust price/total values sent from the client.
 */
export function calculateOrderPrice(variantId: string, quantity: number = 1): OrderCalculation {
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;

  const unitPrice = variant.price; // price per bundle (e.g. "2 pieces for 749")
  const totalProducts = unitPrice * safeQuantity;
  const shipping = variant.freeShipping ? 0 : product.shipping;
  const grandTotal = totalProducts + shipping;

  return { unitPrice, totalProducts, shipping, grandTotal };
}

const EGYPT_PHONE_REGEX = /^01[0125][0-9]{8}$/;

export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Server-side (and reusable client-side) validation. Mirrors the rules in
 * the client form so the API route never trusts the client alone.
 */
export function validateOrder(data: Partial<OrderFormData>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "من فضلك أدخل الاسم بالكامل";
  }

  if (!data.phone || !EGYPT_PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "من فضلك أدخل رقم هاتف صحيح";
  }

  if (data.phone2 && data.phone2.trim() && !EGYPT_PHONE_REGEX.test(data.phone2.trim())) {
    errors.phone2 = "رقم الهاتف الثاني غير صحيح";
  }

  if (!data.governorate || !data.governorate.trim()) {
    errors.governorate = "من فضلك اختر المحافظة";
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.address = "من فضلك أدخل العنوان بالتفصيل";
  }

  if (!data.quantity || data.quantity < 1) {
    errors.quantity = "الكمية يجب أن تكون أكبر من 0";
  }

  const variant = product.variants.find((v) => v.id === data.variantId);
  if (!data.variantId || !variant) {
    errors.variantId = "من فضلك اختر العرض المناسب";
    return errors;
  }

  const selections = data.pieceSelections ?? [];
  for (let i = 0; i < variant.quantity; i++) {
    const piece = selections[i] ?? {};
    if (product.colors.length > 0 && !piece.color) {
      errors[`piece_${i}_color`] = "من فضلك اختر اللون";
    }
    if (product.sizes.length > 0 && !piece.size) {
      errors[`piece_${i}_size`] = "من فضلك اختر المقاس";
    }
  }

  return errors;
}
