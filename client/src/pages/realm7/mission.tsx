import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { ChevronLeft, ChevronRight, Award, Lightbulb, Share } from 'lucide-react';
import { realm7Missions } from '../../lib/realm7-missions';
import { getRealmName } from '@/lib/realm-utils';

interface MissionProps {
  missionId?: string; // Can be passed explicitly from wrapper
}

export default function Realm7Mission({ missionId: explicitMissionId }: MissionProps) {
  const [_, setLocation] = useLocation();
  const { missionId: urlMissionId } = useParams<{ missionId: string }>();
  const [missionComplete, setMissionComplete] = useState(false);
  const [contentRead, setContentRead] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareContent, setShareContent] = useState('');
  
  // Use explicitly passed ID if available, otherwise use URL params
  const effectiveMissionId = explicitMissionId || urlMissionId || '1';
  
  // Parse mission ID from URL or props
  const missionNumber = parseInt(effectiveMissionId);
  
  // Current mission data
  const missionData = realm7Missions.find(m => m.id === missionNumber);
  
  // Define theme for Realm 7 - The Summit of Knowledge
  const summitTheme = {
    colors: {
      primary: '#8b5cf6', // violet-500
      secondary: '#a78bfa', // violet-400
      background: '#0f172a', // slate-900
      backgroundLight: '#1e293b', // slate-800
      success: '#15803d', // green-700
      textDark: '#4c1d95', // violet-900
      textLight: '#f5f3ff', // violet-50
      accent1: '#7c3aed', // violet-600
      accent2: '#c4b5fd', // violet-300
    },
    gradients: {
      main: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      glow: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
      subtle: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)',
    },
    shadows: {
      button: '0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -4px rgba(139, 92, 246, 0.2)',
      card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    }
  };

  // Handle mission completion
  const handleMissionComplete = () => {
    setMissionComplete(true);
    
    // Redirect to realm page after a delay
    setTimeout(() => {
      setLocation('/realm/7');
    }, 2000);
  };
  
  // Handle starting the challenge after reading content
  const handleStartChallenge = () => {
    setContentRead(true);
  };
  
  // Handle share button click
  const handleShareClick = () => {
    setShareContent(generateShareContent());
    setShowShareModal(true);
  };
  
  // Generate social media sharing content based on mission
  const generateShareContent = () => {
    if (!missionData) return '';
    
    return `I've just completed the "${missionData.title}: ${missionData.subtitle}" challenge in Asha's Bitcoin Journey! Learning about Bitcoin has been an incredible experience. #BitcoinEducation #BitcoinJourney`;
  };
  
  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${summitTheme.colors.background}, ${summitTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/summit.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        color: summitTheme.colors.textLight
      }}
    >
      {/* Mission navigation header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button 
          onClick={() => setLocation('/realm/7')} 
          className="flex items-center transition-colors font-medium"
          style={{ color: summitTheme.colors.secondary }}
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to {getRealmName(7)}
        </button>
      </header>
      
      {/* Mission completion message */}
      {missionComplete && (
        <div className="fixed top-0 left-0 right-0 text-white p-3 text-center z-50"
          style={{ backgroundColor: summitTheme.colors.success }}
        >
          Mission complete! Great job! Redirecting to Realm...
        </div>
      )}
      
      {/* Mission not found message */}
      {!missionData && (
        <div className="max-w-4xl mx-auto bg-violet-100 border-2 border-violet-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-violet-900 mb-2">Mission Not Found</h2>
          <p className="text-violet-800 mb-4">This mission doesn't exist yet or may have been moved.</p>
          <button 
            onClick={() => setLocation('/realm/7')} 
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Return to Realm
          </button>
        </div>
      )}
      
      {/* Mission content */}
      {missionData && (
        <main className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-black/60 p-8 rounded-xl border shadow-xl"
            style={{ borderColor: `${summitTheme.colors.primary}40` }}
          >
            <h1 className="text-3xl font-bold mb-2" style={{ color: summitTheme.colors.primary }}>
              {missionData.title}
            </h1>
            <h2 className="text-xl mb-6" style={{ color: summitTheme.colors.secondary }}>
              {missionData.subtitle}
            </h2>
            
            <div className="prose prose-invert max-w-none">
              {missionData.description}
            </div>
            
            {/* Educational content section */}
            {missionData.content && !contentRead && (
              <div className="mt-8 p-5 rounded-lg bg-black/30 border border-cyan-900/30">
                <h3 className="font-medium flex items-center mb-4" style={{ color: summitTheme.colors.primary }}>
                  <Lightbulb className="h-5 w-5 mr-2" />
                  <span className="text-xl">Educational Content</span>
                </h3>
                
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: missionData.content }}
                />
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              {!contentRead ? (
                <button
                  onClick={handleStartChallenge}
                  className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                  style={{ 
                    background: summitTheme.gradients.main,
                    boxShadow: summitTheme.shadows.button
                  }}
                >
                  Start Challenge
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleShareClick}
                  className="px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center group"
                  style={{ 
                    background: summitTheme.gradients.main,
                    boxShadow: summitTheme.shadows.button
                  }}
                >
                  Complete & Share
                  <Award className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          {/* Social media sharing section */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="backdrop-blur-md bg-black/90 rounded-xl p-6 max-w-md w-full border"
                style={{ borderColor: `${summitTheme.colors.primary}40` }}
              >
                <h3 className="text-2xl font-bold mb-4"
                  style={{ color: summitTheme.colors.primary }}
                >
                  Share Your Achievement
                </h3>
                <textarea
                  className="w-full p-3 bg-black/60 text-gray-200 rounded-lg border-2 mb-4"
                  style={{ borderColor: `${summitTheme.colors.primary}30` }}
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
                      background: summitTheme.gradients.main,
                      boxShadow: summitTheme.shadows.button
                    }}
                  >
                    Continue Journey
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}