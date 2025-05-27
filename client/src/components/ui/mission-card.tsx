import { useState } from 'react';
import { useLocation } from 'wouter';
import { originTheme } from '@/lib/realm-themes';

export interface MissionCardProps {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  duration?: number;
  points?: number;
  isCompleted?: boolean;
  isRecommended?: boolean;
  isLocked?: boolean;
  realmId?: number;
  onClick?: () => void;
}

export function MissionCard({
  id,
  title,
  description,
  imageUrl,
  duration = 15,
  points = 10,
  isCompleted = false,
  isRecommended = false,
  isLocked = false,
  realmId,
  onClick
}: MissionCardProps) {
  const [, setLocation] = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  
  // Use Origins theme for now
  const theme = originTheme;
  
  const handleClick = () => {
    if (!isLocked) {
      if (onClick) {
        onClick();
      } else if (id && realmId) {
        setLocation(`/realms/${realmId}/missions/${id}`);
      }
    }
  };
  
  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isLocked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'
      } ${isCompleted ? 'origins-complete-animation' : ''}`}
      style={{ 
        backgroundColor: isHovered && !isLocked ? `${theme.colors.primary}33` : theme.colors.backgroundLight,
        borderColor: theme.colors.primaryAccent || theme.colors.primary,
        borderWidth: isRecommended ? '2px' : '1px',
        transform: isHovered && !isLocked ? 'translateY(-5px)' : 'none'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mission Image */}
      <div className="relative h-40 bg-amber-100 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="origins-pattern opacity-20 absolute inset-0"></div>
            <span className="text-amber-800">No image available</span>
          </div>
        )}
        
        {/* Status indicators */}
        {isRecommended && !isCompleted && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            Recommended
          </div>
        )}
        
        {isCompleted && (
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-amber-600 text-white rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {isLocked && (
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-gray-600 text-white rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Mission Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 font-lora" style={{ color: theme.colors.darkText || theme.colors.textDark }}>
          {title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: theme.colors.darkText ? `${theme.colors.darkText}CC` : theme.colors.textDark }}>
          {description}
        </p>
        
        {/* Mission Details */}
        <div className="flex justify-between items-center text-xs" style={{ color: theme.colors.darkText || theme.colors.textDark }}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{duration} min</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span>{points} points</span>
          </div>
        </div>
      </div>
    </div>
  );
}