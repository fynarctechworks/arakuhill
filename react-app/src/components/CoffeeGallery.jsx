import React, { useState, useRef, useEffect } from 'react';
import './CoffeeGallery.css';

const galleryVideos = [
    { id: 1, src: '/assets/gallery-videos/gallery-1.mp4', alt: 'Coffee Reel 1' },
    { id: 2, src: '/assets/gallery-videos/gallery-2.mp4', alt: 'Coffee Reel 2' },
    { id: 3, src: '/assets/gallery-videos/gallery-3.mp4', alt: 'Coffee Reel 3' },
    { id: 4, src: '/assets/gallery-videos/gallery-4.mp4', alt: 'Coffee Reel 4' },
    { id: 5, src: '/assets/gallery-videos/gallery-5.mp4', alt: 'Coffee Reel 5' },
    { id: 6, src: '/assets/gallery-videos/gallery-6.mp4', alt: 'Coffee Reel 6' },
    { id: 7, src: '/assets/gallery-videos/gallery-7.mp4', alt: 'Coffee Reel 7' },
];

function VideoItem({ videoData, onOpenPopup }) {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Autoplay blocked:', err));
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            className="gallery-item-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => onOpenPopup(videoData, e)}
        >
            <video
                ref={videoRef}
                src={videoData.src}
                className="gallery-item-video"
                muted={isMuted}
                loop
                playsInline
                draggable="false"
            />

            {!isPlaying && (
                <div className="video-play-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            )}

            <button className="video-mute-toggle" onClick={toggleMute}>
                {isMuted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export default function CoffeeGallery() {
    const scrollContainerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Momentum variables
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const velX = useRef(0);
    const dragDistance = useRef(0); // Track absolute distance moved during a single click
    const momentumID = useRef(null);
    const autoScrollSpeed = 0.15; // Slower, premium pixels per frame

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // Start roughly in the middle section
            container.scrollLeft = container.scrollWidth / 3;
        }

        const loop = () => {
            if (!container) return;

            if (!isDown.current) {
                // Apply momentum friction
                velX.current *= 0.95;

                let currentSpeed = velX.current;

                // If velocity drops below threshold, enforce base auto-scroll speed
                if (currentSpeed >= -autoScrollSpeed && currentSpeed <= 0) {
                    currentSpeed = -autoScrollSpeed;
                } else if (currentSpeed <= autoScrollSpeed && currentSpeed > 0) {
                    currentSpeed = autoScrollSpeed;
                }

                container.scrollLeft -= currentSpeed;
            }

            // Seamless boundary jump logic
            // Since we use 3 sets, scrollWidth is exactly 3 identical chunks.
            const thirdWidth = container.scrollWidth / 3;

            // If they scroll into the 3rd set, jump back to 2nd set
            if (container.scrollLeft >= thirdWidth * 2) {
                container.scrollLeft -= thirdWidth;
            }
            // If they scroll into the 1st set backwards, jump forward to 2nd set
            else if (container.scrollLeft <= thirdWidth * 0.5) {
                container.scrollLeft += thirdWidth;
            }

            // Continue loop
            momentumID.current = requestAnimationFrame(loop);
        };

        // Delay starting the loop slighly to ensure layout happens
        setTimeout(() => {
            momentumID.current = requestAnimationFrame(loop);
        }, 100);

        return () => {
            if (momentumID.current) cancelAnimationFrame(momentumID.current);
        };
    }, []);

    // Mouse drag to scroll handlers
    const handleMouseDown = (e) => {
        isDown.current = true;
        scrollContainerRef.current.classList.add('dragging');
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
        velX.current = 0; // Reset velocity
        dragDistance.current = 0; // Reset drag distance
        // Prevent default text selection while dragging
        document.body.style.userSelect = 'none';
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        if (isDown.current) {
            isDown.current = false;
            scrollContainerRef.current.classList.remove('dragging');
            document.body.style.userSelect = '';
        }
    };

    const handleMouseUp = () => {
        if (isDown.current) {
            isDown.current = false;
            scrollContainerRef.current.classList.remove('dragging');
            document.body.style.userSelect = '';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Smoother drag multiplier

        // Track the maximum pixel deviation from the original click spot
        dragDistance.current = Math.max(dragDistance.current, Math.abs(x - startX.current));

        // Calculate velocity based on instant distance delta
        const newScrollLeft = scrollLeft.current - walk;
        velX.current = scrollContainerRef.current.scrollLeft - newScrollLeft;

        scrollContainerRef.current.scrollLeft = newScrollLeft;
    };

    const handleImageClick = (img, e) => {
        // If we moved the mouse more than a few pixels, treat it as a drag, not a click
        if (dragDistance.current > 10) {
            e.preventDefault();
            return;
        }
        setSelectedImage(img);
    };

    const closePopup = () => {
        setSelectedImage(null);
    };

    const setGroups = [1, 2, 3]; // 3 duplicate sets of the gallery for seamless infinite scroll

    return (
        <section className="coffee-gallery-new" id="section-gallery">
            <img
                src="/assets/highlights/layer.png"
                alt=""
                className="section-layer"
                aria-hidden="true"
            />
            {/* Section Header */}
            <div className="section-header" style={{ '--text-color': '#2A3720', '--subtitle-color': '#2A3720', marginBottom: '40px' }}>
                <h2 className="section-title">Glimpse</h2>
                <p className="section-subtitle">Scenes from the valley, the harvest, and the perfect brew.</p>
            </div>

            {/* Seamless Infinite Looping Gallery */}
            <div
                className="gallery-auto-container"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="gallery-track">
                    {setGroups.map(set => (
                        <div key={set} className="gallery-set">
                            {galleryVideos.map((video) => (
                                <VideoItem
                                    key={`${set}-${video.id}`}
                                    videoData={video}
                                    onOpenPopup={handleImageClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Popup Modal */}
            {selectedImage && (
                <div className="gallery-popup-overlay" onClick={closePopup}>
                    <button className="gallery-popup-close" onClick={closePopup}>×</button>
                    <video
                        src={selectedImage.src}
                        className="gallery-popup-video"
                        autoPlay
                        loop
                        muted={false} // Allow sound in full-screen if they want
                        controls
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
}
