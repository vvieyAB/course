import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { realm6Missions } from '@/lib/realm6-missions';
import { getRealmName } from '@/lib/realm-utils';
import { Mission } from '@/components/ui/mission';
import RealUseCase from './components/RealUseCase';
import LightningNetwork from './components/LightningNetwork';
import Builders from './components/Builders';
import Tools from './components/Tools';
import Knowledge from './components/Knowledge';
import Bonus from './components/Bonus';

export default function Realm6Missions() {
  const [, setLocation] = useLocation();
  const { missionId } = useParams<{ missionId: string }>();
  const { user } = useAuth();
  const [missionComplete, setMissionComplete] = useState(false);
  const [contentRead, setContentRead] = useState(false);
  
  // Parse mission ID from URL
  const missionNumber = parseInt(missionId || '1');
  const missionDataId = missionNumber;
  
  // Current mission data
  const missionData = realm6Missions.find(m => m.id === missionDataId);
  
  // Add required content property for Mission component compatibility
  const missionWithContent = missionData ? {
    ...missionData,
    content: typeof missionData.description === 'string' ? missionData.description : "Learn about Bitcoin's practical applications in Africa.",
    simulationType: "bitcoin" as 'surveillance' | 'privacy' | 'cbdc' | 'bitcoin' | 'lightning' | 'selfcustody'
  } : null;
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);
  
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
  
  // Generate social media sharing message based on mission
  const generateSharingMessage = () => {
    if (!missionData) return '';
    
    let message = '';
    
    switch(missionData.contentType) {
      case 'realUseCase':
        message = `🌍 Today I learned about real Bitcoin use cases across Africa - from remittances in Nigeria to education funding in South Africa! #BitcoinQuest #BitcoinInAfrica`;
        break;
      case 'lightningNetwork':
        message = `⚡ The Lightning Network is enabling fast, borderless payments across Africa, connecting communities in ways never before possible! #BitcoinQuest #LightningNetwork`;
        break;
      case 'builders':
        message = `👷‍♀️ African Bitcoin builders are creating innovative solutions - from podcasts in Zambia to sustainable mining in Congo! #BitcoinQuest #AfricanInnovation`;
        break;
      case 'tools':
        message = `🔧 Discovered amazing Bitcoin tools designed for African users, including SMS-based solutions for those without internet access! #BitcoinQuest #BitcoinTools`;
        break;
      case 'knowledge':
        message = `🧠 Testing my knowledge about Bitcoin's practical applications across Africa and how it's changing lives! #BitcoinQuest #FinancialEmpowerment`;
        break;
      case 'bonus':
        message = `✨ Completed the final ${getRealmName(6)} mission by designing a Bitcoin project that embodies the spirit of "I am because we are" #BitcoinQuest #Ubuntu`;
        break;
      default:
        message = `🌱 Exploring how Bitcoin is transforming lives across Africa through the spirit of Ubuntu in my ${getRealmName(6)} journey! #BitcoinQuest`;
    }
    
    return message;
  };
  
  // Handle mission completion
  const handleMissionComplete = () => {
    setMissionComplete(true);
    // In a real application, we would update the user's progress here
    
    // Redirect to realm page after a delay
    setTimeout(() => {
      setLocation('/realm/6');
    }, 2000);
  };
  
  // This function is used by content components to trigger completion
  const handleChallengeComplete = () => {
    setShowShareModal(true);
    setShareContent(generateSharingMessage());
    
    // In a real application, we would update the user's progress here
    // updateUserProgress(user.id, { completedMissions: [...user.completedMissions, missionDataId] })
  };
  
  // State for social media sharing content
  const [shareContent, setShareContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Handle starting the challenge after reading content
  const handleStartChallenge = () => {
    setContentRead(true);
  };
  
  // Render appropriate content component based on mission type
  const renderContent = () => {
    if (!missionData) return null;
    
    switch(missionData.contentType) {
      case 'realUseCase':
        return <RealUseCase onComplete={handleChallengeComplete} />;
      case 'lightningNetwork':
        return <LightningNetwork onComplete={handleChallengeComplete} />;
      case 'builders':
        return <Builders onComplete={handleChallengeComplete} />;
      case 'tools':
        return <Tools onComplete={handleChallengeComplete} />;
      case 'knowledge':
        return <Knowledge onComplete={handleChallengeComplete} />;
      case 'bonus':
        return <Bonus onComplete={handleChallengeComplete} />;
      default:
        return (
          <div className="text-center py-10">
            <p className="text-rose-400">Content for this mission is under development.</p>
            <button
              onClick={handleChallengeComplete}
              className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Complete Mission
            </button>
          </div>
        );
    }
  };
  
  if (!missionData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${ubuntuTheme.colors.background}, ${ubuntuTheme.colors.backgroundLight})`,
          backgroundImage: "url('/realms/ubuntu-village.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="animate-pulse backdrop-blur-md bg-black/60 rounded-xl p-8 flex flex-col items-center">
          <div className="h-32 w-32 rounded-full mb-4" style={{ backgroundColor: ubuntuTheme.colors.primary }}></div>
          <div className="h-6 w-48 rounded-full" style={{ backgroundColor: ubuntuTheme.colors.primary }}></div>
        </div>
      </div>
    );
  }
  
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
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/6')} 
          className="flex items-center transition-colors font-medium"
          style={{ color: ubuntuTheme.colors.secondary }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to {getRealmName(6)}
        </button>
      </header>
      
      {/* Mission completion message */}
      {missionComplete && (
        <div className="fixed top-0 left-0 right-0 text-white p-3 text-center z-50 bg-green-700">
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}
      
      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-green-100 border-2 border-green-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Mission Not Found</h2>
          <p className="text-green-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/6')} 
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Realm
          </button>
        </div>
      )}
      
      {/* Mission content */}
      {missionData && <main className="max-w-4xl mx-auto">
        {!contentRead ? (
          <div className="backdrop-blur-md bg-black/60 p-8 rounded-xl border shadow-xl"
            style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
          >
            <Mission 
              mission={missionWithContent as any}
              onComplete={handleMissionComplete}
              realmTheme="green"
            />
            
            {/* Challenge button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartChallenge}
                className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                style={{ 
                  background: ubuntuTheme.gradients.main,
                  boxShadow: ubuntuTheme.shadows.button
                }}
              >
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Content section */}
            <div className="backdrop-blur-md bg-black/60 p-8 rounded-xl border shadow-xl"
              style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
            >
              <h2 className="text-2xl font-bold mb-4"
                style={{ color: ubuntuTheme.colors.primary }}
              >
                {missionData?.title}: {missionData?.subtitle}
              </h2>
              
              <div className="mt-4">
                {renderContent()}
              </div>
            </div>
            
            {/* Social media sharing section */}
            {showShareModal && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="backdrop-blur-md bg-black/90 rounded-xl p-6 max-w-md w-full border"
                  style={{ borderColor: `${ubuntuTheme.colors.primary}40` }}
                >
                  <h3 className="text-2xl font-bold mb-4"
                    style={{ color: ubuntuTheme.colors.primary }}
                  >
                    Share Your Learning
                  </h3>
                  <textarea
                    className="w-full p-3 bg-black/60 text-gray-200 rounded-lg border-2 mb-4"
                    style={{ borderColor: `${ubuntuTheme.colors.primary}30` }}
                    rows={5}
                    value={shareContent}
                    onChange={(e) => setShareContent(e.target.value)}
                  />
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">X (Twitter)</button>
                    <button className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors">Facebook</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">WhatsApp</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">Telegram</button>
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
                        background: ubuntuTheme.gradients.main,
                        boxShadow: ubuntuTheme.shadows.button
                      }}
                    >
                      Complete Mission
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