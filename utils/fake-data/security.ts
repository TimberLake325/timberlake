export const SECURITY_DATA = {
    metaData: {
        title: "Security Policy",
        description: "Explore the comprehensive technical and organizational measures Timberlake employs to safeguard our infrastructure and your data.",
        url: "/security",
        canonicalUrl: "/security",
        image: "/og-security-image.jpg",
        imageAlt: "Timberlake Medical Billing - Security Policy",
        imageWidth: 1200,
        imageHeight: 630,
        type: "website",
        keywords: ["security policy", "infrastructure security", "threat monitoring", "data governance"],
        noindex: false,
        nofollow: false,
        robotsIndex: true,
        robotsFollow: true,
        twitterCard: "summary_large_image",
        seoTitle: "Technical Security Policy | Timberlake RCM Infrastructure",
        seoDescription: "Examine our multi-layered approach to security, including SOC 2 Type II compliant data centers, AES-256 encryption, and 24/7 threat monitoring.",
        themeColor: "#2563eb",
        category: "infrastructure security",
        classification: "Security Policy",
        locale: "en_US",
    },
    header: {
        title: "Security Policy",
        description: "Comprehensive technical and organizational measures to safeguard our infrastructure."
    },
    securityOverview: [
        {
            id: "overview-1",
            title: "Infrastructure Security",
            description: "Our servers are hosted in SOC 2 Type II compliant data centers with redundant power, cooling, and network connectivity. We utilize multi-layered firewalls and intrusion detection systems.",
            icon: "LucideServer"
        },
        {
            id: "overview-2",
            title: "Threat Monitoring",
            description: "Continuous 24/7 monitoring for suspicious activity. Automated alerts and dedicated security response teams ready to act on any potential threat.",
            icon: "LucideShieldAlert"
        }
    ],
    dataGovernance: {
        title: "Data Governance",
        items: [
            {
                id: "governance-1",
                number: "01",
                title: "Access Management",
                description: "Multi-factor authentication (MFA) is mandatory for all employee accounts accessing production environments."
            },
            {
                id: "governance-2",
                number: "02",
                title: "Audit Logs",
                description: "Immutable logs of all administrative actions and PHI access are maintained for investigative purposes."
            },
            {
                id: "governance-3",
                number: "03",
                title: "Regular Audits",
                description: "External third-party security audits and penetration testing are performed annually."
            }
        ]
    },
    resilience: {
        title: "Resilience & Recovery",
        description: "Our disaster recovery plan ensures near-zero data loss and rapid service restoration in the event of a system failure or regional outage. Backups are performed hourly and stored in geographically diverse locations.",
        icon: "LucideRefreshCw",
        animation: "animate-spin-slow"
    }
};