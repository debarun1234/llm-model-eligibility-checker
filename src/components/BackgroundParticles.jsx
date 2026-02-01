import { useEffect, useRef } from 'react';

/**
 * Google Antigravity-Style Particle System
 * 
 * Architecture:
 * - Cursor-centered localized simulation field (180-250px radius)
 * - Particles are temporary visualizations of cursor energy, not persistent objects
 * - Swirl/curl forces create bubble-like fluid motion
 * - Density emerges from mouse velocity and acceleration
 * - No particles exist when cursor is idle or outside influence
 * 
 * This is NOT a full-screen particle background.
 * This IS a cursor-attached, rotating, energy-driven attention field.
 */

const BackgroundParticles = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: 0,
        vy: 0,
        prevX: window.innerWidth / 2,
        prevY: window.innerHeight / 2,
        prevTime: Date.now()
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Respect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        // Canvas setup with device pixel ratio for sharpness
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // VISUAL CONSTRAINTS: Muted palette (2-3 hues)
        const colors = [
            'rgba(0, 229, 255, 0.4)',   // Cyan
            'rgba(147, 51, 234, 0.35)',  // Violet
            'rgba(255, 255, 255, 0.3)'   // Soft white
        ];

        // PHYSICS CONSTANTS
        const INFLUENCE_RADIUS = 220; // Localized field radius
        const SPAWN_RADIUS = 40;      // How close to cursor particles spawn
        const MIN_VELOCITY_THRESHOLD = 0.5; // Below this, no new particles

        /**
         * Particle Class
         * - Short-lived (1-3 seconds)
         * - No home position
         * - No long-term identity
         * - Disposable carriers of motion energy
         */
        class Particle {
            constructor(x, y, energy) {
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;

                this.size = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Short-lived with variable decay
                this.life = 1.0;
                this.maxLife = 1.0 + Math.random() * 2.0; // 1-3 seconds
                this.decay = 1.0 / (this.maxLife * 60); // Assuming 60fps

                this.opacity = 0;
                this.targetOpacity = 0.6 + Math.random() * 0.4;
            }

            /**
             * Apply Forces (WHY, not just WHAT)
             * 
             * Two force types create the bubble-like feel:
             * 1. Radial Force: Mild attraction at medium distance, repulsion up close
             * 2. Curl/Rotational Force: Creates the swirl - CRITICAL for fluid feel
             * 
             * Without curl, motion feels mechanical.
             * With curl, motion feels like stirring liquid.
             */
            applyForces(mouseX, mouseY, mouseVx, mouseVy) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < INFLUENCE_RADIUS && distance > 0.1) {
                    const normalizedDx = dx / distance;
                    const normalizedDy = dy / distance;

                    // 1. RADIAL FORCE
                    // Attraction at medium distance, repulsion up close
                    let radialStrength;
                    if (distance < 60) {
                        // Close: gentle repulsion
                        radialStrength = -0.3 * (60 - distance) / 60;
                    } else {
                        // Medium: mild attraction
                        radialStrength = 0.15 * (1 - distance / INFLUENCE_RADIUS);
                    }

                    this.vx += normalizedDx * radialStrength;
                    this.vy += normalizedDy * radialStrength;

                    // 2. CURL/ROTATIONAL FORCE (Creates the swirl!)
                    // Perpendicular to radial direction
                    const curlStrength = 0.25 * (1 - distance / INFLUENCE_RADIUS);
                    this.vx += -normalizedDy * curlStrength;
                    this.vy += normalizedDx * curlStrength;

                    // 3. MOUSE VELOCITY INFLUENCE
                    // Particles inherit some of the cursor's motion energy
                    const velocityInfluence = 0.02 * (1 - distance / INFLUENCE_RADIUS);
                    this.vx += mouseVx * velocityInfluence;
                    this.vy += mouseVy * velocityInfluence;
                }
            }

            update(mouseX, mouseY, mouseVx, mouseVy) {
                // Apply physics forces
                this.applyForces(mouseX, mouseY, mouseVx, mouseVy);

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Drag (fluid resistance)
                this.vx *= 0.96;
                this.vy *= 0.96;

                // Smooth fade in/out
                if (this.opacity < this.targetOpacity) {
                    this.opacity += 0.05;
                } else {
                    this.opacity += (this.targetOpacity - this.opacity) * 0.1;
                }

                // Decay life
                this.life -= this.decay;
            }

            draw(ctx) {
                if (this.life <= 0) return;

                const alpha = this.life * this.opacity;

                ctx.save();
                ctx.globalAlpha = alpha;

                // Soft bubble appearance
                ctx.shadowBlur = 12;
                ctx.shadowColor = this.color;

                // Draw as luminous dash/blob
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }

            isDead() {
                return this.life <= 0;
            }

            isInRadius(mouseX, mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                return Math.sqrt(dx * dx + dy * dy) < INFLUENCE_RADIUS;
            }
        }

        /**
         * Mouse Movement Handler
         * Calculates velocity and acceleration to determine energy injection
         */
        const handleMouseMove = (e) => {
            const currentTime = Date.now();
            const dt = Math.max((currentTime - mouseRef.current.prevTime) / 1000, 0.016);

            const dx = e.clientX - mouseRef.current.prevX;
            const dy = e.clientY - mouseRef.current.prevY;

            // Calculate velocity (energy proxy)
            const vx = dx / dt;
            const vy = dy / dt;
            const velocity = Math.sqrt(vx * vx + vy * vy);

            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
                vx: vx,
                vy: vy,
                velocity: velocity,
                prevX: e.clientX,
                prevY: e.clientY,
                prevTime: currentTime
            };

            // DENSITY EMERGES FROM MOUSE ENERGY
            // Fast movement → more particles
            // Slow movement → fewer particles
            // Idle → no particles

            if (velocity > MIN_VELOCITY_THRESHOLD) {
                const energy = Math.min(velocity / 200, 1.5);
                const particlesToSpawn = Math.floor(energy * 2) + (Math.random() < energy * 0.5 ? 1 : 0);

                for (let i = 0; i < particlesToSpawn; i++) {
                    // Spawn near cursor with randomness
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * SPAWN_RADIUS;
                    const spawnX = e.clientX + Math.cos(angle) * distance;
                    const spawnY = e.clientY + Math.sin(angle) * distance;

                    particlesRef.current.push(new Particle(spawnX, spawnY, energy));
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        /**
         * Animation Loop
         * - Updates only particles in influence radius
         * - Removes dead particles
         * - Pauses when tab inactive (handled by requestAnimationFrame)
         */
        const animate = () => {
            // Gentle fade (not full clear)
            ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            // Update and draw only particles in influence radius
            particlesRef.current = particlesRef.current.filter(particle => {
                particle.update(mouse.x, mouse.y, mouse.vx, mouse.vy);

                // Only draw if alive and in radius (LOCALIZED)
                if (!particle.isDead() && particle.isInRadius(mouse.x, mouse.y)) {
                    particle.draw(ctx);
                    return true;
                }

                // Remove dead particles (automatic cleanup)
                return !particle.isDead();
            });

            // Performance: cap at 200 particles
            if (particlesRef.current.length > 200) {
                particlesRef.current = particlesRef.current.slice(-200);
            }

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
                zIndex: 0
            }}
        />
    );
};

export default BackgroundParticles;
