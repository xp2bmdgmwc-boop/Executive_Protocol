import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-8 pb-20 lg:py-0">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.99)), url('https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg')` 
        }}
      />
      <div className="container mx-auto px-6 relative z-10 pt-16 md:pt-40 lg:pt-0">
        <div className="max-w-4xl mx-0 text-left">
          <span className="inline-block text-[10px] md:text-[11px] tracking-[4px] uppercase text-white font-bold border-l-2 border-white pl-5 mb-6 md:mb-8 leading-none">
            STRATEGIC VISUAL ASSET PROTOCOL
          </span>
          <h1 className="font-serif text-[42px] leading-[1.1] md:text-7xl lg:text-8xl text-white mb-6 md:mb-8 tracking-tight">
            Ваш имидж либо <span className="text-accent">строит империю</span>, либо тихо её рушит.
          </h1>
          <p className="max-w-3xl mb-10 md:mb-12 text-base md:text-2xl text-white/80 font-light leading-relaxed mx-0">
            В высших эшелонах бизнеса решение о доверии принимается за 0.3 секунды. Executive Protocol — это кратчайший путь к визуальному превосходству. Мы уважаем масштаб вашего времени, создавая образ абсолютного авторитета в одно касание.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-start items-start sm:items-center">
            <a 
              href="http://t.me/latypovvalery" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block bg-white text-dark px-6 lg:px-12 py-5 lg:py-6 text-[10px] lg:text-[11px] font-black uppercase tracking-[2.5px] hover:bg-accent transition-all duration-500 text-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] whitespace-nowrap"
            >
              ЗАПИСАТЬСЯ НА АУДИТ ИМИДЖА
            </a>
            <a 
              href="#portfolio" 
              className="w-full sm:w-auto inline-block border border-white/20 text-white px-8 lg:px-12 py-5 lg:py-6 text-[10px] lg:text-[11px] font-black uppercase tracking-[2.5px] hover:bg-white/10 hover:border-white/40 transition-all duration-500 text-center whitespace-nowrap"
            >
              Портфолио Лидеров
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;