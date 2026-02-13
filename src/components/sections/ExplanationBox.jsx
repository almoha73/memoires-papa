export default function ExplanationBox({ section }) {
    return (
        <div className="bg-color-3/20 border-l-4 border-color-2 p-4 my-6 text-sm text-color-2 shadow-inner">
            <p>{section.content}</p>
        </div>
    );
}
