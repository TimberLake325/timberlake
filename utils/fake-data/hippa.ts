export const HIPAA_DATA = {
    metaData: {
        title: "HIPAA Compliance & Data Security",
        description: "Learn about Timberlake's rigorous commitment to protecting patient privacy and ensuring multi-layer data security in medical billing.",
        url: "/hippa",
        canonicalUrl: "/hippa",
        image: "/og-hippa-image.jpg",
        imageAlt: "Timberlake Medical Billing - HIPAA & Security",
        imageWidth: 1200,
        imageHeight: 630,
        type: "website",
        keywords: ["HIPAA compliance", "medical data security", "PHI protection", "data sovereignty"],
        noindex: false,
        nofollow: false,
        robotsIndex: true,
        robotsFollow: true,
        twitterCard: "summary_large_image",
        seoTitle: "HIPAA & Data Sovereignty | Timberlake Security Protocols",
        seoDescription: "Discover how Timberlake ensures the integrity and availability of Protected Health Information (PHI) through advanced encryption and zero-trust access.",
        themeColor: "#2563eb",
        category: "compliance services",
        classification: "Data Security Standards",
        locale: "en_US",
    },
    header: {
        title: "HIPAA & Data Sovereignty",
        description: "Our rigorous commitment to protecting patient privacy and ensuring multi-layer data security."
    },
    intro: {
        kicker: {
            text: "Live Protection Active",
            icon: "LucideActivity",
            color: "primary"
        },
        title: {
            mainText: "Rigorous",
            highlightedText: "Safeguards",
            highlightColor: "primary",
            highlightStyle: "italic"
        },
        subtitle: "for PHI Confidentiality",
        description: "Timberlake implements a 'Defense-in-Depth' strategy. We manage administrative, physical, and technical safeguards to ensure the integrity and availability of Protected Health Information (PHI) under the latest HHS guidelines.",
        badge: {
            text: "HHS Standards Compliant",
            icon: "LucideShieldCheck"
        }
    },
    technicalPillars: [
        {
            id: "pillar-1",
            title: "AES-256 Encryption",
            description: "Bank-grade encryption for all data at rest and TLS 1.3 for data in transit.",
            icon: "LucideLock",
            color: "primary"
        },
        {
            id: "pillar-2",
            title: "Role-Based Access",
            description: "Strict (RBAC) protocols ensure zero-trust access to patient records.",
            icon: "LucideUsers",
            color: "primary"
        },
        {
            id: "pillar-3",
            title: "Secure Cloud HQ",
            description: "Physically secure data centers with biometric entry and 24/7 monitoring.",
            icon: "LucideServer",
            color: "primary"
        }
    ],
    baaSection: {
        title: "Business Associate Agreement (BAA)",
        description: "Timberlake enters into a comprehensive BAA with every client practice, legally codifying our commitment to your data security and regulatory liability.",
        cta: {
            text: "Download BAA Template",
            variant: "secondary",
            className: "bg-background text-primary hover:bg-background/90 h-16 px-10 font-black uppercase tracking-widest text-xs"
        },
        backgroundIcon: "LucideFileText"
    },
    checklist: {
        title: "Audit-Ready Protocols",
        items: [
            "Biannual staff training on HIPAA Privacy Rules",
            "Continuous vulnerability and penetration testing",
            "Automated audit logs for every PHI access point",
            "Encrypted off-site disaster recovery backups",
            "Strict breach notification response protocols",
            "Dedicated Chief Information Security Officer (CISO)"
        ]
    }
};