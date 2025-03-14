
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Github, Twitter, Linkedin } from "lucide-react";
const iconUrl = "https://raw.githubusercontent.com/migavel508/elephant_tracking/main/logo_1.png";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-elephant-950 border-t border-elephant-200 dark:border-elephant-800">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="h-8 w-8 bg-elephant-500 rounded-lg flex items-center justify-center">
                
                <img src={iconUrl} alt="Elephant Icon" className="h-6 w-6" />
              </span>
              <span className="font-display font-semibold text-lg text-elephant-900 dark:text-white">
                Tusk<span className="text-elephant-500">Patrons</span>
              </span>
            </Link>
            
            <p className="text-elephant-600 dark:text-elephant-300 mb-6 max-w-md">
              An intelligent IoT solution designed to prevent human-elephant conflicts along railway corridors through real-time tracking, alerts, and AI-powered intervention.
            </p>
            
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-elephant-100 dark:bg-elephant-800 flex items-center justify-center text-elephant-500 hover:bg-elephant-500 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-elephant-100 dark:bg-elephant-800 flex items-center justify-center text-elephant-500 hover:bg-elephant-500 hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-elephant-100 dark:bg-elephant-800 flex items-center justify-center text-elephant-500 hover:bg-elephant-500 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-elephant-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  Alerts System
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link to="#" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  Research & Data
                </Link>
              </li>
              <li>
                <Link to="#" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-elephant-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
               
                <img src={iconUrl} alt="Elephant Icon" className="h-6 w-6" />
                <span className="text-elephant-600 dark:text-elephant-300">
                  Tusk Patrons, KGiSL, Coimbatore, Tamil Nadu
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-elephant-500" />
                <a href="mailto:info@tuskpatrons.org" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  info@tuskpatrons.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-elephant-500" />
                <a href="tel:+911234567890" className="text-elephant-600 dark:text-elephant-300 hover:text-elephant-500 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-elephant-200 dark:border-elephant-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-elephant-500 text-sm mb-4 md:mb-0">
            © 2025 TuskPatrons. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-elephant-500">
            <a href="#" className="hover:text-elephant-700 dark:hover:text-elephant-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-elephant-700 dark:hover:text-elephant-300 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-elephant-700 dark:hover:text-elephant-300 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
