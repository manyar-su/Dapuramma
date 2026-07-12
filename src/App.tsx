import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Check, MessageCircle } from 'lucide-react';
import { MENUS, WHATSAPP_URL } from './data';
import type { Menu } from './types';
import CTASection from './components/CTASection';
import CustomBuilder from './components/CustomBuilder';
import DeliverySection from './components/DeliverySection';
import FavoriteMenu from './components/FavoriteMenu';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import Hero from './components/Hero';
import LocationSection from './components/LocationSection';
import Navbar from './components/Navbar';
import FAQSection from './components/FAQSection';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const scrollToOrder = () => {
    if (orderRef.current) {
      orderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePickMenu = (menu: Menu) => {
    setSelectedMenu(menu);
    setActiveTab('beranda');
    setTimeout(scrollToOrder, 100);
  };

  const handleOrderSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <div className="pt-24 min-h-screen">
            <FavoriteMenu onOrder={handlePickMenu} />
            <CTASection
              onPesanSekarangClick={() => handlePickMenu(MENUS[0])}
              onLihatMenuClick={() => {}}
              onTambahToppingClick={scrollToOrder}
            />
          </div>
        );
      case 'pengiriman':
        return (
          <div className="pt-24 min-h-screen">
            <DeliverySection />
            <CTASection
              onPesanSekarangClick={() => handlePickMenu(MENUS[0])}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={scrollToOrder}
            />
          </div>
        );
      case 'lokasi':
        return (
          <div className="pt-24 min-h-screen">
            <LocationSection />
            <CTASection
              onPesanSekarangClick={() => handlePickMenu(MENUS[0])}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={scrollToOrder}
            />
          </div>
        );
      case 'faq':
        return (
          <div className="pt-24 min-h-screen">
            <FAQSection />
            <CTASection
              onPesanSekarangClick={() => handlePickMenu(MENUS[0])}
              onLihatMenuClick={() => setActiveTab('menu')}
              onTambahToppingClick={scrollToOrder}
            />
          </div>
        );
      case 'kontak':
        return (
          <div className="pt-24 min-h-screen">
            <LocationSection />
            <div className="py-12 bg-white text-center space-y-4">
              <h3 className="font-display font-bold text-2xl text-soft-black">
                Butuh Bantuan Order atau Pre-Order?
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Hubungi admin Dapur Ama Snack untuk pemesanan harian, paket acara, atau konfirmasi stok menu.
              </p>
              <a
                href={`${WHATSAPP_URL}?text=Halo%20Dapur%20Ama%20Snack%2C%20saya%20ingin%20bertanya%20tentang%20menu%20dan%20pemesanan.`}
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
            <Hero
              onOrderClick={() => handlePickMenu(MENUS[0])}
              onViewMenuClick={() => {
                const element = document.getElementById('favorite-menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FavoriteMenu onOrder={handlePickMenu} />
            <div ref={orderRef} className="scroll-mt-20">
              <CustomBuilder initialMenu={selectedMenu} onOrderSuccess={handleOrderSuccess} />
            </div>
            <DeliverySection />
            <GallerySection />
            <LocationSection />
            <FAQSection />
            <CTASection
              onPesanSekarangClick={() => handlePickMenu(MENUS[0])}
              onLihatMenuClick={() => {
                const element = document.getElementById('favorite-menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              onTambahToppingClick={scrollToOrder}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-soft flex flex-col justify-between selection:bg-cheese-yellow selection:text-soft-black">
      {showToast && (
        <div
          id="order-success-toast"
          className="fixed top-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs sm:text-sm font-display font-bold py-3.5 px-6 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-green-500"
        >
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>Format pesanan siap dikirim ke WhatsApp admin.</span>
        </div>
      )}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCustomBuilder={() => handlePickMenu(MENUS[0])}
      />

      <main className="flex-grow">{renderActiveView()}</main>

      <Footer onNavClick={(id) => setActiveTab(id)} />

      <div
        id="mobile-sticky-cta-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-soft-black/95 backdrop-blur-md border-t border-cheese-yellow/20 px-4 py-3 z-40 flex items-center justify-between gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-2">
          <img
            src="/favicon-logo.png"
            alt="Logo Dapur Ama"
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <span className="text-white text-xs font-display font-bold block">DAPUR AMA SNACK</span>
            <span className="text-[9px] text-cheese-yellow font-mono font-bold tracking-wider block">
              Terminal Pangalengan
            </span>
          </div>
        </div>
        <button
          onClick={() => handlePickMenu(MENUS[0])}
          className="bg-cheese-yellow text-soft-black font-display font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md flex items-center gap-1 cursor-pointer"
        >
          <span>Pesan</span>
          <span>🧀</span>
        </button>
      </div>

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
