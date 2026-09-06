import { product } from "@/config/product";

interface PriceSummaryProps {
  shipping: number;
  grandTotal: number;
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-1.5 ${
        emphasis ? "text-base font-extrabold text-[#17181c]" : "text-sm text-neutral-600"
      }`}
    >
      <span>{label}</span>
      <span className={emphasis ? "text-brand-primary" : ""}>{value}</span>
    </div>
  );
}

export default function PriceSummary({
  shipping,
  grandTotal,
}: PriceSummaryProps) {
  return (
    <div className="rounded-xl bg-surface-muted border border-border-subtle p-4">
      <Row
        label="الشحن"
        value={shipping === 0 ? "مجاني" : `${shipping} ${product.currency}`}
      />
      <div className="h-px bg-border-subtle my-1.5" />
      <Row label="الإجمالي الكلي" value={`${grandTotal} ${product.currency}`} emphasis />
    </div>
  );
}
