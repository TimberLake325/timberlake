'use client';

import React from 'react';
import { motion, useInView, Variants } from "framer-motion";
import * as LucideIcons from 'lucide-react';

interface ProcessStep {
    step: string;
    title: string;
    description: string;
    icon: string;
}

interface ProcessSectionProps {
    steps: ProcessStep[];
}

// Animation variants for the connecting line
const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: "easeInOut",
            delay: 0.5
        }
    }
};

// Animation variants for step circles
const circleVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: (index: number) => ({
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.3 + 0.2,
            duration: 0.8
        }
    }),
    hover: {
        scale: 1.1,
        borderColor: "rgb(var(--primary-rgb))",
        boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.3)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

// Animation variants for step number/label
const stepLabelVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.3 + 0.4,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

// Animation variants for title
const titleVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.3 + 0.5,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

// Animation variants for description
const descriptionVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.3 + 0.6,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

// Icon animation variants
const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -90 },
    visible: (index: number) => ({
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.3 + 0.3,
            duration: 0.6
        }
    }),
    hover: {
        scale: 1.2,
        rotate: 10,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const ProcessSection = ({ steps }: ProcessSectionProps) => {
    if (!steps || steps.length === 0) return null;

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="my-32"
        >
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4">Our Proven Process</h2>
                <p className="text-black/60 max-w-2xl mx-auto">Transparency at every stage of the revenue cycle.</p>
            </motion.div>

            {/* Process Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Animated Connecting Line */}
                <motion.div
                    className="hidden md:block absolute top-1/6 w-[70%] left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"
                    variants={lineVariants}
                    style={{ originX: 0.5 }}
                />

                {steps.map((step, idx) => {
                    const Icon = (LucideIcons as any)[step.icon] || LucideIcons.Zap;

                    const colorSchemes = [
                        { bg: "bg-gradient-to-br from-blue-100 to-blue-100", border: "border-blue-200", hoverBorder: "group-hover:border-blue-400", iconBg: "bg-blue-100", glowColor: "bg-blue-400", textColor: "text-blue-600", hoverBg: "hover:from-blue-50 hover:to-blue-150" },
                        { bg: "bg-gradient-to-br from-purple-100 to-purple-100", border: "border-purple-200", hoverBorder: "group-hover:border-purple-400", iconBg: "bg-purple-100", glowColor: "bg-purple-400", textColor: "text-purple-600", hoverBg: "hover:from-purple-50 hover:to-purple-150" },
                        { bg: "bg-gradient-to-br from-indigo-100 to-indigo-100", border: "border-indigo-200", hoverBorder: "group-hover:border-indigo-400", iconBg: "bg-indigo-100", glowColor: "bg-indigo-400", textColor: "text-indigo-600", hoverBg: "hover:from-indigo-50 hover:to-indigo-150" },
                    ];

                    const colors = colorSchemes[idx % colorSchemes.length];

                    return (
                        <motion.div
                            key={idx}
                            className="relative flex flex-col items-center text-center group"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover="hover"
                        >
                            {/* Circle Container */}
                            <motion.div
                                className="relative mb-6 z-10"
                                variants={circleVariants}
                                custom={idx}
                                whileHover="hover"
                            >
                                <div className={`w-16 h-16 ${colors.bg} border-2 ${colors.border} rounded-full flex items-center justify-center ${colors.hoverBorder} transition-colors relative overflow-hidden shadow-sm`}>
                                    {/* Background pulse effect on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5 rounded-full"
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1.5 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* Icon */}
                                    <motion.div
                                        variants={iconVariants}
                                        custom={idx}
                                        whileHover="hover"
                                    >
                                        <Icon className="w-6 h-6 text-primary relative z-10" />
                                    </motion.div>
                                </div>

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-lg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{
                                        opacity: 0.5,
                                        scale: 1.2,
                                        transition: { duration: 0.3 }
                                    }}
                                />
                            </motion.div>

                            {/* Step Number/Label */}
                            <motion.span
                                className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2"
                                variants={stepLabelVariants}
                                custom={idx}
                            >
                                {step.step}
                            </motion.span>

                            {/* Title */}
                            <motion.h3
                                className="text-lg font-black text-black mb-3"
                                variants={titleVariants}
                                custom={idx}
                            >
                                {step.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.div
                                variants={descriptionVariants}
                                custom={idx}
                                className="text-sm text-black/60 leading-relaxed"
                            >
                                <div dangerouslySetInnerHTML={{ __html: step.description }} />
                            </motion.div>

                            {/* Decorative element - connecting dot for mobile */}
                            {idx < steps.length - 1 && (
                                <motion.div
                                    className="md:hidden absolute -bottom-6 left-1/2 w-0.5 h-6 bg-primary/20"
                                    initial={{ scaleY: 0 }}
                                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                                    transition={{
                                        delay: idx * 0.3 + 0.8,
                                        duration: 0.5
                                    }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Floating particles effect (optional decorative element) */}
            {isInView && (
                <>
                    <motion.div
                        className="hidden md:block absolute w-2 h-2 bg-primary/20 rounded-full"
                        style={{ left: '15%', top: '50%' }}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [0, 1, 0],
                            x: [0, 50, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: 1
                        }}
                    />
                    <motion.div
                        className="hidden md:block absolute w-3 h-3 bg-primary/10 rounded-full"
                        style={{ right: '20%', top: '45%' }}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [0, 1.5, 0],
                            y: [0, -30, 0],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: 2
                        }}
                    />
                </>
            )}
        </motion.div>
    );
};

export default ProcessSection;