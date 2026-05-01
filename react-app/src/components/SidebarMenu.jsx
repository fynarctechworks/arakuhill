import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './SidebarMenu.css'

/* ══════════════════════════════════════════════════
   SidebarMenu — Static navigation from left
   ══════════════════════════════════════════════════ */

const SECTIONS = [
    { id: 'top', label: 'Home' },
    { id: 'section-journey', label: 'The Journey' },
    { id: 'section-products', label: 'Products' },
    { id: 'section-gallery', label: 'Gallery' },
    { id: 'section-reviews', label: 'Reviews' },
]

export default function SidebarMenu({ isOpen, onClose, linksOverride }) {
    const navigate = useNavigate()

    /* ── Smooth scroll to section ────────────── */
    const handleSectionClick = useCallback((sectionId) => {
        onClose()
        if (sectionId === 'section-products') {
            navigate('/page/products')
            return
        }
        if (sectionId === 'top') {
            if (window.location.pathname !== '/') {
                navigate('/')
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } else {
            const el = document.getElementById(sectionId)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }, [onClose, navigate])

    /* ── Navigate to contact page ────────────── */
    const handleContactClick = useCallback(() => {
        onClose()
        navigate('/page/contact-us')
    }, [onClose, navigate])

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="sidebar__overlay"
                onClick={onClose}
            />

            {/* Panel */}
            <nav className="sidebar__panel">
                {/* Close button */}
                <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Section Links */}
                <div className="sidebar__links">
                    {(linksOverride || SECTIONS).map((section, i) => (
                        <button
                            key={section.id}
                            className="sidebar__link"
                            onClick={() => handleSectionClick(section.id)}
                        >
                            <span className="sidebar__link-label">
                                {section.label}
                            </span>
                        </button>
                    ))}

                    {/* Divider */}
                    <div className="sidebar__divider" />

                    {/* Contact */}
                    <button
                        className="sidebar__link sidebar__link--accent"
                        onClick={handleContactClick}
                    >
                        <span className="sidebar__link-label">Contact Us</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="sidebar__footer">
                    <img
                        src="/assets/Araku-hill-coffee-logo.svg"
                        alt="Araku Hill Coffee Logo"
                        className="sidebar__footer-logo"
                    />
                    <span className="sidebar__footer-sub">Drink Different</span>
                </div>
            </nav>
        </>
    )
}
