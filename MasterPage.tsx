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
          <div className="absolute top-0 right-[-1px] bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden"></div>
          
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

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-4 gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 md:pb-0"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              paddingRight: '40px' 
            }}
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                className="min-w-[78vw] md:min-w-0 snap-center group/card cursor-pointer px-2 md:px-0"
              >
                {type === 'comparison' && <ComparisonCard item={item as ComparisonItem} isLCP={isLCP && index === 0} />}
                {type === 'photo' && <PhotoCard item={item as GalleryItem} isLCP={isLCP && index === 0} />}
                {type === 'video' && <VideoCard item={item as Testimonial} />}
              </div>
            ))}
          </div>

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
  
  // Переключатель для мобилок (toggle) и десктопа (hover)
  const toggleAction = () => setShowBefore(!showBefore);

  return (
    <div 
      className="relative aspect-[3/4] overflow-hidden border border-white/5 bg-black cursor-pointer group/comp"
      onMouseEnter={() => setShowBefore(true)}
      onMouseLeave={() => setShowBefore(false)}
      onClick={toggleAction}
    >
      {/* 1. ИЗОБРАЖЕНИЕ "ПОСЛЕ" (ФИНАЛ) */}
      <img 
        src={item.after} 
        alt={item.title} 
        fetchPriority={isLCP ? "high" : "auto"}
        loading={isLCP ? "eager" : "lazy"}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'opacity-0 scale-110 blur-md' : 'opacity-100 scale-100'}`} 
      />

      {/* 2. ИЗОБРАЖЕНИЕ "ДО" (ИСХОДНИК) */}
      <img 
        src={item.before} 
        alt={`${item.title} Raw`} 
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
      />

      {/* 3. ВИЗУАЛЬНЫЙ ПОДСКАЗЧИК (HINT) */}
      <div className="absolute top-6 right-6 z-20">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-500 ${showBefore ? 'bg-accent border-accent text-dark' : 'bg-black/40 border-white/20 text-white'}`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${showBefore ? 'bg-dark' : 'bg-accent'}`}></span>
          <span className="text-[9px] font-black uppercase tracking-widest">
            {showBefore ? 'ORIGINAL RAW' : 'TAP FOR BEFORE'}
          </span>
        </div>
      </div>

      {/* 4. ТЕКСТОВЫЙ ГРАДИЕНТ (СКРЫВАЕТСЯ ПРИ ПРОСМОТРЕ "ДО") */}
      <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-700 ${showBefore ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="text-accent text-[10px] uppercase font-bold tracking-[0.3em] block mb-2">{item.category}</span>
        <h4 className="font-serif text-2xl text-white tracking-tight leading-none">{item.title}</h4>
        <div className="mt-4 flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest md:hidden">
          <span>Сравнить результат</span>
          <span className="animate-bounce-x">→</span>
        </div>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ item: GalleryItem; isLCP?: boolean }> = ({ item, isLCP }) => (
  <div className="space-y-6">
    <div className="aspect-[3/4] overflow-hidden border border-white/5 bg-black">
      <img src={item.image} alt={item.name} fetchPriority={isLCP ? "high" : "auto"} loading={isLCP ? "eager" : "lazy"} className="w-full h-full object-cover grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000" />
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
 * SECTION: THE ARTIST (BIO & LOGIC)
 * =============================================================================
 */
const ArtistProfile: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 md:py-48 bg-[#0a0a0a] border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-[15vw] font-serif italic text-white/[0.02] pointer-events-none whitespace-nowrap">
        Visionary Excellence
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative group fade-up">
            <div className="absolute -inset-4 border border-accent/20 translate-x-4 translate-y-4 -z-10"></div>
            <div className="aspect-[4/5] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-3xl">
              <img src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" alt="Valery Latypov" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" loading="lazy" />
            </div>
          </div>
          <div className="fade-up space-y-10">
            <div className="space-y-4">
              <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block">The Mastermind</span>
              <h2 className="font-serif text-5xl md:text-8xl text-white tracking-tighter leading-tight">Валерий <br/><span className="italic text-accent italic-gold-text">Латыпов</span></h2>
            </div>
            <div className="space-y-6 text-white/70 text-lg md:text-xl font-light leading-relaxed">
              <p>Я — <span className="text-white font-medium italic">«визуальный алхимик»</span>. Бэкграунд в квантовой радиофизике (МИФИ) позволяет мне конструировать кадр с математической точностью, отсекая лишнее.</p>
              <p>В моем объективе — те, кто меняет ландшафт реальности: от <span className="text-white border-b border-accent/30 font-medium">Ирины Хакамады и Дмитрия Пескова</span> до Сьюзен Сарандон и Арнольда Шварценеггера.</p>
              <p>Официальный фотограф <span className="text-white">Дубай Опера</span>. Мои работы — это не просто портреты, это визуальный код, который считывается как «Свой» в высших эшелонах бизнеса.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[{ label: 'Публикации', val: 'FORBES / VOGUE' }, { label: 'Метод', val: 'ZERO FRICTION' }].map((stat, i) => (
                <div key={i} className="border border-white/5 p-6 bg-white/[0.02]">
                  <p className="text-accent text-[8px] uppercase tracking-widest mb-2 font-black">{stat.label}</p>
                  <p className="text-white font-serif text-lg italic">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * =============================================================================
 * ZERO FRICTION: TRANSFORMATION METAMORPHOSIS
 * =============================================================================
 */

const TransformationSequence: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { 
      id: 'loro', 
      label: 'ASSET', 
      title: 'Loro Piana', 
      desc: 'Высший уровень визуального капитала. Бескомпромиссный статус.',
      img: TRANSFORMATION_DATA[2].subPhases?.[1].image || ''
    },
    { 
      id: 'brioni', 
      label: 'STATUS', 
      title: 'Brioni', 
      desc: 'Доминантная уверенность. Сила, которую не нужно доказывать.',
      img: TRANSFORMATION_DATA[2].subPhases?.[0].image || ''
    },
    { 
      id: 'life', 
      label: 'ORIGIN', 
      title: 'В жизни', 
      desc: 'Точка входа. То, как вас видит мир без вмешательства протокола.',
      img: TRANSFORMATION_DATA[0].image 
    },
    { 
      id: 'protocol', 
      label: 'PROCESS', 
      title: 'Протокол', 
      desc: 'Инженерная режиссура кадра. Механика создания образа.',
      img: TRANSFORMATION_DATA[1].image 
    }
  ];

  return (
    <div className="relative bg-black text-white py-12 md:py-24 fade-up">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* ЛЕВАЯ ЧАСТЬ: Навигация и Смыслы */}
        <div className="md:col-span-4 space-y-12 order-2 md:order-1 text-left">
          {stages.map((stage, idx) => (
            <div 
              key={stage.id}
              className={`transition-all duration-700 cursor-pointer group ${activeStage === idx ? 'opacity-100 translate-x-4' : 'opacity-20 translate-x-0 hover:opacity-40'}`}
              onClick={() => setActiveStage(idx)}
            >
              <span className="text-[10px] font-black tracking-[0.5em] text-accent block mb-2">
                0{idx + 1} — {stage.label}
              </span>
              <h3 className="text-3xl font-serif italic mb-4 group-hover:text-accent transition-colors">{stage.title}</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed max-w-xs">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Фото-холст */}
        <div className="md:col-span-8 relative order-1 md:order-2">
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10 shadow-3xl bg-dark">
            {stages.map((stage, idx) => (
              <img
                key={stage.id}
                src={stage.img}
                alt={stage.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
                  activeStage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            ))}
            
            {/* Декоративная рамка (Corner Accents) */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent/40" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent/40" />
          </div>

          {/* Индикатор "пленки" снизу */}
          <div className="absolute -bottom-8 left-0 flex gap-1 w-full h-[1px] bg-white/10">
            <div 
              className="h-full bg-accent transition-all duration-700 shadow-[0_0_10px_#C5A059]" 
              style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const MasterPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="flex items-center gap-4">
            <a href="http://t.me/latypovvalery" className="hidden lg:block border border-accent/40 text-accent px-12 py-3.5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-accent hover:text-dark transition-all">Telegram Direct</a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 w-8 items-end group z-[1200]">
              <div className={`h-0.5 bg-accent transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></div>
              <div className={`h-0.5 bg-accent transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></div>
              <div className={`h-0.5 bg-accent transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-2xl transition-all duration-700 flex flex-col items-center justify-center gap-12 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {['manifesto', 'portfolio', 'archive', 'authority', 'pricing'].map((id, i) => (
          <a key={id} href={`#${id}`} onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl text-white hover:text-accent transition-colors">
            {['Философия', 'Результаты', 'Портфолио', 'Рекомендации', 'Инвестиция'][i]}
          </a>
        ))}
        <a href="http://t.me/latypovvalery" className="mt-8 border border-accent text-accent px-14 py-6 text-sm font-black tracking-[4px] uppercase">Telegram Direct</a>
      </div>

      {/* 2. HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-60 md:opacity-80" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-center lg:text-left">
            <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">STRATEGIC VISUAL ASSET PROTOCOL</span>
            <h1 className="font-serif text-[42px] leading-[1.05] md:text-8xl lg:text-9xl text-white mb-10 tracking-tight">Ваш имидж — это <br className="hidden md:block" /><span className="text-accent italic font-light italic-gold-text">актив или пассив.</span></h1>
            <p className="max-w-2xl mb-16 text-[16px] md:text-2xl text-white/70 font-light leading-relaxed mx-auto lg:mx-0">Executive Protocol™: Создание визуального капитала за 60 минут. Математическая точность образа для тех, кто управляет империями.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a href="http://t.me/latypovvalery" className="bg-accent text-dark px-12 py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white transition-all shadow-xl">ЗАБРОНИРОВАТЬ АУДИТ</a>
              <a href="#portfolio" className="border border-white/20 text-white px-12 py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white/5 transition-all">Портфолио</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE */}
      <SmartGallery id="portfolio" title="Трансформация Статуса" subtitle="The WOW Collection" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

      {/* 4. ZERO FRICTION PROTOCOL */}
      <section className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up">
            <span className="text-accent text-[11px] font-extrabold uppercase tracking-[0.5em] mb-8 block">Zero Friction Protocol™</span>
            <h2 className="font-serif text-3xl md:text-7xl text-white leading-[1.1] mb-10 tracking-tight">Максимальный рычаг при <span className="italic text-accent">нулевых усилиях</span></h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">Мы экономим ваше время. Процесс занимает 60 минут. 100% режиссуры на моей команде.</p>
          </div>

          <TransformationSequence />
        </div>
      </section>

      {/* 5. ARCHIVE */}
      <SmartGallery id="archive" title="Те, кто доверил мне капитал" subtitle="Cultural Code" type="photo" items={AUTHORITY_ARCHIVE} />

      {/* 6. ARTIST PROFILE */}
      <ArtistProfile />

      {/* 7. TESTIMONIALS */}
      <SmartGallery id="authority" title="Слово тех, кто прошел Protocol" subtitle="Social Proof" type="video" items={TESTIMONIALS} />

      {/* 8. FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center fade-up">
            <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-6">Discovery phase</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight italic">Вопросы и Ответы</h2>
          </div>
          <div className="max-w-4xl mx-auto fade-up">
            {['Не будет ли портрет выглядеть искусственно?', 'Насколько это конфиденциально?', 'Что если я не умею позировать?', 'Почему готовность всего 24 часа?', 'Что я теряю, если оставлю текущий имидж?'].map((q, i) => (
              <div key={i} className="border-b border-white/10">
                <button onClick={(e) => { const el = e.currentTarget.nextElementSibling; el?.classList.toggle('max-h-0'); el?.classList.toggle('max-h-[500px]'); el?.classList.toggle('opacity-0'); el?.classList.toggle('opacity-100'); }} className="w-full py-8 flex justify-between items-center text-left group">
                  <span className="font-serif text-xl md:text-2xl text-white group-hover:text-accent transition-colors">{q}</span>
                  <span className="text-2xl text-white/30 transition-transform">+</span>
                </button>
                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-700">
                  <p className="text-white/50 text-lg font-light leading-relaxed max-w-3xl pb-8">
                    {i === 0 && "Мы не меняем вашу личность. Глаза и мимика остаются нетронутыми. AI — это инструмент для безупречной одежды."}
                    {i === 1 && "Мы подписываем строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения."}
                    {i === 2 && "Вам и не нужно. Моя работа — режиссура состояния. Мы просто общаемся в комфортном ритме."}
                    {i === 3 && "В большом бизнесе время — самый дорогой ресурс. Моя команда работает круглосуточно, чтобы вы получили результат завтра."}
                    {i === 4 && "Вы теряете рычаг влияния. Статус — это валюта. Несоответствие облика масштабу достижений создает скрытое сопротивление при сделках."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GUARANTEE */}
      <section className="py-24 bg-black border-y border-white/5 text-center fade-up">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 tracking-tighter">Безусловный Протокол Защиты</h2>
          <p className="text-white/70 text-lg md:text-2xl font-light max-w-4xl mx-auto">Ваш имидж — это Visual Asset. Если результат не отражает ваш истинный масштаб — оплата не взимается. Я беру риски на себя.</p>
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="pricing" className="py-24 md:py-48 bg-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border border-accent/30 bg-card p-8 md:p-24 text-center relative shadow-3xl">
            <span className="text-accent/50 text-[11px] font-black tracking-[0.6em] uppercase block mb-8">Инвестиция в статус</span>
            <div className="font-serif text-6xl md:text-[80px] text-white gold-gradient-text mb-6">250 000 ₽</div>
            <a href="http://t.me/latypovvalery" className="block w-full max-w-sm mx-auto bg-[#1c1c1c] text-accent border border-accent/40 py-7 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-dark transition-all">ЗАБРОНИРОВАТЬ СЛОТ</a>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="py-24 bg-black text-center border-t border-white/5">
        <div className="font-serif text-2xl md:text-5xl tracking-[0.5em] text-white/90 mb-4 uppercase">VALERY LATYPOV</div>
        <div className="text-accent text-xs font-black tracking-[0.4em] uppercase opacity-80">Executive Protocol™</div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 w-full p-4 z-[2000] lg:hidden transition-transform duration-500 ${showMobileCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <a href="http://t.me/latypovvalery" className="block w-full bg-accent text-dark font-black uppercase tracking-[0.3em] text-[12px] py-5 text-center shadow-2xl active:scale-95 transition-transform">ЗАБРОНИРОВАТЬ АУДИТ</a>
      </div>
    </div>
  );
};

export default MasterPage;
