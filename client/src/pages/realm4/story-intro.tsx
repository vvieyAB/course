
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';

type ForgePattern = 'hash' | 'circuit' | 'energy';

const forgePatterns: Record<ForgePattern, React.CSSProperties> = {
  hash: {
    backgroundImage: `radial-gradient(#FF6B6B 2px, transparent 2px)`,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  circuit: {
    backgroundImage: `
      linear-gradient(90deg, #FF6B6B 2px, transparent 2px),
      linear-gradient(#FF6B6B 2px, transparent 2px)
    `,
    backgroundSize: '40px 40px',
    opacity: 0.1
  },
  energy: {
    backgroundImage: `
      repeating-linear-gradient(45deg, #FF6B6B 0, #FF6B6B 2px, transparent 0, transparent 50%)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "The Mountain's Call",
    content: `Deep within the Mountain Forge, where digital fires burned eternal, Asha felt the raw power of Bitcoin mining coursing through the air. The heat from countless machines rose like incense, each calculation a prayer to the network.

"Here," spoke a weathered miner, his eyes reflecting the glow of mining rigs, "we transform energy into trust, electricity into security."`,
    pattern: 'hash' as ForgePattern,
    symbol: '⛰️'
  },
  {
    title: "The Heart of Proof-of-Work",
    content: `In vast chambers carved from living rock, rows of mining machines hummed their computational hymn. The miner guided Asha to a central terminal, its screens alive with scrolling numbers.

"Each hash is a lottery ticket," he explained, "but the prize isn't just digital coins - it's the right to protect the network, to verify the truth of transactions for all."`,
    pattern: 'circuit' as ForgePattern,
    symbol: '⚡'
  },
  {
    title: "The Forge's Secret",
    content: `Before a wall of shimmering heat, the miner revealed the forge's deepest truth: "Mining isn't just about creating new bitcoins. It's about building an unbreakable wall of energy that protects every transaction, every satoshi, every dream of financial freedom."

As Asha watched the difficulty adjustment dance across the screens, she began to understand how mathematics, energy, and human ingenuity combined to forge the strongest monetary network ever created.`,
    pattern: 'energy' as ForgePattern,
    symbol: '🔨'
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
      setLocation('/realm/4/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-red-950">
      <div className="absolute inset-0" style={forgePatterns[currentStory.pattern]} />
      <div className="max-w-3xl w-full bg-red-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-300 text-center">
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-red-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #FF6B6B 0%, #c53030 100%)',
                boxShadow: '0 0 30px rgba(255, 107, 107, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">The Mountain Forge</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div className={`w-4 h-4 transform rotate-45 ${
                  idx === currentPage ? 'bg-red-300' : 'bg-red-700'
                }`} />
                {idx === currentPage && (
                  <div className="absolute inset-0 w-4 h-4 transform rotate-45 bg-red-300 animate-pulse"
                    style={{ opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-colors flex items-center group"
          >
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Enter the Forge'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
