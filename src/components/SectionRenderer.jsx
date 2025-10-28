import Masonry from 'react-masonry-css';
/* eslint-disable react/prop-types */

// Text Box Component
function TextBox({ section }) {
  return (
    <div className={`bg-color-5/30 border-l-4 border-${section.style || 'color-4'} p-4 my-6`}>
      <p className="text-color-1/80 leading-relaxed">{section.content}</p>
    </div>
  );
}

// Explanation Box Component
function ExplanationBox({ section }) {
  return (
    <div className="bg-color-3/20 border-l-4 border-color-2 p-4 my-6 text-sm text-color-2 shadow-inner">
      <p>{section.content}</p>
    </div>
  );
}

// Note Component
function Note({ section }) {
  return (
    <p className="text-sm text-color-2/80 italic my-4">{section.content}</p>
  );
}

// Paragraphs Component
function Paragraphs({ section }) {
  return (
    <div className="space-y-4 mb-6">
      {section.content.map((p, idx) => (
        <p key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      {section.author && (
        <p className="text-sm text-color-2/80 italic" dangerouslySetInnerHTML={{ __html: section.author }} />
      )}
    </div>
  );
}

// Calendar Component
function Calendar({ section }) {
  const rows = [
    ['', '', '', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '10', '11'],
    ['12', '13', '14', '15', '16', '17', '18'],
    ['19', '20', '21', '22', '23', '24', '25'],
    ['26', '27', '28', '', '', '', '']
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-center">
        <div className="bg-color-5/20 p-4 rounded-lg border border-color-5 w-full max-w-sm">
          <h4 className="text-center font-bold mb-2 text-color-1">{section.month}</h4>
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-color-2">
                <th>Di</th><th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((day, dayIdx) => {
                    if (day === '') return <td key={dayIdx}></td>;
                    const isHighlighted = parseInt(day) === section.highlightDay;
                    return (
                      <td
                        key={dayIdx}
                        className={isHighlighted ? 'bg-color-3 text-white rounded-full font-bold py-1' : 'py-1'}
                      >
                        {day}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Image Grid Component
function ImageGrid({ section }) {
  const breakpointColumns = {
    default: section.columns || 4,
    1024: section.columns || 3,
    768: 2,
    640: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid mt-6"
      columnClassName="masonry-grid_column"
    >
      {section.images.map((img, idx) => (
        <div key={idx}>
          <img
            src={img.src}
            alt={img.alt}
            className="rounded-md shadow-sm w-full h-auto lightbox-trigger cursor-pointer hover:scale-105 transition-transform"
          />
          {img.caption && (
            <p className="text-xs text-center text-color-2/80 mt-1">{img.caption}</p>
          )}
        </div>
      ))}
    </Masonry>
  );
}

// Image Text Layout Component
function ImageTextLayout({ section }) {
  const imageWidthClass = section.imageWidth || '1/3';
  const contentWidthClass = imageWidthClass === '1/3' ? '2/3' : '1/2';

  if (section.multipleImages && section.images) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className={`w-full max-w-xs mx-auto lg:mx-0 lg:w-${imageWidthClass} grid grid-cols-2 gap-4`}>
          {section.images.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.alt}
              className="rounded-md shadow-sm w-full h-auto object-cover lightbox-trigger cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
        <div className={`lg:w-${contentWidthClass}`}>
          <div className="space-y-4">
            {section.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className={`w-full max-w-xs mx-auto lg:mx-0 lg:w-${imageWidthClass} flex-shrink-0`}>
        <img
          src={section.image.src}
          alt={section.image.alt}
          className="rounded-md shadow-sm w-full h-auto object-cover lightbox-trigger cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
      <div className={`lg:w-${contentWidthClass}`}>
        <div className="space-y-4">
          {section.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Identity List Component
function IdentityList({ section }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-color-1 mb-2">{section.title}</h4>
      <ul className="list-disc list-inside ml-4 text-color-2">
        {section.items.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </div>
  );
}

// Article Section Component
function ArticleSection({ section }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-color-1 mb-2">{section.title}</h4>
      {section.subtitle && (
        <p className="leading-relaxed mb-2"><strong>{section.subtitle}</strong></p>
      )}
      {section.content.map((p, idx) => (
        <p key={idx} className="leading-relaxed mb-2">{p}</p>
      ))}
      {section.author && (
        <p className="text-sm text-color-2/80 italic" dangerouslySetInnerHTML={{ __html: section.author }} />
      )}
    </div>
  );
}

// Section With Title Component
function SectionWithTitle({ section }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-color-1 mb-2">{section.title}</h4>

      {section.content && section.content.map((p, idx) => (
        <p key={idx} className="leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: p }} />
      ))}

      {section.list && (
        <ul className="list-disc list-inside ml-4 text-color-2">
          {section.list.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}

      {section.orderedList && (
        <ol className="list-decimal list-inside ml-4 text-color-2">
          {section.orderedList.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      )}

      {section.nestedList && (
        <ul className="list-disc list-inside ml-4 text-color-2">
          {section.nestedList.map((item, idx) => (
            <li key={idx}>
              <span dangerouslySetInnerHTML={{ __html: item.item }} />
              {item.subItems && (
                <ul className="list-disc list-inside ml-8 text-color-2">
                  {item.subItems.map((subItem, subIdx) => (
                    <li key={subIdx} dangerouslySetInnerHTML={{ __html: subItem }} />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Centered Portrait Component
function CenteredPortrait({ section }) {
  const img = section.image;
  const aspectRatio = img.aspectRatio || '1/1';

  return (
    <div className="text-center p-2 rounded-lg w-full max-w-xs mx-auto lg:w-1/3">
      <img
        src={img.src}
        alt={img.alt}
        className="rounded-md shadow-sm w-full h-auto object-cover lightbox-trigger cursor-pointer hover:scale-105 transition-transform"
        style={{ aspectRatio, objectFit: 'cover' }}
      />
      {img.caption && (
        <p className="text-xs text-color-2/80 mt-1">{img.caption}</p>
      )}
    </div>
  );
}

// Subsection Title Component
function SubsectionTitle({ section }) {
  return (
    <h3 className="text-xl font-bold text-color-2 mb-4 mt-6">{section.title}</h3>
  );
}

// Main Section Renderer Component
export default function SectionRenderer({ section }) {
  switch (section.type) {
    case 'text-box':
      return <TextBox section={section} />;
    case 'explanation-box':
      return <ExplanationBox section={section} />;
    case 'note':
      return <Note section={section} />;
    case 'paragraphs':
      return <Paragraphs section={section} />;
    case 'calendar':
      return <Calendar section={section} />;
    case 'image-grid':
      return <ImageGrid section={section} />;
    case 'image-text-layout':
      return <ImageTextLayout section={section} />;
    case 'identity-list':
      return <IdentityList section={section} />;
    case 'article-section':
      return <ArticleSection section={section} />;
    case 'section-with-title':
      return <SectionWithTitle section={section} />;
    case 'centered-portrait':
      return <CenteredPortrait section={section} />;
    case 'subsection-title':
      return <SubsectionTitle section={section} />;
    default:
      console.warn('Type de section inconnu:', section.type);
      return null;
  }
}
