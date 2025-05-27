import React from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, Home, Map, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRealmTheme } from '@/lib/realm-themes';

interface MissionNavigationProps {
  realmId: number;
  missionId?: number;
  totalMissions?: number;
  progress?: number;
  title?: string;
  showHomeButton?: boolean;
  showMapButton?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function MissionNavigation({
  realmId,
  missionId,
  totalMissions = 1,
  progress = 0,
  title = '',
  showHomeButton = true,
  showMapButton = true,
  showProgress = true,
  className = '',
}: MissionNavigationProps) {
  const [, setLocation] = useLocation();
  const realmTheme = getRealmTheme(realmId);

  // Ensure the mission ID is within bounds
  const currentMission = missionId || 1;
  const hasPrevious = currentMission > 1;
  const hasNext = currentMission < totalMissions;

  // Navigation handlers
  const goToPreviousMission = () => {
    if (hasPrevious) {
      setLocation(`/realm/${realmId}/mission/${currentMission - 1}`);
    }
  };

  const goToNextMission = () => {
    if (hasNext) {
      setLocation(`/realm/${realmId}/mission/${currentMission + 1}`);
    }
  };

  const goToRealmHome = () => {
    setLocation(`/realm/${realmId}`);
  };

  const goToMap = () => {
    setLocation('/map');
  };

  const goToHome = () => {
    setLocation('/home');
  };

  // Get colors based on realm theme
  const primaryColor = realmTheme.colors?.primary || '#FFB400';
  const secondaryColor = realmTheme.colors?.secondary || '#FFD700';
  const accent1Color = realmTheme.colors?.accent1 || '#FFA000';
  const progressBgColor = `${accent1Color}20`;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col gap-3">
        {/* Top row with mission title and navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {showHomeButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToRealmHome}
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  backgroundColor: `${primaryColor}30`,
                  color: primaryColor,
                }}
              >
                <BookOpen size={16} />
              </motion.button>
            )}

            {showMapButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToMap}
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  backgroundColor: `${primaryColor}30`,
                  color: primaryColor,
                }}
              >
                <Map size={16} />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToHome}
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                backgroundColor: `${primaryColor}30`,
                color: primaryColor,
              }}
            >
              <Home size={16} />
            </motion.button>

            {title && (
              <h1 className="text-lg font-semibold ml-2" style={{ color: primaryColor }}>
                {title}
              </h1>
            )}
          </div>

          {/* Mission progress text */}
          {missionId && totalMissions > 1 && (
            <div className="text-sm font-medium" style={{ color: secondaryColor }}>
              Mission {missionId} of {totalMissions}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div 
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: progressBgColor }}
          >
            <div 
              className="h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: primaryColor,
              }}
            />
          </div>
        )}

        {/* Bottom row with previous/next buttons */}
        {missionId && totalMissions > 1 && (
          <div className="flex justify-between items-center mt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goToPreviousMission}
              disabled={!hasPrevious}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                hasPrevious ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                backgroundColor: hasPrevious ? `${primaryColor}30` : 'transparent',
                color: hasPrevious ? primaryColor : `${primaryColor}60`,
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goToNextMission}
              disabled={!hasNext}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                hasNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                backgroundColor: hasNext ? `${primaryColor}30` : 'transparent',
                color: hasNext ? primaryColor : `${primaryColor}60`,
              }}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}