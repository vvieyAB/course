import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm5Missions } from '@/lib/realm5-missions';
import { Mission } from '@/components/ui/mission';
// import { Realm5MissionData } from '@/lib/realm5-missions';
import { getRealmName } from '@/lib/realm-utils';

// Lazy load simulation components to improve performance
const BipSimulator = lazy(() => import('./bip-simulator'));
const ForkSimulator = lazy(() => import('./fork-simulator'));
const HistoricalForksSimulator = lazy(() => import('./historical-forks-simulator'));
const GovernanceSimulator = lazy(() => import('./governance-simulator'));
const KnowledgeSimulator = lazy(() => import('./knowledge-simulator'));
const FailedForksSimulator = lazy(() => import('./failed-forks-simulator'));

export default function Realm5Missions() {
  const [, setLocation] = useLocation();
  const { missionId } = useParams<{ missionId: string }>();
  const { user } = useAuth();
  const [missionComplete, setMissionComplete] = useState(false);

  // Parse mission ID from URL
  const missionNumber = parseInt(missionId || '1');
  const missionDataId = missionNumber;

  // Current mission data
  const missionData = realm5Missions.find(m => m.id === missionDataId);

  // Add required content property for Mission component compatibility
  const missionWithContent = missionData ? {
    ...missionData,
    content: typeof missionData.description === 'string' ? missionData.description : "Learn about Bitcoin governance and how the network evolves over time",
    simulationType: "bitcoin" as 'surveillance' | 'privacy' | 'cbdc' | 'bitcoin' | 'lightning' | 'selfcustody'
  } : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);

  // Define theme for Realm 5 - The Council of Forks (Baobab Tree)
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

  // Generate social media sharing message based on mission
  const generateSharingMessage = () => {
    if (!missionData) return '';

    let message = '';

    switch(missionData.simulationType) {
      case 'bip':
        message = `📄 Today I learned about Bitcoin Improvement Proposals (BIPs) and how they shape Bitcoin's evolution through community consensus! #BitcoinQuest #BIP`;
        break;
      case 'fork':
        message = `🍴 Understanding the difference between soft forks and hard forks in Bitcoin is crucial for appreciating how the protocol evolves! #BitcoinQuest #Forks`;
        break;
      case 'historicalForks':
        message = `🕰️ Exploring Bitcoin's major forks like SegWit, Taproot, and Bitcoin Cash helps understand the community's values and priorities! #BitcoinQuest #BitcoinHistory`;
        break;
      case 'governance':
        message = `👥 Bitcoin's decentralized governance model ensures no single entity controls its evolution - it's truly by the people, for the people! #BitcoinQuest #Governance`;
        break;
      case 'knowledge':
        message = `🧠 Testing my knowledge about Bitcoin governance and evolution. I now understand how Bitcoin's protocol changes are proposed and implemented! #BitcoinQuest`;
        break;
      case 'failedForks':
        message = `📚 Learning from Bitcoin's forgotten forks teaches us about the challenges of evolving a decentralized system! #BitcoinQuest #BitcoinHistory`;
        break;
      default:
        message = `🌳 Exploring ${getRealmName(5)} in my Bitcoin education journey! Learning how Bitcoin's governance and protocol upgrades work! #BitcoinQuest`;
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
      setLocation('/realm/5');
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
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: councilTheme.colors.primary }} />
        </div>
      }>
        {(() => {
          switch(missionData.simulationType) {
            case 'bip':
              return <BipSimulator onComplete={handleChallengeComplete} />;
            case 'fork':
              return <ForkSimulator onComplete={handleChallengeComplete} />;
            case 'historicalForks':
              return <HistoricalForksSimulator onComplete={handleChallengeComplete} />;
            case 'governance':
              return <GovernanceSimulator onComplete={handleChallengeComplete} />;
            case 'knowledge':
              return <KnowledgeSimulator onComplete={handleChallengeComplete} />;
            case 'failedForks':
              return <FailedForksSimulator onComplete={handleChallengeComplete} />;
            default:
              return <div className="text-center py-10" style={{ color: councilTheme.colors.secondary }}>
                <p>Challenge not found for this mission type.</p>
              </div>;
          }
        })()}
      </Suspense>
    );
  };

  if (!missionData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${councilTheme.colors.background}, ${councilTheme.colors.backgroundLight})`,
          backgroundImage: "url('/realms/baobab.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="animate-pulse backdrop-blur-md bg-black/60 rounded-xl p-8 flex flex-col items-center">
          <div className="h-32 w-32 rounded-full mb-4" style={{ backgroundColor: councilTheme.colors.primary }}></div>
          <div className="h-6 w-48 rounded-full" style={{ backgroundColor: councilTheme.colors.primary }}></div>
        </div>
      </div>
    );
  }

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
        color: "#eaeaea"
      }}
    >
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/5')} 
          className="flex items-center transition-colors font-medium"
          style={{ color: councilTheme.colors.secondary }}
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
          style={{ backgroundColor: councilTheme.colors.success }}
        >
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}

      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-green-100 border-2 border-green-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Mission Not Found</h2>
          <p className="text-green-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/5')} 
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Realm
          </button>
        </div>
      )}

      {/* Mission content */}
      {missionData && <main className="max-w-4xl mx-auto">
        {!contentRead ? (
          
              <Mission 
                  mission={missionWithContent as any}
                  onComplete={handleMissionComplete}
                  realmTheme="amber"
                />

                {/* Challenge button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleStartChallenge}
                    className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                    style={{ 
                      background: councilTheme.gradients.main,
                      boxShadow: councilTheme.shadows.button
                    }}
                  >
                    Start Challenge
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              
          
        ) : (
          <>
            {/* Challenge section */}
            <div className="backdrop-blur-md bg-black/60 p-8 rounded-xl border shadow-xl"
              style={{ borderColor: `${councilTheme.colors.primary}40` }}
            >
              <h2 className="text-2xl font-bold mb-4"
                style={{ color: councilTheme.colors.primary }}
              >
                Challenge: {missionData?.title}
              </h2>

              <p className="text-gray-300 mb-6">
                Complete this challenge to unlock the next mission and continue your journey through {getRealmName(5)}.
              </p>

              {/* Render appropriate simulation component */}
              <div className="mt-4">
                {renderSimulation()}
              </div>
            </div>

            {/* Social media sharing section */}
            {showShareModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="backdrop-blur-md bg-black/90 rounded-xl p-6 max-w-md w-full border"
                  style={{ borderColor: `${councilTheme.colors.primary}40` }}
                >
                  <h3 className="text-2xl font-bold mb-4"
                    style={{ color: councilTheme.colors.primary }}
                  >
                    Share Your Insight
                  </h3>
                  <textarea
                    className="w-full p-3 bg-black/60 text-gray-200 rounded-lg border-2 mb-4"
                    style={{ borderColor: `${councilTheme.colors.primary}30` }}
                    rows={5}
                    value={shareContent}
                    onChange={(e) => setShareContent(e.target.value)}
                  />

                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">X (Twitter)</button>
                    <button className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors">Facebook</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">WhatsApp</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">Telegram</button>
                    <button className="px-4 py-2 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 transition-colors">Nostr</button>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={() => setShowShareModal(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors mr-3"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleMissionComplete}
                      className="px-4 py-2 text-white rounded-lg shadow-md transition-colors"
                      style={{ 
                        background: councilTheme.gradients.main,
                        boxShadow: councilTheme.shadows.button
                      }}
                    >
                      Continue Journey
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>}
    </div>
  );
}