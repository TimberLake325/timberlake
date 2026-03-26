'use client';

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  id?: string;
  value?: string;
  label?: string;
  description?: string;
}

interface CompanyStatsProps {
  data?: {
    stats?: StatItem[];
    additionalStats?: StatItem[];
  };
}

const DEFAULT_STATS: StatItem[] = [
  {
    id: "default-stat-1",
    value: "99.2",
    label: "Clean Claims Rate",
    description: "Industry-leading accuracy"
  },
  {
    id: "default-stat-2",
    value: "$2.4M+",
    label: "Revenue Recovered",
    description: "For our clients annually"
  },
  {
    id: "default-stat-3",
    value: "40+",
    label: "Medical Specialties",
    description: "Supported expertise"
  },
  {
    id: "default-stat-4",
    value: "<24h",
    label: "Avg. Claim Resolution",
    description: "Faster than industry standard"
  }
];

// Helper function to parse numeric value from string
const parseNumericValue = (valueStr: string): number => {
  // Extract numbers, decimals, and minus sign
  const matches = valueStr.match(/-?\d+\.?\d*/);
  return matches ? parseFloat(matches[0]) : 0;
};

// Helper function to determine if value should be animated as whole number
const shouldUseWholeNumbers = (valueStr: string): boolean => {
  // Check for time formats (h, hrs, hour, hours)
  if (valueStr.includes('h') || valueStr.includes('hr')) {
    return true;
  }
  
  // Check for whole number indicators (no decimal point or explicit + sign with no decimal)
  if (!valueStr.includes('.')) {
    return true;
  }
  
  return false;
};

// Helper function to format value with original formatting
const formatValue = (originalValue: string, numericValue: number): string => {
  // Handle time format (<24h)
  if (originalValue.includes('<') && originalValue.includes('h')) {
    return `<${Math.round(numericValue)}h`;
  }
  
  // Handle time format without <
  if (originalValue.includes('h') && !originalValue.includes('<')) {
    return `${Math.round(numericValue)}h`;
  }
  
  // Handle currency with M suffix
  if (originalValue.includes('$') && originalValue.includes('M')) {
    return `$${numericValue.toFixed(1)}M+`;
  }
  
  // Handle currency with K suffix
  if (originalValue.includes('$') && originalValue.includes('K')) {
    return `$${numericValue.toFixed(1)}K+`;
  }
  
  // Handle plain currency
  if (originalValue.includes('$')) {
    return `$${numericValue.toFixed(1)}+`;
  }
  
  // Handle percentages
  if (originalValue.includes('%')) {
    return `${numericValue.toFixed(1)}%`;
  }
  
  // Handle numbers with + (like "40+")
  if (originalValue.includes('+') && !originalValue.includes('$')) {
    return `${Math.round(numericValue)}+`;
  }
  
  // Handle decimal numbers (like "99.2")
  if (originalValue.includes('.')) {
    const decimalPlaces = originalValue.split('.')[1]?.length || 1;
    return numericValue.toFixed(decimalPlaces);
  }
  
  // Default: round to whole number
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
        // Ensure we don't exceed the target
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

export default function CompanyStats({ data }: CompanyStatsProps = {}) {
  const isNewStructure = data && !data.additionalStats && Array.isArray((data as any).stats);

  const stats = isNewStructure ? ((data as any).stats || []) : (data?.stats || DEFAULT_STATS);
  const additionalStats = isNewStructure ? [] : (data?.additionalStats || []);

  const allStats = [...stats, ...additionalStats];

  const displayStats = allStats.length >= 4 ? allStats.slice(0, 4) : [
    ...allStats,
    ...DEFAULT_STATS.slice(allStats.length, 4)
  ];

  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-3xl overflow-hidden bg-background/5 backdrop-blur-sm shadow-2xl shadow-black/20">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.id || `stat-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="relative group p-8 md:p-12 text-center text-background border-r border-b border-white/10 last:border-r-0 lg:[&:nth-child(n+3)]:border-b-0 lg:[&:nth-child(2)]:border-r-white/10"
            >
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-500" />

              <div className="relative z-10 space-y-3">
                <div className="text-4xl md:text-6xl font-black tracking-tighter">
                  <AnimatedValue value={stat.value || "N/A"} />
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-8 bg-accent mx-auto rounded-full mb-3" />
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-background/60">
                    {stat.label || "Statistic"}
                  </div>

                  {stat.description && (
                    <div
                      className="text-[9px] md:text-[10px] text-background/40 mt-2 font-medium"
                      dangerouslySetInnerHTML={{ __html: stat.description || "" }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {additionalStats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-background/60 text-sm">
              +{additionalStats.length} more key metrics tracked
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}