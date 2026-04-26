import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hasPlayedOnce } from './Loader';
import './PreHero.css';
import './CropHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function PreHero({ onMenuClick }) {
    const navigate = useNavigate();
    const navLogoRef = useRef(null);
    const heroLogoRef = useRef(null);
    const textRef = useRef(null);
    const textScrollRef = useRef(null);
    const sectionRef = useRef(null);
    const cupRef = useRef(null);
    const finalTextRef = useRef(null);
    const bgRef = useRef(null);
    const navRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const initialDelay = hasPlayedOnce ? 0.2 : 4.5;

            // The loader takes roughly 5.5 seconds total on first load
            gsap.set(navLogoRef.current, { opacity: 0 });

            // Hero logo starts visible below nav, centered above the title
            // (Opacity 0 initialization removed per user request: "logo in prehero is opasity is 0 make it 1")
            gsap.set(heroLogoRef.current, { y: 20 });
            gsap.to(heroLogoRef.current, {
                y: 0,
                duration: 1,
                delay: initialDelay,
                ease: "power2.inOut"
            });

            // Text initial state
            gsap.set(textRef.current, {
                opacity: 0,
                y: 40
            });

            // Background Image initial state: scaled up and dim
            gsap.set(bgRef.current, {
                scale: 1.3,
                opacity: 0.3,
                filter: 'blur(20px)'
            });

            // Animate text in smoothly AFTER loader (or immediately)
            gsap.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                delay: initialDelay,
                ease: "power3.inOut"
            });

            // Animate Background Image to normal state AFTER loader (or immediately)
            gsap.to(bgRef.current, {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2,
                delay: initialDelay,
                ease: "power3.inOut"
            });

            // ── Hero logo → Nav center animation on scroll ─────────
            // As user scrolls, the large hero logo shrinks and moves up into the nav position
            const logoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300px",
                    scrub: 1,
                }
            });

            // Calculate where the nav center is relative to the hero logo
            logoTl.to(heroLogoRef.current, {
                opacity: 0,
                scale: 0.4,
                y: -180,
                ease: "power2.inOut",
                duration: 1
            }, 0);

            // Simultaneously reveal the nav logo
            logoTl.to(navLogoRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            }, 0.5);

            // ── Blurry nav on scroll ─────────────────────────────
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top -50px", // as soon as user scrolls a little
                onEnter: () => {
                    if (navRef.current) navRef.current.classList.add('nav-scrolled');
                },
                onLeaveBack: () => {
                    if (navRef.current) navRef.current.classList.remove('nav-scrolled');
                }
            });

            // ── GSAP Element-Tracking ScrollTriggers ─────────────────────

            // 1) Text floats up slowly and fades as user scrolls
            gsap.to(textScrollRef.current, {
                y: -150,
                opacity: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500px",
                    scrub: 1
                }
            });

            // 2) Cup GSAP entrance: small and slanted, becomes straight
            gsap.set(cupRef.current, {
                xPercent: -50,
                yPercent: -50,
                opacity: 0,
                scale: 0.4,
                rotation: -30
            });

            gsap.to(cupRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top -100px",
                    end: "top -500px",
                    scrub: 1
                }
            });

            // 3) Parallax offset with rocking animation
            const parallaxTl = gsap.timeline({
                scrollTrigger: {
                    trigger: cupRef.current,
                    start: "center center",
                    endTrigger: sectionRef.current,
                    end: "bottom bottom",
                    scrub: 1
                }
            });
            const width = window.innerWidth;
            const height = window.innerHeight;
            const is390x844 = width === 390 && height === 844;
            const is402x874 = width === 402 && height === 874;
            const is412x915 = width === 412 && height === 915;
            const is412x917 = width === 412 && height === 917;
            const isMobile = width <= 480;
            const isTablet = width <= 768 && width > 480;
            const isLargeTablet = width <= 1180 && width > 768;

            let targetXPercent = 31.4873;
            let targetYPercent = 141.296;
            let targetX = '-1.7528vw';
            let targetY = 59.1811;

            if (is390x844) {
                targetXPercent = -44.166;
                targetYPercent = -36.3043;
                targetX = '-0.1255vw';
                targetY = 450.068;
            } else if (is402x874) {
                targetXPercent = -44.3593;
                targetYPercent = -36.7582;
                targetX = '-0.1214vw';
                targetY = 479.84;
            } else if (is412x917) {
                targetXPercent = -44.3299;
                targetYPercent = -36.6891;
                targetX = '-0.122vw';
                targetY = 510.489;
            } else if (is412x915) {
                targetXPercent = -44.3109;
                targetYPercent = -36.6444;
                targetX = '-0.1224vw';
                targetY = 510.835;
            } else if (isMobile) {
                targetXPercent = -44.3299;
                targetYPercent = -36.6891;
                targetX = '-0.122vw';
                targetY = 510.489;
            } else if (isTablet) {
                // Requested 768x1024 tablet endpoints
                targetXPercent = -44.3751;
                targetYPercent = -36.7952;
                targetX = '-0.121vw';
                targetY = 742.297;
            } else if (isLargeTablet) {
                // Requested 1180x820 tablet endpoints
                targetXPercent = -46.8713;
                targetYPercent = -42.655;
                targetX = '-0.0673vw';
                targetY = 824.321;
            }

            parallaxTl.to(cupRef.current, {
                xPercent: targetXPercent,
                yPercent: targetYPercent,
                x: targetX,
                y: targetY,
                z: 0,
                ease: "none",
                duration: 1
            }, 0);

            parallaxTl.to(cupRef.current, {
                rotation: -0.8946,
                ease: "power1.inOut",
                duration: 0.5
            }, 0);

            parallaxTl.to(cupRef.current, {
                rotation: -0.8946,
                ease: "power1.inOut",
                duration: 0.5
            }, 0.5);

            // 4) Animate the final text in
            parallaxTl.to(finalTextRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 0.6);

            // 5) Change navbar color to dark green when scrolling past PreHero
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "bottom top",
                onEnter: () => {
                    if (navRef.current) navRef.current.classList.add('nav-dark');
                },
                onLeaveBack: () => {
                    if (navRef.current) navRef.current.classList.remove('nav-dark');
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="pre-hero" ref={sectionRef}>
            <div className="pre-hero-img-container">
                <img
                    ref={bgRef}
                    src="/assets/home-bg-araku.webp"
                    alt="Araku Valley Mountains"
                    className="pre-hero-bg"
                />
            </div>
            <div className="pre-hero-overlay"></div>

            {/* Top Navigation */}
            <nav className="crop-nav" ref={navRef}>
                {/* Hamburger Icon */}
                <div className="crop-nav-left" onClick={onMenuClick} style={{ cursor: 'pointer' }}>
                    <svg className="crop-nav-hamburger" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </div>
                <div className="crop-nav-center" style={{ width: '120px', height: '48px' }}>
                    <img ref={navLogoRef} src="/assets/Araku-hill-coffee-logo.svg" alt="Araku Hill Coffee" className="crop-logo" />
                </div>
                {/* Contact Button */}
                <div className="crop-nav-right">
                    <button className="crop-nav-contact-btn" onClick={() => navigate('/page/contact-us')}>
                        Contact
                    </button>
                </div>
            </nav>

            <div className="pre-hero-sticky-content">
                {/* Hero Logo — animates to nav center on scroll */}
                <div className="pre-hero-hero-logo" ref={heroLogoRef}>
                    <img src="/assets/Araku-hill-coffee-logo.svg" alt="Araku Hill Coffee" className="pre-hero-hero-logo-img" />
                </div>

                {/* Centered Coffee Text */}
                <div className="pre-hero-text-container" ref={textScrollRef}>
                    <div ref={textRef}>
                        <h1 className="pre-hero-main-title">Welcome to Araku Hill Coffee</h1>
                        <p className="pre-hero-subtitle">Cultivated with care, roasted with passion, and delivered to awaken your senses.</p>
                    </div>
                </div>

                {/* ── Fixed Final Text beside Cup ── */}
                <div className="pre-hero-final-text" ref={finalTextRef}>
                    <h2 className="pre-hero-final-title">Coffee Lovers</h2>
                    <p className="pre-hero-final-subtitle">A journey of flavor, from the heart of Araku Valley to your cup.</p>
                </div>

                {/* ── The Floating Coffee Cup ── */}
                <img
                    ref={cupRef}
                    src="/assets/cup-scroll-animation.webp"
                    alt="Araku Coffee Cup"
                    className="pre-hero-cup"
                />

            </div>
        </section>
    );
}

