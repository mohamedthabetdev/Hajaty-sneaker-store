import { MessageCircle } from "lucide-react";
import { storeConfig, product } from "@/config/product";

export default function WhatsAppButton() {
  const message = encodeURIComponent(`مرحبًا، عندي استفسار عن منتج ${product.shortName}`);
  const href = `https://wa.me/${storeConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-20 lg:bottom-6 left-4 z-50 grid place-items-center size-13 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <MessageCircle className="size-7" aria-hidden="true" fill="white" />
    </a>
  );
}
