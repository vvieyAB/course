import { useState, useEffect } from 'react';
import { Fingerprint, Check, RefreshCw } from 'lucide-react';
import { bioluminescentTheme } from '@/lib/realm-themes';

interface HashingSimulatorProps {
  onComplete: () => void;
}

export default function HashingSimulator({ onComplete }: HashingSimulatorProps) {
  const [inputText, setInputText] = useState('');
  const [hashedOutput, setHashedOutput] = useState('');
  const [challenge, setChallenge] = useState({
    completed: false,
    message: '',
    success: false
  });
  const [isHashing, setIsHashing] = useState(false);
  
  // Simple SHA-256 hash function simulation (for educational purposes)
  // In a real app, use a proper crypto library
  const simulateHash = (text: string) => {
    // This is a simplified hash function for demo purposes only
    // It creates a predictable but unique-ish string based on input
    // DO NOT use this for actual cryptography
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex-like string and pad to look like SHA-256
    const hashString = Math.abs(hash).toString(16).padStart(8, '0');
    return hashString.repeat(8).substring(0, 64);
  };
  
  const handleGenerateHash = () => {
    if (!inputText.trim()) return;
    
    setIsHashing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const hash = simulateHash(inputText);
      setHashedOutput(hash);
      setIsHashing(false);
      
      // Check if this is the first successful hash generation
      if (!challenge.completed && hash) {
        setChallenge({
          completed: true,
          message: "Great job! You've successfully created a hash from your input.",
          success: true
        });
        
        // Complete the challenge after a short delay
        setTimeout(onComplete, 2000);
      }
    }, 800);
  };
  
  // Show identical outputs for identical inputs to demonstrate hash consistency
  useEffect(() => {
    if (inputText && !isHashing) {
      const timeoutId = setTimeout(() => {
        setHashedOutput(simulateHash(inputText));
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [inputText]);
  
  return (
    <div className="py-6">
      <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(8, 28, 36, 0.6)' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
          Hashing Challenge
        </h3>
        <p className="text-gray-300 mb-4">
          Hash functions are one-way cryptographic algorithms that create a unique 'fingerprint' of data.
          In Bitcoin, hash functions secure the blockchain and verify transactions.
        </p>
        
        <div className="space-y-6">
          <div>
            <label 
              htmlFor="input-text" 
              className="block text-sm font-medium mb-1"
              style={{ color: bioluminescentTheme.colors.secondary }}
            >
              Input Text:
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type any text to see how it transforms into a hash..."
              className="w-full p-3 bg-black/40 text-gray-100 border rounded-md"
              style={{ borderColor: `${bioluminescentTheme.colors.primary}40` }}
              rows={3}
            />
            <p className="mt-1 text-xs opacity-70" style={{ color: bioluminescentTheme.colors.secondary }}>
              Try changing just one character and see how the entire hash changes dramatically.
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label 
                htmlFor="hash-output" 
                className="block text-sm font-medium"
                style={{ color: bioluminescentTheme.colors.secondary }}
              >
                Resulting Hash (SHA-256-like):
              </label>
              
              <button
                type="button"
                onClick={handleGenerateHash}
                disabled={!inputText.trim() || isHashing}
                className="px-3 py-1 text-xs rounded text-white font-medium flex items-center"
                style={{ 
                  backgroundColor: bioluminescentTheme.colors.primary,
                  opacity: (!inputText.trim() || isHashing) ? 0.7 : 1
                }}
              >
                {isHashing ? (
                  <>
                    <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                    Hashing...
                  </>
                ) : (
                  <>
                    <Fingerprint className="mr-1 h-3 w-3" />
                    Generate Hash
                  </>
                )}
              </button>
            </div>
            
            <div 
              className="font-mono text-sm p-3 rounded-md overflow-x-auto"
              style={{ 
                backgroundColor: 'rgba(6, 214, 160, 0.1)',
                color: hashedOutput ? bioluminescentTheme.colors.accent1 : 'gray'
              }}
            >
              {hashedOutput || '0000000000000000000000000000000000000000000000000000000000000000'}
            </div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-2" style={{ color: bioluminescentTheme.colors.secondary }}>
              Key Properties of Hash Functions in Bitcoin:
            </h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="inline-block mr-2 mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bioluminescentTheme.colors.accent1 }}></span>
                <span><strong>One-way function:</strong> You cannot derive the original input from the hash output.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-2 mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bioluminescentTheme.colors.accent1 }}></span>
                <span><strong>Deterministic:</strong> The same input always produces the same hash.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-2 mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bioluminescentTheme.colors.accent1 }}></span>
                <span><strong>Avalanche effect:</strong> A small change in input produces a completely different hash.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-2 mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bioluminescentTheme.colors.accent1 }}></span>
                <span><strong>Collision resistance:</strong> It's extremely difficult to find two different inputs that produce the same hash.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {challenge.message && (
          <div 
            className={`mt-6 p-3 rounded-md ${challenge.success ? 'bg-green-900/30' : 'bg-red-900/30'}`}
            style={{ 
              borderLeft: `4px solid ${challenge.success ? '#10b981' : '#ef4444'}`,
            }}
          >
            <p className={challenge.success ? 'text-green-400' : 'text-red-400'}>
              {challenge.message}
            </p>
          </div>
        )}
      </div>
      
      {challenge.completed && (
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
            Congratulations! You've experienced firsthand how hash functions create unique digital fingerprints.
            Bitcoin uses the SHA-256 hash function as a fundamental building block for its security and structure.
          </p>
        </div>
      )}
    </div>
  );
}