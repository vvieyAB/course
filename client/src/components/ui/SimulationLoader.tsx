
import React from 'react';
import { Loader2 } from 'lucide-react';

interface SimulationLoaderProps {
  type?: string;
  path?: string;
}

const SimulationLoader: React.FC<SimulationLoaderProps> = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-3">Loading simulation...</span>
    </div>
  );
};

export default SimulationLoader;
