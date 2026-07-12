import React, { useState, useEffect, useRef } from 'react';
import { Menu } from './types';
import { MENUS, TESTIMONIALS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FavoriteMenu from './components/FavoriteMenu';
import CustomBuilder from './components/CustomBuilder';
import ToppingSection from './components/ToppingSection';
import DeliverySection from './components/DeliverySection';
import LocationSection from './components/LocationSection';
import GallerySection from './components/GallerySection';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LoyaltyProfile from './components/LoyaltyProfile';
import ReviewsSection from './components/ReviewsSection';
import { Star, MessageCircle, ArrowUp, Sparkles, Check, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>(undefined);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const builderRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const scrollToBuilder = () => {
    if (builderRef.current) {
      builderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // When a user selects "+ Topping" on a menu item
  const handleSelectMenuForTopping = (menu: Menu) => {
    setSelectedMenu(menu);
    // If we're not on the home screen, switch to home or show builder
    setActiveTab('beranda');
    // Allow React to update state and render before scrolling
    setTimeout(() => {
      scrollToBuilder();
    }, 100);
  };

  // Direct order without extra customization
  const handleDirectOrder = (menu: Menu) => {
    setSelectedMenu(menu);
    setActiveTab('beranda');
    setTimeout(() => {
      scrollToBuilder();
    }, 100);
  };

  const handleOrderSuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <div className="pt-24 min-h-screen">
            <FavoriteMenu
              onSelectMenuForTopping={handleSelectMenuForTopping}
              onDirectOrder={handleDirectOrder}
            />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => {}}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'topping':
        return (
          <div className="pt-24 min-h-screen">
            <ToppingSection onCustomizeClick={() => {
              setActiveTab('beranda');
              setTimeout(scrollToBuilder, 100);
            }} />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => {}}
            />
          </div>
        );
      case 'pengiriman':
        return (
          <div className="pt-24 min-h-screen">
            <DeliverySection />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'lokasi':
        return (
          <div className="pt-24 min-h-screen">
            <LocationSection />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'faq':
        return (
          <div className="pt-24 min-h-screen">
            <FAQSection />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'loyalitas':
        return (
          <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoyaltyProfile />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'ulasan':
        return (
          <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReviewsSection onLoginClick={() => setActiveTab('loyalitas')} />
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                setActiveTab('beranda');
                setTimeout(scrollToBuilder, 100);
              }}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={() => handleSelectMenuForTopping(MENUS[0])}
            />
          </div>
        );
      case 'kontak':
        return (
          <div className="pt-24 min-h-screen">
            <LocationSection />
            <div className="py-12 bg-white text-center space-y-4">
              <h3 className="font-display font-bold text-2xl text-soft-black">Ada Pertanyaan Lain?</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Silakan hubungi tim kami langsung via WhatsApp untuk pertanyaan seputar katering porsi besar, kolaborasi kemitraan, atau rute lokasi.
              </p>
              <a
                href="https://wa.me/628123456789?text=Halo%20Potato%20Cheese%20Pangalengan%20saya%20ingin%20bertanya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-display font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Admin WhatsApp</span>
              </a>
            </div>
          </div>
        );
      case 'beranda':
      default:
        return (
          <div id="beranda-full-view">
            {/* Hero Section */}
            <Hero
              onOrderClick={() => {
                setSelectedMenu(MENUS[0]);
                scrollToBuilder();
              }}
              onViewMenuClick={() => {
                const el = document.getElementById('favorite-menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Unique Values Section */}
            <FeaturesSection />

            {/* Menu Section */}
            <FavoriteMenu
              onSelectMenuForTopping={handleSelectMenuForTopping}
              onDirectOrder={handleDirectOrder}
            />

            {/* Topping showcase Section */}
            <ToppingSection onCustomizeClick={scrollToBuilder} />

            {/* Custom Interactive Builder Frame */}
            <div ref={builderRef} className="scroll-mt-20">
              <CustomBuilder
                initialMenu={selectedMenu}
                onOrderSuccess={handleOrderSuccess}
              />
            </div>

            {/* Delivery Section */}
            <DeliverySection />

            {/* Testimonials / Live Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <ReviewsSection onLoginClick={() => setActiveTab('loyalitas')} />
            </div>

            {/* Gallery Section */}
            <GallerySection />

            {/* Location Section */}
            <LocationSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Interactive CTA Banner */}
            <CTASection
              onPesanSekarangClick={() => {
                setSelectedMenu(MENUS[0]);
                scrollToBuilder();
              }}
              onLihatMenuClick={() => {
                const el = document.getElementById('favorite-menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onTambahToppingClick={scrollToBuilder}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-soft flex flex-col justify-between selection:bg-cheese-yellow selection:text-soft-black">
      
      {/* Dynamic Toast Message on WhatsApp order simulation */}
      {showToast && (
        <div
          id="order-success-toast"
          className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs sm:text-sm font-display font-bold py-3.5 px-6 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-green-500 animate-bounce"
        >
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>Mengarahkan ke WhatsApp! Silakan kirim chat otomatis untuk diproses.</span>
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCustomBuilder={() => {
          setSelectedMenu(MENUS[0]);
          setActiveTab('beranda');
          setTimeout(scrollToBuilder, 100);
        }}
      />

      {/* Primary Dynamic Content Frame */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Branded Footer */}
      <Footer onNavClick={(id) => setActiveTab(id)} />

      {/* Sticky Bottom CTA for Mobile users */}
      <div
        id="mobile-sticky-cta-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-soft-black/95 backdrop-blur-md border-t border-cheese-yellow/20 px-4 py-3 z-40 flex items-center justify-between gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🥔</span>
          <div>
            <span className="text-white text-xs font-display font-bold block">POTATO CHEESE</span>
            <span className="text-[9px] text-cheese-yellow font-mono font-bold tracking-wider block">Terminal Pangalengan</span>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedMenu(MENUS[0]);
            setActiveTab('beranda');
            setTimeout(scrollToBuilder, 100);
          }}
          className="bg-cheese-yellow text-soft-black font-display font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md flex items-center gap-1 cursor-pointer"
        >
          <span>Pesan Sekarang</span>
          <span>🧀</span>
        </button>
      </div>

      {/* Floating back-to-top bubble */}
      {showScrollTop && (
        <button
          id="back-to-top-bubble"
          onClick={handleScrollTop}
          className="hidden sm:flex fixed bottom-6 right-6 w-12 h-12 bg-cheese-orange text-white hover:bg-cheese-yellow hover:text-soft-black rounded-full items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-45 cursor-pointer border border-white/20"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
