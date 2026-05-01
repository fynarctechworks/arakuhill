import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollManager() {
    const location = useLocation();
    const navType = useNavigationType();
    const currentPath = useRef(location.pathname);

    // Save scroll position on scroll using the currently active path
    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            if (timeout) cancelAnimationFrame(timeout);
            timeout = requestAnimationFrame(() => {
                sessionStorage.setItem(`scrollPos_${currentPath.current}`, window.scrollY.toString());
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Restore or reset scroll position on route change
    useLayoutEffect(() => {
        // Update the current path ref FIRST, so any scroll events triggered
        // by window.scrollTo below will be saved to the NEW path, not the old one.
        currentPath.current = location.pathname;

        if (navType === 'POP' && !location.state?.scrollToTop) {
            const savedPos = sessionStorage.getItem(`scrollPos_${location.pathname}`);
            if (savedPos !== null) {
                const pos = parseInt(savedPos, 10);
                
                // Set immediately
                window.scrollTo({ top: pos, behavior: 'instant' });
                
                // Fallback for GSAP pins which extend the page height asynchronously
                const timeouts = [50, 150, 300].map(delay => 
                    setTimeout(() => window.scrollTo({ top: pos, behavior: 'instant' }), delay)
                );
                return () => timeouts.forEach(clearTimeout);
            }
        } else {
            // New route: scroll to top
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [location.pathname, navType, location.state]);

    return null;
}
