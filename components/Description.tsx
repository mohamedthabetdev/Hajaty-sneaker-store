"use client";

import { Package } from "lucide-react";
import { product } from "@/config/product";

export default function Description() {
  const { description } = product;

  const scrollToOrderForm = () => {
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 sm:py-14" aria-labelledby="description-heading">
      <h2 id="description-heading" className="text-xl sm:text-2xl font-extrabold mb-4">
        {description.title}
      </h2>
      <p className="text-neutral-600 leading-relaxed mb-6">{description.intro}</p>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
        {description.highlights.map((item) => (
          <div key={item.title} className="flex flex-col">
            <span className="font-bold text-sm text-[#17181c]">{item.title}</span>
            <span className="text-sm text-neutral-500">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-surface-muted border border-border-subtle p-4 mb-6">
        <h3 className="flex items-center gap-2 font-bold text-sm mb-2">
          <Package className="size-4 text-brand-primary" aria-hidden="true" />
          محتويات العبوة
        </h3>
        <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
          {description.boxContents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={scrollToOrderForm}
        className="w-full text-center font-semibold text-brand-primary hover:text-brand-primary-dark hover:underline transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded"
      >
        {description.closing}
      </button>
    </section>
  );
}
