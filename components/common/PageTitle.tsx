import Heading from '@/components/common/Heading';
import Description from '@/components/common/Description';

interface PageTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function PageTitle({ title, subtitle, className }: PageTitleProps) {
    return (
        <header className={`mb-8 ${className || ''}`}>
            <Heading as="h1" size="2xl" className="mb-4">
                {title}
            </Heading>
            {subtitle && (
                <Description size="md">
                    {subtitle}
                </Description>
            )}
        </header>
    );
}