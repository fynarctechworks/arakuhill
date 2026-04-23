import React from 'react';
import './VideoHighlight.css';

export default function VideoHighlight() {
    return (
        <section className="video-highlight-section">
            <img src="/assets/highlights/Group-1.png" className="highlight-corner corner-tl" alt="" aria-hidden="true" />
            <img src="/assets/highlights/Group-1.png" className="highlight-corner corner-br" alt="" aria-hidden="true" />
            
            <div className="video-highlight-wrapper">
                <video 
                    src="/assets/highlights/Coffee_bean_to_2.mp4" 
                    className="video-highlight-bg"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
                <div className="video-highlight-overlay">
                    <img src="/assets/Araku-hill-coffee-logo-light.svg" alt="Araku Hill Coffee Logo" className="video-highlight-logo" />
                </div>
            </div>
        </section>
    );
}
