import './MountainDivider.css'

/* ══════════════════════════════════════════════════
   Mountain Divider — Layered Silhouette Separator
   
   Creates a natural mountain range transition between
   sections using overlapping SVG shapes in soft muted
   tones. Matches luxury editorial beige palette.
   ══════════════════════════════════════════════════ */

export default function MountainDivider() {
    return (
        <div className="mountain-divider">
            <svg
                className="mountain-divider__svg"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Back layer — distant mountains (lightest) */}
                <path
                    className="mountain-divider__layer mountain-divider__layer--back"
                    d="
                        M 0 200
                        L 0 140
                        C 80 120, 160 130, 240 110
                        C 320 90, 380 60, 480 80
                        C 540 92, 580 100, 660 70
                        C 720 48, 780 30, 860 55
                        C 920 72, 960 85, 1040 50
                        C 1100 25, 1160 40, 1220 65
                        C 1280 85, 1340 95, 1440 75
                        L 1440 200
                        Z
                    "
                />

                {/* Mid layer — middle range (medium tone) */}
                <path
                    className="mountain-divider__layer mountain-divider__layer--mid"
                    d="
                        M 0 200
                        L 0 155
                        C 100 145, 180 150, 280 135
                        C 360 122, 420 115, 520 130
                        C 600 142, 660 148, 740 120
                        C 800 100, 860 110, 940 125
                        C 1020 138, 1080 130, 1160 115
                        C 1240 102, 1320 120, 1440 110
                        L 1440 200
                        Z
                    "
                />

                {/* Front layer — foreground hills (darkest) */}
                <path
                    className="mountain-divider__layer mountain-divider__layer--front"
                    d="
                        M 0 200
                        L 0 170
                        C 120 162, 200 168, 320 158
                        C 420 150, 500 155, 600 165
                        C 700 172, 780 168, 880 155
                        C 960 145, 1040 150, 1140 160
                        C 1240 168, 1340 165, 1440 158
                        L 1440 200
                        Z
                    "
                />
            </svg>
        </div>
    )
}
