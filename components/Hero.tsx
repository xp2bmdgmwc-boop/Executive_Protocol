import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* IMAGE */}
      <img
        src="https://static.tildacdn.com/tild3166-3265-4934-b662-326261396266/_B4A6054-Edit.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),transparent_60%)]" />

      {/* CONTENT */}
      <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-32 text-left">
        <div className="max-w-4xl">

          <span className="text-accent text-[10px] font-bold tracking-[6px] uppercase border-l border-accent/60 pl-6 mb-10 block leading-none">
            ПРОТОКОЛ БЕЗУПРЕЧНОСТИ™
          </span>

          <h1 className="font-serif text-[48px] leading-[1] md:text-8xl lg:text-9xl text-white mb-10 tracking-tight">
            Ваш имидж — это <br className="hidden md:block" />
            <span className="text-accent italic font-light gold-gradient-text">
              актив или пассив?
            </span> <br className="hidden md:block" />
            Начните извлекать прибыль.
          </h1>

          <p className="max-w-2xl mb-16 text-lg md:text-2xl text-white/80 font-light leading-relaxed">
            <span className="text-accent font-medium">Executive Protocol™:</span>{' '}
            Визуальный капитал уровня Forbes.{' '}
            <span className="text-white">
              Математическая точность образа. Вечная эстетика.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="tel:+79852246789"
              className="bg-accent text-dark px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl text-center"
            >
              📞 НАЧАТЬ РАЗГОВОР
            </a>

            <a
              href="#archive"
              className="border border-white/30 text-white px-14 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-center"
            >
              Кремль · BRICS · Олимпиада
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
