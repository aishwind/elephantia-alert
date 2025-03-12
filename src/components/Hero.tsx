
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;

      const elements = container.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const depth = parseFloat(htmlEl.dataset.depth || "1");
        htmlEl.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };

    container.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Background blur elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-elephant-300/20 dark:bg-elephant-600/10 rounded-full filter blur-3xl opacity-70 parallax" data-depth="1.2"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-nature-300/20 dark:bg-nature-600/10 rounded-full filter blur-3xl opacity-70 parallax" data-depth="0.8"></div>

      <div className="relative z-10 section-container flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl"
        >
          <div className="mb-6 inline-block">
            <span className="px-3 py-1 text-xs rounded-full bg-elephant-100 dark:bg-elephant-800 text-elephant-600 dark:text-elephant-300 font-medium">
              Protecting Wildlife & Communities
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            <span className="block">Elephant Early Warning &</span>
            <span className="linear-wipe">Monitoring System</span>
          </h1>
          
          <p className="text-lg md:text-xl text-elephant-600 dark:text-elephant-300 mb-10 max-w-3xl mx-auto">
            An intelligent IoT solution designed to prevent human-elephant conflicts along railway corridors through real-time tracking, alerts, and AI-powered intervention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-lg bg-elephant-600 text-white font-medium transition-transform hover:translate-y-[-2px] shadow-button hover:shadow-md flex items-center justify-center"
            >
              Live Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/about"
              className="px-6 py-3 rounded-lg bg-white dark:bg-elephant-800 border border-elephant-200 dark:border-elephant-700 text-elephant-600 dark:text-elephant-200 font-medium transition-colors hover:bg-elephant-50 dark:hover:bg-elephant-700 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        
        {/* Animated image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 max-w-5xl w-full relative parallax"
          data-depth="0.5"
        >
          <div className="aspect-video rounded-2xl overflow-hidden shadow-card border border-elephant-200 dark:border-elephant-800 relative">
            <div className="absolute inset-0 bg-elephant-950/60 flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-elephant-300 animate-pulse-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Interactive Demo Video</p>
              </div>
            </div>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card-dark px-6 py-3 rounded-xl flex items-center justify-between gap-6 text-white max-w-md w-full">
            <div className="text-center">
              <p className="text-2xl font-bold">94%</p>
              <p className="text-xs">Alert Accuracy</p>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">3.5<span className="text-sm">min</span></p>
              <p className="text-xs">Response Time</p>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">82%</p>
              <p className="text-xs">Conflict Reduction</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-sm text-elephant-500 mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-elephant-300 dark:border-elephant-700 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-2 h-2 bg-elephant-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
