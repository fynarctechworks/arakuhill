import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Player } from '@lottiefiles/react-lottie-player';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CropHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function CropHero({ onMenuClick }) {
    const compRef = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial state for animations
            gsap.set('.crop-nav, .crop-title-word, .crop-tm, .crop-button, .crop-subtext, .crop-bottom-large, .crop-bottom-small', {
                opacity: 0,
                y: 30
            });
            gsap.set('.crop-line', { scaleX: 0, transformOrigin: 'left center' });
            gsap.set('.crop-center-object', { opacity: 0, scale: 0.8, rotation: -15 });

            // Create ScrollTrigger to animate in when in view
            ScrollTrigger.create({
                trigger: compRef.current,
                start: 'top 60%', // Trigger when top of section is 60% down the viewport
                onEnter: () => {
                    const tl = gsap.timeline();

                    tl.to('.crop-nav', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
                        .to('.crop-title-word', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1 }, '-=0.5')
                        .to('.crop-tm', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
                        .to('.crop-button', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.0')
                        .to('.crop-line', { scaleX: 1, duration: 1.5, ease: 'power4.inOut' }, '-=0.8')
                        .to('.crop-subtext', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, '-=1')
                        .to('.crop-bottom-large', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
                        .to('.crop-bottom-small', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
                        .to('.crop-center-object', { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'back.out(1.2)' }, '-=1.2');
                },
                once: true // Only animate once
            });
        }, compRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="crop-hero intro-container" ref={compRef}>

            {/* Top Navigation */}
            <nav className="crop-nav">
                <div className="crop-nav-left" onClick={onMenuClick} style={{ cursor: 'pointer' }}>
                    MENU
                </div>
                <div className="crop-nav-center" style={{ width: '120px', height: '48px' }}>
                    <img src="/assets/Araku-hill-coffee-logo.svg" alt="Araku Hill Coffee" className="crop-logo" />
                </div>
                <div className="crop-nav-right" onClick={() => navigate('/page/contact-us')} style={{ cursor: 'pointer' }}>
                    CONTACT US
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="crop-content-wrapper">
                {/* Master Title */}
                <div className="crop-title-row">
                    <h1 className="crop-title">
                        <span className="crop-title-word">Coffee</span>
                        <span className="crop-title-word">with</span>
                        <span className="crop-title-word">Impact</span><span className="crop-tm">™</span>
                    </h1>
                    
                    <button className="crop-button" onClick={() => navigate('/page/shop')}>
                        <span className="crop-button-dot">●</span> 
                        SHOP NOW 
                        <span className="crop-button-dot">●</span>
                    </button>
                </div>

                {/* Divider Line */}
                <div className="crop-line"></div>

                {/* Immediate sub-texts below the line */}
                <div className="crop-sub-row">
                    <div className="crop-subtext crop-sub-left">
                        CRAFTED IN THE HILLS.
                    </div>
                    <div className="crop-subtext crop-sub-right">
                        100% Organic Arabica — Grown in Araku Valley.
                    </div>
                </div>

            </div>

            {/* Bottom Screen Content (Absolute aligned to 100vh container) */}
            <div className="crop-bottom-container">
                <div className="crop-bottom-blocks">
                    <h2 className="crop-bottom-large">
                        For Your Cup.<br />
                        For the Planet.
                    </h2>
                    <p className="crop-bottom-small">
                        ORGANIC FARMING.<br />
                        SUSTAINABLE SOURCING.<br />
                        ZERO WASTE ROASTING.
                    </p>
                </div>
            </div>

            {/* Centered Floating Object (Lottie) */}
            <div className="crop-center-object">
                <Player
                    autoplay
                    loop
                    src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69485a267bf1aac8af5df2aa_croptab%203d%20new.json"
                    className="croptab-lottie-item"
                    style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)' }}
                />
            </div>

        </section>
    );
}
