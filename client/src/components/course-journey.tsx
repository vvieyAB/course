import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ParallaxSection } from './ui/parallax-section';
import { originTheme } from '@/lib/realm-themes';
import { getRealmName } from '@/lib/realm-utils';

interface Realm {
  id: number;
  name: string;
  description: string;
  moduleNumber: number;
  imageUrl: string;
  isLocked: boolean;
}

// Realm background images with parallax layers
// Aligned with standardized realm names: 
// 1. Realm of Origins, 2. The Central Citadel, 3. The Forest of Sparks, 
// 4. The Mountain Forge, 5. The Council of Forks, 6. The Ubuntu Village, 7. The Summit of Knowledge
const REALM_PARALLAX_IMAGES = {
  1: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/origins-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/origins-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/origins-background.jpg',
  },
  2: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/citadel-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/citadel-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/citadel-background.jpg',
  },
  3: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/sparks-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/sparks-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/sparks-background.jpg',
  },
  4: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forge-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forge-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forge-background.jpg',
  },
  5: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forks-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forks-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/forks-background.jpg',
  },
  6: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/ubuntu-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/ubuntu-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/ubuntu-background.jpg',
  },
  7: {
    main: 'https://bitcoiners.africa/wp-content/uploads/2025/04/summit-main.jpg',
    foreground: 'https://bitcoiners.africa/wp-content/uploads/2025/04/summit-foreground.png',
    background: 'https://bitcoiners.africa/wp-content/uploads/2025/04/summit-background.jpg',
  }
};

// Fallback placeholders for when images don't load
const PLACEHOLDER_COLORS = [
  'bg-amber-900',   // 1: Realm of Origins
  'bg-slate-900',   // 2: The Central Citadel
  'bg-emerald-900', // 3: The Forest of Sparks
  'bg-pink-900',    // 4: The Mountain Forge
  'bg-indigo-900',  // 5: The Council of Forks
  'bg-orange-900',  // 6: The Ubuntu Village
  'bg-purple-900',  // 7: The Summit of Knowledge
];

// Local realm data
const LOCAL_REALMS: Realm[] = [
  {
    id: 1,
    name: "Realm of Origins",
    description: "Discover the foundations of money and its evolution throughout history, from barter systems to modern currencies.",
    moduleNumber: 1,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 2,
    name: "The Central Citadel",
    description: "Explore modern monetary systems, central banking, and how traditional financial institutions operate.",
    moduleNumber: 2,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 3,
    name: "The Forest of Sparks",
    description: "Learn about the birth of Bitcoin, blockchain technology, and the core principles behind cryptocurrencies.",
    moduleNumber: 3,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 4,
    name: "The Mountain Forge",
    description: "Understand Bitcoin mining, consensus mechanisms, and the technical aspects that secure the network.",
    moduleNumber: 4,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 5,
    name: "The Council of Forks",
    description: "Explore Bitcoin governance, community decisions, protocol upgrades, and historical forks.",
    moduleNumber: 5,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 6,
    name: "The Ubuntu Village",
    description: "Discover practical applications of Bitcoin in Africa, financial inclusion, and real-world use cases.",
    moduleNumber: 6,
    imageUrl: "",
    isLocked: false
  },
  {
    id: 7,
    name: "The Summit of Knowledge",
    description: "Complete your journey with a comprehensive assessment of all you've learned about Bitcoin and monetary systems.",
    moduleNumber: 7,
    imageUrl: "",
    isLocked: false
  }
];

export function CourseJourney() {
  const [, setLocation] = useLocation();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [activeRealmIndex, setActiveRealmIndex] = useState(0);
  const [loadingRealms, setLoadingRealms] = useState(true);
  
  // Use local realm data instead of fetching from API
  useEffect(() => {
    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setRealms(LOCAL_REALMS);
      setLoadingRealms(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle navigation to a realm
  const navigateToRealm = (realmId: number, isLocked: boolean) => {
    if (isLocked) {
      // Show locked message or modal
      return;
    }
    setLocation(`/realm/${realmId}`);
  };
  
  // Auto-scroll to the next realm every 8 seconds
  useEffect(() => {
    if (realms.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveRealmIndex((prev) => (prev + 1) % realms.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [realms.length]);
  
  // Scroll to the active realm section
  useEffect(() => {
    if (realms.length === 0) return;
    
    const realmElement = document.getElementById(`realm-${realms[activeRealmIndex]?.id}`);
    if (realmElement) {
      realmElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeRealmIndex, realms]);
  
  // Handle manual navigation
  const handleRealmSelect = (index: number) => {
    setActiveRealmIndex(index);
  };
  
  if (loadingRealms) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-amber-600 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-amber-600 rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Navigation indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {realms.map((realm, index) => (
          <button
            key={realm.id}
            onClick={() => handleRealmSelect(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeRealmIndex
                ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-500/50'
                : 'bg-gray-400 hover:bg-amber-400'
            }`}
            aria-label={`Navigate to ${getRealmName(realm.moduleNumber)}`}
          />
        ))}
      </div>
      
      {/* Parallax sections for each realm */}
      {realms.map((realm, index) => {
        const parallaxImages = REALM_PARALLAX_IMAGES[realm.moduleNumber as keyof typeof REALM_PARALLAX_IMAGES] || {};
        const placeholderColor = PLACEHOLDER_COLORS[(realm.moduleNumber - 1) % PLACEHOLDER_COLORS.length];
        
        return (
          <section
            key={realm.id}
            id={`realm-${realm.id}`}
            className={`min-h-screen flex items-center justify-center relative ${
              !parallaxImages.main ? placeholderColor : ''
            }`}
          >
            {/* Background parallax layer (slowest) */}
            {parallaxImages.background && (
              <ParallaxSection 
                backgroundImage={parallaxImages.background}
                speed={0.2}
                className="absolute inset-0 w-full h-full"
                opacity={0.8}
                zIndex={1}
              >
                <div className="h-full w-full"></div>
              </ParallaxSection>
            )}
            
            {/* Main content layer (middle speed) */}
            <ParallaxSection 
              speed={0.4}
              className="w-full min-h-screen flex items-center justify-center"
              backgroundImage={parallaxImages.main}
              opacity={parallaxImages.main ? 0.9 : 0}
              zIndex={2}
            >
              <div className="container mx-auto px-4 py-20 relative z-30">
                <div 
                  className={`max-w-xl mx-auto p-8 rounded-xl bg-opacity-80 backdrop-blur-sm transform transition-all duration-700 ${
                    index === activeRealmIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
                  }`}
                  style={{ 
                    backgroundColor: `${originTheme.colors.backgroundLight}CC`,
                    borderLeft: `4px solid ${originTheme.colors.primaryAccent}`
                  }}
                >
                  <div className="mb-2 text-sm font-medium uppercase tracking-wider" style={{ color: originTheme.colors.primaryAccent }}>
                    Realm {realm.moduleNumber}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-lora" style={{ color: originTheme.colors.darkText }}>
                    {getRealmName(realm.moduleNumber)}
                  </h2>
                  
                  <p className="text-lg mb-6" style={{ color: `${originTheme.colors.darkText}DD` }}>
                    {realm.description}
                  </p>
                  
                  <button
                    onClick={() => navigateToRealm(realm.id, realm.isLocked)}
                    className={`btn-origins ${realm.isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={realm.isLocked}
                  >
                    {realm.isLocked ? 'Locked' : 'Begin This Chapter'}
                  </button>
                </div>
              </div>
            </ParallaxSection>
            
            {/* Foreground parallax layer (fastest) */}
            {parallaxImages.foreground && (
              <ParallaxSection 
                backgroundImage={parallaxImages.foreground}
                speed={0.6}
                className="absolute inset-0 w-full h-full pointer-events-none"
                backgroundPosition="center bottom"
                opacity={0.9}
                zIndex={10}
              >
                <div className="h-full w-full"></div>
              </ParallaxSection>
            )}
          </section>
        );
      })}
    </div>
  );
}