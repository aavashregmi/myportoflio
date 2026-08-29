import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  hue: number;
  alpha: number;
  seed: number;
}

/**
 * The Genesis Canvas — a pure 2D canvas particle field representing
 * "a self being formed." Particles drift in a soft constellation,
 * breathe gently, and bend toward the cursor like attention pulling
 * a thought into shape. Connections fade in between nearby particles,
 * evoking a network still assembling itself.
 *
 * Lightweight: no WebGL, no dependencies. ~120 particles on desktop,
 * fewer on mobile. Respects prefers-reduced-motion.
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const c = ctx;
    const cvs = canvas;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let scrollY = 0;
    let raf = 0;
    let time = 0;

    const PARTICLE_COUNT = isMobile ? 60 : 120;
    const LINK_DISTANCE = isMobile ? 110 : 150;

    function resize() {
      width = cvs.clientWidth;
      height = cvs.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = width * dpr;
      cvs.height = height * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 1.8 + 0.4;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: r,
          // distribute across the three identity colors
          hue: Math.random(),
          alpha: Math.random() * 0.4 + 0.15,
          seed: Math.random() * Math.PI * 2,
        });
      }
    }

    resize();
    createParticles();

    const onResize = () => {
      resize();
      createParticles();
    };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    function colorFor(p: Particle, t: number): string {
      // three-color palette: aurora teal, signal blue, ember orange
      const shift = Math.sin(p.seed + t * 0.1) * 0.5 + 0.5;
      let r: number, g: number, b: number;
      if (p.hue < 0.4) {
        // teal -> blue
        r = Math.round(94 + (147 - 94) * shift);
        g = Math.round(234 - (234 - 197) * shift);
        b = Math.round(212 - (212 - 253) * shift);
      } else if (p.hue < 0.75) {
        // blue -> teal
        r = Math.round(147 - (147 - 94) * shift);
        g = Math.round(197 + (234 - 197) * shift);
        b = Math.round(253 - (253 - 212) * shift);
      } else {
        // ember
        r = 251;
        g = Math.round(146 - shift * 40);
        b = Math.round(60 + shift * 20);
      }
      return `rgba(${r},${g},${b},${p.alpha})`;
    }

    function draw() {
      c.clearRect(0, 0, width, height);

      if (!reduced) time += 0.016;

      const scrollFactor = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      const expand = 1 + scrollFactor * 0.15;

      // update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let breathe = 0;
        if (!reduced) {
          // gentle drift
          p.x += p.vx;
          p.y += p.vy;

          // breathing
          breathe = Math.sin(time * 0.5 + p.seed) * 0.4;
          const dx = p.x - p.baseX;
          const dy = p.y - p.baseY;
          // return-to-origin spring
          p.vx += -dx * 0.0008;
          p.vy += -dy * 0.0008;

          // cursor gravity
          if (pointer.active) {
            const pdx = pointer.x - p.x;
            const pdy = pointer.y - p.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
            if (pdist < 200 && pdist > 0.1) {
              const pull = (1 - pdist / 200) * 0.04;
              p.vx += (pdx / pdist) * pull;
              p.vy += (pdy / pdist) * pull;
            }
          }

          // damping
          p.vx *= 0.97;
          p.vy *= 0.97;
        }

        // scroll expansion — particles drift outward as you scroll
        const cx = width / 2;
        const cy = height / 2;
        const ax = cx + (p.x - cx) * expand;
        const ay = cy + (p.y - cy) * expand;

        const breatheR = p.radius + (reduced ? 0 : breathe * 0.3);

        c.beginPath();
        c.arc(ax, ay, Math.max(0.2, breatheR), 0, Math.PI * 2);
        c.fillStyle = colorFor(p, time);
        c.fill();
      }

      // draw connections — a network being assembled
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          const ax = width / 2 + (a.x - width / 2) * expand;
          const ay = height / 2 + (a.y - height / 2) * expand;
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const bx = width / 2 + (b.x - width / 2) * expand;
            const by = height / 2 + (b.y - height / 2) * expand;
            const dx = ax - bx;
            const dy = ay - by;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DISTANCE) {
              const op = (1 - dist / LINK_DISTANCE) * 0.12;
              c.beginPath();
              c.moveTo(ax, ay);
              c.lineTo(bx, by);
              c.strokeStyle = `rgba(94, 234, 212, ${op})`;
              c.lineWidth = 0.5;
              c.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    if (reduced) {
      // draw a single static frame
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
