import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Lightbulb, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
}

export interface Highlight {
  id: string;
  text: string;
  sourceRealmId: number;
  sourceMissionId: number;
  createdAt: string;
  note?: string;
}

export function HighlightText({ 
  children, 
  className = '' 
}: HighlightTextProps) {
  const { user, addHighlight } = useAuth();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const [showHighlightTip, setShowHighlightTip] = useState(false);
  const [tipPosition, setTipPosition] = useState({ x: 0, y: 0 });
  const [highlightedText, setHighlightedText] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  
  // Get the current URL to extract realm and mission IDs
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  const realmMatch = currentUrl.match(/\/realm\/(\d+)/);
  const missionMatch = currentUrl.match(/\/mission\/(\d+)/);
  
  const currentRealmId = realmMatch ? parseInt(realmMatch[1]) : 1;
  const currentMissionId = missionMatch ? parseInt(missionMatch[1]) : 1;
  
  // Toggle highlight mode
  const toggleHighlightMode = () => {
    setIsHighlightMode(!isHighlightMode);
    
    // Show a toast indicating the mode
    toast({
      title: !isHighlightMode ? 'Highlight Mode Activated' : 'Highlight Mode Deactivated',
      description: !isHighlightMode ? 'Select text to highlight important information' : 'Regular reading mode restored',
      variant: 'default',
    });
  };
  
  // Handler for text selection
  const handleTextSelection = () => {
    if (!isHighlightMode) return;
    
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setShowHighlightTip(false);
      return;
    }
    
    const selectedText = selection.toString().trim();
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position the tooltip near the selected text
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setTipPosition({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.bottom - containerRect.top + 10,
        });
      }
      
      setHighlightedText(selectedText);
      setShowHighlightTip(true);
    }
  };
  
  // Save the highlighted text to the user's profile
  const saveHighlight = (withNote = false) => {
    if (!user || !highlightedText) return;
    
    // Create a new highlight
    const newHighlight: Highlight = {
      id: nanoid(),
      text: highlightedText,
      sourceRealmId: currentRealmId,
      sourceMissionId: currentMissionId,
      createdAt: new Date().toISOString(),
      note: withNote ? currentNote : undefined,
    };
    
    // Use the new addHighlight method from AuthContext
    addHighlight(newHighlight);
    
    // Show a success toast
    toast({
      title: 'Highlight Saved',
      description: 'Added to your backpack for future reference',
      variant: 'default',
    });
    
    // Reset states
    setShowHighlightTip(false);
    setShowNoteInput(false);
    setCurrentNote('');
    setHighlightedText('');
    window.getSelection()?.removeAllRanges();
  };
  
  // Cancel highlighting
  const cancelHighlight = () => {
    setShowHighlightTip(false);
    setShowNoteInput(false);
    setCurrentNote('');
    setHighlightedText('');
    window.getSelection()?.removeAllRanges();
  };
  
  // Start adding a note to the highlight
  const startAddingNote = () => {
    setShowNoteInput(true);
  };
  
  useEffect(() => {
    // Add event listener for text selection
    const handleSelectionChange = () => {
      if (isHighlightMode) {
        handleTextSelection();
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isHighlightMode]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
    >
      {/* The content */}
      <div className={isHighlightMode ? 'cursor-text select-text' : ''}>
        {children}
      </div>
      
      {/* Highlight mode toggle button */}
      <button
        onClick={toggleHighlightMode}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50 transition-all ${
          isHighlightMode 
            ? 'bg-amber-500 text-white' 
            : 'bg-white text-amber-500 hover:bg-amber-50'
        }`}
      >
        <Lightbulb size={24} />
      </button>
      
      {/* Highlight tooltip */}
      {showHighlightTip && (
        <div 
          className="absolute z-50 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[200px]"
          style={{
            left: `${tipPosition.x}px`,
            top: `${tipPosition.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {!showNoteInput ? (
            // Highlight actions
            <div className="flex flex-col gap-2">
              <p className="text-white/80 text-sm mb-2">
                Save this highlight to your backpack:
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => saveHighlight(false)} 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-1 px-3 rounded-md text-sm"
                >
                  Save
                </button>
                <button 
                  onClick={startAddingNote} 
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white py-1 px-3 rounded-md text-sm"
                >
                  Add Note
                </button>
              </div>
              <button 
                onClick={cancelHighlight} 
                className="text-white/50 hover:text-white text-xs mt-1 self-center"
              >
                Cancel
              </button>
            </div>
          ) : (
            // Note input
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                <p className="text-white/80 text-sm">Add a note:</p>
                <button onClick={() => setShowNoteInput(false)} className="text-white/50 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-md text-white p-2 text-sm min-h-[80px]"
                placeholder="Why is this important to you?"
              />
              <div className="flex gap-2 mt-1">
                <button 
                  onClick={() => saveHighlight(true)} 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-1 px-3 rounded-md text-sm"
                >
                  Save with Note
                </button>
                <button 
                  onClick={cancelHighlight} 
                  className="text-white/50 hover:text-white text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}