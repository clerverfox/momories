import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flashcard } from '../types';

interface StudyModeProps {
  cards: Flashcard[];
  selectedCategory: string;
}

export default function StudyMode({ cards, selectedCategory }: StudyModeProps) {
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const filtered = selectedCategory === 'Toutes'
      ? [...cards]
      : cards.filter(card => card.category === selectedCategory);
    setCurrentCards(filtered);
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [cards, selectedCategory]);

  const shuffleCards = () => {
    setCurrentCards([...currentCards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const reset = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  if (currentCards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Aucune carte disponible pour cette catégorie.</p>
      </div>
    );
  }

  const currentCard = currentCards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Carte {currentIndex + 1} sur {currentCards.length}
          </span>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
            {currentCard.category}
          </span>
        </div>

        <div
          className="min-h-[200px] flex items-center justify-center cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <p className="text-xl text-center">
            {showAnswer ? currentCard.answer : currentCard.question}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={previousCard}
            disabled={currentIndex === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Précédent"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {showAnswer ? 'Voir question' : 'Voir réponse'}
          </button>
          <button
            onClick={nextCard}
            disabled={currentIndex === currentCards.length - 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={shuffleCards}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Shuffle size={20} />
          Mélanger
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <RotateCcw size={20} />
          Réinitialiser
        </button>
      </div>
    </div>
  );
}