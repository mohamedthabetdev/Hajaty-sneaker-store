"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  label: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Alaa Hamed",
    rating: 5,
    comment: "بجد خفيف جدًا وريح رجلي طول اليوم، وسعره كويس جدًا بالنسبة لجودته",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 2,
    name: "Atef Ramadan",
    rating: 5,
    comment: "الخامة تريكو فعلًا وبتتنفس، مش بيحصل تعرق زي الكوتشيات التانية",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 3,
    name: "Tarek Hassan",
    rating: 5,
    comment: "طلبته واستخدمته في الجيم وطلع مناسب جدًا للتمارين والمشي",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 4,
    name: "عمرو عادل",
    rating: 5,
    comment: "حلو جدًا والمقاس مظبوط بالظبط زي المقاسات المكتوبة",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 5,
    name: "Mahmoud Nabil",
    rating: 5,
    comment: "وصل وجربته وكان مريح أكتر مما توقعت، والنعل طري فعلًا",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 6,
    name: "محمد فؤاد",
    rating: 5,
    comment: "طلبته للمشي وجربته كذا مرة وفي كل مرة حاسس براحة ممتازة",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 7,
    name: "Karim Ashraf",
    rating: 5,
    comment: "بجد اختيار كويس، جربته في النادي وكان ثابت وريح جدًا",
    label: "عميل يثق بمنتجنا",
  },
  {
    id: 8,
    name: "Khaled Samir",
    rating: 5,
    comment: "المنتج وصل في ميعاده واللون بالظبط زي الصور",
    label: "عميل يثق بمنتجنا",
  },
];

export default function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 sm:py-14 overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            آراء العملاء
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            تقييمات حقيقية من عملائنا الكرام
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="المراجعة السابقة"
            className="grid place-items-center size-10 rounded-full bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <ChevronRight className="size-5 text-neutral-700" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="المراجعة التالية"
            className="grid place-items-center size-10 rounded-full bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
          >
            <ChevronLeft className="size-5 text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Swiper Slider Container */}
      <div className="w-full max-w-full min-w-0 overflow-hidden">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          /* تعديل جوهري لتساوي الارتفاعات */
          className="!pb-4 [&_.swiper-wrapper]:items-stretch w-full max-w-full"
        >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="!h-auto flex">
            {/* h-full تضمن أخذ كامل الارتفاع المتاح */}
            <div className="w-full h-full flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 select-none">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-base text-neutral-900">
                      {review.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {review.label}
                    </p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`تقييم ${review.rating} من 5`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* Custom Pagination */}
      <div className="custom-swiper-pagination flex justify-center gap-1.5 mt-6 [&_.swiper-pagination-bullet]:size-2.5 [&_.swiper-pagination-bullet]:bg-neutral-300 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-neutral-900 [&_.swiper-pagination-bullet]:transition-all" />
    </section>
  );
}