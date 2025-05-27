import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { OriginsBackground } from '@/components/ui/origins-background';
import { ChevronRight } from 'lucide-react';

export default function HomeIntroPage() {
  const [, setLocation] = useLocation();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const handleStartStory = () => {
    setLocation("/auth");
  };
  
  const handleSkipToApp = () => {
    setLocation("/auth");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-950">
      <OriginsBackground 
        patternType="adinkra" 
        opacity={0.15} 
        withGradient={true} 
        roundedCorners={false}
        className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8"
      >
        <motion.div 
          className="max-w-5xl w-full bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl overflow-hidden shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-60 md:h-auto">
              <img 
                src="/assets/realms/intro-banner.svg" 
                alt="Asha's Journey" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-4xl font-bold text-amber-900 font-serif mb-2">
                  Asha's Journey
                </h1>
                <h2 className="text-xl text-amber-800 mb-6">Through the Realms of Money</h2>
              </motion.div>
              
              <motion.div variants={itemVariants} className="prose prose-amber mb-8">
                <p>
                  Welcome to an interactive educational adventure that takes you through the evolution of money,
                  from ancient trade systems to modern Bitcoin technology.
                </p>
                <p>
                  Follow Asha as she explores seven distinct realms of knowledge, each revealing new insights about
                  monetary systems, governance, technology, and economic freedom.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <button
                  onClick={handleStartStory}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 
                    text-white font-bold shadow-lg shadow-amber-700/30 hover:shadow-amber-700/50 
                    hover:from-amber-700 hover:to-amber-800 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Begin Your Journey</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                
                <div className="text-center">
                  <button 
                    onClick={handleSkipToApp}
                    className="text-amber-800 text-sm hover:text-amber-950 underline decoration-dotted underline-offset-4"
                  >
                    Skip to Authentication
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="p-4 border-t border-amber-200 bg-amber-50/50 text-center text-amber-800 text-sm">
            An educational platform for learning about money, Bitcoin, and financial systems through interactive storytelling
          </div>
        </motion.div>
      </OriginsBackground>
    </div>
  );
}