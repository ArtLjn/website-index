import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Kratos-Blog',
    category: '微服务',
    description: '基于go-kratos的微服务博客',
    image: '/project-go.jpg',
    link: 'https://github.com/ArtLjn/kratos-blog',
    tags: ['Go', 'Kratos', '微服务'],
  },
  {
    name: 'Notification',
    category: '工具库',
    description: 'Golang 消息推送工具库 🔧',
    image: '/project-vue.jpg',
    link: 'https://github.com/ArtLjn/Notification',
    tags: ['Go', '工具库', '消息推送'],
  },
  {
    name: 'Heritage',
    category: '区块链',
    description: '区块链非物质文化遗产数字版权保护平台',
    image: '/project-blockchain.jpg',
    link: 'https://github.com/ArtLjn/Heritage',
    tags: ['区块链', '数字版权', '非遗'],
  },
  {
    name: 'MilkTeaOrder',
    category: '餐饮系统',
    description: '奶茶点单系统 - 现代化奶茶店铺数字化解决方案',
    image: '/project-survey.jpg',
    link: 'https://github.com/ArtLjn/MilkTeaOrder',
    tags: ['餐饮系统', '点单系统', '数字化'],
  },
  {
    name: 'Medical Neighbor Assistant',
    category: '医疗系统',
    description: '医邻助手——社区家庭医生问诊管理系统',
    image: '/project-go.jpg',
    link: 'https://github.com/ArtLjn/Medical-Neighbor-Assistant',
    tags: ['医疗系统', '问诊管理', '社区'],
  },
  {
    name: 'SurveyMaster',
    category: '问卷系统',
    description: '在线问卷 / 投票系统',
    image: '/project-survey.jpg',
    link: 'https://github.com/ArtLjn/SurveyMaster',
    tags: ['问卷系统', '投票系统', '在线'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      // Grid 3D tilt animation
        if (gridRef.current) {
          gsap.fromTo(
            gridRef.current,
            { rotateX: 30, opacity: 0 },
            {
              rotateX: 0,
              opacity: 1,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

        // Cards cascade entrance
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Skew on scroll speed
        let lastScrollTop = 0;
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const scrollTop = self.scroll();
            const velocity = scrollTop - lastScrollTop;
            const skewAmount = Math.min(Math.max(velocity * 0.05, -5), 5);
            
            // 直接修改transform属性，避免每次都创建新的GSAP实例
            if (gridRef.current) {
              gridRef.current.style.transform = `skewY(${skewAmount}deg)`;
              
              // 使用requestAnimationFrame来重置transform，避免卡顿
              requestAnimationFrame(() => {
                if (gridRef.current) {
                  gridRef.current.style.transform = 'skewY(0deg)';
                }
              });
            }
            
            lastScrollTop = scrollTop;
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 lg:py-32 bg-white"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
            >
              开源项目
            </h2>
            <p className="text-lg text-gray-500 max-w-xl">
              精选个人开源作品，欢迎Star和Contributing
            </p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-black font-medium hover:underline"
          >
            <Github className="w-5 h-5" />
            查看更多项目
          </a>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => (
            <div
                key={project.name}
                className="project-card group relative bg-white rounded-2xl overflow-hidden cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                    hoveredIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="flex items-center gap-2 text-white font-medium px-6 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    查看项目
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                        hoveredIndex === index
                          ? 'border-black text-black translate-x-0 opacity-100'
                          : '-translate-x-2 opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${project.tags.indexOf(tag) * 50}ms`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2 group-hover:underline">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`查看 ${project.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
