import { useState, useEffect } from 'react';
import ContentModal from '../components/ContentModal';
import EventCard from '../components/EventCard';
import ImageModal from '../components/ImageModal';

const LAST_EVENT_ID_KEY = 'lastTimelineEventId';

export default function Timeline() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // For Event details modal
  const [imageModalSrc, setImageModalSrc] = useState(null); // For Image lightbox modal

  useEffect(() => {
    fetch('/data/timeline.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading timeline data:', error);
        setLoading(false);
      });
  }, []);

  // Scroll Restoration Logic
  useEffect(() => {
    if (!loading && data) {
      const savedId = sessionStorage.getItem(LAST_EVENT_ID_KEY);
      if (savedId) {
        setTimeout(() => {
          const targetElement = document.getElementById(savedId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 100); // Delay to ensure all rendering is complete
      }
    }
  }, [loading, data]);

  // Save-on-Unmount Logic
  useEffect(() => {
    return () => {
      const cards = document.querySelectorAll('.timeline-card');
      let topCardId = null;

      // Find the first card that is at or below the top of the viewport
      for (const card of cards) {
        if (card.getBoundingClientRect().top >= 0) {
          topCardId = card.id;
          break;
        }
      }

      if (topCardId) {
        sessionStorage.setItem(LAST_EVENT_ID_KEY, topCardId);
      }
    };
  }, []);

  // Setup lightbox click handlers
  useEffect(() => {
    const handleImageClick = (e) => {
      if (e.target.classList.contains('lightbox-trigger')) {
        setImageModalSrc(e.target.src);
      }
    };

    document.addEventListener('click', handleImageClick);
    return () => document.removeEventListener('click', handleImageClick);
  }, []);

  // Manage body overflow based on modal state
  useEffect(() => {
    if (selectedEvent || imageModalSrc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent, imageModalSrc]);


  if (loading) {
    return <div className="container mx-auto max-w-7xl px-4 py-12 text-center">Chargement...</div>;
  }

  if (!data) {
    return <div className="container mx-auto max-w-7xl px-4 py-12 text-center">Erreur de chargement des données</div>;
  }

  const extractLocation = (event) => {
    for (const section of event.sections || []) {
      if (section.type === 'identity-list' && section.items) {
        const locationItem = section.items.find(item => item.label === 'Lieu de naissance');
        if (locationItem) return locationItem.value;
      }
    }
    return '';
  };

  return (
    <>
      <div className="page-timeline">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-serif-handwritten text-color-1 mb-4">
              {data.title}
            </h2>
            <p className="text-2xl text-color-2 font-light">
              {data.subtitle}
            </p>
          </div>

          <div className="timeline">
            {data.events.map((event, index) => {
              const location = extractLocation(event);
              const alignment = index % 2 === 0 ? 'left' : 'right';

              return (
                <div key={index} id={`timeline-event-${index}`} className={`timeline-card ${alignment}`}>
                  <div className="content">
                    <div className="text-sm text-color-3 font-semibold mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-color-1 mb-2">{event.title}</h3>
                    {location && (
                      <p className="text-sm text-color-2 mb-2">📍 {location}</p>
                    )}
                    {event.quote && (
                      <p className="text-sm text-color-2 italic mb-4">"{event.quote}"</p>
                    )}
                    <button
                      onClick={() => setSelectedEvent({ event, index })}
                      className="text-sm text-color-3 hover:text-color-1 font-semibold"
                    >
                      Lire la suite
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <ContentModal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <EventCard event={selectedEvent.event} index={selectedEvent.index} isInsideModal={true} />
        </ContentModal>
      )}

      {imageModalSrc && (
        <ImageModal
          isOpen={!!imageModalSrc}
          imageSrc={imageModalSrc}
          onClose={() => setImageModalSrc(null)}
        />
      )}
    </>
  );
}
