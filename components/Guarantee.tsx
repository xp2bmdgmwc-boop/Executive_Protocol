import React from 'react';

const Guarantee: React.FC = () => (
  <section className="py-24 bg-[#0a0a0a] border-t border-white/5 fade-up">
    <div className="container mx-auto px-6 text-center">
      <div className="inline-block mb-8">
        <div className="flex items-center justify-center w-16 h-16 border border-white/20 rounded-full mb-6 mx-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <span className="text-accent text-[11px] font-black uppercase tracking-[5px] mb-4 block">Безусловная гарантия</span>
      </div>
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 italic">Risk Reversal</h2>
      <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
        «Если на этапе превью вы не увидите масштаб своей личности — проект останавливается, оплата не взимается. <span className="text-white">Я беру все риски на себя.</span>»
      </p>
    </div>
  </section>
);

export default Guarantee;