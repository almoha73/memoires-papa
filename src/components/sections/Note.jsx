export default function Note({ section }) {
    return (
        <p className="text-base text-color-2/80 italic my-4">{section.content}</p>
    );
}
