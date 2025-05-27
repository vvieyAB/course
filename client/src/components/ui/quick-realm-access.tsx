import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { RealmData } from '@/lib/realm-data';
import { ChevronRight, ChevronLeft, Compass } from 'lucide-react';
import { getRealmTheme } from '@/lib/realm-themes';

interface QuickRealmAccessProps {
  currentRealmId?: number;
  position?: 'left' | 'right';
  className?: string;
}

export function QuickRealmAccess({
  currentRealmId = 1,
  position = 'right',
  className = ''
}: QuickRealmAccessProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  
  // Get current realm theme for styling
  const realmTheme = getRealmTheme(currentRealmId);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const handleRealmSelect = (realmId: number) => {
    setLocation(`/realm/${realmId}`);
    setIsOpen(false);
  };
  
  // Limit realms shown in the quick access to 4
  const visibleRealms = RealmData.slice(0, 7);
  
  return (
    <div 
      className={`fixed ${position === 'left' ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2 z-40 ${className}`}
      style={{ color: realmTheme.colors.textLight }}
    >
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ 
          backgroundColor: realmTheme.colors.primary,
          color: realmTheme.colors.textLight,
          boxShadow: `0 0 15px ${realmTheme.colors.primary}80`
        }}
      >
        {isOpen ? (
          position === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />
        ) : (
          <Compass size={20} />
        )}
      </motion.button>
      
      {/* Realm quick access panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              x: position === 'left' ? -100 : 100
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { type: 'spring', stiffness: 300, damping: 30 }
            }}
            exit={{ 
              opacity: 0, 
              x: position === 'left' ? -100 : 100,
              transition: { duration: 0.2 }
            }}
            className={`absolute ${position === 'left' ? 'left-16' : 'right-16'} top-0 rounded-xl p-4 shadow-xl`}
            style={{ 
              backgroundColor: `${realmTheme.colors.background}F0`,
              backdropFilter: 'blur(8px)',
              borderColor: `${realmTheme.colors.primary}40`,
              borderWidth: '1px',
              width: '280px'
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: realmTheme.colors.secondary }}>
              Quick Realm Access
            </h3>
            
            <div className="space-y-2">
              {visibleRealms.map(realm => {
                const isCurrentRealm = realm.id === currentRealmId;
                
                return (
                  <motion.button
                    key={realm.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRealmSelect(realm.id)}
                    className={`w-full text-left rounded-lg p-3 flex items-center ${
                      isCurrentRealm ? 'cursor-default' : 'hover:bg-white/10 cursor-pointer'
                    }`}
                    style={{ 
                      backgroundColor: isCurrentRealm ? `${realmTheme.colors.primary}50` : 'transparent',
                      borderLeft: isCurrentRealm ? `3px solid ${realmTheme.colors.primary}` : '3px solid transparent'
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={{ 
                        backgroundColor: isCurrentRealm ? realmTheme.colors.primary : `${realmTheme.colors.secondary}30` 
                      }}
                    >
                      <span className="font-semibold text-sm">{realm.id}</span>
                    </div>
                    <div>
                      <div className="font-medium">{realm.name}</div>
                      <div className="text-xs opacity-70">{realm.focus}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            <div className="mt-4 text-xs text-center opacity-60 pt-2 border-t" style={{ borderColor: `${realmTheme.colors.primary}30` }}>
              Click on a realm to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}