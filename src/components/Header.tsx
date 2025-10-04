"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Camera,
  ChevronUpIcon,
  Mic,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { CartDrawer } from "./CartDrawer";
import { brandData } from "../lib/brands";

const categories = [
  { name: "All", href: "/", active: true },
  { name: "Computers", href: "/computers", active: false },
  { name: "Phones", href: "/phones", active: false },
  { name: "Printers", href: "/printers", active: false },
  { name: "Routers", href: "/routers", active: false },
  { name: "Speakers", href: "/speakers", active: false },
  { name: "Monitors", href: "/monitors", active: false },
  { name: "Accessories", href: "#", active: false },
];

// Brand data with categories

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if current path is a brand page
    if (pathname?.startsWith("/brands/")) {
      const brandSlug = pathname.split("/")[2]; // Get the brand from URL
      setActiveBrand(brandSlug);
    } else {
      setActiveBrand(null);
    }
  }, [pathname]);

  // Get current category from pathname
  const getCurrentCategory = () => {
    if (pathname === "/") return "all";
    if (pathname?.startsWith("/computers")) return "computers";
    if (pathname?.startsWith("/phones")) return "phones";
    if (pathname?.startsWith("/printers")) return "printers";
    if (pathname?.startsWith("/routers")) return "routers";
    if (pathname?.startsWith("/speakers")) return "speakers";
    if (pathname?.startsWith("/ipads")) return "ipads";
    if (pathname?.startsWith("/monitors")) return "monitors";
    if (pathname?.startsWith("/accessories")) return "accessories";
    return "all";
  };

  const currentCategory = getCurrentCategory();

  // Filter brands based on current category
  const filteredBrandData =
    currentCategory === "all"
      ? brandData
      : brandData.filter((brand) => brand.categories.includes(currentCategory));

  // Map brands with active state
  const brands = filteredBrandData.map((brand) => ({
    ...brand,
    active: activeBrand === brand.href.split("/").pop(),
  }));

  // Map categories with active state based on pathname
  const activeCategories = categories.map((category) => ({
    ...category,
    active: pathname === category.href,
  }));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const categoriesRef = useRef(null);
  const brandsRef = useRef(null);
  const chevronRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    // Register GSAP for use
    gsap.registerPlugin();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastScrollYRef.current;
          // Always show when near top
          if (currentY < 10) {
            setIsHeaderVisible(true);
          } else if (delta > 5) {
            // Scrolling down
            setIsHeaderVisible(false);
          } else if (delta < -5) {
            // Scrolling up
            setIsHeaderVisible(true);
          }
          lastScrollYRef.current = currentY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavigation = () => {
    const timeline = gsap.timeline({
      onComplete: () => setIsNavigationVisible(!isNavigationVisible),
    });

    if (isNavigationVisible) {
      // Fold animation
      timeline
        .to([categoriesRef.current, brandsRef.current], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          chevronRef.current,
          {
            rotation: 180,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        );
    } else {
      // Unfold animation
      timeline
        .set([categoriesRef.current, brandsRef.current], {
          display: "block",
        })
        .to([categoriesRef.current, brandsRef.current], {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          chevronRef.current,
          {
            rotation: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        );
    }
  };

  return (
    <>
      <header
        className={`bg-white shadow-sm sticky top-0 left-0 right-0 z-50 transition-transform duration-300 will-change-transform ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="md:hidden ">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                aria-label="Account"
              >
                <span className="text-sm font-medium text-blue-600">JD</span>
              </button>

              <Link href="/" className="text-xl font-bold">
                <span className="text-blue-600">KT</span>ComputerSupply
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-1 right-1 text-white bg-blue-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    0
                  </span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 " />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-20 py-2 border border-gray-700 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Search products..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-4">
                <Mic className="h-5 w-5 " />
                <Camera className="h-5 w-5 " />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="text-2xl font-bold hover:text-blue-700 transition-colors"
                >
                  <span className="text-blue-600">KT</span>ComputerSupply
                </Link>
              </div>

              <div className="flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search for products..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <User className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories navigation */}
        <nav
          ref={categoriesRef}
          className="bg-gray-50 border-t border-gray-200 overflow-x-auto no-scrollbar"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-6 md:space-x-8 h-12">
              {activeCategories.map((category) => {
                const isActive = category.active;
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors focus:outline-none relative ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    aria-label={`${category.name} category`}
                  >
                    {category.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Brand navigation */}
        <nav
          ref={brandsRef}
          className="bg-white border-t border-gray-200 pb-4 overflow-x-auto no-scrollbar"
          aria-label="Brands"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-3 md:space-x-4 h-12 items-center">
              {brands.map((brand) => {
                const isActive = brand.active;
                return (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    id={brand.active ? "active-brand" : ""}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "hover:bg-blue-50"
                    }`}
                    aria-label={`${brand.name} products`}
                  >
                    <div className="relative w-5 h-5 mr-2">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        sizes="24x24"
                        className="object-contain group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <span>{brand.name}</span>
                    {isActive && (
                      <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
              <Link
                href="/brands"
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View all brands"
              >
                More
              </Link>
            </div>
          </div>
        </nav>

        {/* Toggle button */}
        <div className="absolute justify-center items-center flex w-full -bottom-2.5">
          <button
            onClick={toggleNavigation}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label={
              isNavigationVisible ? "Collapse navigation" : "Expand navigation"
            }
          >
            <ChevronUpIcon
              ref={chevronRef}
              className="size-[22px] bg-gray-200 rounded-full opacity-60 hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="fixed inset-0  bg-opacity-25" aria-hidden="true" />
          <nav
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl z-50"
            aria-label="Mobile menu"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
              <span className="text-lg font-medium text-gray-900">Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-2 py-3 space-y-1 overflow-y-auto bg-white">
              {/* Mobile search */}
              <div className="px-4 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    placeholder="Search for products..."
                    aria-label="Search"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Camera
                      className="h-5 w-5 text-gray-400 focus:text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile account and cart */}
              <div className="px-4 py-2 flex space-x-4">
                <Link
                  href="/account"
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <User className="h-5 w-5 mr-2" aria-hidden="true" />
                  Account
                </Link>
                <Link
                  href="/cart"
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
                  Cart (0)
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
