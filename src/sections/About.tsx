import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title slide in and pin
      gsap.fromTo(
        titleRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content lines reveal
      if (contentRef.current) {
        const lines = contentRef.current.querySelectorAll('.text-line');
        gsap.fromTo(
          lines,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Highlight effect on scroll
        lines.forEach((line) => {
          ScrollTrigger.create({
            trigger: line,
            start: 'top 70%',
            end: 'top 30%',
            onEnter: () => {
              gsap.to(line, { color: '#000', duration: 0.4, ease: 'power2.out' });
            },
            onLeave: () => {
              gsap.to(line, { color: '#666', duration: 0.4, ease: 'power2.out' });
            },
            onEnterBack: () => {
              gsap.to(line, { color: '#000', duration: 0.4, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              gsap.to(line, { color: '#666', duration: 0.4, ease: 'power2.out' });
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = [
    '我是一名全栈开发者和开源贡献者，专注于构建高性能、可扩展的应用程序。',
    '我积极参与各类项目实践，擅长将复杂需求转化为优雅的技术解决方案。',
    '我的技术栈涵盖现代前端框架、后端微服务架构以及云原生部署。',
    '在区块链领域，我深入研究智能合约和分布式系统的设计与实现。',
    '我相信代码不仅是功能的实现，更是艺术与工程的完美结合。',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Fixed Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2
                ref={titleRef}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-tight"
              >
                个人
                <br />
                <span className="text-gray-300">简介</span>
              </h2>
              <div className="mt-6 w-20 h-1 bg-black" />
            </div>
          </div>

          {/* Right: Flowing Content */}
          <div className="lg:col-span-8">
            <div ref={contentRef} className="space-y-6">
              {paragraphs.map((text, index) => (
                <div key={index} className="overflow-hidden">
                  <p className="text-line text-xl md:text-2xl lg:text-3xl font-light text-gray-500 leading-relaxed transition-colors duration-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { category: '后端', skills: 'Go, Java, Node.js, Python' },
                { category: '前端', skills: 'Vue, React, TypeScript' },
                { category: '数据库', skills: 'PostgreSQL, MongoDB, Redis' },
                { category: 'DevOps', skills: 'Docker, K8s, CI/CD' },
                { category: '区块链', skills: 'Ethereum, Hyperledger' },
                { category: '云服务', skills: 'AWS,阿里云,腾讯云' },
              ].map((item) => (
                <div
                  key={item.category}
                  className="p-5 border border-gray-200 rounded-lg hover:border-black hover:bg-black hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
                >
                  <h4 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 mb-2 uppercase tracking-wider">
                    {item.category}
                  </h4>
                  <p className="text-sm font-medium">{item.skills}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
