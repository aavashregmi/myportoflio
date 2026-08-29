import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GenesisField } from './GenesisField';
import { Core } from './Core';

interface IdentitySceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const handler = () => setMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

/**
 * IdentityScene — the fixed full-viewport 3D layer.
 * The camera drifts subtly with the cursor; the field reacts to
 * both pointer and scroll. Falls back to a static gradient when
 * the user prefers reduced motion or the device is too weak.
 */
export function IdentityScene({ scrollProgress }: IdentitySceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pointer = useRef({ x: 0, y: 0 });
  const camRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.x = nx;
      pointer.current.y = ny;
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFramelessCamera(camRef, pointer, reducedMotion);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, #0c1820 0%, #06090d 55%, #04060a 100%)',
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-72 w-72 rounded-full bg-aurora-400/10 blur-3xl" />
        </div>
      </div>
    );
  }

  const particleCount = isMobile ? 2200 : 4500;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 100 }}
        onCreated={({ camera }) => {
          camRef.current = camera as THREE.PerspectiveCamera;
        }}
      >
        <color attach="background" args={['#05070a']} />
        <fog attach="fog" args={['#05070a', 8, 22]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#5eead4" />
        <pointLight position={[-5, -3, 2]} intensity={0.4} color="#fb923c" />

        <Suspense fallback={null}>
          <GenesisField
            pointer={pointer}
            scrollProgress={scrollProgress}
            reducedMotion={reducedMotion}
            particleCount={particleCount}
          />
          <Core scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={isMobile ? 0.55 : 0.85}
            luminanceThreshold={0.08}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function useFramelessCamera(
  camRef: React.MutableRefObject<THREE.PerspectiveCamera | null | undefined>,
  pointer: React.MutableRefObject<{ x: number; y: number }>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const cam = camRef.current;
      if (cam && !reducedMotion) {
        const tx = pointer.current.x * 1.1;
        const ty = pointer.current.y * 0.7;
        cam.position.x += (tx - cam.position.x) * 0.03;
        cam.position.y += (ty - cam.position.y) * 0.03;
        cam.lookAt(0, 0, 0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [camRef, pointer, reducedMotion]);
}
