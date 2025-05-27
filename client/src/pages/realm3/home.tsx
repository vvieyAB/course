import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Code, GitMerge, Fingerprint, Lock, Network, Zap, Trees } from 'lucide-react';
import { bioluminescentTheme } from '@/lib/realm-themes'; // Theme for The Forest of Sparks (Realm 3)
import { realm3Missions } from '@/lib/realm3-missions';

export default function Realm3Home() {
  const [hoveredMission, setHoveredMission] = useState<number | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  // Helper function to get correct icon for mission
  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'cryptography':
        return <Lock className="w-5 h-5" />;
      case 'hash':
        return <Fingerprint className="w-5 h-5" />;
      case 'merkle':
        return <GitMerge className="w-5 h-5" />;
      case 'consensus':
        return <Network className="w-5 h-5" />;
      case 'network':
        return <Network className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'lightning':
        return <Zap className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6"
      style={{
        background: `linear-gradient(to bottom, ${bioluminescentTheme.colors.background}, ${bioluminescentTheme.colors.backgroundLight})`,
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <Trees className="w-20 h-20 text-teal-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text"
            style={{ 
              backgroundImage: bioluminescentTheme.gradients?.glow || "linear-gradient(to right, #1A8F60, #46D1A2)",
              textShadow: '0 0 15px rgba(6, 214, 160, 0.3)'
            }}
          >
            Realm 3: The Forest of Sparks
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl text-teal-100 max-w-3xl mx-auto"
          >
            Explore the cryptographic wonders of Bitcoin's technical foundations through the glowing patterns of code that illuminate the forest.
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Forest background decoration */}
          <div 
            className="absolute inset-0 z-0 opacity-10" 
            style={{ 
              backgroundImage: bioluminescentTheme.patterns?.code || "url('/textures/code-pattern.svg')",
              backgroundSize: '200px 200px'
            }}
          ></div>
          
          {/* Radial glow */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: bioluminescentTheme.gradients?.radial || "radial-gradient(circle, rgba(13, 61, 41, 0.0) 0%, rgba(13, 61, 41, 0.8) 80%)",
              pointerEvents: 'none'
            }}
          ></div>
          
          {/* Missions grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {realm3Missions.map((mission) => (
              <motion.div
                key={mission.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredMission(mission.id)}
                onMouseLeave={() => setHoveredMission(null)}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: bioluminescentTheme.shadows?.glow || "0 0 20px rgba(6, 214, 160, 0.7)",
                  transition: { duration: 0.2 }
                }}
                className="bg-gradient-to-br rounded-xl overflow-hidden relative group"
                style={{ 
                  backgroundImage: hoveredMission === mission.id 
                    ? (bioluminescentTheme.gradients?.aurora || "linear-gradient(to bottom right, rgba(6, 214, 160, 0.7), rgba(17, 138, 178, 0.5))") 
                    : 'linear-gradient(to bottom right, rgba(7, 59, 76, 0.7), rgba(17, 138, 178, 0.4))',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="block p-6 h-full" onClick={() => window.location.href = `/realm3/mission/${mission.id % 300 === 0 ? mission.id : mission.id % 300}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-lg" 
                        style={{ 
                          background: 'rgba(6, 214, 160, 0.2)',
                          boxShadow: '0 0 10px rgba(6, 214, 160, 0.3)' 
                        }}
                      >
                        {getMissionIcon(mission.simulationType)}
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium" 
                        style={{ 
                          background: 'rgba(6, 214, 160, 0.2)',
                          color: bioluminescentTheme.colors.secondary 
                        }}
                      >
                        Mission {mission.id === 300 ? 1 : mission.id - 299}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-1" style={{ color: bioluminescentTheme.colors.primary }}>
                      {mission.title}
                    </h2>
                    
                    <p className="text-sm mb-4" style={{ color: bioluminescentTheme.colors.secondary }}>
                      {mission.subtitle}
                    </p>
                    
                    <p className="text-sm text-teal-100 line-clamp-3 mb-6">
                      {mission.description.split('.')[0]}.
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <span className="text-xs font-medium" style={{ color: bioluminescentTheme.colors.accent2 }}>
                          {mission.simulationType.charAt(0).toUpperCase() + mission.simulationType.slice(1)} challenge
                        </span>
                      </div>
                      
                      <div className="flex items-center text-teal-100 text-sm font-medium group-hover:text-teal-300 transition-colors cursor-pointer">
                        Begin
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                </div>
                
                {/* Glowing border effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredMission === mission.id ? 1 : 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    boxShadow: 'inset 0 0 0 2px rgba(6, 214, 160, 0.5)',
                    borderRadius: 'inherit',
                    filter: 'blur(1px)'
                  }}
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Navigation back to main map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button 
            onClick={() => window.location.href = '/map'}
            className="inline-flex items-center px-6 py-3 rounded-full text-teal-900 font-medium transition-all"
            style={{ 
              background: bioluminescentTheme.gradients?.glow || "linear-gradient(to right, #1A8F60, #46D1A2)",
              boxShadow: bioluminescentTheme.shadows?.button || "0 2px 4px rgba(26, 143, 96, 0.3)",
            }}
          >
            <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
            Return to Journey Map
          </button>
        </motion.div>
      </div>
    </div>
  );
}