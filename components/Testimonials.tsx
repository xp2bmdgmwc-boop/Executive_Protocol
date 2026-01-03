
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="pt-8 pb-32 bg-[#0f0f0f]" id="authority">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-4">Social Proof</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight">Прямые рекомендации</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="bg-card border border-white/5 p-5 group hover:border-accent/30 transition-all">
              <div className="relative aspect-[9/16] bg-black mb-6 border border-white/10 overflow-hidden rounded-sm shadow-xl">
                <iframe 
                  src={item.videoUrl} 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  title={item.name}
                />
              </div>
              <div className="space-y-1">
                <div className="font-serif text-xl text-white/90 group-hover:text-accent transition-colors">{item.name}</div>
                <div className="text-muted text-[10px] uppercase font-bold tracking-wider leading-relaxed opacity-60">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
