import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation constants for consistency
export const ANIMATION = {
  // Duration ranges (in seconds)
  DURATION: {
    SHORT: 0.4,
    MEDIUM: 0.6,
    LONG: 0.8,
  },
  
  // Easing functions
  EASE: {
    OUT: 'power2.out',      // Smooth deceleration
    IN_OUT: 'power2.inOut', // Smooth acceleration and deceleration
    EXPO: 'expo.out',       // More dramatic but still controlled
    CIRC: 'circ.out',       // Natural feeling ease
  },
  
  // Common animation values
  OPACITY: {
    HIDDEN: 0,
    VISIBLE: 1,
  },
  
  TRANSFORM: {
    Y: {
      UP: -20,
      DOWN: 20,
      SMALL_UP: -10,
      SMALL_DOWN: 10,
    },
    X: {
      LEFT: -20,
      RIGHT: 20,
      SMALL_LEFT: -10,
      SMALL_RIGHT: 10,
    },
    SCALE: {
      SMALL: 0.95,
      NORMAL: 1,
      LARGE: 1.05,
    },
  },
};

// Base animation class for reusable animations
export class BaseAnimation {
  // Fade in animation
  static fadeIn(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.MEDIUM,
      ease = ANIMATION.EASE.OUT,
      y = ANIMATION.TRANSFORM.Y.UP,
      delay = 0,
    } = options;

    return gsap.fromTo(
      element,
      { opacity: ANIMATION.OPACITY.HIDDEN, y },
      { opacity: ANIMATION.OPACITY.VISIBLE, y: 0, duration, ease, delay }
    );
  }

  // Fade out animation
  static fadeOut(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.MEDIUM,
      ease = ANIMATION.EASE.IN_OUT,
      y = ANIMATION.TRANSFORM.Y.DOWN,
      delay = 0,
    } = options;

    return gsap.to(element, {
      opacity: ANIMATION.OPACITY.HIDDEN,
      y,
      duration,
      ease,
      delay,
    });
  }

  // Scale in animation
  static scaleIn(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.MEDIUM,
      ease = ANIMATION.EASE.OUT,
      scale = ANIMATION.TRANSFORM.SCALE.SMALL,
      delay = 0,
    } = options;

    return gsap.fromTo(
      element,
      { opacity: ANIMATION.OPACITY.HIDDEN, scale },
      { opacity: ANIMATION.OPACITY.VISIBLE, scale: ANIMATION.TRANSFORM.SCALE.NORMAL, duration, ease, delay }
    );
  }

  // Hover animation (subtle scale - performance optimized)
  static hover(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.SHORT,
      ease = ANIMATION.EASE.OUT,
      scale = ANIMATION.TRANSFORM.SCALE.LARGE,
    } = options;

    // Mouse enter animation
    const enterTween = gsap.to(element, {
      scale,
      duration,
      ease,
      paused: true,
    });

    // Mouse leave animation
    const leaveTween = gsap.to(element, {
      scale: ANIMATION.TRANSFORM.SCALE.NORMAL,
      duration,
      ease,
      paused: true,
    });

    // Add event listeners if element is an HTMLElement
    // Only add listeners for desktop devices to improve mobile performance
    if (element instanceof HTMLElement && window.innerWidth > 768) {
      element.addEventListener('mouseenter', () => {
        enterTween.play();
      });

      element.addEventListener('mouseleave', () => {
        leaveTween.play();
      });
    }

    return { enterTween, leaveTween };
  }

  // Micro interaction for buttons (subtle movement - performance optimized)
  static buttonMicroInteraction(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = 0.2,
      ease = ANIMATION.EASE.OUT,
      y = -2,
      // Removed box-shadow to avoid layout shifts
    } = options;

    // Mouse enter animation
    const enterTween = gsap.to(element, {
      y,
      // Only use transform properties for better performance
      duration,
      ease,
      paused: true,
    });

    // Mouse leave animation
    const leaveTween = gsap.to(element, {
      y: 0,
      duration,
      ease,
      paused: true,
    });

    // Add event listeners if element is an HTMLElement
    // Only add listeners for desktop devices to improve mobile performance
    if (element instanceof HTMLElement && window.innerWidth > 768) {
      element.addEventListener('mouseenter', () => {
        enterTween.play();
      });

      element.addEventListener('mouseleave', () => {
        leaveTween.play();
      });
    }

    return { enterTween, leaveTween };
  }

  // Micro interaction for cards (subtle movement - performance optimized)
  static cardMicroInteraction(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = 0.25,
      ease = ANIMATION.EASE.OUT,
      y = -4,
      // Removed box-shadow to avoid layout shifts
    } = options;

    // Mouse enter animation
    const enterTween = gsap.to(element, {
      y,
      // Only use transform properties for better performance
      duration,
      ease,
      paused: true,
    });

    // Mouse leave animation
    const leaveTween = gsap.to(element, {
      y: 0,
      duration,
      ease,
      paused: true,
    });

    // Add event listeners if element is an HTMLElement
    // Only add listeners for desktop devices to improve mobile performance
    if (element instanceof HTMLElement && window.innerWidth > 768) {
      element.addEventListener('mouseenter', () => {
        enterTween.play();
      });

      element.addEventListener('mouseleave', () => {
        leaveTween.play();
      });
    }

    return { enterTween, leaveTween };
  }

  // Scroll reveal animation
  static scrollReveal(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.MEDIUM,
      ease = ANIMATION.EASE.OUT,
      y = ANIMATION.TRANSFORM.Y.DOWN,
    } = options;

    return gsap.fromTo(
      element,
      { opacity: ANIMATION.OPACITY.HIDDEN, y },
      {
        opacity: ANIMATION.OPACITY.VISIBLE,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Staggered animation for multiple elements
  static stagger(element: gsap.DOMTarget, options: any = {}) {
    const {
      duration = ANIMATION.DURATION.MEDIUM,
      ease = ANIMATION.EASE.OUT,
      y = ANIMATION.TRANSFORM.Y.DOWN,
      stagger = 0.1,
    } = options;

    return gsap.fromTo(
      element,
      { opacity: ANIMATION.OPACITY.HIDDEN, y },
      {
        opacity: ANIMATION.OPACITY.VISIBLE,
        y: 0,
        duration,
        ease,
        stagger,
      }
    );
  }

  // Parallax animation
  static parallax(element: gsap.DOMTarget, options: any = {}) {
    const {
      y = 100,
    } = options;

    return gsap.fromTo(
      element,
      { y: 0 },
      {
        y,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }
}

// Scroll-based animations
export class ScrollAnimations {
  // Animate elements on scroll
  static animateOnScroll(selector: string, options: any = {}) {
    const elements = gsap.utils.toArray(selector);
    
    elements.forEach((element, index) => {
      BaseAnimation.scrollReveal(element as gsap.DOMTarget, {
        delay: index * 0.1,
        ...options,
      });
    });
  }

  // Create a timeline for scroll-based animations
  static createScrollTimeline(trigger: string | HTMLElement, options: any = {}) {
    const {
      start = 'top bottom-=100',
      end = 'bottom top+=100',
      scrub = 1,
    } = options;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    });

    return timeline;
  }

  // Apply micro interactions to buttons
  static applyButtonMicroInteractions(selector: string = 'button, .btn, .button') {
    // Only apply micro interactions on desktop devices
    if (window.innerWidth <= 768) return;
    
    const buttons = gsap.utils.toArray(selector);
    
    buttons.forEach((button) => {
      BaseAnimation.buttonMicroInteraction(button as gsap.DOMTarget);
    });
  }

  // Apply micro interactions to cards
  static applyCardMicroInteractions(selector: string = '.card, .strength-card, .project-card, .nav-link-item') {
    // Only apply micro interactions on desktop devices
    if (window.innerWidth <= 768) return;
    
    const cards = gsap.utils.toArray(selector);
    
    cards.forEach((card) => {
      BaseAnimation.cardMicroInteraction(card as gsap.DOMTarget);
    });
  }
}

// Utility functions for animations
export const AnimationUtils = {
  // Check if reduced motion is preferred
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Disable animations if reduced motion is preferred
  disableAnimationsIfReducedMotion(): void {
    if (AnimationUtils.prefersReducedMotion()) {
      gsap.globalTimeline.timeScale(0);
    }
  },

  // Get a random value between min and max
  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },

  // Create a reusable animation timeline
  createTimeline(options: any = {}): gsap.core.Timeline {
    return gsap.timeline(options);
  },

  // Page transition animation
  pageTransition(outgoingElement: gsap.DOMTarget, incomingElement: gsap.DOMTarget, options: any = {}) {
    const {
      duration = 0.4, // Less than 500ms
      easeOut = ANIMATION.EASE.OUT,
      easeIn = ANIMATION.EASE.OUT,
      yOffset = 15, // 10-20px
    } = options;

    const timeline = gsap.timeline({
      defaults: {
        duration,
      },
    });

    // Outgoing page fade out
    timeline.to(outgoingElement, {
      opacity: 0,
      duration: duration * 0.5,
      ease: easeOut,
    });

    // Incoming page fade in from below
    timeline.fromTo(
      incomingElement,
      { opacity: 0, y: yOffset },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.5,
        ease: easeIn,
      },
      duration * 0.3 // Overlap animations for faster response
    );

    return timeline;
  }
};

export default {
  ANIMATION,
  BaseAnimation,
  ScrollAnimations,
  AnimationUtils,
};