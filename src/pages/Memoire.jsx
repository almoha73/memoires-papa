import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import ImageModal from '@/components/ImageModal';
import { useTimelineData } from '@/hooks/useTimeline';

export default function Memoire() {
  const { data, loading, error } = useTimelineData();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const location = useLocation();

  // Scroll to anchor after data is loaded and images are loaded
  useEffect(() => {
    if (!loading && data && location.hash) {
      const hash = location.hash;

      // Wait for all images to load
      const images = Array.from(document.images);
      const imagePromises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  }, [loading, data, location.hash]);

  // Setup lightbox click handlers
  useEffect(() => {
    const handleImageClick = (e) => {
      if (e.target.classList.contains('lightbox-trigger')) {
        setModalImage(e.target.src);
        setModalOpen(true);
      }
    };

    document.addEventListener('click', handleImageClick);
    return () => document.removeEventListener('click', handleImageClick);
  }, []);

  // Manage body overflow based on modal state
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [modalOpen]);

  if (loading) {
    return <div className="container mx-auto max-w-7xl px-4 py-12 text-center">Chargement...</div>;
  }

  if (error || !data) {
    return <div className="container mx-auto max-w-7xl px-4 py-12 text-center">Erreur de chargement des données</div>;
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif-handwritten text-color-1 mb-4">
            {data.title}
          </h2>
          <p className="text-2xl text-color-2 font-light">
            {data.subtitle}
          </p>
        </div>

        <div id="events-container">
          {data.events.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={modalOpen}
        imageSrc={modalImage}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
