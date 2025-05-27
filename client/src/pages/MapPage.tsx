import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { RealmData } from '@/lib/realm-data';
import { Share2, User } from 'lucide-react';
import { ShareButton } from '@/components/ui/share-button';

export default function MapPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Determine current progress (for demo, we'll just highlight the beginning of the chain)
  const currentRealmId = user?.progress?.currentRealm || 1;
  
  // Chain data with proper names from the reference image
  const chainRealmData = [
    { id: 1, name: "Realm of Origins", position: { top: "20%", left: "5%" } },
    { id: 3, name: "The Forest of Sparks", position: { top: "40%", left: "30%" } },
    { id: 2, name: "The Central Citadel", position: { top: "70%", left: "20%" } },
    { id: 4, name: "The Mountain Forge", position: { top: "55%", left: "50%" } },
    { id: 5, name: "The Council of Forks", position: { top: "30%", left: "70%" } },
    { id: 6, name: "The Ubuntu Village", position: { top: "60%", left: "80%" } },
    { id: 7, name: "The Grove of Becoming", position: { top: "80%", left: "65%" } },
  ];
  
  const navigateToRealm = (realmId: number) => {
    setLocation(`/realm/${realmId}`);
  };
  
  const navigateToProfile = () => {
    setLocation('/profile');
  };
  
  return (
    <div className="min-h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Header with title and actions */}
      <header className="p-6 flex justify-between items-center z-20">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">
          Asha's Journey Through the Realms of Money
        </h1>
        
        <div className="flex space-x-3">
          <ShareButton 
            title="Asha's Journey Through the Realms of Money" 
            description="Join me on this educational adventure through the world of Bitcoin and cryptocurrency!" 
            position="left"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToProfile}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-800/50 text-amber-200 hover:bg-amber-700/60"
          >
            <User size={18} />
          </motion.button>
        </div>
      </header>
      
      {/* Main map area */}
      <div className="flex-1 relative flex items-center justify-center p-6">
        {/* Chain links connecting realms */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Dynamic path that creates the chain pattern following the realm positions */}
          <path
            d="M120 150 Q 200 200, 300 240 Q 400 280, 500 300 Q 600 320, 700 250 Q 800 180, 850 300 Q 900 420, 800 400"
            fill="none"
            stroke="#555"
            strokeWidth="20"
            strokeLinecap="round"
            className="chain-path"
          />
          
          {/* Glowing path for completed realms - overlay using the same path */}
          <path
            d="M120 150 Q 200 200, 300 240"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="20"
            strokeLinecap="round"
            className="chain-glow"
            style={{ 
              filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))",
              strokeDasharray: currentRealmId > 1 ? "0" : "1000", 
              strokeDashoffset: currentRealmId > 1 ? "0" : "750"
            }}
          />
        </svg>
        
        {/* Realm nodes placed along the chain */}
        {chainRealmData.map(realm => {
          const isCompleted = realm.id < currentRealmId;
          const isCurrent = realm.id === currentRealmId;
          
          return (
            <motion.div
              key={realm.id}
              className="absolute"
              style={{ 
                top: realm.position.top, 
                left: realm.position.left 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => navigateToRealm(realm.id)}
                className={`relative p-1 rounded-full transition-all duration-300 ${isCurrent ? 'animate-pulse' : ''}`} 
                style={{ 
                  background: isCompleted || isCurrent 
                    ? 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(146,64,14,0.6) 70%, rgba(0,0,0,0) 100%)' 
                    : 'none',
                  boxShadow: isCompleted || isCurrent 
                    ? '0 0 20px rgba(245, 158, 11, 0.6)' 
                    : 'none'
                }}
              >
                <div 
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg
                              transition-colors duration-500 border-2 ${isCurrent ? 'animate-pulse' : ''}`}
                  style={{ 
                    backgroundColor: isCompleted 
                      ? '#f59e0b' 
                      : isCurrent 
                        ? '#b45309' 
                        : '#1e1e1e',
                    borderColor: isCompleted || isCurrent 
                      ? '#fcd34d' 
                      : '#444',
                    color: isCompleted || isCurrent 
                      ? 'white' 
                      : '#aaa'
                  }}
                >
                  {realm.id}
                </div>
                
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p 
                    className={`text-sm md:text-base font-medium transition-colors duration-500`}
                    style={{ 
                      color: isCompleted || isCurrent 
                        ? '#fcd34d' 
                        : '#aaa'
                    }}
                  >
                    {realm.name}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend at the bottom */}
      <div className="p-6 flex justify-center">
        <div className="flex items-center space-x-8 text-gray-300">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-amber-700 animate-pulse mr-2"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-800 mr-2 border border-gray-600"></div>
            <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
}