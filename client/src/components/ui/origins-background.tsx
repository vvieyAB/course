import { ReactNode } from 'react';
import { originTheme } from '@/lib/realm-themes';

interface OriginsBackgroundProps {
  children: ReactNode;
  patternType?: 'woven' | 'adinkra' | 'cowrie' | 'none';
  opacity?: number;
  withGradient?: boolean;
  roundedCorners?: boolean;
  className?: string;
}

export function OriginsBackground({
  children,
  patternType = 'woven',
  opacity = 0.2,
  withGradient = true,
  roundedCorners = true,
  className = '',
}: OriginsBackgroundProps) {
  const theme = originTheme;
  
  // Get the appropriate pattern class based on the type
  const getPatternClass = () => {
    switch (patternType) {
      case 'woven': return 'bg-origins';
      case 'adinkra': return 'origins-pattern';
      case 'cowrie': return 'cowrie-pattern';
      case 'none': return '';
      default: return 'bg-origins';
    }
  };
  
  // Gradient styling
  const gradientStyle = withGradient ? {
    background: `linear-gradient(to bottom, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
  } : {};
  
  // Pattern styling based on type
  const getPatternStyle = () => {
    switch (patternType) {
      case 'adinkra':
        return {
          backgroundImage: `
            radial-gradient(circle at 10px 10px, ${theme.colors.primary} 5px, transparent 5px),
            radial-gradient(circle at 30px 30px, ${theme.colors.primary} 5px, transparent 5px),
            radial-gradient(circle at 30px 10px, ${theme.colors.primary} 3px, transparent 3px),
            radial-gradient(circle at 10px 30px, ${theme.colors.primary} 3px, transparent 3px)
          `,
          backgroundSize: '40px 40px',
          opacity
        };
      case 'woven':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(238, 114, 11, 0.1),
              rgba(238, 114, 11, 0.1) 10px,
              rgba(238, 114, 11, 0.2) 10px,
              rgba(238, 114, 11, 0.2) 20px
            )
          `,
          opacity
        };
      case 'cowrie':
        return {
          backgroundImage: `
            radial-gradient(ellipse at 30% 40%, ${theme.colors.secondary}33 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, ${theme.colors.secondary}33 0%, transparent 50%)
          `,
          backgroundSize: '30px 20px',
          opacity
        };
      default:
        return { opacity };
    }
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${roundedCorners ? 'rounded-xl' : ''} ${className}`}
      style={gradientStyle}
    >
      {/* Background pattern */}
      {patternType !== 'none' && (
        <div 
          className={`absolute inset-0 ${getPatternClass()}`} 
          style={getPatternStyle()}
        />
      )}
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}