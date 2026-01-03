import React, { useState, useEffect, useRef } from 'react';

/**
 * =============================================================================
 * TYPES & INTERFACES
 * =============================================================================
 */

interface TransformationPhase {
  id: string;
  label: string;
  image: string;
  subPhases?: { id: string; label: string; image: string }[];
}

interface GalleryItem {
  id: number;
  name: string;
  status: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
}

interface ComparisonItem {
  id: number;
  title: string;
  category: string;
  before: string;
  after: string;
}

/**
 * =============================================================================
 * CONSTANTS & DATA
 * =============================================================================
 */

const TRANSFORMATION_DATA: TransformationPhase[] = [
  {
    id: '1',
    label: 'Фаза 01. <br/> Реальная жизнь',
    image: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg'
  },
  {
    id: '2',
    label: 'Фаза 02. <br/> На съемке',
    image: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg'
  },
  {
    id: '3',
    label: 'Фаза 03. <br/> Манифест',
    image: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg',
    subPhases: [
      { id: 'a', label: 'Костюм Brioni', image: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
      { id: 'b', label: 'Loro Piana', image: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' }
    ]
  }
];

const COMPARISON_COLLECTION: ComparisonItem[] = [
  {
    id: 1,
    title: "Chanel Heritage",
    category: "Luxe Portrait",
    before: "https://static.tildacdn.com/tild3431-6234-4963-a633-663036666465/01f_shoot.jpg",
    after: "https://static.tildacdn.com/tild3038-3634-4939-a564-626634393139/01f_executive_image.jpg"
  },
  {
    id: 2,
    title: "Editorial Presence",
    category: "Corporate Leader",
    before: "https://static.tildacdn.com/tild3230-3233-4234-a330-643962316630/02f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg"
  },
  {
    id: 3,
    title: "Global Executive",
    category: "Power Look",
    before: "https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg"
  },
  {
    id: 4,
    title: "Pinstripe Authority",
    category: "CEO Manifesto",
    before: "https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg",
    after: "https://static.tildacdn.com/tild3065-3539-4135-a636-313232303362/04m_executive_image1.jpg"
  }
];

const AUTHORITY_ARCHIVE: GalleryItem[] = [
  { id: 1, name: 'Ирина Хакамада', status: 'Символ лидерства', image: 'https://static.tildacdn.com/tild6336-6461-4239-a533-636461316432/_MG_4315.jpg' },
  { id: 2, name: 'Михаил Федоренко', status: 'Госсоветник 2 класса', image: 'https://static.tildacdn.com/tild3065-6262-4766-b635-353233626138/IMG_4309-Edit.jpg' },
  { id: 3, name: 'Аделия Петросян', status: 'Чемпионка РФ', image: 'https://static.tildacdn.com/tild3436-3831-4433-b630-313939653736/IMG_3426-Edit.jpg' },
  { id: 4, name: 'Francisco Oliveira', status: 'Владелец Guru Canggu', image: 'https://static.tildacdn.com/tild3038-3566-4338-a434-333236653135/IMG_0549.jpeg' },
  { id: 5, name: 'Dr. Kate Barker', status: 'Футуролог NEOM', image: 'https://static.tildacdn.com/tild3336-3630-4732-b438-323161323763/IMG_9624.jpg' },
  { id: 6, name: 'Dr. Aisha Bin Bishr', status: 'Digital Dubai', image: 'https://static.tildacdn.com/tild3564-3432-4335-b338-643631373236/IMG_9564.jpg' },
  { id: 7, name: 'Олег Конников', status: 'Konnikov Clinic', image: 'https://static.tildacdn.com/tild6436-6430-4636-a233-653536316663/_MG_8784.jpg' },
  { id: 8, name: 'Михаил Федоренко', status: 'Системный имидж', image: 'https://static.tildacdn.com/tild3236-3061-4261-b063-376136633263/IMG_4334-2.jpg' }
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ирина Хакамада', description: 'Бизнес-спикер, \nпубличный деятель.', videoUrl: 'https://rutube.ru/play/embed/ef3ddf744edc99e9d1dbeb3f92540683' },
  { id: 2, name: 'Олег Конников', description: 'Звездный стоматолог, \nэксперт федеральных ТВ-проектов.', videoUrl: 'https://rutube.ru/play/embed/ffb709841bf1ffda248861c8f9c5f41d' },
  { id: 3, name: 'Lex Borealis', description: 'Международные юристы: \nЛондон, Дубай, Москва.', videoUrl: 'https://rutube.ru/play/embed/9ee74e5c2e6ddeb2d0bb97e257cae03b' },
  { id: 4, name: 'Роман Тарасенко', description: 'Маркетолог №1, стратег, \nавтор бестселлеров.', videoUrl: 'https://rutube.ru/play/embed/28c6c2f35ca1d859ce6a037c859a6e26' }
];

/**
 * =============================================================================
 * SUB-COMPONENTS
 * =============================================================================
 */

const ShowcaseItem: React.FC<{ item: ComparisonItem }> = ({ item }) => {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div 
      className="group relative aspect-[3/4] overflow-hidden border border-white/5 bg-black cursor-pointer shadow-2xl transition-all duration-700 hover:border-accent/40"
      onMouseEnter={() => setShowBefore(true)}
      onMouseLeave={() => setShowBefore(false)}
      onTouchStart={() => setShowBefore(true)}
      onTouchEnd={() => setShowBefore(false)}
    >
      <img 
        src={item.after} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'scale-105 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}`} 
        alt={item.title} 
      />
      <img 
        src={item.before} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        alt={`${item.title} Raw`} 
      />

      <div className={`absolute inset-y-0 left-0 w-[1px] bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-30 transition-all duration-700 pointer-events-none ${showBefore ? 'translate-x-full' : 'translate-x-0 opacity-0'}`}></div>

      <div className="absolute top-6 left-6 z-40 space-y-2">
        <span className={`inline-block px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.3em] border backdrop-blur-md transition-all duration-500 ${showBefore ? 'border-white/30 text-white bg-white/10' : 'border-white/20 text-white/90 bg-white/5'}`}>
          {showBefore ? 'RAW: ИСХОДНИК' : 'AI: ИМИДЖЕВЫЙ ПОРТРЕТ'}
        </span>
      </div>

      <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/70 to-transparent transition-all duration-700 ${showBefore ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="text-accent text-[10px] uppercase font-bold tracking-[0.3em] block mb-2">{item.category}</span>
        <h4 className="font-serif text-3xl text-white tracking-tight leading-none">{item.title}</h4>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState('3');
  const [activeLook, setActiveLook] = useState('a');
  
  const testimonialRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);
  const [testScrollProgress, setTestScrollProgress] = useState(0);
  const [authScrollProgress, setAuthScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleScrollProgress = (ref: React.RefObject<HTMLDivElement | null>, setter: (val: number) => void) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
      setter(progress);
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-dark text-white selection:bg-accent selection:text-dark min-h-screen overflow-x-hidden font-sans">
      
      {/* 1. NAVBAR */}
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-700 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          <div className="flex flex-col items-start leading-none group cursor-pointer">
            <div className="font-serif text-[16px] md:text-xl font-semibold text-white tracking-[0.2em] uppercase whitespace-nowrap group-hover:text-accent transition-colors duration-500">VALERY LATYPOV</div>
            <div className="text-accent uppercase tracking-[0.1em] text-[10px] md:text-xs font-black mt-1.5 opacity-90">Executive Protocol™</div>
          </div>
          
          <nav className="hidden lg:flex gap-12 absolute left-1/2 -translate-x-1/2">
            {[
              { id: 'manifesto', label: 'Философия' },
              { id: 'portfolio', label: 'Результаты' },
              { id: 'archive', label: 'Портфолио' },
              { id: 'authority', label: 'Рекомендации' },
              { id: 'pricing', label: 'Инвестиция' }
            ].map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 text-white/60 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex">
            <a href="http://t.me/latypovvalery" target="_blank" className="border border-accent/40 text-accent px-12 py-3.5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-accent hover:text-dark transition-all duration-500">
              Telegram Direct
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col gap-1.5 w-8 items-end group">
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 rotate-45 translate-y-[10px]' : 'w-8'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[6px]' : 'w-4'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-2 mt-0.5'}`}></div>
          </button>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="relative min-h-screen flex items-start lg:items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top_20%] md:bg-[center_top_35%] lg:bg-[center_top_45%]" 
          style={{ backgroundImage: `linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.98)), url('https://static.tildacdn.com/tild3830-3461-4336-a465-383562653435/04m_executive_image2.jpg')` }} 
        />
        <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-[45vh] lg:pt-0">
          <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase lg:border-l lg:border-accent/60 lg:pl-6 mb-8 block leading-none">STRATEGIC VISUAL ASSET PROTOCOL</span>
            <h1 className="font-serif text-[42px] leading-[1.05] md:text-8xl lg:text-9xl text-white mb-8 md:mb-10 tracking-tight">
              Ваш имидж — это <br className="hidden md:block" />
              <span className="text-accent italic font-light gold-gradient-text">актив или пассив.</span> <br className="hidden md:block" />
              Начните извлекать прибыль.
            </h1>
            <p className="max-w-2xl mb-12 md:mb-16 text-[16px] md:text-2xl text-white/70 font-light leading-relaxed mx-auto lg:mx-0">
              <span className="text-accent font-medium">Executive Protocol™:</span> Создание визуального капитала уровня Forbes за 60 минут. Математическая точность образа для тех, кто управляет империями.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center lg:justify-start">
              <a href="http://t.me/latypovvalery" className="bg-accent text-dark px-12 py-6 md:py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white transition-all duration-500 shadow-[0_20px_60px_rgba(197,160,89,0.3)] text-center leading-tight">
                ЗАБРОНИРОВАТЬ <br/> АУДИТ ИМИДЖА
              </a>
              <a href="#portfolio" className="border border-white/20 text-white px-12 py-6 md:py-7 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white/5 hover:border-accent hover:text-accent transition-all duration-500 backdrop-blur-sm text-center">
                Портфолио
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO & BIO */}
      <section className="py-24 md:py-48 border-b border-white/5 bg-[#080808]" id="manifesto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_450px] gap-12 md:gap-20 items-center">
            <div className="fade-up w-full">
              <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] mb-10 block text-center md:text-left">The Artist Behind <br className="md:hidden" /> the Protocol</span>
              <h2 className="font-serif text-5xl lg:text-8xl mb-10 md:mb-14 leading-[1] tracking-tighter text-white text-center md:text-left">Валерий <br/><span className="italic text-accent">Латыпов</span></h2>
              
              <div className="space-y-8 text-white/60 text-[17px] md:text-xl font-light max-w-xl leading-relaxed mx-auto md:mx-0">
                <p>
                  Я — <span className="text-accent font-medium">«визуальный алхимик»</span>. Мой бэкграунд в квантовой радиофизике (МИФИ) позволяет мне конструировать кадр с математической точностью, отсекая хаос.
                </p>
                <p>
                  В моем объективе — те, кто меняет мир: от <span className="text-white font-medium">Ирины Хакамады, Дмитрия Пескова, Сьюзен Сарандон, Арнольда Шварценеггера, Рэнди Цукерберг</span> до мировых легенд музыки.
                </p>
                <p>
                  Официальный фотограф <span className="text-white font-medium">Дубай Опера</span> и постановки <span className="text-white font-medium">Кармина Бурана</span>. Мои работы публиковались в <span className="text-white font-medium">Rolling Stone, Forbes, Esquire</span>.
                </p>
                <div className="bg-accent/5 border-l-[1px] border-accent p-8 md:p-10 my-10 md:my-12">
                  <p className="text-accent font-serif text-2xl italic mb-4 tracking-wide">«Zero Friction Protocol»</p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Я прилетаю к вам. Мы работаем 60 минут. <br className="hidden lg:block" /> Через 24 часа вы получаете готовые активы уровня мировых обложек — <span className="text-white font-medium">без суеты и потери времени</span>.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative group fade-up delay-300 w-full flex items-center justify-center">
               <div className="absolute -inset-6 border border-accent/10 translate-x-3 translate-y-3 -z-10 hidden md:block"></div>
               <div className="overflow-hidden border border-white/10 shadow-3xl aspect-[3/4] w-full max-w-[380px] lg:max-w-[420px]">
                  <img src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" className="w-full h-full object-cover grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out" alt="Valery Latypov" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE WOW COLLECTION (Showcase) */}
      <section className="py-24 md:py-48 bg-[#080808] border-b border-white/5" id="portfolio">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16 md:mb-24 text-center md:text-left mx-auto md:mx-0 fade-up">
            <span className="text-accent text-[11px] font-extrabold uppercase tracking-[0.5em] mb-8 block">The WOW Collection</span>
            <h2 className="font-serif text-[40px] md:text-7xl text-white leading-[1.1] tracking-tighter mb-10">Трансформация Статуса</h2>
            <p className="text-white/50 text-[18px] md:text-xl max-w-2xl font-light leading-relaxed">
              Мы превращаем обычные кадры в эталон вашего статуса. Посмотрите, как меняется восприятие масштаба личности через призму Executive Protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up delay-200">
            {COMPARISON_COLLECTION.map((item) => (
              <ShowcaseItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUTHORITY ARCHIVE */}
      <section id="archive" className="py-24 md:py-48 bg-dark border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-28 fade-up">
            <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8 leading-relaxed">Cultural Code Of <br/> The Generation</span>
            <h2 className="font-serif text-4xl md:text-7xl text-white tracking-tighter italic leading-tight">Те, кто доверил мне<br/>свой визуальный капитал</h2>
          </div>

          <div className="relative group">
            <div 
              ref={authorityRef}
              onScroll={() => handleScrollProgress(authorityRef, setAuthScrollProgress)}
              className="flex md:grid md:grid-cols-4 gap-6 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-12 md:pb-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {AUTHORITY_ARCHIVE.map(item => (
                <div key={item.id} className="min-w-[260px] md:min-w-0 snap-center group cursor-pointer fade-up">
                  <div className="aspect-[3/4] overflow-hidden border border-white/5 mb-6 md:mb-10 bg-black">
                    <img src={item.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" alt={item.name} />
                  </div>
                  <div className="space-y-2 text-center">
                    <span className="font-serif text-xl md:text-2xl text-white block group-hover:text-accent transition-colors duration-500">{item.name}</span>
                    <span className="text-accent/50 text-[10px] uppercase font-bold tracking-[0.2em]">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out" 
                style={{ width: `${authScrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSFORMATION MATRIX */}
      <section className="py-24 md:py-48 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16 md:mb-28 max-w-4xl mx-auto fade-up">
            <span className="text-accent text-[11px] font-extrabold uppercase tracking-[0.5em] mb-8 block">Transformation Matrix</span>
            <h2 className="font-serif text-3xl md:text-7xl text-white leading-[1.1] mb-10 tracking-tight">
              От человека <br className="lg:hidden" /> с камеры <br className="hidden lg:block" />
              к <span className="italic text-accent">визуальной легенде</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-12 lg:gap-20 relative fade-up">
            <div className="relative w-full max-w-[380px] lg:max-w-[480px]">
              <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <img 
                  src={activeStep === '3' ? (TRANSFORMATION_DATA.find(p => p.id === '3')?.subPhases?.find(s => s.id === activeLook)?.image) : (TRANSFORMATION_DATA.find(p => p.id === activeStep)?.image)} 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out" 
                  alt="Transformation" 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-10 w-full max-w-6xl mx-auto">
              {TRANSFORMATION_DATA.map(step => (
                <div key={step.id} className="flex flex-col gap-6 w-full md:w-auto items-center">
                  <button 
                    onClick={() => setActiveStep(step.id)} 
                    className={`p-5 md:px-10 md:py-7 border flex items-center transition-all duration-500 min-h-[70px] ${activeStep === step.id ? 'border-accent bg-card shadow-lg' : 'border-white/5 text-white/30 hover:border-white/20'} md:w-[300px] w-full`}
                  >
                    <div className="flex items-center gap-5 text-left w-full justify-center md:justify-start">
                      <span className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] border-r border-white/10 pr-5 ${activeStep === step.id ? 'text-accent' : 'text-white/10'}`}>
                          {step.id === '1' ? '01.' : step.id === '2' ? '02.' : '03.'}
                      </span>
                      <span 
                          className={`text-[10px] md:text-[14px] font-bold uppercase tracking-[0.2em] leading-tight ${activeStep === step.id ? 'text-white' : ''}`}
                          dangerouslySetInnerHTML={{ __html: step.label.split('. <br/> ')[1] || step.label.split('. ')[1] }}
                      />
                    </div>
                  </button>
                  
                  {step.id === '3' && activeStep === '3' && (
                    <div className="flex flex-wrap justify-center gap-3 animate-fade-in md:absolute md:top-full md:mt-10 md:left-0 md:right-0">
                      {step.subPhases?.map(sub => (
                        <button 
                          key={sub.id} 
                          onClick={() => setActiveLook(sub.id)} 
                          className={`px-6 py-3 text-[8px] md:text-[9px] uppercase font-black tracking-[0.4em] border transition-all duration-500 ${activeLook === sub.id ? 'border-accent text-dark bg-accent shadow-xl' : 'border-white/10 text-white/40 bg-black/60 hover:border-white/30 hover:text-white'}`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section id="authority" className="py-24 md:py-48 bg-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-32 fade-up">
            <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8">Social Proof</span>
            <h2 className="font-serif text-4xl md:text-7xl text-white tracking-tighter italic border-b border-accent/20 pb-4 inline-block leading-tight">Слово тех, кто прошел Protocol</h2>
          </div>
          
          <div className="relative group max-w-7xl mx-auto">
            <div 
              ref={testimonialRef}
              onScroll={() => handleScrollProgress(testimonialRef, setTestScrollProgress)}
              className="flex gap-8 md:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TESTIMONIALS.map(v => (
                <div key={v.id} className="min-w-[280px] md:min-w-[400px] lg:min-w-[480px] snap-center bg-card border border-white/5 p-6 md:p-8 group hover:border-accent/40 transition-all duration-700 shadow-2xl">
                  <div className="relative aspect-[9/16] bg-black mb-8 md:mb-10 border border-accent/10 overflow-hidden shadow-3xl">
                    <iframe src={v.videoUrl} className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out" title={v.name}></iframe>
                  </div>
                  <div className="font-serif text-[24px] md:text-3xl text-white group-hover:text-accent transition-colors duration-500 mb-3 whitespace-pre-line leading-none">{v.name}</div>
                  <div className="text-white/40 text-[10px] md:text-[11px] uppercase font-bold tracking-[0.2em] leading-relaxed whitespace-pre-line">{v.description}</div>
                </div>
              ))}
            </div>

            <button onClick={() => scrollContainer(testimonialRef, 'left')} className="absolute top-1/2 -left-20 -translate-y-1/2 w-14 h-14 hidden xl:flex items-center justify-center border border-white/10 text-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5 active:scale-90">&larr;</button>
            <button onClick={() => scrollContainer(testimonialRef, 'right')} className="absolute top-1/2 -right-20 -translate-y-1/2 w-14 h-14 hidden xl:flex items-center justify-center border border-white/10 text-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5 active:scale-90">&rarr;</button>

            <div className="absolute bottom-4 left-0 w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out" 
                style={{ width: `${testScrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING */}
      <section id="pricing" className="py-24 md:py-48 bg-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto border border-accent/30 bg-card p-8 md:p-24 relative shadow-[0_0_120px_rgba(0,0,0,0.8)] fade-up text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-dark px-10 py-3.5 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl whitespace-pre md:whitespace-nowrap leading-tight">
                EXECUTIVE PROTOCOL™ <br className="md:hidden" /> VALUE STATUS
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_450px] gap-16 lg:gap-32 items-center mt-12 md:mt-0">
              <div className="space-y-12 w-full text-left">
                <h3 className="font-serif text-3xl md:text-5xl text-white mb-10 italic tracking-tight underline decoration-accent/10 underline-offset-8">Что вы получаете:</h3>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <p className="text-white font-serif text-xl md:text-2xl">Global Mobility Protocol</p>
                    <span className="text-accent/40 text-[13px] italic whitespace-nowrap ml-6 font-medium">250 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <p className="text-white font-serif text-xl md:text-2xl italic text-accent opacity-80">Бонус #1: Digital Tailoring</p>
                    <span className="text-accent/60 text-[13px] line-through ml-6 opacity-40">150 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                    <p className="text-white font-serif text-xl md:text-2xl italic text-accent opacity-80">Бонус #2: 24-Hour Delivery</p>
                    <span className="text-accent/60 text-[13px] line-through ml-6 opacity-40">80 000 ₽</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 p-10 md:p-14 border border-accent/20 text-center flex flex-col justify-center items-center h-full w-full relative">
                <span className="text-accent/50 text-[11px] font-black tracking-[0.6em] uppercase block mb-8">Инвестиция</span>
                <div className="font-serif text-6xl md:text-[80px] text-white tracking-tighter gold-gradient-text mb-6 whitespace-nowrap leading-none lg:translate-x-[-12px] optical-center-text">
                   250 000 ₽
                </div>
                <p className="text-accent/40 uppercase text-[10px] tracking-[0.4em] font-black mb-12 leading-relaxed">
                  ОКУПАЕТСЯ ПЕРВОЙ ЖЕ ЗАКРЫТОЙ СДЕЛКОЙ
                </p>

                <a href="http://t.me/latypovvalery" className="block w-full bg-[#1c1c1c] text-accent border border-accent/40 px-10 py-6 md:py-7 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-dark transition-all duration-500 shadow-2xl mb-12 text-center active:scale-[0.98]">
                  ЗАБРОНИРОВАТЬ СЛОТ СЕЙЧАС
                </a>

                <div className="flex items-center justify-center gap-3">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  <p className="text-[11px] text-red-500/80 font-black uppercase tracking-[0.25em]">Только 2 слота в месяц</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-24 md:py-32 border-t border-white/5 bg-black text-center">
        <div className="container mx-auto px-6">
          <div className="font-serif text-[20px] md:text-5xl tracking-[0.5em] text-white/90 mb-8 uppercase leading-none">VALERY LATYPOV</div>
          <div className="text-accent text-[12px] font-black tracking-[0.4em] uppercase mb-16 md:mb-20 opacity-80">Executive Protocol™</div>
          <p className="text-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-semibold">
            &copy; 2026 | PRIVATE SELECTION | BY VALERY LATYPOV | ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1100] bg-dark transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-accent text-5xl font-light hover:scale-110 transition-transform">&times;</button>
        <div className="flex flex-col items-center justify-center h-full gap-12">
            {[
                { id: 'manifesto', label: 'Философия' },
                { id: 'portfolio', label: 'Результаты' },
                { id: 'archive', label: 'Портфолио' },
                { id: 'authority', label: 'Рекомендации' },
                { id: 'pricing', label: 'Инвестиция' }
            ].map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-white uppercase tracking-[0.3em] hover:text-accent transition-colors">
                    {link.label}
                </a>
            ))}
            <a href="http://t.me/latypovvalery" className="mt-12 border border-accent text-accent px-14 py-6 text-[11px] font-black tracking-[0.4em] uppercase hover:bg-accent hover:text-dark transition-all">Telegram Direct</a>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;