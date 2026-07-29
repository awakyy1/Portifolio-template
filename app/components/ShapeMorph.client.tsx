import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DARK_COLOR_A = 0x00ffff;
const LIGHT_COLOR_A = 0xdb7093;

export default function ShapeMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "default",
      });
    } catch {
      setUseFallback(true);
      return;
    }

    const getSize = () => ({
      width: Math.max(container.clientWidth, 1),
      height: Math.max(container.clientHeight, 1),
    });
    const initialSize = getSize();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      initialSize.width / initialSize.height,
      0.1,
      1000,
    );

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialSize.width, initialSize.height, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 28);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color(LIGHT_COLOR_A) },
      },
      vertexShader: `
        uniform float time;
        uniform vec3 colorA;
        varying vec3 vColor;

        void main() {
          float safeLength = max(length(position), 0.0001);
          float theta = atan(position.y, position.x);
          float phi = acos(clamp(position.z / safeLength, -1.0, 1.0));
          float pulse = sin(time + safeLength) * 0.5;
          float radius = 10.0 + pulse;
          vec3 animatedPosition = vec3(
            radius * sin(phi) * cos(theta),
            radius * sin(phi) * sin(theta),
            radius * cos(phi)
          );

          vColor = colorA;

          vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = max(3.0 * (1.0 / max(-mvPosition.z, 1.0)), 0.75);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float distanceFromCenter = length(center);
          float alpha = smoothstep(0.5, 0.18, distanceFromCenter);

          if (alpha <= 0.01) {
            discard;
          }

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCompactScreen = window.matchMedia("(max-width: 768px)").matches;
    const hasLimitedCpu =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const particleCount =
      isCompactScreen || hasLimitedCpu ? 16_000 : 30_000;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const phi = Math.random() * Math.PI * 2;
      const cosTheta = Math.random() * 2 - 1;
      const theta = Math.acos(cosTheta);
      const radius = 10;

      positions[index * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[index * 3 + 1] =
        radius * Math.sin(theta) * Math.sin(phi);
      positions[index * 3 + 2] = radius * Math.cos(theta);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particles = new THREE.Points(geometry, shaderMaterial);
    scene.add(particles);

    const updateThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      shaderMaterial.uniforms.colorA.value.set(
        isDark ? DARK_COLOR_A : LIGHT_COLOR_A,
      );
    };

    updateThemeColors();
    const themeObserver = new MutationObserver(updateThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => {
      const size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height, false);
    };

    let resizeObserver: ResizeObserver | null = null;
    const supportsResizeObserver =
      typeof window.ResizeObserver === "function";
    if (supportsResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    let animationFrameId = 0;
    let disposed = false;

    const renderFrame = (timestamp: number) => {
      if (disposed) return;

      const time = timestamp * 0.001;
      shaderMaterial.uniforms.time.value = time;
      particles.rotation.y = Math.sin(time * 0.2) * 0.5;
      particles.rotation.x = Math.cos(time * 0.2) * 0.3;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    const stopAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const startAnimation = () => {
      if (!animationFrameId && !document.hidden && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stopAnimation();
      setUseFallback(true);
    };

    const handleContextRestored = () => {
      setUseFallback(false);
      handleResize();
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      } else {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    renderer.domElement.addEventListener(
      "webglcontextlost",
      handleContextLost,
    );
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
    );

    if (prefersReducedMotion) {
      shaderMaterial.uniforms.time.value = 0;
      renderer.render(scene, camera);
    } else {
      startAnimation();
    }

    return () => {
      disposed = true;
      stopAnimation();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      themeObserver.disconnect();
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored,
      );

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.clear();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    >
      <div ref={containerRef} className="h-full w-full" />
      {useFallback && (
        <div className="absolute left-1/2 top-1/2 aspect-square w-[min(72vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-rose-300/30 via-violet-400/20 to-transparent blur-2xl dark:from-cyan-300/20 dark:via-fuchsia-400/20" />
      )}
    </div>
  );
}
