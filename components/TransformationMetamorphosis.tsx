import React, { useState, useRef } from 'react';

const TransformationMetamorphosis: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const stages = [
    { label: 'ASSET', title: 'Loro Piana', desc: 'Бескомпромиссный статус. Высший уровень визуального капитала.', img: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' },
    { label: 'STATUS', title: 'Brioni', desc: 'Доминантная уверенность. Сила, которую не нужно доказывать.', img: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
    { label: 'ORIGIN', title: 'В жизни', desc: 'Точка входа. То, как вас видит мир без вмешательства протокола.', img: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg' },
    { label: 'PROCESS', title: 'Протокол', desc: '60 минут инженерной режиссуры. Механика создания образа.', img: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div className="relative bg-black text-white px-0 md:px-4 overflow-hidden fade-up">
      {/* DESKTOP VIEW */}
      <div className="hidden md:grid max-w-6xl mx-auto md:grid-cols-12 gap-12 items-center py-24 md:py-48">
        <div className="w-full md:col-span-8 relative">
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-white/10 shadow-3xl bg-dark">
            {stages.map((stage, idx) => (
              <img key={idx} src={stage.img} alt={stage.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ${activeStage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
            ))}
            <div className="absolute inset-0 border-[30px] border-black/20 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:col-span-4 flex flex-col space-y-12 text-left">
          <div className="space-y-14">
            {stages.map((stage, idx) => (
              <div key={idx} className={`transition-all duration-1000 cursor-pointer ${activeStage === idx ? 'opacity-100 translate-x-6' : 'opacity-10 hover:opacity-30'}`} onClick={() => setActiveStage(idx)}>
                <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase block mb-3">0{idx + 1} — {stage.label}</span>
                <h3 className="text-3xl font-serif italic mb-4">{stage.title}</h3>
                {activeStage === idx && <p className="text-sm text-white/40 font-light leading-relaxed animate-slide-right">{stage.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE GALLERY VIEW */}
      <div className="md:hidden">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6"
        >
          {stages.map((stage, idx) => (
            <div key={idx} className="min-w-[85vw] snap-center space-y-6">
              <div className="aspect-[3/4] overflow-hidden border border-white/5 bg-black relative">
                <img src={stage.img} alt={stage.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase tracking-widest text-accent">
                    PHASE 0{idx + 1}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-left">
                <span className="text-accent text-[9px] uppercase font-bold tracking-[0.3em] block">{stage.label}</span>
                <h4 className="font-serif text-2xl text-white">{stage.title}</h4>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-24">
          <div className="h-[1px] w-full bg-white/10 relative">
            <div className="absolute top-0 left-0 h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformationMetamorphosis;