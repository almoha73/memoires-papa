import { useState } from 'react';

/**
 * A reusable image component for optimizations:
 * - Native lazy loading
 * - Async decoding for better main thread performance
 * - Smooth fade-in effect once loaded
 * - Default styling for the app's lightbox
 */
export default function OptimizedImage({
    src,
    alt,
    className = '',
    imageClassName = 'w-full h-auto object-cover',
    style = {},
    isLightbox = true,
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    const baseClasses = `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`;
    const lightboxClasses = isLightbox ? 'lightbox-trigger cursor-pointer hover:scale-105 transition-transform' : '';

    return (
        <div className={`overflow-hidden rounded-md bg-transparent ${className}`} style={style}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`${baseClasses} ${lightboxClasses} ${imageClassName}`}
                {...props}
            />
        </div>
    );
}
