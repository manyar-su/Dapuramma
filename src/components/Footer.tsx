import { Clock, Heart, Instagram, MapPin, Phone } from 'lucide-react';
import { INSTAGRAM_URL, LOCATION_NAME, WHATSAPP_URL } from '../data';
import logoImage from '../assets/dapur-ama/logo.png';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const links = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Kategori Menu', id: 'menu' },
    { label: 'Pengiriman', id: 'pengiriman' },
    { label: 'Lokasi', id: 'lokasi' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Kontak', id: 'kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-soft-black text-gray-400 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sauce-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('beranda')}>
              <img src={logoImage} alt="Logo Dapur Ama" className="w-14 h-14 rounded-full object-cover border border-white/10" />
              <div>
                <span className="font-display font-extrabold text-xl text-[#FFC928] block tracking-tight">
                  DAPUR AMA
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] font-bold uppercase block -mt-1">
                  Snack Pangalengan
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed max-w-sm">
              Katalog web ini sekarang disesuaikan untuk Dapur Ama Snack dengan fokus kategori Ubi Creme, Snack, Cilung, Risol, dan Potachiz.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#FFC928] hover:text-[#1E1E1E] rounded-xl flex items-center justify-center transition-all cursor-pointer border border-white/10"
                title="Pesan via WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#F59E0B] hover:text-white rounded-xl flex items-center justify-center transition-all cursor-pointer border border-white/10"
                title="Instagram Dapur Ama Snack"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 text-left">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFC928] mb-5">
              Navigasi
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

          <div className="lg:col-span-4 text-left space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFC928] mb-5">
              Info Outlet
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <span className="font-semibold text-white block">{LOCATION_NAME}</span>
                <span className="text-gray-400 text-xs">Kabupaten Bandung, Jawa Barat</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <span className="font-semibold text-white block">Jam Operasional</span>
                <span className="text-gray-400 text-xs">Setiap hari, sekitar 10:00 - 21:00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 DAPUR AMA SNACK. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Disusun ulang untuk katalog menu yang lebih rapi</span>
            <Heart className="w-3.5 h-3.5 text-sauce-red fill-sauce-red" />
            <span>di Pangalengan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
