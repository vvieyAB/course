import React, { useState, useEffect } from 'react';

interface CardItem {
  uniqueId: string;
  id: number;
  name: string;
  value: string;
}

const MatchingGame = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [lives, setLives] = useState<number>(5);

  const items = [
    { id: 1, name: 'Cowrie Shell', value: '🐚' },
    { id: 2, name: 'Gold Nugget', value: '💰' },
    { id: 3, name: 'Salt Bar', value: '🧂' },
    { id: 4, name: 'Cotton', value: '🧶' }
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedItems = [...items, ...items];
    const shuffledItems: CardItem[] = duplicatedItems
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        uniqueId: `${item.id}-${index}`
      }));
    setCards(shuffledItems);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLives(5);
  };

  const handleCardClick = (uniqueId: string) => {
    if (flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(uniqueId)) {
      return;
    }

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.uniqueId === firstId);
      const secondCard = cards.find(card => card.uniqueId === secondId);

      if (firstCard && secondCard && firstCard.id === secondCard.id) {
        setMatched(prev => [...prev, firstId, secondId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLives(prev => prev - 1);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Currency Matching Game</h2>
        <div className="flex items-center gap-4">
          <span>Lives: {lives}</span>
          <span>Moves: {moves}</span>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(({ uniqueId, name, value }) => (
          <div
            key={uniqueId}
            className={`
              aspect-square cursor-pointer rounded-xl
              ${matched.includes(uniqueId) ? 'pointer-events-none' : ''}
            `}
            onClick={() => handleCardClick(uniqueId)}
          >
            <div className="relative w-full h-full">
              <div
                className={`
                  absolute w-full h-full rounded-xl flex items-center justify-center
                  ${flipped.includes(uniqueId) || matched.includes(uniqueId)
                    ? 'bg-white border-2 border-orange-500'
                    : 'bg-orange-100 border-2 border-orange-200'}
                `}
              >
                {flipped.includes(uniqueId) || matched.includes(uniqueId) ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">{value}</div>
                    <div className="text-sm">{name}</div>
                  </div>
                ) : (
                  <span className="text-3xl">?</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {lives === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
            <p className="mb-4">You made {moves} moves</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingGame;
