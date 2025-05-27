import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRightIcon } from 'lucide-react';
import { originTheme } from '@/lib/realm-themes';

type AfricanPattern = 'adinkra' | 'kente' | 'mudcloth';

const africanPatterns: Record<AfricanPattern, React.CSSProperties> = {
  adinkra: {
    backgroundImage: `
      radial-gradient(circle at 10px 10px, #EE720B 8px, transparent 8px),
      radial-gradient(circle at 30px 30px, #EE720B 8px, transparent 8px),
      radial-gradient(circle at 30px 10px, #EE720B 5px, transparent 5px),
      radial-gradient(circle at 10px 30px, #EE720B 5px, transparent 5px)
    `,
    backgroundSize: '40px 40px',
    backgroundColor: '#FBF4D2'
  },
  kente: {
    backgroundImage: `
      repeating-linear-gradient(0deg, #EE720B, #EE720B 10px, #FFC567 10px, #FFC567 20px),
      repeating-linear-gradient(90deg, #EE720B, #EE720B 10px, #FFC567 10px, #FFC567 20px)
    `,
    backgroundBlendMode: 'difference',
    backgroundSize: '30px 30px',
    opacity: 0.2
  },
  mudcloth: {
    backgroundImage: `
      linear-gradient(45deg, #EE720B 25%, transparent 25%), 
      linear-gradient(-45deg, #EE720B 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #EE720B 75%), 
      linear-gradient(-45deg, transparent 75%, #EE720B 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    opacity: 0.15
  }
};

interface StoryPage {
  title: string;
  content: string;
  pattern: AfricanPattern;
  symbol: string;
}

const storyPages: StoryPage[] = [
  {
    title: 'The Whisper of Coins',
    content: `The morning sun cast golden rays through the baobab trees as Asha Odu walked along the dusty path to her grandmother's house. Today was her sixteenth birthday, and as tradition dictated in her village, it was time for her to receive her ancestral gift.

Her grandmother, Mama Nia, was waiting on the porch, her dark eyes gleaming with excitement.

"Asha," she called warmly, "come sit beside me. Today you begin a journey that will change how you see the world."

Asha settled onto the woven mat, curious about what her grandmother meant. From inside her colorful dress, Mama Nia pulled out a small leather pouch, worn with age.

"This," she said, placing it gently in Asha's palm, "is the first key to understanding value."`,
    pattern: 'adinkra',
    symbol: '🌍'
  },
  {
    title: 'The First Secret',
    content: `Asha carefully opened the pouch. Inside was a collection of objects: a small cowrie shell, a piece of woven cloth no larger than her thumb, a tiny brass weight shaped like a star, and what appeared to be an ancient coin.

"Long before the modern money we use today," Mama Nia explained, "our ancestors in the Realm of Origins understood something profound about exchange and value."

She picked up the cowrie shell, its polished surface gleaming in the sunlight. "This simple shell once bought food, land, and even freedom for our people. But why? What makes something valuable? That is the first secret you must discover."

Asha rolled the shell between her fingers, wondering how something so small could hold such power.

"In the Realm of Origins," Mama Nia continued, "you will learn how trade began, how value was created, and how money evolved right here in Africa - long before others came to our shores."`,
    pattern: 'kente',
    symbol: '🐚'
  },
  {
    title: 'The Invitation',
    content: `"But Grandmother," Asha asked, confused, "what is the 'Realm of Origins'? Where can I find it?"

Mama Nia smiled mysteriously. "The realms are not places you can walk to with your feet, child. They are journeys of understanding." She tapped Asha's forehead gently. "They exist here," and then placed her hand over Asha's heart, "and here."

"Each realm will test you with challenges that our ancestors faced. In the Realm of Origins, you'll experience trade before money existed. You'll feel the frustration of barter, discover why shells and gold dust became our first currencies, and understand how colonizers disrupted our ancient systems."

Asha clutched the pouch tightly. "How do I begin?"

"Close your eyes," Mama Nia instructed. "Listen for the whisper of coins. They tell stories spanning thousands of years, from the markets of Timbuktu to the kingdoms of Great Zimbabwe. Are you ready to hear them?"

Asha closed her eyes, her heart racing with anticipation. "I'm ready."`,
    pattern: 'mudcloth',
    symbol: '✨'
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
      setLocation('/realm/1/home');
    }
  };

  const buttonText = currentPage < storyPages.length - 1 ? 'Continue' : 'Begin Journey';
  const pagePatternStyle = africanPatterns[currentStory.pattern];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundColor: originTheme.colors.background,
        color: originTheme.colors.textLight
      }}
    >
      <div className="absolute inset-0 z-0" style={pagePatternStyle} />
      <div className="max-w-3xl w-full bg-amber-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl z-10 relative">
        <div
          className="absolute inset-0 rounded-xl border-4 border-amber-500/60"
          style={{
            backgroundImage:
              'linear-gradient(45deg, transparent 30%, #FFC567 30%, #FFC567 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, #FFC567 30%, #FFC567 70%, transparent 70%)',
            backgroundSize: '20px 20px',
            opacity: 0.2,
            zIndex: -1
          }}
        ></div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-6 text-amber-300 text-center"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
        >
          {currentStory.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-3/5">
            <div className="prose prose-lg prose-invert max-w-none">
              {currentStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-amber-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div
              className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle, #EE720B 0%, #FFC567 100%)',
                boxShadow: '0 0 30px rgba(238, 114, 11, 0.5)'
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 40%, transparent 40%), radial-gradient(circle, rgba(0,0,0,0.2) 20%, transparent 20%)',
                  backgroundSize: '30px 30px, 40px 40px',
                  opacity: 0.5
                }}
              ></div>
              <div className="text-center text-white z-10 p-4">
                <div className="text-6xl mb-2">{currentStory.symbol}</div>
                <p className="font-semibold text-lg">Realm of Origins</p>
                <p className="text-sm mt-1 opacity-80">The Whisper of Coins</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {storyPages.map((_, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`w-4 h-4 transform rotate-45 ${
                    idx === currentPage ? 'bg-amber-300' : 'bg-amber-700'
                  }`}
                />
                {idx === currentPage && (
                  <div
                    className="absolute inset-0 w-4 h-4 transform rotate-45 bg-amber-300 animate-pulse"
                    style={{ opacity: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full transition-colors flex items-center group"
            style={{
              background: 'linear-gradient(45deg, #EE720B, #FFC567)',
              boxShadow: '0 4px 10px rgba(238, 114, 11, 0.3)'
            }}
          >
            {buttonText}
            <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
