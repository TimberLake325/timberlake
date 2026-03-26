export const FOOTER_DATA = {
    brand: {
        mission: "Providing enterprise-grade revenue cycle management and specialized medical billing. Certified for accuracy, built for compliance, and dedicated to provider success.",
        complianceBadges: [
            {
                id: "badge-1",
                label: "HIPAA Compliant",
                icon: "LucideShieldCheck",
                color: "primary"
            },
            {
                id: "badge-2",
                label: "SOC2 Type II",
                icon: "LucideLock",
                color: "primary"
            }
        ],
        complianceText: "HIPAA & SOC2 Compliant"
    },
    navigation: {
        solutions: {
            title: "Solutions",
            links: [
                { id: "sol-1", label: "Medical Coding & Auditing", href: "/services/coding" },
                { id: "sol-2", label: "Revenue Cycle Management", href: "/services/rcm" },
                { id: "sol-3", label: "Compliance & Risk Management", href: "/services/compliance" },
                { id: "sol-4", label: "Denials Management", href: "/services/denials" },
                { id: "sol-5", label: "Provider Credentialing", href: "/services/credentialing" }
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { id: "res-1", label: "Our Expertise", href: "/about" },
                { id: "res-2", label: "Industry Insights", href: "/blog" },
                { id: "res-3", label: "State Coverage", href: "/states" },
                { id: "res-4", label: "Sitemap", href: "/site-map", isPrimary: true }
            ]
        }
    },
    contact: {
        title: "Contact Operations",
        details: [
            {
                id: "contact-1",
                label: "Support Line",
                value: "+1 (555) 123-4567",
                icon: "LucidePhone",
                type: "phone"
            },
            {
                id: "contact-2",
                label: "Secure Email",
                value: "info@timberlake.com",
                icon: "LucideMail",
                type: "email"
            },
            {
                id: "contact-3",
                label: "HQ Location",
                value: "123 Medical Drive, Suite 500, New York, NY 10001",
                icon: "LucideMapPin",
                type: "address"
            }
        ]
    },
    legal: {
        links: [
            { id: "legal-1", label: "HIPAA Statement", href: "/hipaa-compliance" },
            { id: "legal-2", label: "Privacy Policy", href: "/privacy-policy" },
            { id: "legal-3", label: "Terms of Service", href: "/terms-conditions" },
            { id: "legal-4", label: "Security Policy", href: "/security-policy" },
            { id: "legal-5", label: "FAQ", href: "/faqs" }
        ],
        copyright: {
            year: new Date().getFullYear(),
            companyName: "Timberlake Medical Billing",
            tagline: "Specialized RCM Solutions for Healthcare."
        }
    }
};