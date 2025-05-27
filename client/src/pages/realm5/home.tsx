import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { GitFork, FileText, Users, BookOpen, Award, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { realm5Missions } from '@/lib/realm5-missions';
import { getRealmName } from '@/lib/realm-utils';

export default function Realm5Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [hoveredMission, setHoveredMission] = useState<number | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);
  
  // Handle mission selection
  const navigateToMission = (missionId: number) => {
    setLocation(`/realm/5/mission/${missionId}`);
  };
  
  // Define theme for Realm 5 - {getRealmName(5)}
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
  
  // Get mission icon based on simulation type
  const getMissionIcon = (simulationType: string) => {
    switch(simulationType) {
      case 'bip':
        return <FileText className="h-6 w-6" />;
      case 'fork':
        return <GitFork className="h-6 w-6" />;
      case 'historicalForks':
        return <BookOpen className="h-6 w-6" />;
      case 'governance':
        return <Users className="h-6 w-6" />;
      case 'knowledge':
        return <Award className="h-6 w-6" />;
      case 'failedForks':
        return <AlertTriangle className="h-6 w-6" />;
      default:
        return <GitFork className="h-6 w-6" />;
    }
  };
  
  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${councilTheme.colors.background}, ${councilTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/baobab.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        color: "#f5f5f5"
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Realm header */}
        <div 
          className="mb-10 text-center backdrop-blur-md bg-black/60 p-6 rounded-xl border shadow-xl"
          style={{ borderColor: `${councilTheme.colors.primary}40` }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: councilTheme.colors.primary }}>
            Realm 5: {getRealmName(5)}
          </h1>
          
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Explore the intricate world of Bitcoin's governance and protocol evolution. 
            Discover how improvements are proposed, debated, and implemented in a decentralized system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-amber-900/30">
              <div className="font-medium text-amber-400 mb-1">Key Theme</div>
              <div className="text-gray-300">Bitcoin Governance</div>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-amber-900/30">
              <div className="font-medium text-amber-400 mb-1">Missions</div>
              <div className="text-gray-300">{realm5Missions.length}</div>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-amber-900/30">
              <div className="font-medium text-amber-400 mb-1">Difficulty</div>
              <div className="text-gray-300">Advanced</div>
            </div>
          </div>
        </div>
        
        {/* Missions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realm5Missions.map((mission) => (
            <motion.div
              key={mission.id}
              className="backdrop-blur-md bg-black/60 rounded-xl border overflow-hidden cursor-pointer transition-all shadow-lg"
              style={{ 
                borderColor: mission.completed 
                  ? '#15803d' 
                  : `${councilTheme.colors.primary}40`,
                boxShadow: councilTheme.shadows.card
              }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                borderColor: councilTheme.colors.primary 
              }}
              onClick={() => navigateToMission(mission.id)}
              onMouseEnter={() => setHoveredMission(mission.id)}
              onMouseLeave={() => setHoveredMission(null)}
            >
              <div 
                className="h-3 w-full"
                style={{ 
                  background: mission.completed 
                    ? councilTheme.colors.success 
                    : councilTheme.gradients.main
                }}
              ></div>
              
              <div className="p-5">
                <div className="flex items-start">
                  <div 
                    className="rounded-full p-3 mr-4 flex-shrink-0"
                    style={{ 
                      background: councilTheme.gradients.subtle,
                      color: councilTheme.colors.primary
                    }}
                  >
                    {getMissionIcon(mission.simulationType)}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      Mission {mission.id}: {mission.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {mission.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs font-medium uppercase" style={{ color: councilTheme.colors.secondary }}>
                    {mission.completed ? 'Completed' : 'Start Mission'}
                  </div>
                  
                  {mission.completed && (
                    <div className="bg-green-900/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Completed
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Realm description */}
        <div 
          className="mt-12 backdrop-blur-md bg-black/60 p-6 rounded-xl border shadow-xl"
          style={{ borderColor: `${councilTheme.colors.primary}40` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: councilTheme.colors.primary }}>
            About {getRealmName(5)}
          </h2>
          
          <div className="text-gray-300 space-y-4">
            <p>
              {getRealmName(5)} represents Bitcoin's unique governance model - a decentralized system
              where changes to the protocol emerge through discussion, proposals, and rough consensus
              among different stakeholders rather than through central authority.
            </p>
            
            <p>
              In this realm, you'll explore how Bitcoin evolves while maintaining its core properties.
              You'll learn about BIPs (Bitcoin Improvement Proposals), soft forks, hard forks, and the
              complex social and technical dynamics that shape the network's development.
            </p>
            
            <p>
              The ancient baobab tree symbolizes this realm, representing both stability and growth -
              much like Bitcoin's approach to protocol development that balances security and innovation.
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-amber-900/30">
              <h3 className="font-medium text-amber-400 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• How BIPs are created, discussed, and implemented</li>
                <li>• The technical differences between soft forks and hard forks</li>
                <li>• Bitcoin's historical protocol changes and their impacts</li>
                <li>• How stakeholders influence Bitcoin's evolution</li>
                <li>• Lessons from failed improvement proposals</li>
              </ul>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-amber-900/30">
              <h3 className="font-medium text-amber-400 mb-2">Key Stakeholders</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <span className="text-blue-400">Developers</span> - Write and review code</li>
                <li>• <span className="text-green-400">Miners</span> - Process transactions and secure the network</li>
                <li>• <span className="text-purple-400">Node Operators</span> - Enforce consensus rules</li>
                <li>• <span className="text-red-400">Users</span> - Provide economic activity and value</li>
                <li>• <span className="text-yellow-400">Businesses</span> - Build services on the protocol</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-10 flex justify-between">
          <button
            onClick={() => setLocation('/journey')}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return to Journey
          </button>
          
          {user?.progress?.currentRealm > 5 && (
            <button
              onClick={() => setLocation('/realm/6')}
              className="px-6 py-2 text-white rounded-lg transition-colors"
              style={{ 
                background: councilTheme.gradients.main,
                boxShadow: councilTheme.shadows.button
              }}
            >
              Proceed to {getRealmName(6)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}