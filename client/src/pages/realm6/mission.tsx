import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Star, 
  Lightbulb, 
  Trophy,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getRealmName } from '@/lib/realm-utils';
import { useParams } from 'wouter';
import { realm6Missions } from '@/lib/realm6-missions';

interface MissionProps {
  mission?: any;
  onComplete?: () => void;
}

export default function Mission({ mission: propMission, onComplete }: MissionProps) {
  const { missionId } = useParams<{ missionId: string }>();
  const [showObjectives, setShowObjectives] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  // If mission is passed as prop, use it, otherwise find it by missionId
  const mission = propMission || realm6Missions.find(m => m.id === parseInt(missionId || '1'));
  
  // Define theme colors for {getRealmName(6)} (Rose theme)
  const ubuntuTheme = {
    colors: {
      primary: '#e11d48', // rose-600
      secondary: '#fb7185', // rose-400
      background: '#0f172a', // slate-900
      backgroundLight: '#1e293b', // slate-800
      success: '#15803d', // green-700
      textDark: '#881337', // rose-900
      textLight: '#ffe4e6', // rose-50
      accent1: '#be123c',
      accent2: '#f43f5e',
    },
    gradients: {
      main: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
      glow: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
      subtle: 'linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(190, 18, 60, 0.1) 100%)',
    },
    shadows: {
      button: '0 10px 15px -3px rgba(225, 29, 72, 0.2), 0 4px 6px -4px rgba(225, 29, 72, 0.2)',
      card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    }
  };
  
  // Handle case where mission isn't found
  if (!mission) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">Mission Not Found</h2>
        <p className="text-gray-300 mb-6">
          We couldn't find the mission you're looking for. Please try going back to the realm page.
        </p>
        <button 
          onClick={() => window.location.href = '/realm/6'}
          className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
        >
          Return to Ubuntu Village
        </button>
      </div>
    );
  }
  
  // Animation variants for content blocks
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  // Get mission type icon
  const getMissionTypeIcon = () => {
    switch(mission.contentType) {
      case 'realUseCase':
        return <Globe className="h-5 w-5 mr-2" />;
      case 'lightningNetwork':
        return <Star className="h-5 w-5 mr-2" />;
      case 'builders':
        return <Trophy className="h-5 w-5 mr-2" />;
      case 'tools':
        return <Lightbulb className="h-5 w-5 mr-2" />;
      case 'knowledge':
        return <CheckCircle2 className="h-5 w-5 mr-2" />;
      case 'bonus':
        return <Star className="h-5 w-5 mr-2" />;
      default:
        return <Globe className="h-5 w-5 mr-2" />;
    }
  };
  
  // Get mission type label
  const getMissionTypeLabel = () => {
    switch(mission.contentType) {
      case 'realUseCase':
        return "Case Studies";
      case 'lightningNetwork':
        return "Lightning Network";
      case 'builders':
        return "Community Builders";
      case 'tools':
        return "Bitcoin Tools";
      case 'knowledge':
        return "Knowledge Check";
      case 'bonus':
        return "Special Mission";
      default:
        return "Learning Module";
    }
  };
  
  // Set animation complete after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
    // Mark mission as complete in local storage
    try {
      const userData = localStorage.getItem('ashaJourneyUserData');
      if (userData) {
        const data = JSON.parse(userData);
        if (!data.completedMissions.includes(mission.id)) {
          data.completedMissions.push(mission.id);
          localStorage.setItem('ashaJourneyUserData', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error updating mission completion status:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Mission Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h2 
            className="text-2xl md:text-3xl font-bold mb-2" 
            style={{ color: ubuntuTheme.colors.primary }}
          >
            {mission.title}
          </h2>
          
          <div className="flex items-center text-gray-400 text-sm">
            <div className="flex items-center mr-4">
              {getMissionTypeIcon()}
              <span>{getMissionTypeLabel()}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>~15-20 min</span>
            </div>
          </div>
        </div>
        
        <div 
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ 
            background: ubuntuTheme.gradients.subtle,
            color: ubuntuTheme.colors.secondary
          }}
        >
          Mission {mission.id}
        </div>
      </motion.div>
      
      {/* Mission Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? 'max-h-[1000px]' : 'max-h-32'
          }`}
        >
          <div className="prose prose-rose prose-invert max-w-none">
            {mission.description}
          </div>
        </div>
        
        {/* Expand/Collapse button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-full p-1 transform transition-transform duration-300 bg-black/40"
            style={{ 
              color: ubuntuTheme.colors.primary,
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
      
      {/* Mission Summary */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={animationComplete ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div 
          className="p-4 rounded-lg"
          style={{ 
            background: ubuntuTheme.gradients.subtle,
            borderLeft: `4px solid ${ubuntuTheme.colors.primary}`
          }}
        >
          <h3 className="font-medium flex items-center mb-2" style={{ color: ubuntuTheme.colors.primary }}>
            <Lightbulb className="h-4 w-4 mr-2" />
            Mission Summary
          </h3>
          
          <p className="text-sm text-gray-300">
            {mission.subtitle}
          </p>
        </div>
        
        <div
          className="p-4 rounded-lg"
          style={{ 
            background: ubuntuTheme.gradients.subtle,
            borderLeft: `4px solid ${ubuntuTheme.colors.primary}`
          }}
        >
          <div 
            className="flex items-center justify-between mb-2"
            onClick={() => setShowObjectives(!showObjectives)}
          >
            <h3 className="font-medium flex items-center" style={{ color: ubuntuTheme.colors.primary }}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Learning Objectives
            </h3>
            
            <button>
              {showObjectives ? (
                <ChevronDown className="h-4 w-4" style={{ color: ubuntuTheme.colors.primary }} />
              ) : (
                <ChevronRight className="h-4 w-4" style={{ color: ubuntuTheme.colors.primary }} />
              )}
            </button>
          </div>
          
          {showObjectives && (
            <ul className="text-sm text-gray-300 space-y-1 pl-6 list-disc">
              {mission.contentType === 'realUseCase' && (
                <>
                  <li>Understand diverse Bitcoin use cases across Africa</li>
                  <li>Recognize Bitcoin's practical solutions for everyday problems</li>
                  <li>Appreciate the impact of Bitcoin on communities</li>
                </>
              )}
              
              {mission.contentType === 'lightningNetwork' && (
                <>
                  <li>Comprehend how Lightning Network enables micropayments</li>
                  <li>Understand Lightning's benefits for cross-border transactions</li>
                  <li>Learn about practical Lightning applications in Africa</li>
                </>
              )}
              
              {mission.contentType === 'builders' && (
                <>
                  <li>Discover African Bitcoin innovators and their projects</li>
                  <li>Understand the diversity of Bitcoin contributions</li>
                  <li>Recognize how building in Bitcoin creates opportunities</li>
                </>
              )}
              
              {mission.contentType === 'tools' && (
                <>
                  <li>Learn about Bitcoin wallets adapted for African users</li>
                  <li>Understand the different wallet types and their uses</li>
                  <li>Develop ability to choose appropriate tools for different needs</li>
                </>
              )}
              
              {mission.contentType === 'knowledge' && (
                <>
                  <li>Synthesize knowledge from previous missions</li>
                  <li>Develop a holistic view of Bitcoin in Africa</li>
                  <li>Apply knowledge to realistic scenarios</li>
                </>
              )}
              
              {mission.contentType === 'bonus' && (
                <>
                  <li>Create a project concept based on Bitcoin principles</li>
                  <li>Understand how Bitcoin can address community needs</li>
                  <li>Apply the Ubuntu philosophy to Bitcoin projects</li>
                </>
              )}
            </ul>
          )}
        </div>
      </motion.div>
      
      {/* Educational Content */}
      {mission.content && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={animationComplete ? "visible" : "hidden"}
          className="my-6"
        >
          <div 
            className="p-5 rounded-lg bg-black/30 border border-rose-900/30"
          >
            <h3 className="font-medium flex items-center mb-4" style={{ color: ubuntuTheme.colors.primary }}>
              <Lightbulb className="h-5 w-5 mr-2" />
              <span className="text-xl">Educational Content</span>
            </h3>
            
            <div 
              className="prose prose-rose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: mission.content }}
            />
          </div>
        </motion.div>
      )}
      
      {/* External Resources */}
      {mission.contentType === 'realUseCase' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={animationComplete ? "visible" : "hidden"}
          className="p-4 rounded-lg"
          style={{ 
            background: '#18181b',
            borderLeft: `4px solid ${ubuntuTheme.colors.primary}`
          }}
        >
          <h3 className="font-medium flex items-center mb-3" style={{ color: ubuntuTheme.colors.primary }}>
            <Globe className="h-4 w-4 mr-2" />
            African Bitcoin Resources
          </h3>
          
          <p className="text-sm text-gray-300 mb-4">
            Explore these resources to learn more about Bitcoin in Africa:
          </p>
          
          <div className="space-y-3">
            <a 
              href="https://bitcoiners.africa/african-bitcoin-ecosystem/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-black/30 border border-gray-800 rounded-lg hover:bg-black/50 transition-colors"
            >
              <div className="font-medium text-rose-400 mb-1">African Bitcoin Ecosystem Map</div>
              <div className="text-xs text-gray-400">Interactive map of Bitcoin initiatives across Africa</div>
            </a>
            
            <a 
              href="https://bitcoinforbesikho.org/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-black/30 border border-gray-800 rounded-lg hover:bg-black/50 transition-colors"
            >
              <div className="font-medium text-rose-400 mb-1">Bitcoin for Besikho</div>
              <div className="text-xs text-gray-400">Educational resources for African Bitcoin users</div>
            </a>
            
            <a 
              href="https://www.bitmari.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-black/30 border border-gray-800 rounded-lg hover:bg-black/50 transition-colors"
            >
              <div className="font-medium text-rose-400 mb-1">BitMari</div>
              <div className="text-xs text-gray-400">Bitcoin wallet provider focused on African remittances</div>
            </a>
          </div>
        </motion.div>
      )}
      
      {/* Complete Mission Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleComplete}
          className="px-6 py-3 rounded-lg text-white font-semibold transition-all"
          style={{ 
            background: ubuntuTheme.gradients.main,
            boxShadow: ubuntuTheme.shadows.button
          }}
        >
          Mark Mission as Complete
        </button>
      </div>
    </div>
  );
}