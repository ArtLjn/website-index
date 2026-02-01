import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Layers, FileText, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  {
    title: '个人博客',
    description: '记录一些技术笔记和经验分享',
    icon: BookOpen,
    href: 'https://blog.lllcnm.cn',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'TikTok平台',
    description: 'TikTok 电商管理平台',
    icon: Layers,
    href: 'https://tiktok.lllcnm.cn',
    color: 'from-purple-500 to-pink-500',
  },
];

// 添加GitHub和Gitee链接
const socialLinks = [
  {
    title: 'GitHub',
    description: '开源项目托管平台',
    icon: Code,
    href: 'https://github.com/ArtLjn',
    color: 'from-gray-700 to-gray-900',
  },
  {
    title: 'Gitee',
    description: '国内开源项目托管平台',
    icon: FileText,
    href: 'https://gitee.com/morning-ljn',
    color: 'from-red-500 to-orange-500',
  },
];

// 合并所有链接
const allLinks = [...navLinks, ...socialLinks];

export default function NavLinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links pop in animation
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll('.nav-link-item');
        gsap.fromTo(
          links,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.4)',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic repulsion effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const link = linksRef.current?.querySelectorAll('.nav-link-item')[index] as HTMLElement;
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 120) {
      const force = (120 - distance) / 120;
      const moveX = -deltaX * force * 0.2;
      const moveY = -deltaY * force * 0.2;
      
      // 直接修改transform属性，避免每次都创建新的GSAP实例
      link.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  const handleMouseLeave = (index: number) => {
    const link = linksRef.current?.querySelectorAll('.nav-link-item')[index] as HTMLElement;
    if (!link) return;

    // 使用GSAP的to方法恢复到初始状态
    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      // 动画完成后清除transform属性
      onComplete: () => {
        link.style.transform = '';
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      id="navlinks"
      className="relative w-full py-24 lg:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            网站导航
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            探索更多我的在线内容和资源
          </p>
        </div>

        {/* Links Grid */}
        <div
          ref={linksRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {allLinks.map((link, index) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-item group relative flex items-center gap-6 p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ease-out"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full" />
                <link.icon className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {link.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {link.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 shadow-sm group-hover:shadow-md">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
