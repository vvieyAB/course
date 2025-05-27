import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Facebook, Twitter, Linkedin, Link2, Check, Share2, X } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ShareButtonProps {
  title?: string;
  description?: string;
  hashtags?: string[];
  url?: string;
  className?: string;
  showFullPanel?: boolean;
  position?: 'left' | 'right' | 'center';
}

export function ShareButton({
  title = "Check out Asha's Journey Through the Realms of Money!",
  description = "I'm learning about Bitcoin and cryptocurrencies through this interactive educational platform.",
  hashtags = ['Bitcoin', 'Crypto', 'Education'],
  url = window.location.href,
  className = '',
  showFullPanel = false,
  position = 'center'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(showFullPanel);
  const [copied, setCopied] = useState(false);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const closePanel = () => {
    setIsOpen(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Generate share URLs with custom messages for each platform
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`;
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(description)}`;
  
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
  
  // Conditional positioning classes
  let positionClasses = 'top-0 left-1/2 -translate-x-1/2'; // center (default)
  if (position === 'left') {
    positionClasses = 'top-0 left-0';
  } else if (position === 'right') {
    positionClasses = 'top-0 right-0';
  }
  
  return (
    <div className={`relative ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePanel}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/80 text-primary-foreground hover:bg-primary"
            >
              <Share2 size={18} />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute ${positionClasses} mt-12 bg-card rounded-lg shadow-lg z-50 p-4 w-64`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Share</h3>
              <button onClick={closePanel} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-2">
              {/* Share options */}
              <a 
                href={twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Twitter size={18} className="mr-3 text-blue-400" />
                <span>Share on Twitter</span>
              </a>
              
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Facebook size={18} className="mr-3 text-blue-600" />
                <span>Share on Facebook</span>
              </a>
              
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Linkedin size={18} className="mr-3 text-blue-700" />
                <span>Share on LinkedIn</span>
              </a>
              
              <button 
                onClick={copyToClipboard}
                className="w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={18} className="mr-3 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 size={18} className="mr-3 text-gray-500" />
                    <span>Copy link</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-3 pt-2 border-t border-muted">
              <p className="text-xs text-muted-foreground">
                Share this content with friends and colleagues interested in learning about Bitcoin!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}