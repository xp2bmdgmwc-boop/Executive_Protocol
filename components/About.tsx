import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about py-24 md:py-40 bg-[#0a0a0a] border-b border-white/5 font-sans" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start">
          <div className="w-full lg:w-[38%] fade-up">
            <div className="relative group">
              <div className="absolute -inset-4 border border-white/5 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
              <div className="aspect-[4/5] overflow-hidden bg-black/40 border border-white/10 shadow-3xl">
                <img 
                  src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" 
                  alt="Valery Latypov" 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[55%] fade-up delay-200 text-left">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[1px] w-8 bg-accent/40"></span>
              <span className="text-accent uppercase tracking-[6px] text-[10px] font-extrabold">20 лет опыта</span>
            </div>
            <h2 className="font-serif text-[38px] md:text-[56px] text-white leading-[1.1] mb-10 tracking-tight">
              Я снимаю тех, чье время стоит <span className="italic">дороже денег.</span>
            </h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl">
              <p>Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения. Архитекторы реальностей, для которых имидж — это не картинка, а стратегический актив.</p>
              <p><strong className="text-white font-medium">Я работал в Белом Доме (Москва)</strong>, снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;