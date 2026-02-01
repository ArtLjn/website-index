import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/ArtLjn',
    color: '#000000',
  },
  {
    name: 'Gitee',
    icon: Globe,
    href: 'https://gitee.com/morning-ljn',
    color: '#C71D23',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:liuw8789@gmail.com',
    color: '#EA4335',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px),
          radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 1px),
          radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 1px),
          radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 1px)
        `,
        backgroundSize: '550px 550px, 350px 350px, 250px 250px, 150px 150px',
        backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px'
      }}
    >
      {/* Enhanced starry sky overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-80 pointer-events-none" />
      
      {/* Static stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={`static-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1
            }}
          />
        ))}
      </div>
      
      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>
      
      {/* Moving stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`moving-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `moveStar ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Title & Description */}
          <div>
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              联系我
            </h2>
            <div ref={contentRef}>
              <p className="animate-in text-xl md:text-2xl text-gray-400 mb-8 max-w-lg">
                有项目想法或合作意向？欢迎随时与我联系。
              </p>
              <div className="animate-in flex flex-wrap gap-4">
                <a
                  href="mailto:liuw8789@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  发送邮件
                </a>
                <a
                  href="https://github.com/ArtLjn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  <Github className="w-5 h-5" />
                  查看GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 p-6 border border-white/10 rounded-xl hover:bg-white hover:border-white transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-out group-hover:scale-110"
                  style={{ backgroundColor: `${link.color}20` }}
                >
                  <link.icon
                    className="w-5 h-5 transition-colors duration-200 ease-out"
                    style={{ color: link.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-black transition-colors duration-200 ease-out">
                    {link.name}
                  </h3>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors duration-200 ease-out"
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
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          {/* Starry footer decoration */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute top-2 left-0 right-0 flex justify-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-white animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          <p className="text-gray-400 text-sm relative z-10">
            © 2026 晴空微雨. 保留所有权利。
          </p>
          <div className="flex items-center gap-8 relative z-10">
            <a href="#hero" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              回到顶部
            </a>
            <a href="#about" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              关于我
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              项目
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
