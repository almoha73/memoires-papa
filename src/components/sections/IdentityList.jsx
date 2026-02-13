export default function IdentityList({ section }) {
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
