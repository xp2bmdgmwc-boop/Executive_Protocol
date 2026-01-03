import React, { useState, useEffect, useRef } from 'react';
import { TRANSFORMATION_DATA, COMPARISON_COLLECTION, AUTHORITY_ARCHIVE, TESTIMONIALS } from './constants';
import { ComparisonItem, GalleryItem, Testimonial } from './types';

/**
 * =============================================================================
 * UNIVERSAL COMPONENTS
 * =============================================================================
 */

const SmartGallery: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  items: (ComparisonItem | GalleryItem | Testimonial)[];
  type: 'photo' | 'video' | 'comparison';
  isLCP?: boolean;
}> = ({ id, title, subtitle, items, type, isLCP }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <section id={id} className="py-24 md:py-48 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-28 fade-up">
          <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8">{subtitle}</span>
          <h2 className="font-serif text-[42px] md:text-7xl text-white tracking-tighter leading-tight italic">{title}</h2>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-4 gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12"
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-[80vw] md:min-w-0 snap-center group/card cursor-pointer">
                {type === 'comparison' && <ComparisonCard item={item as ComparisonItem} isLCP={isLCP && index === 0} />}
                {type === 'photo' && <PhotoCard item={item as GalleryItem} isLCP={isLCP && index === 0} />}
                {type === 'video' && <VideoCard item={item as Testimonial} />}
              </div>
            ))}
          </div>

          <div className="md:hidden h-[1px] w-full bg-white/10 relative">
            <div className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
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
      onClick={() => setShowBefore(!showBefore)}
    >
      <img src={item.after} alt={item.title} fetchPriority={isLCP ? "high" : "auto"} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${showBefore ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`} />
      <img src={item.before} alt="Before" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${showBefore ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} />
      <div className="absolute top-4 right-4 z-20">
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase tracking-widest text-accent">
          {showBefore ? 'ORIGINAL' : 'PROTOCOL AI'}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
        <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] mb-1 block">{item.category}</span>
        <h4 className="font-serif text-2xl text-white">{item.title}</h4>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ item: GalleryItem; isLCP?: boolean }> = ({ item, isLCP }) => (
  <div className="space-y-6">
    <div className="aspect-[3/4] overflow-hidden border border-white/5 grayscale group-hover/card:grayscale-0 transition-all duration-1000">
      <img src={item.image} alt={item.name} fetchPriority={isLCP ? "high" : "auto"} className="w-full h-full object-cover" />
    </div>
    <div className="space-y-1">
      <span className="font-serif text-2xl text-white block">{item.name}</span>
      <span className="text-accent/60 text-[9px] uppercase font-bold tracking-widest">{item.status}</span>
    </div>
  </div>
);

const VideoCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="bg-card border border-white/5 p-6 md:p-8 hover:border-accent/30 transition-all">
    <div className="aspect-[9/16] bg-black mb-6 border border-white/10 overflow-hidden shadow-2xl">
      <iframe src={item.videoUrl} className="w-full h-full border-0" title={item.name}></iframe>
    </div>
    <div className="space-y-2">
      <div className="font-serif text-xl text-white leading-tight">{item.name}</div>
      <div className="text-white/40 text-[9px] uppercase font-bold tracking-widest leading-relaxed whitespace-pre-line">{item.description}</div>
    </div>
  </div>
);

/**
 * =============================================================================
 * SECTION: TRANSFORMATION (HAPTIC READY)
 * =============================================================================
 */

const TransformationMetamorphosis: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const touchStart = useRef(0);

  const triggerHaptic = (dur = 15) => { if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(dur); };

  const stages = [
    { label: 'ASSET', title: 'Loro Piana', desc: 'Бескомпромиссный статус. Высший уровень визуального капитала.', img: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' },
    { label: 'STATUS', title: 'Brioni', desc: 'Доминантная уверенность. Сила, которую не нужно доказывать.', img: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
    { label: 'ORIGIN', title: 'В жизни', desc: 'Точка входа. То, как вас видит мир без вмешательства протокола.', img: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg' },
    { label: 'PROCESS', title: 'Протокол', desc: '60 минут инженерной режиссуры. Механика создания образа.', img: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg' }
  ];

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 70) {
      if (diff > 0 && activeStage < stages.length - 1) { setActiveStage(prev => prev + 1); triggerHaptic(20); }
      else if (diff < 0 && activeStage > 0) { setActiveStage(prev => prev - 1); triggerHaptic(20); }
    }
  };

  return (
    <div className="relative bg-black text-white py-24 md:py-48 px-4 overflow-hidden fade-up">
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-12 items-center">
        <div 
          className="w-full md:col-span-8 relative touch-pan-y"
          onTouchStart={e => touchStart.current = e.touches[0].clientX}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10 shadow-3xl bg-dark">
            {stages.map((stage, idx) => (
              <img key={idx} src={stage.img} alt={stage.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ${activeStage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
            ))}
            <div className="absolute inset-0 border-[15px] md:border-[30px] border-black/20 pointer-events-none" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
              {stages.map((_, i) => <div key={i} className={`h-[1px] transition-all duration-700 ${activeStage === i ? 'w-8 bg-accent' : 'w-2 bg-white/20'}`} />)}
            </div>
          </div>
        </div>

        <div className="w-full md:col-span-4 flex flex-col space-y-12 text-left">
          <div className="hidden md:block space-y-14">
            {stages.map((stage, idx) => (
              <div key={idx} className={`transition-all duration-1000 cursor-pointer ${activeStage === idx ? 'opacity-100 translate-x-6' : 'opacity-10 hover:opacity-30'}`} onClick={() => { setActiveStage(idx); triggerHaptic(); }}>
                <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase block mb-3">0{idx + 1} — {stage.label}</span>
                <h3 className="text-3xl font-serif italic mb-4">{stage.title}</h3>
                {activeStage === idx && <p className="text-sm text-white/40 font-light leading-relaxed animate-slide-right">{stage.desc}</p>}
              </div>
            ))}
          </div>
          <div className="md:hidden text-center min-h-[120px]">
            <span className="text-[10px] text-accent tracking-widest uppercase mb-4 block animate-slide-right">Phase 0{activeStage + 1} // {stages[activeStage].label}</span>
            <h3 className="text-3xl font-serif italic mb-4 animate-slide-right">{stages[activeStage].title}</h3>
            <p className="text-sm text-white/50 animate-slide-right">{stages[activeStage].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * =============================================================================
 * MAIN PAGE ASSEMBLY
 * =============================================================================
 */

const MasterPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const obs = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  const navLinks = [
    { id: 'manifesto', label: 'Философия' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'archive', label: 'Архив' },
    { id: 'pricing', label: 'Инвестиция' }
  ];

  return (
    <div className="bg-dark text-white selection:bg-accent/30 selection:text-white min-h-screen font-sans">
      
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-500 border-b flex items-center ${scrolled ? 'bg-dark/95 border-white/10' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-widest uppercase">VALERY LATYPOV</span>
            <span className="text-accent text-[9px] font-black tracking-[0.2em] uppercase mt-1">Executive Protocol™</span>
          </div>
          <nav className="hidden lg:flex gap-12">
            {navLinks.map(l => <a key={l.id} href={`#${l.id}`} className="text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-6">
            <a href="http://t.me/latypovvalery" className="hidden lg:block border border-accent/40 text-accent px-10 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-accent hover:text-dark transition-all">Telegram</a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 w-8 items-end">
              <div className={`h-0.5 bg-accent transition-all ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`} />
              <div className={`h-0.5 bg-accent transition-all ${isMenuOpen ? 'opacity-0' : 'w-6'}`} />
              <div className={`h-0.5 bg-accent transition-all ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map(l => <a key={l.id} href={`#${l.id}`} onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl hover:text-accent">{l.label}</a>)}
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-50 md:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-center md:text-left">
            <span className="text-accent text-[10px] font-bold tracking-[0.5em] uppercase mb-8 block">Strategic Visual Asset Protocol</span>
            <h1 className="font-serif text-[42px] leading-tight md:text-8xl lg:text-9xl text-white mb-10 tracking-tighter">Ваш имидж — <br/> <span className="gold-gradient-text italic italic-gold-text">актив или пассив.</span></h1>
            <p className="max-w-2xl mb-16 text-lg md:text-2xl text-white/70 font-light leading-relaxed">Executive Protocol™: Создание визуального капитала за 60 минут. Математическая точность образа для тех, кто управляет империями.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="http://t.me/latypovvalery" className="bg-accent text-dark px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl text-center">ЗАБРОНИРОВАТЬ АУДИТ</a>
              <a href="#portfolio" className="border border-white/20 text-white px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center">Портфолио</a>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <SmartGallery id="portfolio" title="Трансформация Статуса" subtitle="The WOW Collection" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

      {/* ZERO FRICTION */}
      <section className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up">
            <span className="text-accent text-[11px] font-black uppercase tracking-widest mb-8 block">Zero Friction Protocol™</span>
            <h2 className="font-serif text-3xl md:text-7xl text-white leading-tight mb-10 italic">Максимальный рычаг при <span className="gold-gradient-text">нулевых усилиях</span></h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">Мы экономим ваше время. Процесс занимает 60 минут. 100% режиссуры на моей команде.</p>
          </div>
          <TransformationMetamorphosis />
        </div>
      </section>

      {/* ARCHIVE */}
      <SmartGallery id="archive" title="Те, кто доверил мне капитал" subtitle="Cultural Code" type="photo" items={AUTHORITY_ARCHIVE} />

      {/* ARTIST MANIFESTO */}
      <section id="manifesto" className="py-24 md:py-48 bg-dark border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group fade-up">
              <div className="absolute -inset-4 border border-accent/20 translate-x-4 translate-y-4 -z-10" />
              <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-3xl">
                <img src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" alt="Latypov" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="fade-up space-y-12">
              <div className="space-y-4">
                <span className="text-accent text-[11px] font-black uppercase tracking-widest block">The Mastermind</span>
                <h2 className="font-serif text-5xl md:text-8xl text-white tracking-tighter">Валерий <br/><span className="gold-gradient-text italic">Латыпов</span></h2>
              </div>
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">Я — «визуальный алхимик». Бэкграунд в квантовой радиофизике позволяет мне конструировать кадр с математической точностью, отсекая лишнее. В моем объективе — те, кто меняет ландшафт реальности.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 p-8 bg-white/[0.02]">
                  <p className="text-accent text-[9px] font-black tracking-widest mb-3">ОПЫТ</p>
                  <p className="text-white font-serif text-xl italic">20 ЛЕТ / FORBES</p>
                </div>
                <div className="border border-white/5 p-8 bg-white/[0.02]">
                  <p className="text-accent text-[9px] font-black tracking-widest mb-3">МЕТОД</p>
                  <p className="text-white font-serif text-xl italic">ZERO FRICTION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <SmartGallery id="authority" title="Слово тех, кто прошел Protocol" subtitle="Social Proof" type="video" items={TESTIMONIALS} />

      {/* FAQ */}
      <section className="py-24 md:py-48 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-24 fade-up">
            <span className="text-accent text-[11px] font-black tracking-[0.5em] uppercase block mb-8">Discovery Phase</span>
            <h2 className="font-serif text-4xl md:text-7xl italic">Вопросы и Ответы</h2>
          </div>
          <div className="space-y-8 fade-up">
            {[
              { q: 'Не будет ли выглядеть искусственно?', a: 'Мы не меняем личность. Мимика и взгляд остаются нетронутыми. AI — это инструмент для безупречной одежды.' },
              { q: 'Насколько это конфиденциально?', a: 'Строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения.' },
              { q: 'Что я теряю, если оставлю как есть?', a: 'Вы теряете рычаг влияния. Статус — это валюта. Несоответствие облика масштабу личности создает скрытое сопротивление.' }
            ].map((f, i) => (
              <div key={i} className="border-b border-white/10 pb-8 group cursor-pointer" onClick={(e) => e.currentTarget.querySelector('p')?.classList.toggle('hidden')}>
                <h4 className="font-serif text-2xl mb-4 group-hover:text-accent transition-colors">{f.q}</h4>
                <p className="text-white/40 font-light leading-relaxed hidden">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK REVERSAL */}
      <section className="py-24 md:py-48 bg-black border-y border-white/5 text-center fade-up">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-5xl md:text-8xl text-white mb-12 tracking-tighter italic">Гарантия Risk Reversal</h2>
          <p className="text-white/70 text-lg md:text-3xl font-light max-w-4xl mx-auto leading-relaxed">«Если результат не отражает ваш истинный масштаб — <br className="hidden md:block"/> оплата не взимается. <span className="text-accent">Я беру риски на себя.</span>»</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 md:py-64 bg-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border border-accent/20 bg-card p-12 md:p-32 text-center relative shadow-3xl">
            <span className="text-accent/50 text-[11px] font-black tracking-[0.5em] uppercase block mb-12">Инвестиция в статус</span>
            <div className="font-serif text-6xl md:text-[100px] text-white gold-gradient-text mb-12">250 000 ₽</div>
            <a href="http://t.me/latypovvalery" className="block w-full max-w-sm mx-auto bg-dark border border-accent/40 text-accent py-8 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all">ЗАБРОНИРОВАТЬ СЛОТ</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-black text-center border-t border-white/5">
        <div className="font-serif text-2xl md:text-5xl tracking-[0.5em] text-white/90 mb-6 uppercase">VALERY LATYPOV</div>
        <div className="text-accent text-[9px] font-black tracking-widest uppercase opacity-80">Executive Protocol™ © 2025</div>
      </footer>
    </div>
  );
};

export default MasterPage;
