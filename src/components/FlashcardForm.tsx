import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Flashcard, Category } from '../types';

interface FlashcardFormProps {
  onAdd: (card: Omit<Flashcard, 'id'>) => void;
  categories: Category[];
}

export default function FlashcardForm({ onAdd, categories }: FlashcardFormProps) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    categoryId: categories.length > 0 ? categories[0].id : '', // Catégorie par défaut
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim() && formData.categoryId) {
      onAdd({
        question: formData.question,
        answer: formData.answer,
        categoryId: formData.categoryId, // Associe la carte à la catégorie
      });
      setFormData({
        question: '',
        answer: '',
        categoryId: categories[0]?.id || '', // Réinitialise après soumission
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Créer une nouvelle carte</h2>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie
        </label>
        <select
          id="category"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
          required
        />
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
          Réponse
        </label>
        <textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        <PlusCircle size={20} />
        Ajouter la carte
      </button>
    </form>
  );
}
