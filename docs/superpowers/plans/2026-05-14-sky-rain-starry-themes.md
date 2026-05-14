# Sky Rain Starry Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement immersive "Clear Sky with Drizzle" light theme and "Starry Night" dark theme backgrounds that integrate seamlessly with the existing theme system.

**Architecture:** Use fixed-position background layer with CSS gradients/animations for sky/clouds/moon and Canvas for raindrops/stars/shooting stars. Dual-layer crossfade for smooth theme transitions.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Canvas API

---

## 1. Infrastructure Setup

### Task 1.1: Create background component directory

**Files:**
- Create: `src/components/background/index.ts`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p /Users/ljn/Documents/demo/kimi_website/home-index/src/components/background
```

- [ ] **Step 2: Create barrel file index.ts**

```typescript
export { BackgroundLayer } from './BackgroundLayer';
export { SkyRainBackground } from './SkyRainBackground';
export { StarryNightBackground } from './StarryNightBackground';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/index.ts
git commit -m "feat: setup background component directory structure"
```

---

### Task 1.2: Create BackgroundLayer container component

**Files:**
- Create: `src/components/background/BackgroundLayer.tsx`

- [ ] **Step 1: Create BackgroundLayer.tsx**

```tsx
import { useTheme } from '../../lib/theme';
import { SkyRainBackground } from './SkyRainBackground';
import { StarryNightBackground } from './StarryNightBackground';

export function BackgroundLayer() {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SkyRainBackground />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <StarryNightBackground />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create placeholder components to prevent errors**

Create `src/components/background/SkyRainBackground.tsx`:
```tsx
export function SkyRainBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-orange-100" />
  );
}
```

Create `src/components/background/StarryNightBackground.tsx`:
```tsx
export function StarryNightBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-black" />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/BackgroundLayer.tsx
git add src/components/background/SkyRainBackground.tsx
git add src/components/background/StarryNightBackground.tsx
git commit -m "feat: create BackgroundLayer container with placeholders"
```

---

### Task 1.3: Integrate BackgroundLayer into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Read current App.tsx**

- [ ] **Step 2: Import and add BackgroundLayer**

```tsx
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap';
import './App.css';
import { AnimationUtils, ScrollAnimations } from './lib/animations';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import CoreStrengths from './sections/CoreStrengths';
import Projects from './sections/Projects';
import NavLinks from './sections/NavLinks';
import Contact from './sections/Contact';
import { ThemeProvider } from './lib/theme';
import { BackgroundLayer } from './components/background';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    ScrollTrigger.refresh();
    AnimationUtils.disableAnimationsIfReducedMotion();
    ScrollAnimations.animateOnScroll('.section', {
      duration: 0.6,
      ease: 'power2.out',
      y: 30,
    });
    ScrollAnimations.animateOnScroll('.grid > *', {
      duration: 0.5,
      ease: 'power2.out',
      y: 20,
      stagger: 0.1,
    });
    ScrollAnimations.applyButtonMicroInteractions();
    ScrollAnimations.applyCardMicroInteractions();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <BackgroundLayer />
      <div className="relative min-h-screen transition-colors duration-300">
        <Navigation />
        <main className="relative">
          <Hero />
          <About />
          <CoreStrengths />
          <Projects />
          <NavLinks />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 3: Verify it compiles**

```bash
npm run build
```

Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate BackgroundLayer into App"
```

---

## 2. Light Theme - Sky Rain Background

### Task 2.1: Implement sky gradient with sun glow

**Files:**
- Modify: `src/components/background/SkyRainBackground.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add sky gradient styles to index.css**

Add to `src/index.css` at the end:
```css
/* Sky Rain Theme */
@layer utilities {
  .sky-gradient {
    background:
      radial-gradient(circle at 20% 15%, rgba(255, 223, 186, 0.6) 0%, rgba(255, 223, 186, 0.2) 20%, transparent 50%),
      radial-gradient(circle at 20% 15%, rgba(255, 200, 150, 0.4) 0%, transparent 40%),
      linear-gradient(to bottom, #4A90E2 0%, #87CEEB 20%, #B0E0E6 50%, #E0F6FF 75%, #FFF5E6 100%);
  }

  .wet-screen {
    position: relative;
  }

  .wet-screen::before {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
}
```

- [ ] **Step 2: Update SkyRainBackground.tsx**

```tsx
export function SkyRainBackground() {
  return (
    <div className="absolute inset-0 sky-gradient wet-screen">
    </div>
  );
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify: Sky gradient looks realistic with sun glow in top-left

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/background/SkyRainBackground.tsx
git commit -m "feat: add sky gradient with sun glow"
```

---

### Task 2.2: Create Cloud component with CSS pseudo-elements

**Files:**
- Create: `src/components/background/Cloud.tsx`

- [ ] **Step 1: Create Cloud.tsx component**

```tsx
interface CloudProps {
  top: string;
  left: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  duration: number;
  opacity: number;
  delay: number;
}

export function Cloud({ top, left, size, duration, opacity, delay }: CloudProps) {
  const sizeClasses = {
    sm: 'w-24 h-10',
    md: 'w-36 h-14',
    lg: 'w-48 h-20',
    xl: 'w-64 h-24',
  };

  const pseudoSizes = {
    sm: { before: 'w-12 h-12', after: 'w-14 h-14' },
    md: { before: 'w-16 h-16', after: 'w-20 h-20' },
    lg: { before: 'w-20 h-20', after: 'w-24 h-24' },
    xl: { before: 'w-28 h-28', after: 'w-32 h-32' },
  };

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        opacity,
        animation: `float-cloud ${duration}s linear ${delay}s infinite`,
      }}
    >
      <style>{`
        @keyframes float-cloud {
          from { transform: translateX(-200px); }
          to { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>
      <div className={`relative ${sizeClasses[size]}`}>
        <div
          className={`absolute bg-white rounded-full ${sizeClasses[size]} opacity-90`}
          style={{ filter: 'blur(2px)' }}
        />
        <div
          className={`absolute bg-white rounded-full ${pseudoSizes[size].before} opacity-90`}
          style={{
            top: '-40%',
            left: '15%',
            filter: 'blur(2px)',
          }}
        />
        <div
          className={`absolute bg-white rounded-full ${pseudoSizes[size].after} opacity-90`}
          style={{
            top: '-50%',
            right: '10%',
            filter: 'blur(2px)',
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Export from index.ts**

Update `src/components/background/index.ts`:
```typescript
export { BackgroundLayer } from './BackgroundLayer';
export { SkyRainBackground } from './SkyRainBackground';
export { StarryNightBackground } from './StarryNightBackground';
export { Cloud } from './Cloud';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/Cloud.tsx
git add src/components/background/index.ts
git commit -m "feat: create Cloud component with CSS pseudo-elements"
```

---

### Task 2.3: Add clouds to SkyRainBackground

**Files:**
- Modify: `src/components/background/SkyRainBackground.tsx`

- [ ] **Step 1: Import and add Cloud components**

```tsx
import { Cloud } from './Cloud';

export function SkyRainBackground() {
  return (
    <div className="absolute inset-0 sky-gradient wet-screen overflow-hidden">
      <Cloud top="10%" left="-200px" size="lg" duration={35} opacity={0.8} delay={0} />
      <Cloud top="25%" left="-200px" size="md" duration={28} opacity={0.7} delay={5} />
      <Cloud top="5%" left="-200px" size="xl" duration={45} opacity={0.6} delay={10} />
      <Cloud top="18%" left="-200px" size="sm" duration={25} opacity={0.75} delay={15} />
      <Cloud top="30%" left="-200px" size="lg" duration={40} opacity={0.65} delay={20} />
      <Cloud top="8%" left="-200px" size="md" duration={32} opacity={0.7} delay={25} />
    </div>
  );
}
```

- [ ] **Step 2: Verify animations work**

```bash
npm run dev
```

Verify: Clouds float from left to right at different speeds

- [ ] **Step 3: Commit**

```bash
git add src/components/background/SkyRainBackground.tsx
git commit -m "feat: add floating clouds to sky background"
```

---

### Task 2.4: Create Canvas RainDrops component

**Files:**
- Create: `src/components/background/RainDrops.tsx`

- [ ] **Step 1: Create RainDrops.tsx**

```tsx
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
```

- [ ] **Step 2: Export from index.ts**

Update `src/components/background/index.ts`:
```typescript
export { BackgroundLayer } from './BackgroundLayer';
export { SkyRainBackground } from './SkyRainBackground';
export { StarryNightBackground } from './StarryNightBackground';
export { Cloud } from './Cloud';
export { RainDrops } from './RainDrops';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/RainDrops.tsx
git add src/components/background/index.ts
git commit -m "feat: create Canvas RainDrops component"
```

---

### Task 2.5: Integrate RainDrops into SkyRainBackground

**Files:**
- Modify: `src/components/background/SkyRainBackground.tsx`

- [ ] **Step 1: Add RainDrops component**

```tsx
import { Cloud } from './Cloud';
import { RainDrops } from './RainDrops';

export function SkyRainBackground() {
  return (
    <div className="absolute inset-0 sky-gradient wet-screen overflow-hidden">
      <Cloud top="10%" left="-200px" size="lg" duration={35} opacity={0.8} delay={0} />
      <Cloud top="25%" left="-200px" size="md" duration={28} opacity={0.7} delay={5} />
      <Cloud top="5%" left="-200px" size="xl" duration={45} opacity={0.6} delay={10} />
      <Cloud top="18%" left="-200px" size="sm" duration={25} opacity={0.75} delay={15} />
      <Cloud top="30%" left="-200px" size="lg" duration={40} opacity={0.65} delay={20} />
      <Cloud top="8%" left="-200px" size="md" duration={32} opacity={0.7} delay={25} />
      <RainDrops />
    </div>
  );
}
```

- [ ] **Step 2: Test rain animation**

```bash
npm run dev
```

Verify: Rain falls smoothly, slides on scroll

- [ ] **Step 3: Commit**

```bash
git add src/components/background/SkyRainBackground.tsx
git commit -m "feat: integrate RainDrops into sky background"
```

---

## 3. Dark Theme - Starry Night Background

### Task 3.1: Implement night sky gradient with Milky Way

**Files:**
- Modify: `src/components/background/StarryNightBackground.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add night sky styles to index.css**

Add to `src/index.css` at the end:
```css
/* Starry Night Theme */
@layer utilities {
  .night-sky-gradient {
    background:
      radial-gradient(ellipse at 80% 10%, rgba(180, 180, 255, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, rgba(120, 100, 180, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 30% 30%, rgba(100, 120, 180, 0.1) 0%, transparent 40%),
      linear-gradient(to bottom, #0a0a1a 0%, #1a1a3a 30%, #2d1f3d 60%, #0a0a0a 100%);
  }

  .moon-glow {
    position: absolute;
    top: 8%;
    right: 12%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(220, 220, 255, 0.3) 0%, rgba(200, 200, 255, 0.15) 30%, transparent 70%);
    border-radius: 50%;
    filter: blur(10px);
  }

  .moon-core {
    position: absolute;
    top: 12%;
    right: 16%;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 30% 30%, #fffaf0 0%, #e8e8f0 50%, #d0d0e0 100%);
    border-radius: 50%;
    box-shadow: 0 0 40px rgba(220, 220, 255, 0.4), 0 0 80px rgba(200, 200, 255, 0.2);
  }
}
```

- [ ] **Step 2: Update StarryNightBackground.tsx**

```tsx
export function StarryNightBackground() {
  return (
    <div className="absolute inset-0 night-sky-gradient overflow-hidden">
      <div className="moon-glow" />
      <div className="moon-core" />
    </div>
  );
}
```

- [ ] **Step 3: Test visually**

```bash
npm run dev
```

Verify: Night sky gradient with moon in top-right (toggle dark mode to see)

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/background/StarryNightBackground.tsx
git commit -m "feat: add night sky gradient with moon glow"
```

---

### Task 3.2: Create StarField Canvas component

**Files:**
- Create: `src/components/background/StarField.tsx`

- [ ] **Step 1: Create StarField.tsx**

```tsx
import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

export function StarField() {
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

    const starCount = isMobile ? 60 : 120;
    const stars: Star[] = [];

    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(255, 250, 240, ',
      'rgba(240, 248, 255, ',
      'rgba(200, 220, 255, ',
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const opacity = star.opacity * (0.6 + twinkle * 0.4);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + opacity + ')';
        ctx.fill();

        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = star.color + (opacity * 0.2) + ')';
          ctx.fill();
        }
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate();
    } else {
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + star.opacity + ')';
        ctx.fill();
      });
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
      style={{ zIndex: 1 }}
    />
  );
}
```

- [ ] **Step 2: Export from index.ts**

Update `src/components/background/index.ts`:
```typescript
export { BackgroundLayer } from './BackgroundLayer';
export { SkyRainBackground } from './SkyRainBackground';
export { StarryNightBackground } from './StarryNightBackground';
export { Cloud } from './Cloud';
export { RainDrops } from './RainDrops';
export { StarField } from './StarField';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/StarField.tsx
git add src/components/background/index.ts
git commit -m "feat: create Canvas StarField component"
```

---

### Task 3.3: Create ShootingStar component

**Files:**
- Create: `src/components/background/ShootingStar.tsx`

- [ ] **Step 1: Create ShootingStar.tsx**

```tsx
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
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

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
```

- [ ] **Step 2: Export from index.ts**

Update `src/components/background/index.ts`:
```typescript
export { BackgroundLayer } from './BackgroundLayer';
export { SkyRainBackground } from './SkyRainBackground';
export { StarryNightBackground } from './StarryNightBackground';
export { Cloud } from './Cloud';
export { RainDrops } from './RainDrops';
export { StarField } from './StarField';
export { ShootingStar } from './ShootingStar';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/ShootingStar.tsx
git add src/components/background/index.ts
git commit -m "feat: create ShootingStar component"
```

---

### Task 3.4: Integrate StarField and ShootingStar

**Files:**
- Modify: `src/components/background/StarryNightBackground.tsx`

- [ ] **Step 1: Update StarryNightBackground.tsx**

```tsx
import { StarField } from './StarField';
import { ShootingStar } from './ShootingStar';

export function StarryNightBackground() {
  return (
    <div className="absolute inset-0 night-sky-gradient overflow-hidden">
      <div className="moon-glow" />
      <div className="moon-core" />
      <StarField />
      <ShootingStar />
    </div>
  );
}
```

- [ ] **Step 2: Test starry night**

```bash
npm run dev
```

Verify: Stars twinkle, moon is visible, shooting stars appear occasionally (toggle dark mode)

- [ ] **Step 3: Commit**

```bash
git add src/components/background/StarryNightBackground.tsx
git commit -m "feat: integrate StarField and ShootingStar"
```

---

## 4. Theme System & Performance

### Task 4.1: Add performance utils to theme system

**Files:**
- Modify: `src/lib/theme.tsx`

- [ ] **Step 1: Update theme.tsx with performance hooks**

```tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, prefersReducedMotion, isMobile }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 2: Test theme toggle still works**

```bash
npm run dev
```

Verify: Theme toggles correctly

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme.tsx
git commit -m "feat: add performance utils to theme system"
```

---

### Task 4.2: Update background components to use performance settings

**Files:**
- Modify: `src/components/background/Cloud.tsx`
- Modify: `src/components/background/RainDrops.tsx`
- Modify: `src/components/background/StarField.tsx`
- Modify: `src/components/background/ShootingStar.tsx`

- [ ] **Step 1: Update Cloud.tsx for reduced motion**

```tsx
import { useTheme } from '../../lib/theme';

interface CloudProps {
  top: string;
  left: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  duration: number;
  opacity: number;
  delay: number;
}

export function Cloud({ top, left, size, duration, opacity, delay }: CloudProps) {
  const { prefersReducedMotion } = useTheme();

  const sizeClasses = {
    sm: 'w-24 h-10',
    md: 'w-36 h-14',
    lg: 'w-48 h-20',
    xl: 'w-64 h-24',
  };

  const pseudoSizes = {
    sm: { before: 'w-12 h-12', after: 'w-14 h-14' },
    md: { before: 'w-16 h-16', after: 'w-20 h-20' },
    lg: { before: 'w-20 h-20', after: 'w-24 h-24' },
    xl: { before: 'w-28 h-28', after: 'w-32 h-32' },
  };

  if (prefersReducedMotion) {
    return (
      <div className="absolute" style={{ top, left: '10%', opacity: opacity * 0.8 }}>
        <div className={`relative ${sizeClasses[size]}`}>
          <div
            className={`absolute bg-white rounded-full ${sizeClasses[size]} opacity-90`}
            style={{ filter: 'blur(2px)' }}
          />
          <div
            className={`absolute bg-white rounded-full ${pseudoSizes[size].before} opacity-90`}
            style={{
              top: '-40%',
              left: '15%',
              filter: 'blur(2px)',
            }}
          />
          <div
            className={`absolute bg-white rounded-full ${pseudoSizes[size].after} opacity-90`}
            style={{
              top: '-50%',
              right: '10%',
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        opacity,
        animation: `float-cloud ${duration}s linear ${delay}s infinite`,
      }}
    >
      <style>{`
        @keyframes float-cloud {
          from { transform: translateX(-200px); }
          to { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>
      <div className={`relative ${sizeClasses[size]}`}>
        <div
          className={`absolute bg-white rounded-full ${sizeClasses[size]} opacity-90`}
          style={{ filter: 'blur(2px)' }}
        />
        <div
          className={`absolute bg-white rounded-full ${pseudoSizes[size].before} opacity-90`}
          style={{
            top: '-40%',
            left: '15%',
            filter: 'blur(2px)',
          }}
        />
        <div
          className={`absolute bg-white rounded-full ${pseudoSizes[size].after} opacity-90`}
          style={{
            top: '-50%',
            right: '10%',
            filter: 'blur(2px)',
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update SkyRainBackground.tsx to render fewer clouds on mobile**

```tsx
import { useTheme } from '../../lib/theme';
import { Cloud } from './Cloud';
import { RainDrops } from './RainDrops';

export function SkyRainBackground() {
  const { isMobile } = useTheme();

  return (
    <div className="absolute inset-0 sky-gradient wet-screen overflow-hidden">
      <Cloud top="10%" left="-200px" size="lg" duration={35} opacity={0.8} delay={0} />
      <Cloud top="25%" left="-200px" size="md" duration={28} opacity={0.7} delay={5} />
      {!isMobile && <Cloud top="5%" left="-200px" size="xl" duration={45} opacity={0.6} delay={10} />}
      <Cloud top="18%" left="-200px" size="sm" duration={25} opacity={0.75} delay={15} />
      {!isMobile && <Cloud top="30%" left="-200px" size="lg" duration={40} opacity={0.65} delay={20} />}
      <Cloud top="8%" left="-200px" size="md" duration={32} opacity={0.7} delay={25} />
      <RainDrops />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/background/Cloud.tsx
git add src/components/background/SkyRainBackground.tsx
git commit -m "feat: add reduced motion and mobile optimizations"
```

---

## 5. Testing & Validation

### Task 5.1: Full build and visual test

**Files:**
- Test only, no files modified

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Build completes successfully

- [ ] **Step 2: Test in browser**

Verify:
- Light theme shows blue sky, clouds, rain
- Dark theme shows stars, moon, shooting stars
- Theme transitions are smooth (0.8s crossfade)
- Existing content (Hero, About, Projects, etc.) displays correctly
- No layout shift
- No z-index issues (content is above background)

- [ ] **Step 3: Test reduced motion mode**

In browser dev tools:
1. Rendering -> Emulate CSS media feature prefers-reduced-motion -> reduce
2. Verify animations are disabled, static backgrounds shown

- [ ] **Step 4: Test mobile view**

In responsive mode (< 768px):
- Verify fewer particles, same visual quality

---

## Self-Review Checklist

**Spec Coverage:**
- ✅ Sky gradient background (2.1)
- ✅ Floating white clouds (2.2, 2.3)
- ✅ Rain drops animation (2.4, 2.5)
- ✅ Wet screen effect (2.1)
- ✅ Starry night gradient (3.1)
- ✅ Twinkling stars (3.2, 3.4)
- ✅ Moon glow effect (3.1)
- ✅ Shooting star easter egg (3.3, 3.4)
- ✅ Theme integration (1.3, 4.1)
- ✅ Smooth transition (1.2)
- ✅ Reduced motion support (4.2)
- ✅ Mobile optimization (4.2)

**No Placeholders:**
- ✅ All code provided
- ✅ No TBD/TODO
- ✅ Exact file paths
- ✅ Complete implementation steps

**Type Consistency:**
- ✅ Component names consistent
- ✅ Props interfaces defined
- ✅ Export/import statements match
