'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const CursorFollower = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Precise coordinates for the dot
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smoothed coordinates for the follow ring
    const ringX = useSpring(mouseX, { damping: 20, stiffness: 250 });
    const ringY = useSpring(mouseY, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements
            const isClickable = 
                target.tagName.toLowerCase() === 'a' || 
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.cursor-pointer') ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(!!isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on touch devices (cursor follower doesn't make sense there)
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-9999">
            {/* Small center dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: isVisible ? (isClicked ? 0.8 : 1) : 0, 
                    opacity: isVisible ? 1 : 0 
                }}
            />
            
            {/* Larger following ring */}
            <motion.div
                className="fixed top-0 left-0 border border-primary rounded-full mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 36,
                    height: 36,
                }}
                animate={{
                    scale: isVisible 
                        ? (isHovering ? 2.2 : (isClicked ? 0.7 : 1)) 
                        : 0,
                    opacity: isVisible ? 0.7 : 0,
                    borderWidth: isHovering ? 1 : 1.5,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                }}
                transition={{
                    scale: { 
                        type: 'spring', 
                        damping: isClicked ? 10 : 20, 
                        stiffness: isClicked ? 400 : 250, 
                        mass: 0.5 
                    },
                    opacity: { duration: 0.2 },
                }}
            />
        </div>
    );
};

export default CursorFollower;
