import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/theme';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '关于', href: '#about' },
  { label: '能力', href: '#strengths' },
  { label: '项目', href: '#projects' },
  { label: '导航', href: '#navlinks' },
  { label: '联系', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // 使用requestAnimationFrame优化滚动性能
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1 }
      );
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
          ref={navRef}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm dark:shadow-gray-800/20'
              : 'py-6 bg-transparent'
          }`}
        >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-black dark:text-white' : 'text-black dark:text-white'
              }`}
            >
              LC<span className="text-gray-400 dark:text-gray-500">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70'
              }`}
              aria-label={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`hidden md:inline-flex px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700'
                  : 'bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              联系我
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 p-6 transition-all duration-300 ease-out ${isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block w-full px-4 py-3 text-center bg-black text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                联系我
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
