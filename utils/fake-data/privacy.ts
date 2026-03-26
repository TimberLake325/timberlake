export const PRIVACY_DATA = {
    metaData: {
        title: "Privacy Policy",
        description: "Review Timberlake's Privacy Policy to understand how we collect, use, and safeguard your practice's information and patient data.",
        url: "/privacy",
        canonicalUrl: "/privacy",
        image: "/og-privacy-image.jpg",
        imageAlt: "Timberlake Medical Billing - Privacy Policy",
        imageWidth: 1200,
        imageHeight: 630,
        type: "website",
        keywords: ["privacy policy", "data governance", "medical data privacy", "information security"],
        noindex: false,
        nofollow: false,
        robotsIndex: true,
        robotsFollow: true,
        twitterCard: "summary_large_image",
        seoTitle: "Privacy Policy | Timberlake Data Governance",
        seoDescription: "Examine Timberlake's commitment to data privacy, including how we handle Identity Data and Practice Metadata with uncompromising security.",
        themeColor: "#2563eb",
        category: "data privacy",
        classification: "Privacy Policy",
        locale: "en_US",
    },
    header: {
        title: "Privacy & Data Governance groot",
        description: "Our protocols for collecting, utilizing, and safeguarding your practice's information."
    },
    metadata: {
        version: "Version 2.4",
        lastUpdated: "January 2026",
        downloadText: "Download PDF Version"
    },
    sections: {
        introduction: {
            title: "Introduction",
            description: "This Privacy Policy describes how Timberlake ('we', 'us', or 'our') collects, uses, and shares information in connection with your use of our website and RCM services. In an industry built on trust, we prioritize the protection of your practice's operational data."
        },
        informationCollection: {
            title: "Information We Collect",
            description: "We collect information you provide directly to us through contact gateways, demo scheduling, or secure portal onboarding.",
            dataTypes: [
                {
                    id: "data-type-1",
                    title: "Identity Data",
                    description: "Names, professional email addresses, phone numbers, and NPI identifiers.",
                    icon: "LucideFingerprint"
                },
                {
                    id: "data-type-2",
                    title: "Practice Metadata",
                    description: "Practice size, specialty focus, and existing EHR/PM system information.",
                    icon: "LucideShieldAlert"
                }
            ]
        },
        dataUsage: {
            title: "How We Use Information",
            description: "Data is utilized strictly to facilitate specialized medical billing workflows and practice performance analytics.",
            uses: [
                "Maintain and optimize RCM service delivery",
                "Respond to regulatory technical requests",
                "Send security alerts and HIPAA compliance updates",
                "Analyze practice trends for performance reporting"
            ]
        },
        dataSharing: {
            title: "Data Sharing & Non-Sale Commitment",
            description: "Timberlake does not sell, rent, or trade your personal or practice information. We only share data with vetted third-party infrastructure providers (e.g., AWS, HIPAA-compliant clearinghouses) necessary to execute our billing services.",
            highlightedText: "not",
            icon: "LucideEyeOff"
        },
        tracking: {
            title: "Tracking & Cookies",
            description: "We utilize essential cookies to maintain secure portal sessions. We do not engage in cross-site behavioral tracking or third-party advertising profiling."
        },
        contact: {
            title: "Privacy Inquiries",
            description: "Direct all data access requests or privacy questions to our compliance officer:",
            email: "privacy@timberlakebilling.com",
            attention: "Attn: Data Privacy Officer"
        }
    },
    trustBar: {
        text: "Verified Secure • HIPAA Compliant Environment • Timberlake Global",
        icon: "LucideShieldCheck"
    }
};