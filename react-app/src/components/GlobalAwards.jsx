import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './GlobalAwards.css'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════
   GlobalAwards — Award-Winning Recognition Section

   Layout:
   ─────────────────────────────
   1. 3D Isometric SVG coffee cup with steam + bean orbit
   2. Rotating award badges around the cup
   3. Editorial text about global recognition
   4. Awards grid with logos/icons
   ══════════════════════════════════════════════════ */

const AWARDS = [
    {
        year: '2024',
        title: 'Best Single Origin',
        org: 'World Coffee Awards',
        icon: '🏆',
    },
    {
        year: '2023',
        title: 'Gold Medal — Espresso',
        org: 'International Coffee Expo',
        icon: '🥇',
    },
    {
        year: '2023',
        title: 'Sustainability Excellence',
        org: 'Global Fair Trade Council',
        icon: '🌿',
    },
    {
        year: '2022',
        title: 'Top 10 Specialty Roasters',
        org: 'Specialty Coffee Association',
        icon: '⭐',
    },
    {
        year: '2022',
        title: 'Best Packaging Design',
        org: 'Design Week Awards',
        icon: '🎨',
    },
    {
        year: '2021',
        title: 'Heritage Brand of the Year',
        org: 'India Coffee Board',
        icon: '🏅',
    },
]

const GLOBE_DOTS = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2
    const r = 80 + Math.sin(i * 1.7) * 20
    return {
        cx: 150 + Math.cos(angle) * r,
        cy: 150 + Math.sin(angle) * r * 0.5,
        r: 2 + Math.random() * 2,
        delay: i * 0.08,
    }
})

export default function GlobalAwards() {
    const sectionRef = useRef(null)
    const svgRef = useRef(null)
    const cupRef = useRef(null)
    const steamRefs = useRef([])
    const beanOrbitRefs = useRef([])
    const globeDotRefs = useRef([])
    const headingRef = useRef(null)
    const subRef = useRef(null)
    const awardRefs = useRef([])
    const taglineRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Cup entrance ────────────────────── */
            gsap.fromTo(cupRef.current,
                { scale: 0.6, opacity: 0, rotation: -10 },
                {
                    scale: 1, opacity: 1, rotation: 0,
                    duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            /* ── Continuous cup float ────────────── */
            gsap.to(cupRef.current, {
                y: -8, duration: 2.5,
                ease: 'sine.inOut', yoyo: true,
                repeat: -1,
            })

            /* ── Steam rising animation ──────────── */
            steamRefs.current.filter(Boolean).forEach((steam, i) => {
                gsap.to(steam, {
                    y: -30 - i * 8,
                    opacity: 0,
                    duration: 2 + i * 0.4,
                    ease: 'power1.out',
                    repeat: -1,
                    delay: i * 0.6,
                })
            })

            /* ── Bean orbit rotation ─────────────── */
            beanOrbitRefs.current.filter(Boolean).forEach((bean, i) => {
                const radius = 90 + i * 25
                const speed = 8 + i * 4
                const startAngle = i * (2.1)
                gsap.to(bean, {
                    motionPath: {
                        path: [
                            { x: Math.cos(startAngle) * radius, y: Math.sin(startAngle) * radius * 0.45 },
                            { x: Math.cos(startAngle + 1.57) * radius, y: Math.sin(startAngle + 1.57) * radius * 0.45 },
                            { x: Math.cos(startAngle + 3.14) * radius, y: Math.sin(startAngle + 3.14) * radius * 0.45 },
                            { x: Math.cos(startAngle + 4.71) * radius, y: Math.sin(startAngle + 4.71) * radius * 0.45 },
                            { x: Math.cos(startAngle + 6.28) * radius, y: Math.sin(startAngle + 6.28) * radius * 0.45 },
                        ],
                        curviness: 1.5,
                    },
                    duration: speed,
                    ease: 'none',
                    repeat: -1,
                })
            })

            /* ── Globe dots pulse ────────────────── */
            globeDotRefs.current.filter(Boolean).forEach((dot, i) => {
                gsap.fromTo(dot,
                    { opacity: 0.15, scale: 0.8 },
                    {
                        opacity: 0.7, scale: 1.3,
                        duration: 1.5 + Math.random(),
                        ease: 'sine.inOut',
                        yoyo: true, repeat: -1,
                        delay: i * 0.12,
                    }
                )
            })

            /* ── Heading reveal ──────────────────── */
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            gsap.fromTo(subRef.current,
                { opacity: 0, y: 25 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7, ease: 'power2.out', delay: 0.15,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            /* ── Award cards stagger ─────────────── */
            awardRefs.current.filter(Boolean).forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.92 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, ease: 'power2.out',
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            /* ── Tagline reveal ──────────────────── */
            gsap.fromTo(taglineRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: taglineRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="global-awards" ref={sectionRef}>

            {/* ══ 3D SVG COFFEE ILLUSTRATION ══════ */}
            <div className="global-awards__svg-wrap">
                <svg
                    ref={svgRef}
                    className="global-awards__svg"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Globe dots — orbital background */}
                    {GLOBE_DOTS.map((dot, i) => (
                        <circle
                            key={`gd-${i}`}
                            cx={dot.cx}
                            cy={dot.cy}
                            r={dot.r}
                            fill="#6B5B3E"
                            opacity="0.2"
                            ref={(el) => { globeDotRefs.current[i] = el }}
                        />
                    ))}

                    {/* Coffee cup — main 3D isometric */}
                    <g ref={cupRef}>
                        {/* Cup body */}
                        <ellipse cx="150" cy="210" rx="55" ry="12" fill="#3A3028" opacity="0.15" />
                        <path
                            d="M100 140 L100 195 Q100 215 150 215 Q200 215 200 195 L200 140 Z"
                            fill="#5C4A36"
                        />
                        <path
                            d="M100 140 L100 195 Q100 215 150 215 Q200 215 200 195 L200 140 Z"
                            fill="url(#cupGradient)"
                            opacity="0.4"
                        />
                        {/* Cup rim (top ellipse) */}
                        <ellipse cx="150" cy="140" rx="50" ry="14" fill="#6B5B3E" />
                        <ellipse cx="150" cy="140" rx="44" ry="11" fill="#2E2215" />
                        {/* Coffee surface */}
                        <ellipse cx="150" cy="141" rx="40" ry="9" fill="#4A3828" />
                        <ellipse cx="145" cy="139" rx="12" ry="3" fill="#5C4A36" opacity="0.5" />
                        {/* Cup handle */}
                        <path
                            d="M200 155 Q225 155 225 175 Q225 195 200 195"
                            stroke="#5C4A36"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                        />
                        {/* Saucer */}
                        <ellipse cx="150" cy="218" rx="65" ry="10" fill="#5C4A36" opacity="0.3" />
                        <ellipse cx="150" cy="216" rx="60" ry="9" fill="#6B5B3E" opacity="0.2" />
                    </g>

                    {/* Steam lines */}
                    {[0, 1, 2].map((i) => (
                        <path
                            key={`steam-${i}`}
                            ref={(el) => { steamRefs.current[i] = el }}
                            d={`M${140 + i * 10} 130 Q${135 + i * 12} ${115 - i * 3} ${140 + i * 10} ${105 - i * 5}`}
                            stroke="rgba(107, 91, 62, 0.25)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Orbiting coffee beans */}
                    {[0, 1, 2].map((i) => (
                        <g
                            key={`bean-${i}`}
                            ref={(el) => { beanOrbitRefs.current[i] = el }}
                        >
                            <ellipse
                                cx="150" cy="160"
                                rx="7" ry="4"
                                fill="#5C4A36"
                                transform={`rotate(${i * 40})`}
                            />
                            <line
                                x1="148" y1="160" x2="152" y2="160"
                                stroke="#3A3028"
                                strokeWidth="0.8"
                            />
                        </g>
                    ))}

                    {/* Gradient defs */}
                    <defs>
                        <linearGradient id="cupGradient" x1="100" y1="140" x2="200" y2="215" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#F5F1EB" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#2E2215" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* ══ HEADING ════════════════════════ */}
            <div className="global-awards__header">
                <h2 className="global-awards__heading" ref={headingRef}>
                    Globally Recognised
                </h2>
                <p className="global-awards__sub" ref={subRef}>
                    From the hills of Araku to the stages of the world — our coffee
                    has been honoured by the industry's most respected institutions.
                </p>
            </div>

            {/* ══ AWARDS GRID ════════════════════ */}
            <div className="global-awards__grid">
                {AWARDS.map((award, i) => (
                    <div
                        key={award.title}
                        className="global-awards__card"
                        ref={(el) => { awardRefs.current[i] = el }}
                    >
                        <span className="global-awards__card-icon">{award.icon}</span>
                        <span className="global-awards__card-year">{award.year}</span>
                        <h3 className="global-awards__card-title">{award.title}</h3>
                        <span className="global-awards__card-org">{award.org}</span>
                    </div>
                ))}
            </div>

            {/* ══ TAGLINE ════════════════════════ */}
            <p className="global-awards__tagline" ref={taglineRef}>
                Award-winning taste. Rooted in tradition. Crafted for the world.
            </p>

        </section>
    )
}
