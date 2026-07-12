import React from 'react';
import { MapPin, Phone, Instagram, Send, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const links = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Menu Terlaris', id: 'menu' },
    { label: 'Eksplor Topping', id: 'topping' },
    { label: 'Layanan Pengiriman', id: 'pengiriman' },
    { label: 'Peta Lokasi', id: 'lokasi' },
    { label: 'Pertanyaan FAQ', id: 'faq' },
    { label: 'Kontak WhatsApp', id: 'kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-soft-black text-gray-400 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sauce-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand & Desc (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('beranda')}>
              <span className="text-3xl">🥔</span>
              <div>
                <span className="font-display font-extrabold text-xl text-[#FFC928] block tracking-tight">
                  POTATO CHEESE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] font-bold uppercase block -mt-1">
                  Pangalengan
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed max-w-sm">
              Sajian kentang potong krispi premium bermandikan saus keju creamy yang gurih dan kustomisasi topping mewah sesukamu. Nikmat tiada tara, berlokasi hangat di Terminal Pangalengan!
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#FFC928] hover:text-[#1E1E1E] rounded-xl flex items-center justify-center transition-all cursor-pointer border border-white/10"
                title="Pesan via WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#F59E0B] hover:text-white rounded-xl flex items-center justify-center transition-all cursor-pointer border border-white/10"
                title="Ikuti Kami di Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFC928] mb-5">
              Menu Navigasi
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-gray-400 hover:text-[#FFC928] transition-colors text-sm text-left cursor-pointer font-sans"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info (4 cols) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFC928] mb-5">
              Hubungi Kami
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <span className="font-semibold text-white block">Booth Terminal Pangalengan</span>
                <span className="text-gray-400 text-xs">
                  Samping loket bus utama, Kec. Pangalengan, Kab. Bandung, Jawa Barat
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <span className="font-semibold text-white block">Jam Operasional</span>
                <span className="text-gray-400 text-xs">
                  Buka setiap hari dari pukul 10:00 s.d. 21:00 WIB (Koki digoreng fresh dadakan)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 POTATO CHEESE PANGALENGAN. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dibuat dengan rasa cinta kuliner</span>
            <Heart className="w-3.5 h-3.5 text-sauce-red fill-sauce-red" />
            <span>di Pangalengan</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
