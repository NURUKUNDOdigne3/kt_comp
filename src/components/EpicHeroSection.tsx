"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Monitor,
  TrendingUp,
  ShoppingCart,
  Heart,
  Award,
  FileText,
  DollarSign,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const productImages = [
  {
    src: "https://macfinder.co.uk/wp-content/uploads/2023/12/img-MacBook-Pro-Retina-14-Inch-96139-scaled.jpg",
    alt: "MacBook Pro",
    name: "MacBook Pro 14",
    price: "RWF 2,399,000",
  },
  {
    src: "https://m.media-amazon.com/images/I/61si2lzARfL.jpg",
    alt: "Epson Printer",
    name: "Epson EcoTank",
    price: "RWF 450,000",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXkPX67HY7CIyMamvPTeYWZ7SWYaOevYUMA&s",
    alt: "TP-Link Router",
    name: "TP-Link AX3000",
    price: "RWF 50,000",
  },
  {
    src: "https://uploads-eu-west-1.insided.com/sonos-en/attachment/67246f05-a47d-4e5f-8b53-4724bf52c644.png",
    alt: "Sonos Speaker",
    name: "Sonos One",
    price: "RWF 200,000",
  },
  {
    src: "https://m.media-amazon.com/images/I/81iPNmdC-vL._UF1000,1000_QL80_.jpg",
    alt: "ASUS Monitor",
    name: 'ASUS 27" 4K',
    price: "RWF 449,000",
  },
];

export default function EpicHeroSection() {
  // Enable lazy loading for better performance
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement[]>([]);

  // Auto-rotate product images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % productImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // Buttons animation
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: "back.out(1.7)",
        });
      }

      // Stats card animation
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.7)",
        });
      }

      // Illustration animation
      if (illustrationRef.current) {
        gsap.from(illustrationRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });

        // Floating animation
        gsap.to(illustrationRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating icons animation
      floatingIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.from(icon, {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            delay: 0.8 + index * 0.1,
            ease: "back.out(1.7)",
          });

          // Individual floating animation
          gsap.to(icon, {
            y: -10,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });

      // Services cards animation
      if (servicesRef.current) {
        gsap.from(servicesRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          delay: 1,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Monitor,
      title: "Electronic Products",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: TrendingUp,
      title: "In-Demand Products",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: FileText,
      title: "1-Year Warranty",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  const currentProduct = productImages[currentImageIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B1A2D] py-16 px-10 overflow-hidden rounded-[40px] mx-10 my-8"
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.1]"
            >
              <span className="text-white">KT Computer Supply</span>
              <br />
              <span className="text-[#3B9EFF]">Premium Electronics in Rwanda</span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-[15px] text-gray-400 leading-relaxed max-w-md"
            >
              Discover premium electronics and computer solutions in Rwanda. Get the best devices with competitive prices from KT Computer Supply. From high-performance laptops and professional printers to networking equipment and premium audio systems, we offer top-quality products from leading brands. Fast delivery across Kigali and Rwanda with expert technical support and warranty coverage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <a
                href="#computers"
                className="group px-8 py-4 bg-[#3B9EFF] hover:bg-[#2B8EEF] text-white font-semibold rounded-[14px] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                Explore Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Product Area */}
          <div className="relative">
            {/* Main Product Display */}
            <div
              ref={illustrationRef}
              className="relative w-full h-[500px] lg:h-[600px]"
            >
              {/* Decorative circles behind product - matching exact positions */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {/* Large blue circle */}
                <div className="absolute top-[15%] right-[10%] w-[350px] h-[350px] bg-[#3B9EFF] rounded-full" />

                {/* Light gray/white circle */}
                <div className="absolute top-[20%] right-[5%] w-[280px] h-[280px] bg-white/90 rounded-full" />

                {/* Pink/salmon circle */}
                <div className="absolute bottom-[15%] right-[15%] w-[200px] h-[200px] bg-[#FF9B9B] rounded-full" />

                {/* Orange circle */}
                <div className="absolute bottom-[25%] right-[8%] w-[140px] h-[140px] bg-[#FFA366] rounded-full" />

                {/* Small blue circle bottom right */}
                <div className="absolute bottom-[10%] right-[25%] w-[120px] h-[120px] bg-[#3B9EFF] rounded-full" />
              </div>

              {/* Product Image with smooth transitions */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative w-[400px] h-[500px]">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentImageIndex
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-95 z-0"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={`${image.name} - Premium ${image.name} available at KT Computer Supply Rwanda`}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info Card - positioned like in image */}
              <div
                ref={statsRef}
                className="absolute top-[40%] right-0 lg:right-8 z-20 bg-white rounded-[20px] px-5 py-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-[12px] flex items-center justify-center overflow-hidden relative">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentImageIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900 transition-all duration-500">
                      {currentProduct.name}
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Price:{" "}
                      <span className="text-gray-900 font-semibold">
                        {currentProduct.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
