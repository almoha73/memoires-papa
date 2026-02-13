import { Link } from 'react-router-dom';
import SectionRenderer from './SectionRenderer';

export default function EventCard({ event, index, isInsideModal = false }) {
  const cardId = event.id || `event-${index}`;

  return (
    <div id={cardId} className="mb-8">
      <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md border border-color-5">
        <span className="text-sm font-semibold text-color-3">{event.date}</span>
        <h2 className="text-2xl font-bold font-serif-handwritten mt-1 mb-4 text-color-1">
          {event.title}
        </h2>
        {!isInsideModal && (
          <Link
            to={`/timeline#timeline-event-${index}`}
            className="text-sm text-color-3 hover:text-color-1 font-semibold mb-4 inline-block"
          >
            Retour à la chronologie
          </Link>
        )}

        {event.subtitle && (
          <h3 className="text-xl font-bold text-color-2 mb-4">{event.subtitle}</h3>
        )}

        {event.quote && (
          <blockquote className="bg-color-5/30 border-l-4 border-color-3 p-4 mb-6">
            <p className="text-xl font-serif-handwritten text-color-1/80 leading-relaxed">
              &quot;{event.quote}&quot;
            </p>
          </blockquote>
        )}

        {event.sections && event.sections.map((section, sectionIdx) => (
          <SectionRenderer key={sectionIdx} section={section} />
        ))}
      </div>
    </div>
  );
}
