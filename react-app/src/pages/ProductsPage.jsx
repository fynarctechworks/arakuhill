import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import SiteFooter from '../components/SiteFooter';
import SidebarMenu from '../components/SidebarMenu';
import VideoHighlight from '../components/VideoHighlight';
import './ProductsPage.css';
import '../components/CropHero.css'; // For the nav bar styles
import '../components/ProductShowcase.css'; // Reusing modal styles if needed, though we will copy modal CSS for standalone

const PRODUCTS = [
    {
        id: 'americano', name: 'Americano', image: '/images/products/Americano.webp',
        origin: 'Araku Valley', altitude: '900–1100m', process: 'Washed',
        tastingNotes: 'Bold, clean, dark cocoa',
        description: 'A classic, strong black coffee. Hot water is carefully poured over rich, bold espresso, showcasing the pure, unadulterated flavors of our premium Araku beans. Perfect for those who appreciate simplicity and strength.'
    },
    {
        id: 'araku-latte', name: 'Araku Latte', image: '/images/products/Araku Latte.webp',
        origin: 'Araku Valley Signature', altitude: '1000–1200m', process: 'Natural',
        tastingNotes: 'Caramel, toasted nuts, creamy finish',
        description: 'Our signature latte combines our nuanced espresso with velvety steamed milk. It’s a smooth, creamy beverage that perfects the balance between robust coffee flavors and natural milk sweetness.'
    },
    {
        id: 'cappuccino', name: 'Cappuccino', image: '/images/products/Cappuccino.webp',
        origin: 'Araku Valley', altitude: '1000–1200m', process: 'Medium Roast',
        tastingNotes: 'Cocoa, hazelnut, rich froth',
        description: 'A beautifully crafted classic. Equal parts espresso, steamed milk, and a luxurious layer of microfoam. This drink offers a bold coffee presence wrapped in a pillowy, airy texture.'
    },
    {
        id: 'caramel-frappe', name: 'Caramel Frappe', image: '/images/products/Caramel Frappe.webp',
        origin: 'Dessert Blend', altitude: 'Multi-Origin', process: 'Blended Cold',
        tastingNotes: 'Buttery caramel, vanilla, sweet cream',
        description: 'A sweet indulgence. We blend our cold brew with rich caramel syrup, milk, and ice, topping it off with whipped cream and a decadent caramel drizzle. A perfect treat to beat the heat.'
    },
    {
        id: 'red-wine-espresso', name: 'Red Wine Espresso', image: '/images/products/redwine Espresso.webp',
        origin: 'Araku Valley', altitude: '1100–1300m', process: 'Natural Fermented',
        tastingNotes: 'Winey notes, dark cherry, rich chocolate',
        description: 'Our premium Red Wine Espresso is crafted from specially fermented beans, offering a sophisticated profile with deep winy notes and a luxurious chocolate finish. A truly unique experience.'
    },
    {
        id: 'hot-chocolate', name: 'Hot Chocolate', image: '/images/products/Hot Chocolate.webp',
        origin: 'Premium Cocoa Blend', altitude: 'N/A', process: 'Artisanal Melt',
        tastingNotes: 'Rich cocoa, warm vanilla, velvety smooth',
        description: 'Pure comfort in a cup. We use the finest melted artisanal chocolate whisked perfectly into steaming hot milk. Rich, thick, and undeniably luxurious, it’s a chocolate lover\'s dream.'
    },
    {
        id: 'hot-mocha', name: 'Hot Mocha', image: '/images/products/Hot Mocha.webp',
        origin: 'Araku Valley', altitude: '1000–1200m', process: 'Medium-Dark Roast',
        tastingNotes: 'Dark chocolate, toasted almond, bold espresso',
        description: 'The best of both worlds. A harmonious blend of our robust espresso, velvety steamed milk, and rich artisanal cocoa syrup. It’s a decadent, chocolatey coffee experience.'
    },
    {
        id: 'iced-coffee', name: 'Iced Coffee', image: '/images/products/Iced coffee.webp',
        origin: 'Araku Valley', altitude: '900–1100m', process: 'Cold Infusion',
        tastingNotes: 'Smooth cocoa, crisp finish, refreshing',
        description: 'Crisp, cold, and immensely refreshing. Our iced coffee is brewed slowly to extract maximum flavor without bitterness, then served pure and simple over cracked ice.'
    },
    {
        id: 'litchi-espresso', name: 'Litchi Espresso', image: '/images/products/Litchi Espresso.webp',
        origin: 'Araku Valley', altitude: '1100–1300m', process: 'Light Roast',
        tastingNotes: 'Floral, sweet litchi, bright espresso',
        description: 'An exotic, floral delight. We pair the sweet, fragrant notes of fresh litchi with the bright acidity of our carefully pulled espresso. A uniquely refreshing cold beverage that dances on the palate.'
    },
    {
        id: 'macchiato', name: 'Macchiato', image: '/images/products/Macchiato.webp',
        origin: 'Araku Valley', altitude: '1100–1300m', process: 'Medium Roast',
        tastingNotes: 'Intense, bold, touch of cream',
        description: 'For the espresso purist. A bold, concentrated double shot of our finest espresso marked with just a dollop of textured milk foam. A robust and intense coffee experience.'
    },
    {
        id: 'spanish-latte', name: 'Spanish Latte', image: '/images/products/Spanish Latte.webp',
        origin: 'Araku Valley', altitude: '1000–1200m', process: 'Medium Roast',
        tastingNotes: 'Sweetened condensed milk, rich cocoa, creamy',
        description: 'Rich, sweet, and incredibly smooth. Our Spanish Latte combines bold espresso with velvety textured milk and a touch of sweetened condensed milk for a distinctly luscious profile.'
    },
    {
        id: 'vietnamese-frappe', name: 'Vietnamese Frappe', image: '/images/products/Vietnamese Frappe.webp',
        origin: 'Multi-Origin', altitude: 'N/A', process: 'Blended Cold',
        tastingNotes: 'Intense coffee, sweet condensed milk, ice-cold',
        description: 'Inspired by traditional Vietnamese coffee. We blend strong, dark-roasted coffee with rich, sweet condensed milk and ice to create a powerfully energizing and sweet frozen treat.'
    }
];

export default function ProductsPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [navDark, setNavDark] = useState(false);
    
    // Modal refs for animation
    const modalRef = useRef(null);
    const modalBgRef = useRef(null);
    const modalContentRef = useRef(null);
    const modalImgRef = useRef(null);

    // Scroll to top on mount and manage nav blur state
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavDark(true);
            } else {
                setNavDark(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ── Modal Animation Logic ─────────────────────────────────
    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        // Animate out
        const tl = gsap.timeline({
            onComplete: () => setSelectedProduct(null)
        });

        tl.to(modalContentRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in'
        }, 0);
    };

    // When product selected, animate modal in
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';

            const tl = gsap.timeline();
            
            gsap.set(modalContentRef.current, { y: 40, opacity: 0 });
            
            tl.to(modalContentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
                delay: 0.15
            });

        } else {
            document.body.style.overflow = '';
        }

        return () => { document.body.style.overflow = ''; };
    }, [selectedProduct]);


    return (
        <div className="products-page">
            <SidebarMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                linksOverride={[
                    { id: 'top', label: 'Home' }
                ]}
            />

            {/* Reusing CropHero Nav */}
            <nav className={`crop-nav nav-dark ${navDark ? 'nav-scrolled' : ''}`} style={{ position: 'fixed', zIndex: 9999 }}>
                <div className="crop-nav-left" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
                    <svg className="crop-nav-hamburger" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </div>
                <div className="crop-nav-center" style={{ width: '120px', height: '48px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src="/assets/Araku-hill-coffee-logo.svg" alt="Araku Hill Coffee" className="crop-logo" />
                </div>
                <div className="crop-nav-right">
                    <button className="crop-nav-contact-btn" onClick={() => navigate('/page/contact-us')}>
                        Contact
                    </button>
                </div>
            </nav>

            <main className="products-main">
                <header className="products-header">
                    <h1 className="products-title">Our Collection</h1>
                    <p className="products-subtitle">Discover the finest selections from the Araku Valley</p>
                </header>

                <div className="products-grid">
                    {PRODUCTS.map((product) => (
                        <div 
                            key={product.id} 
                            className="products-card"
                            onClick={() => openModal(product)}
                        >
                            <div className="products-card-img-wrap">
                                <img src={product.image} alt={product.name} className="products-card-img" />
                            </div>
                            <h3 className="products-card-name">{product.name}</h3>
                        </div>
                    ))}
                </div>
            </main>

            <VideoHighlight />

            <SiteFooter />

            {/* Product Detail Modal (reused architecture from ProductShowcase) */}
            {selectedProduct && (
                <div
                    className="product-modal"
                    ref={modalRef}
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
                    style={{ zIndex: 10000 }}
                >
                    <div className="product-modal__content" ref={modalContentRef}>
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

                        <div className="product-modal__image-side">
                            <img
                                className="product-modal__image"
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                ref={modalImgRef}
                                draggable="false"
                            />
                        </div>

                        <div className="product-modal__info-side">
                            <span className="product-modal__origin-label">SINGLE ORIGIN</span>
                            <h3 className="product-modal__name">{selectedProduct.name}</h3>
                            <p className="product-modal__description">{selectedProduct.description}</p>
                            
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
                            
                            <button className="product-modal__cta">Explore This Coffee</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
