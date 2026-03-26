'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/common/Heading';
import Description from '@/components/common/Description';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumb?: React.ReactNode;
    centered?: boolean;
    className?: string;
    image?: string;
}

export default function PageHeader({
    title,
    description,
    breadcrumb,
    centered = false,
    className,
    image
}: PageHeaderProps) {
    return (
        <>
            {image ? <div className={cn(
                "relative overflow-hidden bg-background py-6 md:py-26 text-foreground min-h-[450px]",
                className
            )}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/40 z-10"></div>
                    {image ? <Image src={image} alt={title} fill className="object-cover" priority />

                        :
                        <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    }
                </div>

                <div className="relative z-10">
                    {breadcrumb && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            {breadcrumb}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 100,
                            duration: 0.8
                        }}
                        className={cn(
                            `flex justify-center space-y-6 min-h-[350px] py-4 h-full relative rounded-r-full ${image ? "text-shadow-sm py-4 rounded-r-full lg:rounded-r-full flex flex-col" : ""}`,
                            centered ? "text-center mx-auto" : "text-left"
                        )}
                    >

                        <div className="hidden lg:block absolute top-0 right-0 -z-10 w-full h-full">
                            <svg
                                className="w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1498 306"
                                preserveAspectRatio="none"
                                fill="none"
                                fillOpacity={0.8}
                            >
                                <path d="M0 0H716C800.5 0 869 68.5004 869 153V153C869 237.5 800.5 306 716 306H0V0Z" fill="#2563EB" />
                            </svg>
                        </div>

                        <div className="max-w-7xl mx-auto py-4 lg:py-8 w-full pl-4 xl:pl-0 bg-primary/80 lg:bg-transparent">
                            <Heading
                                as="h1"
                                size={centered ? 'xl' : 'xl'}
                                align={centered ? 'center' : 'left'}
                                className={cn(`w-full lg:w-1/2 text-xl animate-in fade-in slide-in-from-bottom-6 duration-700 ${image ? "text-white" : ""}`, centered && 'mx-auto')}
                            >
                                {title}
                            </Heading>

                            {description && (
                                <Description className={cn(`text-base lg:text-lg mt-4 lg:mt-8 font-semibold animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ${image ? "text-white" : ""}`, centered ? 'max-w-2xl lg:max-w-3xl mx-auto' : 'max-w-xl lg:max-w-2xl')} size="lg">
                                    {description}
                                </Description>
                            )}
                        </div>
                    </motion.div>
                </div>

            </div>
                :

                <section className={cn(
                    "relative overflow-hidden bg-background py-6 md:py-10 text-foreground",
                    className
                )}>
                    <div className="absolute inset-0 z-0 opacity-10">
                        <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {breadcrumb && (
                            <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
                                {breadcrumb}
                            </div>
                        )}

                        <div className={cn(
                            "space-y-6",
                            centered ? "text-center mx-auto" : "text-left"
                        )}>
                            <Heading
                                as="h1"
                                size={centered ? '3xl' : '2xl'}
                                align={centered ? 'center' : 'left'}
                                className={cn('animate-in fade-in slide-in-from-bottom-6 duration-700', centered && 'mx-auto')}
                            >
                                {title}
                            </Heading>

                            {description && (
                                <Description className={cn(' animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150', centered ? 'max-w-3xl mx-auto' : 'max-w-2xl')} size="lg">
                                    {description}
                                </Description>
                            )}
                        </div>
                    </div>

                </section>
            }
        </>
    );
}
