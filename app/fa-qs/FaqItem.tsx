'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import RichText from '@/components/ui/RichText';

interface FaqItemProps {
    question: string;
    answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border/10 last:border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group transition-all"
            >
                <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-primary' : 'text-foreground/80 group-hover:text-primary'}`}>
                    {question}
                </span>
                <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <div className={`p-2 rounded-full ${isOpen ? 'bg-primary text-background' : 'bg-muted/50 text-foreground/50 group-hover:bg-primary group-hover:text-background'}`}>
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 pr-12">
                            <RichText content={answer} className="!text-foreground/70" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FaqItem;
