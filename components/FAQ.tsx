import React, { useState } from 'react';

const FAQ_DATA = [
  { question: "Не будет ли портрет выглядеть искусственно?", answer: "Мы не меняем вашу личность. Глаза, мимика и взгляд остаются нетронутыми. AI используется только как инструмент для создания безупречной одежды." },
  { question: "Насколько это конфиденциально?", answer: "Мы подписываем строгий NDA. Ваши материалы хранятся на защищенных серверах и удаляются после завершения проекта." },
  { question: "Что если я не умею позировать?", answer: "Вам и не нужно. Моя работа — режиссура состояния. Мы просто общаемся в комфортном ритме, пока я фиксирую вашу естественную харизму." }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left group transition-all">
        <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent'}`}>{question}</span>
        <span className={`text-2xl transition-transform duration-500 font-light ${isOpen ? 'rotate-45 text-accent' : 'text-white/30'}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-white/40 text-lg font-light leading-relaxed max-w-3xl">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => (
  <section className="py-24 md:py-32 bg-dark" id="faq">
    <div className="container mx-auto px-6">
      <div className="mb-16 md:mb-24 text-center fade-up">
        <span className="text-accent text-[11px] font-black tracking-[5px] uppercase block mb-6">Discovery phase</span>
        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">Вопросы и Ответы</h2>
      </div>
      <div className="max-w-4xl mx-auto fade-up">
        {FAQ_DATA.map((item, index) => <FAQItem key={index} {...item} />)}
      </div>
    </div>
  </section>
);

export default FAQ;