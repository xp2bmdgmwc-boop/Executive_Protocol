
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about py-24 md:py-40 bg-[#0a0a0a] border-b border-white/5 font-sans" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start">
          
          {/* About Image - Reduced size and refined framing */}
          <div className="w-full lg:w-[38%] fade-up">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-white/5 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
              
              <div className="aspect-[4/5] overflow-hidden bg-black/40 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                <img 
                  src="https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg" 
                  alt="Valery Latypov" 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
                />
              </div>
              
              {/* Subtle signature label */}
              <div className="absolute -bottom-6 -right-6 hidden lg:block">
                 <span className="font-serif italic text-white/20 text-4xl select-none">Latypov.</span>
              </div>
            </div>
          </div>

          {/* About Text - Premium Typography */}
          <div className="w-full lg:w-[55%] fade-up delay-200">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[1px] w-8 bg-accent/40"></span>
              <span className="text-accent uppercase tracking-[6px] text-[10px] font-extrabold">
                20 лет опыта
              </span>
            </div>
            
            <h2 className="font-serif text-[38px] md:text-[56px] text-white leading-[1.1] mb-10 tracking-tight">
              Я снимаю тех, чье время стоит <span className="italic">дороже денег.</span>
            </h2>
            
            <div className="space-y-6 text-muted text-lg font-light leading-relaxed mb-12 max-w-xl">
              <p>
                Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения. 
                Архитекторы реальностей, для которых имидж — это не картинка, а стратегический актив.
              </p>
              <p>
                <strong className="text-white font-medium">Я работал в Белом Доме (Москва)</strong>,
                снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.
              </p>
            </div>

            {/* Clients Grid - Ultra Refined */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16 pt-16 border-t border-white/10">
              
              {/* Column 1: State & Power */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-white/40 text-[9px] font-black uppercase tracking-[4px]">Category I</h4>
                  <div className="text-accent text-[11px] font-bold uppercase tracking-[2px]">ГОСУДАРСТВО И ВЛАСТЬ</div>
                </div>
                <ul className="space-y-8">
                  {[
                    { name: "Дмитрий Песков & Сергей Собянин", info: "Обеспечение визуального авторитета на высшем уровне." },
                    { name: "Jonas Tåhlin", info: "Президент Spirits Brands в LVMH (Париж)." },
                    { name: "Dr. Aisha Bin Bishr", info: "Экс-CEO Smart Dubai." },
                    { name: "Михаил Федоренко", info: "Госсоветник 2 класса, экс-министр ИТ." }
                  ].map((client, idx) => (
                    <li key={idx} className="group cursor-default">
                      <span className="block text-white font-serif text-[20px] leading-tight mb-2 group-hover:text-accent transition-colors duration-500">
                        {client.name}
                      </span>
                      <span className="block text-muted text-[11px] uppercase tracking-[1px] font-medium opacity-60">
                        {client.info}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Billionaires */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-white/40 text-[9px] font-black uppercase tracking-[4px]">Category II</h4>
                  <div className="text-accent text-[11px] font-bold uppercase tracking-[2px]">МИЛЛИАРДЕРЫ И ИМЕНА</div>
                </div>
                <ul className="space-y-8">
                  {[
                    { name: "Игорь Рыбаков & Оскар Хартманн", info: "Миллиардеры списка Forbes. Фаундеры империй." },
                    { name: "Ludomia Pucci & Luca Buccellati", info: "Наследники великих династий моды и искусства." },
                    { name: "Ann Dexter-Jones", info: "Икона стиля Нью-Йорка." },
                    { name: "Lex Borealis", info: "Международная юридическая группа." }
                  ].map((client, idx) => (
                    <li key={idx} className="group cursor-default">
                      <span className="block text-white font-serif text-[20px] leading-tight mb-2 group-hover:text-accent transition-colors duration-500">
                        {client.name}
                      </span>
                      <span className="block text-muted text-[11px] uppercase tracking-[1px] font-medium opacity-60">
                        {client.info}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
