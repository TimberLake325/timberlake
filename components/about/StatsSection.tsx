'use client';

import { motion, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as LucideIcons from 'lucide-react';

interface Stat {
    label: string;
    value: string;
    icon: string;
}

interface StatsSectionProps {
    stats: Stat[];
}

// Helper function to parse numeric value from string
const parseNumericValue = (valueStr: string): number => {
    const matches = valueStr.match(/-?\d+\.?\d*/);
    return matches ? parseFloat(matches[0]) : 0;
};

// Helper function to determine if value should be animated as whole number
const shouldUseWholeNumbers = (valueStr: string): boolean => {
    // Check for time formats (days, hrs, etc.)
    if (valueStr.toLowerCase().includes('day') || valueStr.toLowerCase().includes('hr')) {
        return true;
    }

    // Check for whole number indicators (no decimal point)
    if (!valueStr.includes('.')) {
        return true;
    }

    return false;
};

// Helper function to format value with original formatting
const formatValue = (originalValue: string, numericValue: number): string => {
    // Handle percentages
    if (originalValue.includes('%')) {
        return `${numericValue.toFixed(1)}%`;
    }

    // Handle whole numbers (like "32")
    if (!originalValue.includes('.') && !originalValue.includes('%')) {
        return Math.round(numericValue).toString();
    }

    // Handle decimal numbers
    if (originalValue.includes('.')) {
        const decimalPlaces = originalValue.split('.')[1]?.length || 1;
        return numericValue.toFixed(decimalPlaces);
    }

    // Default
    return Math.round(numericValue).toString();
};

// Animated counter component
const AnimatedValue = ({ value }: { value: string }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const numericTarget = parseNumericValue(value);
        if (numericTarget === 0) {
            setDisplayValue(value);
            return;
        }

        let startTime: number | null = null;
        const duration = 2000; // 2 seconds
        const useWholeNumbers = shouldUseWholeNumbers(value);

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 3);

            let currentNumeric = numericTarget * easeOutQuart;

            // Round to whole number if needed
            if (useWholeNumbers) {
                currentNumeric = Math.ceil(currentNumeric);
                if (currentNumeric > numericTarget) {
                    currentNumeric = numericTarget;
                }
            }

            const formattedValue = formatValue(value, currentNumeric);
            setDisplayValue(formattedValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value exactly matches original
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}
        </span>
    );
};

// Card hover animation variants
const cardVariants: Variants = {
    initial: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.15,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1] as const
        }
    }),
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

// Icon animation variants
const iconVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

const StatsSection = ({ stats }: StatsSectionProps) => {
    if (!stats || stats.length === 0) return null;

    const colorSchemes = [
        { bg: "bg-blue-100", border: "border-blue-200", hoverBorder: "hover:border-blue-300", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
        { bg: "bg-green-100", border: "border-green-200", hoverBorder: "hover:border-green-300", iconBg: "bg-green-100", iconColor: "text-green-600" },
        { bg: "bg-purple-100", border: "border-purple-200", hoverBorder: "hover:border-purple-300", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
        { bg: "bg-orange-100", border: "border-orange-200", hoverBorder: "hover:border-orange-300", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
        { bg: "bg-pink-100", border: "border-pink-200", hoverBorder: "hover:border-pink-300", iconBg: "bg-pink-100", iconColor: "text-pink-600" },
        { bg: "bg-indigo-100", border: "border-indigo-200", hoverBorder: "hover:border-indigo-300", iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
        { bg: "bg-yellow-100", border: "border-yellow-200", hoverBorder: "hover:border-yellow-300", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
        { bg: "bg-red-100", border: "border-red-200", hoverBorder: "hover:border-red-300", iconBg: "bg-red-100", iconColor: "text-red-600" },
        { bg: "bg-teal-100", border: "border-teal-200", hoverBorder: "hover:border-teal-300", iconBg: "bg-teal-100", iconColor: "text-teal-600" },
        { bg: "bg-cyan-100", border: "border-cyan-200", hoverBorder: "hover:border-cyan-300", iconBg: "bg-cyan-100", iconColor: "text-cyan-600" }
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24"
        >
            {stats.map((stat, idx) => {
                const Icon = (LucideIcons as any)[stat.icon] || LucideIcons.BarChart;
                const colors = colorSchemes[idx % colorSchemes.length];

                return (
                    <motion.div
                        key={idx}
                        custom={idx}
                        variants={cardVariants}
                        whileHover="hover"
                        className={`${colors.bg} ${colors.border} p-8 rounded-3xl border shadow-sm hover:shadow-xl ${colors.hoverBorder} transition-all group relative overflow-hidden`}
                    >
                        {/* Background gradient effect on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={false}
                        />

                        {/* Animated border glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                            style={{
                                boxShadow: "0 0 0 2px rgba(var(--primary-rgb), 0.1), 0 0 20px rgba(var(--primary-rgb), 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                className="flex items-center gap-4 mb-4"
                                variants={{
                                    hover: { x: 4 }
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className={`p-3 ${colors.iconBg} rounded-2xl group-hover:${colors.iconBg.replace('bg-', 'bg-')}/20 transition-colors`}
                                    variants={iconVariants}
                                    whileHover="hover"
                                >
                                    <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                                </motion.div>
                                <span className="text-4xl font-black text-black tracking-tight">
                                    <AnimatedValue value={stat.value} />
                                </span>
                            </motion.div>

                            <motion.p
                                className="text-sm font-bold text-black/40 uppercase tracking-widest"
                                variants={{
                                    hover: { color: "rgba(0,0,0,0.6)" }
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {stat.label}
                            </motion.p>
                        </div>

                        {/* Decorative corner accent on hover */}
                        <motion.div
                            className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                clipPath: "polygon(100% 0, 0 0, 100% 100%)"
                            }}
                        />
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default StatsSection;