import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Home, Zap, Code, Smartphone, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { realm6Missions } from '@/lib/realm6-missions';
import { getRealmName } from '@/lib/realm-utils';

export default function Realm6Home() {
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
    setLocation(`/realm/6/mission/${missionId}`);
  };
  
  // Define theme for Realm 6 - {getRealmName(6)}
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
  
  // Get mission icon based on content type
  const getMissionIcon = (contentType: string) => {
    switch(contentType) {
      case 'realUseCase':
        return <Home className="h-6 w-6" />;
      case 'lightningNetwork':
        return <Zap className="h-6 w-6" />;
      case 'builders':
        return <Code className="h-6 w-6" />;
      case 'tools':
        return <Smartphone className="h-6 w-6" />;
      case 'knowledge':
        return <Award className="h-6 w-6" />;
      case 'bonus':
        return <Sparkles className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };
  
  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${ubuntuTheme.colors.background}, ${ubuntuTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/ubuntu-village.jpg')",
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
          style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: ubuntuTheme.colors.primary }}>
            Realm 6: {getRealmName(6)}
          </h1>
          
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Explore the practical applications of Bitcoin across Africa, with inspiring stories of 
            individuals and communities using Bitcoin to enhance their lives through the spirit of Ubuntu.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-rose-900/30">
              <div className="font-medium text-rose-400 mb-1">Key Theme</div>
              <div className="text-gray-300">Bitcoin in Africa</div>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-rose-900/30">
              <div className="font-medium text-rose-400 mb-1">Missions</div>
              <div className="text-gray-300">{realm6Missions.length}</div>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-rose-900/30">
              <div className="font-medium text-rose-400 mb-1">Spirit</div>
              <div className="text-gray-300">Ubuntu</div>
            </div>
          </div>
        </div>
        
        {/* African Bitcoin Ecosystem */}
        <div 
          className="mb-10 backdrop-blur-md bg-black/60 p-6 rounded-xl border shadow-xl"
          style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: ubuntuTheme.colors.primary }}>
            The African Bitcoin Ecosystem
          </h2>
          
          <div className="text-gray-300 mb-6">
            <p className="mb-4">
              Bitcoin is thriving across Africa, creating a vibrant ecosystem of users, builders, 
              and innovators who are leveraging this technology to address local challenges.
            </p>
            <p>
              For an interactive map of the African Bitcoin ecosystem, visit:
            </p>
          </div>
          
          <a 
            href="https://bitcoiners.africa/african-bitcoin-ecosystem/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mx-auto max-w-2xl p-4 rounded-lg transition-all hover:scale-105"
            style={{ 
              background: ubuntuTheme.gradients.main,
              boxShadow: ubuntuTheme.shadows.button
            }}
          >
            <div className="text-center text-white">
              <h3 className="text-xl font-bold mb-2">Bitcoiners Africa Ecosystem Map</h3>
              <p className="text-sm">Explore Bitcoin projects, companies, and initiatives across Africa</p>
            </div>
          </a>
        </div>
        
        {/* Missions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realm6Missions.map((mission) => (
            <motion.div
              key={mission.id}
              className="backdrop-blur-md bg-black/60 rounded-xl border overflow-hidden cursor-pointer transition-all shadow-lg"
              style={{ 
                borderColor: mission.completed 
                  ? '#15803d' 
                  : `${ubuntuTheme.colors.primary}40`,
                boxShadow: ubuntuTheme.shadows.card
              }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                borderColor: ubuntuTheme.colors.primary 
              }}
              onClick={() => navigateToMission(mission.id)}
              onMouseEnter={() => setHoveredMission(mission.id)}
              onMouseLeave={() => setHoveredMission(null)}
            >
              <div 
                className="h-3 w-full"
                style={{ 
                  background: mission.completed 
                    ? ubuntuTheme.colors.success 
                    : ubuntuTheme.gradients.main
                }}
              ></div>
              
              <div className="p-5">
                <div className="flex items-start">
                  <div 
                    className="rounded-full p-3 mr-4 flex-shrink-0"
                    style={{ 
                      background: ubuntuTheme.gradients.subtle,
                      color: ubuntuTheme.colors.primary
                    }}
                  >
                    {getMissionIcon(mission.contentType)}
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
                  <div className="text-xs font-medium uppercase" style={{ color: ubuntuTheme.colors.secondary }}>
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
          style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: ubuntuTheme.colors.primary }}>
            About {getRealmName(6)}
          </h2>
          
          <div className="text-gray-300 space-y-4">
            <p>
              "I am because we are" — this is the essence of Ubuntu, the African philosophy that 
              emphasizes our interconnectedness and shared humanity. {getRealmName(6)} represents 
              how Bitcoin is being used across Africa to strengthen communities and create new opportunities.
            </p>
            
            <p>
              In this realm, you'll discover real stories of everyday Africans using Bitcoin to 
              overcome challenges and build a better future. From remittances and savings to education 
              funding and business payments, Bitcoin is providing practical solutions tailored to 
              African needs.
            </p>
            
            <p>
              The vibrant colors of this realm symbolize the diverse cultures and innovations 
              flourishing across the continent, united by the common goal of financial empowerment 
              through Bitcoin.
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-rose-900/30">
              <h3 className="font-medium text-rose-400 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Real Bitcoin use cases from across Africa</li>
                <li>• How Lightning Network enables borderless payments</li>
                <li>• African Bitcoin builders and their innovations</li>
                <li>• Practical tools and wallets adapted for African users</li>
                <li>• How to develop your own Bitcoin project ideas</li>
              </ul>
            </div>
            
            <div className="bg-black/40 p-4 rounded-lg border border-rose-900/30">
              <h3 className="font-medium text-rose-400 mb-2">Ubuntu Principles</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Community: Building together for mutual benefit</li>
                <li>• Empowerment: Enabling financial sovereignty</li>
                <li>• Inclusivity: Making Bitcoin accessible to all</li>
                <li>• Resilience: Creating robust economic systems</li>
                <li>• Innovation: African solutions for African challenges</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setLocation('/journey')}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return to Journey
          </button>
        </div>
      </div>
    </div>
  );
}