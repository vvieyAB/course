import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mission as MissionComponent } from '@/components/missions/Mission';
import { realm4Missions } from '@/lib/realm4-missions';
import { MissionContent as Realm4MissionContent } from '@/lib/realm4-missions';
import { MissionContent } from '@/lib/realm1-missions';
import { renderToString } from 'react-dom/server';
import { getRealmName } from '@/lib/realm-utils';

export default function MissionPage() {
  const [_, params] = useRoute('/realm4/mission/:id');
  const missionId = params?.id ? parseInt(params.id) : null;
  const [mission, setMission] = useState<Realm4MissionContent | null>(null);
  const [completed, setCompleted] = useState(false);
  
  // Define a theme for Realm 4 - {getRealmName(4)}
  const mountainForgeTheme = {
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
  
  useEffect(() => {
    if (missionId) {
      // Log mission lookup process
      console.log(`Realm 4: Looking for mission with ID ${missionId}`);
      console.log('Available mission IDs:', realm4Missions.map(m => m.id));
      
      const foundMission = realm4Missions.find(m => m.id === missionId);
      
      if (foundMission) {
        console.log('Found mission:', foundMission.title);
        setMission(foundMission as unknown as Realm4MissionContent);
      } else {
        console.error(`Mission with ID ${missionId} not found in Realm 4`);
        setMission(null);
      }
    }
  }, [missionId]);
  
  const handleMissionComplete = () => {
    setCompleted(true);
    // Here you would update user progress in a real application
  };
  
  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${mountainForgeTheme.colors.background}, ${mountainForgeTheme.colors.backgroundLight})`,
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: mountainForgeTheme.colors.primary }}>Mission not found</h1>
          <Link href="/realm4">
            <Button 
              className="inline-flex items-center"
              style={{
                background: mountainForgeTheme.gradients.main,
                boxShadow: mountainForgeTheme.shadows.button,
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to {getRealmName(4)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (completed) {
    return (
      <div className="min-h-screen py-12 px-4"
        style={{
          background: `linear-gradient(to bottom, ${mountainForgeTheme.colors.background}, ${mountainForgeTheme.colors.backgroundLight})`,
        }}
      >
        <div className="max-w-2xl mx-auto bg-opacity-80 bg-black backdrop-blur rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text"
            style={{ backgroundImage: mountainForgeTheme.gradients.main }}
          >
            Mission Complete!
          </h1>
          
          <p style={{ color: mountainForgeTheme.colors.textLight }} className="mb-8">
            You've successfully completed the {mission.title} mission. These insights about Bitcoin mining will help you understand the economic and technical foundations of the network.
          </p>
          
          {missionId !== null && missionId < realm4Missions[realm4Missions.length - 1].id ? (
            <div className="space-y-4">
              <p style={{ color: mountainForgeTheme.colors.secondary }} className="font-medium">Ready for your next challenge?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/realm4/mission/${missionId !== null ? missionId + 1 : 1}`}>
                  <Button
                    className="w-full sm:w-auto"
                    style={{
                      background: mountainForgeTheme.gradients.main,
                      boxShadow: mountainForgeTheme.shadows.button,
                    }}
                  >
                    Next Mission
                  </Button>
                </Link>
                
                <Link href="/realm4">
                  <Button variant="outline" className="w-full sm:w-auto border-orange-500 text-orange-400">
                    Return to {getRealmName(4)}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p style={{ color: mountainForgeTheme.colors.secondary }} className="font-medium">You've reached the edge of {getRealmName(4)}!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/map">
                  <Button
                    className="w-full sm:w-auto"
                    style={{
                      background: mountainForgeTheme.gradients.main,
                      boxShadow: mountainForgeTheme.shadows.button,
                    }}
                  >
                    Return to Map
                  </Button>
                </Link>
                
                <Link href="/realm4">
                  <Button variant="outline" className="w-full sm:w-auto border-orange-500 text-orange-400">
                    Return to {getRealmName(4)}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-6 pb-12 px-4"
      style={{
        background: `linear-gradient(to bottom, ${mountainForgeTheme.colors.background}, ${mountainForgeTheme.colors.backgroundLight})`,
        backgroundImage: "url('/realms/forks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/realm4">
            <a className="inline-flex items-center hover:text-orange-300 transition-colors" 
              style={{ color: mountainForgeTheme.colors.secondary }}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Back to {getRealmName(4)}</span>
            </a>
          </Link>
          
          <div style={{ color: mountainForgeTheme.colors.secondary }} className="text-sm font-medium">
            Mission {missionId !== null ? missionId : 0} of {realm4Missions.length}
          </div>
        </div>
        
        <div className="relative">
          {/* Background elements */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/60 rounded-xl border border-orange-900/30 -z-10"></div>
          
          <div className="p-6">
            <MissionComponent 
              mission={{
                title: mission.title,
                id: mission.id,
                subtitle: mission.subtitle || "Bitcoin mining mechanics and technology",
                description: "Explore Bitcoin mining and its technology",
                objectives: ["Learn about proof-of-work mining", "Understand mining difficulty", "Complete the interactive simulation"],
                simulationType: "quiz",
                content: typeof mission.content === 'string' 
                  ? mission.content 
                  : typeof mission.content === 'object' && mission.content !== null
                    ? renderToString(mission.content)
                    : ""
              }} 
              onComplete={handleMissionComplete} 
              realmTheme="amber"
            />
          </div>
        </div>
      </div>
    </div>
  );
}