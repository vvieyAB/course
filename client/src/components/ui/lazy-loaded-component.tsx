import { ReactNode, useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LazyLoadedComponentProps {
  children: ReactNode;
  className?: string;
  loadingOffset?: string;
  showSpinner?: boolean;
  spinnerSize?: 'sm' | 'md' | 'lg';
  fallback?: ReactNode;
  minHeight?: string;
}

export function LazyLoadedComponent({
  children,
  className,
  loadingOffset = '300px',
  showSpinner = true,
  spinnerSize = 'md',
  fallback,
  minHeight = '100px',
}: LazyLoadedComponentProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: loadingOffset,
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting) {
      setShouldRender(true);
    }
  }, [isIntersecting]);

  const spinnerSizeClass = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }[spinnerSize];

  return (
    <div 
      ref={ref}
      className={cn("relative", className)}
      style={{ minHeight: !shouldRender ? minHeight : undefined }}
    >
      {shouldRender ? (
        children
      ) : fallback ? (
        fallback
      ) : showSpinner ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className={cn("animate-spin text-primary", spinnerSizeClass)} />
        </div>
      ) : null}
    </div>
  );
}