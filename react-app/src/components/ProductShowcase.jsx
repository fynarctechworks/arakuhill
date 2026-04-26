import { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductShowcase.css'

// Built sequence of 143 frames (33-175, continuous)
const FRAME_NUMBERS = []
for (let i = 33; i <= 175; i++) {
    FRAME_NUMBERS.push(i)
}
const FRAME_COUNT = FRAME_NUMBERS.length

/* Mobile reorder: put Cranberry Espresso at index 4 (5th position = row 2 center in 3-col grid) */
const getMobileProducts = (allProducts) => {
    const products = allProducts.filter(p => p.id !== 'show-more')
    const heroIdx = products.findIndex(p => p.isHero)
    if (heroIdx === -1) return products
    const hero = products.splice(heroIdx, 1)[0]
    products.splice(4, 0, hero) // insert at index 4 (5th slot)
    return products
}

/* ══════════════════════════════════════════════════
   ProductShowcase — Hero → 2-Row Product Grid
   with Luxury Product Detail Modal

   Hero: Red Wine Espresso glass centered large
   Scroll: glass shrinks into 3rd position of row 1
   Final: Row 1 = 5 products, Row 2 = 5 products (with Show More)
   Click: Opens elegant product detail modal
   ══════════════════════════════════════════════════ */

const ALL_PRODUCTS = [
    // ── Row 1 ────────────────────────────────────
    {
        id: 'araku-latte',
        name: 'Araku Latte',
        image: '/images/products/Araku Latte.webp',
        isHero: false,
        row: 1,
        origin: 'Araku Valley Signature',
        altitude: '1000–1200m',
        process: 'Natural',
        tastingNotes: 'Caramel, toasted nuts, creamy finish',
        description:
            'Our signature latte combines our nuanced espresso with velvety steamed milk. It’s a smooth, creamy beverage that perfects the balance between robust coffee flavors and natural milk sweetness.',
    },
    {
        id: 'americano',
        name: 'Americano',
        image: '/images/products/Americano.webp',
        isHero: false,
        row: 1,
        origin: 'Araku Valley',
        altitude: '900–1100m',
        process: 'Washed',
        tastingNotes: 'Bold, clean, dark cocoa',
        description:
            'A classic, strong black coffee. Hot water is carefully poured over rich, bold espresso, showcasing the pure, unadulterated flavors of our premium Araku beans. Perfect for those who appreciate simplicity and strength.',
    },
    {
        id: 'red-wine-espresso',
        name: 'Red Wine Espresso',
        image: '/images/products/redwine Espresso.webp',
        isHero: true,
        row: 1,
        origin: 'Araku Valley',
        altitude: '1100–1300m',
        process: 'Natural Fermented',
        tastingNotes: 'Winey notes, dark cherry, rich chocolate',
        description:
            'Our premium Red Wine Espresso is crafted from specially fermented beans, offering a sophisticated profile with deep winy notes and a luxurious chocolate finish. A truly unique experience.',
    },
    {
        id: 'macchiato',
        name: 'Macchiato',
        image: '/images/products/Macchiato.webp',
        isHero: false,
        row: 1,
        origin: 'Araku Valley',
        altitude: '1100–1300m',
        process: 'Medium Roast',
        tastingNotes: 'Intense, bold, touch of cream',
        description:
            'For the espresso purist. A bold, concentrated double shot of our finest espresso marked with just a dollop of textured milk foam. A robust and intense coffee experience.',
    },
    {
        id: 'caramel-frappe',
        name: 'Caramel Frappe',
        image: '/images/products/Caramel Frappe.webp',
        isHero: false,
        row: 1,
        origin: 'Dessert Blend',
        altitude: 'Multi-Origin',
        process: 'Blended Cold',
        tastingNotes: 'Buttery caramel, vanilla, sweet cream',
        description:
            'A sweet indulgence. We blend our cold brew with rich caramel syrup, milk, and ice, topping it off with whipped cream and a decadent caramel drizzle. A perfect treat to beat the heat.',
    },
    // ── Row 2 ────────────────────────────────────
    {
        id: 'vietnamese-frappe',
        name: 'Vietnamese Frappe',
        image: '/images/products/Vietnamese Frappe.webp',
        isHero: false,
        row: 2,
        origin: 'Multi-Origin',
        altitude: 'N/A',
        process: 'Blended Cold',
        tastingNotes: 'Intense coffee, sweet condensed milk, ice-cold',
        description:
            'Inspired by traditional Vietnamese coffee. We blend strong, dark-roasted coffee with rich, sweet condensed milk and ice to create a powerfully energizing and sweet frozen treat.',
    },
    {
        id: 'litchi-espresso',
        name: 'Litchi Espresso',
        image: '/images/products/Litchi Espresso.webp',
        isHero: false,
        row: 2,
        origin: 'Araku Valley',
        altitude: '1100–1300m',
        process: 'Light Roast',
        tastingNotes: 'Floral, sweet litchi, bright espresso',
        description:
            'An exotic, floral delight. We pair the sweet, fragrant notes of fresh litchi with the bright acidity of our carefully pulled espresso. A uniquely refreshing cold beverage that dances on the palate.',
    },
    {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        image: '/images/products/Iced coffee.webp',
        isHero: false,
        row: 2,
        origin: 'Araku Valley',
        altitude: '900–1100m',
        process: 'Cold Infusion',
        tastingNotes: 'Smooth cocoa, crisp finish, refreshing',
        description:
            'Crisp, cold, and immensely refreshing. Our iced coffee is brewed slowly to extract maximum flavor without bitterness, then served pure and simple over cracked ice.',
    },
    {
        id: 'spanish-latte',
        name: 'Spanish Latte',
        image: '/images/products/Spanish Latte.webp',
        isHero: false,
        row: 2,
        origin: 'Araku Valley',
        altitude: '1000–1200m',
        process: 'Medium Roast',
        tastingNotes: 'Sweetened condensed milk, rich cocoa, creamy',
        description:
            'Rich, sweet, and incredibly smooth. Our Spanish Latte combines bold espresso with velvety textured milk and a touch of sweetened condensed milk for a distinctly luscious profile.',
    },
    {
        id: 'show-more',
        name: 'View All Products',
        image: '/images/products/Spanish Latte.webp', // Fallback image for the card
        isHero: false,
        row: 2,
        isLink: true,
        origin: '',
        altitude: '',
        process: '',
        tastingNotes: '',
        description: '',
    },
]

const ROW_1 = ALL_PRODUCTS.filter((p) => p.row === 1)
const ROW_2 = ALL_PRODUCTS.filter((p) => p.row === 2)
const MOBILE_PRODUCTS = getMobileProducts(ALL_PRODUCTS)
const HERO_INDEX = ROW_1.findIndex((p) => p.isHero)

export default function ProductShowcase() {
    const navigate = useNavigate()
    const stageRef = useRef(null)

    // Hero text refs
    const titleRef = useRef(null)
    const letterRefs = useRef([])
    const subtitleRef = useRef(null)
    const leftRef = useRef(null)
    const rightRef = useRef(null)

    // Grid refs
    const row1Refs = useRef([])
    const imgWrapRefs = useRef([])
    const mobileWrapRefs = useRef([])
    const mobileCardRefs = useRef([])
    const heroLabelRef = useRef(null)
    const row2WrapRef = useRef(null)
    const mobileGridRef = useRef(null)
    const seeMoreBtnRef = useRef(null)

    // Mobile detection
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Modal state
    const [selectedProduct, setSelectedProduct] = useState(null)
    const modalRef = useRef(null)
    const modalContentRef = useRef(null)

    // Sequence state for hero card canvas
    const sequenceRef = useRef({ frame: 0 })
    const canvasRef = useRef(null)
    const heroImgNodeRef = useRef(null)

    // Ref for the hero card image (for bottom-to-top entrance)
    const heroImgRef = useRef(null)

    // Interaction safety toggle (disables clicks during animation)
    const isGridClickableRef = useRef(false)

    useLayoutEffect(() => {
        const images = []
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image()
            img.src = `/images/new-red-wine-sequence/ezgif-frame-${String(FRAME_NUMBERS[i]).padStart(3, '0')}-Photoroom.png`
            images.push(img)
        }

        function renderFrame(index) {
            const canvas = canvasRef.current
            if (!canvas) return
            const context = canvas.getContext('2d')
            const img = images[index]
            if (!img || !img.complete || img.naturalWidth === 0) return

            if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
                canvas.width = img.naturalWidth
                canvas.height = img.naturalHeight
            }
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(img, 0, 0)
        }

        if (images[0] && images[0].complete) {
            renderFrame(0)
        } else if (images[0]) {
            images[0].onload = () => renderFrame(0)
        }

        const ctx = gsap.context(() => {
            const isMob = typeof window !== 'undefined' && window.innerWidth <= 768

            const heroCard = isMob ? mobileCardRefs.current[4] : row1Refs.current[HERO_INDEX]
            const heroWrap = isMob ? mobileWrapRefs.current[4] : imgWrapRefs.current[HERO_INDEX]
            
            // Set initial states for hero elements
            if (heroCard) {
                gsap.set(heroCard, { scale: 2.8, zIndex: 10, y: isMob ? '15vh' : '38vh', opacity: 1 })
            }

            // Set the hero wrapper explicitly to perfectly align the glass during the pour animation
            if (heroWrap) {
                gsap.set(heroWrap, { width: isMob ? '245%' : '134%' })
            }

            if (heroImgNodeRef.current) {
                gsap.set(heroImgNodeRef.current, { opacity: 0 }) // Hides the static img at the start
            }

            if (heroLabelRef.current) {
                gsap.set(heroLabelRef.current, { opacity: 0 })
            }

            if (isMob) {
                mobileCardRefs.current.forEach((card, i) => {
                    if (i !== 4 && card) {
                        gsap.set(card, { opacity: 0, y: 30 })
                    }
                })
                if (seeMoreBtnRef.current) {
                    gsap.set(seeMoreBtnRef.current, { opacity: 0, y: 20 })
                }
            } else {
                row1Refs.current.forEach((card, i) => {
                    if (i !== HERO_INDEX && card) {
                        gsap.set(card, { opacity: 0, y: 30 })
                    }
                })

                if (row2WrapRef.current) {
                    gsap.set(row2WrapRef.current, { opacity: 0, y: 40 })
                }
            }

            const wraps = imgWrapRefs.current.filter(Boolean)
            gsap.set(wraps, { border: '1px solid transparent' })

            // Also hide mobile card borders initially
            const mobileWraps = mobileWrapRefs.current.filter(Boolean)
            gsap.set(mobileWraps, { border: '1px solid transparent' })

            /* ── Letter-by-letter entrance animation ─────────────── */
            const letters = letterRefs.current.filter(Boolean)
            gsap.set(letters, { opacity: 0, y: 60 })

            // Set initial states for other hero elements
            gsap.set(subtitleRef.current, { opacity: 0, y: -15 })
            gsap.set(leftRef.current, { opacity: 0, x: -40 })
            gsap.set(rightRef.current, { opacity: 0, x: 40 })

            // Create entrance timeline for text
            const entranceTl = gsap.timeline({
                scrollTrigger: {
                    trigger: stageRef.current,
                    start: 'top 85%', // Triggers early as section comes into view
                    once: true,
                }
            })

            // 1. "SPECIALTY SINGLE ORIGIN" subtitle fades in first
            entranceTl.to(subtitleRef.current, {
                opacity: 1, y: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, 0)

            // 2. RED WINE letters appear one by one (indices 0–7)
            entranceTl.to(letters.slice(0, 8), {
                opacity: 1, y: 0,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.05,
            }, 0.2)

            // 3. ESPRESSO letters appear one by one (indices 8–15) — starts right after RED WINE
            entranceTl.to(letters.slice(8), {
                opacity: 1, y: 0,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.05,
            }, 0.6)

            // 4. Left and right text fade in
            entranceTl.to(leftRef.current, {
                opacity: 1, x: 0,
                duration: 0.7,
                ease: 'power2.out',
            }, 1.0)

            entranceTl.to(rightRef.current, {
                opacity: 1, x: 0,
                duration: 0.7,
                ease: 'power2.out',
            }, 1.0)

            // PIN THE SECTION NATIVELY FOR 3000px
            // A comfortable length that allows animation and pause without making the scrollwheel feel broken/stuck
            ScrollTrigger.create({
                trigger: stageRef.current,
                start: 'top top',
                end: '+=3000',
                pin: true,
                anticipatePin: 1,
            })

            // UNIFIED MAIN TIMELINE
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: stageRef.current,
                    start: 'top bottom', // Starts right as section enters
                    end: '+=3000', // Timeline maps over 3000px of scrolling
                    scrub: 0.35, // Short, snappy interpolation for smoothness without heavy lag
                    onUpdate: (self) => {
                        // The entire timeline animation (text, pour, grid shrink) finishes ~0.82
                        isGridClickableRef.current = self.progress >= 0.8
                    }
                }
            })

            // 1. Pouring happens comfortably over the first 70% of the timeline
            mainTl.to(sequenceRef.current, {
                frame: FRAME_COUNT - 1,
                snap: 'frame',
                ease: 'none',
                duration: 0.7, 
                onUpdate: () => renderFrame(sequenceRef.current.frame),
            }, 0)

            // 2. Texts fade out near the end of the pour
            mainTl.to(subtitleRef.current, { opacity: 0, y: -20, ease: 'power2.in', duration: 0.05 }, 0.65)
            mainTl.to(leftRef.current, { opacity: 0, x: -40, ease: 'power2.in', duration: 0.05 }, 0.65)
            mainTl.to(rightRef.current, { opacity: 0, x: 40, ease: 'power2.in', duration: 0.05 }, 0.65)
            if (titleRef.current) {
                mainTl.to(titleRef.current, { opacity: 0, scale: 1.05, ease: 'power2.in', duration: 0.05 }, 0.65)
            }

            // 3. Swap the Canvas -> Static Image smoothly
            if (heroImgNodeRef.current && canvasRef.current) {
                mainTl.to(canvasRef.current, { opacity: 0, duration: 0.02 }, 0.72)
                mainTl.to(heroImgNodeRef.current, { opacity: 1, duration: 0.02 }, 0.72)
            }

            // Shift mobile grid to exact center after pour finishes on small screens
            if (isMob && mobileGridRef.current && window.innerWidth <= 500) {
                mainTl.to(mobileGridRef.current, {
                    left: '50%',
                    ease: 'power2.inOut', duration: 0.1,
                }, 0.72)
            }

            // 4. Shrink the card into the grid
            if (heroCard) {
                mainTl.to(heroCard, {
                    scale: 1, y: 0,
                    ease: 'power2.inOut', duration: 0.1,
                }, 0.72)
            }

            if (heroWrap) {
                mainTl.to(heroWrap, {
                    width: '100%',
                    ease: 'power2.inOut', duration: 0.1,
                }, 0.72)
            }

            if (heroLabelRef.current) {
                mainTl.to(heroLabelRef.current, { opacity: 1, ease: 'power1.out', duration: 0.05 }, 0.78)
            }

            // 5. Build out the rest of the grid extremely fast
            if (isMob) {
                mobileCardRefs.current.forEach((card, i) => {
                    if (i === 4 || !card) return
                    mainTl.to(card, {
                        opacity: 1, y: 0,
                        ease: 'power2.out', duration: 0.05,
                    }, 0.78 + Math.abs(i - 4) * 0.01)
                })
            } else {
                row1Refs.current.forEach((card, i) => {
                    if (i === HERO_INDEX || !card) return
                    mainTl.to(card, {
                        opacity: 1, y: 0,
                        ease: 'power2.out', duration: 0.05,
                    }, 0.78 + Math.abs(i - HERO_INDEX) * 0.01)
                })
            }

            if (wraps.length) {
                mainTl.to(wraps, {
                    border: '1px solid rgb(255, 255, 255)',
                    ease: 'power1.out', duration: 0.05,
                }, 0.8)
            }

            const mobileWrapsAnim = mobileWrapRefs.current.filter(Boolean)
            if (mobileWrapsAnim.length) {
                mainTl.to(mobileWrapsAnim, {
                    border: '1px solid rgb(255, 255, 255)',
                    ease: 'power1.out', duration: 0.05,
                }, 0.8)
            }

            if (isMob && seeMoreBtnRef.current) {
                mainTl.to(seeMoreBtnRef.current, {
                    opacity: 1, y: 0,
                    ease: 'power2.out', duration: 0.05,
                }, 0.82)
            }

            if (!isMob && row2WrapRef.current) {
                mainTl.to(row2WrapRef.current, {
                    opacity: 1, y: 0,
                    ease: 'power2.out', duration: 0.05,
                }, 0.8)
            }

            // The timeline extends to 1.0 (+=3000 scroll distance). 
            // All animations resolve near 0.82. 
            // The remaining scroll distance (approx 18% of 3000px timeline + remaining Pin diff) serves as the "empty stay space"

            // [STAY PERIOD]
            // From 0.8 to 1.0 (the remaining scroll distance), nothing happens.
            // This provides the "1s" (approx 1200px) of static viewing time requested.

        }, stageRef)

        return () => ctx.revert()
    }, [isMobile])

    /* ── Modal Open / Close ──────────────────── */

    const openModal = useCallback((product) => {
        if (!isGridClickableRef.current) return
        setSelectedProduct(product)
    }, [])

    const closeModal = useCallback(() => {
        if (!modalRef.current) {
            setSelectedProduct(null)
            return
        }

        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => setSelectedProduct(null),
        })
    }, [])

    // Animate modal in when product is selected
    useEffect(() => {
        if (!selectedProduct || !modalRef.current) return

        gsap.fromTo(modalRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: 'power2.out' }
        )

        if (modalContentRef.current) {
            gsap.fromTo(modalContentRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.15 }
            )
        }
    }, [selectedProduct])

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') closeModal() }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [closeModal])

    let wrapIdx = 0

    return (
        <section className="product-showcase" ref={stageRef}>
            <img 
                src="/assets/highlights/layer.png" 
                alt="" 
                className="section-layer" 
                aria-hidden="true"
            />

            {/* ══ HERO TEXT ══════════════════════ */}
                <span
                    className="product-showcase__hero-subtitle"
                    ref={subtitleRef}
                >
                    SPECIALTY SINGLE ORIGIN
                </span>

                <h2
                    className="product-showcase__hero-title"
                    ref={titleRef}
                >
                    {['R', 'E', 'D', ' ', 'W', 'I', 'N', 'E'].map((ch, i) => (
                        <span
                            key={`l1-${i}`}
                            className={`product-showcase__letter${ch === ' ' ? ' product-showcase__letter--space' : ''}`}
                            ref={(el) => { letterRefs.current[i] = el }}
                        >
                            {ch}
                        </span>
                    ))}
                    <br />
                    {['E', 'S', 'P', 'R', 'E', 'S', 'S', 'O'].map((ch, i) => (
                        <span
                            key={`l2-${i}`}
                            className="product-showcase__letter"
                            ref={(el) => { letterRefs.current[8 + i] = el }}
                        >
                            {ch}
                        </span>
                    ))}
                </h2>

                <div className="product-showcase__hero-left" ref={leftRef}>
                    <p className="product-showcase__hero-tagline">Bold. Rich. Refined.</p>
                    <p className="product-showcase__hero-headline">
                        Sip the Essence<br />of Araku
                    </p>
                </div>

                <div className="product-showcase__hero-right" ref={rightRef}>
                    <p className="product-showcase__hero-desc">
                        Every cup is a blend of premium single-origin
                        beans, artisan roasting, and timeless tradition
                        — crafted to elevate your senses.
                    </p>
                    <span className="product-showcase__hero-cta">View collection</span>
                </div>

                {/* ══ PRODUCT GRID ═══════════════════ */}
                {!isMobile ? (
                    <div className="product-showcase__grid">
                        {/* Row 1 */}
                        <div className="product-showcase__row">
                            {ROW_1.map((product, i) => {
                                const isHero = product.isHero
                                const currentWrapIdx = wrapIdx++
                                return (
                                    <div
                                        key={product.id}
                                        className={`product-showcase__card ${isHero ? 'product-showcase__card--hero' : ''}`}
                                        ref={(el) => { row1Refs.current[i] = el }}
                                        onClick={() => openModal(product)}
                                    >
                                        <div
                                            className="product-showcase__card-img-wrap"
                                            ref={(el) => { imgWrapRefs.current[currentWrapIdx] = el }}
                                        >
                                            <img
                                                className="product-showcase__card-img"
                                                src={product.image}
                                                alt={product.name}
                                                draggable="false"
                                                ref={isHero ? heroImgNodeRef : undefined}
                                            />
                                            {isHero && (
                                                <canvas
                                                    ref={canvasRef}
                                                    className="product-showcase__animation-canvas"
                                                />
                                            )}
                                        </div>
                                        <h3
                                            className="product-showcase__card-name"
                                            ref={isHero ? heroLabelRef : undefined}
                                        >
                                            {product.name}
                                        </h3>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Row 2 */}
                        <div
                            className="product-showcase__row product-showcase__row--second"
                            ref={row2WrapRef}
                        >
                            {ROW_2.map((product) => {
                                const currentWrapIdx = wrapIdx++
                                return (
                                    <div
                                        key={product.id}
                                        className={`product-showcase__card ${product.id === 'show-more' ? 'product-showcase__card--show-more' : ''}`}
                                        onClick={() => {
                                            if (!isGridClickableRef.current) return
                                            if (product.id === 'show-more') {
                                                navigate('/page/products')
                                            } else {
                                                openModal(product)
                                            }
                                        }}
                                    >
                                        <div
                                            className="product-showcase__card-img-wrap"
                                            ref={(el) => { imgWrapRefs.current[currentWrapIdx] = el }}
                                        >
                                            {product.id === 'show-more' ? (
                                                <div className="product-showcase__card-more-overlay">
                                                    <span>+10</span>
                                                </div>
                                            ) : null}
                                            <img
                                                className="product-showcase__card-img"
                                                src={product.image}
                                                alt={product.name}
                                                draggable="false"
                                                style={product.id === 'show-more' ? { filter: 'blur(4px) brightness(0.6)' } : {}}
                                            />
                                        </div>
                                        <h3 className="product-showcase__card-name">
                                            {product.name}
                                        </h3>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    /* ══ MOBILE GRID — 3 per row, Cranberry at 5th ══ */
                    <div className="product-showcase__grid product-showcase__grid--mobile" ref={mobileGridRef}>
                        <div className="product-showcase__mobile-grid">
                            {MOBILE_PRODUCTS.map((product) => (
                                <div
                                    key={product.id}
                                    className={`product-showcase__card ${product.isHero ? 'product-showcase__card--hero' : ''}`}
                                    onClick={() => openModal(product)}
                                    ref={(el) => { mobileCardRefs.current[MOBILE_PRODUCTS.indexOf(product)] = el }}
                                >
                                    <div
                                        className="product-showcase__card-img-wrap"
                                        ref={(el) => { mobileWrapRefs.current[MOBILE_PRODUCTS.indexOf(product)] = el }}
                                    >
                                        <img
                                            className="product-showcase__card-img"
                                            src={product.image}
                                            alt={product.name}
                                            draggable="false"
                                            ref={product.isHero ? heroImgNodeRef : undefined}
                                        />
                                        {product.isHero && (
                                            <canvas
                                                ref={canvasRef}
                                                className="product-showcase__animation-canvas"
                                            />
                                        )}
                                    </div>
                                    <h3 
                                        className="product-showcase__card-name"
                                        ref={product.isHero ? heroLabelRef : undefined}
                                    >
                                        {product.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                        <button
                            className="product-showcase__see-more-btn"
                            ref={seeMoreBtnRef}
                            onClick={() => isGridClickableRef.current && navigate('/page/products')}
                        >
                            See More
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* ══ PRODUCT DETAIL MODAL ══════════ */}
                {selectedProduct && (
                    <div
                        className="product-modal"
                        ref={modalRef}
                        onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
                    >
                        <div className="product-modal__content" ref={modalContentRef}>

                            {/* Close button */}
                            <button
                                className="product-modal__close"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </button>

                            {/* Image side */}
                            <div className="product-modal__image-side">
                                <img
                                    className="product-modal__image"
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    draggable="false"
                                />
                            </div>

                            {/* Info side */}
                            <div className="product-modal__info-side">
                                <span className="product-modal__origin-label">
                                    SINGLE ORIGIN
                                </span>

                                <h3 className="product-modal__name">
                                    {selectedProduct.name}
                                </h3>

                                <p className="product-modal__description">
                                    {selectedProduct.description}
                                </p>

                                {/* Details grid */}
                                <div className="product-modal__details">
                                    <div className="product-modal__detail">
                                        <span className="product-modal__detail-label">Origin</span>
                                        <span className="product-modal__detail-value">{selectedProduct.origin}</span>
                                    </div>
                                    <div className="product-modal__detail">
                                        <span className="product-modal__detail-label">Altitude</span>
                                        <span className="product-modal__detail-value">{selectedProduct.altitude}</span>
                                    </div>
                                    <div className="product-modal__detail">
                                        <span className="product-modal__detail-label">Process</span>
                                        <span className="product-modal__detail-value">{selectedProduct.process}</span>
                                    </div>
                                    <div className="product-modal__detail">
                                        <span className="product-modal__detail-label">Tasting Notes</span>
                                        <span className="product-modal__detail-value">{selectedProduct.tastingNotes}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="product-modal__cta">
                                    Explore This Coffee
                                </button>
                            </div>

                        </div>
                    </div>
                )}

        </section>
    )
}
