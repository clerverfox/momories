import React, { useState } from 'react';
import { Brain, List, Plus } from 'lucide-react';
import type { Flashcard, Category } from './types';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [view, setView] = useState<'create' | 'list' | 'study'>('create');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [categories, setCategories] = useState<Category[]>([
    { id: crypto.randomUUID(), name: 'Général' },
    { id: crypto.randomUUID(), name: 'Mathématiques' },
  ]);

  const addCategory = (name: string) => {
    const newCategory: Category = { id: crypto.randomUUID(), name };
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const addCard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...card,
      id: crypto.randomUUID(),
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const getButtonClass = (active: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 py-4">FlashCards</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {view === 'create' && (
          <FlashcardForm onAdd={addCard} categories={categories} />
        )}

        {view === 'list' && (
          <FlashcardList
            cards={cards}
            onDelete={deleteCard}
            selectedCategory={selectedCategory}
            onCategoryChange={(categoryId) => setSelectedCategory(categoryId)}
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        )}

        {view === 'study' && (
          <StudyMode cards={cards} selectedCategory={selectedCategory} />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-around">
          <button
            onClick={() => setView('create')}
            className={getButtonClass(view === 'create')}
          >
            <Plus size={20} />
            Créer
          </button>
          <button
            onClick={() => setView('list')}
            className={getButtonClass(view === 'list')}
          >
            <List size={20} />
            Liste
          </button>
          <button
            onClick={() => setView('study')}
            className={getButtonClass(view === 'study')}
          >
            <Brain size={20} />
            Réviser
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
