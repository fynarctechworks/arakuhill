import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TravelTimeline.css'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════
   Travel Data
   ══════════════════════════════════════════════════ */
const travels = [
    {
        id: 1,
        coords: ['46°48\'N', '9°15\'E'],
        location: 'Laax, Switzerland',
        date: 'January 2026',
        image: '/images/travel/switzerland.png',
        alt: 'Editorial photograph — Laax, Switzerland',
        layout: 'a',
    },
    {
        id: 2,
        coords: ['28°16\'N', '16°36\'W'],
        location: 'Tenerife, Spain',
        date: 'February 2026',
        image: '/images/travel/tenerife.png',
        alt: 'Editorial photograph — Tenerife, Spain',
        layout: 'b',
    },
    {
        id: 3,
        coords: ['52°22\'N', '4°53\'E'],
        location: 'Amsterdam, The Netherlands',
        date: 'March 2026',
        image: '/images/travel/amsterdam.png',
        alt: 'Editorial photograph — Amsterdam, The Netherlands',
        layout: 'c',
    },
]

/* ══════════════════════════════════════════════════
   WINDING MOUNTAIN ROAD — Organic Path Generator

   Strategy:
   - 7 waypoints per segment with hand-crafted
     lateral offsets (asymmetric, irregular)
   - Deterministic micro-noise for organic feel
   - Catmull-Rom → cubic Bézier for buttery smooth
     curves with no sharp angles
   ══════════════════════════════════════════════════ */

/**
 * Deterministic pseudo-noise for consistent renders.
 * Returns value in [-1, 1] given two seed integers.
 */
function noise(a, b) {
    const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
    return (v - Math.floor(v)) * 2 - 1
}

/**
 * GPS-ROUTE PATH GENERATOR
 *
 * Creates a terrain-like path with many short, tight bends
 * resembling a GPS travel route or alpine road seen from distance.
 *
 * Amplitude control:
 *   - Base amplitude: 3.5% of segment distance (tight, controlled)
 *   - 3 layered sine waves at different frequencies:
 *       Layer 1  (low freq)  — slow terrain drift
 *       Layer 2  (mid freq)  — road curvature
 *       Layer 3  (high freq) — surface micro-corrections
 *   - Deterministic noise adds organic irregularity
 *
 * Density: 16 waypoints per segment → many short C commands
 * Result: subtle → slight bend → correct → slight bend → continue
 */
function buildGPSRoute(x1, y1, x2, y2, segIdx) {
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Perpendicular unit vector
    const px = -dy / dist
    const py = dx / dist

    // Tight amplitude — 3.5% of distance
    const amp = dist * 0.035

    // Same base phase for all segments — consistent curve character
    // Only jitter varies per segment for subtle organic difference
    const phase = 2.7

    // 16 waypoints → many short cubic Bézier segments
    const numPts = 16
    const pts = []

    for (let i = 0; i <= numPts; i++) {
        const t = i / numPts

        // Base position along the straight line
        const baseX = x1 + dx * t
        const baseY = y1 + dy * t

        let offset = 0

        if (i > 0 && i < numPts) {
            // Layer 1 — slow terrain drift (low frequency)
            const drift = Math.sin(t * Math.PI * 1.4 + phase) * 1.0

            // Layer 2 — road curvature (medium frequency)
            const curve = Math.sin(t * Math.PI * 3.8 + phase * 0.7) * 0.6

            // Layer 3 — surface micro-corrections (high frequency)
            const micro = Math.sin(t * Math.PI * 7.5 + phase * 1.3) * 0.25

            // Per-segment jitter — only source of variation
            const jitter = noise(segIdx, i) * 0.15

            // Combine all layers
            offset = amp * (drift + curve + micro + jitter)

            // Taper near endpoints for smooth entry/exit
            const taper = Math.sin(t * Math.PI)
            offset *= taper
        }

        pts.push({
            x: baseX + px * offset,
            y: baseY + py * offset,
        })
    }

    return pts
}

/**
 * Catmull-Rom → cubic Bézier conversion
 *
 * With tight tension (0.25) suited for small-amplitude curves.
 * Produces C2-continuous smooth curves — no sharp angles.
 */
function catmullRomPath(points) {
    if (points.length < 2) return ''

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(i - 1, 0)]
        const p1 = points[i]
        const p2 = points[i + 1]
        const p3 = points[Math.min(i + 2, points.length - 1)]

        const tension = 0.25

        const cp1x = p1.x + (p2.x - p0.x) * tension
        const cp1y = p1.y + (p2.y - p0.y) * tension
        const cp2x = p2.x - (p3.x - p1.x) * tension
        const cp2y = p2.y - (p3.y - p1.y) * tension

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    }

    return d
}

/* ══════════════════════════════════════════════════
   TravelTimeline Component
   ══════════════════════════════════════════════════ */
export default function TravelTimeline() {
    const containerRef = useRef(null)
    const maskPathRef = useRef(null)
    const headingRef = useRef(null)
    const sectionRefs = useRef([])
    const textRefs = useRef([])
    const [svgPath, setSvgPath] = useState('')
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
    const gsapCtxRef = useRef(null)

    const setSectionRef = (el, i) => { sectionRefs.current[i] = el }
    const setTextRef = (el, i) => { textRefs.current[i] = el }

    /* ── Compute winding SVG path ────────────── */
    const computePath = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        setSvgSize({ width: rect.width, height: rect.height })

        // Collect centres of each text block
        const centers = []
        textRefs.current.forEach((el) => {
            if (!el) return
            const r = el.getBoundingClientRect()
            centers.push({
                x: r.left + r.width / 2 - rect.left,
                y: r.top + r.height / 2 - rect.top,
            })
        })

        if (centers.length < 2) return

        // Build winding road through all centres
        let allPts = []
        for (let i = 0; i < centers.length - 1; i++) {
            const seg = buildGPSRoute(
                centers[i].x, centers[i].y,
                centers[i + 1].x, centers[i + 1].y,
                i
            )
            if (i > 0) seg.shift() // avoid duplicate junction
            allPts = allPts.concat(seg)
        }

        setSvgPath(catmullRomPath(allPts))
    }, [])

    /* ── Compute on mount + responsive resize ── */
    useLayoutEffect(() => {
        const timer = setTimeout(computePath, 300)
        const ro = new ResizeObserver(computePath)
        if (containerRef.current) ro.observe(containerRef.current)
        return () => { clearTimeout(timer); ro.disconnect() }
    }, [computePath])

    /* ── GSAP Animations ─────────────────────── */
    useLayoutEffect(() => {
        if (!svgPath) return
        if (gsapCtxRef.current) gsapCtxRef.current.revert()

        const raf = requestAnimationFrame(() => {
            const ctx = gsap.context(() => {

                /* Heading — gentle fade-in */
                gsap.fromTo(headingRef.current,
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.4,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                )

                /* Sections — staggered image + text entrance */
                sectionRefs.current.forEach((section) => {
                    if (!section) return

                    const img = section.querySelector('.travel-section__image-block')
                    const text = section.querySelector('.travel-section__text')

                    if (img) {
                        gsap.fromTo(img,
                            { opacity: 0, y: 30, scale: 0.97 },
                            {
                                opacity: 1, y: 0, scale: 1,
                                duration: 1.2,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: section,
                                    start: 'top 82%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                    }

                    if (text) {
                        gsap.fromTo(text,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1, y: 0,
                                duration: 1,
                                delay: 0.15,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: section,
                                    start: 'top 80%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                    }

                    gsap.set(section, { opacity: 1 })
                })

                /* SVG mask-based draw — slow, elegant, scrubbed */
                const maskEl = maskPathRef.current
                if (maskEl) {
                    const len = maskEl.getTotalLength()
                    gsap.set(maskEl, {
                        strokeDasharray: len,
                        strokeDashoffset: len,
                    })
                    gsap.to(maskEl, {
                        strokeDashoffset: 0,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 55%',
                            end: 'bottom 35%',
                            scrub: 2, // slower scrub for elegance
                        },
                    })
                }

            }, containerRef)

            gsapCtxRef.current = ctx
        })

        return () => {
            cancelAnimationFrame(raf)
            if (gsapCtxRef.current) gsapCtxRef.current.revert()
        }
    }, [svgPath])

    const maskId = 'travel-reveal-mask'

    /* ── Render ───────────────────────────────── */
    return (
        <section className="travel-timeline" ref={containerRef}>

            {/* ── Winding Dashed SVG Path ─────── */}
            {svgPath && (
                <svg
                    className="travel-timeline__svg"
                    width={svgSize.width}
                    height={svgSize.height}
                    viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Mask: solid white stroke animated via
                            dashoffset to progressively reveal
                            the dashed visual path underneath */}
                        <mask id={maskId}>
                            <rect width="100%" height="100%" fill="black" />
                            <path
                                ref={maskPathRef}
                                d={svgPath}
                                fill="none"
                                stroke="white"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </mask>
                    </defs>

                    {/* Background — faint dashed line (always visible) */}
                    <path
                        className="travel-timeline__path-bg"
                        d={svgPath}
                    />

                    {/* Foreground — darker dashed, revealed by mask */}
                    <path
                        className="travel-timeline__path-fg"
                        d={svgPath}
                        mask={`url(#${maskId})`}
                    />
                </svg>
            )}

            {/* ── Heading ────────────────────── */}
            <h2 className="travel-timeline__heading" ref={headingRef}>
                The Journey Our Bean
            </h2>

            {/* ── Editorial Sections ─────────── */}
            <div className="travel-timeline__sections">
                {travels.map((travel, i) => (
                    <article
                        key={travel.id}
                        className={`travel-section travel-section--layout-${travel.layout}`}
                        ref={(el) => setSectionRef(el, i)}
                    >
                        {/* Image block */}
                        <div className="travel-section__image-block">
                            <img
                                className="travel-section__image"
                                src={travel.image}
                                alt={travel.alt}
                                loading="lazy"
                                draggable="false"
                            />
                        </div>

                        {/* Text block (ref'd for path computation) */}
                        <div
                            className="travel-section__text"
                            ref={(el) => setTextRef(el, i)}
                        >
                            <div className="travel-section__location-group">
                                <p className="travel-section__location">
                                    {travel.location}
                                </p>
                                <p className="travel-section__date">
                                    {travel.date}
                                </p>
                            </div>
                            <p className="travel-section__coordinates">
                                {travel.coords[0]}
                                <span className="travel-section__coord-dash">—</span>
                                {travel.coords[1]}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
