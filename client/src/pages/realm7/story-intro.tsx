import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';
import { summitTheme } from '@/lib/realm-themes';

type SummitPattern = 'peaks' | 'stars' | 'wisdom';

const summitPatterns: Record<SummitPattern, React.CSSProperties> = {
  peaks: {
    backgroundImage: `
      linear-gradient(135deg, #8b5cf6 25%, transparent 25%),
      linear-gradient(225deg, #8b5cf6 25%, transparent 25%),
      linear-gradient(315deg, #8b5cf6 25%, transparent 25%),
      linear-gradient(45deg, #8b5cf6 25%, transparent 25%)
    `,
    backgroundSize: '50px 50px',
    opacity: 0.1
  },
  stars: {
    backgroundImage: `radial-gradient(#8b5cf6 2px, transparent 2px)`,
    backgroundSize: '30px 30px',
    opacity: 0.1
  },
  wisdom: {
    backgroundImage: `
      linear-gradient(60deg, #8b5cf6 25%, transparent 25.5%, transparent 75%, #8b5cf6 75%, #8b5cf6),
      linear-gradient(120deg, #8b5cf6 25%, transparent 25.5%, transparent 75%, #8b5cf6 75%, #8b5cf6)
    `,
    backgroundSize: '40px 40px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "The Final Ascent",
    content: `Standing at the base of the ancient mountain, Asha gazed upward at its misty peak. Six realms of knowledge had prepared her for this moment - The Summit of Knowledge.

"Each step you've taken," Mama Nia said softly, "has built the foundation for this climb. Here, all paths converge."`,
    pattern: 'peaks' as SummitPattern,
    symbol: '⛰️'
  },
  {
    title: "Stars of Understanding",
    content: `As they climbed higher, stars began to appear in the darkening sky. Each one seemed to represent a piece of wisdom Asha had gathered: the origins of money, the power of self-custody, the beauty of cryptography, the strength of consensus, the wisdom of governance, and the impact on communities.

"Like stars forming constellations," Mama Nia explained, "your knowledge now forms patterns of deeper understanding."`,
    pattern: 'stars' as SummitPattern,
    symbol: '✨'
  },
  {
    title: "The Summit's Promise",
    content: `Near the summit, the air grew thin but crystal clear. Below, Asha could see all the realms she had traversed, each one a crucial part of her journey.

"From this vantage point," Mama Nia smiled, "you can see how Bitcoin connects everything - technology, economics, society, and human freedom. Are you ready to prove your mastery?"`,
    pattern: 'wisdom' as SummitPattern,
    symbol: '🏔️'
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
      setLocation('/realm/7/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-purple-950">
      <div className="absolute inset-0" style={summitPatterns[currentStory.pattern]} />
      <div className="max-w-3xl w-full bg-purple-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-300 text-center">
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-purple-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #A78BFA 0%, #7C3AED 100%)',
                boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">The Summit</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div className={`w-4 h-4 transform rotate-45 ${
                  idx === currentPage ? 'bg-purple-300' : 'bg-purple-700'
                }`} />
                {idx === currentPage && (
                  <div className="absolute inset-0 w-4 h-4 transform rotate-45 bg-purple-300 animate-pulse"
                    style={{ opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors flex items-center group"
          >
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Begin Final Journey'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}