export default function Paragraphs({ section }) {
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
