import { useParams, useLocation } from 'wouter';
import { MissionCard } from '@/components/ui/mission-card';
import { RealmData } from '@/lib/realm-data';
import { realm1Missions } from '@/lib/realm1-missions';
import { realm2Missions } from '@/lib/realm2-missions';
import { realm3Missions } from '@/lib/realm3-missions';
import { realm4Missions } from '@/lib/realm4-missions';
import { realm5Missions } from '@/lib/realm5-missions';
import { realm6Missions } from '@/lib/realm6-missions';
import { realm7Missions } from '@/lib/realm7-missions';
import { useAuth } from '@/context/AuthContext';
import { originTheme, citadelTheme, cryptographyTheme, miningTheme, governanceTheme, utilityTheme, mastersTheme } from '@/lib/realm-themes';
import { useEffect } from 'react';
import { RealmNavigation } from '@/components/ui/realm-navigation';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { QuickRealmAccess } from '@/components/ui/quick-realm-access';
import { ShareButton } from '@/components/ui/share-button';

// Transform mission data to match MissionCard props
const getMissionsForRealm = (realmId: number) => {
  switch(realmId) {
    case 1:
      return realm1Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false, // This would come from user progress data in a real app
        isLocked: false // All missions are accessible for demo purposes
      }));
    case 2:
      return realm2Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    case 3:
      return realm3Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    case 4:
      return realm4Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    case 5:
      return realm5Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    case 6:
      return realm6Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    case 7:
      return realm7Missions.map((mission) => ({
        title: mission.title,
        description: mission.subtitle,
        missionId: mission.id,
        isCompleted: false,
        isLocked: false
      }));
    default:
      // Fallback for any unforeseen realm IDs
      return [
        {
          title: 'Coming Soon',
          description: 'This realm is under construction',
          missionId: realmId * 100 + 1,
          isCompleted: false,
          isLocked: true
        }
      ];
  }
};

export default function RealmPage() {
  const { id } = useParams<{ id: string }>();
  const realmId = parseInt(id || '1');
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation('/auth');
    }
  }, [user, loading, setLocation]);
  
  // Get realm-specific data 
  const currentRealm = RealmData.find(realm => realm.id === realmId) || RealmData[0];
  
  // Get missions for this realm
  const missions = getMissionsForRealm(realmId);
  
  // Function to handle mission selection
  const handleMissionClick = (missionId: number, isLocked: boolean) => {
    if (!isLocked) {
      setLocation(`/realm/${realmId}/mission/${missionId}`);
    }
  };
  
  const handleBackClick = () => {
    setLocation('/home');
  };
  
  const handleMapClick = () => {
    setLocation('/map');
  };
  
  // Set theme based on realm
  const getThemeForRealm = (realmId: number) => {
    switch(realmId) {
      case 1: return originTheme;
      case 2: return citadelTheme;
      case 3: return cryptographyTheme;
      case 4: return miningTheme;
      case 5: return governanceTheme;
      case 6: return utilityTheme;
      case 7: return mastersTheme;
      default: return originTheme;
    }
  };
  
  const theme = getThemeForRealm(realmId);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" 
           style={{ backgroundColor: theme.colors.background, color: theme.colors.textLight }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
             style={{ borderColor: theme.colors.secondary }}></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20 md:pb-16" 
         style={{ 
           background: `linear-gradient(to bottom, ${theme.colors.background}, ${theme.colors.backgroundLight})`,
           color: theme.colors.textLight 
         }}>
      {/* Improved header with breadcrumb navigation */}
      <header className="sticky top-0 z-30 backdrop-blur-sm" style={{ backgroundColor: `${theme.colors.background}CC` }}>
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: `${theme.colors.primary}30` }}>
          {/* Left side - Back button and title */}
          <div className="flex items-center">
            <button 
              onClick={handleBackClick}
              className="mr-4 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
              style={{ 
                backgroundColor: `${theme.colors.primary}30`, 
                color: theme.colors.textLight 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">{currentRealm.name}</h1>
              <p style={{ color: theme.colors.secondary }} className="text-xs md:text-sm">
                Module {currentRealm.moduleNumber}: {currentRealm.focus || 'Money & Value'}
              </p>
            </div>
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Share button */}
            <ShareButton 
              title={`Exploring ${currentRealm.name} - Asha's Journey Through the Realms of Money`}
              description={`I'm learning about ${currentRealm.focus} in this interactive Bitcoin education platform. Join the journey!`}
              hashtags={['Bitcoin', 'Crypto', 'Education', `Realm${realmId}`]}
              position="right"
            />
            
            {/* Map button */}
            <button 
              onClick={handleMapClick}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
              style={{ 
                backgroundColor: `${theme.colors.primary}30`, 
                color: theme.colors.textLight 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Breadcrumb navigation */}
        <div className="px-4 py-2">
          <BreadcrumbNav 
            realmId={realmId} 
            textColor={`text-${theme.colors.secondary}`}
            separatorColor={`text-${theme.colors.primary}50`}
          />
        </div>
      </header>
      
      {/* Main content with side navigation */}
      <div className="flex flex-col md:flex-row px-4 md:px-6 lg:px-8">
        {/* Side navigation - only visible on desktop */}
        <div className="hidden md:block md:w-60 lg:w-72 py-6 pr-6 sticky top-24 self-start">
          <RealmNavigation 
            currentRealmId={realmId} 
            variant="full" 
            className="bg-black/20 p-4 rounded-xl"
          />
        </div>
        
        {/* Main content area - now spans full width */}
        <div className="flex-1 w-full">
          {/* Realm intro and info at the top */}
          <div className="py-3">
            <div className="rounded-xl p-4 mb-8" style={{ 
              backgroundColor: `${theme.colors.backgroundLight}50`,
              borderColor: `${theme.colors.primary}30`,
              borderWidth: '1px'
            }}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img 
                    src={currentRealm.imageUrl || `/images/realm${realmId}-detail.jpg`} 
                    alt={currentRealm.name}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${theme.colors.primary}20` }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.secondary }}>
                      Key Concepts
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Scarcity', 'Trade', 'History of Money', 'Value', 'Barter', 'Currency Systems'].map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: `${theme.colors.primary}40`,
                            color: theme.colors.textLight
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Welcome to {currentRealm.name}</h2>
                  <p className="mb-6">{currentRealm.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.secondary }}>
                    What You'll Learn
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Understand the foundations of money and its historical evolution</li>
                    <li>Explore the properties that make effective money systems</li>
                    <li>Discover how monetary systems are intertwined with cultural values</li>
                    <li>Learn the historical context of early trade and currency systems</li>
                  </ul>
                  
                  <div className="mt-4 p-3 rounded-lg border border-dashed" style={{ borderColor: theme.colors.secondary }}>
                    <p className="italic text-sm">
                      <span className="font-semibold">Asha says:</span> "Welcome to my journey through the realms of money! In this realm, 
                      we'll explore the fundamental concepts that shape our understanding of value and exchange. 
                      Ready to begin the adventure?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Missions list below the introduction */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Missions</h2>
            <div className="space-y-3">
              {missions.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  title={mission.title}
                  description={mission.description || ''}
                  isCompleted={mission.isCompleted}
                  isLocked={mission.isLocked}
                  onClick={() => handleMissionClick(mission.missionId, mission.isLocked)}
                />
              ))}
            </div>
          </div>
          
          {/* Learning path visualization */}
          <div className="mt-12 mb-16">
            <h2 className="text-xl font-semibold mb-4">Your Learning Path</h2>
            <div className="rounded-xl p-4" style={{ 
              backgroundColor: `${theme.colors.backgroundLight}50`,
              borderColor: `${theme.colors.primary}30`,
              borderWidth: '1px'
            }}>
              <div className="flex flex-col space-y-4">
                <p>
                  Complete all missions in this realm to master the concepts of {currentRealm.focus} and 
                  unlock the next realm in your journey.
                </p>
                
                <div className="relative py-2">
                  <div className="absolute top-0 bottom-0 left-4 w-1" style={{ backgroundColor: theme.colors.secondary }}></div>
                  <div className="flex flex-col space-y-8">
                    {missions.slice(0, 3).map((mission, index) => (
                      <div key={mission.missionId} className="flex items-start ml-2">
                        <div className="rounded-full w-6 h-6 flex-shrink-0 mr-4 flex items-center justify-center z-10" 
                             style={{ backgroundColor: theme.colors.secondary }}>
                          {mission.isCompleted ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg> : 
                            <span>{index + 1}</span>
                          }
                        </div>
                        <div className="pt-1">
                          <h4 className="font-medium">{mission.title}</h4>
                          <p className="text-sm opacity-80">{mission.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-start ml-2">
                      <div className="rounded-full w-6 h-6 flex-shrink-0 mr-4 flex items-center justify-center border-2 z-10" 
                           style={{ borderColor: theme.colors.secondary, backgroundColor: `${theme.colors.background}80` }}>
                        <span>...</span>
                      </div>
                      <div className="pt-1">
                        <h4 className="font-medium">Continue Your Journey</h4>
                        <p className="text-sm opacity-80">More missions await your discovery!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick realm access for easier navigation */}
      <QuickRealmAccess currentRealmId={realmId} position="right" className="hidden md:block" />
      
      {/* Bottom navigation for mobile */}
      <BottomNavigation />
    </div>
  );
}