import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import './NotFound.css'

/* ══════════════════════════════════════════════════
   NotFound — Premium 404 Error Page
   
   Features:
   - Animated coffee steam SVG
   - Kinetic typography "404"
   - Elegant messaging
   - Smooth entrance animation
   ══════════════════════════════════════════════════ */

export default function NotFound() {
    const pageRef = useRef(null)
    const numRef = useRef(null)
    const steamRefs = useRef([])
    const cupRef = useRef(null)
    const headingRef = useRef(null)
    const subRef = useRef(null)
    const btnRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 404 number entrance
            gsap.fromTo(numRef.current,
                { opacity: 0, scale: 0.5, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.2 }
            )

            // Cup entrance
            gsap.fromTo(cupRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
            )

            // Continuous cup float
            gsap.to(cupRef.current, {
                y: -6, duration: 2.5,
                ease: 'sine.inOut', yoyo: true,
                repeat: -1, delay: 1.3,
            })

            // Steam animation
            steamRefs.current.filter(Boolean).forEach((steam, i) => {
                gsap.fromTo(steam,
                    { opacity: 0.6, y: 0 },
                    {
                        opacity: 0, y: -35 - i * 10,
                        duration: 2.2 + i * 0.3,
                        ease: 'power1.out',
                        repeat: -1,
                        delay: 0.8 + i * 0.5,
                    }
                )
            })

            // Heading + Sub
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.7 }
            )
            gsap.fromTo(subRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.9 }
            )
            gsap.fromTo(btnRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 1.1 }
            )

        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="not-found" ref={pageRef}>

            {/* Background grain texture */}
            <div className="not-found__grain" />

            {/* Floating coffee beans decorative */}
            <div className="not-found__bean not-found__bean--1" />
            <div className="not-found__bean not-found__bean--2" />
            <div className="not-found__bean not-found__bean--3" />

            {/* Main content */}
            <div className="not-found__content">

                {/* 404 Large Number */}
                <div className="not-found__number" ref={numRef}>
                    4
                    <span className="not-found__cup-wrap" ref={cupRef}>
                        <svg viewBox="0 0 80 90" className="not-found__cup-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Steam */}
                            {[0, 1, 2].map((i) => (
                                <path
                                    key={`steam-${i}`}
                                    ref={(el) => { steamRefs.current[i] = el }}
                                    d={`M${32 + i * 8} 18 Q${28 + i * 10} 8 ${32 + i * 8} 0`}
                                    stroke="rgba(107, 91, 62, 0.35)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            ))}
                            {/* Cup body */}
                            <path
                                d="M15 24 L15 62 Q15 75 40 75 Q65 75 65 62 L65 24 Z"
                                fill="#5C4A36"
                            />
                            {/* Cup rim */}
                            <ellipse cx="40" cy="24" rx="25" ry="7" fill="#6B5B3E" />
                            <ellipse cx="40" cy="24" rx="22" ry="5.5" fill="#3A2E22" />
                            {/* Coffee surface */}
                            <ellipse cx="40" cy="25" rx="19" ry="4.5" fill="#4A3828" />
                            {/* Handle */}
                            <path
                                d="M65 32 Q78 32 78 48 Q78 62 65 62"
                                stroke="#5C4A36"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                            />
                            {/* Saucer */}
                            <ellipse cx="40" cy="78" rx="32" ry="5" fill="#5C4A36" opacity="0.25" />
                        </svg>
                    </span>
                    4
                </div>

                {/* Messaging */}
                <h1 className="not-found__heading" ref={headingRef}>
                    This cup is empty.
                </h1>
                <p className="not-found__sub" ref={subRef}>
                    The page you are looking for has been moved, removed, or
                    perhaps never existed — much like the perfect espresso that got away.
                </p>

                {/* CTA */}
                <Link to="/" className="not-found__btn" ref={btnRef}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
                    </svg>
                    Return Home
                </Link>
            </div>
        </div>
    )
}
