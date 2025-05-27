import { CourseJourney } from '@/components/course-journey';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function JourneyPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [journeyStarted, setJourneyStarted] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/auth');
    }
  }, [isAuthenticated, setLocation]);
  
  const handleStartJourney = () => {
    setJourneyStarted(true);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-amber-600 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-amber-600 rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!journeyStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-origins-pattern bg-opacity-5">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-amber-100 mb-8 font-lora">The Bitcoin Quest</h1>
          <p className="text-xl text-amber-200 mb-10">
            Prepare to embark on an immersive journey through the realms of money and Bitcoin.
            Scroll through each realm to discover the knowledge they hold.
          </p>
          <button
            onClick={handleStartJourney}
            className="btn-origins text-lg px-8 py-4"
          >
            Begin Journey
          </button>
        </div>
      </div>
    );
  }
  
  return <CourseJourney />;
}