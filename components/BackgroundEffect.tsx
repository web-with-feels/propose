import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
}

export default function BackgroundEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 15 + 5,
      speedY: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      swing: Math.random() * 3, // Amplitude of horizontal swing
      swingSpeed: Math.random() * 0.05 + 0.01
    });

    const init = () => {
      resize();
      // Pre-fill some particles
      for (let i = 0; i < 30; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
      }
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particle occasionally
      if (active && frame % 60 === 0 && particles.length < 50) {
        particles.push(createParticle());
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`; // Light Pink
        ctx.beginPath();
        
        // Draw Heart Shape
        const topCurveHeight = p.size * 0.3;
        const x = p.x + Math.sin(frame * p.swingSpeed) * p.swing;
        const y = p.y;
        const width = p.size;
        const height = p.size;

        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2, x, y + height);
        ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
        ctx.fill();

        // Update position
        p.y -= p.speedY;

        // Reset if out of view
        if (p.y < -50) {
          particles[i] = createParticle();
        }
      }

      frame++;
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50 z-0"
    />
  );
}