import React, { useState, useEffect, useRef } from 'react';
import { TRANSFORMATION_DATA, COMPARISON_COLLECTION, AUTHORITY_ARCHIVE, TESTIMONIALS } from './constants';
import { ComparisonItem, GalleryItem, Testimonial } from './types';

/**
 * =============================================================================
 * UNIVERSAL SNAP-GALLERY ENGINE: SMART GALLERY
 * =============================================================================
 */

interface SmartGalleryProps {
  id: string;
  title: string;
  subtitle: string;
  items: (ComparisonItem | GalleryItem | Testimonial)[];
  type: 'photo' | 'video' | 'comparison';
  isLCP?: boolean;
}

const SmartGallery: React.FC<SmartGalleryProps> = ({ id, title, subtitle, items, type, isLCP }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(currentProgress);
    }
  };

  const scrollBy = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-24 md:py-48 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-28 fade-up">
          <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8">{subtitle}</span>
          <h2 className="font-serif text-[42px] md:text-7xl text-white tracking-tighter leading-tight italic">{title}</h2>
        </div>

        <div className="relative group">
          {/* Bleed Gradient Overlay (Mobile Only) */}
          <div className="absolute top-0 right-[-1px] bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden"></div>
          
          {/* Desktop Navigation Arrows */}
          <button 
            onClick={() => scrollBy('left')} 
            className="hidden md:flex absolute top-1/2 left-[-60px] -translate-y-1/2 w-12 h-12 items-center justify-center border border-white/10 text-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5 z-20"
          >
            &larr;
          </button>
          <button 
            onClick={() => scrollBy('right')} 
            className="hidden md:flex absolute top-1/2 right-[-60px] -translate-y-1/2 w-12 h-12 items-center justify-center border border-white/10 text-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5 z-20"
          >
            &rarr;
          </button>

          {/* Snap Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-4 gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                className="min-w-[82vw] md:min-w-0 snap-center group/card cursor-pointer"
              >
                {type === 'comparison' && (
                  <ComparisonCard item={item as ComparisonItem} isLCP={isLCP && index === 0} />
                )}
                {type === 'photo' && (
                  <PhotoCard item={item as GalleryItem} isLCP={isLCP && index === 0} />
                )}
                {type === 'video' && (
                  <VideoCard item={item as Testimonial} />
                )}
              </div>
            ))}
          </div>

          {/* Visual Cue: Interaction Hint (Mobile) */}
          <div className="flex flex-col gap-4 mt-6 md:hidden">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out shadow-[0_0_10px_#C5A059]" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">
                Листайте, чтобы увидеть масштаб проектов &rarr;
              </span>
              <span className="text-[10px] text-accent/40 font-serif italic">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonCard: React.FC<{ item: ComparisonItem; isLCP?: boolean }> = ({ item, isLCP }) => {
  const [showBefore, setShowBefore] = useState(false);
  return (
    <div 
      className="relative aspect-[3/4] overflow-hidden border border-white/5 bg-black"
      onMouseEnter={() => setShowBefore(true)}
      onMouseLeave={() => setShowBefore(false)}
      onTouchStart={() => setShowBefore(true)}
      onTouchEnd={() => setShowBefore(false)}
    >
      <img 
        src={item.after} 
        alt={item.title} 
        fetchPriority={isLCP ? "high" : "auto"}
        loading={isLCP ? "eager" : "lazy"}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100'}`} 
      />
      <img 
        src={item.before} 
        alt={`${item.title} Raw`} 
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
      />
      <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-700 ${showBefore ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-accent text-[10px] uppercase font-bold tracking-[0.2em] block mb-2">{item.category}</span>
        <h4 className="font-serif text-2xl text-white tracking-tight leading-none">{item.title}</h4>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ item: GalleryItem; isLCP?: boolean }> = ({ item, isLCP }) => (
  <div className="space-y-6">
    <div className="aspect-[3/4] overflow-hidden border border-white/5 bg-black">
      <img 
        src={item.image} 
        alt={item.name} 
        fetchPriority={isLCP ? "high" : "auto"}
        loading={isLCP ? "eager" : "lazy"}
        className="w-full h-full object-cover grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000" 
      />
    </div>
    <div className="space-y-2 text-center md:text-left">
      <span className="font-serif text-2xl text-white block group-hover/card:text-accent transition-colors">{item.name}</span>
      <span className="text-accent/50 text-[10px] uppercase font-bold tracking-[0.2em]">{item.status}</span>
    </div>
  </div>
);

const VideoCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="bg-card border border-white/5 p-6 md:p-8 hover:border-accent/40 transition-all duration-700 shadow-2xl">
    <div className="relative aspect-[9/16] bg-black mb-8 border border-accent/10 overflow-hidden shadow-3xl">
      <iframe src={item.videoUrl} loading="lazy" className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" title={item.name}></iframe>
    </div>
    <div className="space-y-3">
      <div className="font-serif text-2xl text-white leading-none whitespace-pre-line">{item.name}</div>
      <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] leading-relaxed whitespace-pre-line">{item.description}</div>
    </div>
  </div>
);

/**
 * =============================================================================
 * FAQ COMPONENT
 * =============================================================================
 */

const FAQ_DATA = [
  {
    question: "Не будет ли портрет выглядеть искусственно?",
    answer: "Мы не меняем вашу личность. Глаза, мимика и взгляд остаются нетронутыми. AI используется только как инструмент для создания безупречной одежды. Съемка ведется на реальный физический Fine Art холст."
  },
  {
    question: "Насколько это конфиденциально?",
    answer: "Мы работаем с первыми лицами. Мы подписываем строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения проекта."
  },
  {
    question: "Что если я не умею позировать?",
    answer: "Вам и не нужно. Моя работа — режиссура состояния. Мы просто общаемся в комфортном ритме, пока я фиксирую вашу естественную харизму."
  },
  {
    question: "Почему готовность всего 24 часа?",
    answer: "В большом бизнесе время — самый дорогой ресурс. Моя команда приступает к обработке немедленно, чтобы на следующее утро у вас уже были готовые инструменты."
  },
  {
    question: "Что я теряю, если оставлю текущий имидж?",
    answer: "Вы теряете рычаг влияния. В мире высокого капитала доверие и статус — это валюта. Несоответствие вашего облика масштабу ваших достижений создает скрытое сопротивление при сделках. Вы буквально платите «налог на невидимость» своей недополученной прибылью."
  }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left group">
        <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent'}`}>{question}</span>
        <span className={`text-2xl transition-transform duration-500 ${isOpen ? 'rotate-45 text-accent' : 'text-white/30'}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl">{answer}</p>
      </div>
    </div>
  );
};

/**
 * =============================================================================
 * MASTER PAGE
 * =============================================================================
 */

const MasterPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [activeStep, setActiveStep] = useState('3');
  const [activeLook, setActiveLook] = useState('a');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowMobileCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  return (
    <div className="bg-dark text-white selection:bg-accent selection:text-dark min-h-screen overflow-x-hidden font-sans">
      
      {/* 1. NAVBAR */}
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-500 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-2xl' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <div className="font-serif text-xl font-semibold tracking-[0.2em] uppercase">VALERY LATYPOV</div>
            <div className="text-accent uppercase tracking-[0.1em] text-[10px] font-black mt-1.5 opacity-90">Executive Protocol™</div>
          </div>
          <nav className="hidden lg:flex gap-12">
            {['Философия', 'Результаты', 'Портфолио', 'Рекомендации', 'Инвестиция'].map((item, i) => (
              <a key={i} href={`#${['manifesto', 'portfolio', 'archive', 'authority', 'pricing'][i]}`} className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60 hover:text-white transition-colors">{item}</a>
            ))}
          </nav>
          <a href="http://t.me/latypovvalery" className="hidden lg:block border border-accent/40 text-accent px-12 py-3.5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-accent hover:text-dark transition-all">Telegram Direct</a>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img 
          src="https://static.tildacdn.com/tild3830-3461-4336-a465-383562653435/04m_executive_image2.jpg"
          alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-30 md:opacity-50" 
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-center lg:text-left">
            <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">STRATEGIC VISUAL ASSET PROTOCOL</span>
            <h1 className="font-serif text-[42px] leading-[1.05] md:text-8xl lg:text-9xl text-white mb-10 tracking-tight">Ваш имидж — это <br className="hidden md:block" /><span className="text-accent italic font-light gold-gradient-text">актив или пассив.</span></h1>
            <p className="max-w-2xl mb-16 text-[16px] md:text-2xl text-white/70 font-light leading-relaxed mx-auto lg:mx-0">Executive Protocol™: Создание визуального капитала за 60 минут. Математическая точность образа для тех, кто управляет империями.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a href="http://t.me/latypovvalery" className="bg-accent text-dark px-12 py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white transition-all shadow-xl">ЗАБРОНИРОВАТЬ АУДИТ</a>
              <a href="#portfolio" className="border border-white/20 text-white px-12 py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white/5 transition-all">Портфолио</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE (Before/After) - Snap Engine */}
      <SmartGallery id="portfolio" title="Трансформация Статуса" subtitle="The WOW Collection" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

      {/* 4. TRANSFORMATION MATRIX (System Explanation) */}
      <section className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up">
            <span className="text-accent text-[11px] font-extrabold uppercase tracking-[0.5em] mb-8 block">Zero Friction Protocol™</span>
            <h2 className="font-serif text-3xl md:text-7xl text-white leading-[1.1] mb-10 tracking-tight">Максимальный рычаг при <span className="italic text-accent">нулевых усилиях</span></h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">Мы экономим ваше время. Процесс занимает 60 минут. <span className="text-white font-medium">Time Saving Logic:</span> 100% режиссуры и технической реализации на моей команде.</p>
          </div>
          <div className="flex flex-col items-center gap-12 lg:gap-20 relative fade-up">
            <div className="relative w-full max-w-[380px] lg:max-w-[480px]">
              <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-black/40 shadow-3xl">
                <img src={activeStep === '3' ? (TRANSFORMATION_DATA.find(p => p.id === '3')?.subPhases?.find(s => s.id === activeLook)?.image) : (TRANSFORMATION_DATA.find(p => p.id === activeStep)?.image)} loading="lazy" className="w-full h-full object-cover transition-all duration-1000" alt="Transformation" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-10 w-full max-w-6xl">
              {TRANSFORMATION_DATA.map(step => (
                <div key={step.id} className="flex flex-col gap-6 w-full md:w-auto items-center">
                  <button onClick={() => setActiveStep(step.id)} className={`p-5 md:px-10 md:py-7 border flex items-center transition-all md:w-[300px] w-full ${activeStep === step.id ? 'border-accent bg-card' : 'border-white/5 text-white/30 hover:border-white/20'}`}>
                    <div className="flex items-center gap-5 text-left w-full justify-center md:justify-start">
                      <span className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] border-r border-white/10 pr-5 ${activeStep === step.id ? 'text-accent' : 'text-white/10'}`}>{`0${step.id}.`}</span>
                      <span className={`text-[10px] md:text-[14px] font-bold uppercase tracking-[0.2em] leading-tight ${activeStep === step.id ? 'text-white' : ''}`} dangerouslySetInnerHTML={{ __html: step.label.replace(/.*: /, '') }} />
                    </div>
                  </button>
                  {step.id === '3' && activeStep === '3' && (
                    <div className="flex flex-wrap justify-center gap-3 animate-fade-in md:absolute md:top-full md:mt-10">
                      {step.subPhases?.map(sub => (
                        <button key={sub.id} onClick={() => setActiveLook(sub.id)} className={`px-6 py-3 text-[8px] md:text-[9px] uppercase font-black tracking-[0.4em] border transition-all ${activeLook === sub.id ? 'border-accent text-dark bg-accent' : 'border-white/10 text-white/40 bg-black/60 hover:text-white'}`}>{sub.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUTHORITY ARCHIVE (Social Proof - Horizontal Snap) */}
      <SmartGallery id="archive" title="Те, кто доверил мне капитал" subtitle="Cultural Code" type="photo" items={AUTHORITY_ARCHIVE} />

      {/* 6. TESTIMONIALS (Video Snap Gallery) */}
      <SmartGallery id="authority" title="Слово тех, кто прошел Protocol" subtitle="Social Proof" type="video" items={TESTIMONIALS} />

      {/* 7. FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center fade-up">
            <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-6">Discovery phase</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight italic">Вопросы и Ответы</h2>
          </div>
          <div className="max-w-4xl mx-auto fade-up">
            {FAQ_DATA.map((item, i) => <FAQItem key={i} question={item.question} answer={item.answer} />)}
          </div>
        </div>
      </section>

      {/* 8. GUARANTEE (Kennedy Style Risk Reversal) */}
      <section className="py-24 bg-black border-y border-white/5 text-center fade-up">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center w-20 h-20 border-2 border-accent rounded-full mb-12 mx-auto shadow-2xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 tracking-tighter">Безусловный Протокол Защиты</h2>
          <div className="max-w-4xl mx-auto space-y-10">
            <p className="text-white/70 text-lg md:text-2xl font-light">Ваш имидж — это <span className="text-white font-medium">Visual Asset</span>. Если результат не отражает ваш истинный масштаб — оплата не взимается. Я беру на себя 100% финансовых рисков.</p>
            <p className="text-white/30 text-base italic">«Если масштаб вашей личности не будет отражен — вы не платите ничего. Точка.»</p>
          </div>
        </div>
      </section>

      {/* 9. PRICING */}
      <section id="pricing" className="py-24 md:py-48 bg-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border border-accent/30 bg-card p-8 md:p-24 relative shadow-3xl text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-dark px-10 py-3.5 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl whitespace-nowrap">EXECUTIVE PROTOCOL™ VALUE</div>
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_450px] gap-16 items-center mt-12 md:mt-0">
              <div className="space-y-12 text-left w-full">
                <h3 className="font-serif text-3xl md:text-5xl text-white mb-10 italic underline decoration-accent/10 underline-offset-8">Инвестиция в статус:</h3>
                {['Global Mobility Protocol', 'Bonus #1: Digital Tailoring', 'Bonus #2: 24h Delivery'].map((p, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-6">
                    <p className={`font-serif text-xl md:text-2xl ${i > 0 ? 'text-accent italic opacity-80' : 'text-white'}`}>{p}</p>
                    <span className={`text-[13px] ${i > 0 ? 'line-through opacity-40' : 'text-accent/40 italic'}`}>{i === 0 ? '250 000 ₽' : '150 000 ₽'}</span>
                  </div>
                ))}
              </div>
              <div className="bg-black/60 p-10 border border-accent/20 w-full relative">
                <span className="text-accent/50 text-[11px] font-black tracking-[0.6em] uppercase block mb-8">Итоговая Стоимость</span>
                <div className="font-serif text-6xl md:text-[80px] text-white gold-gradient-text mb-6 whitespace-nowrap leading-none">250 000 ₽</div>
                <p className="text-accent/40 uppercase text-[10px] tracking-[0.4em] font-black mb-12">ОКУПАЕТСЯ ПЕРВОЙ ЖЕ СДЕЛКОЙ</p>
                <a href="http://t.me/latypovvalery" className="block w-full bg-[#1c1c1c] text-accent border border-accent/40 py-7 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-dark transition-all shadow-2xl">ЗАБРОНИРОВАТЬ СЛОТ</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-24 bg-black border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <div className="font-serif text-[20px] md:text-5xl tracking-[0.5em] text-white/90 mb-8 uppercase">VALERY LATYPOV</div>
          <div className="text-accent text-[12px] font-black tracking-[0.4em] uppercase mb-16 opacity-80">Executive Protocol™</div>
          <p className="text-white/10 text-[9px] uppercase tracking-[0.5em] font-semibold">&copy; 2026 | PRIVATE SELECTION | BY VALERY LATYPOV</p>
        </div>
      </footer>

      {/* 11. STICKY MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 w-full p-4 z-[2000] lg:hidden transition-transform duration-500 ${showMobileCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <a href="http://t.me/latypovvalery" className="block w-full bg-accent text-dark font-black uppercase tracking-[0.3em] text-[12px] py-5 text-center shadow-2xl active:scale-95 transition-transform">ЗАБРОНИРОВАТЬ АУДИТ</a>
      </div>
    </div>
  );
};

export default MasterPage;
