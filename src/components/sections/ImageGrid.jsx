import Masonry from 'react-masonry-css';
import OptimizedImage from '@/components/OptimizedImage';

export default function ImageGrid({ section }) {
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
                    <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                    />
                    {img.caption && (
                        <p className="text-xs text-center text-color-2/80 mt-1">{img.caption}</p>
                    )}
                </div>
            ))}
        </Masonry>
    );
}
