"use client";

import { useState, useEffect } from "react";
import { Eye, Star } from "lucide-react";
import { product } from "@/config/product";

// Generate a random number between min and max (inclusive)
const getRandomViewers = () => {
  return Math.floor(Math.random() * (350 - 290 + 1)) + 290;
};

export default function ProductInfo() {
  const [viewersCount, setViewersCount] = useState<number | null>(null);

  useEffect(() => {
    // Set initial value on client side only
    setViewersCount(getRandomViewers());

    // Update the viewers count every 30 seconds
    const interval = setInterval(() => {
      setViewersCount(getRandomViewers());
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-sm text-brand-primary font-semibold mb-1">{product.category}</p>
      <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug text-[#17181c]">
        {product.name}
      </h1>

      <div className="flex flex-wrap items-center gap-3 mt-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-4 ${
                i < Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-neutral-300"
              }`}
              aria-hidden="true"
            />
          ))}
          <span className="text-sm font-semibold text-neutral-700 ms-1">
            ({product.reviewsCount} تقييم)
          </span>
        </div>
        {viewersCount !== null && (
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 bg-surface-muted rounded-full px-2.5 py-1">
            <Eye className="size-3.5" aria-hidden="true" />
            <span className="font-semibold">{viewersCount}</span>
            يشاهد هذا المنتج الآن
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-3 mt-4">
        <span className="text-3xl font-extrabold text-brand-primary">
          {product.price} {product.currency}
        </span>
        <span className="text-lg text-neutral-400 line-through">
          {product.originalPrice} {product.currency}
        </span>
        <span className="text-xs font-bold text-white bg-brand-accent rounded-full px-2 py-1">
          خصم {Math.round((1 - product.price / product.originalPrice) * 100)}٪
        </span>
      </div>

      <p className="text-sm text-neutral-500 mt-2">
        فقط متبقي <span className="font-bold text-brand-primary">{product.stockLeft}</span> قطعة
      </p>
    </div>
  );
}
