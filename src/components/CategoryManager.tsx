import React, { useState } from 'react';
import type { Category } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, parentId?: string) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory, parentCategoryId || undefined);
      setNewCategory('');
      setParentCategoryId('');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Gérer les catégories</h2>

      <div className="mb-4">
        <label htmlFor="new-category" className="block text-sm font-medium text-gray-700">
          Nouvelle catégorie
        </label>
        <input
          id="new-category"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="parent-category" className="block text-sm font-medium text-gray-700">
          Sous-catégorie de
        </label>
        <select
          id="parent-category"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Aucune</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddCategory} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
        Ajouter catégorie
      </button>

      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2">
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
  );
};

export default CategoryManager;
