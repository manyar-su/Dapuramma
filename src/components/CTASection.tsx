import { Flame, ShoppingBag, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onPesanSekarangClick: () => void;
  onLihatMenuClick: () => void;
  onTambahToppingClick: () => void;
}

export default function CTASection({
  onPesanSekarangClick,
  onLihatMenuClick,
  onTambahToppingClick,
}: CTASectionProps) {
  return (
    <section id="cta-banner-section" className="relative py-24 bg-[#2A0F10] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#f9c74f_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-96 bg-gradient-to-r from-[#8B1E24]/30 via-[#F59E0B]/25 to-[#8B5E34]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <span className="text-5xl block">🧀🍠🥟</span>

        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Jelajahi Menu Dapur Ama Snack per Kategori
        </h2>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans">
          Mulai dari Ubi Creme, Snack, Cilung, Risol, hingga Potachiz. Pilih menunya, atur pesanan, lalu teruskan ke admin.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="cta-btn-pesan"
            onClick={onPesanSekarangClick}
            className="px-8 py-4 bg-[#FFC928] text-[#8B1E24] hover:bg-[#F59E0B] hover:text-white font-display font-extrabold text-base sm:text-lg rounded-xl border-2 border-[#8B1E24] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>Pesan Sekarang</span>
            <Flame className="w-5 h-5 text-[#8B1E24] animate-pulse" />
          </button>

          <button
            id="cta-btn-menu"
            onClick={onLihatMenuClick}
            className="px-6 py-4 bg-white text-[#8B1E24] hover:bg-[#FFF6E5] font-display font-bold text-sm sm:text-base rounded-xl border-2 border-[#8B1E24] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
            <span>Lihat Kategori</span>
          </button>

          <button
            id="cta-btn-topping"
            onClick={onTambahToppingClick}
            className="px-6 py-4 bg-[#FFF6E5] text-[#8B1E24] hover:bg-[#FFC928] font-display font-bold text-sm sm:text-base rounded-xl border-2 border-[#8B1E24]/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Buka Form Order</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 font-mono">
          *Kategori cilung sudah disiapkan di halaman menu dan bisa diisi saat daftar produknya final.
        </p>
      </div>
    </section>
  );
}
