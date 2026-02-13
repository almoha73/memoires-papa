export default function ArticleSection({ section }) {
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
