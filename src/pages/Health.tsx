
import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ElephantHealthDashboard from "@/components/health/ElephantHealthDashboard";

const Health = () => {
  return (
    <>
      <Helmet>
        <title>Health Monitoring | TuskPatrons</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-elephant-50 dark:bg-elephant-950">
        <Navigation />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-elephant-900 dark:text-white mb-6">
                Elephant Health Monitoring
              </h1>
              
              <ElephantHealthDashboard />
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Health;
