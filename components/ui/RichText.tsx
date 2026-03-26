interface RichTextProps {
    content: string;
    className?: string;
}

const RichText = ({ content, className = "" }: RichTextProps) => {
    if (!content) return null;

    return (
        <div
            className={`rich-text prose prose-slate max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default RichText;
