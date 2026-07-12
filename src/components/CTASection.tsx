import React from 'react';
import { Flame, ShoppingBag, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onPesanSekarangClick: () => void;
  onLihatMenuClick: () => void;
  onTambahToppingClick: () => void;
}

export default function CTASection({ onPesanSekarangClick, onLihatMenuClick, onTambahToppingClick }: CTASectionProps) {
  return (
    <section id="cta-banner-section" className="relative py-24 bg-soft-black text-white overflow-hidden">
      
      {/* Decorative Cheese Lava Flow back glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-96 bg-gradient-to-r from-cheese-yellow/20 via-cheese-orange/20 to-sauce-red/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffc928_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <span className="text-5xl animate-bounce block">🍟🧀🔥</span>

        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Yuk, Buat Potato Cheese Favoritmu Sekarang!
        </h2>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans">
          Pilih varian menu dasar krispi kesukaanmu, tambahkan limpahan topping premium sesukamu, lalu nikmati di tempat atau biarkan kurir kami mengantarkannya hangat-hangat ke rumahmu.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          
          <button
            id="cta-btn-pesan"
            onClick={onPesanSekarangClick}
            className="px-8 py-4 bg-[#FFC928] text-[#8B5E34] hover:bg-[#F59E0B] hover:text-white font-display font-extrabold text-base sm:text-lg rounded-xl border-2 border-[#8B5E34] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>Pesan Sekarang</span>
            <Flame className="w-5 h-5 text-[#D94841] animate-pulse" />
          </button>

          <button
            id="cta-btn-menu"
            onClick={onLihatMenuClick}
            className="px-6 py-4 bg-white text-[#8B5E34] hover:bg-[#FFF6E5] font-display font-bold text-sm sm:text-base rounded-xl border-2 border-[#8B5E34] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
            <span>Lihat Menu Lengkap</span>
          </button>

          <button
            id="cta-btn-topping"
            onClick={onTambahToppingClick}
            className="px-6 py-4 bg-[#FFF6E5] text-[#8B5E34] hover:bg-[#FFC928] font-display font-bold text-sm sm:text-base rounded-xl border-2 border-[#8B5E34]/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Eksplor Topping</span>
          </button>

        </div>

        {/* Short notice */}
        <p className="text-[11px] text-gray-500 font-mono">
          *Pembayaran aman & praktis COD / Transfer setelah pesanan dikonfirmasi via WhatsApp.
        </p>

      </div>
    </section>
  );
}
