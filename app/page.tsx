import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import CountdownTimer from "@/components/CountdownTimer";
import OrderForm from "@/components/OrderForm";
import Features from "@/components/Features";
import Description from "@/components/Description";
import Reviews from "@/components/Reviews";
import StickyMobileBar from "@/components/StickyMobileBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pb-24 lg:pb-0">
        <section className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-10 grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* Gallery sticky on desktop, scrolls naturally on mobile */}
          <div className="relative self-start lg:sticky lg:top-6 w-full max-w-full overflow-hidden">
            <ProductGallery />
          </div>

          {/* Form column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <ProductInfo />
            <CountdownTimer />
            <OrderForm />
          </div>

        </section>

        <div className="h-px bg-border-subtle max-w-6xl mx-auto" />

        <Features />

        <div className="h-px bg-border-subtle max-w-6xl mx-auto" />

        <Description />

        <div className="h-px bg-border-subtle max-w-6xl mx-auto" />

        <Reviews />
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}