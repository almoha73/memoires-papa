export default function SectionWithTitle({ section }) {
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
