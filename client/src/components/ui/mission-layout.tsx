import React, { ReactNode } from 'react';
import { useLocation } from 'wouter';

interface MissionLayoutProps {
  children: ReactNode;
  title: string;
  missionNumber: number;
  realmName: string;
}

export function MissionLayout({ children, title, missionNumber, realmName }: MissionLayoutProps) {
  const [, setLocation] = useLocation();
  
  // Helper function for background style based on realm
  const getBackgroundStyle = () => {
    const realmStyles = {
      "Realm of Origins": {
        backgroundColor: "#B45309",
        backgroundImage: "linear-gradient(to bottom, rgba(180, 83, 9, 0.95), rgba(110, 50, 5, 0.98))"
      },
      "The Forest of Sparks": {
        backgroundColor: "#065F46",
        backgroundImage: "linear-gradient(to bottom, rgba(6, 95, 70, 0.95), rgba(4, 60, 45, 0.98))"
      },
      "The Central Citadel": {
        backgroundColor: "#3730A3",
        backgroundImage: "linear-gradient(to bottom, rgba(55, 48, 163, 0.95), rgba(40, 35, 120, 0.98))"
      },
      "The Council of Forks": {
        backgroundColor: "#5B21B6",
        backgroundImage: "linear-gradient(to bottom, rgba(91, 33, 182, 0.95), rgba(70, 25, 140, 0.98))"
      },
      "The Ubuntu Village": {
        backgroundColor: "#B91C1C",
        backgroundImage: "linear-gradient(to bottom, rgba(185, 28, 28, 0.95), rgba(140, 20, 20, 0.98))"
      }
    };
    
    // Return style for the specified realm or default
    return realmStyles[realmName as keyof typeof realmStyles] || {
      backgroundColor: "#1F2937", 
      backgroundImage: "linear-gradient(to bottom, rgba(31, 41, 55, 0.95), rgba(24, 30, 40, 0.98))"
    };
  };
  
  return (
    <div 
      className="min-h-screen text-amber-100"
      style={getBackgroundStyle()}
    >
      {/* Header with back button and title */}
      <header className="pt-6 px-6 pb-4 border-b border-amber-900/30">
        <div className="w-[80%] max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => setLocation(`/realm/${realmName === "Realm of Origins" ? 1 : realmName === "The Forest of Sparks" ? 2 : realmName === "The Central Citadel" ? 3 : realmName === "The Council of Forks" ? 4 : 5}`)} 
            className="flex items-center text-amber-300 hover:text-amber-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Realm
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-300 font-serif">
              {title}
            </h1>
            <div className="text-amber-200/70 text-sm">
              Mission {missionNumber} - {realmName}
            </div>
          </div>
          
          <div className="w-[100px]">
            {/* Placeholder to balance the flex layout */}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}