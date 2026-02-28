import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import ImageModal from '@/components/ImageModal';
import { useTimelineData } from '@/hooks/useTimeline';

export default function Memoire() {
  const { data, loading, error } = useTimelineData();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [activeClasseur, setActiveClasseur] = useState(1);
  const location = useLocation();

  // Mock data for binders
  const classeurs = [
    { id: 1, title: 'Classeur 1', subtitle: 'L\'Enfance et la Guerre' },
    { id: 2, title: 'Classeur 2', subtitle: 'À venir...' },
    { id: 3, title: 'Classeur 3', subtitle: 'À venir...' },
  ];

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
            targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });

            // Re-adjust after images at destination start loading
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 500);

            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 1200);
          }
        }, 100);
      });
    }
  }, [loading, data, location.hash, activeClasseur]);

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

  // Handle intersection observer for active TOC link
  useEffect(() => {
    if (loading || !data || activeClasseur !== 1) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -79% 0px' // Trigger near top
    });

    data.events.forEach((_, index) => {
      const element = document.getElementById(`event-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading, data, activeClasseur]);

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

        {/* Classeur Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {classeurs.map((classeur) => (
            <button
              key={classeur.id}
              onClick={() => {
                setActiveClasseur(classeur.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-6 py-4 rounded-xl shadow-sm border transition-all duration-300 flex flex-col items-center min-w-[200px] ${activeClasseur === classeur.id
                ? 'bg-color-1 text-white border-color-1 scale-105'
                : 'bg-white text-color-2 border-color-5 hover:border-color-1/50 hover:bg-color-5/10'
                }`}
            >
              <span className="font-bold text-lg">{classeur.title}</span>
              <span className={`text-sm mt-1 ${activeClasseur === classeur.id ? 'text-white/80' : 'text-color-3'}`}>
                {classeur.subtitle}
              </span>
            </button>
          ))}
        </div>

        {activeClasseur === 1 ? (
          <div className="flex flex-col lg:flex-row gap-8 transition-opacity duration-500">
            {/* Table of Contents - Sidebar */}
            <aside className="hidden lg:block w-1/4">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto bg-white/70 backdrop-blur rounded-lg p-6 shadow-sm border border-color-5">
                <h3 className="font-bold text-lg text-color-1 mb-4 border-b border-color-5 pb-2 sticky top-0 bg-white/90 pb-2 z-10 -mt-2 pt-2">Sommaire</h3>
                <nav>
                  <ul className="space-y-3">
                    {data.events.map((event, index) => {
                      const id = `event-${index}`;
                      const isActive = activeSection === id;
                      return (
                        <li key={index}>
                          <a
                            href={`#${id}`}
                            className={`block text-sm transition-colors ${isActive ? 'text-color-1 font-bold' : 'text-color-2 hover:text-color-1'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const target = document.getElementById(id);
                              if (target) {
                                // Jump directly to avoid loading all intermediate lazy images
                                target.scrollIntoView({ behavior: 'auto', block: 'start' });
                                window.history.pushState(null, '', `#${id}`);

                                // Double check position after destination images decode
                                setTimeout(() => {
                                  target.scrollIntoView({ behavior: 'auto', block: 'start' });
                                }, 300);
                                setTimeout(() => {
                                  target.scrollIntoView({ behavior: 'auto', block: 'start' });
                                }, 800);
                              }
                            }}
                          >
                            <span className="text-xs text-color-3 block">{event.date}</span>
                            {event.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div id="events-container" className="lg:w-3/4 pb-[60vh]">
              {data.events.map((event, index) => (
                <EventCard key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center border border-color-5 shadow-sm max-w-2xl mx-auto">
            <svg className="w-16 h-16 mx-auto text-color-3 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-2xl font-bold text-color-1 mb-2">Transcription en cours...</h3>
            <p className="text-color-2">
              Le contenu de ce classeur n'a pas encore été retranscrit.
              Revenez plus tard pour lire la suite de ces mémoires !
            </p>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={modalOpen}
        imageSrc={modalImage}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
