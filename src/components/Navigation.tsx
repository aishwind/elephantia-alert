import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, MapPin, Bell, Info, LayoutDashboard, Bot } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: "Home", path: "/", icon: <MapPin className="h-4 w-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Elli", path: "/elli", icon: <Bot className="h-4 w-4" /> },
    { name: "Alerts", path: "/alerts", icon: <Bell className="h-4 w-4" /> },
    { name: "About", path: "/about", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
        scrolled
          ? "bg-white/80 dark:bg-elephant-950/80 backdrop-blur-md shadow-elegant"
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 bg-elephant-500 rounded-lg flex items-center justify-center">
              
              <MapPin className="h-4 w-4 text-white" />
            </span>
            <span className="font-display font-semibold text-lg text-elephant-900 dark:text-white">
              Tusk<span className="text-elephant-500">Patrons</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-medium text-sm flex items-center space-x-1 transition-colors",
                  location.pathname === item.path
                    ? "text-elephant-600 dark:text-elephant-300"
                    : "text-elephant-600/60 hover:text-elephant-600 dark:text-elephant-300/60 dark:hover:text-elephant-300"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navigation-underline"
                    className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-elephant-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-md text-elephant-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-elephant-950 shadow-md rounded-b-lg mx-4 mt-2 overflow-hidden"
          >
            <div className="py-2 px-4 flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 py-3 px-4 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-elephant-50 dark:bg-elephant-900/50 text-elephant-600 dark:text-elephant-300"
                      : "text-elephant-600/60 hover:bg-elephant-50 dark:text-elephant-300/60 dark:hover:bg-elephant-900/30"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
