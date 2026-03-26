import mongoose, { model, models } from "mongoose";

export const seoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        keywords: { type: [String] },
        image: { type: String },
        canonicalUrl: { type: String },
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
        ogUrl: { type: String },
        ogType: { type: String, default: "website" },
        ogSiteName: { type: String },
        ogLocale: { type: String, default: "en_US" },

        twitterCard: { type: String, default: "summary_large_image" },
        twitterTitle: { type: String },
        twitterDescription: { type: String },
        twitterImage: { type: String },
        twitterSite: { type: String },
        twitterCreator: { type: String },

        url: { type: String },
        imageAlt: { type: String },
        imageWidth: { type: Number },
        imageHeight: { type: Number },
        noindex: { type: Boolean, default: false },
        nofollow: { type: Boolean, default: false },
        robotsIndex: { type: Boolean, default: true },
        robotsFollow: { type: Boolean, default: true },
        seoTitle: { type: String },
        seoDescription: { type: String },
        themeColor: { type: String },
        category: { type: String },
        classification: { type: String },
        locale: { type: String, default: "en_US" },
    },
    { _id: false }
);

export const Seo = models.Seo || model("Seo", seoSchema);

const ctaSubSchema = new mongoose.Schema({
    label: { type: String, required: true },
    link: { type: String, required: true }
}, { _id: false });

const heroSectionSchema = new mongoose.Schema({
    headline: { type: String, required: true },
    subheading: { type: String, required: true },
    primaryCta: { type: ctaSubSchema, required: true },
    secondaryCta: { type: ctaSubSchema, required: true },
    image: { type: String }
}, { _id: false });

const logoItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    icon_bg: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false });

const whatWeDoSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    logos: { type: [logoItemSchema], required: false },
    serviceIds: { type: [String], default: [] },
    cta: { type: ctaSubSchema, required: false }
}, { _id: false });

const highlightItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false });

const statItemSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

const aboutUsSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    highlights: { type: [highlightItemSchema], required: true },
    stats: { type: [statItemSchema], required: true },
    cta: { type: ctaSubSchema, required: true }
}, { _id: false });

const pointItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
}, { _id: false });

const whyChooseUsSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: [pointItemSchema], required: true },
    cta: { type: ctaSubSchema, required: true }
}, { _id: false });

const stepItemSchema = new mongoose.Schema({
    step: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
}, { _id: false });

const processSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    steps: { type: [stepItemSchema], required: true },
    cta: { type: ctaSubSchema, required: true }
}, { _id: false });

const technologyItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }
}, { _id: false });

const categoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    technologies: { type: [technologyItemSchema], required: true }
}, { _id: false });

const caseStudyItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    industry: { type: String, required: true },
    summary: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    technologies: { type: [String], required: true },
    image: { type: String, required: true },
    link: { type: String, required: true }
}, { _id: false });

const caseStudiesSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    items: { type: [caseStudyItemSchema], required: false },
    caseStudyIds: { type: [String], default: [] },
    cta: { type: ctaSubSchema, required: true }
}, { _id: false });

const testimonialItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    feedback: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { _id: false });

const testimonialsSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    items: { type: [testimonialItemSchema], required: true },
    cta: { type: ctaSubSchema, required: true }
}, { _id: false });

const techStackSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [categoryItemSchema], required: true }
}, { _id: false });

const ctaSectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subtext: { type: String, required: true },
    button: { type: ctaSubSchema, required: true }
}, { _id: false });

const certificationItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
    tag: { type: String, required: true },
    tagVariant: { type: String, required: true }
}, { _id: false });

const certificationsSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    items: { type: [certificationItemSchema], required: true }
}, { _id: false });

const companyStatItemSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String }
}, { _id: false });

const companyStatsSectionSchema = new mongoose.Schema({
    stats: { type: [companyStatItemSchema], required: true }
}, { _id: false });

const insurancePayerItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true }
}, { _id: false });

const insurancePayersSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    statsValue: { type: String },
    statsLabel: { type: String },
    statsColor: { type: String },
    items: { type: [insurancePayerItemSchema], required: true },
    footerNoteText: { type: String },
    footerNoteIcon: { type: String },
    footerNoteColor: { type: String }
}, { _id: false });

const appointmentValuePropSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    variant: { type: String, default: 'primary' }
}, { _id: false });

const appointmentFormStepSchema = new mongoose.Schema({
    number: { type: String, required: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, default: 'pending' }
}, { _id: false });

const appointmentBookingSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    valueProps: { type: [appointmentValuePropSchema], required: true },
    securityTitle: { type: String },
    securityDescription: { type: String },
    securityIcon: { type: String },
    securityColor: { type: String },
    formSteps: { type: [appointmentFormStepSchema] },
    formTitle: { type: String },
    securityIconForm: { type: String },
    securityColorForm: { type: String },
    responseNoteText: { type: String },
    responseNoteValue: { type: String },
    responseNoteValueColor: { type: String }
}, { _id: false });

const sectionTypeSchemas = {
    HERO: heroSectionSchema,
    WHAT_WE_DO: whatWeDoSectionSchema,
    ABOUT_US: aboutUsSectionSchema,
    WHY_CHOOSE_US: whyChooseUsSectionSchema,
    PROCESS: processSectionSchema,
    CASE_STUDIES: caseStudiesSectionSchema,
    TESTIMONIALS: testimonialsSectionSchema,
    TECH_STACK: techStackSectionSchema,
    CTA: ctaSectionSchema,
    CERTIFICATIONS: certificationsSectionSchema,
    COMPANY_STATS: companyStatsSectionSchema,
    INSURANCE_PAYERS: insurancePayersSectionSchema,
    APPOINTMENT_BOOKING: appointmentBookingSectionSchema
};

const homePageSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        metadata: {
            type: seoSchema,
            required: true
        },
        sections: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: Object.keys(sectionTypeSchemas)
                },
                order: {
                    type: Number,
                    required: true,
                    min: 1
                },
                content: {
                    type: mongoose.Schema.Types.Mixed,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const pageHeaderSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }
}, { _id: false });

const missionVisionItemSchema = new mongoose.Schema({
    icon: { type: String },
    title: { type: String },
    description: { type: String },
    highlightedText: { type: String }
}, { _id: false });

const missionVisionSchema = new mongoose.Schema({
    mission: missionVisionItemSchema,
    vision: missionVisionItemSchema
}, { _id: false });

const leadershipMemberSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    role: { type: String },
    description: { type: String },
    initials: { type: String }
}, { _id: false });

const leadershipSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    members: [leadershipMemberSchema]
}, { _id: false });

const complianceSchema = new mongoose.Schema({
    title: { type: String },
    badge: { type: String },
    badgeIcon: { type: String },
    quote: { type: String },
    certifications: [String],
    verificationCode: { type: String },
    watermarkIcon: { type: String }
}, { _id: false });

const statSchema = new mongoose.Schema({
    label: { type: String },
    value: { type: String },
    icon: { type: String }
}, { _id: false });

const processStepSchema = new mongoose.Schema({
    step: { type: String },
    title: { type: String },
    description: { type: String },
    icon: { type: String }
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
    name: { type: String },
    role: { type: String },
    clinic: { type: String },
    content: { type: String },
    avatar: { type: String }
}, { _id: false });

const aboutPageSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'About Us'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageHeader: pageHeaderSchema,
            missionVision: missionVisionSchema,
            leadership: leadershipSchema,
            compliance: complianceSchema,
            stats: [statSchema],
            process: [processStepSchema],
            testimonials: [testimonialSchema]
        }
    },
    { timestamps: true }
);

const termSectionSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    content: { type: String }
}, { _id: false });

const termsSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Terms of Conditions'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageTitle: { type: String },
            pageSubTitle: { type: String },
            content: { type: String }
        }
    },
    { timestamps: true }
);

const questionSchema = new mongoose.Schema(
    {
        id: { type: String },
        question: { type: String },
        answer: { type: String }
    },
    { _id: false }
);

const faqCategorySchema = new mongoose.Schema(
    {
        category: { type: String },
        questions: [questionSchema]
    },
    { _id: false }
);

const faqSchema = new mongoose.Schema(
    {
        metadata: {
            type: seoSchema
        },
        faqs: [faqCategorySchema]
    },
    { timestamps: true }
);

const privacySchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Privacy Policy'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageTitle: { type: String },
            pageSubTitle: { type: String },
            content: { type: String }
        }
    },
    { timestamps: true }
);

const hipaaComplianceSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'HIPAA Compliance'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageTitle: { type: String },
            pageSubTitle: { type: String },
            content: { type: String }
        }
    },
    { timestamps: true }
);

const securityPolicySchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Security Policy'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageTitle: { type: String },
            pageSubTitle: { type: String },
            content: { type: String }
        }
    },
    { timestamps: true }
);

const contactDetailSchema = new mongoose.Schema(
    {
        id: { type: String },
        label: { type: String },
        value: { type: String },
        subtext: { type: String },
        icon: { type: String },
        color: { type: String }
    },
    { _id: false }
);

const formFieldSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    label: { type: String },
    type: { type: String },
    placeholder: { type: String },
    defaultValue: { type: String },
    helpText: { type: String },
    required: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    validationMessage: { type: String },
    validationRules: { type: String },
    minLength: { type: Number },
    maxLength: { type: Number },
    minValue: { type: Number },
    maxValue: { type: Number },
    validationPattern: { type: String },
    fileTypes: { type: String },
    maxFileSize: { type: Number },
    options: [{
        label: { type: String },
        value: { type: String }
    }],
    order: { type: Number, default: 0 }
}, { _id: false });

const contactSubmissionSchema = new mongoose.Schema({
    formId: { type: String, default: 'main_contact' },
    formData: { type: mongoose.Schema.Types.Mixed },
    metadata: {
        ip: { type: String },
        userAgent: { type: String },
        referer: { type: String }
    },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' }
}, { timestamps: true });

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", contactSubmissionSchema);

const socialLinkSchema = new mongoose.Schema(
    {
        id: { type: String },
        icon: { type: String },
        link: { type: String },
        isRedirect: { type: Boolean, default: true },
        iconBg: { type: String, default: 'primary' }
    },
    { _id: false }
);

const contactPageSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Contact Us'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            pageTitle: { type: String },
            pageSubTitle: { type: String },
            content: { type: String },
            heroKicker: { type: String },
            heroTitleMain: { type: String },
            heroTitleHighlight: { type: String },
            heroTitleStyle: { type: String },
            contactDetails: [contactDetailSchema],
            form: {
                title: { type: String },
                fields: [formFieldSchema],
                security: {
                    text: { type: String },
                    icon: { type: String },
                    color: { type: String }
                },
                responseTime: {
                    text: { type: String },
                    value: { type: String }
                },
                trustBar: {
                    text: { type: String }
                }
            },
            socialLinks: [socialLinkSchema]
        }
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        companyName: { type: String },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String },
        service: { type: String },
        message: { type: String },
        formData: { type: mongoose.Schema.Types.Mixed },
        source: { type: String, default: 'contact_form' },
        status: { type: String, default: 'new' }
    },
    { timestamps: true }
);

const blogPageSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Blog Index'
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        metadata: {
            type: seoSchema
        },
    },
    { timestamps: true }
);

const blogCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        metadata: {
            type: seoSchema
        }
    },
    { timestamps: true }
);

const blogPostSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogCategory',
            required: true
        },
        excerpt: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true
        },
        bannerBg: {
            type: String,
        },
        author: {
            type: String,
            required: true,
            trim: true
        },

        publishDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        readTime: {
            type: Number,
            required: true,
            min: 1
        },
        content: {
            type: String,
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        metadata: {
            type: seoSchema
        },
        views: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const serviceCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
        },
        excerpt: {
            type: String,
        },
        icon: {
            type: String
        },
        icon_bg: {
            type: String
        },
        card_bg: {
            type: String
        },
        image: {
            type: String
        },
        displayOrder: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Active', 'Draft'],
            default: 'Active'
        },
        metadata: {
            type: seoSchema
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

serviceCategorySchema.virtual('categoryServices', {
    ref: 'Service',
    localField: '_id',
    foreignField: 'category'
});

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceCategory',
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        excerpt: {
            type: String,
            trim: true
        },
        content: {
            type: String,
        },
        icon: {
            type: String
        },
        icon_bg: {
            type: String
        },
        card_bg: {
            type: String
        },
        image: {
            type: String
        },
        displayOrder: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Active', 'Draft'],
            default: 'Active'
        },
        keyFeatures: [{
            type: String
        }],
        statistics: [{
            label: { type: String },
            value: { type: String },
            icon: { type: String }
        }],
        clientTypes: [{
            type: String
        }],
        specialties: [{
            type: String
        }],
        ctaText: {
            type: String
        },
        ctaLink: {
            type: String
        },
        metadata: {
            type: seoSchema
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const heroSubSchemaServices = new mongoose.Schema(
    {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String }
    },
    { _id: false }
);
const serviceItemSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String },
        title: { type: String },
        description: { type: String },
        features: [{ type: String }],
        tech: [{ type: String }],
        icon: { type: String },
        icon_bg: { type: String },
        card_bg: { type: String }
    },
    { _id: false }
);

const servicesPageSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'Services'
        },
        metadata: {
            type: seoSchema
        },
        hero: {
            type: heroSubSchemaServices
        },
        services: [serviceItemSchema]
    },
    { timestamps: true }
);

const stateItemSchemaExtra = new mongoose.Schema({
    name: { type: String },
    slug: { type: String },
    description: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 }
}, { _id: false });

const statesPageSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
            default: 'States'
        },
        metadata: {
            type: seoSchema
        },
        pageData: {
            title: { type: String },
            subtitle: { type: String },
            description: { type: String },
            states: [stateItemSchemaExtra]
        }
    },
    { timestamps: true }
);

const sitemapLinkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    href: { type: String, required: true },
    description: { type: String }
}, { _id: false });

const sitemapSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    links: [sitemapLinkSchema]
}, { _id: false });

const sitemapSchema = new mongoose.Schema({
    title: { type: String, default: "Sitemap" },
    subtitle: { type: String, default: "Explore our site structure and resources" },
    metadata: {
        type: seoSchema,
        required: true
    },
    sections: [sitemapSectionSchema],
    lastGenerated: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    metadata: { type: seoSchema },
}, { timestamps: true });

const footerLinkSchema = new mongoose.Schema(
    {
        label: { type: String },
        href: { type: String },
        isPrimary: { type: Boolean, default: false }
    },
    { _id: false }
);

const footerSectionSchema = new mongoose.Schema(
    {
        title: { type: String },
        links: [footerLinkSchema]
    },
    { _id: false }
);

const footerComplianceBadgeSchema = new mongoose.Schema(
    {
        label: { type: String },
        icon: { type: String },
        color: { type: String }
    },
    { _id: false }
);

const footerContactDetailSchema = new mongoose.Schema(
    {
        label: { type: String },
        value: { type: String },
        icon: { type: String },
        type: { type: String }
    },
    { _id: false }
);

const footerSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            default: 'Timberlake'
        },
        mission: { type: String },
        complianceText: { type: String },
        complianceBadges: [footerComplianceBadgeSchema],
        solutionsTitle: { type: String, default: 'Solutions' },
        serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
        resourcesTitle: { type: String, default: 'Resources' },
        blogPostIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
        customSections: [footerSectionSchema],
        contactTitle: { type: String, default: 'Contact Operations' },
        contactDetails: [footerContactDetailSchema],
        legalLinks: [footerLinkSchema],
        copyrightYear: { type: Number },
        copyrightCompany: { type: String },
        copyrightTagline: { type: String }
    },
    { timestamps: true }
);

const configSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true },
        value: { type: mongoose.Schema.Types.Mixed, required: true },
        history: { type: [mongoose.Schema.Types.Mixed], default: [] }
    },
    { timestamps: true }
);

const themeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    accent: { type: String, required: true },
    background: { type: String, required: true },
    foreground: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete (mongoose as any).models.StatesPage;
    delete (mongoose as any).models.HomePage;
    delete (mongoose as any).models.Sitemap;
    delete (mongoose as any).models.State;
    delete (mongoose as any).models.ContactPage;
    delete (mongoose as any).models.AboutPage;
    delete (mongoose as any).models.ContactSubmission;
    delete (mongoose as any).models.Footer;
    delete (mongoose as any).models.Config;
    delete (mongoose as any).models.Theme;
    delete (mongoose as any).models.FAQ;
}

export const AboutPage = models.AboutPage || model("AboutPage", aboutPageSchema);
export const Privacy = models.Privacy || model("Privacy", privacySchema);
export const Terms = models.Terms || model("Terms", termsSchema);
export const HipaaCompliance = models.HipaaCompliance || model("HipaaCompliance", hipaaComplianceSchema);
export const SecurityPolicy = models.SecurityPolicy || model("SecurityPolicy", securityPolicySchema);
export const ContactPage = models.ContactPage || model("ContactPage", contactPageSchema);
export const User = models.User || model("User", userSchema);
export const BlogCategory = models.BlogCategory || model("BlogCategory", blogCategorySchema);
export const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);
export const BlogPage = models.BlogPage || model("BlogPage", blogPageSchema);
export const ServiceCategory = models.ServiceCategory || model("ServiceCategory", serviceCategorySchema);
export const Service = models.Service || model("Service", serviceSchema);
export const ServicesPage = models.ServicesPage || model("ServicesPage", servicesPageSchema);
export const StatesPage = models.StatesPage || model("StatesPage", statesPageSchema);
export const HomePage = models.HomePage || model("HomePage", homePageSchema);
export const Sitemap = models.Sitemap || model("Sitemap", sitemapSchema);
export const State = models.State || model("State", stateSchema);
export const Footer = models.Footer || model("Footer", footerSchema);
export const Config = models.Config || model("Config", configSchema);
export const Theme = models.Theme || model("Theme", themeSchema);
export const FAQ = models.FAQ || model("FAQ", faqSchema);


