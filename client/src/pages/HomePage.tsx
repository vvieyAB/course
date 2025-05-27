import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { RealmData } from '@/lib/realm-data';
import { getRealmName } from '@/lib/realm-utils';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { currentRealm } = useAuth();
  
  // Use static data directly without query hooks
  const [realms, setRealms] = useState(RealmData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRealmClick = (realmId: number, isLocked: boolean) => {
    if (!isLocked) {
      // For Realm 1, go directly to the story introduction
      if (realmId === 1) {
        setLocation('/realm/1/story');
      } else {
        setLocation(`/realm/${realmId}`);
      }
    }
  };

  // Helper function for module label display
  const getModuleLabel = (focus: string, moduleNumber: number) => {
    return `${moduleNumber}. ${focus}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-800 to-amber-950 text-amber-100 pb-16">
      {/* Top navigation icons */}
      <header className="py-4 px-6 flex justify-end items-center">
        <div className="flex space-x-4">
          <button 
            className="w-10 h-10 rounded-full bg-amber-800/50 flex items-center justify-center hover:bg-amber-800"
            onClick={() => setLocation('/map')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-amber-800/50 flex items-center justify-center hover:bg-amber-800"
            onClick={() => setLocation('/badges')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </button>

        </div>
      </header>
      
      <div className="pt-8 pb-4 px-6">
        <h1 className="text-4xl font-semibold mb-2">Welcome Back, Learner!</h1>
        <p className="text-amber-200 mb-8">Continue your journey through the history of money</p>
        
        <div className="bg-amber-900/30 border border-amber-700/30 rounded-xl p-4 mb-8 flex items-center">
          <div className="mr-4 bg-amber-800/50 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-lg">Continue your progress</h3>
            <p className="text-amber-200 text-sm">
              {currentRealm > 1 ? 
                `You're currently in ${getRealmName(currentRealm)}` : 
                'Start your journey from the beginning'}
            </p>
          </div>
          <button 
            className="ml-auto bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
            onClick={() => currentRealm > 1 ? 
              setLocation(`/realm/${currentRealm}`) : 
              setLocation('/realm/1/story')}
          >
            Continue
          </button>
        </div>
      </div>
      
      <div className="px-6">
        <h2 className="text-2xl font-semibold mb-4">Your Learning Path</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
            Error loading realms. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {realms.map((realm) => {
              // All realms should be unlocked during development
              const isLocked = false; // Force all realms to be unlocked
              
              return (
                <div 
                  key={realm.id}
                  onClick={() => handleRealmClick(realm.id, isLocked)}
                  className={`relative border rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-[1.02] ${
                    isLocked ? 'border-gray-600 opacity-70' : 'border-amber-600'
                  }`}
                >
                  <div className="aspect-[2/1] relative">
                    <img 
                      src={realm.imageUrl || `/images/realm${realm.id}.jpg`} 
                      alt={getRealmName(realm.moduleNumber)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="bg-black/60 p-3 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-xs font-medium text-amber-400 mb-1">
                        {getModuleLabel(realm.focus || 'Money & Value', realm.moduleNumber)}
                      </div>
                      <h3 className="text-xl font-bold text-white">{getRealmName(realm.moduleNumber)}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-950">
                    <p className="text-amber-200 text-sm line-clamp-2">{realm.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}