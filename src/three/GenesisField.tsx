import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The Genesis Field — a procedural particle cloud that represents
 * a self still being formed. Particles drift in a spherical shell,
 * breathing and reorganizing under the cursor's gravity. The cloud
 * is never still; it is becoming.
 *
 * Concept: identity is not a fixed object — it is a field of
 * possibilities slowly collapsing into shape.
 */

interface GenesisFieldProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
  reducedMotion: boolean;
  particleCount: number;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute float aSeed;
  attribute float aRadius;
  attribute vec3 aBase;
  attribute vec3 aAxis;

  varying float vSeed;
  varying float vDepth;

  // simple hash noise
  vec3 hash3(float n) {
    return fract(sin(vec3(n, n + 1.0, n + 2.0)) * vec3(43758.5453, 22578.1459, 71234.7711));
  }

  void main() {
    vSeed = aSeed;
    float t = uTime * 0.12;

    // breathing radius — the field expands and contracts like a living thing
    float breathe = sin(uTime * 0.35 + aSeed * 6.2831) * 0.18;
    float r = aRadius * (1.0 + breathe + uScroll * 0.6);

    // orbital drift around a personal axis
    float angle = aSeed * 6.2831 + t * (0.4 + aSeed * 0.6);
    vec3 orbit = vec3(cos(angle), sin(angle) * 0.6, sin(angle)) * r;
    vec3 pos = aBase * (0.55 + r * 0.45) + orbit * 0.5;

    // gentle curl
    pos.y += sin(uTime * 0.2 + aSeed * 10.0) * 0.3;
    pos.x += cos(uTime * 0.15 + aSeed * 8.0) * 0.3;

    // cursor gravity — the visitor's attention bends the field
    vec3 ptr = vec3(uPointer.x * 4.5, uPointer.y * 3.0, 1.5);
    vec3 toPtr = ptr - pos;
    float d = length(toPtr);
    float pull = smoothstep(6.0, 1.0, d) * 0.5;
    pos += normalize(toPtr) * pull;

    // scroll expands the whole field outward — becoming more over time
    pos *= 1.0 + uScroll * 0.35;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vDepth = -mvPosition.z;

    // size attenuation with distance + per-particle variation
    float sizeVar = 0.5 + hash3(aSeed * 13.0).x;
    gl_PointSize = uSize * sizeVar * uPixelRatio * (12.0 / max(vDepth, 0.5));
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying float vSeed;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // soft glowing point
    float alpha = smoothstep(0.5, 0.0, dist);
    alpha *= 0.85;

    // three-color identity palette: aurora teal → signal blue → ember orange
    vec3 cAurora = vec3(0.37, 0.92, 0.83);
    vec3 cSignal = vec3(0.58, 0.75, 0.99);
    vec3 cEmber  = vec3(0.98, 0.57, 0.24);

    float m1 = sin(vSeed * 6.28 + uTime * 0.15) * 0.5 + 0.5;
    vec3 col = mix(cAurora, cSignal, m1);
    float m2 = smoothstep(0.6, 1.0, sin(vSeed * 12.0 + uTime * 0.1) * 0.5 + 0.5);
    col = mix(col, cEmber, m2 * 0.55);

    // depth fade
    float depthFade = smoothstep(14.0, 3.0, vDepth);
    col *= 0.55 + depthFade * 0.7;

    gl_FragColor = vec4(col, alpha * (0.55 + uScroll * 0.4));
  }
`;

export function GenesisField({ pointer, scrollProgress, reducedMotion, particleCount }: GenesisFieldProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();

  const { geometry, uniforms } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const bases = new Float32Array(particleCount * 3);
    const axes = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const seed = i / particleCount;
      seeds[i] = seed;
      // radius in a shell — slightly elongated vertically for a human silhouette feel
      radii[i] = 2.2 + Math.pow(Math.random(), 0.6) * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      bases[i * 3] = Math.sin(phi) * Math.cos(theta);
      bases[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 0.85;
      bases[i * 3 + 2] = Math.cos(phi);
      axes[i * 3] = (Math.random() - 0.5) * 2;
      axes[i * 3 + 1] = (Math.random() - 0.5) * 2;
      axes[i * 3 + 2] = (Math.random() - 0.5) * 2;
      positions[i * 3] = bases[i * 3] * radii[i];
      positions[i * 3 + 1] = bases[i * 3 + 1] * radii[i];
      positions[i * 3 + 2] = bases[i * 3 + 2] * radii[i];
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));
    geo.setAttribute('aBase', new THREE.BufferAttribute(bases, 3));
    geo.setAttribute('aAxis', new THREE.BufferAttribute(axes, 3));

    const u = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 22.0 },
    };
    return { geometry: geo, uniforms: u };
  }, [gl, particleCount]);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += reducedMotion ? 0 : delta;
    // eased scroll
    const target = scrollProgress.current;
    u.uScroll.value += (target - u.uScroll.value) * 0.06;
    // eased pointer
    u.uPointer.value.x += (pointer.current.x - u.uPointer.value.x) * 0.05;
    u.uPointer.value.y += (pointer.current.y - u.uPointer.value.y) * 0.05;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
