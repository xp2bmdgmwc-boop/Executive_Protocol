import React, { useState, useEffect, useRef } from 'react';

/**
 * =============================================================================
 * ТИПЫ ДАННЫХ
 * =============================================================================
 */

export interface GalleryItem {
  id: number;
  name: string;
  status: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
}

export interface ComparisonItem {
  id: number;
  title: string;
  category: string;
  before: string;
  after: string;
}

/**
 * =============================================================================
 * КОНСТАНТЫ И КОЛЛЕКЦИИ
 * =============================================================================
 */

const COMPARISON_COLLECTION: ComparisonItem[] = [
  {
    id: 1,
    title: "Chanel Heritage",
    category: "ЛЮКС-ПОРТРЕТ",
    before: "https://static.tildacdn.com/tild3431-6234-4963-a633-663036666465/01f_shoot.jpg",
    after: "https://static.tildacdn.com/tild3038-3634-4939-a564-626634393139/01f_executive_image.jpg"
  },
  {
    id: 2,
    title: "Editorial Presence",
    category: "КОРПОРАТИВНЫЙ ЛИДЕР",
    before: "https://static.tildacdn.com/tild3230-3233-4234-a330-643962316630/02f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg"
  },
  {
    id: 3,
    title: "Global Executive",
    category: "ОБРАЗ ВЛАСТИ",
    before: "https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg"
  },
  {
    id: 4,
    title: "Pinstripe Authority",
    category: "CEO МАНИФЕСТ",
    before: "https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg",
    after: "https://static.tildacdn.com/tild3065-3539-4135-a636-313232303362/04m_executive_image1.jpg"
  }
];

const AUTHORITY_ARCHIVE: GalleryItem[] = [
  { id: 1, name: 'Ирина Хакамада', status: 'Символ лидерства', image: 'https://static.tildacdn.com/tild6336-6461-4239-a533-636461316432/_MG_4315.jpg' },
  { id: 2, name: 'Михаил Федоренко', status: 'Госсоветник 2 класса', image: 'https://static.tildacdn.com/tild3065-6262-4766-b635-353233626138/IMG_4309-Edit.jpg' },
  { id: 3, name: 'Аделия Петросян', status: 'Чемпионка РФ', image: 'https://static.tildacdn.com/tild3436-3831-4433-b630-313939653736/IMG_3426-Edit.jpg' },
  { id: 4, name: 'Francisco Oliveira', status: 'Владелец Guru Canggu', image: 'https://static.tildacdn.com/tild3038-3566-4338-a434-333236653135/IMG_0549.jpeg' }
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ирина Хакамада', description: 'Бизнес-спикер, \nпубличный деятель.', videoUrl: 'https://rutube.ru/play/embed/ef3ddf744edc99e9d1dbeb3f92540683' },
  { id: 2, name: 'Олег Конников', description: 'Звездный стоматолог, \nэксперт федеральных ТВ-проектов.', videoUrl: 'https://rutube.ru/play/embed/ffb709841bf1ffda248861c8f9c5f41d' },
  { id: 3, name: 'Lex Borealis', description: 'Международные юристы: \nЛондон, Дубай, Москва.', videoUrl: 'https://rutube.ru/play/embed/9ee74e5c2e6ddeb2d0bb97e257cae03b' },
  { id: 4, name: 'Роман Тарасенко', description: 'Маркетолог №1, стратег, \nавтор бестселлеров.', videoUrl: 'https://rutube.ru/play/embed/28c6c2f35ca1d859ce6a037c859a6e26' }
];

/**
 * =============================================================================
 * ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ГАЛЕРЕИ
 * =============================================================================
 */

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
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black to-transparent text-left">
        <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] mb-1 block">{item.category}</span>
        <h4 className="font-serif text-2xl text-white">{item.title}</h4>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ item: GalleryItem; isLCP?: boolean }> = ({ item, isLCP }) => (
  <div className="space-y-6 text-left">
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
  <div className="bg-card border border-white/5 p-6 md:p-8 hover:border-accent/30 transition-all text-left">
    <div className="aspect-[9/16] bg-black mb-6 border border-white/10 overflow-hidden shadow-2xl">
      <iframe src={item.videoUrl} className="w-full h-full border-0" title={item.name} allowFullScreen></iframe>
    </div>
    <div className="space-y-2">
      <div className="font-serif text-xl text-white leading-tight">{item.name}</div>
      <div className="text-white/40 text-[9px] uppercase font-bold tracking-widest leading-relaxed whitespace-pre-line">{item.description}</div>
    </div>
  </div>
);

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
        <div className="max-w-4xl mb-16 md:mb-28 fade-up text-left">
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

/**
 * =============================================================================
 * SECTION: METAMORPHOSIS (720px Height)
 * =============================================================================
 */

const TransformationMetamorphosis: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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
      <div className="hidden md:grid max-w-6xl mx-auto md:grid-cols-12 gap-12 items-center py-24 md:py-32">
        {/* Fixed 720px Height Block */}
        <div className="w-full md:col-span-7 lg:col-span-8 relative">
          <div className="relative md:h-[720px] overflow-hidden border border-white/10 shadow-3xl bg-dark">
            {stages.map((stage, idx) => (
              <img 
                key={idx} 
                src={stage.img} 
                alt={stage.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ${activeStage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
              />
            ))}
            <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:col-span-5 lg:col-span-4 flex flex-col justify-center space-y-10 text-left md:h-[720px]">
          <div className="space-y-10">
            {stages.map((stage, idx) => (
              <div 
                key={idx} 
                className={`transition-all duration-700 cursor-pointer group ${activeStage === idx ? 'opacity-100 translate-x-4' : 'opacity-20 hover:opacity-50'}`} 
                onClick={() => setActiveStage(idx)}
              >
                <span className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase block mb-2 group-hover:translate-x-1 transition-transform">
                  0{idx + 1} — {stage.label}
                </span>
                <h3 className="text-2xl lg:text-3xl font-serif italic mb-3">{stage.title}</h3>
                {activeStage === idx && (
                  <p className="text-sm text-white/40 font-light leading-relaxed animate-slide-right max-w-[280px]">
                    {stage.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE GALLERY */}
      <div className="md:hidden">
        <div ref={scrollRef} onScroll={handleScroll} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6">
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
        <div className="px-6 pb-24"><div className="h-[1px] w-full bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>
      </div>
    </div>
  );
};

/**
 * =============================================================================
 * ГЛАВНАЯ СБОРКА MASTER PAGE
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
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-700 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-2xl' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          
          <div className="flex flex-col items-start leading-none group cursor-pointer relative z-[1200]">
            <div className="font-serif text-[15px] md:text-xl font-semibold text-white tracking-[3px] uppercase group-hover:text-accent transition-colors">VALERY LATYPOV</div>
            <div className="text-accent uppercase tracking-[1px] text-[10px] md:text-xs font-black mt-1">Executive Protocol™</div>
          </div>
          
          <nav className="hidden lg:flex gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[10px] uppercase tracking-[3px] font-bold text-white/60 hover:text-accent transition-all">
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex gap-4">
            <a href="tel:+79852246789" className="bg-accent text-dark px-10 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-white transition-all">
              📞 ПОЗВОНИТЬ
            </a>
          </div>

          {/* HAMBURGER TO CROSS (ANIMATED) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden relative z-[1300] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
          >
            <span className={`block h-[2px] bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-8 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
            <span className={`block h-[2px] w-8 bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-[2px] bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[8px]' : 'w-8'}`}></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {navLinks.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl text-white hover:text-accent transition-colors">
            {l.label}
          </a>
        ))}
        <div className="flex flex-col gap-4 mt-10 w-full px-6 items-center">
          <a href="tel:+79852246789" className="w-full text-center bg-accent text-dark py-5 text-sm font-black tracking-widest uppercase shadow-2xl">
            📞 ПОЗВОНИТЬ: +7 985 224-67-89
          </a>
        </div>
      </div>

      {/* MAIN SECTIONS */}
      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark" />
          <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-32 text-left">
            <div className="max-w-4xl">
              <span className="text-accent text-[10px] font-bold tracking-[6px] uppercase border-l border-accent/60 pl-6 mb-10 block leading-none">ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™</span>
              <h1 className="font-serif text-[48px] leading-[1] md:text-8xl lg:text-9xl text-white mb-10 tracking-tight">Ваш имидж — это <br className="hidden md:block" /><span className="text-accent italic font-light gold-gradient-text">актив или пассив?</span> <br className="hidden md:block" />Начните извлекать прибыль.</h1>
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

        {/* WOW COLLECTION */}
        <SmartGallery id="archive" title="Трансформация Статуса" subtitle="The WOW Collection" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

        {/* ABOUT */}
        <section className="py-24 md:py-40 bg-[#0a0a0a] border-b border-white/5 font-sans" id="about">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start text-left">
              <div className="w-full lg:w-[38%] fade-up">
                <div className="relative group">
                  <div className="absolute -inset-4 border border-white/5 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
                  <div className="aspect-[4/5] overflow-hidden bg-black/40 border border-white/10 shadow-3xl"><img src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" alt="Latypov" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"/></div>
                </div>
              </div>
              <div className="w-full lg:w-[55%] fade-up delay-200">
                <div className="inline-flex items-center gap-4 mb-8"><span className="h-[1px] w-8 bg-accent/40"></span><span className="text-accent uppercase tracking-[6px] text-[10px] font-extrabold">20 лет опыта</span></div>
                <h2 className="font-serif text-[38px] md:text-[56px] text-white leading-[1.1] mb-10 tracking-tight">Я снимаю тех, чье время стоит <span className="italic">дороже денег.</span></h2>
                <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl"><p>Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения. Архитекторы реальностей, для которых имидж — это не картинка, а стратегический актив.</p><p><strong className="text-white font-medium">Я работал в Белом Доме (Москва)</strong>, снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* METAMORPHOSIS SECTION */}
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

        {/* GLOBAL STAGE */}
        <SmartGallery id="global-stage" title="Те, кто доверил мне капитал" subtitle="Cultural Code" type="photo" items={AUTHORITY_ARCHIVE} />

        {/* SOCIAL PROOF */}
        <SmartGallery id="portfolio" title="Доверие тех, кто выбрал меня" subtitle="Social Proof" type="video" items={TESTIMONIALS} />

        {/* FAQ */}
        <section className="py-24 md:py-32 bg-dark" id="faq">
          <div className="container mx-auto px-6">
            <div className="mb-16 md:mb-24 text-center fade-up">
              <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-6">Discovery phase</span>
              <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight italic">Вопросы и Ответы</h2>
            </div>
            <div className="max-w-4xl mx-auto fade-up space-y-4">
              {[
                { q: "Не будет ли портрет выглядеть искусственно?", a: "Мы не меняем вашу личность. Глаза, мимика и взгляд остаются нетронутыми. AI используется только как инструмент для создания безупречной одежды." },
                { q: "Насколько это конфиденциально?", a: "Мы подписываем строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения проекта." },
                { q: "Что если я не умею позировать?", a: "Вам и не нужно. Моя работа — режиссура состояния. Мы просто общаемся в комфортном ритме, пока я фиксирую вашу естественную харизму." }
              ].map((item, i) => (
                <div key={i} className="border-b border-white/10 pb-4 text-left">
                  <h4 className="font-serif text-2xl text-white mb-4 italic">{item.q}</h4>
                  <p className="text-white/40 text-lg font-light leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 fade-up">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent text-[11px] font-black uppercase tracking-[5px] mb-4 block">Безусловная гарантия</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 italic">Risk Reversal</h2>
            <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic">«Если на этапе превью вы не увидите масштаб своей личности — проект останавливается, оплата не взимается. Я беру все риски на себя.»</p>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-32 md:py-64 bg-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto border border-accent/20 bg-card p-12 md:p-32 text-center relative shadow-3xl">
              <span className="text-accent/50 text-[11px] font-black tracking-[0.5em] uppercase block mb-12">Инвестиция в статус</span>
              <div className="font-serif text-6xl md:text-[100px] text-white gold-gradient-text mb-12">250 000 ₽</div>
              <a href="http://t.me/latypovvalery" target="_blank" className="block w-full max-w-sm mx-auto bg-dark border border-accent/40 text-accent py-8 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all">ЗАБРОНИРОВАТЬ СЛОТ</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 bg-black text-center border-t border-white/5">
        <div className="font-serif text-2xl md:text-5xl tracking-[0.5em] text-white/90 mb-6 uppercase">VALERY LATYPOV</div>
        <div className="text-accent text-[9px] font-black tracking-widest uppercase opacity-80">Executive Protocol™ © 2025</div>
      </footer>
    </div>
  );
};

export default MasterPage;