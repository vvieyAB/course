import { useState } from 'react';
import { useOffline } from '@/context/OfflineContext';
import { Button } from '@/components/ui/button';
import { Download, Check, WifiOff } from 'lucide-react';

interface OfflineDownloadButtonProps {
  realmId: number;
  className?: string;
}

export function OfflineDownloadButton({ realmId, className = '' }: OfflineDownloadButtonProps) {
  const { isOffline, hasCachedContent, downloadContent } = useOffline();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadContent(realmId);
    } finally {
      setIsDownloading(false);
    }
  };

  // If we're offline, show a different button state
  if (isOffline) {
    return (
      <Button 
        variant="outline" 
        className={`bg-amber-900/40 text-amber-200 border-amber-700/50 hover:bg-amber-900/60 ${className}`}
        disabled={true}
      >
        <WifiOff className="mr-2 h-4 w-4" />
        {hasCachedContent ? "Content Available Offline" : "Connect to Download"}
      </Button>
    );
  }

  // Content is already downloaded
  if (hasCachedContent) {
    return (
      <Button 
        variant="outline" 
        className={`bg-amber-900/40 text-amber-200 border-amber-700/50 hover:bg-amber-900/60 ${className}`}
        disabled={true}
      >
        <Check className="mr-2 h-4 w-4" />
        Available Offline
      </Button>
    );
  }

  // Online and content not downloaded yet
  return (
    <Button 
      variant="outline" 
      className={`bg-amber-900/40 text-amber-200 border-amber-700/50 hover:bg-amber-900/60 hover:text-amber-100 ${className}`}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-amber-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Downloading...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download for Offline
        </>
      )}
    </Button>
  );
}