import React, { useState, useEffect } from 'react';
import type { Flashcard } from '../types';

interface StudyModeProps {
  cards: Flashcard[];
  selectedCategory: string;
}

export default function StudyMode({ cards, selectedCategory }: StudyModeProps) {
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Mélanger les cartes lors de l'ouverture ou après un clic sur "Mélanger"
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  // Initialiser les cartes mélangées à l'ouverture
  useEffect(() => {
    shuffleCards();
  }, [cards]);

  if (shuffledCards.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Aucune carte n'est disponible pour la catégorie sélectionnée.
      </div>
    );
  }

  const currentCard = shuffledCards[currentCardIndex];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Révision : {selectedCategory}
      </h2>

      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className={`w-80 h-48 flex items-center justify-center text-center bg-white rounded-lg shadow-md cursor-pointer transition-transform transform ${
            showAnswer ? 'rotate-y-180' : ''
          }`}
          style={{
            perspective: '1000px',
            backgroundColor: '#FFF',
          }}
        >
          {showAnswer ? (
            <p className="text-gray-700 font-medium">{currentCard.answer}</p>
          ) : (
            <p className="text-gray-900 font-semibold">{currentCard.question}</p>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">Cliquez sur la carte pour voir la réponse</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => {
            if (currentCardIndex > 0) {
              setCurrentCardIndex(currentCardIndex - 1);
              setShowAnswer(false);
            }
          }}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          disabled={currentCardIndex === 0}
        >
          Précédent
        </button>
        <button
          onClick={() => shuffleCards()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Mélanger
        </button>
        <button
          onClick={() => {
            if (currentCardIndex < shuffledCards.length - 1) {
              setCurrentCardIndex(currentCardIndex + 1);
              setShowAnswer(false);
            }
          }}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          disabled={currentCardIndex === shuffledCards.length - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
