"use client";

import { product } from "@/config/product";
import type { PieceSelection } from "@/types/order";

interface OfferSelectorProps {
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
  pieceSelections: PieceSelection[];
  onPieceChange: (pieceIndex: number, field: "color" | "size", value: string) => void;
  pieceErrors?: Record<number, { color?: string; size?: string }>;
}

export default function OfferSelector({
  selectedVariantId,
  onVariantChange,
  pieceSelections,
  onPieceChange,
  pieceErrors,
}: OfferSelectorProps) {
  return (
    <fieldset className="rounded-xl border border-border-subtle p-3">
      <legend className="flex items-center gap-2 px-1 text-sm font-bold text-neutral-800">
        اختر العرض المناسب
      </legend>
      <p className="px-1 text-xs text-neutral-500 mb-3">وفر أكتر عند شرائك أكثر مع العروض</p>

      <div className="flex flex-col gap-2">
        {product.variants.map((variant) => {
          const checked = selectedVariantId === variant.id;
          return (
            <label
              key={variant.id}
              className={`relative flex flex-col gap-0 rounded-lg border-2 cursor-pointer transition ${
                checked ? "border-brand-primary bg-red-50/40" : "border-border-subtle"
              }`}
            >
              {variant.badge && (
                <span className="absolute -top-2.5 right-4 bg-brand-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {variant.badge}
                </span>
              )}

              <span className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="variant"
                    value={variant.id}
                    checked={checked}
                    onChange={() => onVariantChange(variant.id)}
                    className="size-4 accent-[var(--brand-primary)]"
                  />
                  <span className="text-sm font-semibold text-neutral-800">{variant.label}</span>
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="font-extrabold text-brand-primary">
                    {variant.price} {product.currency}
                  </span>
                  {variant.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      {variant.originalPrice} {product.currency}
                    </span>
                  )}
                </span>
              </span>

              {checked && (
                <div className="px-4 pb-4">
                  {Array.from({ length: variant.quantity }).map((_, pieceIndex) => (
                    <div key={pieceIndex}>
                      {pieceIndex > 0 && <div className="h-px bg-border-subtle my-3" />}
                      <PieceFields
                        pieceNumber={pieceIndex + 1}
                        selection={pieceSelections[pieceIndex] ?? {}}
                        onChange={(field, value) => onPieceChange(pieceIndex, field, value)}
                        error={pieceErrors?.[pieceIndex]}
                      />
                    </div>
                  ))}
                </div>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function PieceFields({
  pieceNumber,
  selection,
  onChange,
  error,
}: {
  pieceNumber: number;
  selection: PieceSelection;
  onChange: (field: "color" | "size", value: string) => void;
  error?: { color?: string; size?: string };
}) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {product.colors.length > 0 && (
        <p className="text-sm font-bold text-neutral-800 mb-2">
          يرجى اختيار الوان والمقاس للقطعة{" "}
          {product.variants.some((v) => v.quantity > 1) ? `رقم ${pieceNumber}` : ""}
        </p>
      )}

      {product.colors.length > 0 && (
        <div className="mb-3">
          <span className="block text-xs font-semibold text-neutral-600 mb-1.5">الوان</span>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const active = selection.color === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange("color", color)}
                  aria-pressed={active}
                  className={`rounded-lg border-2 px-4 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                      : "border-border-subtle text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
          {error?.color && <p className="text-xs text-red-600 mt-1">{error.color}</p>}
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <span className="block text-xs font-semibold text-neutral-600 mb-1.5">المقاس</span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const active = selection.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onChange("size", size)}
                  aria-pressed={active}
                  className={`size-10 grid place-items-center rounded-lg border-2 text-sm font-semibold transition ${
                    active
                      ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                      : "border-border-subtle text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {error?.size && <p className="text-xs text-red-600 mt-1">{error.size}</p>}
        </div>
      )}
    </div>
  );
}
