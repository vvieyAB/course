import React, { useState, useEffect } from 'react';

interface TimelineChallengeProps {
  events: string[];
  onComplete: () => void;
}

export function TimelineChallenge({ events, onComplete }: TimelineChallengeProps) {
  const [shuffledEvents, setShuffledEvents] = useState<string[]>([]);
  const [orderedEvents, setOrderedEvents] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Initialize with shuffled events
  useEffect(() => {
    if (events.length) {
      const shuffled = [...events].sort(() => Math.random() - 0.5);
      setShuffledEvents(shuffled);
    }
  }, [events]);

  const handleEventSelect = (event: string) => {
    if (isComplete) return;
    
    // If event is already in ordered list, remove it
    if (orderedEvents.includes(event)) {
      setOrderedEvents(orderedEvents.filter(e => e !== event));
      // Add it back to the shuffled list
      setShuffledEvents([...shuffledEvents, event]);
      return;
    }
    
    // Otherwise, add it to ordered list and remove from shuffled
    setOrderedEvents([...orderedEvents, event]);
    setShuffledEvents(shuffledEvents.filter(e => e !== event));
    
    // Check if all events are ordered and in correct order
    if (orderedEvents.length + 1 === events.length) {
      const newOrdered = [...orderedEvents, event];
      const isCorrect = newOrdered.every((evt, idx) => evt === events[idx]);
      
      if (isCorrect) {
        setIsComplete(true);
        setMessage("Congratulations! You've ordered the events correctly.");
        onComplete();
      } else {
        setMessage("The order isn't quite right. Review history and try again.");
      }
    }
  };

  const resetTimeline = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setShuffledEvents(shuffled);
    setOrderedEvents([]);
    setMessage(null);
    setIsComplete(false);
  };

  return (
    <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-amber-300 mb-4">Timeline Challenge</h3>
      
      <p className="text-amber-100 mb-6">
        Arrange these historical events in the correct chronological order.
      </p>
      
      {/* Message */}
      {message && (
        <div className={`p-3 rounded-md mb-4 text-center ${isComplete ? 'bg-green-900/30 text-green-200' : 'bg-amber-800/30 text-amber-200'}`}>
          {message}
        </div>
      )}
      
      {/* Timeline display */}
      <div className="mb-8">
        <h4 className="text-lg text-amber-200 mb-3">Your Timeline:</h4>
        
        {orderedEvents.length === 0 ? (
          <div className="text-amber-100/60 italic text-center p-4 border border-dashed border-amber-800/40 rounded-md">
            Select events to build your timeline
          </div>
        ) : (
          <div className="space-y-2">
            {orderedEvents.map((event, index) => (
              <div 
                key={`ordered-${index}`}
                className="p-3 bg-amber-800/30 border border-amber-700/40 rounded-md flex items-center cursor-pointer hover:bg-amber-800/40 transition-colors"
                onClick={() => handleEventSelect(event)}
              >
                <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="text-amber-100">{event}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Available events */}
      <div className="mb-6">
        <h4 className="text-lg text-amber-200 mb-3">Available Events:</h4>
        
        {shuffledEvents.length === 0 ? (
          <div className="text-amber-100/60 italic text-center p-4 border border-dashed border-amber-800/40 rounded-md">
            All events have been placed on the timeline
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {shuffledEvents.map((event, index) => (
              <div 
                key={`shuffled-${index}`}
                className="p-3 bg-gray-800/40 border border-gray-700 rounded-md cursor-pointer hover:border-amber-700 transition-colors"
                onClick={() => handleEventSelect(event)}
              >
                <div className="text-amber-100">{event}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetTimeline}
          className="px-4 py-2 bg-gray-800 text-amber-200 rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
        
        {isComplete && (
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-md hover:bg-amber-500 transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}