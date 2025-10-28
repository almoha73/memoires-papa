import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '../components/EventCard';
import ImageModal from '../components/ImageModal';

export default function Memoire() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch('/data/timeline.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading memoire data:', error);
        setLoading(false);
      });
  }, []);

  // Scroll to anchor after data is loaded and images are loaded
  useEffect(() => {
    if (!loading && data && location.hash) {
      const hash = location.hash;

      // Wait for all images to load
      const images = Array.from(document.images);
      Promise.all(
        images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = img.onerror = resolve;
          });
        })
      ).then(() => {
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

  if (loading) {
    return <div className="container mx-auto max-w-7xl px-4 py-12 text-center">Chargement...</div>;
  }

  if (!data) {
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
