import OptimizedImage from '@/components/OptimizedImage';

export default function ImageTextLayout({ section }) {
    const imageWidthClass = section.imageWidth || '1/3';
    const contentWidthClass = imageWidthClass === '1/3' ? '2/3' : '1/2';

    if (section.multipleImages && section.images) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className={`w-full max-w-xs mx-auto lg:mx-0 lg:w-${imageWidthClass} grid grid-cols-2 gap-4`}>
                    {section.images.map((img, idx) => (
                        <OptimizedImage
                            key={idx}
                            src={img.src}
                            alt={img.alt}
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
                <OptimizedImage
                    src={section.image.src}
                    alt={section.image.alt}
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
