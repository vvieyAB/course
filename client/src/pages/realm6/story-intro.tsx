
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';
import { ubuntuTheme } from '@/lib/realm-themes';

type UbuntuPattern = 'network' | 'community' | 'growth';

const ubuntuPatterns: Record<UbuntuPattern, React.CSSProperties> = {
  network: {
    backgroundImage: `
      radial-gradient(#F97316 2px, transparent 2px),
      radial-gradient(#F97316 2px, transparent 2px)
    `,
    backgroundSize: '30px 30px',
    backgroundPosition: '0 0, 15px 15px',
    opacity: 0.1
  },
  community: {
    backgroundImage: `
      repeating-linear-gradient(45deg, #F97316 0, #F97316 2px, transparent 0, transparent 10px),
      repeating-linear-gradient(-45deg, #F97316 0, #F97316 2px, transparent 0, transparent 10px)
    `,
    backgroundSize: '20px 20px',
    opacity: 0.1
  },
  growth: {
    backgroundImage: `linear-gradient(30deg, #F97316 12%, transparent 12.5%, transparent 87%, #F97316 87.5%, #F97316)`,
    backgroundSize: '20px 35px',
    opacity: 0.1
  }
};

const storyPages = [
  {
    title: "Welcome to Ubuntu Village",
    content: `In the bustling markets of Ubuntu Village, Asha witnessed something extraordinary. Merchants and customers alike tapped their phones, exchanging value instantly across the Lightning Network.

"This is where Bitcoin comes alive," explained Mama Nia, gesturing to the vibrant scene. "Here, we don't just talk about financial freedom - we live it."`,
    pattern: 'network' as UbuntuPattern,
    symbol: '🏘️'
  },
  {
    title: "The Spirit of Ubuntu",
    content: `A group of young entrepreneurs gathered around a solar-powered Bitcoin node, their faces lit with excitement as they discussed their latest projects.

"Ubuntu means 'I am because we are,'" Mama Nia continued. "Through Bitcoin, we're building systems that embody this spirit - connecting communities, preserving value, and creating opportunities for all."`,
    pattern: 'community' as UbuntuPattern,
    symbol: '☀️'
  },
  {
    title: "Seeds of Change",
    content: `As the sun set over the village, Asha observed merchants receiving remittances from relatives abroad, farmers accessing global markets, and artists selling digital works - all through Bitcoin.

"This is just the beginning," Mama Nia smiled. "In Ubuntu Village, we're planting the seeds of a new financial future, one that grows from the ground up, nourished by community and powered by Bitcoin."`,
    pattern: 'growth' as UbuntuPattern,
    symbol: '🌱'
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
      setLocation('/realm/6/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-orange-950">
      <div className="absolute inset-0" style={ubuntuPatterns[currentStory.pattern]} />
      <div className="max-w-3xl w-full bg-orange-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-orange-300 text-center">
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-orange-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #FB923C 0%, #9A3412 100%)',
                boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)'
              }}>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">Ubuntu Village</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div className={`w-4 h-4 transform rotate-45 ${
                  idx === currentPage ? 'bg-orange-300' : 'bg-orange-700'
                }`} />
                {idx === currentPage && (
                  <div className="absolute inset-0 w-4 h-4 transform rotate-45 bg-orange-300 animate-pulse"
                    style={{ opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors flex items-center group"
          >
            {currentPage < storyPages.length - 1 ? 'Continue' : 'Enter the Village'}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
