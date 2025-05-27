import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

/**
 * Custom hook that observes when an element enters or leaves the viewport
 * 
 * @param options - IntersectionObserver options and behavior settings
 * @returns [ref, isIntersecting] - Reference to attach to element and boolean indicating if in view
 */
export function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false,
}: IntersectionObserverOptions = {}): [RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (triggerOnce && hasTriggered.current) {
        return;
      }
      
      setIsIntersecting(entry.isIntersecting);
      
      if (triggerOnce && entry.isIntersecting) {
        hasTriggered.current = true;
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [ref, isIntersecting];
}