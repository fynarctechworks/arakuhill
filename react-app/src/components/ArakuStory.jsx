import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ArakuStory.css'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════
   ArakuStory — Editorial Brand Storytelling Section

   Structure:
   ─────────────────────────────
   1. Full-bleed parallax hero image of Araku Valley
   2. Cinematic text overlay with scroll-reveal
   3. Key stats bar (Altitude, Heritage, Farmers, Organic)
   4. Two-column editorial narrative
   5. Pull-quote / highlight strip

   Design:
   ─────────────────────────────
   - Dark palette over the hero image
   - Returns to beige for the editorial text block
   - GSAP ScrollTrigger for parallax + fade-in reveals
   ══════════════════════════════════════════════════ */

export default function ArakuStory() {
    const sectionRef = useRef(null)
    const heroImgRef = useRef(null)
    const heroOverlayRef = useRef(null)
    const heroTitleRef = useRef(null)
    const heroSubRef = useRef(null)

    const statsRef = useRef(null)
    const statRefs = useRef([])

    const editLeftRef = useRef(null)
    const editRightRef = useRef(null)
    const quoteRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Parallax on hero image ──────────── */
            gsap.to(heroImgRef.current, {
                yPercent: 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'top -50%',
                    scrub: true,
                },
            })

            /* ── Hero text reveal ────────────────── */
            gsap.fromTo(heroTitleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: heroOverlayRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            gsap.fromTo(heroSubRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: {
                        trigger: heroOverlayRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            /* ── Stats counter-like reveal ───────── */
            statRefs.current.filter(Boolean).forEach((stat, i) => {
                gsap.fromTo(stat,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.7, ease: 'power2.out',
                        delay: i * 0.12,
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            /* ── Editorial columns reveal ────────── */
            gsap.fromTo(editLeftRef.current,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0,
                    duration: 0.8, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: editLeftRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            gsap.fromTo(editRightRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1, x: 0,
                    duration: 0.8, ease: 'power2.out', delay: 0.15,
                    scrollTrigger: {
                        trigger: editRightRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            /* ── Quote strip reveal ──────────────── */
            gsap.fromTo(quoteRef.current,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.8, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const STATS = [
        { value: '1,100m', label: 'Altitude' },
        { value: '100+', label: 'Years Heritage' },
        { value: '500+', label: 'Tribal Farmers' },
        { value: '100%', label: 'Organic' },
    ]

    return (
        <section className="araku-story" ref={sectionRef}>

            {/* ══ PARALLAX HERO ═══════════════════ */}
            <div className="araku-story__hero">
                <img
                    className="araku-story__hero-img"
                    ref={heroImgRef}
                    src="/images/story/araku-valley.png"
                    alt="Araku Valley coffee plantations in the morning mist"
                    draggable="false"
                />
                <div className="araku-story__hero-overlay" ref={heroOverlayRef}>
                    <h2 className="araku-story__hero-title" ref={heroTitleRef}>
                        The Araku Story
                    </h2>
                    <p className="araku-story__hero-sub" ref={heroSubRef}>
                        Where ancient tribal wisdom meets single-origin perfection
                    </p>
                </div>
            </div>

            {/* ══ STATS BAR ══════════════════════ */}
            <div className="araku-story__stats" ref={statsRef}>
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="araku-story__stat"
                        ref={(el) => { statRefs.current[i] = el }}
                    >
                        <span className="araku-story__stat-value">{stat.value}</span>
                        <span className="araku-story__stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* ══ EDITORIAL TEXT ══════════════════ */}
            <div className="araku-story__editorial">
                <div className="araku-story__edit-left" ref={editLeftRef}>
                    <h3 className="araku-story__edit-heading">
                        From Valley<br />to Cup
                    </h3>
                    <p className="araku-story__edit-body">
                        Nestled in the Eastern Ghats of Andhra Pradesh, the Araku Valley
                        is home to one of the world's most pristine coffee-growing regions.
                        Here, at elevations above 1,000 metres, indigenous tribal communities
                        have cultivated coffee for over a century — using methods passed down
                        through generations that honour both the land and the bean.
                    </p>
                </div>

                <div className="araku-story__edit-right" ref={editRightRef}>
                    <p className="araku-story__edit-body">
                        Every cup of Araku Hill Coffee begins with a single cherry,
                        handpicked at peak ripeness by the skilled hands of our partner
                        farmers. The beans are then processed using a combination of
                        traditional sun-drying and modern fermentation techniques,
                        unlocking complex flavour profiles that have earned international
                        recognition.
                    </p>
                    <p className="araku-story__edit-body">
                        We believe coffee is more than a commodity — it is culture,
                        community, and craft. Our mission is to share the extraordinary
                        flavours of Araku with the world, while ensuring every farmer's
                        legacy is valued, preserved, and celebrated.
                    </p>
                </div>
            </div>

            {/* ══ PULL-QUOTE STRIP ═══════════════ */}
            <div className="araku-story__quote" ref={quoteRef}>
                <blockquote className="araku-story__quote-text">
                    "In every sip, the mist of the valley, the warmth of the sun, and the
                    patience of generations."
                </blockquote>
            </div>

        </section>
    )
}
