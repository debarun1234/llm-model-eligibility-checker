import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GlowingParticles = () => {
    // Generate random particles
    const particleCount = 15; // Increased count
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            // Start positions in percentages to cover the whole word + margin
            left: Math.random() * 140 - 20, // -20% to 120%
            top: Math.random() * 200 - 50,  // -50% to 150%
            size: Math.random() * 4 + 3,    // 3px to 7px
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 3, // Slower movement
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-200"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        boxShadow: `0 0 ${p.size * 2}px rgba(0, 229, 255, 0.8)`,
                    }}
                    animate={{
                        x: [0, (Math.random() * 40 - 20), 0], // Roam in pixels
                        y: [0, (Math.random() * 40 - 20), 0],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default GlowingParticles;
