import { useState, useEffect } from 'react';

// ---------- Types ----------
interface Currency {
  id: number;
  name: string;
  value: number;
  trust: number;
  availability: number;
  durability: number;
  transportability: number;
  icon: string;
  description: string;
  background: 'kente' | 'adinkra' | 'mudcloth' | 'fans';
}

// Define which properties in Currency can be affected by events
type NumericCurrencyProperty = 'value' | 'trust' | 'availability' | 'durability' | 'transportability';

interface EventEffect {
  [key: string]: number;
}

interface MarketEvent {
  id: number;
  title: string;
  description: string;
  effects: EventEffect;
}

interface AfricanBackgroundProps {
  patternType?: 'kente' | 'adinkra' | 'mudcloth' | 'fans';
}

// ---------- African Background Patterns ----------
const AfricanBackground = ({ patternType = 'kente' }: AfricanBackgroundProps) => {
  const patterns: Record<string, JSX.Element> = {
    kente: (<svg className="absolute inset-0 opacity-10 pointer-events-none"><rect width="100%" height="100%" fill="#EE720B" /></svg>),
    adinkra: (<svg className="absolute inset-0 opacity-10 pointer-events-none"><rect width="100%" height="100%" fill="#2D8F4E" /></svg>),
    mudcloth: (<svg className="absolute inset-0 opacity-10 pointer-events-none"><rect width="100%" height="100%" fill="#FFC567" /></svg>),
    fans: (<svg className="absolute inset-0 opacity-10 pointer-events-none"><rect width="100%" height="100%" fill="#FBF4D2" /></svg>),
  };
  return patterns[patternType];
};

// ---------- Header ----------
const AfricanHeader = ({ title }: { title: string }) => (
  <div className="relative bg-orange-500 text-white py-3 px-4 rounded-t-lg overflow-hidden">
    <h3 className="text-xl font-serif relative z-10">{title}</h3>
  </div>
);

// ---------- Main Game Component ----------
const CurrencyValueSimulator = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<number | null>(null);
  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const initialCurrencies: Currency[] = [
      { id: 1, name: "Cowrie Shells", value: 100, trust: 80, availability: 70, durability: 60, transportability: 90, icon: "🐚", description: "Natural seashells used as currency.", background: "kente" },
      { id: 2, name: "Salt Bars", value: 150, trust: 85, availability: 50, durability: 30, transportability: 60, icon: "🧂", description: "Salt blocks used as currency.", background: "adinkra" },
      { id: 3, name: "Gold Dust", value: 300, trust: 95, availability: 30, durability: 90, transportability: 80, icon: "✨", description: "Gold dust used in trade.", background: "mudcloth" },
      { id: 4, name: "Copper Rings", value: 120, trust: 75, availability: 60, durability: 85, transportability: 75, icon: "⭕", description: "Copper rings as currency.", background: "fans" },
    ];
    setCurrencies(initialCurrencies);

    const events: MarketEvent[] = [
      { id: 1, title: "New Trade Route", description: "A new trade route opened.", effects: { transportability: 15, availability: 10 } },
      { id: 2, title: "Counterfeit Crisis", description: "Fake currency detected.", effects: { trust: -20 } },
      { id: 3, title: "Resource Discovery", description: "New resources found.", effects: { availability: 20, value: -10 } },
      { id: 4, title: "Royal Endorsement", description: "Ruler endorses currency.", effects: { trust: 15, value: 10 } },
      { id: 5, title: "Environmental Change", description: "Climate affects materials.", effects: { durability: -15, availability: -10 } },
      { id: 6, title: "Foreign Merchants", description: "New traders enter market.", effects: { trust: -5, transportability: 10 } },
      { id: 7, title: "Cultural Shift", description: "Preferences change.", effects: { value: -15, trust: 5 } },
    ];
    setMarketEvents(events.sort(() => Math.random() - 0.5));
  }, []);

  const currentEvent = marketEvents[currentEventIndex];

  const handleCurrencySelect = (currencyId: number) => {
    setSelectedCurrency(currencyId);
    setMessage("");
  };

  const applyEventEffects = () => {
    if (selectedCurrency === null || !currentEvent) return;

    setCurrencies(prevCurrencies =>
      prevCurrencies.map(currency => {
        if (currency.id === selectedCurrency) {
          const updatedCurrency = { ...currency };
          
          // Type-safe way to handle event effects
          Object.entries(currentEvent.effects).forEach(([attr, change]) => {
            // Check if the attribute is a valid property we want to modify
            const attribute = attr as NumericCurrencyProperty;
            
            // Only process if it's a valid property in our currency object
            if (attribute in updatedCurrency) {
              if (attribute === 'value') {
                // Value has no upper limit
                updatedCurrency.value += change;
              } 
              else if (
                attribute === 'trust' || 
                attribute === 'availability' || 
                attribute === 'durability' || 
                attribute === 'transportability'
              ) {
                // These properties should be kept between 0-100
                const currentValue = updatedCurrency[attribute];
                updatedCurrency[attribute] = Math.max(0, Math.min(100, currentValue + change));
              }
            }
          });
          
          return updatedCurrency;
        }
        return currency;
      })
    );

    if (currentEventIndex + 1 >= marketEvents.length) {
      setGameComplete(true);
      setMessage("Game Over: All market events have been applied!");
    } else {
      setCurrentEventIndex(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AfricanHeader title="Currency Value Simulator" />
      {!gameComplete && currentEvent && (
        <div className="bg-white p-4 rounded-lg mb-6 border border-orange-300 shadow-md">
          <h4 className="text-lg font-bold text-orange-800">{currentEvent.title}</h4>
          <p className="text-orange-700 mb-4">{currentEvent.description}</p>
          <button
            onClick={applyEventEffects}
            disabled={selectedCurrency === null}
            className={`px-4 py-2 rounded-lg text-white ${selectedCurrency !== null ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Apply Event to Selected Currency
          </button>
        </div>
      )}

      {message && <p className="text-green-700 mb-4">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currencies.map(currency => (
          <div
            key={currency.id}
            onClick={() => handleCurrencySelect(currency.id)}
            className={`relative border-2 p-4 rounded-lg cursor-pointer overflow-hidden transition-all duration-200 ${
              selectedCurrency === currency.id ? 'border-orange-500 bg-amber-100' : 'border-orange-300'
            }`}
          >
            <AfricanBackground patternType={currency.background} />
            <div className="relative z-10">
              <h5 className="text-lg font-bold text-orange-800">{currency.icon} {currency.name}</h5>
              <p className="text-orange-600 text-sm mb-2">{currency.description}</p>
              <p className="text-sm"><strong>Value:</strong> {currency.value}</p>
              <p className="text-sm">Trust: {currency.trust}%</p>
              <p className="text-sm">Availability: {currency.availability}%</p>
              <p className="text-sm">Durability: {currency.durability}%</p>
              <p className="text-sm">Transportability: {currency.transportability}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyValueSimulator;