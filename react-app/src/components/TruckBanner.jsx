import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TruckBanner.css'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════
   TruckBanner — Scroll-Triggered Horizontal Drive

   No pinning, no spacer.
   Section height = truck image height + padding.
   Animation: truck enters from right when section
   enters viewport bottom, banner trails + scales.
   ══════════════════════════════════════════════════ */

export default function TruckBanner() {
    const sectionRef = useRef(null)
    const assemblyRef = useRef(null)
    const bannerRef = useRef(null)
    const turbRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── 1. Truck drives right → left ────── */
            // Starts when section enters bottom of viewport
            // Ends when section center reaches viewport center
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',     // section top hits viewport bottom
                    end: 'center center',    // section center hits viewport center
                    scrub: 1,
                },
            })

            // Truck enters from offscreen right → stops at center
            tl.fromTo(
                assemblyRef.current,
                { x: '110vw' },
                {
                    x: '30vw',
                    ease: 'power2.out',
                    duration: 1,
                },
                0
            )

            /* ── 2. Fabric wave — feTurbulence ──── */
            const turbEl = turbRef.current
            if (turbEl) {
                const fabricTl = gsap.timeline({ repeat: -1, yoyo: true })
                fabricTl.to(
                    {},
                    {
                        duration: 3,
                        ease: 'sine.inOut',
                        onUpdate: function () {
                            const p = this.progress()
                            const fx = 0.008 + Math.sin(p * Math.PI) * 0.004
                            const fy = 0.015 + Math.sin(p * Math.PI * 1.3) * 0.005
                            turbEl.setAttribute('baseFrequency', `${fx.toFixed(4)} ${fy.toFixed(4)}`)
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="truck-banner" ref={sectionRef}>

            {/* Subtle ground line */}
            <div className="truck-banner__ground" />

            {/* ── Moving Assembly: Truck leads, Banner trails ── */}
            <div className="truck-banner__assembly" ref={assemblyRef}>

                {/* Truck image — enters viewport first */}
                <div className="truck-banner__truck">
                    <img
                        className="truck-banner__truck-img"
                        src="/images/truck.png"
                        alt="Araku Hill Coffee truck"
                        draggable="false"
                    />
                </div>

                {/* Banner — trails behind truck, scales to 1× */}
                <div className="truck-banner__banner-wrap" ref={bannerRef}>
                    <svg
                        className="truck-banner__banner-svg"
                        viewBox="0 0 120 25"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <filter
                                id="fabric-wave"
                                x="-5%"
                                y="-10%"
                                width="110%"
                                height="120%"
                            >
                                <feTurbulence
                                    ref={turbRef}
                                    type="turbulence"
                                    baseFrequency="0.008 0.015"
                                    numOctaves="3"
                                    seed="5"
                                    result="turb"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="turb"
                                    scale="3"
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                />
                            </filter>
                        </defs>

                        <g filter="url(#fabric-wave)">
                            <path
                                className="truck-banner__banner-shape"
                                d="
                                    M 0 3
                                    Q 0 0, 3 0
                                    L 106 1.5
                                    Q 115 3, 120 6
                                    L 118 12.5
                                    Q 115 15, 120 18
                                    L 118 21
                                    Q 115 24, 106 24.5
                                    L 3 25
                                    Q 0 25, 0 22
                                    Z
                                "
                            />
                            <text
                                className="truck-banner__banner-text"
                                x="58"
                                y="13"
                            >
                                ARAKU HILL COFFEE
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    )
}
