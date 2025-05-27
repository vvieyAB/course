import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm3Missions } from '@/lib/realm3-missions';
import { Mission } from '@/components/ui/mission';
import { bioluminescentTheme } from '@/lib/realm-themes';

// Lazy load simulation components to improve performance
const CryptographySimulator = lazy(() => import('./cryptography-simulator'));
const HashingSimulator = lazy(() => import('./hashing-simulator'));
const MerkleTreeSimulator = lazy(() => import('./merkle-tree-simulator'));
const ConsensusSimulator = lazy(() => import('./consensus-simulator'));

export default function Realm3Missions() {
  const [, setLocation] = useLocation();
  const { missionId } = useParams<{ missionId: string }>();
  const { user, loading } = useAuth();
  const [missionComplete, setMissionComplete] = useState(false);

  // Parse mission ID from URL
  const missionNumber = parseInt(missionId || '1');

  // Current mission data - mission IDs in realm3 are now consistent (1, 2, 3, etc.)
  const missionData = realm3Missions.find(m => m.id === missionNumber);

  // Add required content property for Realm2MissionData compatibility
  const missionWithContent = missionData ? {
    ...missionData,
    content: typeof missionData.description === 'string' ? missionData.description : ''
  } : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation('/auth');
    }
  }, [user, loading, setLocation]);

  // Generate social media sharing message based on mission
  const generateSharingMessage = () => {
    if (!missionData) return '';

    let message = '';

    switch(missionData.simulationType) {
      case 'cryptography':
        message = `🔐 Today I learned about cryptography and how it secures Bitcoin transactions. The digital money of the future relies on strong encryption! #BitcoinQuest #Cryptography`;
        break;
      case 'hash':
        message = `#️⃣ Just explored how hash functions create digital fingerprints in Bitcoin's blockchain. These one-way functions are the foundation of blockchain security! #BitcoinQuest #Blockchain`;
        break;
      case 'merkle':
        message = `🌳 Learning about Merkle Trees and how they efficiently organize data in Bitcoin's blockchain. Such an elegant data structure! #BitcoinQuest #MerkleTrees`;
        break;
      case 'consensus':
        message = `🤝 Today I explored how Bitcoin's consensus mechanism achieves agreement without central authority. Proof-of-Work is revolutionary! #BitcoinQuest #Consensus`;
        break;
      default:
        message = `🧠 Learning about the cryptographic foundations of Bitcoin in my Bitcoin Quest journey! #BitcoinEducation #Cryptography`;
    }

    return message;
  };

  // Handle mission completion
  const handleMissionComplete = () => {
    setMissionComplete(true);
    // In a real application, we would update the user's progress here
    // with something like:
    // updateUserProgress(user.id, { completedMissions: [...user.completedMissions, missionNumber] })

    // Redirect to realm page after a delay
    setTimeout(() => {
      setLocation('/realm/3');
    }, 2000);
  };

  // This function is used by simulation components to trigger the sharing modal
  const handleChallengeComplete = () => {
    setShareContent(generateShareContent());
    setShowShareModal(true);

    // In a real application, we would update the user's progress here
    // updateUserProgress(user.id, { completedMissions: [...user.completedMissions, missionNumber] })
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
    const simulator = missionData?.simulationType;
    if (simulator) {
      setLocation(`/realm3/${simulator}-simulator`);
    }
  };

  // Render appropriate simulation based on mission type
  const renderSimulation = () => {
    if (!missionData) return null;

    return (
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: primaryColor }} />
        </div>
      }>
        {(() => {
          switch(missionNumber) {
            case 1:
              return <CryptographySimulator onComplete={handleChallengeComplete} />;
            case 2:
              return <HashingSimulator onComplete={handleChallengeComplete} />;
            case 3:
              return <MerkleTreeSimulator onComplete={handleChallengeComplete} />;
            case 5:
              return <ConsensusSimulator onComplete={handleChallengeComplete} />;
            default:
              return <div className="text-center py-10" style={{ color: secondaryColor }}>
                <p>Challenge not found for this mission.</p>
              </div>;
          }
        })()}
      </Suspense>
    );
  };

  if (loading || !missionData) {
    // Define fallback colors in case theme properties are undefined
    const bgColor = bioluminescentTheme?.colors?.background || "#0D3D29";
    const bgLightColor = bioluminescentTheme?.colors?.backgroundLight || "#134935";
    const primaryColor = bioluminescentTheme?.colors?.primary || "#1A8F60";

    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}, ${bgLightColor})`
        }}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 rounded-full mb-4" style={{ backgroundColor: primaryColor }}></div>
          <div className="h-6 w-48 rounded-full" style={{ backgroundColor: primaryColor }}></div>
        </div>
      </div>
    );
  }

  // Define theme colors with fallbacks to ensure they're always defined
  const bgColor = bioluminescentTheme?.colors?.background || "#0D3D29";
  const bgLightColor = bioluminescentTheme?.colors?.backgroundLight || "#134935";
  const primaryColor = bioluminescentTheme?.colors?.primary || "#1A8F60";
  const secondaryColor = bioluminescentTheme?.colors?.secondary || "#46D1A2";

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${bgColor}, ${bgLightColor})`,
        color: "#eaeaea",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(6, 214, 160, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(17, 138, 178, 0.05) 0%, transparent 40%)"
      }}
    >
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/3')} 
          className="flex items-center transition-colors font-medium"
          style={{ color: secondaryColor }}
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
          style={{ backgroundColor: "#22c55e" }} // Using a green color directly instead of theme.success
        >
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}

      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-blue-100 border-2 border-blue-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Mission Not Found</h2>
          <p className="text-blue-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/3/home')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Realm
          </button>
        </div>
      )}

      {/* Mission content */}
      {missionData && (
        <main className="max-w-4xl mx-auto">
          {!contentRead ? (

              <Mission 
                mission={missionWithContent as any}
                onComplete={handleMissionComplete}
                realmTheme="blue"
              />

              {/* Challenge button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleStartChallenge}
                  className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                  style={{ 
                    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 15px ${primaryColor}80`
                  }}
                >
                  Start Challenge
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

          ) : (
            <>
              {/* Challenge section */}
              <div className="bg-black/40 p-8 rounded-xl border-2 shadow-xl"
                style={{ borderColor: `${primaryColor}40` }}
              >
                <h2 className="text-2xl font-bold mb-4"
                  style={{ color: primaryColor }}
                >
                  Challenge: {missionData?.title}
                </h2>

                <p className="text-gray-300 mb-6">
                  Complete this challenge to unlock the next mission and continue your journey through the Bioluminescent Forest.
                </p>

                {/* Render appropriate simulation component */}
                <div className="mt-4">
                  {renderSimulation()}
                </div>
              </div>

              {/* Social media sharing section */}
              {showShareModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                  <div className="bg-black/90 rounded-xl p-6 max-w-md w-full border"
                    style={{ borderColor: `${primaryColor}40` }}
                  >
                    <h3 className="text-2xl font-bold mb-4"
                      style={{ color: primaryColor }}
                    >
                      Share Your Insight
                    </h3>
                    <textarea
                      className="w-full p-3 bg-black/60 text-gray-200 rounded-lg border-2 mb-4"
                      style={{ borderColor: `${primaryColor}30` }}
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
                          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                          boxShadow: `0 0 15px ${primaryColor}80`
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
        </main>
      )}
    </div>
  );
}