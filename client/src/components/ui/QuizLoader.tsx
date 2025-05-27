
import React from 'react';
import { Loader2 } from 'lucide-react';

interface QuizLoaderProps {
  path?: string;
}

const QuizLoader: React.FC<QuizLoaderProps> = ({ path }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-3">Loading quiz...</span>
    </div>
  );
};

export default QuizLoader;
