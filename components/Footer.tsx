import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { storeConfig } from "@/config/product";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.9 2 14.56 2 11.73 2 9.75 3.66 9.75 6.7v2.8H6.5v4h3.25V22h4.25v-8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.25.07 1.62.07 4.81 0 3.2 0 3.56-.07 4.81-.15 3.21-1.66 4.77-4.92 4.92-1.25.06-1.61.07-4.85.07-3.2 0-3.56 0-4.81-.07-3.26-.15-4.77-1.72-4.92-4.92-.06-1.25-.07-1.61-.07-4.81 0-3.19.01-3.56.07-4.81.15-3.22 1.67-4.77 4.92-4.92 1.25-.07 1.61-.07 4.81-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.72 2.7 21.3.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 grid gap-6 sm:gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-extrabold text-base sm:text-lg mb-2 sm:mb-3">{storeConfig.storeName}</h2>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/90">
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 sm:size-4 shrink-0" aria-hidden="true" />
              <span className="break-words">{storeConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 sm:size-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{storeConfig.contactEmail}</span>
            </li>
          </ul>
          <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Link
              href={storeConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
              className="grid place-items-center size-8 sm:size-9 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <FacebookIcon />
            </Link>
            <Link
              href={storeConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="انستقرام"
              className="grid place-items-center size-8 sm:size-9 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={storeConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تيك توك"
              className="grid place-items-center size-8 sm:size-9 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <TikTokIcon />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-extrabold text-base sm:text-lg mb-2 sm:mb-3">روابط مهمة</h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            الدفع عند الاستلام متاح لجميع محافظات مصر. لأي استفسار حول طلبك يمكنك التواصل معنا عبر
            واتساب أو البريد الإلكتروني.
          </p>
        </div>
      </div>
      <div className="border-t border-white/15 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-white/70 px-4">
        © {new Date().getFullYear()} {storeConfig.storeName}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
