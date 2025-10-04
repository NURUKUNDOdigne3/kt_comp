"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function MacBook() {
  // @ts-ignore
  const modelRef = useRef<THREE.Group>();
  const { camera } = useThree();
  const { scene, animations } = useGLTF("/models/model/scene.gltf");
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const animationAction = useRef<THREE.AnimationAction | null>(null);
  const scrollProgress = useRef(0);
  const introProgress = useRef<{ value: number }>({ value: 0 });
  const isDragging = useRef(false);
  const lastPointerX = useRef<number | null>(null);
  const rotationVelocity = useRef(0);

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 2, 5);

    // Set up animation
    if (animations && animations.length > 0) {
      const clip = animations[0]; // Get the first animation
      animationAction.current = mixer.current.clipAction(clip);
      animationAction.current.setLoop(THREE.LoopOnce, 1);
      animationAction.current.clampWhenFinished = true;
      animationAction.current.play();
      // Pause at the start
      animationAction.current.paused = true;
    }

    // Initial model appearance animation + showcase spin
    if (modelRef.current) {
      const tl = gsap.timeline();
      tl.from(modelRef.current.position, {
        y: -2,
        duration: 1.5,
        ease: "power3.out",
      })
        .from(
          modelRef.current.rotation,
          {
            x: -Math.PI / 4,
            duration: 1.5,
            ease: "power3.out",
          },
          "<"
        )
        // Spin around Y axis to showcase on load
        .to(
          modelRef.current.rotation,
          {
            y: "+=" + Math.PI * 2,
            duration: 3,
            ease: "power2.inOut",
          },
          "<"
        );
    }

    // During intro, also advance a portion of the clip so scroll can continue it
    gsap.to(introProgress.current, {
      value: 0.25, // intro reveals first 25% of the animation
      duration: 2,
      ease: "power2.out",
    });

    // Set up scroll-based animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: "#welcome-hero",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Clean up
    return () => {
      scrollTrigger.kill();
      mixer.current.stopAllAction();
    };
  }, [camera, animations]);

  useFrame((_, delta) => {
    // Update animation mixer
    mixer.current.update(delta);

    // Determine combined progress between intro animation and scroll
    const combinedProgress = Math.max(
      scrollProgress.current,
      introProgress.current.value
    );

    // Drive GLTF clip based on combined progress
    if (animationAction.current && animations && animations[0]) {
      const clip = animations[0];
      animationAction.current.time = clip.duration * combinedProgress;
    }

    // Smooth camera movement based on combined progress
    const targetY = 2 + combinedProgress * 1;
    const targetZ = 5 - combinedProgress * 2;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    camera.lookAt(0, 0, 0);

    if (modelRef.current) {
      // Smooth model rotation based on combined progress
      const targetRotationX = (combinedProgress * Math.PI) / 4;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.1
      );

      // Apply inertia spin after user drag ends
      if (!isDragging.current && Math.abs(rotationVelocity.current) > 0.0001) {
        modelRef.current.rotation.y += rotationVelocity.current * 0.003;
        rotationVelocity.current *= 0.95;
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={[0, 0, 0]}
      scale={15}
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
      <Canvas className="relative -top-5 left-0 w-full h-full">
        <Suspense fallback={null}>
          <MacBook />
          <Environment preset="city" />
          <ambientLight intensity={0.8} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.4}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
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
          Power Your Work. Elevate Your Play.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
