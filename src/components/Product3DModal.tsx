"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Center, PresentationControls, useAnimations } from "@react-three/drei";
import { X, Maximize2, RotateCw, ZoomIn, ZoomOut, Move3D, Play, Pause, SkipBack } from "lucide-react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface Product3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  modelPath?: string;
}

interface ProductModelProps {
  modelPath?: string;
  autoRotate?: boolean;
  isPlaying?: boolean;
  animationProgress?: number;
  onAnimationUpdate?: (progress: number, duration: number) => void;
}

function ProductModel({ 
  modelPath = "/models/model/scene.gltf", 
  autoRotate = true,
  isPlaying = false,
  animationProgress = 0,
  onAnimationUpdate
}: ProductModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, modelRef);
  const [hasAnimations, setHasAnimations] = useState(false);
  const animationRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      setHasAnimations(true);
      const firstAnimation = Object.values(actions)[0];
      if (firstAnimation) {
        animationRef.current = firstAnimation;
        firstAnimation.setLoop(THREE.LoopRepeat, Infinity);
        firstAnimation.clampWhenFinished = false;
        
        // Set initial progress
        if (firstAnimation.getClip()) {
          const duration = firstAnimation.getClip().duration;
          firstAnimation.time = (animationProgress / 100) * duration;
        }
      }
    }
  }, [animations, actions, animationProgress]);

  useEffect(() => {
    if (animationRef.current) {
      if (isPlaying) {
        animationRef.current.play();
        animationRef.current.paused = false;
      } else {
        animationRef.current.paused = true;
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (animationRef.current && animationRef.current.getClip()) {
      const duration = animationRef.current.getClip().duration;
      animationRef.current.time = (animationProgress / 100) * duration;
    }
  }, [animationProgress]);

  useFrame((state, delta) => {
    if (modelRef.current && autoRotate && !isPlaying) {
      modelRef.current.rotation.y += delta * 0.5;
    }
    
    // Update animation progress
    if (animationRef.current && isPlaying && onAnimationUpdate) {
      const clip = animationRef.current.getClip();
      if (clip) {
        const progress = (animationRef.current.time / clip.duration) * 100;
        onAnimationUpdate(progress, clip.duration);
      }
    }
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={scene} scale={15} />
      </Center>
    </group>
  );
}

export default function Product3DModal({
  isOpen,
  onClose,
  productName,
  modelPath,
}: Product3DModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [hasAnimation, setHasAnimation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && modalRef.current) {
      modalRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleAnimationUpdate = (progress: number, duration: number) => {
    setAnimationProgress(progress);
    if (duration !== animationDuration) {
      setAnimationDuration(duration);
      setHasAnimation(true);
    }
  };

  const handlePlayPause = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
    if (!isAnimationPlaying) {
      setAutoRotate(false);
    }
  };

  const handleResetAnimation = () => {
    setAnimationProgress(0);
    setIsAnimationPlaying(false);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setAnimationProgress(newProgress);
    setIsAnimationPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl overflow-hidden",
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-[90vw] h-[80vh] max-w-6xl max-h-[800px]"
        )}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white via-white/95 to-transparent p-4 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">3D View</h2>
              <p className="text-sm text-gray-600">{productName}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Animation Controls */}
              {hasAnimation && (
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={handlePlayPause}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      isAnimationPlaying
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "hover:bg-white"
                    )}
                    title={isAnimationPlaying ? "Pause Animation" : "Play Animation"}
                  >
                    {isAnimationPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleResetAnimation}
                    className="p-2 hover:bg-white rounded-md transition-colors"
                    title="Reset Animation"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* View Controls */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white rounded-md transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white rounded-md transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    autoRotate && !isAnimationPlaying
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      : "hover:bg-white",
                    isAnimationPlaying && "opacity-50 cursor-not-allowed"
                  )}
                  title="Auto Rotate"
                  disabled={isAnimationPlaying}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white rounded-md transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Animation Timeline */}
        {hasAnimation && (
          <div className="absolute top-20 left-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600 min-w-[40px]">
                {Math.floor(animationProgress)}%
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={animationProgress}
                onChange={handleProgressChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${animationProgress}%, #e5e7eb ${animationProgress}%, #e5e7eb 100%)`
                }}
              />
              <span className="text-xs font-medium text-gray-600 min-w-[50px] text-right">
                {animationDuration.toFixed(1)}s
              </span>
            </div>
          </div>
        )}

        {/* 3D Canvas */}
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <group scale={zoom}>
                <ProductModel 
                  modelPath={modelPath} 
                  autoRotate={autoRotate && !isAnimationPlaying}
                  isPlaying={isAnimationPlaying}
                  animationProgress={animationProgress}
                  onAnimationUpdate={handleAnimationUpdate}
                />
              </group>
            </PresentationControls>
            <Environment preset="city" />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={!autoRotate && !isAnimationPlaying}
              minDistance={3}
              maxDistance={10}
            />
          </Canvas>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-white via-white/95 to-transparent p-4 pt-8">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Move3D className="w-4 h-4" />
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Scroll</span>
              <span>to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">ESC</span>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
