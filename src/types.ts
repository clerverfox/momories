export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}