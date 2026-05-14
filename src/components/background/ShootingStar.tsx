import { useEffect, useRef, useState } from 'react';

interface ShootingStarData {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export function ShootingStar() {
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

    const shootingStars: ShootingStarData[] = [];
    const maxStars = isMobile ? 1 : 2;

    for (let i = 0; i < maxStars; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 80 + Math.random() * 100,
        speed: 8 + Math.random() * 6,
        angle: (Math.PI / 4) + (Math.random() * 0.2),
        opacity: 0,
        active: false,
      });
    }

    let lastSpawnTime = 0;
    const minSpawnInterval = isMobile ? 8000 : 5000;
    const maxSpawnInterval = isMobile ? 15000 : 10000;

    const spawnShootingStar = (star: ShootingStarData) => {
      star.x = canvas.width * 0.6 + Math.random() * canvas.width * 0.3;
      star.y = canvas.height * 0.1 + Math.random() * canvas.height * 0.3;
      star.opacity = 0.8 + Math.random() * 0.2;
      star.active = true;
    };

    let animationId: number;

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentTime - lastSpawnTime > minSpawnInterval + Math.random() * (maxSpawnInterval - minSpawnInterval)) {
        const inactiveStar = shootingStars.find(s => !s.active);
        if (inactiveStar) {
          spawnShootingStar(inactiveStar);
          lastSpawnTime = currentTime;
        }
      }

      shootingStars.forEach((star) => {
        if (!star.active) return;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y + Math.sin(star.angle) * star.length
        );

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y + Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.x -= Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.y > canvas.height || star.x < 0) {
          star.active = false;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
