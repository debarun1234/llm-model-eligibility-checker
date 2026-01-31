import { useEffect, useRef } from 'react';

const BackgroundParticles = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Rainbow colors - vibrant mix
        const colors = [
            '#FF6B6B', // Red
            '#FF8E53', // Orange
            '#FFC93C', // Yellow
            '#6BCB77', // Green
            '#4D96FF', // Blue
            '#00E5FF', // Cyan
            '#9D4EDD', // Purple
            '#FF006E', // Pink
            '#06FFA5', // Mint
            '#FFBE0B'  // Gold
        ];

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.angle = Math.random() * Math.PI * 2;
            }

            update(mouse) {
                // Gentle floating animation
                this.baseX += this.speedX;
                this.baseY += this.speedY;

                // Wrap around screen
                if (this.baseX < 0) this.baseX = canvas.width;
                if (this.baseX > canvas.width) this.baseX = 0;
                if (this.baseY < 0) this.baseY = canvas.height;
                if (this.baseY > canvas.height) this.baseY = 0;

                // Mouse interaction - particles move away from cursor
                const dx = mouse.x - this.baseX;
                const dy = mouse.y - this.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.x = this.baseX - Math.cos(angle) * force * 40;
                    this.y = this.baseY - Math.sin(angle) * force * 40;
                } else {
                    // Smooth return to base position
                    this.x += (this.baseX - this.x) * 0.1;
                    this.y += (this.baseY - this.y) * 0.1;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Draw as small star/dash
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;

                // Star shape (small dash/line)
                ctx.beginPath();
                ctx.moveTo(-this.size * 2, 0);
                ctx.lineTo(this.size * 2, 0);
                ctx.lineWidth = this.size;
                ctx.strokeStyle = this.color;
                ctx.stroke();

                ctx.restore();
            }
        }

        // Create particles
        const particleCount = 100;
        particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'; // Dark fade for trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                particle.update(mouseRef.current);
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.6
            }}
        />
    );
};

export default BackgroundParticles;
