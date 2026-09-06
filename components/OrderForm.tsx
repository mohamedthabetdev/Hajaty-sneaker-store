"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Loader2, MapPin, Minus, Phone, Plus, ShieldCheck, User } from "lucide-react";
import { product } from "@/config/product";
import { governorates } from "@/config/governorates";
import { calculateOrderPrice, validateOrder } from "@/lib/order";
import type { CreateOrderResponse, OrderFormData, PieceSelection } from "@/types/order";
import OfferSelector from "./OfferSelector";
import PriceSummary from "./PriceSummary";

type SubmitState = "idle" | "loading" | "success" | "error";

function emptyPieces(count: number): PieceSelection[] {
  return Array.from({ length: count }, () => ({}));
}

const initialForm: OrderFormData = {
  name: "",
  phone: "",
  phone2: "",
  governorate: "",
  address: "",
  quantity: 1,
  variantId: product.variants[0].id,
  pieceSelections: emptyPieces(product.variants[0].quantity),
  coupon: "",
};

export default function OrderForm() {
  const [form, setForm] = useState<OrderFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === form.variantId) ?? product.variants[0],
    [form.variantId],
  );

  const pricing = useMemo(
    () => calculateOrderPrice(form.variantId, form.quantity),
    [form.variantId, form.quantity],
  );

  // Keep the pieceSelections array in sync with how many pieces the chosen bundle has.
  useEffect(() => {
    setForm((prev) => {
      if (prev.pieceSelections.length === selectedVariant.quantity) return prev;
      return { ...prev, pieceSelections: emptyPieces(selectedVariant.quantity) };
    });
  }, [selectedVariant.quantity]);

  function updateField<K extends keyof OrderFormData>(key: K, value: OrderFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function updatePiece(pieceIndex: number, field: "color" | "size", value: string) {
    setForm((prev) => {
      const next = [...prev.pieceSelections];
      next[pieceIndex] = { ...next[pieceIndex], [field]: value };
      return { ...prev, pieceSelections: next };
    });
    setErrors((prev) => {
      const key = `piece_${pieceIndex}_${field}`;
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  // Group the flat piece_N_color / piece_N_size error keys for the OfferSelector UI.
  const pieceErrors = useMemo(() => {
    const grouped: Record<number, { color?: string; size?: string }> = {};
    for (const key of Object.keys(errors)) {
      const match = key.match(/^piece_(\d+)_(color|size)$/);
      if (!match) continue;
      const index = Number(match[1]);
      const field = match[2] as "color" | "size";
      grouped[index] = { ...grouped[index], [field]: errors[key] };
    }
    return grouped;
  }, [errors]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (state === "loading") return;

    const clientErrors = validateOrder(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setState("idle");
      const firstErrorField = Object.keys(clientErrors)[0];
      document
        .querySelector(`[name="${firstErrorField}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setState("loading");
    setErrors({});

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: CreateOrderResponse & { errors?: Record<string, string> } =
        await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setResultMessage(data.message || "حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.");
        setState("error");
        return;
      }

      setOrderId(data.orderId ?? "");
      setResultMessage(data.message);
      setState("success");
    } catch {
      setResultMessage("حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        id="order-form"
        role="status"
        className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center"
      >
        <ShieldCheck className="size-12 text-green-600 mx-auto mb-3" aria-hidden="true" />
        <h3 className="text-xl font-extrabold text-green-800 mb-1">تم استلام طلبك بنجاح</h3>
        {orderId && (
          <p className="text-sm text-green-700 mb-1">
            رقم الطلب: <span className="font-mono font-bold">{orderId}</span>
          </p>
        )}
        <p className="text-sm text-green-700">سنتواصل معك قريبًا لتأكيد الطلب.</p>
      </div>
    );
  }

  return (
    <form
      id="order-form"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border-subtle p-4 sm:p-5 flex flex-col gap-4"
    >
      <h2 className="text-lg font-extrabold">أكمل بيانات الطلب</h2>

      <OfferSelector
        selectedVariantId={form.variantId}
        onVariantChange={(variantId) => updateField("variantId", variantId)}
        pieceSelections={form.pieceSelections}
        onPieceChange={updatePiece}
        pieceErrors={pieceErrors}
      />

      <div>
        <span className="block text-sm font-semibold text-neutral-800 mb-2">الكمية</span>
        <div className="inline-flex items-center rounded-lg border border-border-subtle overflow-hidden">
          <button
            type="button"
            onClick={() => updateField("quantity", Math.max(1, form.quantity - 1))}
            className="p-2.5 hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
            aria-label="تقليل الكمية"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-bold tabular-nums" aria-live="polite">
            {form.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateField("quantity", Math.min(20, form.quantity + 1))}
            className="p-2.5 hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
            aria-label="زيادة الكمية"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
        {errors.quantity && (
          <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>
        )}
      </div>

      <div className="h-px bg-border-subtle" />

      <Field label="الاسم بالكامل" error={errors.name} icon={<User className="size-4" />}>
        <input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="اسمك"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="رقم الهاتف" error={errors.phone} icon={<Phone className="size-4" />}>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01xxxxxxxxx"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={inputClass(!!errors.phone)}
        />
      </Field>

      <Field label="رقم هاتف تاني (اختياري)" error={errors.phone2} icon={<Phone className="size-4" />}>
        <input
          name="phone2"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01xxxxxxxxx"
          value={form.phone2 ?? ""}
          onChange={(e) => updateField("phone2", e.target.value)}
          className={inputClass(!!errors.phone2)}
        />
      </Field>

      <Field label="المحافظة" error={errors.governorate} icon={<MapPin className="size-4" />}>
        <select
          name="governorate"
          value={form.governorate}
          onChange={(e) => updateField("governorate", e.target.value)}
          className={inputClass(!!errors.governorate)}
        >
          <option value="">اختر المحافظة</option>
          {governorates.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>

      <Field label="العنوان بالتفصيل" error={errors.address}>
        <textarea
          name="address"
          rows={3}
          placeholder="الشارع، رقم المبنى، أقرب علامة مميزة"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className={`${inputClass(!!errors.address)} resize-none`}
        />
      </Field>

      <Field label="هل لديك كوبون خصم؟ (اختياري)">
        <input
          name="coupon"
          type="text"
          placeholder="ادخل الكوبون"
          value={form.coupon ?? ""}
          onChange={(e) => updateField("coupon", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <fieldset className="rounded-lg border border-border-subtle p-3">
        <legend className="px-1 text-sm font-semibold text-neutral-800">اختر وسيلة الدفع</legend>
        <label className="flex items-center gap-3 rounded-lg border-2 border-brand-primary bg-red-50/40 px-4 py-3 cursor-default">
          <input type="radio" checked readOnly className="size-4 accent-[var(--brand-primary)]" />
          <span>
            <span className="block text-sm font-semibold">دفع عند الاستلام</span>
            <span className="block text-xs text-neutral-500">ادفع عند استلام طلبك</span>
          </span>
        </label>
      </fieldset>

      <PriceSummary
        shipping={pricing.shipping}
        grandTotal={pricing.grandTotal}
      />

      {state === "error" && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {resultMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-70 text-white font-extrabold text-base py-3.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            جاري إرسال الطلب...
          </>
        ) : (
          "اضغط هنا للشراء"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800 mb-1.5">
        {icon}
        {label}
      </span>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${
    hasError ? "border-red-400" : "border-border-subtle"
  }`;
}
