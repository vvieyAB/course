import { useState, useEffect } from 'react';

interface Trader {
  id: number;
  name: string;
  has: string;
  wants: string;
  position: {
    x: number;
    y: number;
  };
}

interface Connection {
  from: number;
  to: number;
}

interface Trade {
  fromId: number;
  toId: number;
  item: string;
}

interface BarterWebChallengeProps {
  onComplete?: () => void;
}

const BarterWebChallenge = ({ onComplete }: BarterWebChallengeProps) => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedTrader, setSelectedTrader] = useState<number | null>(null);
  const [completedTrades, setCompletedTrades] = useState<Trade[]>([]);
  const [isAllComplete, setIsAllComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const initialTraders: Trader[] = [
      { id: 1, name: "Mama Nia", has: "Yams", wants: "Pot", position: { x: 20, y: 30 } },
      { id: 2, name: "Uncle Kofi", has: "Pot", wants: "Milk", position: { x: 75, y: 20 } },
      { id: 3, name: "Auntie Zari", has: "Milk", wants: "Fish", position: { x: 65, y: 65 } },
      { id: 4, name: "Brother Kwame", has: "Fish", wants: "Salt", position: { x: 25, y: 75 } },
      { id: 5, name: "Grandmother Asha", has: "Salt", wants: "Yams", position: { x: 40, y: 45 } }
    ];
    setTraders(initialTraders);
  }, []);

  useEffect(() => {
    if (connections.length === traders.length && traders.length > 0) {
      const allValid = connections.every(conn => {
        const giver = traders.find(t => t.id === conn.from);
        const receiver = traders.find(t => t.id === conn.to);
        return giver && receiver && giver.has === receiver.wants;
      });

      setIsAllComplete(allValid);
      if (allValid) {
        const trades = connections.map(conn => {
          const fromTrader = traders.find(t => t.id === conn.from);
          return fromTrader ? { fromId: conn.from, toId: conn.to, item: fromTrader.has } : null;
        }).filter((trade): trade is Trade => trade !== null);

        setCompletedTrades(trades);
        if (onComplete) onComplete();
      } else {
        setCompletedTrades([]);
      }
    } else {
      setIsAllComplete(false);
      setCompletedTrades([]);
    }
  }, [connections, traders, onComplete]);

  const handleTraderClick = (traderId: number) => {
    if (selectedTrader === null) {
      setSelectedTrader(traderId);
    } else if (selectedTrader === traderId) {
      setSelectedTrader(null);
    } else {
      const existingFromConnection = connections.find(conn => conn.from === selectedTrader);
      const existingToConnection = connections.find(conn => conn.to === traderId);
      if (!existingFromConnection && !existingToConnection) {
        setConnections(prev => [...prev, { from: selectedTrader, to: traderId }]);
        setAttempts(prev => prev + 1);
      }
      setSelectedTrader(null);
    }
  };

  const resetGame = () => {
    setConnections([]);
    setSelectedTrader(null);
    setCompletedTrades([]);
    setIsAllComplete(false);
    setAttempts(0);
  };

  const getLineCoordinates = (connection: Connection) => {
    const fromTrader = traders.find(t => t.id === connection.from);
    const toTrader = traders.find(t => t.id === connection.to);
    return fromTrader && toTrader ? {
      x1: `${fromTrader.position.x}%`,
      y1: `${fromTrader.position.y}%`,
      x2: `${toTrader.position.x}%`,
      y2: `${toTrader.position.y}%`
    } : null;
  };

  const isValidConnection = (connection: Connection) => {
    const giver = traders.find(t => t.id === connection.from);
    const receiver = traders.find(t => t.id === connection.to);
    return giver !== undefined && receiver !== undefined && giver.has === receiver.wants;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-orange-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-orange-800">Barter Web Challenge</h2>
          <div className="flex items-center gap-4">
            <span className="text-orange-700">Attempts: {attempts}</span>
            <button onClick={resetGame} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">Reset</button>
          </div>
        </div>

        <div className="relative bg-amber-100 border-2 border-amber-200 rounded-xl aspect-square w-full mb-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, idx) => {
              const coords = getLineCoordinates(conn);
              if (!coords) return null;
              const isValid = isValidConnection(conn);
              return (
                <line key={`line-${idx}`} x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2} stroke={isValid ? "#16a34a" : "#dc2626"} strokeWidth="3" strokeDasharray={isValid ? "" : "5,5"} />
              );
            })}
          </svg>

          {traders.map(trader => {
            const isSelected = selectedTrader === trader.id;
            const hasConnection = connections.some(conn => conn.from === trader.id || conn.to === trader.id);
            return (
              <div key={trader.id} className={`absolute w-24 rounded-lg p-3 cursor-pointer transition-all ${isSelected ? "bg-orange-300 border-2 border-orange-500" : hasConnection ? "bg-orange-200 border-2 border-orange-400" : "bg-white border-2 border-orange-200 hover:border-orange-300"} ${isAllComplete ? "animate-pulse" : ""}`} style={{ left: `calc(${trader.position.x}% - 3rem)`, top: `calc(${trader.position.y}% - 3rem)`, zIndex: isSelected ? 10 : 1 }} onClick={() => handleTraderClick(trader.id)}>
                <div className="text-center">
                  <div className="text-sm font-bold text-orange-800">{trader.name}</div>
                  <div className="mt-1 text-xs">
                    <div className="bg-amber-100 rounded px-2 py-1 mb-1">Has: <span className="font-semibold">{trader.has}</span></div>
                    <div className="bg-blue-100 rounded px-2 py-1">Wants: <span className="font-semibold">{trader.wants}</span></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <p className="text-orange-800 mb-4"><strong>Instructions:</strong> Connect traders by clicking on them to create successful trades. Each person must trade what they have for what someone else wants.</p>

          {isAllComplete && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-green-800">
              <h3 className="font-bold text-lg mb-2">Success! All trades complete!</h3>
              <p>You've created a perfect barter web in {attempts} attempts.</p>
              <div className="mt-3">
                <h4 className="font-semibold">Completed Trades:</h4>
                <ul className="list-disc pl-5 mt-1">
                  {completedTrades.map((trade, idx) => {
                    const fromTrader = traders.find(t => t.id === trade.fromId);
                    const toTrader = traders.find(t => t.id === trade.toId);
                    return fromTrader && toTrader ? (
                      <li key={idx}>{fromTrader.name} gave {trade.item} to {toTrader.name}</li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          )}

          {!isAllComplete && connections.length > 0 && (
            <div className="text-orange-700">Keep working on creating valid connections between all traders.</div>
          )}
        </div>
      </div>

      <div className="bg-orange-100 rounded-xl p-6">
        <h3 className="text-xl font-serif text-orange-800 mb-3">Reflection Question</h3>
        <p className="text-orange-700 border-l-4 border-orange-500 pl-4 py-2 mb-4">If your village had no money, how would you trade for medicine?</p>
        <textarea className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" rows={4} placeholder="Type your thoughts..." />
      </div>
    </div>
  );
};

export default BarterWebChallenge;
