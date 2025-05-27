import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { RealmData } from '@/lib/realm-data';
import { useAuth } from '@/context/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRealmTheme } from '@/lib/realm-themes';

interface RealmNavigationProps {
  currentRealmId?: number;
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
  showLabels?: boolean;
}

export function RealmNavigation({
  currentRealmId,
  className = '',
  variant = 'full',
  showLabels = true
}: RealmNavigationProps) {
  const [location, setLocation] = useLocation();
  const { currentRealm } = useAuth();
  
  // Use provided realmId or fallback to auth context
  const realmId = currentRealmId || currentRealm || 1;
  
  // For demo purposes, all realms are unlocked
  const completedRealms = [1]; // Only realm 1 is "completed"
  
  const handleRealmClick = (id: number) => {
    setLocation(`/realm/${id}`);
  };
  
  const handleJourneyMapClick = () => {
    setLocation('/map');
  };
  
  const handleHomeClick = () => {
    setLocation('/home');
  };
  
  const handleBadgesClick = () => {
    setLocation('/badges');
  };
  
  // Get the current realm theme for styling
  const realmTheme = getRealmTheme(realmId);
  
  // Determine sizing based on variant
  const getSize = () => {
    switch(variant) {
      case 'minimal': return 'h-10 w-10';
      case 'compact': return 'h-12 w-12';
      case 'full': default: return 'h-14 w-14';
    }
  };
  
  const iconSize = getSize();
  const iconTextSize = variant === 'minimal' ? 'text-xs' : variant === 'compact' ? 'text-sm' : 'text-base';
  
  // Whether to render horizontally or vertically
  const isHorizontal = variant === 'minimal' || variant === 'compact';
  const containerClass = isHorizontal ? 'flex-row space-x-2' : 'flex-col space-y-3';
  
  return (
    <div className={`${className}`}>
      <div className={`flex ${containerClass} items-center`}>
        {/* Home button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${iconSize} rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-700 text-amber-100`}
                onClick={handleHomeClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Journey Map button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${iconSize} rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-700 text-amber-100`}
                onClick={handleJourneyMapClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Journey Map</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Badges button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${iconSize} rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-700 text-amber-100`}
                onClick={handleBadgesClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Badges</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Separator */}
        {variant === 'full' && (
          <div className="w-full border-t border-amber-700/30 my-2" />
        )}
        
        {/* Realm shortcuts - only show in full and compact variants */}
        {variant !== 'minimal' && (
          <div className={`${isHorizontal ? 'flex space-x-1' : 'space-y-2'}`}>
            {RealmData.map(realm => {
              // Check if realm is active
              const isActive = realm.id === realmId;
              // Check if realm is completed or unlocked
              const isCompleted = completedRealms.includes(realm.id);
              const isUnlocked = realm.id <= currentRealm + 1 || !realm.isLocked;
              
              // Get proper colors based on realm status
              const bgColor = isActive 
                ? `bg-${realm.id === realmId ? realmTheme.colors.primary : 'amber-600'}`
                : isUnlocked ? 'bg-amber-800/60' : 'bg-gray-800/60';
              
              const hoverColor = isUnlocked ? 'hover:bg-amber-700' : '';
              const textColor = isUnlocked ? 'text-amber-100' : 'text-gray-500';
              const borderColor = isActive ? `border-${realmTheme.colors.secondary}` : 'border-amber-700/30';
              
              // Style for the specific realm button
              const realmStyle = {
                backgroundColor: isActive ? realmTheme.colors.primary : (isUnlocked ? '#92400e99' : '#1f2937aa'),
                borderColor: isActive ? realmTheme.colors.secondary : '#92400e40',
                color: isUnlocked ? '#fef3c7' : '#6b7280',
                boxShadow: isActive ? `0 0 8px ${realmTheme.colors.primary}80` : 'none'
              };
              
              return (
                <TooltipProvider key={realm.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        whileHover={isUnlocked ? { scale: 1.05 } : {}}
                        whileTap={isUnlocked ? { scale: 0.95 } : {}}
                        className={`${iconSize} rounded-full border ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'} flex items-center justify-center ${hoverColor} ${textColor}`}
                        style={realmStyle}
                        onClick={() => isUnlocked && handleRealmClick(realm.id)}
                      >
                        <span className={`font-semibold ${iconTextSize}`}>{realm.id}</span>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{realm.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isActive ? 'Current Realm' : 
                         isCompleted ? 'Completed' : 
                         isUnlocked ? 'Available' : 'Locked'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Labels for full variant */}
      {variant === 'full' && showLabels && (
        <div className="mt-4 text-center">
          <h4 className="text-sm font-medium text-amber-200 mb-2">Navigation</h4>
          <p className="text-xs text-amber-100/70">
            Jump between realms or access your journey map
          </p>
        </div>
      )}
    </div>
  );
}