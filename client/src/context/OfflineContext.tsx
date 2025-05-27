import React, { createContext, useContext, ReactNode } from 'react';

interface OfflineContextType {
  isOffline: boolean;
  hasCachedContent: boolean;
  hasUnsyncedChanges: boolean;
  downloadContent: (realmId: number) => Promise<void>;
  clearDownloadedContent: () => Promise<void>;
  syncChanges: () => Promise<boolean>;
  offlineStats: {
    totalCachedItems: number;
    lastCachedDate: Date | null;
    pendingUpdates: number;
  };
}

const OfflineContext = createContext<OfflineContextType | null>(null);

interface OfflineProviderProps {
  children: ReactNode;
}

// Simple mock implementation that doesn't depend on any backend or hooks
export function OfflineProvider({ children }: OfflineProviderProps) {
  // Mock functions that do nothing but return successful promises
  const downloadContent = async (_realmId: number): Promise<void> => {
    console.log('Mock download content called');
    return Promise.resolve();
  };

  const clearDownloadedContent = async (): Promise<void> => {
    console.log('Mock clear downloaded content called');
    return Promise.resolve();
  };

  const syncChanges = async (): Promise<boolean> => {
    console.log('Mock sync changes called');
    return Promise.resolve(true);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOffline: false,
        hasCachedContent: true,
        hasUnsyncedChanges: false,
        downloadContent,
        clearDownloadedContent,
        syncChanges,
        offlineStats: {
          totalCachedItems: 7, // One per realm
          lastCachedDate: new Date(),
          pendingUpdates: 0
        }
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}