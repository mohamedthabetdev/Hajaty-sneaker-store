import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { storeConfig } from "@/config/product";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border-subtle">
      <div className="bg-brand-primary text-white text-center text-[10px] sm:text-xs lg:text-sm py-1.5 px-3 flex items-center justify-center gap-1.5 sm:gap-2">
        <Truck className="size-3 sm:size-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">الدفع عند الاستلام متاح لجميع محافظات مصر</span>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 lg:py-5">
        <Link
          href={storeConfig.storeUrl}
          className="flex items-center justify-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-4 rounded"
          aria-label={`زيارة الصفحة الرئيسية لـ ${storeConfig.storeName}`}
        >
          <Image
            src="/images/logo.png"
            alt={storeConfig.storeName}
            width={64}
            height={64}
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain"
            priority
          />
          <span className="font-extrabold text-lg sm:text-xl lg:text-2xl text-[#17181c]">
            {storeConfig.storeName}
          </span>
        </Link>
        <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500 text-center mt-1.5 sm:mt-2 hidden sm:block">
          المتجر الرسمي — منتج أصلي وضمان استبدال
        </p>
      </div>
    </header>
  );
}
