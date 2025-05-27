
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';

type Pattern = 'binary' | 'hash' | 'key';

const cryptoPatterns: Record<Pattern, React.CSSProperties> = {
  binary: {
    backgroundImage: `
      linear-gradient(45deg, #2563eb 25%, transparent 25%), 
      linear-gradient(-45deg, #2563eb 25%, transparent 25%)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  hash: {
    backgroundImage: `radial-gradient(#2563eb 2px, transparent 2px)`,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  key: {
    backgroundImage: `
      repeating-linear-gradient(45deg, #2563eb 0, #2563eb 2px, transparent 0, transparent 50%)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "The Digital Forest",
    content: `In the heart of the Forest of Sparks, Asha discovered a hidden grove where the very air seemed to pulse with digital energy. Here, among crystalline trees that sparkled with lines of code, she would learn the fundamental secrets that powered Bitcoin.

The ancient cryptographer who dwelled here spoke of mathematical truths that could not be broken - the foundations of cryptography that secured the entire network.`,
    pattern: 'binary' as Pattern,
    symbol: '🌳'
  },
  {
    title: "The Hash Cave",
    content: `Deep within the forest, Asha entered a cave whose walls were covered in an endless stream of numbers and letters. "These are hashes," the cryptographer explained, "digital fingerprints that can prove the integrity of any piece of information without revealing its contents."

She watched in wonder as complex messages were transformed into fixed-length strings, understanding how this simple yet powerful concept formed the backbone of Bitcoin's security.`,
    pattern: 'hash' as Pattern,
    symbol: '🔐'
  },
  {
    title: "The Key Grove",
    content: `In a clearing bathed in digital light, Asha learned about public and private keys - the magical pairing that allowed secure ownership and transfer of bitcoin. "Your private key is like your secret spell," the cryptographer said, "while your public key is the safe address where others can send you value."

As she practiced creating signatures and verifying messages, Asha began to understand how mathematics could create unbreakable bonds of trust without requiring faith in any authority.`,
    pattern: 'key' as Pattern,
    symbol: '🔑'
  }
];

export default function StoryIntro() {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const currentStory = storyPages[currentPage];

  const handleNextPage = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setLocation('/realm/3/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-blue-950">
      <div className="absolute inset-0" style={cryptoPatterns[currentStory.pattern]} />
      <div className="max-w-3xl w-full bg-blue-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-300 text-center">
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-blue-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #2563eb 0%, #1d4ed8 100%)',
                boxShadow: '0 0 30px rgba(37, 99, 235, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">The Forest of Sparks</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div className={`w-4 h-4 transform rotate-45 ${
                  idx === currentPage ? 'bg-blue-300' : 'bg-blue-700'
                }`} />
                {idx === currentPage && (
                  <div className="absolute inset-0 w-4 h-4 transform rotate-45 bg-blue-300 animate-pulse"
                    style={{ opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-colors flex items-center group"
          >
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Enter the Forest'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
