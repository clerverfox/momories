import React, { useState } from 'react';
import { Brain, List, Plus } from 'lucide-react';
import type { Flashcard, Category } from './types';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';
import StudySelection from './components/StudySelection';
import './App.css';

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [view, setView] = useState<'create' | 'list' | 'study'>('create');
  const [studyCategory, setStudyCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    { id: crypto.randomUUID(), name: 'Général', color: '#FF9AA2' },
    { id: crypto.randomUUID(), name: 'Sciences', color: '#FFDAC1' },
  ]);

  const addCategory = (name: string) => {
    const vibrantColors = ['#FF9AA2', '#FFDAC1', '#B5EAD7', '#C7CEEA', '#A0E7E5'];
    const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const newCategory: Category = { id: crypto.randomUUID(), name, color: randomColor };
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const addCard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = { ...card, id: crypto.randomUUID() };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const getButtonClass = (active: boolean) =>
    `flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform ${
      active
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
        : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:scale-105'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 font-sans">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain size={32} className="text-white" />
            <h1 className="text-3xl font-bold">Momories</h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {view === 'create' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-500 text-center">
              Créez une nouvelle carte
            </h2>
            <FlashcardForm onAdd={addCard} categories={categories} />
          </div>
        )}

        {view === 'list' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-500 text-center">
              Liste des cartes
            </h2>
            <FlashcardList
              cards={cards}
              onDelete={deleteCard}
              selectedCategory={'Toutes'}
              onCategoryChange={(id) => setStudyCategory(id)}
              categories={categories}
              onAddCategory={addCategory}
              onDeleteCategory={deleteCategory}
            />
          </div>
        )}

        {view === 'study' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {!studyCategory ? (
              <div className="flex flex-col items-center space-y-8">
                <h2 className="text-2xl font-bold text-purple-600 text-center">
                  Choisissez une catégorie à réviser
                </h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="rounded-lg shadow-lg px-6 py-4 text-lg font-semibold text-gray-800 hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: category.color,
                        color: '#000',
                      }}
                      onClick={() => setStudyCategory(category.id)}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <StudyMode
                cards={cards.filter((card) => card.categoryId === studyCategory)}
                selectedCategory={
                  categories.find((cat) => cat.id === studyCategory)?.name || 'Inconnue'
                }
              />
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white shadow-inner py-6 fixed bottom-0 w-full">
        <div className="max-w-4xl mx-auto flex justify-around px-4">
          <button
            onClick={() => setView('create')}
            className={getButtonClass(view === 'create')}
          >
            <Plus size={24} />
          </button>
          <button
            onClick={() => setView('list')}
            className={getButtonClass(view === 'list')}
          >
            <List size={24} />
          </button>
          <button
            onClick={() => {
              setView('study');
              setStudyCategory(null);
            }}
            className={getButtonClass(view === 'study')}
          >
            <Brain size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
