import React, { useState } from 'react';
import type { Flashcard, Category } from '../types';

interface FlashcardListProps {
  cards: Flashcard[];
  onDelete: (id: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void; // Ajout de cette propriété
  categories: Category[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
}



const FlashcardList: React.FC<FlashcardListProps> = ({
  cards,
  onDelete,
  selectedCategory,
  onCategoryChange,
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
            Filtrer par catégorie
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Toutes">Toutes</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Gérer les catégories</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nouvelle catégorie"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleAddCategory}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="flex justify-between items-center">
                <span>{category.name}</span>
                <button
                  onClick={() => onDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="space-y-2">
        {cards.map((card) => (
          <li key={card.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow">
            <div>
              <h3 className="font-medium">{card.question}</h3>
              <p className="text-sm text-gray-600">{card.answer}</p>
            </div>
            <button
              onClick={() => onDelete(card.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardList;
