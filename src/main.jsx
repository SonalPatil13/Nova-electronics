import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Headphones, Menu, Minus, Plus, Search, ShoppingBag, Sparkles,
  Truck, ShieldCheck, RotateCcw, X, Heart, Instagram, Facebook, Mail
} from 'lucide-react';
import './styles.css';

const products = [
  {
    id: 1, name: 'Aural Pro Headphones', category: 'Audio', price: 89099, oldPrice: 100999,
    tag: 'BESTSELLER', color: 'Midnight', rating: '4.9', reviews: 128,
    image: 'https://images.unsplash.com/photo-150ಿಕ?auto=format&fit=crop&w=1000&q=85'.replace('150ಿಕ', '1505740420928-5e560c06d30e'),
    description: 'Lose yourself in beautifully balanced sound. Rich detail, adaptive noise cancellation and all-day comfort.'
  },
  {
    id: 2, name: 'Pulse Smartwatch', category: 'Wearables', price: 120499, oldPrice: 140999,
    tag: 'NEW ARRIVAL', color: 'Silver', rating: '4.8', reviews: 94,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    description: 'A little more insight, right on your wrist. Track your day, stay connected and keep moving.'
  },
  {
    id: 3, name: 'Echo Mini Speaker', category: 'Audio', price: 49099, oldPrice: null,
    tag: 'COMPACT FAVOURITE', color: 'Stone', rating: '4.7', reviews: 76,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=85',
    description: 'Small footprint. Big atmosphere. Bring warm, room-filling sound to your favourite spaces.'
  },
  {
    id: 4, name: 'Lumen Digital Camera', category: 'Cameras', price: 280999, oldPrice: 310999,
    tag: 'CREATOR PICK', color: 'Graphite', rating: '4.9', reviews: 61,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85',
    description: 'Make everyday moments feel cinematic with crisp detail, intuitive controls and a timeless design.'
  },
  {
    id: 5, name: 'Studio Mechanical Keyboard', category: 'Accessories', price: 74099, oldPrice: null,
    tag: 'DESK ESSENTIAL', color: 'Cloud', rating: '4.8', reviews: 112,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
    description: 'A satisfying, considered typing experience. Thoughtful ergonomics meet a clean, minimal profile.'
  },
  {
    id: 6, name: 'Aero Wireless Earbuds', category: 'Audio', price: 62999, oldPrice: 74999,
    tag: 'NEW ARRIVAL', color: 'Matte White', rating: '4.8', reviews: 88,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=85',
    description: 'Crystal-clear acoustics with seamless spatial audio, dual beamforming mics, and all-weather resistance.'
  },
  {
    id: 7, name: 'Horizon Ultra Tablet', category: 'Accessories', price: 169999, oldPrice: 189999,
    tag: 'TOP RATED', color: 'Space Grey', rating: '4.9', reviews: 145,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=85',
    description: 'A stunning edge-to-edge display built for sketching, reading, and seamless multitasking on the go.'
  },
  {
    id: 8, name: 'MagGlow Wireless Power Hub', category: 'Accessories', price: 34999, oldPrice: 42999,
    tag: 'MUST HAVE', color: 'Obsidian', rating: '4.7', reviews: 92,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=85',
    description: 'Minimalist 3-in-1 magnetic fast-charging dock that powers your phone, watch, and earbuds together.'
  }
];

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function App() {
  const [page, setPage] = useState('Home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [toast, setToast] = useState('');

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const filtered = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  const navigate = (next) => { setPage(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const addToCart = (product) => {
    setCart(current => current.some(i => i.id === product.id)
      ? current.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...current, { ...product, qty: 1 }]);
    setToast(`${product.name} added to your bag`);
    window.setTimeout(() => setToast(''), 2400);
  };
  const changeQty = (id, delta) => setCart(current => current
    .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));

  const navItems = ['Home', 'Shop', 'Our story', 'Contact'];

  return (
    <div className="app-shell">
      <div className="announcement">A little upgrade goes a long way. <span>Free shipping on orders over ₹5,000</span></div>
      <header className="header">
        <button className="mobile-menu icon-button" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={21} /></button>
        <button className="wordmark" onClick={() => navigate('Home')} aria-label="NOVA home">NOVA<span>®</span></button>
        <nav className={`nav ${mobileOpen ? 'nav-open' : ''}`}>
          {navItems.map(item => <button key={item} className={page === item ? 'nav-link active' : 'nav-link'} onClick={() => navigate(item)}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Go to shop" onClick={() => navigate('Shop')}><Search size={19} /></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={19} /><span>Bag</span><b>{count}</b></button>
        </div>
      </header>

      <main>
        {page === 'Home' && <Home navigate={navigate} addToCart={addToCart} />}
        {page === 'Shop' && <Shop filtered={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery} addToCart={addToCart} />}
        {page === 'Our story' && <Story navigate={navigate} />}
        {page === 'Contact' && <Contact />}
      </main>

      <Footer navigate={navigate} />
      {cartOpen && <div className="overlay" onMouseDown={e => e.target === e.currentTarget && setCartOpen(false)}>
        <aside className="cart-drawer">
          <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
          {cart.length === 0 ? <div className="empty-cart"><div className="empty-icon"><ShoppingBag size={28} /></div><h3>Your bag is taking a breather.</h3><p>Find something that makes your everyday a little better.</p><button className="button button-dark" onClick={() => { setCartOpen(false); navigate('Shop') }}>Explore the collection <ArrowRight size={16} /></button></div> :
            <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h4>{item.name}</h4><p>{money(item.price)}</p><div className="qty"><button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><button className="remove" onClick={() => changeQty(item.id, -item.qty)}>Remove</button></div>)}</div><div className="cart-bottom"><div className="subtotal"><span>Subtotal</span><strong>{money(total)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-dark full" onClick={() => { setToast('Demo checkout — no payment will be collected.'); setCartOpen(false); window.setTimeout(() => setToast(''), 3000) }}>Continue to checkout <ArrowUpRight size={16} /></button><span className="secure-note"><ShieldCheck size={14} /> Secure, simple and stress-free</span></div></>}
        </aside>
      </div>}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </div>
  );
}

function Home({ navigate, addToCart }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow light"><span className="eyebrow-dot" /> THE GOOD TECH EDITION</div><h1>Make room<br />for <em>better.</em></h1><p>Thoughtfully picked technology for the way you live, work and play. No noise. Just the good stuff.</p><div className="hero-buttons"><button className="button button-light" onClick={() => navigate('Shop')}>Explore the collection <ArrowUpRight size={17} /></button><button className="text-link light-link" onClick={() => navigate('Our story')}>Why NOVA? <ArrowDownRight size={16} /></button></div><div className="hero-footnote"><span>01 — 08</span><span>LESS, BUT BETTER.</span></div></div>
      <div className="hero-visual"><img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=90" alt="Curated collection of modern electronics" /><div className="hero-sticker"><Sparkles size={17} /><span>GOOD DESIGN.<br />GREAT EVERYDAY.</span></div><div className="hero-image-caption">THE EVERYDAY UPGRADE <span>↗</span></div></div>
    </section>
    <section className="trust-strip"><div><Truck /><span>Free shipping over ₹5,0000</span></div><div><ShieldCheck /><span>Quality, thoughtfully checked</span></div><div><RotateCcw /><span>Easy 7-day returns</span></div></section>
    <section className="section featured-section"><div className="section-heading"><div><p className="eyebrow">THE SHORTLIST</p><h2>Good things.<br /><em>Great company.</em></h2></div><button className="text-link" onClick={() => navigate('Shop')}>View all products <ArrowUpRight size={17} /></button></div><div className="product-grid">{products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div></section>
    <section className="quote-band"><span className="quote-mark">“</span><p>Technology should fit into your life.<br /><em>Not the other way around.</em></p><span className="quote-credit">THE NOVA POINT OF VIEW</span></section>
    <section className="newsletter"><div><p className="eyebrow">A GOOD THING IN YOUR INBOX</p><h2>Stay in the <em>know.</em></h2><p>New finds, useful ideas and the occasional little surprise.</p></div><form onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); alert('Thanks for joining the NOVA list!') }}><input type="email" placeholder="Your email address" required aria-label="Email address" /><button aria-label="Subscribe"><ArrowUpRight /></button></form></section>
  </>;
}

function ProductCard({ product, addToCart }) {
  return <article className="product-card"><div className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-tag">{product.tag}</span><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}><Plus size={19} /></button></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.category} · {product.color}</p></div><strong>{money(product.price)}</strong></div><div className="rating"><span>★★★★★</span> {product.rating} <i>({product.reviews})</i></div></article>;
}

function Shop({ filtered, category, setCategory, query, setQuery, addToCart }) {
  const categories = ['All', 'Audio', 'Wearables', 'Cameras', 'Accessories'];
  return <section className="shop-page section"><div className="page-intro"><p className="eyebrow">THE NOVA COLLECTION</p><h1>Find your next<br /><em>favourite thing.</em></h1><p>Eight carefully chosen essentials. Each one here for a reason.</p></div><div className="shop-toolbar"><div className="filters">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? 'filter active-filter' : 'filter'}>{c}</button>)}</div><label className="shop-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find something..." /></label></div><div className="product-grid shop-grid">{filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div>{filtered.length === 0 && <div className="no-results"><h3>Nothing found just yet.</h3><p>Try another search or category.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters <ArrowRight size={16} /></button></div>}</section>;
}

function Story({ navigate }) {
  return <section className="story-page"><div className="story-hero"><p className="eyebrow light">A LITTLE ABOUT US</p><h1>Less scrolling.<br /><em>More living.</em></h1><p>We believe the best technology doesn't ask for your attention. It gives you more room for what matters.</p></div><div className="story-content"><div className="story-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="Calm, considered workspace" /></div><div className="story-text"><p className="eyebrow">OUR POINT OF VIEW</p><h2>Curated, not crowded.</h2><p>The world doesn't need another endless catalogue. NOVA is a small, considered edit of useful electronics — products that feel good to use, look good in your space and earn their place in your everyday.</p><p>We look for thoughtful design, everyday usefulness and lasting value. Then we keep the choice simple, so you can spend less time comparing and more time enjoying.</p><button className="button button-dark" onClick={() => navigate('Shop')}>Meet the collection <ArrowRight size={16} /></button></div></div><div className="values"><div><span>01</span><h3>Considered choices</h3><p>Only the products we'd be happy to live with.</p></div><div><span>02</span><h3>Everyday usefulness</h3><p>Good technology should make life feel easier.</p></div><div><span>03</span><h3>Less, but better</h3><p>A focused edit instead of a noisy catalogue.</p></div></div></section>;
}

function Contact() {
  return <section className="contact-page section"><div className="contact-intro"><p className="eyebrow">WE'RE ALL EARS</p><h1>Let's talk<br /><em>good tech.</em></h1><p>Product question, order query or just want to say hello? We'd love to hear from you.</p></div><div className="contact-layout"><div className="contact-card"><Mail size={22} /><p className="eyebrow">DROP US A NOTE</p><h3>hello@nova.store</h3><p>We usually get back within one business day.</p><a className="button button-dark" href="mailto:hello@nova.store">Send an email <ArrowUpRight size={16} /></a></div><form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thanks for reaching out! This demo form is not connected to a support inbox.'); e.currentTarget.reset() }}><label>Your name<input required placeholder="What should we call you?" /></label><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>What’s on your mind?<textarea required rows="4" placeholder="Tell us a little about it..." /></label><button className="button button-dark" type="submit">Send your message <ArrowRight size={16} /></button></form></div></section>;
}

function Footer({ navigate }) {
  return <footer className="footer"><div className="footer-top"><div><button className="wordmark footer-logo" onClick={() => navigate('Home')}>NOVA<span>®</span></button><p>Good tech for your everyday.<br />A little less, a little better.</p></div><div className="footer-links"><div><b>EXPLORE</b><button onClick={() => navigate('Shop')}>Shop all</button><button onClick={() => navigate('Our story')}>Our story</button><button onClick={() => navigate('Contact')}>Contact</button></div><div><b>THE DETAILS</b><span>Shipping & returns</span><span>Privacy policy</span><span>Terms of use</span></div></div><div className="footer-social"><span>FOLLOW THE GOOD STUFF</span><div><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a></div></div></div><div className="footer-bottom"><span>© 2026 NOVA STORE. MADE FOR EVERYDAY.</span><span>DESIGNED WITH INTENTION <Heart size={12} fill="currentColor" /></span></div></footer>;
}

createRoot(document.getElementById('root')).render(<App />);
