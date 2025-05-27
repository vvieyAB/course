import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm2Missions } from '@/lib/realm2-missions';
import { Mission } from '@/components/ui/mission';
import { citadelTheme } from '@/lib/realm-themes';

// Lazy load simulation components to improve performance
const SurveillanceSimulator = lazy(() => import('./surveillance-simulator'));
const PrivacyBalanceSimulator = lazy(() => import('./privacy-balance-simulator'));
const CBDCSimulator = lazy(() => import('./cbdc-simulator'));
const BitcoinTransparencyExplorer = lazy(() => import('./bitcoin-transparency-explorer'));
const LightningNetworkSimulator = lazy(() => import('./lightning-network-simulator'));
const SelfCustodySimulator = lazy(() => import('./self-custody-simulator'));

export default function Realm2Missions() {
  const [, setLocation] = useLocation();
  const { missionId } = useParams<{ missionId: string }>();
  const { user, loading } = useAuth();
  const [missionComplete, setMissionComplete] = useState(false);

  // Parse mission ID from URL
  const missionNumber = parseInt(missionId || '1');
  const missionDataId = 200 + missionNumber;

  // Current mission data
  const missionData = realm2Missions.find(m => m.id === missionDataId);

  // Add required content property for Mission component compatibility
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
      case 'surveillance':
        message = `🔍 Today I learned about financial surveillance in centralized monetary systems and why privacy matters. The digital money of the future should protect our financial sovereignty! #BitcoinQuest #FinancialPrivacy`;
        break;
      case 'privacy':
        message = `⚖️ Exploring the balance between privacy and transparency in financial systems. Bitcoin offers a unique approach that's neither total surveillance nor complete secrecy. #BitcoinQuest #FinancialPrivacy`;
        break;
      case 'cbdc':
        message = `💸 Learning about Central Bank Digital Currencies and their implications for privacy. It's fascinating to compare CBDCs with Bitcoin's decentralized approach! #BitcoinQuest #CBDCs #DigitalCurrency`;
        break;
      case 'bitcoin':
        message = `🔍 Just explored how Bitcoin's transparent blockchain maintains privacy through pseudonymity. Understanding this balance is key to appreciating Bitcoin's innovation! #BitcoinQuest #Blockchain`;
        break;
      case 'lightning':
        message = `⚡ The Lightning Network adds speed, scalability, and enhanced privacy to Bitcoin! Just learned how this second layer works in my Bitcoin education journey. #BitcoinQuest #LightningNetwork`;
        break;
      case 'selfcustody':
        message = `🔑 "Not your keys, not your coins." Today I learned about the importance of self-custody in Bitcoin. Taking control of your private keys means true financial sovereignty! #BitcoinQuest #SelfCustody`;
        break;
      default:
        message = `🧠 Learning about Bitcoin and financial privacy in my Bitcoin Quest journey! #BitcoinEducation #FinancialLiteracy`;
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
      setLocation('/realm/2');
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
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      }>
        {(() => {
          switch(missionData.simulationType) {
            case 'surveillance':
              return <SurveillanceSimulator onComplete={handleChallengeComplete} />;
            case 'privacy':
              return <PrivacyBalanceSimulator onComplete={handleChallengeComplete} />;
            case 'cbdc':
              return <CBDCSimulator onComplete={handleChallengeComplete} />;
            // case 'bitcoin':
            //   return <BitcoinTransparencyExplorer onComplete={handleChallengeComplete} />;
            case 'lightning':
              return <LightningNetworkSimulator onComplete={handleChallengeComplete} />;
            case 'selfcustody':
              return <SelfCustodySimulator onComplete={handleChallengeComplete} />;
            default:
              return <div className="text-center text-purple-300 py-10">
                <p>Challenge not found for this mission type.</p>
              </div>;
          }

        })()}      </Suspense>
    );
  };

  if (loading || !missionData) {
    // Define fallback colors in case theme properties are undefined
    const bgColor = citadelTheme?.colors?.background || "#00243F";
    const primaryColor = citadelTheme?.colors?.primary || "#00589B";

    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: bgColor
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
  const bgColor = citadelTheme?.colors?.background || "#00243F";
  const bgLightColor = citadelTheme?.colors?.backgroundLight || "#003660";
  const primaryColor = citadelTheme?.colors?.primary || "#00589B";
  const secondaryColor = citadelTheme?.colors?.secondary || "#0076CE";

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${bgColor}, ${bgLightColor})`,
        color: "#eaeaea",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0, 118, 206, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(0, 166, 237, 0.05) 0%, transparent 40%)"
      }}
    >
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/2')} 
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
        <div className="fixed top-0 left-0 right-0 bg-green-600 text-white p-3 text-center z-50">
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}

      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-purple-100 border-2 border-purple-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">Mission Not Found</h2>
          <p className="text-purple-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/2')} 
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
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
                realmTheme="purple"
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
              style={{ borderColor: `${primaryColor}40` }}>
              <h2 className="text-2xl font-bold mb-4"
                style={{ color: primaryColor }}>
                Challenge: {missionData?.title}
              </h2>

              <p className="text-gray-300 mb-6">
                Complete this challenge to unlock the next mission and continue your journey through the Surveillance City.
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
                  style={{ borderColor: `${primaryColor}40` }}>
                  <h3 className="text-2xl font-bold mb-4" 
                    style={{ color: primaryColor }}>Share Your Insight</h3>
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