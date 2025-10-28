/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export default function ContentModal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Ne fermer que si on clique directement sur le backdrop (pas sur une image lightbox)
        if (e.target === e.currentTarget && !e.target.classList.contains('lightbox-trigger')) {
          onClose();
        }
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8"
        onClick={(e) => {
          // Ne pas stopper la propagation si c'est une image lightbox
          if (!e.target.classList.contains('lightbox-trigger')) {
            e.stopPropagation();
          }
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-4xl font-bold hover:text-gray-800 z-10"
          aria-label="Fermer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
