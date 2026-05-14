import { useEffect, useRef, useState } from 'react';

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

interface SlidingDrop {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function RainDrops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const raindropCount = isMobile ? 40 : 80;
    const slidingDropCount = isMobile ? 10 : 20;

    const raindrops: Raindrop[] = [];
    const slidingDrops: SlidingDrop[] = [];

    for (let i = 0; i < raindropCount; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 10 + Math.random() * 20,
        speed: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    for (let i = 0; i < slidingDropCount; i++) {
      slidingDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 3,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
      ctx.lineWidth = 1;

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.globalAlpha = drop.opacity;
        ctx.stroke();

        drop.y += drop.speed;
        drop.y += (scrollY * 0.1);

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      ctx.globalAlpha = 1;

      slidingDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity})`;
        ctx.fill();

        drop.y += drop.speed;
        drop.y += (scrollY * 0.05);

        if (drop.y > canvas.height) {
          drop.y = -10;
          drop.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
