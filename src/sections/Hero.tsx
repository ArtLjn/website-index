import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Briefcase, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Briefcase, value: '8+', label: '技术栈' },
  { icon: Code2, value: '15+', label: '项目经验' },
  { icon: Award, value: '6+', label: '开源贡献' },
];

const techTags = ['Go', 'Java', '区块链', '微服务', '多模态AI', '运维'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Avatar entrance animation
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.8, rotation: -5, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
      );

      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.6, stagger: 0.02, ease: 'expo.out', delay: 0.2 }
        );
      }

      // Name animation
      gsap.fromTo(
        nameRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.4 }
      );

      // Stats cards 3D flip animation
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(
          cards,
          { rotateX: 90, opacity: 0 },
          { rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.5 }
        );
      }

      // Tags animation
      if (tagsRef.current) {
        const tags = tagsRef.current.querySelectorAll('.tech-tag');
        gsap.fromTo(
          tags,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2)', delay: 0.7 }
        );
      }

      // Scroll-triggered parallax for avatar
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (avatarRef.current) {
            // 直接修改transform属性，避免每次都创建新的GSAP实例
            avatarRef.current.style.transform = `translateY(${-self.progress * 100}px)`;
          }
        },
      });

      // Title letter spacing on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
        onUpdate: (self) => {
          if (titleRef.current) {
            // 直接修改style属性，避免每次都创建新的GSAP实例
            titleRef.current.style.letterSpacing = `${self.progress * 20}px`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic avatar effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / 25;
    const deltaY = (e.clientY - centerY) / 25;
    
    // 直接修改transform属性，避免每次都创建新的GSAP实例
    avatarRef.current.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!avatarRef.current) return;
    // 使用GSAP的to方法恢复到初始状态
    gsap.to(avatarRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      // 动画完成后清除transform属性，避免与滚动动画冲突
      onComplete: () => {
        avatarRef.current && (avatarRef.current.style.transform = '');
      }
    });
  };

  // Floating animation for avatar
  useEffect(() => {
    if (!avatarRef.current) return;
    gsap.to(avatarRef.current, {
      y: '+=8',
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white noise-overlay"
    >
      {/* Background Grid Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Avatar */}
          <div 
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div
              ref={avatarRef}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 shadow-2xl" />
              
              {/* Avatar image */}
              <img
                src="/avatar.jpg"
                alt="晴空微雨"
                className="relative w-full h-full object-cover rounded-full shadow-2xl"
              />
              
              {/* Enhanced Glow effect with multiple layers */}
              <div className="absolute -inset-4 transform rotate-45 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-30 blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-3 transform rotate-45 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-20 blur-lg animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
              
              {/* Animated particle dots */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow: '0 0 4px 2px rgba(100, 149, 237, 0.7)',
                      animation: `pulse ${2 + Math.random() * 2}s infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Enhanced decorative diamond rings with rotation animation */}
              <div className="absolute -inset-4 transform rotate-45 border-2 border-gray-200 opacity-50 animate-spin-slow" style={{ animationDuration: '20s', animationTimingFunction: 'linear' }} />
              <div className="absolute -inset-8 transform rotate-45 border border-gray-100 opacity-30 animate-spin-slow-reverse" style={{ animationDuration: '25s', animationTimingFunction: 'linear' }} />
              <div className="absolute -inset-6 transform rotate-45 border border-blue-200 opacity-20 animate-spin-slow" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }} />
              
              {/* Inner diamond rings with gradient border */}
              <div className="absolute -inset-2 transform rotate-45 border border-white/80 opacity-40" />
              <div className="absolute -inset-1 transform rotate-45 border border-gradient-to-r from-blue-400 to-purple-500 opacity-60" style={{ borderImage: 'linear-gradient(45deg, #60a5fa, #a855f7) 1' }} />
              
              {/* Interactive ripple effect */}
              <div className="absolute inset-0 transform rotate-45 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" style={{ animationDuration: '5s' }} />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Title */}
            <h2 
              ref={titleRef}
              className="text-sm md:text-base font-medium text-gray-500 tracking-widest uppercase mb-4 overflow-hidden"
            >
              {'技术探索者 / Tech Explorer'.split('').map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            {/* Name */}
            <h1 
              ref={nameRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
            >
              晴空微雨 <span className="text-gray-400 font-light">/ Morning Rain</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              全栈开发者 / 区块链工程师 / 技术爱好者
            </p>

            {/* Tech Tags */}
            <div ref={tagsRef} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="tech-tag px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div 
              ref={statsRef}
              className="flex justify-center lg:justify-start gap-4 md:gap-6"
              style={{ perspective: '1000px' }}
            >
              {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="stat-card flex flex-col items-center p-4 md:p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 mb-2" />
                  <span className="text-xl md:text-2xl font-bold text-black">{stat.value}</span>
                  <span className="text-xs md:text-sm text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  );
}
