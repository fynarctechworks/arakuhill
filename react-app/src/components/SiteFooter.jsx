import { Link } from 'react-router-dom'
import './SiteFooter.css'

/* ══════════════════════════════════════════════════
   SiteFooter — Luxury Brand Footer

   Layout:
   ─────────────────────────────
   1. Newsletter CTA strip
   2. Four-column links grid
   3. Bottom bar — logo, social, copyright
   ══════════════════════════════════════════════════ */

const FOOTER_LINKS = {
    'Shop': [
        { label: 'All Coffee', to: '/page/all-coffee' },
        { label: 'Best Sellers', to: '/page/best-sellers' },
        { label: 'New Arrivals', to: '/page/new-arrivals' },
        { label: 'Gift Sets', to: '/page/gift-sets' },
        { label: 'Subscriptions', to: '/page/subscriptions' },
    ],
    'About': [
        { label: 'Our Story', to: '/page/our-story' },
        { label: 'The Valley', to: '/page/the-valley' },
        { label: 'Our Farmers', to: '/page/our-farmers' },
        { label: 'Sustainability', to: '/page/sustainability' },
        { label: 'Awards', to: '/page/awards' },
    ],
    'Support': [
        { label: 'Contact Us', to: '/page/contact-us' },
        { label: 'FAQs', to: '/page/faqs' },
        { label: 'Shipping', to: '/page/shipping' },
        { label: 'Returns', to: '/page/returns' },
        { label: 'Track Order', to: '/page/track-order' },
    ],
    'Connect': [
        { label: 'Instagram', href: 'https://www.instagram.com/arakuhillcoffee.india?igsh=MTJyZnR3djNzbWZrZw%3D%3D&utm_source=qr', external: true },
        { label: 'LinkedIn', href: 'https://in.linkedin.com/in/araku-hill-coffee-1aa414348', external: true },
        { label: 'YouTube', href: 'https://youtube.com/@arakuhillcoffee?si=ETDRTcXFiES94-zZ', external: true },
        { label: 'Newsletter', to: '/page/newsletter' },
    ],
    'Locations': [
        { label: 'Rushikonda', href: 'https://www.google.com/maps/place/Araku+Hill+Coffee/@17.7816033,83.381651,12.5z/data=!4m6!3m5!1s0x3a395b007aeae02b:0x87d596c54654a6ba!8m2!3d17.7816033!4d83.381651!16s%2Fg%2F11xm24f_sr?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D', external: true },
        { label: 'VIP Road Vizag', href: 'https://maps.app.goo.gl/cMXr1DzArapQXgR59?g_st=ic', external: true },
        { label: 'Tennati Park Vizag', href: 'https://maps.app.goo.gl/d7aH49AF8XPhrSK79?g_st=ic', external: true },
        { label: 'Jubilee hills', href: 'https://maps.app.goo.gl/pcRFYdLs6fVgmAf39', external: true },
    ],
}

const SOCIALS = [
    { name: 'Instagram', href: 'https://www.instagram.com/arakuhillcoffee.india?igsh=MTJyZnR3djNzbWZrZw%3D%3D&utm_source=qr', path: 'M7.8 2h8.4C19 2 22 5 22 7.8v8.4A5.8 5.8 0 0116.2 22H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 017.8 2z M16 3.5a1 1 0 100 2 1 1 0 000-2z M12 7a5 5 0 110 10 5 5 0 010-10z M12 9a3 3 0 100 6 3 3 0 000-6z' },
    { name: 'LinkedIn', href: 'https://in.linkedin.com/in/araku-hill-coffee-1aa414348', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z' },
    { name: 'YouTube', href: 'https://youtube.com/@arakuhillcoffee?si=ETDRTcXFiES94-zZ', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.41zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
]

export default function SiteFooter() {
    return (
        <footer className="site-footer">



            {/* ══ LINKS GRID ════════════════════ */}
            <div className="footer__links">
                {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                    <div key={category} className="footer__column">
                        <h4 className="footer__column-title">{category}</h4>
                        <ul className="footer__column-list">
                            {links.map((link) => (
                                <li key={link.label}>
                                    {link.external ? (
                                        <a
                                            href={link.href}
                                            className="footer__link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link to={link.to} className="footer__link">
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ══ BOTTOM BAR ════════════════════ */}
            <div className="footer__bottom">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo" aria-label="Araku Hill Coffee Home">
                        <img 
                            src="/assets/Araku-hill-coffee-logo.svg" 
                            alt="Araku Hill Coffee" 
                            className="footer__logo-img" 
                        />
                    </Link>
                    <span className="footer__tagline">From the valley, for the world.</span>
                </div>

                <div className="footer__socials">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            className="footer__social-icon"
                            aria-label={social.name}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d={social.path} />
                            </svg>
                        </a>
                    ))}
                </div>

                <div className="footer__copyright">
                    <span>© {new Date().getFullYear()} Araku Hill Coffee. All rights reserved.</span>
                    <span className="footer__powered">
                        Powered by <a href="http://infynarc.com/" target="_blank" rel="noopener noreferrer">Fynarc Techworks Private Limited</a>
                    </span>
                </div>
            </div>

        </footer>
    )
}
