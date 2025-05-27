import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { getRealmName } from '@/lib/realm-utils';
import { MissionNavigation } from '@/components/ui/mission-navigation';

interface MissionLayoutProps {
  children: ReactNode;
  realmId: string | number;
  missionId?: string | number;
  totalMissions?: number;
  title?: string;
  subtitle?: string;
  progress?: number;
}

export default function MissionLayout({
  children,
  realmId,
  missionId,
  totalMissions = 1,
  title = "Mission",
  subtitle = "",
  progress = 0
}: MissionLayoutProps) {
  const [, setLocation] = useLocation();
  const [scrollProgress, setScrollProgress] = useState(progress);
  
  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = Math.min(
        100,
        Math.max(0, Math.round((scrollY / (documentHeight - windowHeight)) * 100))
      );
      
      // Only update if progress is higher than current or was passed in as 0
      if (progress === 0 || scrollPercentage > scrollProgress) {
        setScrollProgress(scrollPercentage);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress, scrollProgress]);
  
  return (
    <div className="min-h-screen bg-stone-900 text-amber-100 pb-24">
      {/* Header with navigation and progress */}
      <header className="bg-stone-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-amber-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <MissionNavigation 
            realmId={Number(realmId)}
            missionId={missionId ? Number(missionId) : undefined}
            totalMissions={totalMissions}
            progress={scrollProgress}
            title={`${getRealmName(Number(realmId))} - ${title}`}
            showHomeButton={true}
            showMapButton={true}
            showProgress={true}
          />
        </div>
      </header>
      
      {/* Mission title section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-400 mb-2">{title}</h1>
          {subtitle && <p className="text-amber-300/80">{subtitle}</p>}
        </div>
        
        {/* Mission content */}
        <div className="bg-stone-900/50 rounded-xl p-6 max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}