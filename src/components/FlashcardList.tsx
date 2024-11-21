import React, { useState } from 'react';
import Modal from './Modal';
import type { Flashcard, Category } from '../types';

interface FlashcardListProps {
  cards: Flashcard[];
  onDelete: (id: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  // Filtrer les cartes en fonction de la catégorie sélectionnée
  const filteredCards = selectedCategory === 'Toutes'
    ? cards // Si "Toutes" est sélectionnée, afficher toutes les cartes
    : cards.filter((card) => card.categoryId === selectedCategory); // Sinon, filtrer par catégorie

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-indigo-600 hover:text-indigo-800 transition"
        >
          Gérer les catégories
        </button>
      </div>

      <ul className="space-y-2">
        {filteredCards.map((card) => (
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

      {/* Modale pour gérer les catégories */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Gérer les catégories">
        <div>
          <div className="flex gap-2 mb-4">
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

          <ul className="space-y-2">
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
      </Modal>
    </div>
  );
};

export default FlashcardList;
