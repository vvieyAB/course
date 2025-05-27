
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';


type CouncilPattern = 'nodes' | 'consensus' | 'chains';

const councilPatterns: Record<CouncilPattern, React.CSSProperties> = {
  nodes: {
    backgroundImage: `radial-gradient(#4ADE80 2px, transparent 2px)`,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  consensus: {
    backgroundImage: `
      linear-gradient(45deg, #4ADE80 2px, transparent 2px),
      linear-gradient(-45deg, #4ADE80 2px, transparent 2px)
    `,
    backgroundSize: '40px 40px',
    opacity: 0.1
  },
  chains: {
    backgroundImage: `
      repeating-linear-gradient(0deg, #4ADE80 0, #4ADE80 2px, transparent 0, transparent 20px),
      repeating-linear-gradient(90deg, #4ADE80 0, #4ADE80 2px, transparent 0, transparent 20px)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "The Council's Call",
    content: `In the towering halls of the Council of Forks, Asha found herself surrounded by an assembly unlike any other. Digital screens flickered with countless nodes, each representing a voice in Bitcoin's governance.

"Welcome to where consensus is born," spoke an elder council member, her voice carrying the weight of countless protocol debates. "Here, we shape Bitcoin's future - not through authority, but through agreement."`,
    pattern: 'nodes' as CouncilPattern,
    symbol: '🏛️'
  },
  {
    title: "Voices of the Network",
    content: `Before a wall of illuminated BIPs (Bitcoin Improvement Proposals), the council member gestured to the diverse gathering of developers, miners, and users.

"Each change to Bitcoin's protocol," she explained, "must pass through this chamber. But unlike traditional governance, power here flows from the bottom up. The smallest voice can propose the greatest change - if the community agrees."`,
    pattern: 'consensus' as CouncilPattern,
    symbol: '📜'
  },
  {
    title: "The Path of Consensus",
    content: `In the heart of the chamber, Asha watched as proposed changes flowed through different stages - from draft to implementation. Some merged smoothly into the protocol, while others branched into separate chains.

"Remember," the council member concluded, "in Bitcoin, we don't rule by decree. We govern through consensus, protect through conservation, and evolve through careful deliberation. The future of money requires nothing less."`,
    pattern: 'chains' as CouncilPattern,
    symbol: '🔗'
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
      setLocation('/realm/5/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-emerald-950">
      <div className="absolute inset-0" style={councilPatterns[currentStory.pattern]} />
      <div className="max-w-3xl w-full bg-emerald-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-300 text-center">
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-emerald-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #4ADE80 0%, #065F46 100%)',
                boxShadow: '0 0 30px rgba(74, 222, 128, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">The Council of Forks</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div className={`w-4 h-4 transform rotate-45 ${
                  idx === currentPage ? 'bg-emerald-300' : 'bg-emerald-700'
                }`} />
                {idx === currentPage && (
                  <div className="absolute inset-0 w-4 h-4 transform rotate-45 bg-emerald-300 animate-pulse"
                    style={{ opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-colors flex items-center group"
          >
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Enter the Council'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
