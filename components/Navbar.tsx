import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isOpen && window.scrollY > 100) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const navLinks = [
    { id: 'manifesto', label: 'Философия' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'archive', label: 'Эстетика Власти' },
    { id: 'authority', label: 'Рекомендации' },
    { id: 'pricing', label: 'Инвестиция' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-20 md:h-24 z-[1000] transition-all duration-500 flex items-center border-b ${scrolled ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-transparent border-white/5'} backdrop-blur-xl`}>
        <div className="container mx-auto px-6 flex justify-between items-center w-full relative">
          
          <div className="flex flex-col items-start w-full lg:w-auto text-left leading-none">
            <div className="font-serif text-[15px] md:text-xl font-semibold text-white tracking-[2px] uppercase whitespace-nowrap">
              VALERY LATYPOV
            </div>
            <div className="text-accent uppercase tracking-[1px] text-[12px] md:text-xs font-black opacity-90 mt-1 translate-y-[4px]">
              Executive Protocol™
            </div>
          </div>
          
          <nav className="hidden lg:flex gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="text-[11px] uppercase tracking-[2px] font-bold transition-colors duration-300 text-white/70 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="http://t.me/latypovvalery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white/30 text-white px-8 py-3 text-[10px] font-black tracking-[2px] uppercase hover:bg-white hover:text-[#0a0a0a] transition-all duration-500"
            >
              Telegram
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute right-6 flex flex-col justify-center items-end gap-1.5 w-8 h-8 z-[1100]"
          >
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></div>
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6'}`}></div>
            <div className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`}></div>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[999] bg-[#0a0a0a]/98 backdrop-blur-2xl lg:hidden transition-all duration-700 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif text-white tracking-[4px] uppercase hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="http://t.me/latypovvalery" 
            onClick={() => setIsOpen(false)}
            className="mt-8 border border-white text-white px-12 py-4 text-sm font-black tracking-[4px] uppercase"
          >
            Telegram Direct
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;