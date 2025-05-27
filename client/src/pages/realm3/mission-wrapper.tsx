import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import Mission from './mission';

/**
 * This component serves as a compatibility layer to handle mission loading in realm3, 
 * similar to what we did for realms 4 and 7
 */
export default function Realm3MissionWrapper() {
  const { missionId } = useParams<{ missionId: string }>();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Realm3MissionWrapper: Initializing with missionId:', missionId);
    setLoading(false);
  }, [missionId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // Use Mission component by default
  return <Mission />;
}