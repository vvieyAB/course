import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';

type CitadelPattern = 'circuits' | 'surveillance' | 'shadows';

const citadelPatterns: Record<CitadelPattern, React.CSSProperties> = {
  circuits: {
    backgroundImage: `
      linear-gradient(45deg, #6b21a8 25%, transparent 25%),
      linear-gradient(-45deg, #6b21a8 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #6b21a8 75%),
      linear-gradient(-45deg, transparent 75%, #6b21a8 75%)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  surveillance: {
    backgroundImage: `radial-gradient(#6b21a8 2px, transparent 2px)`,
    backgroundSize: '30px 30px',
    opacity: 0.1
  },
  shadows: {
    backgroundImage: `
      linear-gradient(60deg, #6b21a8 25%, transparent 25.5%, transparent 75%, #6b21a8 75%, #6b21a8),
      linear-gradient(120deg, #6b21a8 25%, transparent 25.5%, transparent 75%, #6b21a8 75%, #6b21a8)
    `,
    backgroundSize: '40px 40px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "The Watching Walls",
    content: `In the blink of an eye, Asha found herself standing before towering walls of gleaming metal and glass. Countless screens flickered with endless streams of numbers and transactions, each one tracking, recording, watching.

"Welcome to the Central Citadel," Mama Nia's voice echoed in her mind. "Here, every coin has eyes, every transaction tells a tale, and privacy... privacy is a forgotten art."`,
    pattern: 'circuits' as CitadelPattern,
    symbol: '👁️'
  },
  {
    title: "Digital Chains",
    content: `A holographic message shimmered in the air: "Your safety is our priority. All transactions are monitored."

"They built this place with promises of security and convenience," Mama Nia explained. "But with each swipe of their cards, each tap of their phones, people forged their own digital chains. Every purchase, every payment, every transfer - all watched, all recorded, all controlled."

Asha clutched her grandmother's pouch tighter, feeling the weight of the ancient cowrie shells inside. Here, they seemed to whisper of a forgotten freedom.`,
    pattern: 'surveillance' as CitadelPattern,
    symbol: '🔗'
  },
  {
    title: "The Hidden Path",
    content: `In the shadows between the towers, Asha noticed figures moving differently - their faces obscured, their transactions invisible to the watching eyes above.

"Not all who walk these streets have surrendered to the watchers," Mama Nia whispered. "Some remember the old ways, some seek new paths. Bitcoin flows like water through the cracks in these walls, unseen, uncontrolled."

Asha understood now: in a world where every coin was watched, the ability to transact freely had become a precious form of resistance.`,
    pattern: 'shadows' as CitadelPattern,
    symbol: '🗝️'
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
      setLocation('/realm/2/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-purple-950">
      <div className="absolute inset-0" style={citadelPatterns[currentStory.pattern]} />
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
                background: 'radial-gradient(circle, #7C3AED 0%, #4C1D95 100%)',
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">Central Citadel</p>
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
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Enter the Citadel'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}