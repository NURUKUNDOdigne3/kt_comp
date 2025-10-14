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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const productImages = [
  {
    src: "https://macfinder.co.uk/wp-content/uploads/2023/12/img-MacBook-Pro-Retina-14-Inch-96139-scaled.jpg",
    alt: "MacBook Pro",
  },
  {
    src: "https://m.media-amazon.com/images/I/61si2lzARfL.jpg",
    alt: "Epson Printer",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXkPX67HY7CIyMamvPTeYWZ7SWYaOevYUMA&s",
    alt: "TP-Link Router",
  },
  {
    src: "https://uploads-eu-west-1.insided.com/sonos-en/attachment/67246f05-a47d-4e5f-8b53-4724bf52c644.png",
    alt: "Sonos Speaker",
  },
  {
    src: "https://m.media-amazon.com/images/I/81iPNmdC-vL._UF1000,1000_QL80_.jpg",
    alt: "ASUS Monitor",
  },
];

export default function EpicHeroSection() {
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-blue-50/20 to-cyan-50/30 py-16 px-4 overflow-hidden min-h-[90vh]-mt-10"
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-400 rounded-full" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-red-400 rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[65px]"
            >
              The ultimate product{" "}
              <span className="text-gray-900">with pleasure</span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              Let your product do the magic care for you. Change the quality of
              your personality by changing your appearance. Everything reflects
              your character and we&apos;re taking care of it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#computers"
                className="px-8 py-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Right Illustration Area */}
          <div className="relative">
            {/* Stats Card - Positioned over illustration */}
            <div
              ref={statsRef}
              className="absolute top-32 left-0 z-20 inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl"
            >
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-cyan-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">35K+</div>
                <div className="text-sm text-gray-600">
                  Products everyday on sale
                </div>
              </div>
            </div>

            {/* Main Illustration Circle */}
            <div
              ref={illustrationRef}
              className="relative w-full aspect-square max-w-2xl mx-auto"
            >
              {/* Large cyan circle background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-full opacity-80" />
              <div className="absolute inset-8 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full opacity-60" />

              {/* Product Image Slideshow */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full">
                  {/* Laptop Frame */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-3/4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl overflow-hidden">
                      {/* Screen with slideshow */}
                      <div className="absolute inset-2 bg-white rounded-md overflow-hidden">
                        {productImages.map((image, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                              index === currentImageIndex
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                            }`}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-contain p-2"
                              priority={index === 0}
                            />
                          </div>
                        ))}
                      </div>
                      {/* Person icon */}
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-16 bg-blue-900 rounded-t-full z-20" />
                    </div>
                  </div>

                  {/* Shopping cart icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg z-20">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>

                  {/* Book/Product icon */}
                  <div className="absolute bottom-8 left-8 w-10 h-12 bg-red-400 rounded shadow-lg z-20" />
                </div>
              </div>

              {/* Slideshow indicators */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentImageIndex
                        ? "w-8 bg-cyan-600"
                        : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Icons */}
              <div
                ref={(el) => {
                  if (el) floatingIconsRef.current[0] = el;
                }}
                className="absolute top-12 left-12 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </div>

              <div
                ref={(el) => {
                  if (el) floatingIconsRef.current[1] = el;
                }}
                className="absolute top-8 right-16 w-12 h-12 bg-red-400 rounded-full shadow-lg"
              />

              <div
                ref={(el) => {
                  if (el) floatingIconsRef.current[2] = el;
                }}
                className="absolute bottom-24 right-8 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </div>

              {/* Our Clients Badge */}
              {/* <div className="absolute bottom-8 right-12 bg-white rounded-2xl px-6 py-3 shadow-xl">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  Our Clients
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold">
                    4+
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Our Service:
          </h3>
          <div
            ref={servicesRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`${service.bgColor} rounded-2xl p-6 text-center space-y-3 hover:scale-105 transition-transform duration-200`}
                >
                  <div className="flex justify-center">
                    <Icon className={`w-12 h-12 ${service.iconColor}`} />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {service.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
