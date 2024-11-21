export type Category = {
  id: string;
  name: string;
  color: string;
};

// Définit une flashcard avec une association à une catégorie
export type Flashcard = {
  id: string; // Identifiant unique de la flashcard
  question: string; // Question de la flashcard
  answer: string; // Réponse de la flashcard
  categoryId: string; // Lien avec une catégorie spécifique
};