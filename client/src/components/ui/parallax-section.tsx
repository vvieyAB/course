import { useEffect, useRef, ReactNode } from 'react';
import { LazyImage } from '@/components/ui/lazy-image';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  opacity?: number;
  zIndex?: number;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className = '',
  backgroundImage,
  backgroundPosition = 'center center',
  opacity = 1,
  zIndex = 0
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    
    if (!section || !background) return;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const sectionOffset = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Only apply parallax effect when the section is in view (or near view)
      if (scrollTop + window.innerHeight < sectionOffset - 300 || 
          scrollTop > sectionOffset + sectionHeight + 300) {
        return;
      }
      
      // Calculate parallax offset
      const yOffset = (scrollTop - sectionOffset) * speed;
      
      // Apply transform to create parallax effect
      background.style.transform = `translateY(${yOffset}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial position
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={sectionRef}
    >
      {/* Background layer with parallax effect */}
      {backgroundImage && (
        <div 
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            opacity,
            zIndex
          }}
        >
          <LazyImage 
            src={backgroundImage}
            alt="Parallax background"
            className="w-full h-full object-cover"
            style={{ objectPosition: backgroundPosition }}
          />
        </div>
      )}
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}