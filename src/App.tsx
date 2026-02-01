import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import CoreStrengths from './sections/CoreStrengths';
import Projects from './sections/Projects';
import NavLinks from './sections/NavLinks';
import Contact from './sections/Contact';
import { ThemeProvider } from './lib/theme';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Core Strengths Section */}
          <CoreStrengths />

          {/* Projects Section */}
          <Projects />

          {/* Nav Links Section */}
          <NavLinks />

          {/* Contact & Footer Section */}
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
