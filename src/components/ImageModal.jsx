import { useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

export default function ImageModal({ isOpen, imageSrc, onClose }) {
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
      id="imageModal"
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10"
          aria-label="Fermer"
        >
          &times;
        </button>
        <OptimizedImage
          src={imageSrc}
          alt="Image agrandie"
          isLightbox={false}
          className="max-w-full max-h-full"
          style={{ background: 'transparent' }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
