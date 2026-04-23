import { useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from '../components/Loader'
import PreHero from '../components/PreHero'
import BrandStory from '../components/BrandStory'

import BeanJourney from '../components/BeanJourney'
import ProductShowcase from '../components/ProductShowcase'
import CoffeeGallery from '../components/CoffeeGallery'
import ClientReviews from '../components/ClientReviews'
import SiteFooter from '../components/SiteFooter'
import SidebarMenu from '../components/SidebarMenu'
import VideoHighlight from '../components/VideoHighlight'

gsap.registerPlugin(ScrollTrigger)

function onIntroComplete() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    // Allow DOM to fully repaint body height before GSAP measures the scroll markers
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
}

export default function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useLayoutEffect(() => {
        return () => {
            document.documentElement.classList.remove('no-scroll')
            document.body.classList.remove('no-scroll')
        }
    }, [])

    return (
        <>
            <SidebarMenu
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <Loader onComplete={onIntroComplete} />
            <PreHero onMenuClick={() => setSidebarOpen(true)} />
            <div id="section-journey">
                <BrandStory />

                <BeanJourney />
            </div>


            <div id="section-products">
                <ProductShowcase />
            </div>
            <div id="section-gallery">
                <CoffeeGallery />
            </div>
            <VideoHighlight />
            <div id="section-reviews">
                <ClientReviews />
            </div>
            <SiteFooter />
        </>
    )
}
