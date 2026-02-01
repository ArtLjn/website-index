import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, GitBranch, Lightbulb, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  {
    icon: Code,
    title: '技术深度',
    description: '精通多种编程语言和框架，能够快速掌握新技术并应用于实际项目。',
  },
  {
    icon: GitBranch,
    title: '开源贡献',
    description: '积极参与开源社区，维护多个热门项目，贡献代码和文档。',
  },
  {
    icon: Lightbulb,
    title: '创新能力',
    description: '善于发现问题并提出创新解决方案，推动技术边界不断拓展。',
  },
  {
    icon: Users,
    title: '团队协作',
    description: '优秀的沟通能力和团队精神，能够带领团队高效完成项目目标。',
  },
];

export default function CoreStrengths() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      // Cards fan out animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.strength-card');
        gsap.fromTo(
          cards,
          { 
            rotation: (i) => (i - 1.5) * -5,
            opacity: 0,
            y: 50,
          },
          {
            rotation: 0,
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // 移除滚动时的水平扩展效果，避免生硬的宽度变化
        // 改为使用更平滑的缩放动画
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
          onUpdate: (self) => {
            // 使用缩放代替margin变化，实现更平滑的视觉效果
            const scale = 1 + self.progress * 0.05;
            gsap.to(cards, {
              scale: scale,
              duration: 0.3,
              ease: 'power2.out'
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Icon SVG stroke animation on hover
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const cards = cardsRef.current?.querySelectorAll('.strength-card');
    if (cards) {
      // 平滑展开当前卡片
      gsap.to(cards[index], {
        flex: 3,
        scale: 1.05,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      // 平滑收缩其他卡片
      cards.forEach((card, i) => {
        if (i !== index) {
          gsap.to(card, {
            flex: 0.8,
            opacity: 0.7,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }
    
    // 图标动画
    const icon = cardsRef.current?.querySelectorAll('.strength-icon')[index];
    if (icon) {
      gsap.fromTo(
        icon,
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  };
  
  // Mouse leave handler with smooth animation
  const handleMouseLeave = () => {
    const cards = cardsRef.current?.querySelectorAll('.strength-card');
    if (cards) {
      // 平滑恢复所有卡片
      gsap.to(cards, {
        flex: 1,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
    setHoveredIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="strengths"
      className="relative w-full py-24 lg:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4"
          >
            核心能力
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            持续积累的专业技能，助力项目成功交付
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-2 px-4"
        >
          {strengths.map((strength, index) => (
            <div
              key={strength.title}
              className="strength-card relative flex-1 min-w-0 bg-black text-white rounded-2xl p-6 md:p-8 mx-2 md:mx-1 cursor-pointer hover:shadow-2xl"
              style={{
                transform: `rotate(${(index - 1.5) * 1}deg)`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glass border effect */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <strength.icon
                    className={`strength-icon w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-400'
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  {strength.title}
                </h3>
                
                <p
                  className={`text-sm md:text-base text-gray-400 leading-relaxed transition-all duration-500 ${
                    hoveredIndex === index
                      ? 'opacity-100 max-h-40'
                      : 'opacity-0 max-h-0 md:opacity-70 md:max-h-40'
                  } overflow-hidden`}
                >
                  {strength.description}
                </p>
              </div>

              {/* Number badge */}
              <div className="absolute top-4 right-4 text-5xl md:text-6xl font-bold text-white/5">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
