import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronRight, Zap, Lightbulb, Globe, Coins, BookOpen, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm4Missions } from '@/lib/realm4-missions';
import { getRealmName } from '@/lib/realm-utils';

// Define mining thematic elements for Realm 4 - {getRealmName(4)}
const THEME = {
  colors: {
    primary: '#f97316', // orange-500
    secondary: '#fdba74', // orange-300
    background: '#0c0a09', // Darker than black with slight brown tint
    backgroundLight: '#1c1917', // Slate-900
    textDark: '#78350f', // Orange-900
    textLight: '#ffedd5', // Orange-100
    accent1: '#ff8a4c',
    accent2: '#d97706',
  },
  gradients: {
    main: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
    glow: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    subtle: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(194, 65, 12, 0.1) 100%)',
  },
  shadows: {
    button: '0 10px 15px -3px rgba(249, 115, 22, 0.2), 0 4px 6px -4px rgba(249, 115, 22, 0.2)',
    card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
  }
};

// Custom icon components for each mission type
const MissionIcons = {
  mining: <Coins className="h-6 w-6 text-orange-500" />, // Fixed from Mining to Coins
  consensus: <Shield className="h-6 w-6 text-orange-500" />, // Fixed ShieldCheck to Shield which is available in lucide-react
  energy: <Zap className="h-6 w-6 text-orange-500" />,
  africa: <Globe className="h-6 w-6 text-orange-500" />,
  halving: <Coins className="h-6 w-6 text-orange-500" />,
  knowledge: <BookOpen className="h-6 w-6 text-orange-500" />,
};

// ShieldCheck icon component since it's not directly imported from lucide-react
function ShieldCheck(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Realm4Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [realmProgress, setRealmProgress] = useState({
    completedMissions: [] as number[],
    currentMission: 1,
    totalMissions: realm4Missions.length,
  });
  
  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
      return;
    }
    
    // Use user progress data from AuthContext
    if (user?.progress) {
      setRealmProgress({
        completedMissions: user.progress.completedMissions || [],
        currentMission: 1,
        totalMissions: realm4Missions.length,
      });
    }
  }, [user, setLocation]);
  
  // Navigate to mission
  const goToMission = (missionId: number) => {
    setLocation(`/realm4/mission/${missionId}`);
  };
  
  // Check if a mission is locked
  const isMissionLocked = (missionId: number) => {
    // First mission is always unlocked
    if (missionId === 1) return false;
    
    // If previous mission is completed, this mission is unlocked
    return !realmProgress.completedMissions.includes(missionId - 1);
  };
  
  return (
    <div className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, ${THEME.colors.background}, ${THEME.colors.backgroundLight})`,
        backgroundImage: "url('/realms/forks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay"
      }}
    >
      {/* Realm header */}
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => setLocation('/map')} 
            className="text-orange-300 hover:text-orange-200 flex items-center mb-4"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Map
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: THEME.gradients.main }}
              >
                Realm 4: {getRealmName(4)}
              </h1>
              <p className="text-orange-200 mt-2 text-lg">
                Where the power of mining transforms energy into digital security
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-black/40 px-4 py-3 rounded-lg border border-orange-900/40">
              <div className="text-orange-300 text-sm font-medium mb-1">Realm Progress</div>
              <div className="flex items-center">
                <div className="h-2 w-40 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500" 
                    style={{ width: `${(realmProgress.completedMissions.length / realmProgress.totalMissions) * 100}%` }}
                  ></div>
                </div>
                <div className="ml-3 text-orange-100 text-sm">
                  {realmProgress.completedMissions.length}/{realmProgress.totalMissions} missions
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Realm description */}
      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto backdrop-blur-md bg-black/60 rounded-xl border border-orange-900/30 p-6 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Welcome to {getRealmName(4)}</h2>
            
            <p className="text-gray-300 mb-4">
              In this realm, you'll explore the heart of Bitcoin: the mining process that secures the network and 
              creates new bitcoins. {getRealmName(4)} represents the transformation of energy into digital security 
              through proof-of-work mining.
            </p>
            
            <p className="text-gray-300 mb-4">
              You'll discover how mining operates, why it's essential, and how it's evolving worldwide. From the 
              technical details of hashing and consensus to the economic and environmental implications, {getRealmName(4)} 
              will deepen your understanding of Bitcoin's foundational security mechanism.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-orange-950/30 backdrop-blur-sm p-4 rounded-lg border border-orange-900/30">
                <Lightbulb className="h-6 w-6 text-orange-400 mb-2" />
                <h3 className="text-lg font-semibold text-orange-300 mb-1">Learn</h3>
                <p className="text-gray-400 text-sm">
                  Understand the technical, economic, and environmental aspects of Bitcoin mining
                </p>
              </div>
              
              <div className="bg-orange-950/30 backdrop-blur-sm p-4 rounded-lg border border-orange-900/30">
                <Zap className="h-6 w-6 text-orange-400 mb-2" />
                <h3 className="text-lg font-semibold text-orange-300 mb-1">Experience</h3>
                <p className="text-gray-400 text-sm">
                  Simulate mining operations, consensus mechanisms, and economic impacts through interactive challenges
                </p>
              </div>
              
              <div className="bg-orange-950/30 backdrop-blur-sm p-4 rounded-lg border border-orange-900/30">
                <Globe className="h-6 w-6 text-orange-400 mb-2" />
                <h3 className="text-lg font-semibold text-orange-300 mb-1">Connect</h3>
                <p className="text-gray-400 text-sm">
                  See how mining shapes Bitcoin's role in the global energy landscape and economic development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Missions list */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">{getRealmName(4)} Missions</h2>
          
          <div className="space-y-4">
            {realm4Missions.map((mission) => {
              const isLocked = isMissionLocked(mission.id);
              const isCompleted = realmProgress.completedMissions.includes(mission.id);
              
              return (
                <div 
                  key={mission.id}
                  className={`backdrop-blur-md border rounded-xl overflow-hidden transition-all ${
                    isLocked 
                      ? 'bg-black/50 border-gray-800 opacity-60' 
                      : isCompleted 
                        ? 'bg-black/70 border-orange-700' 
                        : 'bg-black/70 border-orange-900/40 hover:border-orange-700/70'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center p-4">
                    <div className="flex-shrink-0 mr-4 mb-4 md:mb-0">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        isLocked 
                          ? 'bg-gray-800' 
                          : isCompleted 
                            ? 'bg-orange-900/70' 
                            : 'bg-orange-900/30'
                      }`}>
                        {isLocked ? (
                          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : isCompleted ? (
                          <svg className="h-6 w-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          MissionIcons[mission.simulationType as keyof typeof MissionIcons]
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className={`text-xl font-semibold ${
                        isLocked ? 'text-gray-500' : isCompleted ? 'text-orange-300' : 'text-white'
                      }`}>
                        {mission.title}
                      </h3>
                      
                      {mission.subtitle && (
                        <p className={`${
                          isLocked ? 'text-gray-600' : isCompleted ? 'text-orange-200/70' : 'text-gray-400'
                        }`}>
                          {mission.subtitle}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                      <button
                        onClick={() => !isLocked && goToMission(mission.id)}
                        disabled={isLocked}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isLocked 
                            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                            : isCompleted 
                              ? 'bg-orange-900/50 text-orange-100 hover:bg-orange-800'
                              : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                        style={
                          !isLocked && !isCompleted
                            ? { boxShadow: THEME.shadows.button }
                            : undefined
                        }
                      >
                        {isLocked ? (
                          'Locked'
                        ) : isCompleted ? (
                          'Revisit'
                        ) : (
                          <>
                            Begin Mission
                            <ChevronRight className="h-5 w-5 ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}