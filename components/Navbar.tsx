import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'manifesto', label: 'Метод' },
    { id: 'global-stage', label: 'Global Stage' },
    { id: 'archive', label: 'Портфолио' },
    { id: 'portfolio', label: 'Результаты' },
    { id: 'pricing', label: 'Инвестиция' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-700 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/98 border-accent/20 shadow-2xl' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          
          <div className="flex flex-col items-start leading-none group cursor-pointer relative z-[1200]">
            <div className="font-serif text-[15px] md:text-xl font-semibold text-white tracking-[3px] uppercase group-hover:text-accent transition-colors">VALERY LATYPOV</div>
            <div className="text-accent uppercase tracking-[1px] text-[10px] md:text-xs font-black mt-1">Executive Protocol™</div>
          </div>
          
          <nav className="hidden lg:flex gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[10px] uppercase tracking-[3px] font-bold text-white/60 hover:text-accent transition-all">
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex gap-4">
            <a href="tel:+79852246789" className="bg-accent text-dark px-10 py-3 text-[10px] font-black tracking-[3px] uppercase hover:bg-white transition-all">
              📞 ПОЗВОНИТЬ
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden flex flex-col gap-1.5 w-8 items-end group relative z-[1300]">
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isOpen ? 'opacity-0' : 'w-6'}`}></div>
            <div className={`h-[1px] bg-accent transition-all duration-500 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`}></div>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[1100] bg-dark/98 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center gap-10 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {navLinks.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setIsOpen(false)} className="font-serif text-4xl hover:text-accent transition-colors">
            {l.label}
          </a>
        ))}
        <div className="flex flex-col gap-4 mt-10 w-full px-6 items-center">
          <a href="tel:+79852246789" className="w-full text-center bg-accent text-dark py-5 text-sm font-black tracking-widest uppercase shadow-2xl">
            📞 ПОЗВОНИТЬ: +7 985 224-67-89
          </a>
          <a href="http://t.me/latypovvalery" target="_blank" className="w-full text-center border border-accent/40 text-accent py-5 text-sm font-black tracking-widest uppercase">
            Telegram Direct
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;