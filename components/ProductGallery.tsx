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
    <div className="w-full max-w-full overflow-hidden">
      {/* Main product image */}
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-border-subtle" style={{ aspectRatio: '1/1' }}>
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${product.name} - صورة ${activeIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          className="object-contain"
          priority={activeIndex === 0}
        />

        {/* Navigation buttons */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="الصورة السابقة"
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 grid place-items-center size-8 sm:size-10 rounded-full bg-white/95 shadow-md hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-all"
        >
          <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="الصورة التالية"
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 grid place-items-center size-8 sm:size-10 rounded-full bg-white/95 shadow-md hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-all"
        >
          <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Thumbnail grid */}
      <div className="mt-2 sm:mt-3 w-full overflow-hidden">
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`عرض الصورة ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`relative w-full overflow-hidden rounded sm:rounded-md lg:rounded-lg border-2 transition-all ${
                activeIndex === index 
                  ? "border-brand-primary shadow-[inset_0_0_0_1px_rgb(162_0_21_/_0.3)]" 
                  : "border-border-subtle hover:border-brand-primary/50"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
              style={{ aspectRatio: '1/1' }}
            >
              <Image 
                src={src} 
                alt="" 
                fill 
                sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 80px" 
                className="object-contain" 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
