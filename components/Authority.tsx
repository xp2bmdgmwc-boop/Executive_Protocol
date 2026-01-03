import React from 'react';
import { AUTHORITY_ARCHIVE } from '../constants';

const Authority: React.FC = () => {
  return (
    <section className="pt-8 pb-32 bg-dark" id="archive">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-[11px] font-extrabold uppercase tracking-[3px] mb-4 block">Archive</span>
          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">Эстетика Власти и Смысла</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AUTHORITY_ARCHIVE.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-4 bg-black">
                <img 
                  src={item.image} 
                  alt={`Executive Protocol — Имидж лидера — ${item.name}`} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-xl text-white block">{item.name}</span>
                <span className="text-accent text-[9px] uppercase font-bold tracking-[1.5px] opacity-80">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authority;