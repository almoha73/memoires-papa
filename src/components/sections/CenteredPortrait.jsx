import OptimizedImage from '@/components/OptimizedImage';

export default function CenteredPortrait({ section }) {
    const img = section.image;
    const aspectRatio = img.aspectRatio || '1/1';

    return (
        <div className="text-center p-2 rounded-lg w-full max-w-xs mx-auto lg:w-1/3">
            <OptimizedImage
                src={img.src}
                alt={img.alt}
                style={{ aspectRatio, objectFit: 'cover' }}
            />
            {img.caption && (
                <p className="text-xs text-color-2/80 mt-1">{img.caption}</p>
            )}
        </div>
    );
}
