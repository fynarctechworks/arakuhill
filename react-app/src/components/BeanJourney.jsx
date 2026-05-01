import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BeanJourney.css';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
    {
        id: 1,
        title: "The Handpicking",
        description: "The journey of every cup begins in the lush hills where coffee is cultivated under ideal natural conditions. Here, experienced farmers carefully observe the crop and select only the ripest, deep-red cherries. Handpicking ensures precision, as unripe or overripe cherries are avoided, preserving consistency and quality. This human touch at the very first stage plays a crucial role in defining the potential of the coffee that follows.",
        video: "/assets/highlights/stage-1.mp4"
    },
    {
        id: 2,
        title: "Processing",
        description: "Once harvested, the cherries are taken through a meticulous processing stage to extract the beans within. The outer skin is removed, and the beans are allowed to ferment in controlled environments to break down the remaining fruit layers. After fermentation, they are washed thoroughly and spread out to dry under the sun or in carefully monitored conditions. This stage is essential in shaping the coffee’s clarity, sweetness, and overall flavor profile.",
        video: "/assets/highlights/stage-2.mp4"
    },
    {
        id: 3,
        title: "Roasting",
        description: "After drying, the beans—now known as green coffee—are ready for roasting. Roasting is both an art and a science, where temperature, timing, and technique are carefully controlled. As the beans are heated, they undergo physical and chemical transformations, developing rich aromas, body, and complexity. This is the stage where the true identity of the coffee is unlocked, bringing out notes that define its character.",
        video: "/assets/highlights/stage-3.mp4"
    },
    {
        id: 4,
        title: "Brewing",
        description: "The final step is brewing, where the roasted beans are transformed into a beverage that can be enjoyed. Whether it’s a pour-over, espresso, or French press, the brewing method plays a significant role in highlighting the coffee’s best qualities. As hot water interacts with the grounds, it extracts the flavors, aromas, and body developed during roasting. This moment of brewing connects the cultivator, the roaster, and the drinker, completing the journey from bean to cup.",
        video: "/assets/section-4-imgs/video-4.mp4"
    }
];

export default function BeanJourney() {
    const sectionRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const wrapperRefs = useRef([]);
    const innerRefs = useRef([]);
    const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

    useEffect(() => {
        if (!sectionRef.current || shouldLoadVideos) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadVideos(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '600px' }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [shouldLoadVideos]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const wrappers = wrapperRefs.current;
        const inners = innerRefs.current;

        if (!section || wrappers.length === 0) return;

        const ctx = gsap.context(() => {
            // 1. Set initial states
            // Card 0 sits naturally at the top.
            // Cards 1, 2, 3 start pushed down exactly 1 window height to be safely off-screen
            gsap.set(wrappers.slice(1), { y: () => window.innerHeight });

            // 2. Create the main pinned timeline
            // Scroll duration = 100% per card transition + 100% pause at the end
            const totalScrollDuration = wrappers.length * 100; 

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',              // Pin exactly when section hits top of viewport
                    end: `+=${totalScrollDuration}%`, // e.g., +=400% for 3 transitions + 1 pause
                    pin: true,                     // Freeze the entire section in place
                    scrub: 1,                      // Smooth scrub
                }
            });

            // 3. Build the animation sequence
            wrappers.forEach((wrapper, i) => {
                if (i === 0) return; // Skip first card setup in timeline (it's already there)

                const currentWrapper = wrappers[i];
                const previousInner = inners[i - 1];

                // Animate the incoming card sliding up out of nowhere
                tl.to(currentWrapper, {
                    y: 0,
                    ease: 'none',
                    duration: 1
                }, i - 1); // Use exact sequential timing to completely avoid dead spots

                // Concurrently, animate the previous card scaling down and fading
                tl.to(previousInner, {
                    scale: 0.85,
                    opacity: 0,
                    ease: 'none',
                    duration: 1
                }, i - 1); // Match the timing of the incoming card
            });

            // 4. Add a tiny dummy tween so the final card stays pinned on-screen before unpinning
            tl.to({}, { duration: 1 });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="bean-journey" ref={sectionRef}>
            <img
                src="/assets/highlights/layer.png"
                alt=""
                className="section-layer"
                aria-hidden="true"
            />

            <div className="section-header" style={{ '--text-color': '#2A3720', '--subtitle-color': '#2A3720', paddingBottom: '40px' }}>
                <h2 className="section-title">Bean Journey</h2>
                <p className="section-subtitle">From nature's canopy to a sustainable cup.</p>
            </div>

            <div className="bean-journey-cards-container" ref={cardsContainerRef}>
                {journeySteps.map((step, index) => (
                    <div
                        key={step.id}
                        className="journey-card-wrapper"
                        ref={el => wrapperRefs.current[index] = el}
                    >
                        <div
                            className="journey-card-inner"
                            ref={el => innerRefs.current[index] = el}
                        >
                            {/* Full bleed background video */}
                            <video
                                src={shouldLoadVideos ? `${step.video}#t=0.001` : undefined}
                                preload="none"
                                className="journey-card-bg"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />

                            {/* Dark overlay to make text pop */}
                            <div 
                                className="journey-card-overlay"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)' }}
                            ></div>

                            {/* Text content on top of the overlay */}
                            <div className="journey-card-content">
                                <span className="journey-card-number">0{step.id}</span>
                                <h3 className="journey-card-title">{step.title}</h3>
                                <p className="journey-card-desc">{step.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
