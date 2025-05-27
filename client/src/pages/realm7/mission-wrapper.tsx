import { useEffect, useState } from 'react';
import { useParams, useLocation, useRoute } from 'wouter';
import Mission from './mission';

/**
 * This component serves as a compatibility layer to handle mission loading
 * in realm7, resolving conflicts between mission.tsx and missions.tsx
 * and handling both /realm7/mission/:id and /realm/7/mission/:id formats
 */
export default function Realm7MissionWrapper() {
  // Check for both URL patterns
  const [matchRealmWithNumber, paramsWithNumber] = useRoute('/realm/7/mission/:missionId');
  const [matchRealm7, paramsRealm7] = useRoute('/realm7/mission/:missionId');
  
  // Get params from whichever route matched
  const params = matchRealmWithNumber ? paramsWithNumber : paramsRealm7;
  const missionId = params?.missionId || '1'; // Default to mission 1 if not specified
  
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Realm7MissionWrapper: Initializing with missionId:', missionId);
    console.log('Route match info:', { 
      matchRealmWithNumber, 
      matchRealm7, 
      paramsWithNumber, 
      paramsRealm7 
    });
    setLoading(false);
  }, [missionId, matchRealmWithNumber, matchRealm7, paramsWithNumber, paramsRealm7]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }
  
  // Use Mission component by default
  return <Mission key={missionId} />;
}