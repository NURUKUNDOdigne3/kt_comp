"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Printer() {
  // @ts-ignore
  const modelRef = useRef<THREE.Group>();
  const { camera } = useThree();
  const { scene } = useGLTF("/models/printer/scene.gltf");
  const scrollProgress = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef<number | null>(null);
  const rotationVelocity = useRef(0);
  const idleRotation = useRef(0);

  useEffect(() => {
    // Position camera to focus on iPhone screen - closer and angled
    camera.position.set(0, 0.5, 3.5);
    camera.lookAt(0, 0.3, 0);

    // Initial model setup and entrance animation
    if (modelRef.current) {
      // Set initial state - phone slightly tilted back and scaled down
      gsap.set(modelRef.current.position, { y: 0, x: 0, z: 0 });
      gsap.set(modelRef.current.rotation, {
        x: 0.55, // Slight tilt to show screen
        y: -0.3, // Angled to the side
        z: 0,
      });
      gsap.set(modelRef.current.scale, { x: 0, y: 0, z: 0 });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Scale up with elastic bounce
      tl.to(modelRef.current.scale, {
        x: 0.05,
        y: 0.05,
        z: 0.05,
        duration: 1.8,
        ease: "elastic.out(1, 0.6)",
      })
        // Rotate to face forward, showcasing the screen
        .to(
          modelRef.current.rotation,
          {
            x: 0.1, // Slight tilt to see screen better
            y: 0, // Face forward
            z: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1.2"
        )
        // Add a subtle showcase rotation
        .to(
          modelRef.current.rotation,
          {
            y: Math.PI * 2, // Full 360 rotation
            duration: 4,
            ease: "power1.inOut",
          },
          "-=0.5"
        )
        // Return to screen-focused position
        .to(modelRef.current.rotation, {
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        });
    }

    // Set up scroll-based rotation animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: "#welcome-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1, // Smooth scrubbing
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Clean up
    return () => {
      scrollTrigger.kill();
      gsap.killTweensOf(modelRef.current);
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!modelRef.current) return;

    const progress = scrollProgress.current;

    // Scroll-based rotation: rotate phone as user scrolls
    if (!isDragging.current && Math.abs(rotationVelocity.current) < 0.0001) {
      // Full 360-degree rotation based on scroll
      const targetRotationY = progress * Math.PI * 2;

      // Subtle tilt animation during rotation
      const targetRotationX = 0.1 + Math.sin(progress * Math.PI * 2) * 0.15;
      const targetRotationZ = Math.sin(progress * Math.PI * 4) * 0.05;

      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.08
      );
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        targetRotationZ,
        0.08
      );

      // Subtle idle floating animation when not scrolling
      if (progress === 0 || progress === 1) {
        idleRotation.current += delta * 0.3;
        modelRef.current.position.y = Math.sin(idleRotation.current) * 0.05;
      }
    }

    // Apply drag inertia when user releases
    if (!isDragging.current && Math.abs(rotationVelocity.current) > 0.0001) {
      modelRef.current.rotation.y += rotationVelocity.current * 0.003;
      rotationVelocity.current *= 0.95;
    }

    // Dynamic camera movement based on scroll
    const targetCameraY = 0.5 + progress * 0.3;
    const targetCameraZ = 3.5 - progress * 0.5;
    const targetCameraX = Math.sin(progress * Math.PI) * 0.3;

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetCameraY,
      0.05
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetCameraZ,
      0.05
    );
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetCameraX,
      0.05
    );
    camera.lookAt(0, 0.3, 0);
  });

  return (
    <group
      ref={modelRef}
      position={[0, 0, 0]}
      scale={0.05}
      onPointerDown={(e) => {
        e.stopPropagation();
        isDragging.current = true;
        lastPointerX.current = e.clientX;
        rotationVelocity.current = 0;
        if (typeof document !== "undefined") {
          document.body.style.cursor = "grabbing";
        }
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        isDragging.current = false;
        lastPointerX.current = null;
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        isDragging.current = false;
        lastPointerX.current = null;
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
      onPointerMove={(e) => {
        if (!isDragging.current || !modelRef.current) return;
        e.stopPropagation();
        const currentX = e.clientX;
        if (lastPointerX.current !== null) {
          const deltaX = currentX - lastPointerX.current;
          const sensitivity = 0.005;
          modelRef.current.rotation.y += deltaX * sensitivity;
          rotationVelocity.current = deltaX;
        }
        lastPointerX.current = currentX;
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function WelcomeHeroPrinter() {
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
      <Canvas
        className="relative -top-5 left-0 w-full h-full"
        camera={{ fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Printer />
          <Environment preset="studio" />

          {/* Main ambient light for overall illumination */}
          <ambientLight intensity={0.6} />

          {/* Key light - illuminates the screen */}
          <spotLight
            position={[0, 3, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            castShadow
          />

          {/* Rim light - creates edge highlights */}
          <pointLight position={[3, 2, -3]} intensity={0.8} color="#ffffff" />

          {/* Fill light - softens shadows */}
          <pointLight position={[-3, 1, 2]} intensity={0.4} color="#a8c5ff" />

          {/* Back light - separates phone from background */}
          <spotLight
            position={[0, -2, -4]}
            angle={0.5}
            penumbra={1}
            intensity={0.6}
            color="#4a90e2"
          />
        </Suspense>
      </Canvas>

      <div
        ref={dimRef}
        className="absolute inset-0 bg-black pointer-events-none opacity-0 z-20 rounded-[0px_0px_20px_20px] shadow-md"
        aria-hidden
      />
      <div
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
          Bringing Cutting-Edge Printing to Your Desk
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Professional-grade printers from trusted brands—built for quality,
          style, and lasting reliability.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#shop"
            className="rounded-lg bg-blue-600 text-white px-6 py-3 font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Shop Now
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
