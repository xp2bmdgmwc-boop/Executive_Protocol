import React, { useState, useEffect, useRef } from 'react';

/**
 * =============================================================================
 * 1. TYPES & DATA
 * =============================================================================
 */

interface GalleryItem { id: number; name: string; status: string; image: string; }
interface ComparisonItem { id: number; title: string; category: string; before: string; after: string; }

const COMPARISON_COLLECTION: ComparisonItem[] = [
  { id: 1, title: "Chanel Heritage", category: "ЛЮКС-ПОРТРЕТ", before: "https://static.tildacdn.com/tild3431-6234-4963-a633-663036666465/01f_shoot.jpg", after: "https://static.tildacdn.com/tild3038-3634-4939-a564-626634393139/01f_executive_image.jpg" },
  { id: 2, title: "Editorial Presence", category: "КОРПОРАТИВНЫЙ ЛИДЕР", before: "https://static.tildacdn.com/tild3230-3233-4234-a330-643962316630/02f_shoot.jpg", after: "https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg" },
  { id: 3, title: "Global Executive", category: "ОБРАЗ ВЛАСТИ", before: "https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg", after: "https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg" },
  { id: 4, title: "Pinstripe Authority", category: "CEO МАНИФЕСТ", before: "https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg", after: "https://static.tildacdn.com/tild3065-3539-4135-a636-313232303362/04m_executive_image1.jpg" }
];

const AUTHORITY_ARCHIVE: GalleryItem[] = [
  { id: 1, name: 'Ирина Хакамада', status: 'Символ лидерства', image: 'https://static.tildacdn.com/tild6336-6461-4239-a533-636461316432/_MG_4315.jpg' },
  { id: 2, name: 'Михаил Федоренко', status: 'Госсоветник 2 класса', image: 'https://static.tildacdn.com/tild3065-6262-4766-b635-353233626138/IMG_4309-Edit.jpg' },
  { id: 3, name: 'Аделия Петросян', status: 'Чемпионка РФ', image: 'https://static.tildacdn.com/tild3436-3831-4433-b630-313939653736/IMG_3426-Edit.jpg' },
  { id: 4, name: 'Francisco Oliveira', status: 'Guru Canggu Owner', image: 'https://static.tildacdn.com/tild3038-3566-4338-a434-333236653135/IMG_0549.jpeg' },
  { id: 5, name: 'Александр Г.', status: 'Акционер холдинга', image: 'https://static.tildacdn.com/tild3431-3165-4339-b962-636261623136/04m_shootjpg.jpg' },
  { id: 6, name: 'Елена В.', status: 'Основатель бренда', image: 'https://static.tildacdn.com/tild3164-3665-4161-b130-363539656534/01f_shoot.jpg' },
  { id: 7, name: 'Виктор П.', status: 'Управляющий партнер', image: 'https://static.tildacdn.com/tild6361-3965-4139-b864-343530366166/03f_shoot.jpg' },
  { id: 8, name: 'Марина С.', status: 'IT Визионер', image: 'https://static.tildacdn.com/tild6162-3664-4662-b939-663265613337/02f_shoot.jpg' }
];

const TRANSFORMATION_STAGES = [
  { label: 'ASSET', title: 'Loro Piana', desc: 'Бескомпромиссный статус. Высший уровень визуального капитала. (Loro Piana, Brunello Cucinelli, Zegna)', img: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' },
  { label: 'STATUS', title: 'Brioni', desc: 'Доминантная уверенность. Сила, которую не нужно доказывать. (Brioni, Tom Ford, Kiton)', img: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
  { label: 'ORIGIN', title: 'В жизни', desc: 'Точка входа. То, как вас видит мир без вмешательства протокола. (Casual, Smart Casual)', img: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg' },
  { label: 'PROCESS', title: 'Протокол', desc: '60 минут инженерной режиссуры. Механика создания образа. (Executive Styling, Lighting Protocol)', img: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg' }
];

/**
 * =============================================================================
 * 2. SUB-COMPONENTS
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
          {showBefore ? 'ИСХОДНАЯ ТОЧКА' : 'ПРОТОКОЛ'}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black to-transparent text-left">
        <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] mb-1 block">{item.category}</span>
        <h4 className="font-serif text-2xl text-white">{item.title}</h4>
      </div>
    </div>
  );
};

const SmartGallery: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  items: any[];
  type: 'photo' | 'comparison';
}> = ({ id, title, subtitle, items, type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    }
  };

  return (
    <section id={id} className="py-24 md:py-48 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
      <div className="container mx-auto">
        <div className="px-6 max-w-4xl mb-16 md:mb-28 fade-up text-left">
          <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8">{subtitle}</span>
          <h2 className="font-serif text-[42px] md:text-7xl text-white tracking-tighter leading-tight italic">{title}</h2>
        </div>
        <div className="relative">
          <div ref={scrollRef} onScroll={handleScroll} className="flex md:grid md:grid-cols-4 gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6 md:px-0">
            {items.map((item, index) => (
              <div key={index} className="min-w-[78vw] md:min-w-0 snap-center">
                {type === 'comparison' ? <ComparisonCard item={item} /> : (
                  <div className="space-y-6 text-left group">
                    <div className="aspect-[3/4] overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000 bg-black">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-serif text-2xl text-white block">{item.name}</span>
                      <span className="text-accent/60 text-[9px] uppercase font-bold tracking-widest">{item.status}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden px-6 mt-4"><div className="h-[1px] w-full bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>
        </div>
      </div>
    </section>
  );
};

const FAQAccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 md:py-10 flex justify-between items-center text-left group hover:text-accent transition-colors duration-500">
        <h4 className="font-serif text-xl md:text-3xl italic tracking-tight">{question}</h4>
        <div className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
          <span className="absolute w-full h-[1px] bg-accent"></span><span className="absolute w-[1px] h-full bg-accent"></span>
        </div>
      </button>
      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-3xl">{answer}</p>
      </div>
    </div>
  );
};

/**
 * =============================================================================
 * 3. MASTER PAGE
 * =============================================================================
 */

const MasterPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const obs = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  const navLinks = [
    { id: 'global-stage', label: 'Визионеры', num: '01' },
    { id: 'about', label: 'Об авторе', num: '02' },
    { id: 'manifesto', label: 'Метод', num: '03' },
    { id: 'cases', label: 'Кейсы', num: '04' },
    { id: 'pricing', label: 'Инвестиция', num: '05' }
  ];

  return (
    <div className="bg-dark text-white selection:bg-accent/30 selection:text-white min-h-screen font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-700 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-2xl' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          <div className="flex flex-col items-start leading-none group cursor-pointer relative z-[1200]">
            <div className="font-serif text-[15px] md:text-xl font-semibold text-white tracking-[3px] uppercase group-hover:text-accent transition-colors">ВАЛЕРИЙ ЛАТЫПОВ</div>
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
            <a href="tel:+79852246789" className="bg-accent text-dark px-10 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-white transition-all">📞 ПОЗВОНИТЬ</a>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden relative z-[1300] w-10 h-10 flex flex-col items-center justify-center gap-[6px]">
            <span className={`block h-[2px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
            <span className={`block h-[2px] w-8 bg-accent transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-[2px] bg-accent transition-all duration-500 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[8px]' : 'w-8'}`}></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Refined Luxury Edition) */}
      <div className={`fixed inset-0 z-[1100] bg-[#0a0a0a]/98 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="h-full flex flex-col justify-between px-8 py-24">
          <nav className="flex flex-col space-y-8">
            {navLinks.map((l, i) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setIsMenuOpen(false)} className="group flex items-end gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="text-accent font-black text-[10px] mb-2 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{l.num}</span>
                <span className="font-serif text-[42px] text-white italic leading-none group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="space-y-8">
            <div className="h-[1px] w-12 bg-accent/30" />
            <div className="space-y-4">
              <a href="tel:+79852246789" className="block text-white text-xl font-light tracking-tight">+7 985 224-67-89</a>
              <div className="flex gap-6">
                <a href="https://t.me/latypovvalery" target="_blank" className="text-accent text-[10px] font-black uppercase tracking-[3px]">Telegram</a>
                <span className="text-white/20 text-[10px] font-black uppercase tracking-[3px]">NDA Protected</span>
              </div>
            </div>
            <a href="https://t.me/latypovvalery" target="_blank" className="block w-full text-center bg-accent text-black py-6 text-[11px] font-black tracking-[4px] uppercase">ОБСУДИТЬ ПРОЕКТ</a>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex flex-col justify-center overflow-hidden">
          <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-top opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/50 to-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(197,160,89,0.1),transparent_60%)]" />
          <div className="container mx-auto px-6 relative z-10 text-left">
            <div className="max-w-4xl">
              <span className="text-accent text-[10px] font-bold tracking-[6px] uppercase border-l border-accent/60 pl-6 mb-8 block leading-none">ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™</span>
              <h1 className="font-serif text-[42px] leading-[1.1] md:text-6xl lg:text-7xl text-white mb-8 tracking-tight">Ваш имидж — это <br />актив или пассив? <br /><span className="text-accent italic font-light gold-gradient-text">Начните извлекать прибыль.</span></h1>
              <div className="max-w-4xl mb-12 text-sm md:text-xl text-white/90 font-light leading-relaxed">
                <span className="text-[15px] md:text-lg">Визуальный капитал</span> <br /> 
                <span className="text-[15px] md:text-lg">уровня Forbes.</span> <br />
                Математическая точность образа. Вечная эстетика.
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:+79852246789" className="bg-accent text-dark px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl text-center">📞 +7 985 224-67-89</a>
                <a href="#global-stage" className="border border-white/30 text-white px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center">ДОКАЗАТЕЛЬСТВА</a>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO & ABOUT */}
        <SmartGallery id="global-stage" title="Визионеры" subtitle="ПОРТФОЛИО" type="photo" items={AUTHORITY_ARCHIVE} />
        
        <section className="about py-24 bg-[#0a0a0a] border-b border-white/5 font-sans fade-up" id="about">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="w-full lg:w-1/2 aspect-square bg-cover bg-center border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" style={{ backgroundImage: "url('https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg')" }} />
              <div className="w-full lg:w-1/2 text-left">
                <span className="text-accent uppercase tracking-[3px] text-[11px] block mb-4 font-black">20 лет опыта</span>
                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">Я снимаю тех, чье время стоит дороже денег.</h2>
                <p className="text-muted text-lg font-light leading-relaxed mb-8">Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения.<br /><br /><strong className="text-white">Я работал в Белом Доме (Москва)</strong>,<br />снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 pt-12 border-t border-white/10">
                  <div>
                    <h4 className="text-accent text-[10px] font-black uppercase tracking-[3px] mb-8">ГОСУДАРСТВО И ВЛАСТЬ</h4>
                    <ul className="space-y-6">
                      <li className="group"><span className="block text-white font-serif text-lg group-hover:text-accent transition-colors">Дмитрий Песков & Сергей Собянин</span><span className="block text-muted text-xs leading-relaxed">Обеспечение визуального авторитета на высшем уровне.</span></li>
                      <li className="group"><span className="block text-white font-serif text-lg group-hover:text-accent transition-colors">Jonas Tåhlin</span><span className="block text-muted text-xs leading-relaxed">Президент Spirits Brands в LVMH (Нью-Йорк).</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent text-[10px] font-black uppercase tracking-[3px] mb-8">МИЛЛИАРДЕРЫ И МИРОВЫЕ ИМЕНА</h4>
                    <ul className="space-y-6">
                      <li className="group"><span className="block text-white font-serif text-lg group-hover:text-accent transition-colors">Игорь Рыбаков & Оскар Хартманн</span><span className="block text-muted text-xs leading-relaxed">Миллиардеры списка Forbes. Фаундеры империй.</span></li>
                      <li className="group"><span className="block text-white font-serif text-lg group-hover:text-accent transition-colors">Ludomia Pucci & Luca Buccellati</span><span className="block text-muted text-xs leading-relaxed">Наследники великих династий моды и искусства.</span></li>
                    </ul>
                  </div>
                </div>
                {/* Shadow Authority Hook */}
                <div className="mt-12 text-[10px] text-white/30 italic uppercase tracking-widest leading-relaxed border-t border-white/5 pt-8">Более 70% архива находится под защитой NDA и не подлежит публичной демонстрации.</div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD METAMORPHOSIS */}
        <section id="manifesto" className="bg-black py-24 fade-up">
           <div className="container mx-auto px-6">
              <div className="hidden md:grid grid-cols-12 gap-12 items-center text-left">
                <div className="col-span-8 relative h-[720px] overflow-hidden border border-white/10">
                   {TRANSFORMATION_STAGES.map((s, i) => (
                     <img key={i} src={s.img} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${activeStage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
                   ))}
                </div>
                <div className="col-span-4 flex flex-col justify-center space-y-10">
                   {TRANSFORMATION_STAGES.map((s, i) => (
                     <div key={i} onClick={() => setActiveStage(i)} className={`cursor-pointer transition-all duration-700 ${activeStage === i ? 'opacity-100 translate-x-4' : 'opacity-20 hover:opacity-50'}`}>
                        <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-2 block">0{i+1} — {s.label}</span>
                        <h3 className="text-3xl font-serif italic mb-3">{s.title}</h3>
                        {activeStage === i && <p className="text-white/40 text-sm leading-relaxed max-w-xs">{s.desc}</p>}
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </section>

        <SmartGallery id="cases" title="Трансформация Статуса" subtitle="ДОКАЗАТЕЛЬСТВА" type="comparison" items={COMPARISON_COLLECTION} />

        {/* RISK REVERSAL GUARANTEE */}
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 fade-up">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-block mb-8">
              <div className="flex items-center justify-center w-16 h-16 border border-white/20 rounded-full mb-6 mx-auto"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>
              <span className="text-accent text-[11px] font-black uppercase tracking-[5px] mb-4 block">Безусловная гарантия</span>
            </div>
            <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic">«Если на этапе превью вы не увидите масштаб своей личности — проект останавливается, оплата не взимается. <span className="text-white font-medium">Я беру все риски на себя.</span>»</p>
          </div>
        </section>

        {/* QUALIFICATION FILTER */}
        <section className="py-32 md:py-48 bg-[#0a0a0a] border-t border-white/5" id="qualification">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-24 fade-up text-left">
              <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tight uppercase mb-8">Я работаю не со всеми.<br/><span className="italic text-accent">Это фильтр, не извинение.</span></h2>
              <p className="text-white/40 text-xl font-light max-w-2xl mx-auto leading-relaxed">Executive Protocol — не услуга для масс-маркета. Это хирургически точный инструмент для Decision Makers, которые понимают ROI визуального капитала.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 text-left">
              <div className="fade-up">
                  <div className="flex items-center gap-4 mb-10"><div className="w-10 h-10 border border-accent flex items-center justify-center text-accent text-xl font-black">✓</div><h4 className="text-white font-serif text-3xl uppercase italic tracking-wide">Вы — идеальный клиент, если:</h4></div>
                  <ul className="space-y-8 text-white/60 text-xl font-light leading-relaxed">
                      <li className="border-l border-accent/40 pl-8">Вы понимаете, что одна «слабая» фотография в Forbes может стоить вам доверия инвесторов на <span className="text-accent font-medium">миллионы долларов</span>.</li>
                      <li className="border-l border-accent/40 pl-8">Вы знаете разницу между «фотосессией» и <span className="text-white font-medium">созданием визуального актива</span>, который работает годами.</li>
                      <li className="border-l border-accent/40 pl-8">Вы — <span className="text-white font-medium">Decision Maker</span>. Вы сами принимаете решения о собственном имидже.</li>
                  </ul>
              </div>
              <div className="fade-up delay-200">
                  <div className="flex items-center gap-4 mb-10"><div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/20 text-xl font-black">×</div><h4 className="text-white/40 font-serif text-3xl uppercase italic tracking-wide">Мы НЕ подходим друг другу, если:</h4></div>
                  <ul className="space-y-8 text-white/30 text-xl font-light leading-relaxed">
                      <li className="border-l border-white/10 pl-8">Вы ищете «фотографа на час» для LinkedIn-аватарки или контента в соцсети.</li>
                      <li className="border-l border-white/10 pl-8">Вам нужна <span className="text-white/50">скидка</span>. Я не торгуюсь. Цена фиксирована, потому что ценность неоспорима.</li>
                      <li className="border-l border-white/10 pl-8">Вы не готовы инвестировать 60 минут своего времени в актив, который будет работать на вас следующие 5 лет.</li>
                  </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING INVESTMENT */}
        <section id="pricing" className="py-24 md:py-48 bg-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto border border-accent/20 bg-card p-10 md:p-24 relative shadow-3xl text-center">
              <span className="text-accent text-[11px] font-black tracking-[0.4em] uppercase block mb-12">ПРОТОКОЛ AI-EXECUTIVE</span>
              <div className="font-serif text-6xl md:text-[100px] text-white leading-none mb-20 tracking-tighter gold-gradient-text">250 000 ₽</div>
              <div className="space-y-12 text-left mb-20">
                <div className="pb-8 border-b border-white/5"><h4 className="font-serif text-2xl text-white italic">Выездная съемка в любой точке мира*</h4><p className="text-white/40 text-sm font-light">Я привожу мобильную студию и физический Fine Art холст прямо к вам.</p></div>
                <div className="pb-8 border-b border-white/5"><h4 className="font-serif text-2xl text-white italic">Exclusive Rights Protocol</h4><p className="text-white/40 text-sm font-light">Полная передача прав на интеллектуальную собственность. Юридическая чистота для использования в любых масштабах и юрисдикциях.</p></div>
                <div className="pb-8 border-b border-white/5"><h4 className="font-serif text-2xl text-white italic">Цифровой пошив гардероба</h4><p className="text-white/40 text-sm font-light">Бескомпромиссный стиль (Loro Piana, Brioni, Zegna) без лишних примерок.</p></div>
                <div><h4 className="font-serif text-2xl text-white italic">Готовность: 24 часа</h4><p className="text-white/40 text-sm font-light">Результат завтра к завтраку. Скорость без компромиссов в качестве.</p></div>
              </div>
              <a href="https://t.me/latypovvalery" target="_blank" className="block w-full border border-accent/40 text-accent py-8 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all duration-500 text-center">ОБСУДИТЬ ПРОЕКТ</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-black text-center border-t border-white/5">
        <div className="font-serif text-2xl md:text-5xl tracking-[0.5em] text-white/90 mb-6 uppercase">ВАЛЕРИЙ ЛАТЫПОВ</div>
        <div className="text-accent text-[9px] font-black tracking-widest uppercase opacity-80">Executive Protocol™ © 2026</div>
      </footer>
    </div>
  );
};

export default MasterPage;