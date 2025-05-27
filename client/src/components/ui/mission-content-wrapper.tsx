import React, { ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MissionNavigation } from './mission-navigation';
import { getRealmTheme } from '@/lib/realm-themes';

interface MissionContentWrapperProps {
  children: ReactNode;
  realmId: number;
  missionId?: number;
  totalMissions?: number;
  title?: string;
  subtitle?: string;
  progress?: number;
  showNavigation?: boolean;
  showSidebarNav?: boolean;
  className?: string;
  mission?: any; // Adding mission prop to pass mission data
}

// Placeholder components for SimulationLoader and QuizLoader
const SimulationLoader = React.lazy(() => import("@/components/ui/SimulationLoader"));
const QuizLoader = React.lazy(() => import("@/components/ui/QuizLoader"));
const CryptographySimulator = React.lazy(() => import("@/components/simulations/CryptographySimulator"));
const HashingSimulator = React.lazy(() => import("@/components/simulations/HashFunctionSimulator"));
const MerkleTreeSimulator = React.lazy(() => import("@/components/simulations/MerkleTreeSimulator"));
const ConsensusSimulator = React.lazy(() => import("@/components/simulations/ConsensusSimulator"));
const MiningSimulator = React.lazy(() => import("@/components/simulations/MiningSimulator"));
// const BipSimulator = React.lazy(() => import("@/components/simulations/BipSimulator"));
// const ForkSimulator = React.lazy(() => import("@/components/simulations/ForkSimulator"));
// const RealUseCase = React.lazy(() => import("@/components/simulations/RealUseCase"));
// const LightningNetwork = React.lazy(() => import("@/components/simulations/LightningNetworkSimulator"));
// const ComprehensiveReview = React.lazy(() => import("@/components/simulations/ComprehensiveReview"));

export function MissionContentWrapper({
  children,
  realmId,
  missionId,
  totalMissions = 1,
  title = '',
  subtitle = '',
  progress = 0,
  showNavigation = true,
  showSidebarNav = false,
  className = '',
  mission, // Receiving mission data
}: MissionContentWrapperProps) {
  const realmTheme = getRealmTheme(realmId);

  // Get colors from realm theme
  const bgColor = realmTheme.colors?.background || '#121212';
  const textColor = realmTheme.colors?.textLight || '#ffffff';
  const primaryColor = realmTheme.colors?.primary || '#FFB400';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      className={`min-h-screen pb-20 ${className}`}
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
        backgroundImage: realmTheme.backgroundTexture || 'none'
      }}
    >
      {/* Header with navigation */}
      {showNavigation && (
        <header 
          className="sticky top-0 z-50 border-b"
          style={{ 
            backgroundColor: `${bgColor}cc`, 
            backdropFilter: 'blur(8px)',
            borderColor: `${primaryColor}30`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <MissionNavigation 
              realmId={realmId}
              missionId={missionId}
              totalMissions={totalMissions}
              progress={progress}
              title={title}
              showHomeButton={true}
              showMapButton={true}
              showProgress={true}
            />
          </div>
        </header>
      )}

      {/* Content section with optional sidebar */}
      <div className="w-[80%] max-w-7xl mx-auto px-4 py-6">
        {mission?.simulationType && (
          <div className="mb-8">
            <Suspense fallback={<div>Loading simulation...</div>}>
              <SimulationLoader 
                type={mission.simulationType}
                path={mission.simulationPath}
              />
            </Suspense>
          </div>
        )}
        {mission?.quizPath && (
          <div className="mt-8">
            <Suspense fallback={<div>Loading quiz...</div>}>
              <QuizLoader path={mission.quizPath} />
            </Suspense>
          </div>
        )}
        <div className={`flex ${showSidebarNav ? 'flex-col md:flex-row gap-6' : 'flex-col'}`}>
          {/* Optional sidebar navigation for chapter sections or highlights */}
          {showSidebarNav && (
            <div className="md:w-64 flex-shrink-0">
              <div 
                className="sticky top-24 rounded-lg p-4 hidden md:block"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <h3 className="text-lg font-medium mb-3" style={{ color: primaryColor }}>
                  Sections
                </h3>
                <nav className="space-y-1">
                  <a href="#intro" className="block py-1 px-2 rounded hover:bg-black/20 transition-colors">
                    Introduction
                  </a>
                  <a href="#content" className="block py-1 px-2 rounded hover:bg-black/20 transition-colors">
                    Main Content
                  </a>
                  <a href="#summary" className="block py-1 px-2 rounded hover:bg-black/20 transition-colors">
                    Summary
                  </a>
                </nav>
              </div>
            </div>
          )}

          {/* Main content area */}
          <motion.div 
            className={`flex-1 ${showSidebarNav ? 'md:ml-6' : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title section */}
            <div className="mb-8 text-center">
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg opacity-80">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Content container */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}