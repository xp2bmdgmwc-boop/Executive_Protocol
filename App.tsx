import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SmartGallery from './components/SmartGallery';
import About from './components/About';
import TransformationMetamorphosis from './components/TransformationMetamorphosis';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Guarantee from './components/Guarantee';
import Footer from './components/Footer';
import { COMPARISON_COLLECTION, AUTHORITY_ARCHIVE, TESTIMONIALS } from './constants';

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-dark text-white selection:bg-accent/30 selection:text-white min-h-screen font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* WOW Collection - Comparison Gallery */}
        <SmartGallery 
          id="archive" 
          title="Трансформация Статуса" 
          subtitle="The WOW Collection" 
          type="comparison" 
          items={COMPARISON_COLLECTION} 
          isLCP={true} 
        />
        
        <About />
        
        {/* Method Section with Metamorphosis */}
        <section id="manifesto" className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up">
              <span className="text-accent text-[11px] font-black uppercase tracking-widest mb-8 block">ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™</span>
              <h2 className="font-serif text-[42px] md:text-7xl text-white leading-tight mb-10 italic">Визуальный капитал <span className="gold-gradient-text">уровня Forbes</span></h2>
              <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">Без стилистов, без суеты, без компромиссов.</p>
            </div>
            <TransformationMetamorphosis />
          </div>
        </section>

        {/* Global Stage - Photo Gallery */}
        <SmartGallery 
          id="global-stage" 
          title="Те, кто доверил мне капитал" 
          subtitle="Cultural Code" 
          type="photo" 
          items={AUTHORITY_ARCHIVE} 
        />

        {/* Social Proof - Video Gallery */}
        <SmartGallery 
          id="portfolio" 
          title="Доверие тех, кто выбрал меня" 
          subtitle="Social Proof" 
          type="video" 
          items={TESTIMONIALS} 
        />

        <FAQ />
        <Guarantee />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
};

export default App;