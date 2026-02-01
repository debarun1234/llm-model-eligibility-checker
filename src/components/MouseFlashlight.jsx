import { useEffect, useRef } from 'react';

/**
 * Mouse Flashlight Effect - Dramatic Line Brightening
 * Makes circuit lines MUCH brighter and more vibrant where mouse hovers
 */
const MouseFlashlight = () => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // STRONG vibrance boost - very high opacity for dramatic effect
            overlay.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(0, 229, 255, 0.9) 0%, rgba(147, 51, 234, 0.7) 30%, rgba(236, 72, 153, 0.5) 60%, transparent 100%)`;
        };

        const handleMouseLeave = () => {
            overlay.style.background = 'transparent';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                mixBlendMode: 'screen', // Screen mode - maximum brightness
                transition: 'background 0.05s ease-out'
            }}
        />
    );
};

export default MouseFlashlight;
