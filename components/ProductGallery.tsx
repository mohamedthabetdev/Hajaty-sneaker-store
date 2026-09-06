"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { product } from "@/config/product";

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only trigger swipe if horizontal movement is dominant and exceeds 35px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        // Swiped left
        goTo(activeIndex + 1);
      } else {
        // Swiped right
        goTo(activeIndex - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden select-none">
      {/* Main product image container */}
      <div 
        className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-border-subtle touch-pan-y" 
        style={{ aspectRatio: '1/1' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3.5 z-10 grid place-items-center size-8 sm:size-10 rounded-full bg-white/95 shadow-md hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-all active:scale-90"
        >
          <ChevronRight className="size-4 sm:size-5 text-neutral-800" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="الصورة التالية"
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3.5 z-10 grid place-items-center size-8 sm:size-10 rounded-full bg-white/95 shadow-md hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary transition-all active:scale-90"
        >
          <ChevronLeft className="size-4 sm:size-5 text-neutral-800" aria-hidden="true" />
        </button>
      </div>

      {/* Thumbnail grid */}
      <div className="mt-2.5 sm:mt-3 w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`عرض الصورة ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`relative w-full overflow-hidden rounded-lg border-2 transition-all ${
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
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 80px" 
                className="object-contain" 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
