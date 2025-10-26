"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function WelcomeHero() {
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      gsap.from(text, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    }

    const features = featuresRef.current;
    if (features) {
      gsap.from(features.children, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: features,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    const brands = brandsRef.current;
    if (brands) {
      gsap.from(brands, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brands,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }
    const dimEl = dimRef.current;
    if (dimEl) {
      gsap.fromTo(
        dimEl,
        { opacity: 0 },
        {
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: "#welcome-hero",
            start: "top top",
            end: "+=150%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="welcome-hero" className="h-screen w-full relative">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        // loop
        muted
        playsInline
      >
        <source src="/videos/computer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        ref={dimRef}
        className="absolute inset-0 bg-black pointer-events-none opacity-0 z-20 rounded-[0px_0px_20px_20px] shadow-md"
        aria-hidden
      />
      <div
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 rounded-2xl py-4 px-4 backdrop-blur-lg"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
          Power Your Work. Elevate Your Play.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-bold text-black  max-w-2xl mx-auto">
          Premium laptops, desktops, and accessories from the brands you
          trust—curated for performance and reliability.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#shop"
            className="rounded-lg bg-blue-600 text-white px-6 py-3 font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Shop Now
          </a>
          <a
            href="#learn"
            className="rounded-lg border border-gray-300 bg-white text-gray-800 px-6 py-3 font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-4">
        <div
          ref={featuresRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="backdrop-blur bg-white/70 border border-white/60 rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">
              Free & Fast Shipping
            </div>
            <div className="text-sm text-gray-600">
              On orders over $99, nationwide.
            </div>
          </div>
          <div className="backdrop-blur bg-white/70 border border-white/60 rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">
              24/7 Expert Support
            </div>
            <div className="text-sm text-gray-600">
              Real people, real tech help.
            </div>
          </div>
          <div className="backdrop-blur bg-white/70 border border-white/60 rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">
              Warranty Guarantee
            </div>
            <div className="text-sm text-gray-600">
              Hassle-free returns and coverage.
            </div>
          </div>
        </div>
      </div>

      {/* Brand strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-4">
        <div
          ref={brandsRef}
          className="flex items-center justify-center gap-6 md:gap-10 opacity-90"
        >
          {[
            { name: "Apple", src: "/brands/apple.png" },
            { name: "Dell", src: "/brands/dell.png" },
            { name: "HP", src: "/brands/hp.png" },
            { name: "Lenovo", src: "/brands/lenovo.png" },
            { name: "Asus", src: "/brands/asus.png" },
            { name: "Acer", src: "/brands/acer.png" },
          ].map((b) => (
            <div
              key={b.name}
              className="relative h-6 w-16 sm:h-8 sm:w-20 grayscale hover:grayscale-0 transition"
            >
              <Image
                src={b.src}
                alt={`${b.name} logo`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
