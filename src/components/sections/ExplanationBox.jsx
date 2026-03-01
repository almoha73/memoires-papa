export default function ExplanationBox({ section }) {
    return (
        <div className="bg-color-3/20 border-l-4 border-color-2 p-5 my-6 text-base text-color-2 shadow-inner rounded-r">
            {section.title && (
                <h4 className="font-bold mb-3 border-b border-color-2/30 pb-2">
                    {section.title}
                </h4>
            )}
            <div
                className="space-y-3"
                dangerouslySetInnerHTML={{
                    __html: Array.isArray(section.content) ? section.content.join(' ') : section.content
                }}
            />
        </div>
    );
}
