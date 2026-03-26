export interface MissionVisionProps {
    mission: {
        icon: string;
        title: string;
        description: string;
        highlightedText: string;
    };
    vision: {
        icon: string;
        title: string;
        description: string;
    };
}

export interface Leader {
    id: number;
    name: string;
    role: string;
    description: string;
    initials: string;
}

export interface LeadershipSectionProps {
    title: string;
    subtitle: string;
    members: Leader[];
}

export interface ComplianceSectionProps {
    title: string;
    badge: string;
    badgeIcon: string;
    quote: string;
    certifications: string[];
    verificationCode: string;
    watermarkIcon: string;
}