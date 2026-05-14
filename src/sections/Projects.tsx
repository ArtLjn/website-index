import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Ocean CLI',
    category: 'AI 工具链',
    description: 'Enhanced Claude Code CLI — 多模型切换、结构化记忆（SQLite+FTS5）、多 Agent 协作与 Skill 系统',
    image: '/project-go.jpg',
    link: 'https://github.com/ArtLjn/ocean-cc-cli',
    tags: ['TypeScript', 'LLM', 'CLI'],
  },
  {
    name: 'Ocean Feishu MCP',
    category: 'MCP Server',
    description: 'Claude Code × 飞书双向消息桥 — 访问控制、权限中继与自然语言判决',
    image: '/project-vue.jpg',
    link: 'https://github.com/ArtLjn/ocean-feishu-mcp',
    tags: ['TypeScript', '飞书', 'MCP'],
  },
  {
    name: 'Ocean Dock',
    category: 'MCP Server',
    description: 'Session Manager & MCP Server — 会话管理、自动化 Hooks、12 个 MCP 工具',
    image: '/project-survey.jpg',
    link: 'https://github.com/ArtLjn/ocean-dock',
    tags: ['Python', 'MCP', 'Agent'],
  },
  {
    name: 'NSQA',
    category: '学术问答',
    description: 'Neural-Symbolic QA — 混合检索 + 知识图谱 + 多跳推理的学术论文问答系统',
    image: '/project-blockchain.jpg',
    link: 'https://github.com/ArtLjn/NSQA',
    tags: ['Python', '知识图谱', 'NLP'],
  },
  {
    name: 'Skillify',
    category: 'LLM 框架',
    description: 'LLM Skill 轻量级管理框架 — 注册 · 匹配 · 执行 · 校验',
    image: '/project-blockchain.jpg',
    link: 'https://github.com/ArtLjn/skillify',
    tags: ['Python', 'LLM', '框架'],
  },
  {
    name: 'DiskPulse',
    category: 'macOS 工具',
    description: 'macOS 智能磁盘空间分析器 — 脏数据检测、重复文件查找、安全清理，SwiftUI 构建',
    image: '/project-go.jpg',
    link: 'https://github.com/ArtLjn/DiskPulse',
    tags: ['Swift', 'SwiftUI', 'macOS'],
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
      className="section relative w-full py-24 lg:py-32 transition-colors duration-300"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4"
            >
              开源项目
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
              精选个人开源作品，欢迎Star和Contributing
            </p>
          </div>
          <a
            href="https://github.com/ArtLjn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-black dark:text-white font-medium hover:underline"
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
                className="project-card group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300"
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
                  <span className="px-3 py-1 bg-black dark:bg-gray-700 text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${hoveredIndex === index
                          ? 'border-black dark:border-white text-black dark:text-white translate-x-0 opacity-100'
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
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2 group-hover:underline">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-2">
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
