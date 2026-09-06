import type { Product } from "@/types/order";

/**
 * Single source of truth for all product data.
 * Edit this file only — do not duplicate product data in components.
 */
export const product: Product = {
  id: "fomfort-run-sneaker",
  name: "كوتشي تريكو مستورد FomFort RUN",
  shortName: "كوتشي تريكو مستورد",
  category: "أحذية رجالي",
  price: 425,
  originalPrice: 600,
  shipping: 45,
  currency: "ج.م",
  rating: 5.0,
  reviewsCount: 1351,
  stockLeft: 18,
  images: [
    "/images/product/shoe-colors.webp",
    "/images/product/shoe-grey.webp",
    "/images/product/shoe-black.webp",
    "/images/product/shoe-white.webp",
  ],
  colors: ["أسود", "أبيض", "رمادي"],
  sizes: ["45", "44", "43", "42", "41"],
  variants: [
    {
      id: "single",
      label: "سعر القطعة بـ425 جنية",
      quantity: 1,
      price: 425,
      originalPrice: 600,
    },
    {
      id: "double",
      label: "عرض القطعتين بـ779 جنية",
      quantity: 2,
      price: 779,
      originalPrice: 1200,
      badge: "الاكثر مبيعاً + شحن مجاني",
      freeShipping: true,
    },
    {
      id: "triple",
      label: "عرض الـ3 قطع بـ1080 جنية",
      quantity: 3,
      price: 1080,
      originalPrice: 1800,
      badge: "وفر اكتر + شحن مجاني",
      freeShipping: true,
    },
  ],
  features: [
    {
      icon: "shield",
      title: "خامة تريكو مريحة",
      description: "شبك تريكو خفيف وسهل التهوية بيدي راحة طول اليوم.",
    },
    {
      icon: "move",
      title: "نعل مرن وطري",
      description: "نعل بيمتص الصدمات ومناسب للمشي والحركة الطويلة.",
    },
    {
      icon: "sliders",
      title: "رباط قابل للضبط",
      description: "تقدر تظبط درجة الإحكام اللي تريحك.",
    },
    {
      icon: "hand",
      title: "سهل اللبس والخلع",
      description: "تصميم عملي بحلقة خلفية لسهولة الارتداء.",
    },
    {
      icon: "check",
      title: "تصميم عصري",
      description: "يناسب الملابس الرياضية والكاجوال في نفس الوقت.",
    },
    {
      icon: "activity",
      title: "مناسب للاستخدام اليومي",
      description: "المشي، الجيم، المشاوير، والاستخدام اليومي.",
    },
  ],
  description: {
    title: "كوتشي تريكو مستورد FomFort RUN – راحة وخفة طول اليوم",
    intro:
      "بتدور على كوتشي خفيف ومريح تلبسه طول اليوم من غير ما ترهق رجلك؟ FomFort RUN مصنوع من خامة تريكو شبكية بتدي تهوية ممتازة، مع نعل طري بيمتص الصدمات.",
    highlights: [
      {
        icon: "shield",
        title: "خامة تريكو مريحة",
        description: "شبك تريكو خفيف وسهل التهوية بيدي راحة طول اليوم.",
      },
      {
        icon: "move",
        title: "نعل مرن وطري",
        description: "بيمتص الصدمات ومناسب للمشي والحركة الطويلة.",
      },
      {
        icon: "sliders",
        title: "رباط قابل للضبط",
        description: "تقدر تظبط درجة الإحكام اللي تريحك.",
      },
      {
        icon: "hand",
        title: "سهل اللبس والخلع",
        description: "تصميم عملي بحلقة خلفية لسهولة الارتداء.",
      },
      {
        icon: "check",
        title: "تصميم عصري",
        description: "يناسب الملابس الرياضية والكاجوال في نفس الوقت.",
      },
      {
        icon: "activity",
        title: "مناسب لكل الأنشطة",
        description: "المشي، الجيم، المشاوير، والاستخدام اليومي.",
      },
    ],
    boxContents: ["كوتشي تريكو مستورد FomFort RUN (زوج واحد لكل قطعة مطلوبة)"],
    closing: "اطلبه دلوقتي واستمتع براحة تدوم طول اليوم! 👟",
  },
  taagerId: "",
};

export const storeConfig = {
  storeName: "حجاتي استور",
  storeUrl: "https://www.hajaty.store/",
  whatsappNumber: "201000000000",
  contactEmail: "hajatystore2020@gmail.com",
  address: "مدينة نصر، الحي السادس",
  socials: {
    facebook: "https://www.facebook.com/HajatyStore1",
    instagram: "https://www.instagram.com/hagatystor",
    tiktok: "https://www.tiktok.com/@hagatystorr?_t=8q2XDsU5v&_r=1",
  },
};

export const seoConfig = {
  title: "كوتشي تريكو مستورد FomFort RUN | حجاتي استور",
  description:
    "كوتشي تريكو مستورد خفيف ومريح، خامة شبكية عالية الجودة ونعل مرن. اطلب الآن مع الدفع عند الاستلام.",
  ogImage: "/images/product/shoe-colors.webp",
  siteUrl: "https://sneaker.hajaty.store",
};
