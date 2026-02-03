import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    AnimationUtils.disableAnimationsIfReducedMotion();

    // Set up scroll animations for sections
    ScrollAnimations.animateOnScroll('.section', {
      duration: 0.6,
      ease: 'power2.out',
      y: 30,
    });

    // Set up stagger animations for lists and grids
    ScrollAnimations.animateOnScroll('.grid > *', {
      duration: 0.5,
      ease: 'power2.out',
      y: 20,
      stagger: 0.1,
    });

    // Apply micro interactions to buttons and cards
    ScrollAnimations.applyButtonMicroInteractions();
    ScrollAnimations.applyCardMicroInteractions();

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
