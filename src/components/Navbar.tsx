import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, MapPin, Truck, HelpCircle, Phone, Sparkles, Award, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCustomBuilder: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openCustomBuilder }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Sparkles },
    { id: 'menu', label: 'Menu', icon: ShoppingBag },
    { id: 'topping', label: 'Topping', icon: Sparkles },
    { id: 'loyalitas', label: 'Member Poin', icon: Award },
    { id: 'ulasan', label: 'Ulasan & Rating', icon: Star },
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
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-potato-brown/10 py-3 text-soft-black'
          : 'bg-white/60 backdrop-blur-sm border-b border-potato-brown/10 py-4 text-soft-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            id="navbar-logo-container"
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-cheese-yellow rounded-xl rotate-12 flex items-center justify-center border-2 border-potato-brown shadow-md group-hover:rotate-0 transition-transform duration-300">
              <span className="font-display font-black text-potato-brown text-lg">P</span>
            </div>
            <div className="leading-tight">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-potato-brown block uppercase leading-none">
                Potato Cheese
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-cheese-orange font-bold uppercase block mt-1">
                Pangalengan
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-nav-links" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-display font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-cheese-yellow text-potato-brown border border-potato-brown/20 shadow-sm'
                      : 'text-soft-black/80 hover:text-cheese-orange hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Action CTA */}
          <div className="hidden sm:block">
            <button
              id="desktop-navbar-cta"
              onClick={openCustomBuilder}
              className="bg-cheese-orange text-white font-display font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-100 hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer group"
            >
              <span>Pesan Sekarang</span>
              <span className="group-hover:rotate-12 transition-transform">🧀</span>
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              id="mobile-nav-cta-mini"
              onClick={openCustomBuilder}
              className="sm:hidden bg-cheese-yellow text-potato-brown px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-sm"
            >
              Pesan 🧀
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

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed inset-y-0 right-0 w-80 bg-white border-l border-potato-brown/15 shadow-2xl p-6 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-potato-brown/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cheese-yellow rounded-lg rotate-12 flex items-center justify-center border-2 border-potato-brown shadow-sm">
              <span className="font-display font-black text-potato-brown text-base">P</span>
            </div>
            <div>
              <span className="font-display font-black text-potato-brown text-base block uppercase leading-none">
                POTATO CHEESE
              </span>
              <span className="text-[8px] font-mono tracking-widest text-cheese-orange font-bold uppercase block mt-1">
                Pangalengan
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

        {/* Navigation Items in Drawer */}
        <div id="mobile-nav-items-list" className="flex flex-col gap-2 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-display font-bold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-cheese-yellow text-potato-brown border border-potato-brown/20 shadow-md'
                    : 'text-soft-black/80 hover:text-cheese-orange hover:bg-cream-soft/50'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Drawer Footer CTA */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            id="mobile-drawer-cta"
            onClick={() => {
              setIsOpen(false);
              openCustomBuilder();
            }}
            className="w-full bg-cheese-orange text-white font-display font-bold py-3 rounded-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Custom Topping Anda</span>
            <span>🔥</span>
          </button>
          <p className="text-center text-[10px] text-potato-brown/60 mt-3 font-mono">
            📍 Terminal Pangalengan, Bandung
          </p>
        </div>
      </div>

      {/* Backdrop Overlay for mobile drawer */}
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
