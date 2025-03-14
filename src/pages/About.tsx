
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | TuskPatrons</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-elephant-50 dark:bg-elephant-950">
        <Navigation />

        <main className="flex-1 pt-24 pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-elephant-900 dark:text-white mb-6">
                About TuskPatrons
              </h1>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                  <CardDescription>
                    Preventing human-elephant conflicts through technology and community engagement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    TuskPatrons is dedicated to developing innovative solutions that help prevent 
                    human-elephant conflicts, particularly along railway corridors. Our technology 
                    combines IoT sensors, AI-driven prediction models, and community engagement to 
                    create safer environments for both elephants and humans.
                  </p>
                  <p>
                    By leveraging the power of Google's Gemini AI alongside historical elephant 
                    movement data, we can predict high-risk areas and alert train operators and local 
                    communities before potential incidents occur.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>AI-powered prediction models</li>
                      <li>Real-time tracking systems</li>
                      <li>Early warning alert networks</li>
                      <li>IoT sensors and LoRa technology</li>
                      <li>Mobile applications for communities</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Local participation programs</li>
                      <li>Education and awareness campaigns</li>
                      <li>Fair compensation systems</li>
                      <li>Incentive-based reporting</li>
                      <li>Collaborative decision-making</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Our Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Since our inception, TuskPatrons has significantly reduced elephant-train 
                    accidents in key corridors across India, particularly in Tamil Nadu's Coimbatore 
                    and Dharmapuri regions. Our technology has helped:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-elephant-100 dark:bg-elephant-900/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-semibold text-elephant-600 dark:text-elephant-300">
                        75%
                      </div>
                      <div className="text-sm text-elephant-600 dark:text-elephant-400">
                        Reduction in train-elephant collisions
                      </div>
                    </div>
                    
                    <div className="bg-elephant-100 dark:bg-elephant-900/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-semibold text-elephant-600 dark:text-elephant-300">
                        5,000+
                      </div>
                      <div className="text-sm text-elephant-600 dark:text-elephant-400">
                        Community members engaged
                      </div>
                    </div>
                    
                    <div className="bg-elephant-100 dark:bg-elephant-900/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-semibold text-elephant-600 dark:text-elephant-300">
                        ₹2.5 Cr
                      </div>
                      <div className="text-sm text-elephant-600 dark:text-elephant-400">
                        Saved in damages and compensation
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
