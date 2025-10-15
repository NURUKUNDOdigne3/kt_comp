"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { type Product } from "@/components/ProductCard";

type Props = {
  products: Product[];
};

export default function FeaturedProductsCarousel({ products }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth : el.clientWidth / 1.2;
    const amount = direction === "left" ? -cardWidth - 16 : cardWidth + 16;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow ring-1 ring-black/5 p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:inline-flex"
        aria-label="Scroll left"
        onClick={() => scrollBy("left")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={scrollerRef}
        className="mt-6 flex edge-fade-x p-2 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hide scrollbar for Webkit */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[280px] sm:w-[300px]"
            data-card
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow ring-1 ring-black/5 p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:inline-flex"
        aria-label="Scroll right"
        onClick={() => scrollBy("right")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
