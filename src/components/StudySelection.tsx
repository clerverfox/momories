import React from 'react';
import type { Category } from '../types';

interface StudySelectionProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

const StudySelection: React.FC<StudySelectionProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Choisissez une catégorie à réviser</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          style={{
            backgroundColor: category.color,
            color: '#000', // Texte noir pour un meilleur contraste
            border: '1px solid #ccc', // Ajouter une bordure pour plus de lisibilité
          }}
          className="w-40 h-40 rounded-lg shadow-md flex items-center justify-center text-lg font-semibold hover:opacity-90"
        >
          {category.name}
        </button>        
        ))}
      </div>
    </div>
  );
};

export default StudySelection;
