import { useEffect, useState } from 'react';
import { HelpCircle, MapPin, Menu as MenuIcon, Phone, ShoppingBag, Truck, X } from 'lucide-react';
import logoImage from '../assets/dapur-ama/logo.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCustomBuilder: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openCustomBuilder }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: ShoppingBag },
    { id: 'menu', label: 'Menu', icon: ShoppingBag },
    { id: 'pengiriman', label: 'Pengiriman', icon: Truck },
    { id: 'lokasi', label: 'Lokasi', icon: MapPin },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'kontak', label: 'Kontak', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md shadow-md border-b border-potato-brown/10 py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-potato-brown/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div
            id="navbar-logo-container"
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img
              src={logoImage}
              alt="Logo Dapur Ama"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#8B1E24]/20 shadow-md"
            />
            <div className="leading-tight">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#8B1E24] block uppercase leading-none">
                Dapur Ama
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-cheese-orange font-bold uppercase block mt-1">
                Snack Pangalengan
              </span>
            </div>
          </div>

          <div id="desktop-nav-links" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-display font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1E24] text-white border border-[#8B1E24] shadow-sm'
                      : 'text-soft-black/80 hover:text-[#8B1E24] hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block">
            <button
              id="desktop-navbar-cta"
              onClick={openCustomBuilder}
              className="bg-[#8B1E24] text-white font-display font-bold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Order Menu</span>
              <span>🧀</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              id="mobile-nav-cta-mini"
              onClick={openCustomBuilder}
              className="sm:hidden bg-cheese-yellow text-potato-brown px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-sm"
            >
              Order
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors cursor-pointer text-potato-brown hover:bg-white/50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed inset-y-0 right-0 w-80 bg-white border-l border-potato-brown/15 shadow-2xl p-6 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-potato-brown/10">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo Dapur Ama" className="w-10 h-10 rounded-full object-cover border border-[#8B1E24]/20" />
            <div>
              <span className="font-display font-black text-[#8B1E24] text-base block uppercase leading-none">
                Dapur Ama
              </span>
              <span className="text-[8px] font-mono tracking-widest text-cheese-orange font-bold uppercase block mt-1">
                Snack Pangalengan
              </span>
            </div>
          </div>
          <button
            id="close-mobile-drawer-btn"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-potato-brown/75 hover:text-potato-brown hover:bg-cream-soft cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div id="mobile-nav-items-list" className="flex flex-col gap-2 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-display font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-[#8B1E24] text-white border border-[#8B1E24] shadow-md'
                    : 'text-soft-black/80 hover:text-[#8B1E24] hover:bg-cream-soft/50'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            id="mobile-drawer-cta"
            onClick={() => {
              setIsOpen(false);
              openCustomBuilder();
            }}
            className="w-full bg-[#8B1E24] text-white font-display font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Pesan Menu Sekarang</span>
            <span>🔥</span>
          </button>
          <p className="text-center text-[10px] text-potato-brown/60 mt-3 font-mono">
            📍 Terminal Pangalengan, Bandung
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}
    </nav>
  );
}
