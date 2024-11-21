import React, { useState } from 'react';
import { Brain, List, Plus } from 'lucide-react';
import type { Flashcard, Category } from './types';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import StudyMode from './components/StudyMode';
import StudySelection from './components/StudySelection';

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [view, setView] = useState<'create' | 'list' | 'study'>('create');
  const [studyCategory, setStudyCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    { id: crypto.randomUUID(), name: 'Général', color: '#FFD6A5' }, // Exemple de catégorie par défaut
  ]);

  // Ajouter une catégorie avec une couleur pastel aléatoire
  const addCategory = (name: string) => {
    const pastelColors = ['#FFD6A5', '#B9FBC0', '#A0C4FF', '#FFABAB', '#D3ABFF'];
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

    const newCategory: Category = { id: crypto.randomUUID(), name, color: randomColor };
    setCategories((prev) => [...prev, newCategory]);
  };

  // Supprimer une catégorie
  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  // Mettre à jour une catégorie (exemple : couleur)
  const updateCategoryColor = (id: string, color: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, color } : cat))
    );
  };

  // Ajouter une flashcard
  const addCard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = { ...card, id: crypto.randomUUID() };
    setCards([...cards, newCard]);
  };

  // Supprimer une flashcard
  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // Classe CSS pour les boutons de navigation
  const getButtonClass = (active: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 py-4">FlashCards</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {/* Vue "Créer" */}
        {view === 'create' && <FlashcardForm onAdd={addCard} categories={categories} />}

        {/* Vue "Liste" */}
        {view === 'list' && (
          <FlashcardList
            cards={cards}
            onDelete={deleteCard}
            selectedCategory={'Toutes'}
            onCategoryChange={() => {}} // Option inutilisée ici
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
            onUpdateCategoryColor={updateCategoryColor}
          />
        )}

        {/* Vue "Réviser" */}
        {view === 'study' && (
          <>
            {!studyCategory ? (
              <StudySelection
                categories={categories}
                onSelectCategory={(id) => setStudyCategory(id)}
              />
            ) : (
              <StudyMode
                cards={cards.filter((card) => card.categoryId === studyCategory)}
                selectedCategory={
                  categories.find((cat) => cat.id === studyCategory)?.name || 'Inconnue'
                }
              />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
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
            onClick={() => {
              setView('study');
              setStudyCategory(null); // Réinitialise la sélection
            }}
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
