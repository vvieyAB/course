import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  imageUrl?: string;
  hashtags?: string[];
  className?: string;
  variant?: 'icon-only' | 'text-only' | 'icon-and-text';
  size?: 'sm' | 'md' | 'lg';
  platforms?: ('twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram' | 'copy')[];
}

type SizeMap = {
  sm: string;
  md: string;
  lg: string;
};

export function ShareButton({
  title,
  text,
  url = window.location.href,
  imageUrl,
  hashtags = ['BitcoinQuest', 'LearnBitcoin'],
  className = '',
  variant = 'icon-and-text',
  size = 'md',
  platforms = ['twitter', 'facebook', 'whatsapp', 'telegram', 'copy']
}: ShareButtonProps) {
  const [showPlatforms, setShowPlatforms] = useState(false);
  const { toast } = useToast();
  
  const togglePlatforms = () => {
    setShowPlatforms(!showPlatforms);
  };
  
  const handleShare = async (platform: string) => {
    const hashtagsStr = hashtags.map(tag => `#${tag}`).join(' ');
    const shareText = `${text} ${hashtagsStr}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
          toast({
            title: "Link copied!",
            description: "The share link has been copied to your clipboard"
          });
          setShowPlatforms(false);
          return;
        } catch (err) {
          console.error('Failed to copy:', err);
          toast({
            title: "Copy failed",
            description: "Please copy the link manually",
            variant: "destructive"
          });
        }
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setShowPlatforms(false);
    }
  };
  
  // Define size mappings with proper typing
  const sizeClasses: SizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  const iconSizeClasses: SizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  // Safely access size classes with proper type checking
  const currentSizeClass = sizeClasses[size];
  const currentIconSizeClass = iconSizeClasses[size];
  
  const baseButtonClass = `
    inline-flex items-center justify-center rounded-md
    bg-primary/90 hover:bg-primary text-white
    transition-colors focus:outline-none focus:ring-2
    focus:ring-primary focus:ring-offset-2 focus:ring-offset-darkBg
    ${currentSizeClass} font-medium
  `;
  
  const mainButtonClass = `
    ${baseButtonClass}
    ${size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-3 py-2' : 'px-4 py-2.5'}
    ${className}
  `;
  
  const platformButtonClass = `
    ${baseButtonClass}
    p-2 rounded-full
  `;
  
  return (
    <div className="relative inline-block">
      <button 
        onClick={togglePlatforms}
        className={mainButtonClass}
        title="Share this content"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`${currentIconSizeClass} ${variant !== 'text-only' ? 'inline-block' : 'hidden'} ${variant === 'icon-and-text' ? 'mr-2' : ''}`}
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        {variant !== 'icon-only' && <span>Share</span>}
      </button>
      
      {showPlatforms && (
        <div className="absolute z-50 mt-2 p-2 bg-darkBg/95 border border-secondary/20 rounded-lg shadow-lg">
          <div className="flex flex-wrap gap-2">
            {platforms.includes('twitter') && (
              <button
                onClick={() => handleShare('twitter')}
                className={platformButtonClass}
                title="Share on Twitter"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={currentIconSizeClass}
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
            )}
            
            {platforms.includes('facebook') && (
              <button
                onClick={() => handleShare('facebook')}
                className={platformButtonClass}
                title="Share on Facebook"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={currentIconSizeClass}
                >
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </button>
            )}
            
            {platforms.includes('linkedin') && (
              <button
                onClick={() => handleShare('linkedin')}
                className={platformButtonClass}
                title="Share on LinkedIn"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={currentIconSizeClass}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            )}
            
            {platforms.includes('whatsapp') && (
              <button
                onClick={() => handleShare('whatsapp')}
                className={platformButtonClass}
                title="Share on WhatsApp"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={currentIconSizeClass}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            )}
            
            {platforms.includes('telegram') && (
              <button
                onClick={() => handleShare('telegram')}
                className={platformButtonClass}
                title="Share on Telegram"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={currentIconSizeClass}
                >
                  <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
                </svg>
              </button>
            )}
            
            {platforms.includes('copy') && (
              <button
                onClick={() => handleShare('copy')}
                className={platformButtonClass}
                title="Copy link"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={currentIconSizeClass}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}