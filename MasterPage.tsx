
import React, { useState, useEffect, useRef } from 'react';
import { COMPARISON_COLLECTION, AUTHORITY_ARCHIVE, TESTIMONIALS } from './constants';
import { ComparisonItem, GalleryItem, Testimonial } from './types';

/**
 * =============================================================================
 * SUB-COMPONENTS
 * =============================================================================
 */

const FAQAccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-8 md:py-10 flex justify-between items-center text-left group hover:text-accent transition-colors duration-500"
      >
        <h4 className="font-serif text-xl md:text-3xl italic tracking-tight">{question}</h4>
        <div className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
          <span className="absolute w-full h-[1px] bg-accent"></span>
          <span className="absolute w-[1px] h-full bg-accent"></span>
        </div>
      </button>
      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
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
      <div className="container mx-auto">
        <div className="px-6 max-w-4xl mb-16 md:mb-28 fade-up text-left">
          <span className="text-accent text-[11px] font-black uppercase tracking-[0.5em] block mb-8">{subtitle}</span>
          {title && <h2 className="font-serif text-[42px] md:text-7xl text-white tracking-tighter leading-tight italic">{title}</h2>}
        </div>
        
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-4 gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6 md:px-0"
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-[78vw] md:min-w-0 snap-center group/card cursor-pointer">
                {type === 'comparison' && <ComparisonCard item={item as ComparisonItem} isLCP={isLCP && index === 0} />}
                {type === 'photo' && <PhotoCard item={item as GalleryItem} isLCP={isLCP && index === 0} />}
                {type === 'video' && <VideoCard item={item as Testimonial} />}
              </div>
            ))}
          </div>
          
          <div className="md:hidden px-6 mt-4">
            <div className="h-[1px] w-full bg-white/10 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const obs = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  const navLinks = [
    { id: 'manifesto', label: 'Метод' },
    { id: 'global-stage', label: 'Визионеры' },
    { id: 'archive', label: 'Портфолио' },
    { id: 'portfolio', label: 'Результаты' },
    { id: 'pricing', label: 'Инвестиция' }
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
            <a href="tel:+79852246789" className="bg-accent text-dark px-10 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-white transition-all">
              📞 ПОЗВОНИТЬ
            </a>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden relative z-[1300] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className={`block h-[2px] bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-8 rotate-45 translate-y-[8px]' : 'w-8'}`}></span>
            <span className={`block h-[2px] w-8 bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-[2px] bg-accent transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[8px]' : 'w-8'}`}></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        
        {/* Fix typo: replaced setIsOpen(false) with setIsMenuOpen(false) */}
        <button 
          onClick={() => setIsMenuOpen(false)} 
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center group"
        >
          <span className="absolute w-8 h-[2px] bg-accent rotate-45 group-hover:bg-white transition-all duration-300"></span>
          <span className="absolute w-8 h-[2px] bg-accent -rotate-45 group-hover:bg-white transition-all duration-300"></span>
        </button>

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

      <main>
        {/* HERO */}
        <section className="relative h-screen flex flex-col justify-center overflow-hidden">
          <img src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/50 to-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(197,160,89,0.1),transparent_60%)]" />

          <div className="container mx-auto px-6 relative z-10 text-left transform translate-y-[30px] md:translate-y-0">
            <div className="max-w-4xl">
              <span className="text-accent text-[10px] font-bold tracking-[6px] uppercase border-l border-accent/60 pl-6 mb-6 md:mb-8 block leading-none">ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™</span>
              <h1 className="font-serif text-[42px] leading-[1.1] md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 tracking-tight">Ваш имидж — это <br />актив или пассив? <br /><span className="text-accent italic font-light gold-gradient-text">Начните извлекать прибыль.</span></h1>
              <div className="max-w-4xl mb-8 md:mb-12 text-sm md:text-xl text-white/90 font-light leading-relaxed">
                <span className="text-[15px] md:text-lg">Визуальный капитал</span> <br /> 
                <span className="text-[15px] md:text-lg">уровня Forbes.</span> <br />
                Математическая точность образа. Вечная эстетика.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <a href="tel:+79852246789" className="bg-accent text-dark px-10 md:px-14 py-4 md:py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl text-center">📞 +7 985 224-67-89</a>
                <a href="#archive" className="border border-white/30 text-white px-10 md:px-14 py-4 md:py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center">ДОКАЗАТЕЛЬСТВА</a>
              </div>
            </div>
          </div>
        </section>

        <SmartGallery id="archive" title="Трансформация Статуса" subtitle="ДОКАЗАТЕЛЬСТВА" type="comparison" items={COMPARISON_COLLECTION} isLCP={true} />

        {/* ABOUT */}
        <section className="py-24 md:py-40 bg-[#0a0a0a] border-b border-white/5" id="about">
          <div className="container mx-auto px-6 text-left">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start">
              <div className="w-full lg:w-[38%] fade-up">
                <div className="relative group">
                  <div className="absolute -inset-4 border border-white/5 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
                  <div className="aspect-[4/5] overflow-hidden bg-black/40 border border-white/10 shadow-3xl">
                    <img src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" alt="Latypov" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"/>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[55%] fade-up delay-200">
                <div className="inline-flex items-center gap-4 mb-8"><span className="h-[1px] w-8 bg-accent/40"></span><span className="text-accent uppercase tracking-[6px] text-[10px] font-extrabold">20 лет опыта</span></div>
                <h2 className="font-serif text-[38px] md:text-[56px] text-white leading-[1.1] mb-10 tracking-tight">Я снимаю тех, чье время стоит <span className="italic">дороже денег.</span></h2>
                <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl">
                  <p>Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения. Архитекторы реальностей, для которых имидж — это не картинка, а стратегический актив.</p>
                  <p><strong className="text-white font-medium">Я работал в Белом Доме (Москва)</strong>, снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SmartGallery id="global-stage" title="Визионеры" subtitle="ПОРТФОЛИО" type="photo" items={AUTHORITY_ARCHIVE} />

        <SmartGallery id="portfolio" title="Послушайте сами" subtitle="ДОКАЗАТЕЛЬСТВА" type="video" items={TESTIMONIALS} />

        {/* FAQ ACCORDION */}
        <section className="py-24 md:py-48 bg-dark" id="faq">
          <div className="container mx-auto px-6">
            <div className="mb-16 md:mb-32 text-center fade-up">
              <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-6">ВОЗРАЖЕНИЯ</span>
              <h2 className="font-serif text-4xl md:text-7xl text-white tracking-tight italic">Что вас останавливает?</h2>
            </div>
            <div className="max-w-4xl mx-auto fade-up">
              <FAQAccordionItem question="Сколько времени займет сессия?" answer="Обычно процесс занимает до 60 минут, но мы не привязаны к таймеру. Мы работаем до тех пор, пока не добьемся кадра, который станет вашим эталоном. Важен результат, а не время на часах." />
              <FAQAccordionItem question="Не будет ли портрет выглядеть искусственно?" answer="Мы не меняем вашу личность. Глаза, мимика и взгляд остаются нетронутыми. AI используется только как инструмент «цифрового пошива» для создания безупречной одежды и управления светом." />
              <FAQAccordionItem question="Насколько это конфиденциально?" answer="Мы подписываем строгий NDA. Ваши материалы хранятся на защищенных серверах и безвозвратно удаляются после завершения проекта. Ваша приватность — часть протокола." />
              <FAQAccordionItem question="Что если я не умею позировать?" answer="Вам и не нужно. Моя работа — режиссура состояния. Мы просто общаемся в комфортном ритме, пока я фиксирую вашу естественную харизму. Вы будете собой, но в лучшем воплощении." />
              <FAQAccordionItem question="Для чего подходят эти фото?" answer="Вы получаете активы в сверхвысоком разрешении. Они безупречны для обложек бизнес-глянца, интервью, личных экосистем и широкоформатной печати." />
            </div>
          </div>
        </section>

        {/* PRICING MOCKUP */}
        <section id="pricing" className="py-24 md:py-48 bg-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto border border-accent/20 bg-card p-10 md:p-24 relative shadow-3xl text-center">
              <span className="text-accent text-[11px] font-black tracking-[0.4em] uppercase block mb-12">ПРОТОКОЛ AI-EXECUTIVE</span>
              <div className="font-serif text-6xl md:text-[100px] text-white leading-none mb-20 tracking-tighter">250 000 ₽</div>
              <div className="space-y-12 text-left mb-20">
                <div className="space-y-3 pb-8 border-b border-white/5">
                  <h4 className="font-serif text-2xl text-white italic">Выездная съемка в любой точке мира*</h4>
                  <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">Я привожу мобильную студию и физический Fine Art холст прямо к вам. Никаких поездок и пробок.</p>
                </div>
                <div className="space-y-3 pb-8 border-b border-white/5">
                  <h4 className="font-serif text-2xl text-white italic">Цифровой пошив гардероба (Old Money style)</h4>
                  <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">Снимайтесь в комфортной футболке. Мы переоденем вас в цифровые модели Brioni или Loro Piana. Лицо остается нетронутым.</p>
                </div>
                <div className="space-y-3 pb-8 border-b border-white/5">
                  <h4 className="font-serif text-2xl text-white italic">Физический Fine Art холст</h4>
                  <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">Я привожу с собой настоящий холст музейного качества. Это дает неповторимую глубину и статус.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif text-2xl text-white italic">Готовность: 24 часа</h4>
                  <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">Результат завтра к завтраку. Скорость без компромиссов в качестве.</p>
                </div>
              </div>
              <a href="http://t.me/latypovvalery" target="_blank" className="block w-full border border-accent/40 text-accent py-8 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all duration-500 text-center">ЗАБРОНИРОВАТЬ СЛОТ</a>
              <div className="mt-16 text-[9px] text-white/20 uppercase tracking-[0.2em] font-medium italic">*ЛОГИСТИКА ВЫЕЗДА ОБСУЖДАЕТСЯ ИНДИВИДУАЛЬНО. ТОЛЬКО 2 ПРОЕКТА В МЕСЯЦ.</div>
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
