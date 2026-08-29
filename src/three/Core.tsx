import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The Core — a luminous center wrapped in a slow-turning wireframe
 * icosahedron. It reads as the nucleus of a self being assembled:
 * an incomplete geometry whose facets are still being drawn.
 */

const vert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    float fres = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    float pulse = sin(uTime * 0.6) * 0.5 + 0.5;
    vec3 col = mix(uColorA, uColorB, fres);
    col += fres * 0.4 * pulse;
    float alpha = 0.08 + fres * 0.25;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface CoreProps {
  scrollProgress: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

export function Core({ scrollProgress, reducedMotion }: CoreProps) {
  const icoRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#5eead4') },
      uColorB: { value: new THREE.Color('#fb923c') },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += reducedMotion ? 0 : delta;
    const s = scrollProgress.current;
    if (icoRef.current) {
      icoRef.current.rotation.y += reducedMotion ? 0 : delta * 0.12;
      icoRef.current.rotation.x += reducedMotion ? 0 : delta * 0.04;
      const scale = 1 + s * 0.4;
      icoRef.current.scale.setScalar(scale);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= reducedMotion ? 0 : delta * 0.18;
      const scale = 1 + s * 0.55 + (reducedMotion ? 0 : Math.sin(performance.now() * 0.001) * 0.03);
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={innerRef} scale={0.95}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.12} />
      </mesh>
      {/* luminous plasma core */}
      <mesh>
        <sphereGeometry args={[0.9, 48, 48]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      {/* tight glow halo */}
      <mesh scale={1.25}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
