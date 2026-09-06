"use client";

import Image from "next/image";
import { product } from "@/config/product";

export default function StickyMobileBar() {
  function scrollToForm() {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white border-t border-border-subtle shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2.5 flex items-center gap-3 w-full max-w-full">
      <div className="relative size-11 rounded-lg overflow-hidden shrink-0 bg-surface-muted">
        <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-neutral-500 truncate">{product.shortName}</p>
        <p className="font-extrabold text-brand-primary text-sm">
          {product.price} {product.currency}
        </p>
      </div>
      <button
        type="button"
        onClick={scrollToForm}
        className="shrink-0 rounded-lg bg-brand-primary text-white font-bold text-sm px-5 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        اطلب الآن
      </button>
    </div>
  );
}
