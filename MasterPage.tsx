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
              <div key={index} className="min-w-[85vw] md:min-w-0 snap-center group/card cursor-pointer">
                {type === 'comparison' && <ComparisonCard item={item as ComparisonItem} isLCP={isLCP && index === 0} />}
                {type === 'photo' && <PhotoCard item={item as GalleryItem} isLCP={isLCP && index === 0} />}
                {type === 'video' && <VideoCard item={item as Testimonial} />}
              </div>
            ))}
          </div>

          <div className="md:hidden h-[1px] w-full bg-white/10 relative mt-4">
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
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black to-transparent">
        <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] mb-1 block">{item.category}</span>
        <h4 className="font-serif text-2xl text-white">{item.title}</h4>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ item: GalleryItem; isLCP?: boolean }> = ({ item, isLCP }) => (
  <div className="space-y-6">
    <div className="aspect-[3/4] overflow-hidden border border-white/5 grayscale group-hover/card:grayscale-0 transition-all duration-1000 bg-black">
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
      <iframe src={item.videoUrl} className="w-full h-full border-0" title={item.name} allowFullScreen></iframe>
    </div>
    <div className="space-y-2">
      <div className="font-serif text-xl text-white leading-tight">{item.name}</div>
      <div className="text-white/40 text-[9px] uppercase font-bold tracking-widest leading-relaxed whitespace-pre-line">{item.description}</div>
    </div>
  </div>
);

/**
 * =============================================================================
 * SECTION: TRANSFORMATION (FORBES GALLERY)
 * =============================================================================
 */

const TransformationMetamorphosis: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const triggerHaptic = (dur = 15) => { if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(dur); };

  const stages = [
    { label: 'ASSET', title: 'Loro Piana', desc: 'Бескомпромиссный статус. Высший уровень визуального капитала.', img: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' },
    { label: 'STATUS', title: 'Brioni', desc: 'Доминантная уверенность. Сила, которую не нужно доказывать.', img: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
    { label: 'ORIGIN', title: 'В жизни', desc: 'Точка входа. То, как вас видит мир без вмешательства протокола.', img: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg' },
    { label: 'PROCESS', title: 'Протокол', desc: '60 минут инженерной режиссуры. Механика создания образа.', img: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div className="relative bg-black text-white px-0 md:px-4 overflow-hidden fade-up">
      {/* DESKTOP VIEW */}
      <div className="hidden md:grid max-w-6xl mx-auto md:grid-cols-12 gap-12 items-center py-24 md:py-48">
        <div className="w-full md:col-span-8 relative">
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10 shadow-3xl bg-dark">
            {stages.map((stage, idx) => (
              <img key={idx} src={stage.img} alt={stage.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ${activeStage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
            ))}
            <div className="absolute inset-0 border-[30px] border-black/20 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:col-span-4 flex flex-col space-y-12 text-left">
          <div className="space-y-14">
            {stages.map((stage, idx) => (
              <div key={idx} className={`transition-all duration-1000 cursor-pointer ${activeStage === idx ? 'opacity-100 translate-x-6' : 'opacity-10 hover:opacity-30'}`} onClick={() => { setActiveStage(idx); triggerHaptic(); }}>
                <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase block mb-3">0{idx + 1} — {stage.label}</span>
                <h3 className="text-3xl font-serif italic mb-4">{stage.title}</h3>
                {activeStage === idx && <p className="text-sm text-white/40 font-light leading-relaxed animate-slide-right">{stage.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE GALLERY VIEW */}
      <div className="md:hidden">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6"
        >
          {stages.map((stage, idx) => (
            <div key={idx} className="min-w-[85vw] snap-center space-y-6">
              <div className="aspect-[3/4] overflow-hidden border border-white/5 bg-black relative">
                <img src={stage.img} alt={stage.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase tracking-widest text-accent">
                    PHASE 0{idx + 1}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-left">
                <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] block">{stage.label}</span>
                <h4 className="font-serif text-2xl text-white">{stage.title}</h4>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS BAR (Mobile only) */}
        <div className="px-6 pb-24">
          <div className="h-[1px] w-full bg-white/10 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* PROGRESS INDICATOR (Desktop only) */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <div 
          className="h-full bg-accent transition-all duration-1000 shadow-[0_0_10px_#C5A059]" 
          style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }} 
        />
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
    { id: 'manifesto', label: 'Метод' },
    { id: 'global-stage', label: 'Global Stage' },
    { id: 'archive', label: 'Портфолио' },
    { id: 'portfolio', label: 'Результаты' },
    { id: 'pricing', label: 'Инвестиция' }
  ];

  return (
    <div className="bg-dark text-white selection:bg-accent/30 selection:text-white min-h-screen font-sans">
      
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-700 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          
          {/* LOGO */}
          <div className="flex flex-col items-start leading-none group cursor-pointer relative z-[1200]">
            <div className="font-serif text-[15px] md:text-xl font-semibold text-white tracking-[3px] uppercase whitespace-nowrap group-hover:text-accent transition-colors duration-500">VALERY LATYPOV</div>
            <div className="text-accent uppercase tracking-[1px] text-[10px] md:text-xs font-black mt-1 translate-y-[2px]">Executive Protocol™</div>
          </div>
          
          {/* NAVIGATION */}
          <nav className="hidden lg:flex gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[10px] uppercase tracking-[3px] font-bold transition-all duration-300 text-white/60 hover:text-accent">
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* CTA BUTTONS (Desktop) */}
          <div className="hidden lg:flex gap-4">
            <a href="tel:+79852246789" className="bg-accent text-dark px-10 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-white transition-all duration-500">
              📞 ПОЗВОНИТЬ
            </a>
            <a href="http://t.me/latypovvalery" target="_blank" className="border border-accent/40 text-accent px-8 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-accent hover:text-dark transition-all duration-500">
              TELEGRAM
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 w-8 items-end group relative z-[1300]">
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4 group-hover:w-8'}`}></div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {navLinks.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl hover:text-accent transition-colors">
            {l.label}
          </a>
        ))}
        <div className="flex flex-col gap-4 mt-10 w-full px-6 items-center">
          <a href="tel:+79852246789" className="w-full text-center bg-accent text-dark py-5 text-sm font-black tracking-widest uppercase shadow-2xl">
            📞 ПОЗВОНИТЬ: +7 985 224-67-89
          </a>
          <a href="http://t.me/latypovvalery" target="_blank" className="w-full text-center border border-accent/40 text-accent py-5 text-sm font-black tracking-widest uppercase">
            Telegram Direct
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark" />
        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-32 text-left">
          <div className="max-w-4xl">
            <span className="text-accent text-[10px] font-bold tracking-[6px] uppercase border-l border-accent/60 pl-6 mb-10 block leading-none">
              ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™
            </span>
            <h1 className="font-serif text-[48px] leading-[1] md:text-8xl lg:text-9xl text-white mb-10 tracking-tight">
              Ваш имидж — это <br className="hidden md:block" />
              <span className="text-accent italic font-light gold-gradient-text">актив или пассив.</span> <br className="hidden md:block" />
              Начните извлекать прибыль.
            </h1>
            <p className="max-w-2xl mb-16 text-lg md:text-2xl text-white/70 font-light leading-relaxed">
              <span className="text-accent font-medium">Executive Protocol™:</span> Создание визуального капитала уровня Forbes за 60 минут. Математическая точность образа от физика.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="http://t.me/latypovvalery" className="bg-accent text-dark px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl text-center">ЗАБРОНИРОВАТЬ АУДИТ</a>
              <a href="#archive" className="border border-white/20 text-white px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center">Портфолио</a>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (WOW GALLERY) */}
      <SmartGallery id="archive" title="Трансформация Статуса" subtitle="The WOW Collection" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

      {/* МЕТОД (MANIFESTO & METAMORPHOSIS) */}
      <section id="manifesto" className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
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
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed text-left">Я — «визуальный алхимик». Бэкграунд в квантовой радиофизике позволяет мне конструировать кадр с математической точностью, отсекая лишнее. В моем объективе — те, кто меняет ландшафт реальности.</p>
              
              <div className="bg-accent/5 border-l-2 border-accent p-8 my-10 fade-up">
                <p className="text-accent font-serif text-2xl italic mb-4">«Протокол Безупречности»</p>
                <p className="text-white/80 text-lg text-left">
                  Вы не тратите время на подбор стилиста, локаций, команды. Я прилетаю к вам. Мы работаем 60 минут. Через 24 часа вы получаете готовые активы уровня мировых обложек — <span className="text-white font-medium">без суеты, без потери времени, без компромиссов</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 p-8 bg-white/[0.02]">
                  <p className="text-accent text-[9px] font-black tracking-widest mb-3">ОПЫТ</p>
                  <p className="text-white font-serif text-xl italic">20 ЛЕТ / FORBES</p>
                </div>
                <div className="border border-white/5 p-8 bg-white/[0.02]">
                  <p className="text-accent text-[9px] font-black tracking-widest mb-3">МЕТОД</p>
                  <p className="text-white font-serif text-xl italic">EXEC PROTOCOL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up px-6">
              <span className="text-accent text-[11px] font-black uppercase tracking-widest mb-8 block">ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™</span>
              <h2 className="font-serif text-[42px] md:text-7xl text-white leading-tight mb-10 italic">Визуальный капитал <span className="gold-gradient-text">уровня Forbes</span></h2>
              <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">Без стилистов, без суеты, без компромиссов.</p>
            </div>
            <TransformationMetamorphosis />
          </div>
        </div>
      </section>

      {/* GLOBAL STAGE (ARCHIVE) */}
      <SmartGallery id="global-stage" title="Те, кто доверил мне капитал" subtitle="Cultural Code" type="photo" items={AUTHORITY_ARCHIVE} />

      {/* РЕЗУЛЬТАТЫ (TESTIMONIALS) */}
      <SmartGallery id="portfolio" title="Доверие тех, кто выбрал меня" subtitle="Social Proof" type="video" items={TESTIMONIALS} />

      {/* FAQ */}
      <section className="py-24 md:py-48 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-24 fade-up">
            <span className="text-accent text-[11px] font-black tracking-[0.5em] uppercase block mb-8">Discovery Phase</span>
            <h2 className="font-serif text-4xl md:text-7xl italic">Вопросы и Ответы</h2>
          </div>
          <div className="space-y-8 fade-up text-left">
            {[
              { q: 'Не будет ли выглядеть искусственно?', a: 'Мы не меняем личность. Мимика и взгляд остаются нетронутыми. AI — это инструмент для безупречной одежды.' },
              { q: 'Насколько это конфиденциально?', a: 'Строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения project.' },
              { q: 'Что я теряю, если оставлю как есть?', a: 'Вы теряете рычаг влияния. Статус — это валюта. Несоответствие облика масштабу личности создает скрытое сопротивление.' }
            ].map((f, i) => (
              <div key={i} className="border-b border-white/10 pb-8 group cursor-pointer" onClick={(e) => e.currentTarget.querySelector('p')?.classList.toggle('hidden')}>
                <h4 className="font-serif text-2xl mb-4 group-hover:text-accent transition-colors">{f.q}</h4>
                <p className="text-white/40 font-light leading-relaxed hidden mt-4">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK REVERSAL */}
      <section className="py-24 md:py-48 bg-black border-y border-white/5 text-center fade-up">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-7xl text-white mb-12 tracking-tighter italic gold-gradient-text">Я беру весь финансовый риск на себя</h2>
          <p className="text-white/70 text-lg md:text-3xl font-light max-w-5xl mx-auto leading-relaxed">
            На этапе превью (первые 3–5 кадров) вы оцениваете результат. <br className="hidden md:block"/>
            Если вы не видите в них свой масштаб — <span className="text-accent">оплата не взимается.</span> <br className="hidden md:block"/>
            Возврат 100%.
          </p>
        </div>
      </section>

      {/* ИНВЕСТИЦИЯ (PRICING) */}
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