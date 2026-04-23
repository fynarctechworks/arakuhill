import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
import './ContactPage.css'

export default function ContactPage() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get('Name')
        const email = formData.get('Email')
        const subject = formData.get('Subject')
        const message = formData.get('Message')

        const whatsappText = `*New Inquiry via Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`
        const encodedText = encodeURIComponent(whatsappText)
        
        const phoneNumber = "919963940369"
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`
        
        window.open(whatsappUrl, '_blank')
        e.target.reset()
    }


    return (
        <div className="contact-page">
            <div className="contact-bg-image"></div>
            <div className="contact-bg-overlay"></div>

            <SidebarMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)}
                linksOverride={[
                    { id: 'top', label: 'Home' },
                    { id: 'section-products', label: 'Products' }
                ]}
            />
            
            {/* Top Navigation */}
            <nav className="contact-nav">
                <div className="contact-menu-wrapper">
                    <button className="contact-menu-btn" onClick={() => setIsMenuOpen(true)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <img src="/assets/Araku-hill-coffee-logo.svg" alt="Araku Hill Coffee" className="contact-nav-logo" />
                <div style={{ width: '40px' }}></div> {/* Spacer for perfect logo centering */}
            </nav>

            <main className="contact-main">
                <div className="contact-grid">
                    
                    {/* LEFT SIDE: Information */}
                    <div className="contact-info-col">
                        <h1 className="contact-title">Let's Connect</h1>
                        <p className="contact-about">
                            Rooted in the pristine Eastern Ghats of India, Araku Hill Coffee brings you fully washed, 
                            specialty-grade Arabica directly from the farm to your cup. We would love to hear from 
                            you—whether it's about our coffee, wholesale partnerships, or just to say hello.
                        </p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <h3>Email</h3>
                                <p><a href="mailto:arakuhillcoffee@gmail.com">arakuhillcoffee@gmail.com</a></p>
                            </div>
                            <div className="contact-detail-item">
                                <h3>Phone</h3>
                                <p>+91 99639 40369</p>
                            </div>
                            <div className="contact-detail-item">
                                <h3>Hours</h3>
                                <p>Timings 5pm to 1am (vizag)</p>
                            </div>
                        </div>

                        <div className="contact-branches">
                            <h3>Our Branches</h3>
                            <div className="branch-grid">
                                <div className="branch-item">
                                    <h4 className="branch-name">Vizag Branch</h4>
                                    <a 
                                        href="https://www.google.com/maps/place/Araku+Hill+Coffee/@17.7816033,83.381651,12.5z/data=!4m6!3m5!1s0x3a395b007aeae02b:0x87d596c54654a6ba!8m2!3d17.7816033!4d83.381651!16s%2Fg%2F11xm24f_sr?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="branch-link"
                                    >
                                        Get Directions
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="branch-item">
                                    <h4 className="branch-name">Hyderabad Branch</h4>
                                    <a 
                                        href="https://maps.app.goo.gl/pcRFYdLs6fVgmAf39" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="branch-link"
                                    >
                                        Get Directions
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-socials">
                            <h3>Follow Our Journey</h3>
                            <div className="social-links">
                                <a href="https://www.instagram.com/arakuhillcoffee.india?igsh=MTJyZnR3djNzbWZrZw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Form */}
                    <div className="contact-form-col">
                        <div className="contact-form-wrapper">
                            <h2>Send a Message</h2>
                            <form 
                                className="contact-form" 
                                onSubmit={handleWhatsAppSubmit}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="Name" required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="Email" required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input type="text" id="subject" name="Subject" required placeholder="Wholesale Inquiry" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="Message" rows="5" required placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="contact-submit-btn">
                                    Send Message
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
