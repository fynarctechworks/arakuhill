import './MinimalMountainDivider.css';

/* ══════════════════════════════════════════════════
   Minimal Mountain Divider — Clean & Elegant
   
   A lighter, thinner, and more minimal restyling of
   the mountain silhouette for the light theme sections.
   ══════════════════════════════════════════════════ */

export default function MinimalMountainDivider() {
    return (
        <div className="minimal-mountain-divider">
            <img 
                src="/assets/highlights/layer.png" 
                alt="" 
                className="section-layer" 
                aria-hidden="true"
            />
            <svg
                className="minimal-mountain__svg"
                viewBox="0 0 1440 160"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#f4ede6"
                    d="M0,160 L0,80 C240,100 480,20 720,60 C960,100 1200,40 1440,80 L1440,160 Z"
                />
                <path
                    fill="rgba(42, 55, 32, 0.03)"
                    d="M0,160 L0,100 C360,120 720,60 1080,100 C1260,120 1380,110 1440,100 L1440,160 Z"
                />
            </svg>
        </div>
    );
}
