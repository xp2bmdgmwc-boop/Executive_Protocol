import React from 'react';

const Pricing: React.FC = () => (
  <section id="pricing" className="py-32 md:py-64 bg-dark">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto border border-accent/20 bg-card p-12 md:p-32 text-center relative shadow-3xl">
        <span className="text-accent/50 text-[11px] font-black tracking-[0.5em] uppercase block mb-12">Инвестиция в статус</span>
        <div className="font-serif text-6xl md:text-[100px] text-white gold-gradient-text mb-12">250 000 ₽</div>
        <a href="http://t.me/latypovvalery" target="_blank" className="block w-full max-w-sm mx-auto bg-dark border border-accent/40 text-accent py-8 text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all">ОБСУДИТЬ ПРОЕКТ</a>
      </div>
    </div>
  </section>
);

export default Pricing;