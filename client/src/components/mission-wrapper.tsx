import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';
import MissionLayout from './mission-layout';
import { getRealmName } from '@/lib/realm-utils';

// Component to show while loading a mission
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-stone-900">
    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
    <span className="ml-2 text-amber-100">Loading mission...</span>
  </div>
);

// Error state component
const ErrorMessage = ({ realmId, missionId }: { realmId: string, missionId: string }) => {
  const [, setLocation] = useLocation();
  
  // Make sure we have a valid number for the realm ID
  const realmIdNumber = parseInt(realmId);
  const validRealmId = !isNaN(realmIdNumber) && realmIdNumber >= 1 && realmIdNumber <= 7;
  const realmName = validRealmId ? getRealmName(realmIdNumber) : "the Map";
  const returnPath = validRealmId ? `/realm/${realmId}` : "/map";
  
  let errorMessage = "";
  
  if (!realmId || isNaN(Number(realmId))) {
    errorMessage = "Invalid realm specified. Please return to the map and select a valid realm.";
  } else if (!missionId || isNaN(Number(missionId))) {
    errorMessage = "Invalid mission specified. Please return to the realm and select a valid mission.";  
  } else {
    errorMessage = `We couldn't find mission ${missionId} in ${realmName}. It may have been moved or doesn't exist.`;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-amber-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-amber-400">Mission not found</h1>
      <p className="mb-6 text-center max-w-md">
        {errorMessage}
      </p>
      <button
        onClick={() => setLocation(returnPath)}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-md text-white transition-colors"
      >
        Return to {realmName}
      </button>
    </div>
  );
};

interface MissionData {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
}

export default function MissionWrapper() {
  const params = useParams<{ realmId: string, missionId: string }>();
  const [, setLocation] = useLocation();
  
  // Validate the parameters
  const realmId = params.realmId;
  const missionId = params.missionId;
  
  // Debug log to understand what's happening with the parameters
  console.log('MissionWrapper params:', JSON.stringify(params));
  
  // Location navigation is handled by child components when needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [missionData, setMissionData] = useState<MissionData | null>(null);
  const [MissionComponent, setMissionComponent] = useState<React.ComponentType | null>(null);

  // Get mission title and description from local data
  const getMissionInfo = (missionId: string, realmId: string) => {
    // Calculate the full mission ID based on realm conventions
    // Realm 1: 100+, Realm 2: 200+, Realm 3: 300+, etc.
    // But Realms 4, 6, 7 use direct mission IDs (1, 2, 3)
    let idToUse = Number(missionId);
    const realmNum = Number(realmId);
    
    // For realms 1-3, use prefixed IDs
    if (realmNum >= 1 && realmNum <= 3) {
      idToUse = realmNum * 100 + Number(missionId);
    }
    
    // Default values with the mission and realm information
    return { 
      title: `Mission ${missionId}`, 
      subtitle: `A learning journey in ${getRealmName(Number(realmId))}`,
      fullMissionId: idToUse
    };
  };

  useEffect(() => {
    // Reset state on parameter changes
    setLoading(true);
    setError(false);
    setMissionComponent(null);
    setMissionData(null);
    
    let isMounted = true;
    
    // Early validation to prevent "realmundefined" errors
    if (!realmId || isNaN(Number(realmId)) || !missionId || isNaN(Number(missionId))) {
      console.error('Invalid realm or mission ID:', { realmId, missionId });
      console.log('Full params object:', params);
      setError(true);
      setLoading(false);
      return;
    }
    
    // Handle specific case for realm7 which appears to be having issues
    if (realmId === '7') {
      console.log('Handling Realm 7 specific case');
    }

    // Dynamic import of mission content based on realm and mission IDs
    const loadMission = async () => {
      try {
        let missionModule;
        
        // Validate realm and mission ID again
        if (!realmId || !missionId || isNaN(Number(realmId)) || isNaN(Number(missionId))) {
          throw new Error(`Invalid realm (${realmId}) or mission (${missionId}) ID`);
        }
        
        const realmNum = Number(realmId);
        const missionNum = Number(missionId);
        
        // Make sure realm is in valid range
        if (realmNum < 1 || realmNum > 7) {
          throw new Error(`Realm ${realmNum} is out of valid range (1-7)`);
        }
        
        // Updated paths to match our actual file structure
        let loadPaths = [];
        
        // For realm 4, prioritize mission.tsx over missions.tsx
        if (realmNum === 4) {
          loadPaths = [
            // Try mission.tsx first for realm 4
            `../pages/realm${realmNum}/mission.tsx`,
            
            // Then try missions.tsx
            `../pages/realm${realmNum}/missions.tsx`,
            
            // Then try specific simulators based on mission type
            `../pages/realm${realmNum}/mining-simulator.tsx`,
            `../pages/realm${realmNum}/consensus-simulator.tsx`,
            `../pages/realm${realmNum}/energy-simulator.tsx`,
            `../pages/realm${realmNum}/africa-simulator.tsx`,
            `../pages/realm${realmNum}/knowledge-simulator.tsx`,
            `../pages/realm${realmNum}/halving-simulator.tsx`,
          ];
        } else {
          loadPaths = [
            // Try mission-specific component if it exists
            `../pages/realm${realmNum}/mission${missionNum}.tsx`,
            
            // Try generic mission page with ID parameter
            `../pages/realm${realmNum}/mission.tsx`,
            
            // Try missions.tsx (used in realm1)
            `../pages/realm${realmNum}/missions.tsx`,
            
            // Try fallback to related challenge or interactive components
            `../pages/realm${realmNum}/barter-web-challenge.tsx`,
            `../pages/realm${realmNum}/currency-value-simulator.tsx`,
            `../pages/realm${realmNum}/inflation-simulator.tsx`,
          ];
        }
        
        // For older structure compatibility
        loadPaths.push(`../realms/Realm${realmNum}/Mission${missionNum}/index.tsx`);
        
        console.log(`Attempting to load mission from: ${loadPaths.join(', ')}`);
        
        for (const path of loadPaths) {
          if (!path) continue;
          
          try {
            // @vite-ignore
            missionModule = await import(path);
            console.log(`Successfully loaded mission from: ${path}`);
            break; // Stop if we found a valid module
          } catch (error) {
            // Continue to next path
            console.log(`Path ${path} not found, trying next...`);
          }
        }
        
        if (!missionModule) {
          throw new Error(`Mission ${missionId} in Realm ${realmId} not found. Please try a different mission or return to the realm home.`);
        }
        
        if (isMounted) {
          setMissionComponent(() => missionModule.default);
          
          try {
            // Get mission info from local data
            const missionInfo = getMissionInfo(missionId, realmId);
            setMissionData({ 
              title: missionInfo.title,
              subtitle: missionInfo.subtitle 
            });
            setLoading(false);
          } catch (err) {
            console.error('Error loading mission info:', err);
            setError(true);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Failed to load mission:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadMission();

    return () => {
      isMounted = false;
    };
  }, [realmId, missionId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !MissionComponent) {
    return <ErrorMessage realmId={realmId} missionId={missionId} />;
  }

  // Simply render the component if it uses its own layout
  if (Object.prototype.hasOwnProperty.call(MissionComponent, 'useCustomLayout') || 
     (missionId === '1' && realmId === '1')) {
    return <MissionComponent />;
  }

  // Otherwise, wrap it in our standardized layout
  return (
    <MissionLayout 
      realmId={realmId}
      title={missionData?.title || `Mission ${missionId}`}
      subtitle={missionData?.subtitle}
    >
      <MissionComponent />
    </MissionLayout>
  );
}