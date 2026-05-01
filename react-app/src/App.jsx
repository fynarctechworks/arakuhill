import { useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HomePage from './pages/HomePage'
import ContentPage from './pages/ContentPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'
import NotFound from './pages/NotFound'
import ScrollManager from './components/ScrollManager'

// Register ScrollTrigger ONCE at module level
gsap.registerPlugin(ScrollTrigger)

export default function App() {
    return (
        <BrowserRouter>
            <ScrollManager />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/page/contact-us" element={<ContactPage />} />
                <Route path="/page/products" element={<ProductsPage />} />
                <Route path="/page/:slug" element={<ContentPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
