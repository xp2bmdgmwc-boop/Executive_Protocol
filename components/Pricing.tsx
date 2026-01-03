import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="pt-8 pb-40 bg-dark" id="pricing">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto border border-white/20 bg-dark p-8 md:p-24 relative shadow-[0_0_80px_rgba(255,255,255,0.05)]">
          
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-[#0a0a0a] px-8 py-2 text-[10px] font-black uppercase tracking-widest">
            PRIVATE ACCESS
          </div>

          <div className="text-center mb-24">
            <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-12">
              Инвестиция в свой имидж
            </span>
            <div className="font-serif text-7xl md:text-8xl text-white tracking-tighter">
              250 000 ₽
            </div>
            <p className="mt-6 text-[#8a8a8a] uppercase text-[10px] tracking-[2px] font-bold">
              Окупается первой же закрытой сделкой
            </p>
          </div>
          
          <div className="space-y-16 max-w-2xl mx-auto">
            <div className="group border-b border-white/10 pb-10">
              <h4 className="text-white font-serif text-2xl mb-4 group-hover:text-accent transition-colors">
                Хирургическая точность
              </h4>
              <p className="text-[#8a8a8a] text-sm font-light leading-relaxed">
                Мы уважаем масштаб вашего времени. Протокол — это точечное взаимодействие в вашем пространстве. Мы фокусируемся на результате, исключая любой процессный шум.
              </p>
            </div>

            <div className="group border-b border-white/10 pb-10">
              <h4 className="text-white font-serif text-2xl mb-4 group-hover:text-accent transition-colors">
                Digital Tailoring: Гардероб власти
              </h4>
              <p className="text-[#8a8a8a] text-sm font-light leading-relaxed">
                Безупречный цифровой пошив. Brioni, Loro Piana, Armani. Мы проектируем образ лидера, сохраняя 100% узнаваемости вашей харизмы.
              </p>
            </div>

            <div className="group border-b border-white/10 pb-10">
              <h4 className="text-white font-serif text-2xl mb-4 group-hover:text-accent transition-colors">
                Выездной Fine Art Фон
              </h4>
              <p className="text-[#8a8a8a] text-sm font-light leading-relaxed">
                Я привожу на съемку физический холст музейного качества. Съемка в реальном пространстве создает глубину и подлинную фактуру, недоступную для чистой имитации.
              </p>
            </div>
          </div>

          <div className="mt-24 text-center space-y-10">
            <a 
              href="http://t.me/latypovvalery" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-dark px-16 py-6 text-[11px] font-black uppercase tracking-[3px] hover:bg-accent transition-all duration-500 shadow-lg"
            >
              ЗАПИСАТЬСЯ НА АУДИТ ИМИДЖА
            </a>
            
            <div className="space-y-4">
              <p className="text-[10px] text-accent uppercase tracking-[2px] font-bold max-w-md mx-auto leading-loose">
                ВНИМАНИЕ: Всего 2 слота в месяц. <br/>Текущий статус: 1 слот забронирован.
              </p>
              <p className="text-[10px] text-[#8a8a8a]/60 uppercase tracking-[2px] font-bold max-w-md mx-auto leading-loose italic">
                *Логистика выезда по миру обсуждается в индивидуальном порядке.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;