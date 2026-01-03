import React, { useState } from 'react';
import { COMPARISON_COLLECTION } from '../constants';

const ShowcaseItem: React.FC<{ item: typeof COMPARISON_COLLECTION[0] }> = ({ item }) => {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div 
      className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-black cursor-pointer shadow-2xl"
      onMouseEnter={() => setShowBefore(true)}
      onMouseLeave={() => setShowBefore(false)}
      onTouchStart={() => setShowBefore(true)}
      onTouchEnd={() => setShowBefore(false)}
    >
      <img 
        src={item.after} 
        alt={`Executive Protocol — ${item.title}`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'scale-105 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}`}
      />
      
      <img 
        src={item.before} 
        alt={`Executive Protocol — ${item.title} (Raw)`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${showBefore ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      />

      <div className={`absolute inset-y-0 left-0 w-[1px] bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-30 transition-all duration-700 pointer-events-none ${showBefore ? 'translate-x-full' : 'translate-x-0 opacity-0'}`}></div>

      <div className="absolute top-6 left-6 z-40 space-y-2">
        <span className={`inline-block px-3 py-1 text-[8px] font-black uppercase tracking-[2.5px] border backdrop-blur-md transition-all duration-500 ${showBefore ? 'border-white/30 text-white bg-white/10' : 'border-white/20 text-white/90 bg-white/5'}`}>
          {showBefore ? 'RAW: ИСХОДНИК' : 'AI: ИМИДЖЕВЫЙ ПОРТРЕТ'}
        </span>
      </div>

      <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/60 to-transparent transition-all duration-700 ${showBefore ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="text-accent text-[9px] uppercase font-bold tracking-[3px] block mb-1">{item.category}</span>
        <h4 className="font-serif text-3xl text-white tracking-tight">{item.title}</h4>
      </div>

      {!showBefore && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[9px] uppercase font-bold tracking-[4px]">
            Наведите для сравнения
          </div>
        </div>
      )}
    </div>
  );
};

const Showcase: React.FC = () => {
  return (
    <section className="pt-8 pb-20 lg:pt-12 lg:pb-32 bg-[#080808]" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-24 text-left mx-0">
          <span className="text-accent text-[11px] font-extrabold uppercase tracking-[4px] mb-6 block">The WOW Collection</span>
          <h2 className="font-serif text-[40px] md:text-7xl text-white leading-[1.1] tracking-tighter mb-8 md:mb-10">
            Трансформация Статуса
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-0 font-light leading-relaxed text-left">
            Мы превращаем обычные кадры в эталон вашего статуса. Посмотрите, как меняется восприятие масштаба личности через призму Executive Protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPARISON_COLLECTION.map((item) => (
            <ShowcaseItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-left">
          <a 
            href="http://t.me/latypovvalery" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/30 text-white px-12 py-5 text-[11px] font-black uppercase tracking-[3px] hover:bg-white hover:text-dark transition-all whitespace-nowrap"
          >
            ЗАПИСАТЬСЯ НА АУДИТ ИМИДЖА
          </a>
        </div>
      </div>
    </section>
  );
};

export default Showcase;