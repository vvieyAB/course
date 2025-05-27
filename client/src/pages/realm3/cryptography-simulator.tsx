import { useState, useEffect } from 'react';
import { Lock, Unlock, Check, RefreshCw } from 'lucide-react';
import { bioluminescentTheme } from '@/lib/realm-themes';

interface CryptographySimulatorProps {
  onComplete: () => void;
}

export default function CryptographySimulator({ onComplete }: CryptographySimulatorProps) {
  const [stage, setStage] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  // Current challenge from realm3Missions
  const currentChallenge = {
    ciphertext: "GUVF VF BAYL GUR ORTVAAVAT BS LBHE WBHEARL",
    hint: "Each letter is shifted by 13 places in the alphabet.",
    solution: "THIS IS ONLY THE BEGINNING OF YOUR JOURNEY",
    explanation: "This is a ROT13 cipher, one of the simplest encryption techniques. Each letter is replaced by the letter 13 positions after it in the alphabet."
  };
  
  // Simple ROT13 implementation for demonstration
  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, function(chr) {
      const start = chr <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + (chr.charCodeAt(0) - start + 13) % 26);
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize both strings for comparison (uppercase, no spaces)
    const normalizedInput = input.toUpperCase().replace(/\s/g, '');
    const normalizedSolution = currentChallenge.solution.toUpperCase().replace(/\s/g, '');
    
    if (normalizedInput === normalizedSolution) {
      setMessage("Correct! You've successfully decrypted the message.");
      setCompleted(true);
      
      // Complete the challenge after a delay
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setMessage("That's not quite right. Try again!");
    }
  };
  
  const handleDecrypt = () => {
    setIsDecrypting(true);
    
    // Simulate decryption process with a delay
    setTimeout(() => {
      setInput(rot13(currentChallenge.ciphertext));
      setIsDecrypting(false);
    }, 1500);
  };
  
  return (
    <div className="py-6">
      <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(8, 28, 36, 0.6)' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
          Cryptography Challenge
        </h3>
        <p className="text-gray-300 mb-4">
          In Bitcoin, cryptography protects your funds and ensures only the rightful owner can access them.
          Let's practice with a simple cipher.
        </p>
        
        <div className="p-4 rounded-md mb-6" style={{ backgroundColor: 'rgba(6, 214, 160, 0.1)' }}>
          <p className="text-sm mb-2" style={{ color: bioluminescentTheme.colors.secondary }}>
            <strong>Encrypted Message:</strong>
          </p>
          <p className="font-mono text-lg mb-4 tracking-wide" style={{ color: bioluminescentTheme.colors.accent1 }}>
            {currentChallenge.ciphertext}
          </p>
          <p className="text-sm italic" style={{ color: bioluminescentTheme.colors.secondary }}>
            <strong>Hint:</strong> {currentChallenge.hint}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="decrypted" 
              className="block text-sm font-medium mb-1"
              style={{ color: bioluminescentTheme.colors.secondary }}
            >
              Decrypted Message:
            </label>
            <input
              type="text"
              id="decrypted"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the decrypted message..."
              className="w-full p-3 bg-black/40 text-gray-100 border rounded-md"
              style={{ borderColor: `${bioluminescentTheme.colors.primary}40` }}
              disabled={completed}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={completed || !input.trim()}
              className="px-4 py-2 rounded-md text-white font-medium flex items-center"
              style={{ 
                backgroundColor: completed 
                  ? '#2c6a56' 
                  : bioluminescentTheme.colors.primary,
                opacity: (!input.trim() || completed) ? 0.7 : 1
              }}
            >
              {completed ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Verified
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Check Solution
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleDecrypt}
              disabled={completed || isDecrypting}
              className="px-4 py-2 bg-gray-700 rounded-md text-white font-medium flex items-center"
              style={{ opacity: (completed || isDecrypting) ? 0.7 : 1 }}
            >
              {isDecrypting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Decrypting...
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Show Solution
                </>
              )}
            </button>
          </div>
        </form>
        
        {message && (
          <div 
            className={`mt-4 p-3 rounded-md ${completed ? 'bg-green-900/30' : 'bg-red-900/30'}`}
            style={{ 
              borderLeft: `4px solid ${completed ? '#10b981' : '#ef4444'}`,
            }}
          >
            <p className={completed ? 'text-green-400' : 'text-red-400'}>
              {message}
            </p>
            {completed && (
              <p className="mt-2 text-sm text-gray-300">
                {currentChallenge.explanation}
              </p>
            )}
          </div>
        )}
      </div>
      
      {completed && (
        <div 
          className="text-center p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'rgba(6, 214, 160, 0.1)',
            borderColor: `${bioluminescentTheme.colors.primary}40` 
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
            Challenge Complete!
          </h3>
          <p className="text-gray-300">
            Just as you've decrypted this message, Bitcoin uses advanced cryptography to secure transactions and protect user funds.
            The main difference is that Bitcoin uses much more complex algorithms that are practically impossible to break.
          </p>
        </div>
      )}
    </div>
  );
}