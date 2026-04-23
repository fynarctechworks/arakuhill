import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BrandStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
    const sectionRef = useRef(null);
    const videoContainerRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);
    const modalContentRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    useEffect(() => {
        if (!sectionRef.current || shouldLoadVideo) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '800px' }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [shouldLoadVideo]);

    // ── Entrance Animation ──────────────────────────────
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([headerRef.current, videoContainerRef.current], {
                opacity: 0,
                y: 60,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            });

            tl.to(headerRef.current, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            })
            .to(videoContainerRef.current, {
                opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            }, '-=0.4');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Modal ───────────────────────────────────────────
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (modalContentRef.current) {
            gsap.to(modalContentRef.current, {
                y: 40, opacity: 0, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    setIsModalOpen(false);
                    document.body.style.overflow = '';
                }
            });
        } else {
            setIsModalOpen(false);
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        if (isModalOpen && modalContentRef.current) {
            gsap.set(modalContentRef.current, { y: 40, opacity: 0 });
            gsap.to(modalContentRef.current, {
                y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1,
            });
        }
    }, [isModalOpen]);

    return (
        <section className="brand-story" ref={sectionRef}>
            {/* Background Video */}
            <video
                className="brand-story-bg-video"
                src={shouldLoadVideo ? "/assets/brand-story-video.mp4" : undefined}
                preload="none"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="brand-story-bg-overlay"></div>

            <div className="brand-story-content-wrapper">
                <div className="section-header" ref={headerRef} style={{ '--text-color': '#fff', '--subtitle-color': '#ddd' }}>
                    <h2 className="section-title">Brand Story</h2>
                    <p className="section-subtitle">A journey of passion from the Araku Valley to your perfect brew.</p>
                </div>

                <div className="brand-story-hero-text" ref={videoContainerRef}>
                    <p>It didn't start with a café.</p>
                    <p>It started with a question.</p>
                    <button className="brand-story-cta-outline" onClick={openModal}>
                        Read Our Story
                    </button>
                </div>
            </div>


            {/* ── Full Story Modal ── */}
            {isModalOpen && (
                <div className="brand-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div className="brand-modal" ref={modalContentRef}>
                        <button className="brand-modal-close" onClick={closeModal} aria-label="Close">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>

                        <div className="brand-modal-body">
                            <h2 className="brand-modal-title">Our Story</h2>

                            <p className="modal-highlight">It didn't start with a café.</p>
                            <p className="modal-highlight accent">It started with a question.</p>

                            <p className="modal-question">Why does good coffee have to be occasional?</p>

                            <p>As people who genuinely love coffee, we saw the gap every day — great coffee was either overpriced, overcomplicated, or simply out of reach for daily life.</p>

                            <p className="modal-emphasis">And the alternative? Coffee that lacked quality, lacked care, lacked soul.</p>

                            <p>We knew there had to be a better way. So <strong>AHC</strong> began as an idea — to create coffee that you don't have to "plan for." Coffee that fits into your everyday life, without compromise.</p>

                            <p>But if we were going to do it, we wanted to do it right.</p>

                            <p>That search led us to the <strong>hills of Araku</strong> — where coffee isn't manufactured, it's grown with patience. Where every bean is <strong>100% organic, single-origin Arabica</strong>, cultivated naturally, without chemicals, in harmony with the land.</p>

                            <p className="modal-emphasis">And more importantly — where coffee is not just a crop, but a way of life.</p>

                            <p>The tribal communities of Araku have been nurturing this land for generations. Their craftsmanship, their discipline, their quiet dedication — that's where our coffee gets its character.</p>

                            <p className="modal-highlight">That's where AHC found its soul.</p>

                            <p>From there, everything became clear. We didn't want to build just another café. We wanted to build something honest.</p>

                            <p className="modal-emphasis">Something that gives you:</p>

                            <ul className="brand-modal-values">
                                <li>Clean, healthy coffee you can trust</li>
                                <li>Quality that feels premium, not pretentious</li>
                                <li>A price that makes it part of your everyday routine</li>
                            </ul>

                            <p>Because coffee shouldn't feel like an indulgence.</p>

                            <p className="modal-poetic">It should feel like a rhythm.<br />A small pause in your day.<br />A moment to reset.<br />A habit you look forward to.</p>

                            <p><strong>AHC</strong> is built on that belief — that great coffee can be simple, accessible, and meaningful, all at once.</p>

                            <p>From the hills of Araku to your everyday cup, every detail is intentional.</p>

                            <p className="modal-highlight">Every sip has a story.</p>

                            <p className="modal-emphasis">This is not just where we started. This is what we stand for.</p>

                            <p className="modal-closing">This is <strong>Araku Hill Coffee</strong>.</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

