
import React from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Map from "@/components/Map";
import AlertPanel from "@/components/AlertPanel";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Bell, Shield, Brain, Bird, Activity } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="glass-card rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
      <div className="h-12 w-12 rounded-lg bg-elephant-100 dark:bg-elephant-800 flex items-center justify-center text-elephant-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-elephant-900 dark:text-white mb-2">{title}</h3>
      <p className="text-elephant-600 dark:text-elephant-300 text-sm">{description}</p>
    </div>
  );
};

const Index = () => {
  return (
    <Transition>
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-elephant-50 dark:bg-elephant-900">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-elephant-900 dark:text-white">
                Powered by Advanced Technology
              </h2>
              <p className="text-elephant-600 dark:text-elephant-300">
                Our system combines IoT sensors, real-time data processing, and artificial intelligence to create a comprehensive solution for elephant tracking and conflict prevention.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FeatureCard
                  icon={<MapPin className="h-6 w-6" />}
                  title="Real-Time Tracking"
                  description="Advanced IoT sensors and LoRaWAN connectivity provide accurate, real-time elephant location data across vast wilderness areas."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FeatureCard
                  icon={<Bell className="h-6 w-6" />}
                  title="Intelligent Alerts"
                  description="Multi-channel alert system delivers critical notifications to train operators, forest rangers, and local communities via mobile, web, and SMS."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FeatureCard
                  icon={<Shield className="h-6 w-6" />}
                  title="Conflict Prevention"
                  description="Proactive intervention recommendations help stakeholders take appropriate actions before dangerous situations develop."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FeatureCard
                  icon={<Brain className="h-6 w-6" />}
                  title="AI-Powered Analysis"
                  description="Machine learning algorithms analyze movement patterns to predict elephant behavior and identify potential risk areas."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FeatureCard
                  icon={<Bird className="h-6 w-6" />}
                  title="Conservation Support"
                  description="Data collection and analysis tools support wildlife research and conservation efforts with valuable insights."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FeatureCard
                  icon={<Activity className="h-6 w-6" />}
                  title="Dynamic Reporting"
                  description="Comprehensive data visualization and reporting tools for stakeholders to monitor system performance and wildlife activity."
                />
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="#"
                className="inline-flex items-center text-elephant-600 hover:text-elephant-700 dark:text-elephant-300 dark:hover:text-elephant-200 font-medium"
              >
                Learn more about our technology
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section className="py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-elephant-900 dark:text-white">
                Real-Time Monitoring Dashboard
              </h2>
              <p className="text-elephant-600 dark:text-elephant-300">
                Our interactive dashboard provides stakeholders with up-to-the-minute elephant tracking, alert management, and system analytics.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Map />
              </div>
              <div>
                <AlertPanel className="h-full" />
              </div>
            </div>
            
            <div className="mt-12">
              <Stats />
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="/dashboard"
                className="px-6 py-3 rounded-lg bg-elephant-600 text-white font-medium transition-transform hover:translate-y-[-2px] shadow-button hover:shadow-md inline-flex items-center"
              >
                Access Full Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 bg-elephant-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-elephant-950 to-elephant-900/80"></div>
          
          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join Our Mission to Protect Elephants
                </h2>
                <p className="text-elephant-200 mb-10">
                  Whether you're a wildlife conservation organization, railway operator, or technology partner, we invite you to collaborate with us in creating safer environments for elephants and humans alike.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    className="px-6 py-3 rounded-lg bg-white text-elephant-900 font-medium transition-transform hover:translate-y-[-2px] shadow-button hover:shadow-md flex items-center justify-center"
                  >
                    Partner With Us
                  </a>
                  
                  <a
                    href="#"
                    className="px-6 py-3 rounded-lg bg-transparent border border-white/30 text-white font-medium transition-colors hover:bg-white/10 flex items-center justify-center"
                  >
                    Contact Our Team
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </Transition>
  );
};

export default Index;
