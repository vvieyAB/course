import { useState, useEffect, ReactNode } from 'react';

// Define TypeScript interfaces for the timeline event
interface TimelineEvent {
  id: number;
  name: string;
  year: string;
  order: number;
  description: string;
  image: string;
  pattern: string;
}

// Define pattern types for TypeScript
type PatternType = 'spiral' | 'zigzag' | 'circles' | 'leaves' | 'flower' | 'greek';

// African pattern SVG backgrounds - inspired by the shared image
const AfricanPatterns: Record<string, JSX.Element> = {
  spiral: (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-15 pointer-events-none">
      <pattern id="spiralPattern" patternUnits="userSpaceOnUse" width="80" height="80">
        <rect width="80" height="80" fill="#2D3D29" />
        <circle cx="40" cy="40" r="32" fill="#EE720B" />
        <circle cx="40" cy="40" r="24" stroke="#FFC567" strokeWidth="4" fill="none" />
        <circle cx="40" cy="40" r="16" stroke="#EE720B" strokeWidth="3" fill="none" />
        <circle cx="40" cy="40" r="8" fill="#FFC567" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#spiralPattern)" />
    </svg>
  ),
  zigzag: (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-15 pointer-events-none">
      <pattern id="zigzagPattern" patternUnits="userSpaceOnUse" width="60" height="30">
        <rect width="60" height="30" fill="#2D3D29" />
        <path d="M0 15 L15 0 L30 15 L45 0 L60 15 L60 30 L45 15 L30 30 L15 15 L0 30 Z" fill="#EE720B" />
        <path d="M0 5 L15 20 L30 5 L45 20 L60 5" stroke="#FFC567" strokeWidth="2" fill="none" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#zigzagPattern)" />
    </svg>
  ),
  circles: (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-15 pointer-events-none">
      <pattern id="circlesPattern" patternUnits="userSpaceOnUse" width="50" height="50">
        <rect width="50" height="50" fill="#2D3D29" />
        <circle cx="25" cy="25" r="10" stroke="#EE720B" strokeWidth="2" fill="none" />
        <circle cx="0" cy="0" r="10" stroke="#FFC567" strokeWidth="2" fill="none" />
        <circle cx="0" cy="50" r="10" stroke="#EE720B" strokeWidth="2" fill="none" />
        <circle cx="50" cy="0" r="10" stroke="#FFC567" strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="10" stroke="#EE720B" strokeWidth="2" fill="none" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circlesPattern)" />
    </svg>
  ),
  leaves: (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-15 pointer-events-none">
      <pattern id="leavesPattern" patternUnits="userSpaceOnUse" width="60" height="60">
        <rect width="60" height="60" fill="#EE720B" />
        <path d="M30 10 Q40 20 30 30 Q20 20 30 10" fill="#2D8F4E" />
        <path d="M10 30 Q20 40 30 30 Q20 20 10 30" fill="#2D8F4E" />
        <path d="M50 30 Q40 40 30 30 Q40 20 50 30" fill="#2D8F4E" />
        <path d="M30 50 Q40 40 30 30 Q20 40 30 50" fill="#2D8F4E" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#leavesPattern)" />
    </svg>
  ),
  flower: (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-15 pointer-events-none">
      <pattern id="flowerPattern" patternUnits="userSpaceOnUse" width="80" height="80">
        <rect width="80" height="80" fill="#2D3D29" />
        <circle cx="40" cy="40" r="8" fill="#FFC567" />
        <path d="M40 10 Q50 30 40 40 Q30 30 40 10" fill="#EE720B" />
        <path d="M40 70 Q50 50 40 40 Q30 50 40 70" fill="#EE720B" />
        <path d="M10 40 Q30 50 40 40 Q30 30 10 40" fill="#EE720B" />
        <path d="M70 40 Q50 50 40 40 Q50 30 70 40" fill="#EE720B" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#flowerPattern)" />
    </svg>
  )
};

interface AfricanBorderProps {
  children: ReactNode;
  patternType?: PatternType;
}

// Component for decorative border with African pattern
const AfricanBorder = ({ children, patternType = "zigzag" }: AfricanBorderProps) => {
  const patterns: Record<PatternType, JSX.Element> = {
    zigzag: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <path d="M0 4 L4 0 L8 4 L12 0 L16 4 L20 0 L24 4 L28 0 L32 4 L36 0 L40 4 L44 0 L48 4 L52 0 L56 4 L60 0 L64 4 L68 0 L72 4 L76 0 L80 4 L84 0 L88 4 L92 0 L96 4 L100 0 L104 4 L108 0 L112 4 L116 0 L120 4 L124 0 L128 4 L132 0 L136 4 L140 0 L144 4 L148 0 L152 4 L156 0 L160 4 L164 0 L168 4 L172 0 L176 4 L180 0 L184 4 L188 0 L192 4 L196 0 L200 4" 
          stroke="#FFC567" strokeWidth="2" fill="none" />
      </svg>
    ),
    circles: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <circle cx="8" cy="4" r="3" fill="#FFC567" />
        <circle cx="24" cy="4" r="3" fill="#FFC567" />
        <circle cx="40" cy="4" r="3" fill="#FFC567" />
        <circle cx="56" cy="4" r="3" fill="#FFC567" />
        <circle cx="72" cy="4" r="3" fill="#FFC567" />
        <circle cx="88" cy="4" r="3" fill="#FFC567" />
        <circle cx="104" cy="4" r="3" fill="#FFC567" />
        <circle cx="120" cy="4" r="3" fill="#FFC567" />
        <circle cx="136" cy="4" r="3" fill="#FFC567" />
        <circle cx="152" cy="4" r="3" fill="#FFC567" />
        <circle cx="168" cy="4" r="3" fill="#FFC567" />
        <circle cx="184" cy="4" r="3" fill="#FFC567" />
        <circle cx="200" cy="4" r="3" fill="#FFC567" />
      </svg>
    ),
    greek: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <path d="M0 4 H4 V0 H8 V4 H12 V0 H16 V4 H20 V0 H24 V4 H28 V0 H32 V4 H36 V0 H40 V4 H44 V0 H48 V4 H52 V0 H56 V4 H60 V0 H64 V4 H68 V0 H72 V4 H76 V0 H80 V4 H84 V0 H88 V4 H92 V0 H96 V4 H100 V0 H104 V4 H108 V0 H112 V4 H116 V0 H120 V4" 
          stroke="#FFC567" strokeWidth="2" fill="none" />
      </svg>
    ),
    spiral: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <circle cx="100" cy="4" r="3" fill="#FFC567" />
      </svg>
    ),
    leaves: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <circle cx="100" cy="4" r="3" fill="#FFC567" />
      </svg>
    ),
    flower: (
      <svg width="100%" height="8" className="absolute top-0 left-0">
        <rect width="100%" height="8" fill="#EE720B" />
        <circle cx="100" cy="4" r="3" fill="#FFC567" />
      </svg>
    )
  };

  return (
    <div className="relative border-2 border-orange-500 rounded-xl overflow-hidden">
      {patterns[patternType]}
      <div className="pt-8">
        {children}
      </div>
    </div>
  );
};

interface TimelineBuilderProps {
  onComplete?: () => void;
}

const TimelineBuilder = ({ onComplete }: TimelineBuilderProps) => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [availableEvents, setAvailableEvents] = useState<TimelineEvent[]>([]);
  const [draggedEvent, setDraggedEvent] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  
  // Initialize events
  useEffect(() => {
    // Reset game state
    setTimelineEvents([]);
    setDraggedEvent(null);
    setScore(0);
    setMessage("");
    setGameComplete(false);
    
    const events: TimelineEvent[] = [
      { 
        id: 1, 
        name: "Cowrie Shells as Currency", 
        year: "1000 BCE", 
        order: 1, 
        description: "Cowrie shells from the Indian Ocean become widely used as currency across Africa.",
        image: "🐚",
        pattern: "circles"
      },
      { 
        id: 2, 
        name: "Gold Dinar Trade", 
        year: "800 CE", 
        order: 2, 
        description: "Islamic gold dinars circulate in trans-Saharan trade routes, connecting North and West Africa.",
        image: "💰",
        pattern: "spiral"
      },
      { 
        id: 3, 
        name: "Kingdom of Ghana's Gold", 
        year: "900 CE", 
        order: 3, 
        description: "The Kingdom of Ghana controls West African gold trade, using gold dust as a form of currency.",
        image: "✨",
        pattern: "zigzag"
      },
      { 
        id: 4, 
        name: "Mansa Musa's Pilgrimage", 
        year: "1324 CE", 
        order: 4, 
        description: "Mali Emperor Mansa Musa's hajj to Mecca distributes so much gold it causes inflation in Egypt.",
        image: "👑",
        pattern: "leaves"
      },
      { 
        id: 5, 
        name: "Portuguese Trade Beads", 
        year: "1480 CE", 
        order: 5, 
        description: "Portuguese traders introduce glass beads as currency, beginning European influence on African monetary systems.",
        image: "🧿",
        pattern: "circles"
      },
      { 
        id: 6, 
        name: "Colonial Currencies Introduced", 
        year: "1880 CE", 
        order: 6, 
        description: "European colonial powers force their currencies into African economies, disrupting traditional systems.",
        image: "📜",
        pattern: "greek"
      },
      { 
        id: 7, 
        name: "Independence & New Currencies", 
        year: "1960 CE", 
        order: 7, 
        description: "Newly independent African nations establish their own currencies as symbols of sovereignty.",
        image: "🏛️",
        pattern: "flower"
      }
    ];
    
    // Shuffle events for the game
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setAvailableEvents(shuffled);
    setTimelineEvents([]);
  }, []);
  
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number): void => {
    setDraggedEvent(id);
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    
    if (draggedEvent !== null) {
      // Find the dragged event
      const eventToMove = availableEvents.find(e => e.id === draggedEvent);
      
      if (eventToMove) {
        // Add to timeline and remove from available events
        setTimelineEvents(prev => [...prev, eventToMove].sort((a, b) => a.order - b.order));
        setAvailableEvents(prev => prev.filter(e => e.id !== draggedEvent));
        
        // Check order
        const currentPosition = timelineEvents.length;
        if (eventToMove.order === currentPosition + 1) {
          setScore(prev => prev + 10);
          setMessage(`Correct! ${eventToMove.name} happened in ${eventToMove.year}.`);
        } else {
          setMessage(`Think again! Check the years carefully.`);
        }
        
        // Check if game is complete
        if (availableEvents.length === 1) { // Will be 0 after this drop completes
          setGameComplete(true);
          
          // Call onComplete callback if provided
          if (onComplete) {
            onComplete();
          }
        }
      }
      
      setDraggedEvent(null);
    }
  };
  
  const resetGame = (): void => {
    const events = timelineEvents.concat(availableEvents);
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setAvailableEvents(shuffled);
    setTimelineEvents([]);
    setScore(0);
    setMessage("");
    setGameComplete(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-amber-50 rounded-xl p-6 mb-8 shadow-lg relative overflow-hidden">
        <AfricanBorder patternType="greek">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif text-orange-800 relative inline-block">
                African Monetary Timeline
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"></span>
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-orange-800 font-semibold">Score: {score}</span>
                <button 
                  onClick={resetGame}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition border-2 border-yellow-300"
                >
                  Reset
                </button>
              </div>
            </div>
            
            {message && (
              <div className={`p-3 rounded-lg mb-6 ${message.includes('Correct') ? 'bg-green-100 border border-green-300 text-green-800' : 'bg-orange-100 border border-orange-300 text-orange-800'}`}>
                {message}
              </div>
            )}
            
            {/* Timeline display */}
            <div 
              className="min-h-36 bg-white rounded-xl p-4 mb-6 border-2 border-yellow-300 flex flex-col relative overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {AfricanPatterns['zigzag']}

              
              <h3 className="text-xl font-serif text-orange-800 mb-4 relative z-10">Timeline</h3>
              
              {timelineEvents.length === 0 ? (
                <div className="text-center p-4 text-orange-800 italic">
                  Drag events here to build your timeline
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {timelineEvents.map((event, index) => (
                    <div 
                      key={event.id}
                      className={`relative p-3 rounded-lg border-2 border-orange-400 flex-1 min-w-48 bg-white shadow-md`}
                    >
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{event.image}</div>
                        <div>
                          <h4 className="font-bold text-orange-800">{event.name}</h4>
                          <div className="text-orange-600 text-sm font-semibold">{event.year}</div>
                          <p className="text-sm text-orange-700 mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Available events */}
            <div className="bg-amber-100 rounded-xl p-4 border-2 border-yellow-300 relative overflow-hidden">
              {AfricanPatterns.circles}

              
              <h3 className="text-xl font-serif text-orange-800 mb-4 relative z-10">Available Events</h3>
              
              <div className="flex flex-wrap gap-3">
                {availableEvents.map(event => (
                  <div 
                    key={event.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event.id)}
                    className="p-3 rounded-lg border-2 border-orange-300 flex-1 min-w-48 bg-white cursor-move hover:border-orange-500 hover:shadow-md transition relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-10">
                      {AfricanPatterns[event.pattern]}
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="text-3xl">{event.image}</div>
                      <div>
                        <h4 className="font-bold text-orange-800">{event.name}</h4>
                        <div className="text-orange-600 text-sm font-semibold">{event.year}</div>
                        <p className="text-sm text-orange-700 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {gameComplete && (
              <div className="mt-6 bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <h3 className="text-xl font-serif text-green-800 mb-2">Timeline Complete!</h3>
                <p className="text-green-700">
                  Congratulations! You've successfully arranged the key events in African monetary history.
                  Final score: {score} points.
                </p>
              </div>
            )}
          </div>
        </AfricanBorder>
      </div>
      
      <div className="bg-orange-50 rounded-xl p-6 relative overflow-hidden border-2 border-orange-300">
        <AfricanBorder patternType="circles">
          <div className="p-4">
            <h3 className="text-xl font-serif text-orange-800 mb-3">Reflection Question</h3>
            <p className="text-orange-700 border-l-4 border-orange-500 pl-4 py-2 mb-4 bg-orange-50">
              How did the introduction of European currencies during colonization impact traditional African monetary systems?
              What were the long-term effects on African economies?
            </p>
            <textarea 
              className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" 
              rows={4}
              placeholder="Type your thoughts..."
            />
          </div>
        </AfricanBorder>
      </div>
    </div>
  );
};

export default TimelineBuilder;
