import React, { useState } from 'react';
import { TRANSFORMATION_DATA } from '../constants';

const Transformation: React.FC = () => {
  const [activeStep, setActiveStep] = useState('3');
  const [activeLook, setActiveLook] = useState('a');

  const currentPhase = TRANSFORMATION_DATA.find(p => p.id === activeStep);
  const currentImage = activeStep === '3' 
    ? (currentPhase?.subPhases?.find(s => s.id === activeLook)?.image || currentPhase?.image)
    : currentPhase?.image;

  const currentLabel = activeStep === '3'
    ? (currentPhase?.subPhases?.find(s => s.id === activeLook)?.label || currentPhase?.label)
    : currentPhase?.label;

  return (
    <section className="pt-8 pb-24 bg-dark border-b border-white/5" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <span className="text-accent text-[11px] font-extrabold uppercase tracking-[3px] mb-4 block">Протокол Трансформации</span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-6">Превращаем присутствие в авторитет.</h2>
          <p className="text-muted text-base md:text-lg leading-relaxed font-light">
            Мы не используем нейросети для замены лиц — мы сохраняем вашу искру, используя AI как «цифрового портного» высочайшего класса.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-end">
          <div className="relative group w-full">
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
              <img 
                src={currentImage} 
                alt={`Executive Protocol — ${currentLabel}`}
                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                key={currentImage}
              />
              <div className="absolute inset-0 pointer-events-none border-[10px] lg:border-[20px] border-dark/20"></div>
            </div>
            
            {activeStep === '3' && (
              <div className="mt-4 lg:absolute lg:-bottom-6 lg:left-6 lg:right-6 flex flex-wrap gap-2 justify-center lg:justify-start z-10">
                {TRANSFORMATION_DATA.find(p => p.id === '3')?.subPhases?.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveLook(sub.id)}
                    className={`px-3 py-2 border text-[8px] md:text-[9px] uppercase font-bold tracking-widest transition-all backdrop-blur-md ${activeLook === sub.id ? 'border-accent text-white bg-white/10' : 'border-white/10 text-white/50 bg-black/40 hover:border-white/30'}`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-4 overflow-hidden">
              {TRANSFORMATION_DATA.map((step) => {
                const [phaseNum, phaseName] = step.label.split(': ');
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`group flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-6 p-2 md:p-4 lg:p-6 border transition-all ${activeStep === step.id ? 'border-white bg-card' : 'border-white/5 hover:border-white/20 bg-transparent'}`}
                  >
                    <div className={`hidden md:block w-3 h-3 rounded-full border border-white/30 transition-all ${activeStep === step.id ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`}></div>
                    <span className={`text-[7px] md:text-[11px] font-bold uppercase tracking-[1px] md:tracking-[2.5px] text-center lg:text-left leading-tight ${activeStep === step.id ? 'text-white' : 'text-muted'}`}>
                      {phaseNum}: <br className="lg:hidden" /> {phaseName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;