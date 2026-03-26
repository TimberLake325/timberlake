export const siteData = {
    company: {
        name: "Timberlake",
        tagline: "Premier Medical Billing & Revenue Cycle Management",
        address: "123 Healthcare Ave, Suite 500, Medical City, MC 12345",
        phone: "(800) 555-0199",
        email: "info@timberlakebilling.com",
        logo: "/logo.png",
    },
    stats: [
        { label: "Revenue Increase", value: "25%+" },
        { label: "Clean Claims Rate", value: "98%" },
        { label: "Years Experience", value: "15+" },
        { label: "Satisfied Providers", value: "500+" },
    ],
    services: [
        {
            id: "medical-billing",
            title: "Medical Billing Services",
            description: "End-to-end medical billing solutions to maximize your practice revenue.",
            slug: "medical-billing-services",
            benefits: ["Fast Turnaround", "High Accuracy", "Dedicated Support"],
        },
        {
            id: "specialty-billing",
            title: "Specialty Billing Services",
            description: "Tailored billing for Physical Therapy, Mental Health, Geriatrics, and more.",
            slug: "specialty-billing-services",
            benefits: ["Niche Expertise", "Custom Rulesets", "AAPC Certified"],
        },
        {
            id: "rcm",
            title: "Revenue Cycle Management",
            description: "Optimizing every stage of your revenue cycle for peak performance.",
            slug: "revenue-cycle-management",
            benefits: ["Reduced Denials", "AR Optimization", "Transparent Reporting"],
        },
        {
            id: "coding-auditing",
            title: "Coding & Auditing",
            description: "Ensure compliance and accuracy with our certified coding experts.",
            slug: "coding-auditing-services",
            benefits: ["ICD-10 Expertise", "99% Accuracy", "Audit Protection"],
        },
        {
            id: "credentialing",
            title: "Credentialing & Enrollment",
            description: "Streamlined insurance enrollment and physician credentialing.",
            slug: "credentialing-enrollment",
            benefits: ["Efficient Onboarding", "Multi-Payer support", "Tracking & Alerts"],
        }
    ],
    specialties: [
        "Physical Therapy", "Geriatrics", "Mental Health", "DME", "Hospital", "Family Practice"
    ],
    payers: [
        { name: "Medicare", logo: "/payers/medicare.png" },
        { name: "Medicaid", logo: "/payers/medicaid.png" },
        { name: "Cigna", logo: "/payers/cigna.png" },
        { name: "Aetna", logo: "/payers/aetna.png" },
        { name: "BCBS", logo: "/payers/bcbs.png" },
        { name: "Optum", logo: "/payers/optum.png" }
    ],
    whyChooseUs: [
        { title: "Certified Experts", description: "Our team consists of AAPC certified coders and billing specialists." },
        { title: "HIPAA Compliant", description: "Your data security is our top priority with bank-grade encryption." },
        { title: "Transparent Reporting", description: "24/7 access to real-time dashboards and detailed financial reports." },
        { title: "Dedicated Managers", description: "A single point of contact who understands your specific needs." },
    ],
    states: [
        { name: "Texas", slug: "texas", description: "Expert medical billing services across the Lone Star State." },
        { name: "California", slug: "california", description: "Leading RCM solutions for California healthcare providers." },
        { name: "Florida", slug: "florida", description: "Comprehensive billing support for Florida practices." },
        
    ],
    blogCategories: [
        { name: "Industry Updates", slug: "industry-updates" },
        { name: "Compliance", slug: "compliance" },
        { name: "Coding Tips", slug: "coding-tips" },
    ],
    blogs: [
        {
            title: "Understanding ICD-11 Changes in 2026",
            category: "Coding Tips",
            slug: "understanding-icd-11-changes",
            excerpt: "Stay ahead of the curve with our guide to the latest ICD coding updates.",
            date: "Oct 12, 2025"
        },
        {
            title: "HIPAA Compliance in Telehealth",
            category: "Compliance",
            slug: "hipaa-compliance-telehealth",
            excerpt: "Essential security measures for modern remote healthcare services.",
            date: "Nov 05, 2025"
        }
    ]
};
