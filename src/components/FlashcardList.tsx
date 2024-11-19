import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashcardListProps {
  cards: Flashcard[];
  onDelete: (id: string) => void;
  selectedCategory: string;
}

export default function FlashcardList({ cards, onDelete, selectedCategory }: FlashcardListProps) {
  const filteredCards = selectedCategory === 'Toutes'
    ? cards
    : cards.filter(card => card.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
              {card.category}
            </span>
            <button
              onClick={() => onDelete(card.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Supprimer"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <p className="font-medium text-gray-800 mb-2">{card.question}</p>
          <p className="text-gray-600">{card.answer}</p>
        </div>
      ))}
    </div>
  );
}