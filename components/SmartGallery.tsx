import React, { useState, useRef } from 'react';
import { ComparisonItem, GalleryItem, Testimonial } from '../types';

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

export default SmartGallery;