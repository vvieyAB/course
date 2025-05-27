import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Home, Map, Award, BookOpen, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getRealmTheme } from '@/lib/realm-themes';

interface BottomNavigationProps {
  className?: string;
}

export function BottomNavigation({ className = '' }: BottomNavigationProps) {
  const [location, setLocation] = useLocation();
  const { currentRealm } = useAuth();
  
  // Parse current location to determine active item
  const isActive = (path: string) => {
    if (path === '/home' && location === '/home') return true;
    if (path === '/map' && location === '/map') return true;
    if (path === '/badges' && location === '/badges') return true;
    if (path === '/current-realm' && location.startsWith('/realm/')) return true;
    if (path === '/profile' && location === '/profile') return true;
    
    return false;
  };
  
  // Get the current realm's theme for styling
  const realmTheme = getRealmTheme(currentRealm || 1);
  
  const handleNavigation = (path: string) => {
    if (path === '/current-realm') {
      setLocation(`/realm/${currentRealm || 1}`);
    } else {
      setLocation(path);
    }
  };
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur-md border-t border-amber-800/30 z-50 md:hidden ${className}`}>
      <div className="flex justify-around items-center h-16 px-2">
        {/* Home button */}
        <NavButton 
          icon={<Home size={20} />} 
          label="Home"
          isActive={isActive('/home')}
          onClick={() => handleNavigation('/home')}
          activeColor={realmTheme.colors.primary}
        />
        
        {/* Map button */}
        <NavButton 
          icon={<Map size={20} />} 
          label="Map"
          isActive={isActive('/map')}
          onClick={() => handleNavigation('/map')}
          activeColor={realmTheme.colors.primary}
        />
        
        {/* Current Realm button */}
        <NavButton 
          icon={<BookOpen size={20} />} 
          label="Realm"
          isActive={isActive('/current-realm')}
          onClick={() => handleNavigation('/current-realm')}
          activeColor={realmTheme.colors.primary}
        />
        
        {/* Badges button */}
        <NavButton 
          icon={<Award size={20} />} 
          label="Badges"
          isActive={isActive('/badges')}
          onClick={() => handleNavigation('/badges')}
          activeColor={realmTheme.colors.primary}
        />
        
        {/* Profile button */}
        <NavButton 
          icon={<User size={20} />} 
          label="Profile"
          isActive={isActive('/profile')}
          onClick={() => handleNavigation('/profile')}
          activeColor={realmTheme.colors.primary}
        />
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColor: string;
}

function NavButton({ icon, label, isActive, onClick, activeColor }: NavButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center justify-center w-16 relative"
      onClick={onClick}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'text-amber-100' : 'text-gray-400'
        }`}
        style={{
          backgroundColor: isActive ? `${activeColor}80` : 'transparent',
          boxShadow: isActive ? `0 0 10px ${activeColor}40` : 'none'
        }}
      >
        {icon}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-amber-200' : 'text-gray-500'}`}>
        {label}
      </span>
      
      {/* Active indicator */}
      {isActive && (
        <div 
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: activeColor }}
        />
      )}
    </motion.button>
  );
}