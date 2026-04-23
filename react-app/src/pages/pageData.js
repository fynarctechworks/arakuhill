/* ══════════════════════════════════════════════════
   Page Content Data — All footer link pages
   
   Each page has: title, subtitle, sections[]
   Each section: { heading?, body, list? }
   ══════════════════════════════════════════════════ */

const PAGES = {
    /* ── Shop ─────────────────────────────────── */
    'all-coffee': {
        title: 'All Coffee',
        subtitle: 'Explore our complete collection of single-origin coffees from the Araku Valley.',
        sections: [
            {
                heading: 'Our Collection',
                body: 'Every bean in our collection is handpicked from the misty slopes of the Araku Valley. From bold dark roasts to delicate pour-overs, each product represents the terroir, tradition, and craftsmanship of our tribal farming partners.',
            },
            {
                heading: 'Sourcing Philosophy',
                body: 'We work directly with over 500 tribal farming families, ensuring fair compensation and sustainable practices. Our beans are grown at altitudes between 900m and 1,300m, under shade canopy, without synthetic chemicals.',
            },
        ],
    },
    'best-sellers': {
        title: 'Best Sellers',
        subtitle: 'The coffees our customers love most — tried, tested, and adored.',
        sections: [
            {
                heading: 'Customer Favorites',
                body: 'Our best sellers are chosen by you. These are the coffees that keep people coming back — the ones gifted to friends, brewed every morning, and shared at dinner parties.',
                list: ['Red Wine Espresso', 'Golden Sunrise Blend', 'Mountain Cold Brew', 'Signature Pour Over'],
            },
        ],
    },
    'new-arrivals': {
        title: 'New Arrivals',
        subtitle: 'Fresh drops and seasonal limited editions from the latest harvest.',
        sections: [
            {
                heading: 'Latest Releases',
                body: 'Each season brings new flavour profiles influenced by rainfall, soil, and the changing rhythms of the valley. Our new arrivals capture the best of the current harvest.',
            },
            {
                heading: 'Limited Editions',
                body: 'Some lots are so exceptional they can only be produced in small quantities. When they appear here, move fast — once they are gone, they are gone until the next harvest cycle.',
            },
        ],
    },
    'gift-sets': {
        title: 'Gift Sets',
        subtitle: 'Curated coffee experiences, beautifully presented for every occasion.',
        sections: [
            {
                heading: 'The Art of Gifting',
                body: 'Our gift sets are designed for moments that matter. Each box is handcrafted from sustainable materials and filled with a curated selection of our finest coffees, brewing accessories, and tasting notes.',
            },
            {
                heading: 'Available Sets',
                list: ['Discovery Box — 4 single-origin samples', 'Connoisseur Collection — 6 premium roasts', 'Pour Over Kit — Dripper + specialty beans', 'The Complete Experience — wooden box with full accessories'],
            },
        ],
    },
    'subscriptions': {
        title: 'Subscriptions',
        subtitle: 'Never run out of extraordinary coffee. Delivered to your door.',
        sections: [
            {
                heading: 'How It Works',
                body: 'Choose your frequency, pick your roast preference, and we handle the rest. Every shipment is freshly roasted before dispatch, ensuring peak flavour in every cup.',
                list: ['Weekly — For the dedicated daily drinker', 'Bi-weekly — The perfect balance', 'Monthly — Explore at your pace'],
            },
            {
                heading: 'Subscriber Benefits',
                body: 'Members enjoy 15% off all orders, early access to limited editions, free shipping, and a quarterly tasting guide written by our head roaster.',
            },
        ],
    },

    /* ── About ────────────────────────────────── */
    'our-story': {
        title: 'Our Story',
        subtitle: 'From a valley of ancient wisdom to cups around the world.',
        sections: [
            {
                heading: 'The Beginning',
                body: 'Araku Hill Coffee was born from a simple belief: the world deserves to taste what the Araku Valley has been quietly perfecting for over a century. Our founders first visited the valley in 2018 and were captivated by the depth, clarity, and soul of the coffee grown there.',
            },
            {
                heading: 'Our Mission',
                body: 'We exist to share the extraordinary flavours of Araku with the world while ensuring every farmer\'s legacy is valued, preserved, and celebrated. Every cup sold directly supports the tribal communities who make this coffee possible.',
            },
            {
                heading: 'Where We Are Today',
                body: 'From our first pop-up to international recognition, we have grown into a brand that represents not just great coffee, but a deeper connection between land, people, and craft.',
            },
        ],
    },
    'the-valley': {
        title: 'The Valley',
        subtitle: 'Araku Valley — one of the world\'s most pristine coffee-growing regions.',
        sections: [
            {
                heading: 'Geography & Climate',
                body: 'Nestled in the Eastern Ghats of Andhra Pradesh, Araku Valley sits between 900m and 1,300m above sea level. The microclimate — cool mornings, warm afternoons, and misty evenings — creates ideal conditions for growing complex, flavourful arabica coffee.',
            },
            {
                heading: 'Biodiversity',
                body: 'The valley is surrounded by tropical deciduous forests, home to diverse flora and fauna. Coffee here grows under natural shade canopy alongside jackfruit, mango, and pepper trees, creating a rich ecosystem that naturally enriches the soil.',
            },
        ],
    },
    'our-farmers': {
        title: 'Our Farmers',
        subtitle: 'The skilled hands and generations of knowledge behind every cup.',
        sections: [
            {
                heading: 'Tribal Heritage',
                body: 'Our coffee is grown by indigenous tribal communities — the Adivasi people — who have cultivated these slopes for over a century. Their deep understanding of the land, passed down through generations, is the foundation of everything we do.',
            },
            {
                heading: 'Fair Partnership',
                body: 'We pay premium prices directly to farming families, bypassing middlemen. We invest in community infrastructure, education, and healthcare to ensure that coffee farming remains a viable and dignified livelihood for future generations.',
            },
            {
                heading: 'By the Numbers',
                list: ['500+ farming families', '2,000+ hectares of organic cultivation', '100% shade-grown arabica', 'Zero synthetic chemicals since inception'],
            },
        ],
    },
    'sustainability': {
        title: 'Sustainability',
        subtitle: 'Our commitment to the planet, the people, and the future.',
        sections: [
            {
                heading: 'Environmental Stewardship',
                body: 'All our coffee is 100% organically grown, certified by international bodies. We practice agroforestry, composting, water conservation, and zero-waste processing. Our packaging uses recycled and biodegradable materials wherever possible.',
            },
            {
                heading: 'Social Impact',
                body: 'Beyond fair wages, we fund community projects including clean water access, school infrastructure, and women\'s self-help groups. We believe the best coffee comes from communities that thrive.',
            },
            {
                heading: 'Carbon Footprint',
                body: 'We actively measure and offset our carbon emissions across the entire supply chain — from farm to cup. Our goal is to achieve carbon-negative operations by 2027.',
            },
        ],
    },
    'awards': {
        title: 'Awards & Recognition',
        subtitle: 'Honoured by the industry\'s most respected institutions.',
        sections: [
            {
                heading: 'International Acclaim',
                body: 'Our coffees have been recognised at the world\'s most prestigious competitions and industry events, earning accolades for flavour, sustainability, and design.',
                list: [
                    '2024 — Best Single Origin, World Coffee Awards',
                    '2023 — Gold Medal (Espresso), International Coffee Expo',
                    '2023 — Sustainability Excellence, Global Fair Trade Council',
                    '2022 — Top 10 Specialty Roasters, Specialty Coffee Association',
                    '2022 — Best Packaging Design, Design Week Awards',
                    '2021 — Heritage Brand of the Year, India Coffee Board',
                ],
            },
        ],
    },

    /* ── Support ──────────────────────────────── */
    'contact-us': {
        title: 'Contact Us',
        subtitle: 'We would love to hear from you. Reach out anytime.',
        sections: [
            {
                heading: 'Get in Touch',
                body: 'Whether you have a question about our coffee, need help with an order, or want to explore wholesale partnerships, our team is here to help.',
                list: [
                    'Email — arakuhillcoffee@gmail.com',
                    'Phone — +91 891 234 5678',
                    'Timings — 5pm to 1am (vizag)',
                ],
            },
            {
                heading: 'Visit Us',
                body: 'Our tasting room and roastery is open for visits by appointment. Come experience the full journey from bean to cup in person.',
            },
        ],
    },
    'faqs': {
        title: 'FAQs',
        subtitle: 'Quick answers to the questions we hear most often.',
        sections: [
            {
                heading: 'Ordering & Shipping',
                list: [
                    'How long does delivery take? — 3–5 business days within India, 7–14 days internationally.',
                    'Do you ship internationally? — Yes, we ship to over 30 countries.',
                    'Is shipping free? — Free on orders above ₹1,500. Subscription members get free shipping always.',
                ],
            },
            {
                heading: 'Products',
                list: [
                    'Is your coffee organic? — Yes, 100% certified organic.',
                    'How should I store my coffee? — In a cool, dry place in an airtight container. Use within 4 weeks of opening.',
                    'Do you sell decaf? — We are working on it! Coming soon.',
                ],
            },
        ],
    },
    'shipping': {
        title: 'Shipping',
        subtitle: 'Fast, reliable delivery to your doorstep.',
        sections: [
            {
                heading: 'Domestic Shipping',
                body: 'We ship across India via premium courier partners. Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available in select metro cities.',
                list: ['Free shipping on orders above ₹1,500', 'Express shipping — ₹150 flat', 'Cash on Delivery available'],
            },
            {
                heading: 'International Shipping',
                body: 'We ship to over 30 countries worldwide. International orders are dispatched within 48 hours and typically arrive within 7–14 business days depending on destination.',
            },
        ],
    },
    'returns': {
        title: 'Returns & Exchanges',
        subtitle: 'Your satisfaction is our priority.',
        sections: [
            {
                heading: 'Our Policy',
                body: 'If you are not completely satisfied with your purchase, we offer a no-questions-asked return within 7 days of delivery. Items must be unopened and in original packaging.',
            },
            {
                heading: 'How to Return',
                list: [
                    'Email us at returns@arakuhillcoffee.com with your order number',
                    'Our team will arrange a pickup within 48 hours',
                    'Refund processed within 5–7 business days after inspection',
                ],
            },
        ],
    },
    'track-order': {
        title: 'Track Your Order',
        subtitle: 'Know exactly where your coffee is at every step.',
        sections: [
            {
                heading: 'Order Tracking',
                body: 'Once your order is dispatched, you will receive a tracking link via email and SMS. Use the tracking number to monitor your shipment in real-time through our courier partner\'s website.',
            },
            {
                heading: 'Need Help?',
                body: 'If your tracking shows no updates for more than 48 hours, or if you have any concerns about your delivery, please reach out to us at arakuhillcoffee@gmail.com and we will sort it out promptly.',
            },
        ],
    },

    /* ── Connect ──────────────────────────────── */
    'newsletter': {
        title: 'Newsletter',
        subtitle: 'Stories, recipes, and new releases — straight to your inbox.',
        sections: [
            {
                heading: 'What You Will Receive',
                body: 'Our monthly newsletter is a love letter to coffee culture. Inside, you will find brewing guides, behind-the-scenes stories from the valley, early access to new products, and subscriber-only discounts.',
            },
            {
                heading: 'No Spam, Ever',
                body: 'We respect your inbox. You will hear from us once a month, sometimes twice if we cannot contain our excitement about a new release. Unsubscribe anytime with one click.',
            },
        ],
    },
}

export default PAGES
