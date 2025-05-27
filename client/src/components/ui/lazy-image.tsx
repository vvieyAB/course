import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholderColor?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  loadingOffset?: string; // rootMargin for IntersectionObserver
}

export function LazyImage({
  src,
  alt,
  fallbackSrc = '/placeholder-image.svg',
  placeholderColor = '#f3f4f6', // default gray-100
  className,
  onLoad,
  onError,
  loadingOffset = '200px',
  ...props
}: LazyImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Use intersection observer to detect when image is near viewport
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: loadingOffset,
    triggerOnce: true,
  });
  
  // Start loading the image when it's near the viewport
  useEffect(() => {
    if (isIntersecting) {
      setShouldLoad(true);
    }
  }, [isIntersecting]);
  
  // Load the image when shouldLoad becomes true
  useEffect(() => {
    if (!shouldLoad) return;
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setLoading(false);
      setImageSrc(src);
      onLoad?.();
    };
    
    img.onerror = () => {
      setLoading(false);
      setError(true);
      onError?.();
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, shouldLoad, onLoad, onError]);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        loading && "animate-pulse",
        className
      )}
      style={{ 
        backgroundColor: loading ? placeholderColor : 'transparent',
      }}
    >
      {imageSrc && !error ? (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover",
            loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
          )}
          {...props}
        />
      ) : error ? (
        <img
          src={fallbackSrc}
          alt={`Fallback for ${alt}`}
          className="w-full h-full object-cover"
          {...props}
        />
      ) : shouldLoad && loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <svg className="w-8 h-8 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : null}
    </div>
  );
}