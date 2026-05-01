import { useParams, Link, useNavigate } from 'react-router-dom'
import PAGES from './pageData'
import './ContentPage.css'

/* ══════════════════════════════════════════════════
   ContentPage — Data-driven page renderer

   Reads the slug from the URL, looks up content in
   PAGES data, and renders a minimal luxury page with
   consistent styling matching the brand.
   ══════════════════════════════════════════════════ */

export default function ContentPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const page = PAGES[slug]

    if (!page) {
        return (
            <div className="content-page">
                <nav className="content-page__nav">
                    <button onClick={() => navigate(-1)} className="content-page__back">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
                        </svg>
                        Back
                    </button>
                </nav>
                <div className="content-page__body">
                    <h1 className="content-page__title">Page Not Found</h1>
                    <p className="content-page__subtitle">
                        The page you are looking for does not exist.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="content-page">
            {/* ── Navigation ─────────────────────── */}
            <nav className="content-page__nav">
                <button onClick={() => navigate(-1)} className="content-page__back">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
                    </svg>
                    Back
                </button>
                <span className="content-page__brand">Araku Hill Coffee</span>
            </nav>

            {/* ── Hero ───────────────────────────── */}
            <header className="content-page__hero">
                <h1 className="content-page__title">{page.title}</h1>
                <p className="content-page__subtitle">{page.subtitle}</p>
                <div className="content-page__divider" />
            </header>

            {/* ── Content Sections ────────────────── */}
            <main className="content-page__body">
                {page.sections.map((section, i) => (
                    <div key={i} className="content-page__section">
                        {section.heading && (
                            <h2 className="content-page__section-heading">
                                {section.heading}
                            </h2>
                        )}
                        {section.body && (
                            <p className="content-page__section-body">
                                {section.body}
                            </p>
                        )}
                        {section.list && (
                            <ul className="content-page__list">
                                {section.list.map((item, j) => (
                                    <li key={j} className="content-page__list-item">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </main>

            {/* ── Footer ─────────────────────────── */}
            <footer className="content-page__footer">
                <button onClick={() => navigate(-1)} className="content-page__footer-link">
                    ← Go Back
                </button>
                <span className="content-page__footer-copy">
                    © {new Date().getFullYear()} Araku Hill Coffee
                </span>
            </footer>
        </div>
    )
}
