/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function AntigravityInner({
  count = 160,
  magnetRadius = 7,
  ringRadius = 5.5,
  waveSpeed = 0.35,
  waveAmplitude = 0.6,
  particleSize = 0.75,
  lerpSpeed = 0.08,
  color = '#d3f6ea',
  autoAnimate = true,
  particleVariance = 0.8,
  rotationSpeed = 0.1,
  depthFactor = 0.65,
  pulseSpeed = 2.4,
  particleShape = 'capsule',
  fieldStrength = 12,
  cursorFollowSpeed = 0.12,
}) {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i += 1) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 14;

      temp.push({
        t,
        speed,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }

    return temp;
  }, [count, viewport.height, viewport.width]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: currentViewport, pointer } = state;
    const mouseDist = Math.hypot(
      pointer.x - lastMousePos.current.x,
      pointer.y - lastMousePos.current.y,
    );

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: pointer.x, y: pointer.y };
    }

    let destX = (pointer.x * currentViewport.width) / 2;
    let destY = (pointer.y * currentViewport.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 1800) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.35) * (currentViewport.width / 6);
      destY = Math.cos(time * 0.55) * (currentViewport.height / 7);
    }

    virtualMouse.current.x += (destX - virtualMouse.current.x) * cursorFollowSpeed;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * cursorFollowSpeed;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, index) => {
      particle.t += particle.speed / 2;

      const projectionFactor = 1 - particle.cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;
      const dx = particle.mx - projectedTargetX;
      const dy = particle.my - projectedTargetY;
      const dist = Math.hypot(dx, dy);

      let targetPos = {
        x: particle.mx,
        y: particle.my,
        z: particle.mz * depthFactor,
      };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(particle.t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = particle.randomRadiusOffset * (4 / (fieldStrength + 0.1));
        const currentRingRadius = ringRadius + wave + deviation;

        targetPos = {
          x: projectedTargetX + currentRingRadius * Math.cos(angle),
          y: projectedTargetY + currentRingRadius * Math.sin(angle),
          z:
            particle.mz * depthFactor +
            Math.sin(particle.t) * (0.65 * waveAmplitude * depthFactor),
        };
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.hypot(
        particle.cx - projectedTargetX,
        particle.cy - projectedTargetY,
      );
      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      const scaleFactor = Math.max(0, Math.min(1, 1 - distFromRing / 10));
      const finalScale =
        scaleFactor *
        (0.8 + Math.sin(particle.t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;

      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.08, 0.32, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.18, 16, 16]} />}
      {particleShape === 'box' && <boxGeometry args={[0.24, 0.24, 0.24]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.24]} />}
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </instancedMesh>
  );
}

export default function Antigravity(props) {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 40], fov: 35 }}
      >
        <AntigravityInner {...props} />
      </Canvas>
    </div>
  );
}
