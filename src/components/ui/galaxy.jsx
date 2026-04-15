/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Galaxy — spiral star-field background component.
 * Matches the react-bits @react-bits/Galaxy-JS-CSS API surface.
 *
 * Props:
 *   mouseRepulsion  {boolean} — stars gently flee the cursor
 *   density         {number}  — star count (default 800)
 *   glowColor       {string}  — hex color for stars (default '#6ef0f0')
 *   speed           {number}  — rotation speed multiplier (default 0.05)
 *   opacity         {number}  — overall canvas opacity via CSS (default 0.55)
 */

function GalaxyInner({
  mouseRepulsion = true,
  density = 800,
  glowColor = '#6ef0f0',
  speed = 0.05,
}) {
  const pointsRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Build spiral galaxy geometry once
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(density * 3);
    const col = new Float32Array(density * 3);
    const baseColor = new THREE.Color(glowColor);
    const innerColor = new THREE.Color('#ffffff');

    const arms = 3;
    const spread = 0.45;
    const radius = 14;

    for (let i = 0; i < density; i++) {
      const t = i / density;
      const r = Math.pow(Math.random(), 0.6) * radius;
      const arm = Math.floor(Math.random() * arms);
      const armAngle = (arm / arms) * Math.PI * 2;
      const spinAngle = r * 0.38;
      const scatter = (Math.random() - 0.5) * spread * (r * 0.5 + 0.5);

      const angle = armAngle + spinAngle;
      pos[i * 3]     = Math.cos(angle) * r + scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.2 * (1 - r / radius);
      pos[i * 3 + 2] = Math.sin(angle) * r + scatter;

      // blend inner (white) → outer (glowColor)
      const mixed = innerColor.clone().lerp(baseColor, Math.min(r / radius + 0.2, 1));
      col[i * 3]     = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, [density, glowColor]);

  // Track mouse in normalised [-1,1] space
  useMemo(() => {
    if (!mouseRepulsion) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseRepulsion]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow galaxy rotation
    pointsRef.current.rotation.y = t * speed;

    // Subtle tilt drift
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.12 + 0.25;

    // Mouse repulsion — shift the whole galaxy slightly away from cursor
    if (mouseRepulsion) {
      pointsRef.current.position.x +=
        (-pointer.current.x * 1.5 - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y +=
        (-pointer.current.y * 0.8 - pointsRef.current.position.y) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Galaxy({
  mouseRepulsion = true,
  density = 800,
  glowColor = '#6ef0f0',
  speed = 0.05,
  opacity = 0.55,
  className = '',
}) {
  return (
    <div
      className={`h-full w-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 6, 22], fov: 60 }}
      >
        <GalaxyInner
          mouseRepulsion={mouseRepulsion}
          density={density}
          glowColor={glowColor}
          speed={speed}
        />
      </Canvas>
    </div>
  );
}
