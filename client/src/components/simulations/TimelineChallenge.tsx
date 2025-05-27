import { useState } from 'react';
import { TimelineEvent } from '@/lib/realm1-missions';

interface TimelineChallengeProps {
  events: TimelineEvent[];
  onComplete?: () => void;
}

export function TimelineChallenge({ events = [], onComplete }: TimelineChallengeProps) {
  const [selectedEvents, setSelectedEvents] = useState<TimelineEvent[]>([]);
  const [availableEvents, setAvailableEvents] = useState<TimelineEvent[]>([...events].sort(() => Math.random() - 0.5));
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  
  // Handle selecting an event from available events
  const handleEventSelect = (event: TimelineEvent) => {
    if (isComplete) return;
    
    setSelectedEvents([...selectedEvents, event]);
    setAvailableEvents(availableEvents.filter(e => e.id !== event.id));
  };
  
  // Handle removing an event from the timeline
  const handleEventRemove = (event: TimelineEvent) => {
    if (isComplete) return;
    
    setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
    setAvailableEvents([...availableEvents, event]);
  };
  
  // Check if the timeline is in the correct order
  const checkTimeline = () => {
    if (selectedEvents.length !== events.length) {
      return false;
    }
    
    // Sort the original events by year
    const sortedEvents = [...events].sort((a, b) => {
      // Convert to numbers if possible, otherwise compare strings
      const yearA = parseInt(a.year.replace(/[^0-9]/g, '')) || a.year;
      const yearB = parseInt(b.year.replace(/[^0-9]/g, '')) || b.year;
      return yearA < yearB ? -1 : 1;
    });
    
    // Check if selected events match the sorted order
    for (let i = 0; i < sortedEvents.length; i++) {
      if (sortedEvents[i].id !== selectedEvents[i].id) {
        return false;
      }
    }
    
    return true;
  };
  
  // Handle submission of the timeline
  const handleSubmit = () => {
    const correct = checkTimeline();
    setIsCorrect(correct);
    setAttempts(attempts + 1);
    
    if (correct) {
      setIsComplete(true);
    }
  };
  
  // Reset the timeline
  const handleReset = () => {
    setSelectedEvents([]);
    setAvailableEvents([...events].sort(() => Math.random() - 0.5));
    setIsCorrect(null);
  };
  
  // Continue to next section
  const handleContinue = () => {
    if (onComplete) onComplete();
  };
  
  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Timeline Challenge
      </h3>
      <p className="text-center text-amber-800 mb-6">
        Arrange the events in chronological order by dragging them to the timeline.
      </p>
      
      {/* Timeline */}
      <div className="mb-8">
        <h4 className="font-medium text-amber-900 mb-3">Your Timeline:</h4>
        <div className="bg-white border-2 border-amber-200 rounded-lg min-h-[150px] p-4">
          {selectedEvents.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-gray-500 italic">
              Click events below to add them to the timeline
            </div>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="flex p-3 border rounded-lg bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => handleEventRemove(event)}
                >
                  <div className="rounded-full bg-amber-600 text-white w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">{event.year}: {event.title}</div>
                    <div className="text-gray-700 text-sm mt-1">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Available events */}
      <div className="mb-6">
        <h4 className="font-medium text-amber-900 mb-3">Available Events:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-3 border rounded-lg bg-white cursor-pointer hover:bg-amber-50 transition-colors"
              onClick={() => handleEventSelect(event)}
            >
              <div className="font-semibold text-amber-900">{event.year}: {event.title}</div>
              <div className="text-gray-700 text-sm mt-1">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Feedback message */}
      {isCorrect !== null && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect 
              ? 'Correct! You\'ve arranged the events in the right order.' 
              : 'Not quite right. Try rearranging the events.'}
          </p>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        {!isComplete && (
          <>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleReset}
            >
              Reset
            </button>
            <button 
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              onClick={handleSubmit}
              disabled={selectedEvents.length !== events.length}
            >
              Check Order
            </button>
          </>
        )}
        
        {isComplete && (
          <button 
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={handleContinue}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}