import React, { useState } from 'react';
import { Brain, List, Plus } from 'lucide-react';
import type { Flashcard } from './types';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';

const DEFAULT_CATEGORIES = ['Général', 'Mathématiques', 'Sciences', 'Langues', 'Histoire'];

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [view, setView] = useState<'create' | 'list' | 'study'>('create');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const categories = ['Toutes', ...DEFAULT_CATEGORIES];

  const addCard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...card,
      id: crypto.randomUUID(),
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">FlashCards</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setView('create')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  view === 'create'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus size={20} />
                Créer
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  view === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List size={20} />
                Liste
              </button>
              <button
                onClick={() => setView('study')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  view === 'study'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Brain size={20} />
                Réviser
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view !== 'create' && (
          <div className="mb-6">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrer par catégorie
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {view === 'create' && (
          <FlashcardForm onAdd={addCard} categories={DEFAULT_CATEGORIES} />
        )}
        
        {view === 'list' && (
          <FlashcardList
            cards={cards}
            onDelete={deleteCard}
            selectedCategory={selectedCategory}
          />
        )}
        
        {view === 'study' && (
          <StudyMode cards={cards} selectedCategory={selectedCategory} />
        )}
      </main>
    </div>
  );
}

export default App;