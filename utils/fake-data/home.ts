export const HOME_DATA = {
    metaData: {
        title: "Medical Billing & RCM Services",
        description: "Elite RCM solutions for high-complexity practices. HIPAA-compliant workflows and AAPC certified experts for medical billing and credentialing.",
        url: "/",
        canonicalUrl: "/",
        image: "/og-image.jpg",
        imageAlt: "Timberlake Medical Billing - Home",
        imageWidth: 1200,
        imageHeight: 630,
        type: "website",
        keywords: ["medical billing", "RCM services", "credentialing", "HIPAA compliant", "AAPC certified"],
        noindex: false,
        nofollow: false,
        robotsIndex: true,
        robotsFollow: true,
        twitterCard: "summary_large_image",
        seoTitle: "Timberlake Medical Billing | Professional RCM Services",
        seoDescription: "Timberlake Medical Billing offers elite RCM solutions, HIPAA-compliant workflows, and AAPC certified expertise to optimize your practice's financial performance.",
        themeColor: "#2563eb",
        category: "medical billing services",
        classification: "Revenue Cycle Management",
        locale: "en_US",
    },
    heroSection: {
        "content": {
            "title": {
                "mainText": "Medical Billing & Credentialing",
                "highlightedText": "Services",
                "highlightSymbol": "."
            },
            "description": {
                "intro": "Elite RCM solutions for high-complexity practices. We bridge the gap between",
                "highlightedParts": [
                    "clinical excellence",
                    "financial performance"
                ],
                "ending": "with certified HIPAA-compliant workflows."
            },
            "ctaButtons": [
                {
                    "id": "cta1",
                    "text": "Start Your Audit",
                    "href": "/contact",
                    "variant": "primary",
                    "hasIcon": true
                },
                {
                    "id": "cta2",
                    "text": "Explore Specialties",
                    "href": "/services",
                    "variant": "outline",
                    "hasIcon": false
                }
            ],
            "socialProof": [
                {
                    "id": "proof1",
                    "text": "99.2% Clean Claims",
                    "iconName": "LucideActivity"
                },
                {
                    "id": "proof2",
                    "text": "AAPC Certified",
                    "iconName": "LucideShieldCheck"
                },
                {
                    "id": "proof3",
                    "text": "HIPAA Secure",
                    "iconName": "LucideCheckCircle"
                }
            ]
        },
        "visualElements": {
            "dashboard": {
                "elements": [
                    {
                        "type": "header",
                        "width": "w-1/3"
                    },
                    {
                        "type": "statsGrid",
                        "items": [
                            {
                                "type": "stat",
                                "isHighlighted": false
                            },
                            {
                                "type": "stat",
                                "isHighlighted": true
                            }
                        ]
                    },
                    {
                        "type": "chart"
                    }
                ]
            },
            "floatingCards": [
                {
                    "id": "performanceCard",
                    "position": "top-right",
                    "iconName": "LucideTrendingUp",
                    "label": "Net Collections",
                    "value": "+22.4%",
                    "animation": {
                        "movement": "upDown",
                        "duration": 4,
                        "delay": 0
                    }
                },
                {
                    "id": "securityCard",
                    "position": "bottom-left",
                    "iconName": "LucideShieldCheck",
                    "label": "Security Status",
                    "value": "100% Compliant",
                    "animation": {
                        "movement": "upDown",
                        "duration": 5,
                        "delay": 1
                    }
                }
            ]
        }
    },

    certifications: {
        heading: {
            subheading: "Compliance Framework",
            title: "Enterprise Standards",
            description: "Elite RCM solutions for high-complexity practices with certified HIPAA-compliant workflows."
        },
        certifications: [
            {
                id: "cert-1",
                name: "HIPAA Compliant",
                description: "PHI Data Privacy Standards",
                iconName: "LucideShieldCheck",
                tag: "Certified",
                tagVariant: "primary"
            },
            {
                id: "cert-2",
                name: "AAPC Certified",
                description: "CPC/COC Professional Coding",
                iconName: "LucideAward",
                tag: "Verified",
                tagVariant: "success"
            },
            {
                id: "cert-3",
                name: "SOC 2 Type II",
                description: "Security & Confidentiality",
                iconName: "LucideLock",
                tag: "Active",
                tagVariant: "info"
            },

            {
                id: "cert-4",
                name: "ISO 27001",
                description: "Information Security Management",
                iconName: "LucideShieldCheck",
                tag: "Certified",
                tagVariant: "primary"
            }
        ]
    },

    companyStats: {
        stats: [
            {
                id: "stat-1",
                value: "99.2%",
                label: "Clean Claims Rate",
                description: "Industry-leading accuracy"
            },
            {
                id: "stat-2",
                value: "$2.4M+",
                label: "Revenue Recovered",
                description: "For our clients annually"
            },
            {
                id: "stat-3",
                value: "40+",
                label: "Medical Specialties",
                description: "Supported expertise"
            },
            {
                id: "stat-4",
                value: "<24h",
                label: "Avg. Claim Resolution",
                description: "Faster than industry standard"
            }
        ],

        additionalStats: [
            {
                id: "stat-5",
                value: "98.7%",
                label: "Client Retention",
                description: "Year-over-year"
            }
        ]
    },

    servicesOverview: {
        header: {
            subtitle: "Our Core Expertise",
            title: "Revenue Cycle Solutions",
            description: "We bridge the gap between clinical documentation and financial reimbursement with end-to-end management built for high-performance practices."
        },
        services: [
            {
                id: "coding",
                title: "Medical Coding & Auditing",
                description: "Specialized coding solutions for complex specialties ensuring maximum reimbursements with accuracy.",
                slug: "medical-coding",
                icon: "LucideFileText",
                badge: "System Module",
                benefits: [
                    "Specialty-specific coding expertise",
                    "Regular compliance audits",
                    "Coder education & training",
                    "Real-time coding support"
                ],
                ctaText: "Explore Details"
            },
            {
                id: "rcm",
                title: "Revenue Cycle Management",
                description: "End-to-end RCM services from patient registration to final payment posting and reporting.",
                slug: "revenue-cycle",
                icon: "LucideBarChart3",
                badge: "System Module",
                benefits: [
                    "End-to-end claim lifecycle",
                    "Advanced analytics dashboard",
                    "Performance benchmarking",
                    "Custom workflow design"
                ],
                ctaText: "Explore Details"
            },
            {
                id: "compliance",
                title: "Compliance & Risk Management",
                description: "HIPAA-compliant workflows and regular audits to ensure adherence to regulatory standards.",
                slug: "compliance",
                icon: "LucideShieldCheck",
                badge: "System Module",
                benefits: [
                    "HIPAA compliance monitoring",
                    "Risk assessment reports",
                    "Staff training programs",
                    "Audit defense support"
                ],
                ctaText: "Explore Details"
            },
            {
                id: "denials",
                title: "Denials Management",
                description: "Proactive denial prevention and recovery strategies to maximize revenue capture.",
                slug: "denials",
                icon: "LucideZap",
                badge: "System Module",
                benefits: [
                    "Denial root cause analysis",
                    "Appeal letter automation",
                    "Trend identification",
                    "Preventive coding edits"
                ],
                ctaText: "Explore Details"
            },
            {
                id: "credentialing",
                title: "Provider Credentialing",
                description: "Streamlined credentialing and enrollment services for providers and facilities.",
                slug: "credentialing",
                icon: "LucideShieldCheck",
                badge: "System Module",
                benefits: [
                    "Application processing",
                    "Payor enrollment",
                    "Expiration tracking",
                    "Renewal management"
                ],
                ctaText: "Explore Details"
            },
            {
                id: "analytics",
                title: "Performance Analytics",
                description: "Advanced reporting and analytics to track financial performance and identify opportunities.",
                slug: "analytics",
                icon: "LucideBarChart3",
                badge: "System Module",
                benefits: [
                    "Custom KPI dashboards",
                    "Benchmark comparisons",
                    "Trend analysis",
                    "Predictive modeling"
                ],
                ctaText: "Explore Details"
            }
        ],
        footerCta: {
            text: "View Full Capability Statement",
            href: "/services",
            variant: "outline",
            size: "lg",
            className: "min-w-[240px]"
        }
    },

    whyChooseUs: {
        header: {
            subtitle: "The Timberlake Advantage",
            title: "Engineered for Revenue Excellence",
            description: "While generic billing companies focus on data entry, we focus on Revenue Optimization. Our framework is designed to eliminate clinical leakage and maximize practice valuation.",
            centered: false
        },
        stats: {
            value: "98.5%",
            label: "First-Pass Clean Claim Rate",
            variant: "primary"
        },
        reasons: [
            {
                id: "reason-1",
                title: "Specialty-Specific Expertise",
                description: "Deep knowledge of niche specialties ensures accurate coding and maximum reimbursement.",
                icon: "LucideAward",
                order: "01"
            },
            {
                id: "reason-2",
                title: "Advanced Security Framework",
                description: "Enterprise-grade HIPAA compliance with SOC 2 Type II certification for data protection.",
                icon: "LucideShieldCheck",
                order: "02"
            },
            {
                id: "reason-3",
                title: "Proactive Revenue Optimization",
                description: "Predictive analytics identify revenue leakage before it impacts your bottom line.",
                icon: "LucideTrendingUp",
                order: "03"
            },
            {
                id: "reason-4",
                title: "Dedicated Practice Liaison",
                description: "Single point of contact who understands your practice's unique workflow and goals.",
                icon: "LucideUserCheck",
                order: "04"
            },
            {
                id: "reason-5",
                title: "Transparent Reporting",
                description: "Real-time dashboards with actionable insights into your financial performance.",
                icon: "LucideTrendingUp",
                order: "05"
            },
            {
                id: "reason-6",
                title: "Continuous Compliance",
                description: "Ongoing monitoring and updates to ensure adherence to changing regulations.",
                icon: "LucideShieldCheck",
                order: "06"
            }
        ]
    },

    ctaBanner: {
        kicker: {
            text: "Secure Practice Evaluation",
            icon: "LucideShieldCheck",
            variant: "accent"
        },
        headline: {
            mainText: "Ready to reclaim your",
            highlightedText: "revenue potential?",
            highlightStyle: "italic",
            highlightColor: "accent"
        },
        description: "Join 500+ specialized providers who have eliminated billing backlogs and increased their first-pass claim acceptance.",
        primaryCta: {
            text: "Schedule Free Audit",
            href: "/contact",
            size: "lg",
            className: "bg-background text-primary hover:bg-accent hover:text-background transition-all duration-300 gap-3 h-16 px-12 text-xl font-black shadow-xl",
            icon: "LucideArrowRight"
        },
        trustPoints: [
            {
                id: "trust-1",
                text: "15-Minute Briefing",
                icon: "LucideCheckCircle2",
                color: "accent"
            },
            {
                id: "trust-2",
                text: "HIPAA Secure Process",
                icon: "LucideCheckCircle2",
                color: "accent"
            },
            {
                id: "trust-3",
                text: "No-Obligation Analysis",
                icon: "LucideCheckCircle2",
                color: "accent"
            }
        ],
        background: {
            overlayColor: "bg-gradient-to-l from-white/10 to-transparent",
            blobColor: "bg-accent/20"
        }
    },

    insurancePayers: {
        header: {
            subtitle: "Interoperability",
            title: "Direct Payer Connectivity",
            description: "Our RCM engine is integrated with over 800 national and regional insurance carriers, facilitating real-time eligibility checks and accelerated electronic remittance.",
            centered: false
        },
        stats: {
            value: "800+",
            label: "EDI Connections Active",
            color: "emerald"
        },
        payers: [
            {
                id: "payer-1",
                name: "Aetna",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-2",
                name: "United Healthcare",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-3",
                name: "Cigna",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-4",
                name: "Anthem Blue Cross",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-5",
                name: "Humana",
                status: "active",
                type: "medicare"
            },
            {
                id: "payer-6",
                name: "Centers for Medicare & Medicaid Services",
                status: "active",
                type: "government"
            },
            {
                id: "payer-7",
                name: "Kaiser Permanente",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-8",
                name: "Molina Healthcare",
                status: "active",
                type: "medicaid"
            },
            {
                id: "payer-9",
                name: "Health Net",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-10",
                name: "Blue Shield of California",
                status: "active",
                type: "commercial"
            },
            {
                id: "payer-11",
                name: "Medicaid",
                status: "active",
                type: "government"
            },
            {
                id: "payer-12",
                name: "Tricare",
                status: "active",
                type: "military"
            }
        ],
        footerNote: {
            text: "Powered by Enterprise Clearinghouse EDI",
            icon: "LucideZap",
            color: "primary"
        }
    },

    appointmentBooking: {
        header: {
            subtitle: "Expert Consultation",
            title: "Transform Your Revenue Cycle",
            description: "Schedule a specialized audit with our RCM experts. We'll identify leakage in your current billing workflow and provide a roadmap for recovery.",
            centered: false
        },
        valuePropositions: [
            {
                id: "value-1",
                title: "Free Performance Audit",
                description: "A deep dive into your current clean-claim rate and denial patterns.",
                icon: "LucideMessageSquare",
                variant: "primary"
            },
            {
                id: "value-2",
                title: "Clinician-Friendly Scheduling",
                description: "Book early morning or after-clinic briefings that respect your rounds.",
                icon: "LucideCalendar",
                variant: "primary"
            },
            {
                id: "value-3",
                title: "24-Hour Response Protocol",
                description: "Our implementation team reviews every inquiry within one business day.",
                icon: "LucideClock",
                variant: "primary"
            }
        ],
        securityBlock: {
            title: "Secure PHI Protocol",
            description: "Practice information is encrypted via 256-bit SSL and handled under strict HIPAA Title II privacy standards.",
            icon: "LucideShieldCheck",
            color: "primary"
        },
        formHeader: {
            steps: [
                {
                    number: "1",
                    label: "Step One",
                    title: "Request Your Audit",
                    status: "active"
                },
                {
                    number: "2",
                    label: "Step Two",
                    title: "Workflow Review",
                    status: "pending"
                }
            ]
        },
        form: {
            title: "Consultation Inquiry",
            securityIcon: "LucideLock",
            securityColor: "emerald",
            responseNote: {
                text: "Average response time:",
                value: "2.4 Hours",
                valueColor: "primary"
            }
        }
    }
}