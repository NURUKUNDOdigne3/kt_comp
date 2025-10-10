"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, Shield, EyeIcon, Award, BarChart } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeHeroMonitor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid squares
      if (gridRef.current) {
        const squares = gridRef.current.children;
        gsap.from(squares, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          stagger: {
            amount: 1.5,
            from: "random",
          },
          ease: "power2.out",
        });

        // Continuous pulse animation for random squares
        Array.from(squares).forEach((square, i) => {
          if (Math.random() > 0.7) {
            gsap.to(square, {
              opacity: 0.3,
              duration: 2 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 2,
            });
          }
        });
      }
      // Title animation - slide in from left
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // Description fade and slide
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        });
      }

      // Button pop in
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.8,
        });
      }

      // Badges stagger in
      if (badgesRef.current) {
        gsap.from(badgesRef.current.children, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.1,
        });
      }

      // Image slide in from right
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: "power3.out",
          delay: 0.4,
        });

        // Subtle floating animation for image
        gsap.to(imageRef.current, {
          y: -10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      // Cards fade in with stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over RWF 99,000",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: EyeIcon,
      title: "Crystal-Clear Display",
      description: "Experience vibrant colors and sharp visuals",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Authentic products only",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-blue-50/30  px-4 transition-colors duration-300 overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-25"
        aria-hidden="true"
      >
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 border border-blue-500 dark:border-blue-400"
            style={{
              left: `${(i % 10) * 10}%`,
              top: `${Math.floor(i / 10) * 12.5}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay to dim the grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-800 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left content */}
          <div className="space-y-6">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              <span className="text-blue-600 dark:text-blue-500">ELEVATE</span>{" "}
              YOUR VIEW
            </h1>

            <p
              ref={descriptionRef}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              Find the perfect monitor for work, play, or creativity. Experience
              sharp visuals, vibrant colors, and smooth performance
            </p>

            {/* CTA Button */}
            <div ref={buttonRef}>
              <a
                href="#shop"
                className="inline-block px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Shop Now
              </a>
            </div>

            {/* Feature badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-6 pt-4">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right image */}
          <div
            ref={imageRef}
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Placeholder for product image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src="https://m.media-amazon.com/images/I/71Wg4PqSFTL.jpg"
                  alt="Product Image"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
