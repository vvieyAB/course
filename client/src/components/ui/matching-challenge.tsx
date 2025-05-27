import React, { useState, useEffect } from 'react';

interface MatchingPair {
  currency?: string;
  region?: string; 
  valueSource?: string;
  left?: string;
  right?: string;
}

interface MatchingChallengeProps {
  pairs: MatchingPair[];
  onComplete: () => void;
}

export function MatchingChallenge({ pairs, onComplete }: MatchingChallengeProps) {
  const [leftItems, setLeftItems] = useState<(string | null)[]>([]);
  const [rightItems, setRightItems] = useState<(string | null)[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [correctMatches, setCorrectMatches] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Initialize the items, scrambling the right side
  useEffect(() => {
    if (pairs.length) {
      // Handle different pair structures
      let leftArr: string[] = [];
      let rightArr: string[] = [];
      
      if ('left' in pairs[0] && 'right' in pairs[0]) {
        // If using left/right format
        leftArr = pairs.map(pair => pair.left || '');
        rightArr = [...pairs.map(pair => pair.right || '')];
      } else if ('currency' in pairs[0] && 'valueSource' in pairs[0]) {
        // If using currency/valueSource format
        leftArr = pairs.map(pair => pair.currency || '');
        rightArr = [...pairs.map(pair => pair.valueSource || '')];
      } else if ('currency' in pairs[0] && 'region' in pairs[0]) {
        // If using currency/region format
        leftArr = pairs.map(pair => pair.currency || '');
        rightArr = [...pairs.map(pair => pair.region || '')];
      }
      
      // Shuffle the right array
      rightArr.sort(() => Math.random() - 0.5);
      
      setLeftItems(leftArr);
      setRightItems(rightArr);
    }
  }, [pairs]);

  const handleLeftSelect = (index: number) => {
    if (correctMatches.includes(index)) return;
    
    setSelectedLeft(index);
    
    // If right already selected, check for match
    if (selectedRight !== null) {
      checkMatch(index, selectedRight);
    }
  };
  
  const handleRightSelect = (index: number) => {
    // Don't allow selecting if this right item is already part of a match
    if (correctMatches.some(leftIndex => {
      const leftItem = leftItems[leftIndex];
      // Find the original pair for this left item
      const originalPair = pairs.find(pair => 
        pair.left === leftItem || 
        pair.currency === leftItem
      );
      
      // Get the expected right value
      let expectedRight;
      if (originalPair) {
        if ('right' in originalPair) expectedRight = originalPair.right;
        else if ('region' in originalPair) expectedRight = originalPair.region;
        else if ('valueSource' in originalPair) expectedRight = originalPair.valueSource;
      }
      
      return expectedRight === rightItems[index];
    })) {
      return;
    }
    
    setSelectedRight(index);
    
    // If left already selected, check for match
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index);
    }
  };

  const checkMatch = (leftIndex: number, rightIndex: number) => {
    const leftItem = leftItems[leftIndex];
    const rightItem = rightItems[rightIndex];
    
    // Find the original pair for this left item
    const originalPair = pairs.find(pair => 
      pair.left === leftItem || 
      pair.currency === leftItem
    );
    
    // Get the expected right value
    let expectedRight;
    if (originalPair) {
      if ('right' in originalPair) expectedRight = originalPair.right;
      else if ('region' in originalPair) expectedRight = originalPair.region;
      else if ('valueSource' in originalPair) expectedRight = originalPair.valueSource;
    }
    
    // Check if match is correct
    if (rightItem === expectedRight) {
      // Add to correct matches
      setCorrectMatches([...correctMatches, leftIndex]);
      setMessage("Correct match!");
      
      // Check if all pairs are matched
      if (correctMatches.length + 1 === pairs.length) {
        setIsComplete(true);
        setMessage("Congratulations! You've matched all pairs correctly.");
        onComplete();
      }
    } else {
      setMessage("That's not the right match. Try again.");
    }
    
    // Reset selections
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const getCardStyle = (side: 'left' | 'right', index: number) => {
    let baseStyle = "p-3 border rounded-md cursor-pointer transition-all ";
    
    if (side === 'left') {
      // Left side card
      if (correctMatches.includes(index)) {
        return baseStyle + "bg-green-800/40 border-green-600 opacity-70";
      } else if (selectedLeft === index) {
        return baseStyle + "bg-amber-800/60 border-amber-600";
      } else {
        return baseStyle + "bg-gray-800/40 border-gray-700 hover:border-amber-700";
      }
    } else {
      // Right side card
      if (correctMatches.some(leftIndex => {
        const leftItem = leftItems[leftIndex];
        // Find the original pair for this left item
        const originalPair = pairs.find(pair => 
          pair.left === leftItem || 
          pair.currency === leftItem
        );
        
        // Get the expected right value
        let expectedRight;
        if (originalPair) {
          if ('right' in originalPair) expectedRight = originalPair.right;
          else if ('region' in originalPair) expectedRight = originalPair.region;
          else if ('valueSource' in originalPair) expectedRight = originalPair.valueSource;
        }
        
        return expectedRight === rightItems[index];
      })) {
        return baseStyle + "bg-green-800/40 border-green-600 opacity-70";
      } else if (selectedRight === index) {
        return baseStyle + "bg-amber-800/60 border-amber-600";
      } else {
        return baseStyle + "bg-gray-800/40 border-gray-700 hover:border-amber-700";
      }
    }
  };

  return (
    <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-amber-300 mb-4">Matching Challenge</h3>
      
      <p className="text-amber-100 mb-6">
        Match each item on the left with its corresponding item on the right.
      </p>
      
      {/* Message */}
      {message && (
        <div className={`p-3 rounded-md mb-4 text-center ${isComplete ? 'bg-green-900/30 text-green-200' : 'bg-amber-800/30 text-amber-200'}`}>
          {message}
        </div>
      )}
      
      {/* Matching area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left items */}
        <div>
          <h4 className="text-lg text-amber-200 mb-3">
            {pairs[0]?.currency ? "Currencies" : "Items"}
          </h4>
          <div className="space-y-3">
            {leftItems.map((item, index) => (
              <div 
                key={`left-${index}`}
                className={getCardStyle('left', index)}
                onClick={() => handleLeftSelect(index)}
              >
                <div className="font-medium text-amber-100">{item}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right items */}
        <div>
          <h4 className="text-lg text-amber-200 mb-3">
            {pairs[0]?.valueSource 
              ? "Value Sources" 
              : pairs[0]?.region 
                ? "Regions" 
                : "Matches"}
          </h4>
          <div className="space-y-3">
            {rightItems.map((item, index) => (
              <div 
                key={`right-${index}`}
                className={getCardStyle('right', index)}
                onClick={() => handleRightSelect(index)}
              >
                <div className="font-medium text-amber-100">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center">
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