import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm4Missions } from '@/lib/realm4-missions';
import { Mission } from '@/components/ui/mission';
import { Realm2MissionData } from '@/lib/realm2-missions';
import { getRealmName } from '@/lib/realm-utils';

// Lazy load simulation components to improve performance
const MiningSimulator = lazy(() => import('./mining-simulator'));
const ConsensusSimulator = lazy(() => import('./consensus-simulator'));
const EnergySimulator = lazy(() => import('./energy-simulator'));
const AfricaSimulator = lazy(() => import('./africa-simulator'));
const KnowledgeSimulator = lazy(() => import('./knowledge-simulator'));
const HalvingSimulator = lazy(() => import('./halving-simulator'));

export default function Realm4Missions() {
  const [, setLocation] = useLocation();
  const { missionId } = useParams<{ missionId: string }>();
  const { user } = useAuth();
  const [missionComplete, setMissionComplete] = useState(false);

  // Parse mission ID from URL
  const missionNumber = parseInt(missionId || '1');
  const missionDataId = missionNumber;

  // Log for debugging
  console.log(`Realm 4 missions.tsx: Looking for mission with ID ${missionDataId}`);
  console.log('Available mission IDs:', realm4Missions.map(m => m.id));

  // Current mission data
  const missionData = realm4Missions.find(m => m.id === missionDataId);

  if (missionData) {
    console.log('Found mission:', missionData.title);
  } else {
    console.error(`Mission with ID ${missionDataId} not found in Realm 4`);
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);

  // Define theme for Realm 4 - The Mountain Forge
  const mountainForgeTheme = {
    colors: {
      primary: '#fb923c', // orange-400 - brighter for better visibility
      secondary: '#fed7aa', // orange-200 - lighter for better contrast
      background: '#0c0a09', // Darker than black with slight brown tint
      backgroundLight: '#1c1917', // Slate-900
      success: '#22c55e', // green-500 - brighter success color
      textDark: '#fdba74', // orange-300 - lighter for better readability
      textLight: '#fff7ed', // orange-50 - almost white for maximum contrast
      accent1: '#f97316', // orange-500
      accent2: '#ea580c', // orange-600
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

  // Generate social media sharing message based on mission
  const generateSharingMessage = () => {
    if (!missionData) return '';

    let message = '';

    switch(missionData.simulationType) {
      case 'mining':
        message = `⛏️ Today I learned about Bitcoin mining and how it secures the network through computational work. The proof-of-work system is genius! #BitcoinQuest #BitcoinMining`;
        break;
      case 'consensus':
        message = `🔒 Bitcoin miners play a crucial role in maintaining the security and integrity of the network by validating transactions and preventing double-spending! #BitcoinQuest #Consensus`;
        break;
      case 'energy':
        message = `⚡ Debunking Bitcoin energy myths! Learned how mining incentivizes renewable energy development and can stabilize power grids. #BitcoinQuest #Energy`;
        break;
      case 'africa':
        message = `🌍 Just discovered how Bitcoin mining could unleash Africa's abundant energy resources and create economic opportunities! #BitcoinQuest #Africa #Mining`;
        break;
      case 'knowledge':
        message = `💡 Tested my Bitcoin mining knowledge today and explored how it connects physical energy to digital security! #BitcoinQuest #BitcoinMining`;
        break;
      case 'halving':
        message = `📉 Learning about Bitcoin's halving events and how they create digital scarcity - what an elegant monetary policy! #BitcoinQuest #Halving`;
        break;
      default:
        message = `⛰️ Exploring ${getRealmName(4)} in my Bitcoin education journey! Learning how mining secures the network! #BitcoinQuest #BitcoinMining`;
    }

    return message;
  };

  // Handle mission completion
  const handleMissionComplete = () => {
    setMissionComplete(true);
    // In a real application, we would update the user's progress here
    // with something like:
    // updateUserProgress(user.id, { completedMissions: [...user.completedMissions, missionDataId] })

    // Redirect to realm page after a delay
    setTimeout(() => {
      setLocation('/realm/4');
    }, 2000);
  };

  // This function is used by simulation components to trigger the sharing modal
  const handleChallengeComplete = () => {
    setShareContent(generateShareContent());
    setShowShareModal(true);

    // In a real application, we would update the user's progress here
    // updateUserProgress(user.id, { completedMissions: [...user.completedMissions, missionDataId] })
  };

  // State to track if mission content has been read
  const [contentRead, setContentRead] = useState(false);

  // State for social media sharing content
  const [shareContent, setShareContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  // Generate social media sharing content based on mission
  const generateShareContent = () => {
    if (!missionData) return '';

    // Generate a tailored message based on the mission
    return generateSharingMessage();
  };

  // Handle starting the challenge after reading content
  const handleStartChallenge = () => {
    setContentRead(true);
  };

  // Render appropriate simulation based on mission type
  const renderSimulation = () => {
    if (!missionData) return null;

    return (
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: mountainForgeTheme.colors.primary }} />
        </div>
      }>
        {(() => {
          switch(missionData.simulationType) {
            case 'mining':
              return <MiningSimulator 
                onComplete={handleChallengeComplete}
              />;
            case 'consensus':
              return <ConsensusSimulator 
                onComplete={handleChallengeComplete}
              />;
            case 'energy':
              return <EnergySimulator 
                onComplete={handleChallengeComplete}
              />;
            case 'africa':
              return <AfricaSimulator 
                onComplete={handleChallengeComplete}
              />;
            case 'knowledge':
              return <KnowledgeSimulator 
                onComplete={handleChallengeComplete}
              />;
            case 'halving':
              return <HalvingSimulator 
                onComplete={handleChallengeComplete}
              />;
            default:
              return <div className="text-center py-10" style={{ color: mountainForgeTheme.colors.secondary }}>
                <p>Challenge not found for this mission type.</p>
              </div>;
          }
        })()}      </Suspense>
    );
  };

  if (!missionData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${mountainForgeTheme.colors.background}, ${mountainForgeTheme.colors.backgroundLight})`,
          backgroundImage: "url('/realms/forks.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="animate-pulse backdrop-blur-md bg-black/60 rounded-xl p-8 flex flex-col items-center">
          <div className="h-32 w-32 rounded-full mb-4" style={{ backgroundColor: mountainForgeTheme.colors.primary }}></div>
          <div className="h-6 w-48 rounded-full" style={{ backgroundColor: mountainForgeTheme.colors.primary }}></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${mountainForgeTheme.colors.background}, ${mountainForgeTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/forks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        color: "#eaeaea"
      }}
    >
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/4')} 
          className="flex items-center transition-colors font-medium"
          style={{ color: mountainForgeTheme.colors.secondary }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Missions
        </button>
      </header>

      {/* Mission completion message */}
      {missionComplete && (
        <div className="fixed top-0 left-0 right-0 text-white p-3 text-center z-50"
          style={{ backgroundColor: mountainForgeTheme.colors.success }}
        >
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}

      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-orange-100 border-2 border-orange-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-orange-900 mb-2">Mission Not Found</h2>
          <p className="text-orange-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/4')} 
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Realm
          </button>
        </div>
      )}

      {/* Mission content */}
      {missionData && <main className="max-w-4xl mx-auto">
        {!contentRead ? (

            <Mission 
              mission={{
                id: missionData?.id || 1,
                title: missionData?.title || "Bitcoin Mining",
                subtitle: missionData?.subtitle || "Bitcoin mining mechanics and technology", 
                description: "Explore the mountain forge and learn about Bitcoin mining.",
                objectives: ["Learn about proof-of-work mining", "Understand mining difficulty", "Complete the interactive simulation"],
                simulationType: "bitcoin" as 'surveillance' | 'privacy' | 'cbdc' | 'bitcoin' | 'lightning' | 'selfcustody',
                content: typeof missionData?.content === 'string' ? missionData.content : "Learn about Bitcoin mining and the Proof of Work consensus mechanism. Mining is the process of adding new blocks to the blockchain."
              } as Realm2MissionData}
              onComplete={handleMissionComplete}
              realmTheme="amber"
            />

            {/* Challenge button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartChallenge}
                className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                style={{ 
                  background: mountainForgeTheme.gradients.main,
                  boxShadow: mountainForgeTheme.shadows.button
                }}
              >
                Start Challenge
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

        ) : (
          <Mission 
                mission={{
                  ...missionData,
                  quiz: missionData.quiz || {
                    questions: [],
                    title: missionData.title || "Quiz",
                    description: "Test your knowledge"
                  }
                }}
                onComplete={handleMissionComplete}
                realmTheme="orange"
              />
        )}
      </main>}
    </div>
  );
}