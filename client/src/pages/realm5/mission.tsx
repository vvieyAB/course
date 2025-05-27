import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Star, 
  BookOpen, 
  Lightbulb, 
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { realm5Missions } from '@/lib/realm5-missions';
import { getRealmName } from '@/lib/realm-utils';
import { useParams } from 'wouter';

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
  const mission = propMission || realm5Missions.find(m => m.id === parseInt(missionId || '1'));
  
  // Define theme colors for Realm 5 - {getRealmName(5)} (Amber theme)
  const councilTheme = {
    colors: {
      primary: '#d97706', // amber-600
      secondary: '#fbbf24', // amber-400
      background: '#0c0a09', // Darker than black with slight brown tint
      backgroundLight: '#1c1917', // Slate-900
      success: '#15803d', // green-700
      textDark: '#78350f', // amber-900
      textLight: '#fef3c7', // amber-50
      accent1: '#f59e0b',
      accent2: '#b45309',
    },
    gradients: {
      main: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
      glow: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
      subtle: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(180, 83, 9, 0.1) 100%)',
    },
    shadows: {
      button: '0 10px 15px -3px rgba(245, 158, 11, 0.2), 0 4px 6px -4px rgba(245, 158, 11, 0.2)',
      card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    }
  };
  
  // Animation variants for content blocks
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  // Handle case where mission isn't found
  if (!mission) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-amber-600 mb-4">Mission Not Found</h2>
        <p className="text-gray-300 mb-6">
          We couldn't find the mission you're looking for. Please try going back to the realm page.
        </p>
        <button 
          onClick={() => window.location.href = '/realm/5'}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Return to {getRealmName(5)}
        </button>
      </div>
    );
  }

  // Get mission type icon
  const getMissionTypeIcon = () => {
    switch(mission.simulationType) {
      case 'bip':
        return <BookOpen className="h-5 w-5 mr-2" />;
      case 'fork':
        return <Star className="h-5 w-5 mr-2" />;
      case 'historicalForks':
        return <Clock className="h-5 w-5 mr-2" />;
      case 'governance':
        return <Trophy className="h-5 w-5 mr-2" />;
      case 'knowledge':
        return <Lightbulb className="h-5 w-5 mr-2" />;
      case 'failedForks':
        return <ChevronDown className="h-5 w-5 mr-2" />;
      default:
        return <BookOpen className="h-5 w-5 mr-2" />;
    }
  };
  
  // Get mission type label
  const getMissionTypeLabel = () => {
    switch(mission.simulationType) {
      case 'bip':
        return "Protocol Improvement";
      case 'fork':
        return "Fork Analysis";
      case 'historicalForks':
        return "Historical Study";
      case 'governance':
        return "Governance Simulation";
      case 'knowledge':
        return "Knowledge Challenge";
      case 'failedForks':
        return "Case Study";
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
            style={{ color: councilTheme.colors.primary }}
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
            background: councilTheme.gradients.subtle,
            color: councilTheme.colors.secondary
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
          <div className="prose prose-amber prose-invert max-w-none">
            {mission.description}
          </div>
        </div>
        
        {/* Expand/Collapse button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-full p-1 transform transition-transform duration-300 bg-black/40"
            style={{ 
              color: councilTheme.colors.primary,
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
            background: councilTheme.gradients.subtle,
            borderLeft: `4px solid ${councilTheme.colors.primary}`
          }}
        >
          <h3 className="font-medium flex items-center mb-2" style={{ color: councilTheme.colors.primary }}>
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
            background: councilTheme.gradients.subtle,
            borderLeft: `4px solid ${councilTheme.colors.primary}`
          }}
        >
          <div 
            className="flex items-center justify-between mb-2"
            onClick={() => setShowObjectives(!showObjectives)}
          >
            <h3 className="font-medium flex items-center" style={{ color: councilTheme.colors.primary }}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Learning Objectives
            </h3>
            
            <button>
              {showObjectives ? (
                <ChevronDown className="h-4 w-4" style={{ color: councilTheme.colors.primary }} />
              ) : (
                <ChevronRight className="h-4 w-4" style={{ color: councilTheme.colors.primary }} />
              )}
            </button>
          </div>
          
          {showObjectives && (
            <ul className="text-sm text-gray-300 space-y-1 pl-6 list-disc">
              {mission.simulationType === 'bip' && (
                <>
                  <li>Understand the BIP process lifecycle</li>
                  <li>Learn how to structure a technical proposal</li>
                  <li>Recognize the challenges of protocol improvement</li>
                </>
              )}
              
              {mission.simulationType === 'fork' && (
                <>
                  <li>Understand the difference between soft and hard forks</li>
                  <li>Learn the technical implications of each fork type</li>
                  <li>Evaluate tradeoffs in protocol upgrade approaches</li>
                </>
              )}
              
              {mission.simulationType === 'historicalForks' && (
                <>
                  <li>Study key Bitcoin protocol upgrades</li>
                  <li>Analyze community dynamics during contentious changes</li>
                  <li>Understand technical details of major Bitcoin forks</li>
                </>
              )}
              
              {mission.simulationType === 'governance' && (
                <>
                  <li>Identify Bitcoin's key stakeholder groups</li>
                  <li>Understand incentives and priorities of each group</li>
                  <li>Experience the challenges of decentralized decision-making</li>
                </>
              )}
              
              {mission.simulationType === 'knowledge' && (
                <>
                  <li>Test your understanding of Bitcoin governance</li>
                  <li>Apply knowledge from previous missions</li>
                  <li>Identify key principles of Bitcoin's development process</li>
                </>
              )}
              
              {mission.simulationType === 'failedForks' && (
                <>
                  <li>Study unsuccessful protocol change attempts</li>
                  <li>Understand why certain proposals fail to gain consensus</li>
                  <li>Extract lessons for future protocol development</li>
                </>
              )}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}