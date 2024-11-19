import React from 'react';

interface ModalProps {
  isOpen: boolean; // Détermine si la modale est visible
  onClose: () => void; // Fonction appelée pour fermer la modale
  title: string; // Titre affiché en haut de la modale
  children: React.ReactNode; // Contenu de la modale
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Si la modale n'est pas ouverte, ne retourne rien

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
