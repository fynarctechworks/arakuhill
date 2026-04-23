import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ClientReviews.css'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
    {
        quote: 'The Red Wine Espresso is a revelation. Easily the best coffee I\'ve had in Hyderabad.',
        name: 'Arjun Rao',
        role: 'Customer, Hyderabad',
        stars: 5,
    },
    {
        quote: 'Nothing beats a cup of Araku Hill Coffee by the Vizag beach. Truly refreshing and world-class.',
        name: 'Lakshmi Devi',
        role: 'Customer, Vizag',
        stars: 5,
    },
    {
        quote: "The gift box was perfect for my family in Hyderabad. They loved the premium packaging and taste.",
        name: 'Karthik Varma',
        role: 'Customer, Hyderabad',
        stars: 5,
    },
    {
        quote: 'Vizag finally has access to such high-quality specialty coffee. The aroma is just incredible.',
        name: 'Sravani K.',
        role: 'Customer, Vizag',
        stars: 5,
    },
    {
        quote: "I've tried many brands, but the smoothness of this blend is unmatched. My daily morning fix in Hyderabad.",
        name: 'Murali Krishna',
        role: 'Customer, Hyderabad',
        stars: 5,
    },
    {
        quote: 'Exceptional quality and depth of flavour. Vizag coffee lovers are in for a real treat.',
        name: 'Kavya Shree',
        role: 'Customer, Vizag',
        stars: 5,
    },
    {
        quote: 'The sustainability story behind the beans makes every sip even more meaningful. Best in Hyderabad.',
        name: 'Rahul Reddy',
        role: 'Customer, Hyderabad',
        stars: 5,
    },
    {
        quote: 'The Signature Pour Over is my daily ritual now. Amazing to have this quality available in Vizag!',
        name: 'Divya Teja',
        role: 'Customer, Vizag',
        stars: 5,
    },
]

const ROW_A = REVIEWS.slice(0, 4)
const ROW_B = REVIEWS.slice(4, 8)

function StarRating({ count }) {
    return (
        <div className="review-card__stars">
            {Array.from({ length: count }, (_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="review-card__star">
                    <path
                        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8z"
                        fill="#6B5B3E"
                    />
                </svg>
            ))}
        </div>
    )
}

function ReviewCard({ review }) {
    return (
        <div className="review-card">
            <StarRating count={review.stars} />
            <p className="review-card__quote">"{review.quote}"</p>
            <div className="review-card__author">
                <span className="review-card__name">{review.name}</span>
                <span className="review-card__role">{review.role}</span>
            </div>
        </div>
    )
}

/* ─── Helper: create a draggable marquee row ────────────────────────── */
function setupDraggableMarquee(el, direction, duration) {
    if (!el) return null

    const halfWidth = el.scrollWidth / 2

    /* ── Proxy-based approach ──
       We track an internal `offset` that represents cumulative user drag.
       The auto-tween runs continuously, and we layer the drag offset on top. */

    let offset = 0           // cumulative drag offset (pixels)
    let isDragging = false
    let pointerStartX = 0
    let dragStartOffset = 0

    // Auto-scroll: drives a proxy object from 0 → halfWidth linearly, forever
    const proxy = { val: 0 }
    const autoTween = gsap.to(proxy, {
        val: halfWidth,
        duration,
        ease: 'none',
        repeat: -1,
        onUpdate() {
            applyPosition()
        },
    })

    function wrapX(x) {
        let v = x % halfWidth
        if (v > 0) v -= halfWidth
        if (v < -halfWidth) v += halfWidth
        return v
    }

    function applyPosition() {
        // direction 'left'  → auto moves negatively  (-proxy.val)
        // direction 'right' → auto moves positively  (+proxy.val - halfWidth)
        let autoX
        if (direction === 'left') {
            autoX = -proxy.val
        } else {
            autoX = proxy.val - halfWidth
        }
        const finalX = wrapX(autoX + offset)
        gsap.set(el, { x: finalX })
    }

    /* ── Pointer events on the wrapper ── */
    const wrapper = el.parentElement

    function onPointerDown(e) {
        if (e.button && e.button !== 0) return
        isDragging = true
        pointerStartX = e.touches ? e.touches[0].clientX : e.clientX
        dragStartOffset = offset
        wrapper.classList.add('is-dragging')
    }

    function onPointerMove(e) {
        if (!isDragging) return
        e.preventDefault()
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const delta = clientX - pointerStartX
        offset = dragStartOffset + delta
        applyPosition()
    }

    function onPointerUp() {
        if (!isDragging) return
        isDragging = false
        wrapper.classList.remove('is-dragging')
    }

    wrapper.addEventListener('mousedown', onPointerDown)
    wrapper.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchend', onPointerUp)

    return () => {
        autoTween.kill()
        wrapper.removeEventListener('mousedown', onPointerDown)
        wrapper.removeEventListener('touchstart', onPointerDown)
        window.removeEventListener('mousemove', onPointerMove)
        window.removeEventListener('touchmove', onPointerMove)
        window.removeEventListener('mouseup', onPointerUp)
        window.removeEventListener('touchend', onPointerUp)
    }
}

export default function ClientReviews() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const subRef = useRef(null)
    const marqueeARef = useRef(null)
    const marqueeBRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.9, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
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
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )
        }, sectionRef)

        // Set up draggable marquees (auto-scroll + drag, both always active)
        const cleanupA = setupDraggableMarquee(marqueeARef.current, 'left', 40)
        const cleanupB = setupDraggableMarquee(marqueeBRef.current, 'right', 45)

        return () => {
            ctx.revert()
            if (cleanupA) cleanupA()
            if (cleanupB) cleanupB()
        }
    }, [])

    return (
        <section className="client-reviews" ref={sectionRef}>
            <img 
                src="/assets/highlights/layer.png" 
                alt="" 
                className="section-layer" 
                aria-hidden="true"
            />

            <div className="client-reviews__header">
                <h2 className="client-reviews__heading" ref={headingRef}>
                    What People Say
                </h2>
                <p className="client-reviews__sub" ref={subRef}>
                    Voices from coffee lovers, baristas, and connoisseurs around the world.
                </p>
            </div>

            <div className="client-reviews__marquee-wrap">
                <div className="client-reviews__marquee" ref={marqueeARef}>
                    {[...ROW_A, ...ROW_A].map((review, i) => (
                        <ReviewCard key={`a-${i}`} review={review} />
                    ))}
                </div>
            </div>

            <div className="client-reviews__marquee-wrap">
                <div className="client-reviews__marquee" ref={marqueeBRef}>
                    {[...ROW_B, ...ROW_B].map((review, i) => (
                        <ReviewCard key={`b-${i}`} review={review} />
                    ))}
                </div>
            </div>

        </section>
    )
}
