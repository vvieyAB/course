import React from 'react';

interface GlowingChainProps {
  progress: number; // 0-100
  className?: string;
  nodes?: Array<{
    id: number;
    label: string;
    realmId: number;
    status: 'completed' | 'active' | 'locked';
  }>;
  onNodeClick?: (nodeId: number) => void;
}

export function GlowingChain({ 
  progress = 0,
  className = '',
  nodes = [],
  onNodeClick 
}: GlowingChainProps) {
  
  // Create a zigzag path for the chain
  const createPath = () => {
    const numPoints = nodes.length;
    if (numPoints < 2) return '';
    
    // For each node, create a curved path segment
    let pathData = `M 50 ${100/(numPoints-1) * 0}`;
    
    for (let i = 1; i < numPoints; i++) {
      const y = 100/(numPoints-1) * i;
      // Alternate left and right to create zigzag
      const x = i % 2 === 0 ? 50 : (i % 4 === 1 ? 85 : 15);
      const prevX = (i-1) % 2 === 0 ? 50 : ((i-1) % 4 === 1 ? 85 : 15);
      const controlX1 = prevX + (x - prevX)/3;
      const controlX2 = prevX + 2*(x - prevX)/3;
      const prevY = 100/(numPoints-1) * (i-1);
      pathData += ` C ${controlX1} ${prevY + (y-prevY)/3}, ${controlX2} ${prevY + 2*(y-prevY)/3}, ${x} ${y}`;
    }
    
    return pathData;
  };
  
  const pathData = createPath();

  return (
    <div className={`relative w-full ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="w-full h-[400px]"
      >
        {/* Chain background (always visible) */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(120, 120, 120, 0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0"
        />
        
        {/* Glowing progress */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(245, 158, 11, 0.8)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 - (progress / 100) * 1000}
          className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
        />
        
        {/* Nodes */}
        {nodes.map((node, index) => {
          // Calculate position along the path
          const numPoints = nodes.length;
          const y = 100/(numPoints-1) * index;
          const x = index % 2 === 0 ? 50 : (index % 4 === 1 ? 85 : 15);
          
          // Get color based on status
          const fillColor = 
            node.status === 'completed' ? '#fcd34d' : 
            node.status === 'active' ? '#f59e0b' :
            '#374151';
          
          // Get glow based on status
          const glowFilter = 
            node.status === 'completed' ? 'drop-shadow(0 0 6px rgba(252, 211, 77, 0.8))' : 
            node.status === 'active' ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))' :
            'none';
          
          // Pulsing animation for active node
          const pulseClass = node.status === 'active' ? 'animate-pulse' : '';
          
          return (
            <g 
              key={node.id} 
              transform={`translate(${x}, ${y})`} 
              onClick={() => onNodeClick && onNodeClick(node.id)}
              style={{ cursor: 'pointer' }}
              className={pulseClass}
            >
              {/* Larger hit area (invisible) */}
              <circle cx="0" cy="0" r="5" fill="transparent" />
              
              {/* Visible node */}
              <circle 
                cx="0" 
                cy="0" 
                r="3" 
                fill={fillColor} 
                style={{ filter: glowFilter }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Node labels */}
      <div className="absolute inset-0">
        {nodes.map((node, index) => {
          // Calculate position
          const numPoints = nodes.length;
          const top = `${(100/(numPoints-1) * index)}%`;
          const left = `${index % 2 === 0 ? 50 : (index % 4 === 1 ? 85 : 15)}%`;
          
          // Adjust label position based on node position
          const labelPosition = index % 4 === 1 ? 'left' : (index % 4 === 3 ? 'right' : 'center');
          
          // Get styles based on status
          const textColor = 
            node.status === 'completed' ? 'text-amber-300' : 
            node.status === 'active' ? 'text-amber-400' :
            'text-gray-500';
          
          return (
            <div 
              key={node.id}
              className="absolute transform -translate-y-1/2"
              style={{ 
                top, 
                left, 
                textAlign: labelPosition === 'center' ? 'center' : 'left',
                transform: `translate(${labelPosition === 'center' ? '-50%' : labelPosition === 'right' ? '15px' : '-110%'}, -50%)`
              }}
            >
              <div 
                className={`text-sm font-medium ${textColor} cursor-pointer`}
                onClick={() => onNodeClick && onNodeClick(node.id)}
              >
                {node.label}
                
                {/* Status indicator */}
                <span className="block text-xs mt-1 opacity-80">
                  {node.status === 'completed' && 'Completed'}
                  {node.status === 'active' && 'In progress'}
                  {node.status === 'locked' && 'Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}