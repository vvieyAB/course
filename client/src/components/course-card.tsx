import React from 'react';
import { useLocation } from 'wouter';
import { LazyImage } from '@/components/ui/lazy-image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
// Realm utils imported directly where needed

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  isLocked?: boolean;
  progress?: number;
}

export function CourseCard({ 
  id, 
  title, 
  description, 
  image, 
  isLocked = false,
  progress = 0 
}: CourseCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/realm/${id}`);
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isLocked ? 'opacity-70 grayscale' : 'hover:scale-[1.02]'
      }`}
    >
      <div className="relative h-40 w-full">
        <LazyImage
          src={image}
          alt={title}
          className="h-40 w-full"
        />
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="rounded-full bg-background/90 p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
          </div>
        )}
        {!isLocked && progress > 0 && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleClick} 
          disabled={isLocked}
          variant={isLocked ? "outline" : "default"}
          className="w-full"
        >
          {isLocked ? 'Locked' : 'Enter Realm'}
          {!isLocked && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}