import IconText from './IconText';
import { LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    text: string;
}

interface FeatureListProps {
    features: Feature[];
    className?: string;
}

export default function FeatureList({ features, className }: FeatureListProps) {
    return (
        <ul className={`space-y-4 ${className || ''}`}>
            {features.map((feature, index) => (
                <li key={index}>
                    <IconText icon={feature.icon} text={feature.text} />
                </li>
            ))}
        </ul>
    );
}