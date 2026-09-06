"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { product } from "@/config/product";

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-full flex-shrink-0">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-surface-muted border border-border-subtle">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${product.name} - صورة ${activeIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          className="object-cover"
          priority={activeIndex === 0}
        />

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="الصورة السابقة"
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 grid place-items-center size-8 sm:size-9 rounded-full bg-white/90 shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-colors"
        >
          <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="الصورة التالية"
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 grid place-items-center size-8 sm:size-9 rounded-full bg-white/90 shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-colors"
        >
          <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-2 sm:mt-3 grid grid-cols-6 gap-1.5 sm:gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`عرض الصورة ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`relative aspect-square overflow-hidden rounded-md sm:rounded-lg border-2 transition ${
              activeIndex === index ? "border-brand-primary" : "border-transparent"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary`}
          >
            <Image src={src} alt="" fill sizes="(max-width: 640px) 15vw, 80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
