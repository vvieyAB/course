import { useMemo } from 'react';

interface ChainProps {
  progress: number; // 0-100
  nodes: Array<{
    id: number;
    name: string;
    status: 'completed' | 'active' | 'locked';
  }>;
  className?: string;
}

export function ProgressChain({ progress, nodes, className = '' }: ChainProps) {
  // Calculate the active part of the path based on progress
  const activePath = useMemo(() => {
    const activeNodeCount = nodes.filter(node => node.status !== 'locked').length;
    if (activeNodeCount <= 1) return '';
    
    // We have at least two points (start and current)
    const totalPoints = nodes.length;
    const segmentPercentage = 100 / (totalPoints - 1);
    const completedSegments = Math.floor(progress / segmentPercentage);
    
    // Generate SVG path for active chain
    if (completedSegments <= 0) return '';
    
    // Start from the first node
    let path = `M50,150 `;
    const spacing = 800 / (totalPoints - 1);
    
    for (let i = 1; i <= completedSegments && i < totalPoints; i++) {
      if (i % 2 === 1) {
        path += `C${50 + (i * spacing) - (spacing / 2)},50 `;
      } else {
        path += `C${50 + (i * spacing) - (spacing / 2)},250 `;
      }
      
      if (i === completedSegments) {
        path += `${50 + (i * spacing)},150`;
      }
    }
    
    return path;
  }, [progress, nodes]);

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 900 300" className="w-full h-auto">
        {/* Chain background (grayscale) */}
        <path 
          d="M50,150 C200,50 300,250 450,150 C600,50 700,250 850,150" 
          fill="none" 
          stroke="#444" 
          strokeWidth="15" 
          strokeLinecap="round"
        />
        
        {/* Glowing chain (active parts) */}
        {activePath && (
          <path 
            d={activePath} 
            fill="none" 
            stroke="#FFC567" 
            strokeWidth="15" 
            strokeLinecap="round" 
            className="chain-link active"
          />
        )}
        
        {/* Chain links (decorative) */}
        {nodes.map((node, index) => {
          const x = 50 + (index * (800 / (nodes.length - 1)));
          return (
            <circle 
              key={`link-${node.id}`}
              cx={x} 
              cy={150} 
              r={12} 
              fill="#1A1814" 
              stroke={node.status !== 'locked' ? "#FFC567" : "#444"} 
              strokeWidth={3} 
              className={node.status !== 'locked' ? "chain-link active" : ""}
            />
          );
        })}
        
        {/* Realm nodes */}
        {nodes.map((node, index) => {
          const x = 50 + (index * (800 / (nodes.length - 1)));
          const y = index % 2 === 0 ? 150 : (index % 4 === 1 ? 100 : 200);
          
          return (
            <g 
              key={`node-${node.id}`}
              className={`realm-node ${node.status !== 'locked' ? 'active' : ''}`} 
              transform={`translate(${x}, ${y})`}
            >
              <circle 
                r={25} 
                fill={node.status !== 'locked' ? "#EE720B" : "#444"} 
                className={node.status !== 'locked' ? "glow" : ""}
              />
              <text 
                x={0} 
                y={5} 
                fontSize={16} 
                fill={node.status !== 'locked' ? "#1A1814" : "#FBF4D2"} 
                textAnchor="middle" 
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Realm labels */}
      {nodes.map((node, index) => {
        const x = `${5 + (index * (90 / (nodes.length - 1)))}%`;
        const y = index % 2 === 0 ? "mt-20" : "mt-40";
        
        return (
          <div 
            key={`label-${node.id}`}
            className={`absolute top-0 left-[${x}] -translate-x-1/2 ${y} text-center`}
          >
            <h3 className={`font-cinzel ${node.status !== 'locked' ? 'text-secondary' : 'text-lightText/70'} font-bold`}>
              {node.name}
            </h3>
            <span className={`text-xs ${
              node.status === 'completed' ? 'bg-primary/20 text-primary' : 
              node.status === 'active' ? 'bg-primary/20 text-primary' : 
              'bg-gray-700/50 text-gray-400'
            } px-2 py-1 rounded`}>
              {node.status === 'completed' ? 'Completed' : 
               node.status === 'active' ? 'In Progress' : 
               'Locked'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
