import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface MissionProps {
  onComplete?: () => void;
}

type PatternType = 'spirals' | 'meander' | 'leaves' | 'waves' | 'dots' | 'chevron' | 'floral';

interface Mission {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  pattern: PatternType;
  reflection: string;
  hasImages?: boolean;
}

const missions: Mission[] = [
  {
    id: 1,
    title: 'The First Exchange — Barter Systems',
    subtitle: "Why Barter Worked (Until It Didn't)",
    content: `Long before coins or paper money, people traded goods directly—a system called barter. Imagine walking through a bustling African market 1,000 years ago. Traders shout, drums beat, and villagers exchange yams for pots, milk for medicine, and cloth for salt. But there's a problem: What if the salt trader doesn't want your yams?

How Barter Worked:
• Double Coincidence of Wants: Both traders must want what the other has.
• Small Communities: Easier to know neighbors' needs.
• No "Money" Needed: Value came from usefulness (e.g., iron tools for farming).

Why It Failed as Trade Grew:
• Scalability Issues: What if you need medicine but only have a goat?
• Perishable Goods: Milk spoils; salt lasts longer.
• No Standard Value: Is one pot worth 10 yams or 20?`,
    pattern: 'spirals',
    reflection: "Could you trade your favorite toy for something you need? What if the other person doesn't want it?"
  },
  {
    id: 2,
    title: "Cowries & Gold Dust — Africa's First Currencies",
    subtitle: 'Shells, Gold, and Trust: The Money of Our Ancestors',
    content: `Before European coins, African communities used beautiful, rare, or useful items as money. Let's explore three examples:

Cowrie Shells (Yoruba, West Africa):
• Why valuable? Rare (brought from the Indian Ocean), durable, and pretty.
• Used for: Buying grain, paying taxes, or even as jewelry.

Gold Dust (Akan, Ghana):
• Why valuable? Easy to measure, culturally sacred, and traded across the Sahara.
• Fun fact: Stored in tiny brass boxes called forowa.

Iron Tools (Central Africa):
• Why valuable? Useful for farming and building.
• Example: A hoe could buy a chicken or pay for a service.`,
    pattern: 'meander',
    reflection: 'If your village used seashells as money, what would make them lose value?'
  },
  {
    id: 3,
    title: 'Colonial Coins — A Forced Revolution',
    subtitle: 'When Foreign Coins Crushed Local Systems',
    content: `In the 19th century, European colonizers arrived with coins stamped with kings and queens. They didn't just bring money—they forced communities to use it.

How Colonial Money Disrupted Africa:
• Taxation: Pay taxes in British coins, not cowries or grain.
• Example: The Hut Tax in Sierra Leone forced farmers to sell crops for coins.
• Devaluing Tradition: Calling cowries "primitive" to justify control.
• Centralized Power: Money became controlled by outsiders, not local chiefs.`,
    pattern: 'leaves',
    reflection: 'Is it fair to force a new money system on people? Why or why not?'
  },
  {
    id: 4,
    title: 'Hyperinflation — When Money Loses Meaning',
    subtitle: 'The Day a Billion Dollars Bought Bread',
    content: `After independence, African nations printed their own money. But when governments printed too much, disaster struck.

Case Study: Zimbabwe (2008):
• What Happened: Prices doubled every day. A loaf of bread cost 2,000,000,000 Zimbabwean dollars.
• Why: The government printed money to pay debts, destroying trust.
• Result: People switched to U.S. dollars or bartered eggs for fuel.`,
    pattern: 'waves',
    reflection: 'Would you save money if you knew it could be worthless tomorrow?'
  },
  {
    id: 5,
    title: 'Knowledge Checkpoint',
    subtitle: 'From Barter to Bitcoin: A Timeline',
    content: `Let's review how money evolved:

• Barter: Yams for pots (no standard value).
• Commodity Money: Cowries, gold, iron (value from scarcity/utility).
• Colonial Coins: Imposed by force, centralizing power.
• Fiat Money: Government-issued, risk of inflation.
• Digital Money: Bitcoin—decentralized, like ancient trust systems.`,
    pattern: 'dots',
    reflection: 'How has money changed from ancient times to today? What stayed the same?'
  },
  {
    id: 6,
    title: "Ubuntu — Money Isn't Everything",
    subtitle: 'The Village That Thrived Without Coins',
    content: `In many African communities, Ubuntu ("I am because we are") meant sharing, not selling.

Examples of Non-Money Value:
• Labor Exchange: Build my hut today; I'll help farm tomorrow.
• Social Debt: A healer gives medicine, trusting the community will support her later.
• Gifts: A drum teacher shares skills, earning respect (not cash).`,
    pattern: 'chevron',
    reflection: 'Could a global economy work like a village—using trust instead of money?'
  },
  {
    id: 7,
    title: 'Bonus Mission: African Empires & Money Innovation',
    subtitle: "Mansa Musa's Gold & Aksum's Coins: Africa's Financial Pioneers",
    content: `Mali Empire (Gold Dust):
• Mansa Musa, the richest man in history, used gold dust for trade. But it wasn't coins—it relied on trust in weight and purity.

Aksumite Coins (Ethiopia):
• Africa's first coins (300 CE) showed kings and crosses. Proved Africa's economic power long before Europe.

Great Zimbabwe:
• Traded gold for Chinese porcelain but measured wealth in cattle.`,
    pattern: 'floral',
    hasImages: true,
    reflection: "What surprised you most about Africa's monetary history?"
  }
];

const patternStyles: Record<PatternType, React.CSSProperties> = {
  spirals: {
    backgroundImage: 'radial-gradient(circle, #EE720B 8%, transparent 9%), radial-gradient(circle, #EE720B 8%, transparent 9%)',
    backgroundSize: '80px 80px',
    backgroundPosition: '0 0, 40px 40px',
    backgroundColor: '#FBF4D2',
    borderColor: '#FFC567'
  },
  meander: {
    background: `repeating-linear-gradient(45deg, #EE720B, #EE720B 5px, #FFC567 5px, #FFC567 10px)`,
    backgroundSize: '20px 20px',
    backgroundColor: '#FBF4D2',
    borderColor: '#FBF4D2'
  },
  leaves: {
    backgroundImage: `linear-gradient(45deg, #EE720B 15%, transparent 16%), linear-gradient(-45deg, #EE720B 15%, transparent 16%)`,
    backgroundSize: '30px 30px',
    backgroundColor: '#FBF4D2',
    borderColor: '#FFC567'
  },
  waves: {
    backgroundImage: `linear-gradient(135deg, #EE720B 15%, transparent 16%), linear-gradient(225deg, #EE720B 15%, transparent 16%)`,
    backgroundSize: '30px 30px',
    backgroundColor: '#FFC567',
    borderColor: '#FBF4D2'
  },
  dots: {
    backgroundImage: 'radial-gradient(#EE720B 10%, transparent 11%)',
    backgroundSize: '30px 30px',
    backgroundColor: '#FFC567',
    borderColor: '#FBF4D2'
  },
  chevron: {
    backgroundImage: `linear-gradient(135deg, #FFC567 15%, transparent 16%), linear-gradient(225deg, #FFC567 15%, transparent 16%)`,
    backgroundSize: '40px 40px',
    backgroundColor: '#EE720B',
    borderColor: '#FBF4D2'
  },
  floral: {
    backgroundImage: `radial-gradient(circle at 50% 50%, #FFC567 5%, transparent 10%), radial-gradient(circle at 100% 50%, #EE720B 8%, transparent 12%)`,
    backgroundSize: '80px 80px',
    backgroundColor: '#FBF4D2',
    borderColor: '#FFC567'
  }
};

export default function AfricanCurrencyEducation({ onComplete }: MissionProps) {
  const [currentMission, setCurrentMission] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const mission = missions[currentMission];
  const progress = (completedMissions.length / missions.length) * 100;

  const handleNext = () => {
    if (currentMission < missions.length - 1) {
      setCompletedMissions((prev) =>
        prev.includes(mission.id) ? prev : [...prev, mission.id]
      );
      setCurrentMission((prev) => prev + 1);
    }
    if (currentMission === missions.length - 2 && onComplete) {
      setTimeout(onComplete, 3000);
    }
  };

  const handlePrev = () => {
    if (currentMission > 0) {
      setCurrentMission((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-amber-900 text-center">
        African Currency Education
      </h1>
      <div className="w-full bg-amber-200 rounded-full h-4 mb-6">
        <div
          className="bg-amber-600 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mb-6">
        <button
          onClick={handlePrev}
          disabled={currentMission === 0}
          className={`flex items-center px-4 py-2 rounded ${currentMission === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        <div className="text-amber-900 font-semibold">
          Mission {mission.id} of {missions.length}
        </div>
        <button
          onClick={handleNext}
          disabled={currentMission === missions.length - 1}
          className={`flex items-center px-4 py-2 rounded ${currentMission === missions.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="mb-6">
        <div
          className="h-16 rounded-t-lg flex items-center justify-center border-2 border-b-0"
          style={{ 
            borderColor: patternStyles[mission.pattern].borderColor,
            backgroundColor: patternStyles[mission.pattern].backgroundColor
          }}
        >
          <div className="bg-amber-600 px-4 py-2 rounded">
            <h2 className="text-2xl font-bold text-white">
              Mission {mission.id}: {mission.title}
            </h2>
          </div>
        </div>
        <div
          className="bg-white p-6 rounded-b-lg shadow-md border-2 border-t-0"
          style={{ borderColor: patternStyles[mission.pattern].borderColor }}
        >
          <h3 className="text-xl font-semibold mb-4 text-amber-800">{mission.subtitle}</h3>
          <p className="prose max-w-none whitespace-pre-line mb-4">{mission.content}</p>
          {mission.hasImages && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-amber-200 rounded-lg p-4 bg-amber-50 flex flex-col items-center">
                <div className="w-[200px] h-[150px] bg-amber-300 mb-2 rounded flex items-center justify-center">
                  <span className="text-amber-800">Mali Gold Dust Image</span>
                </div>
                <h4 className="font-semibold text-amber-800">Mali Gold Dust</h4>
                <p className="text-sm text-center mt-2">
                  Gold dust used as currency in Mali under Mansa Musa's rule.
                </p>
              </div>
              <div className="border border-amber-200 rounded-lg p-4 bg-amber-50 flex flex-col items-center">
                <div className="w-[200px] h-[150px] bg-amber-300 mb-2 rounded flex items-center justify-center">
                  <span className="text-amber-800">Aksumite Coin Image</span>
                </div>
                <h4 className="font-semibold text-amber-800">Aksumite Coin</h4>
                <p className="text-sm text-center mt-2">
                  Early Ethiopian coins showing kings and religious symbols (300 CE).
                </p>
              </div>
              <div className="border border-amber-200 rounded-lg p-4 bg-amber-50 flex flex-col items-center">
                <div className="w-[200px] h-[150px] bg-amber-300 mb-2 rounded flex items-center justify-center">
                  <span className="text-amber-800">Great Zimbabwe Image</span>
                </div>
                <h4 className="font-semibold text-amber-800">Great Zimbabwe</h4>
                <p className="text-sm text-center mt-2">
                  Archaeological evidence of trade goods and wealth measures.
                </p>
              </div>
            </div>
          )}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">Key Reflection:</h4>
            <p>{mission.reflection}</p>
            <textarea
              className="w-full mt-4 p-3 border-2 border-amber-200 rounded focus:outline-none focus:border-amber-400 transition"
              rows={4}
              placeholder="Write your thoughts here..."
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-8">
        {missions.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setCurrentMission(idx)}
            className={`w-8 h-8 rounded-full ${currentMission === idx ? 'border-2 border-amber-900' : 'opacity-70'}`}
            style={patternStyles[m.pattern]}
          />
        ))}
      </div>
    </div>
  );
}
