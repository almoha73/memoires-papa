export default function TextBox({ section }) {
    return (
        <div className={`bg-color-5/30 border-l-4 border-${section.style || 'color-4'} p-4 my-6`}>
            <p className="text-color-1/80 leading-relaxed">{section.content}</p>
        </div>
    );
}
