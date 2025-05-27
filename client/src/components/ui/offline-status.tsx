import { useOffline } from '@/context/OfflineContext';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Clock, RefreshCw } from 'lucide-react';

export function OfflineStatus() {
  const { 
    isOffline, 
    hasCachedContent, 
    hasUnsyncedChanges, 
    syncChanges,
    offlineStats 
  } = useOffline();

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="rounded-lg p-4 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isOffline ? (
              <WifiOff className="h-5 w-5 text-red-500 mr-2" />
            ) : (
              <Wifi className="h-5 w-5 text-green-500 mr-2" />
            )}
            <span className="font-medium">
              {isOffline ? 'Offline Mode' : 'Online Mode'}
            </span>
          </div>
          
          {hasUnsyncedChanges && !isOffline && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => syncChanges()}
              className="text-amber-200 border-amber-700 bg-amber-900/30 hover:bg-amber-900/50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Changes
            </Button>
          )}
        </div>
        
        {hasCachedContent && (
          <div className="text-sm space-y-1 pl-7">
            <div className="flex items-center text-amber-300">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last downloaded: {formatDate(offlineStats.lastCachedDate)}</span>
            </div>
            <div className="text-amber-200">
              <span>{offlineStats.totalCachedItems} items available offline</span>
            </div>
            {hasUnsyncedChanges && (
              <div className="text-amber-200">
                <span>{offlineStats.pendingUpdates} pending updates to sync</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}