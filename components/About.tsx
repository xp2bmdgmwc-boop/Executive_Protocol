import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about py-24 bg-[#0a0a0a] border-b border-white/5 font-sans fade-up" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* About Image */}
          <div className="w-full lg:w-1/2 aspect-square bg-cover bg-center border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
               style={{ backgroundImage: "url('https://static.tildacdn.com/tild3731-3461-4238-a132-336333353164/IMG_1119.jpg')" }}>
          </div>

          {/* About Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-accent uppercase tracking-[3px] text-[11px] block mb-4 font-black">
              20 лет опыта
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
              Я снимаю тех, чье время стоит дороже денег.
            </h2>
            <p className="text-muted text-lg font-light leading-relaxed mb-8">
              Меня зовут Валерий Латыпов. Мои герои — люди, принимающие глобальные решения.<br /><br />
              <strong className="text-white">Я работал в Белом Доме (Москва)</strong>,<br />
              снимал в Мэрии Москвы и в закрытых кабинетах ОАЭ, Лондона и Нью-Йорка.
            </p>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 pt-12 border-t border-white/10">
              
              {/* Column 1: State & Power */}
              <div>
                <h4 className="text-accent text-[10px] font-black uppercase tracking-[3px] mb-8">ГОСУДАРСТВО И ВЛАСТЬ</h4>
                <ul className="space-y-6">
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Дмитрий Песков & Сергей Собянин</span>
                    <span className="block text-muted text-xs leading-relaxed">Обеспечение визуального авторитета на высшем уровне.</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Jonas Tåhlin</span>
                    <span className="block text-muted text-xs leading-relaxed">Президент Spirits Brands в LVMH (Париж).</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Dr. Aisha Bin Bishr</span>
                    <span className="block text-muted text-xs leading-relaxed">Экс-CEO Smart Dubai.</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Михаил Федоренко</span>
                    <span className="block text-muted text-xs leading-relaxed">Госсоветник 2 класса, экс-министр ИТ.</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Миллиардеры */}
              <div>
                <h4 className="text-accent text-[10px] font-black uppercase tracking-[3px] mb-8">МИЛЛИАРДЕРЫ И МИРОВЫЕ ИМЕНА</h4>
                <ul className="space-y-6">
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Игорь Рыбаков & Оскар Хартманн</span>
                    <span className="block text-muted text-xs leading-relaxed">Миллиардеры списка Forbes. Фаундеры империй.</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Ludomia Pucci & Luca Buccellati</span>
                    <span className="block text-muted text-xs leading-relaxed">Наследники великих династий моды и искусства.</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Ann Dexter-Jones</span>
                    <span className="block text-muted text-xs leading-relaxed">Икона стиля Нью-Йорка.</span>
                  </li>
                  <li className="group">
                    <span className="block text-white font-serif text-lg leading-tight mb-1 group-hover:text-accent transition-colors">Lex Borealis</span>
                    <span className="block text-muted text-xs leading-relaxed">Международная юридическая группа.</span>
                  </li>
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