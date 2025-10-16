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
  Play,
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement[]>([]);
  const specsRef = useRef<HTMLDivElement>(null);
  const roundedBannerRef = useRef<HTMLDivElement>(null);
  const storesCtaRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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

      // Specs section
      if (specsRef.current) {
        gsap.from(specsRef.current, {
          scrollTrigger: { trigger: specsRef.current, start: "top 80%" },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Rounded feature banner
      if (roundedBannerRef.current) {
        gsap.from(roundedBannerRef.current, {
          scrollTrigger: { trigger: roundedBannerRef.current, start: "top 85%" },
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Nearby stores CTA
      if (storesCtaRef.current) {
        gsap.from(storesCtaRef.current, {
          scrollTrigger: { trigger: storesCtaRef.current, start: "top 85%" },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Testimonials block
      if (testimonialsRef.current) {
        gsap.from(testimonialsRef.current, {
          scrollTrigger: { trigger: testimonialsRef.current, start: "top 85%" },
          opacity: 0,
          y: 30,
          duration: 0.8,
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

  const testimonials = [
    {
      quote:
        "This watch is amazing! Affordable price. I strongly recommend it to everyone interested in fashion & tech!",
      name: "John Carter",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      quote:
        "Beautiful design and buttery-smooth experience. The battery life actually matches the promise.",
      name: "Amelia Ross",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      quote:
        "The perfect companion for daily use. Love the minimalist UI and straps.",
      name: "David Kim",
      role: "Engineer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-blue-50/20 to-cyan-50/30 py-16 px-4 overflow-hidden -mt-10"
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-400 rounded-full" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-red-400 rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* 1) HERO (pixel-perfect to reference) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="text-gray-500 text-lg">Be online always and everywhere</div>
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[65px]"
            >
              For All Seasons
              <br />
              <span className="text-gray-900">Any Circumstances</span>
            </h1>

            <p
              ref={descriptionRef}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#purchase"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Purchase Now
              </a>
              <a
                href="#video"
                className="px-8 py-4 bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 font-semibold rounded-full shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> Watch Video
              </a>
            </div>
          </div>

          {/* Right Illustration Area */}
          <div className="relative">
            {/* Stats Card - Positioned over illustration */}
            <div
              ref={statsRef}
              className="absolute top-32 left-0 z-20 inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border-1 border-gray-200"
            >
              {/* <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-cyan-600" />
              </div> */}
              <div>
                {/* <div className="text-2xl font-bold text-gray-900">35K+</div> */}
                {/* <div className="text-sm text-gray-600">
                  Products everyday on sale
                </div> */}
              </div>
            </div>
    
            {/* Main Illustration - Two overlapping watches with topo bg */}
            <div ref={illustrationRef} className="relative w-full aspect-[4/3] max-w-2xl mx-auto">
              {/* Topo background */}
              <div className="absolute -inset-10">
                <svg viewBox="0 0 600 400" className="w-full h-full opacity-30 text-cyan-300">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop stopColor="#67e8f9" />
                      <stop offset="1" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#g)" strokeWidth="1">
                    <path d="M50,200 C150,100 450,100 550,200 C450,300 150,300 50,200 Z" />
                    <path d="M90,200 C170,130 430,130 510,200 C430,270 170,270 90,200 Z" />
                    <path d="M130,200 C190,160 410,160 470,200 C410,240 190,240 130,200 Z" />
                  </g>
                </svg>
              </div>

              {/* Watches */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[85%] translate-x-6 rotate-[-8deg]">
                  <Image src="https://xtratheme.com/elementor/watch-shop/wp-content/uploads/sites/79/2021/10/slide-2.png" alt="Watch 1" width={1200} height={1200} className="w-full h-auto drop-shadow-2xl" />
                </div>
              </div>

              {/* Slider dots */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {[0,1,2].map((i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i===1?"w-6 bg-gray-500":"w-1.5 bg-gray-300"}`} />
                ))}
              </div>

              {/* Scroll mouse indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-gray-500">
                <span className="rotate-90 text-sm">scroll down</span>
                <span className="w-6 h-10 rounded-full border border-gray-300 relative overflow-hidden">
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded bg-gray-400 animate-bounce" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2) SPECS RING */}
        <div ref={specsRef} className="mt-4 mb-28">
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="relative w-full max-w-xl aspect-square mx-auto">
                {/* concentric topo shapes */}
                <div className="absolute inset-0 rounded-full border border-gray-200" />
                <div className="absolute inset-6 rounded-full border border-gray-200" />
                <div className="absolute inset-12 rounded-full border border-gray-200" />
                <Image
                  src="/products/watch-sample.png"
                  alt="Smart Watch"
                  fill
                  className="object-contain p-10"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-10">
              {[
                { title: "Extraordinary Performance" },
                { title: "Shows time & date" },
                { title: "Excellent battery life" },
                { title: "Affordable price" },
                { title: "Connectable to android/iOS" },
                { title: "Best Quality and design" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">A smartwatch is a wearable computer in the form of a watch.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3) ROUNDED FEATURE BANNER */}
        <div ref={roundedBannerRef} className="mb-24">
          <div className="relative max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1518449032156-436b67b7fd90?q=80&w=1800&auto=format&fit=crop"
              alt="Gadget Theme"
              width={1800}
              height={900}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">Gadget XTRA WordPress Theme</h3>
              <p className="text-white/80 max-w-2xl">A smartwatch is a wearable computer in the form of a watch; modern smartwatches provide a local touchscreen interface for daily use, while an associated smartphone app provides for management and telemetry.</p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[{ label: "Water proof" }, { label: "Battery life" }, { label: "Alarm" }, { label: "Weather" }].map((f, idx) => (
                  <div key={idx} className="flex flex-col items-center text-white/90">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-2" />
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4) NEARBY STORES CTA */}
        <div ref={storesCtaRef} className="mb-24">
          <div className="relative max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1800&auto=format&fit=crop"
              alt="Nearby stores"
              width={1800}
              height={900}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">Nearby Pear-Watch Stores</h3>
              <p className="text-white/80 max-w-2xl">A smartwatch is a wearable computer with a local touchscreen interface for daily use.</p>
              <div className="mt-8 flex gap-4">
                <a href="#purchase" className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-sm hover:bg-gray-50">Purchase Now</a>
                <a href="#stores" className="px-8 py-4 bg-transparent border border-white/70 text-white font-semibold rounded-full hover:bg-white/10">Find Nearby Stores</a>
              </div>
            </div>
          </div>
        </div>

        {/* 5) TESTIMONIALS */}
        <div ref={testimonialsRef} className="mb-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-blue-600 font-semibold mb-4">Testimonials</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">This Watch is amazing!<br /> affordable price.</h3>
              <p className="text-gray-600 mb-8 max-w-xl">{testimonials[testimonialIndex].quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[testimonialIndex].name}</div>
                  <div className="text-gray-500 text-sm">{testimonials[testimonialIndex].role}</div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button aria-label="Previous testimonial" onClick={() => setTestimonialIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">←</button>
                <button aria-label="Next testimonial" onClick={() => setTestimonialIndex((p) => (p + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">→</button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-xl">
                <Image src={testimonials[testimonialIndex].image} alt={testimonials[testimonialIndex].name} width={1000} height={800} className="w-full h-[420px] object-cover" />
              </div>
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
