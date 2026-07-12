import { ChefHat, MapPin, Package, ShoppingBag, Sparkles, Truck } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Kategori Lebih Jelas',
      desc: 'Menu kini dipisah menjadi Ubi Creme, Snack, Cilung, Risol, dan Potachiz agar lebih mudah dicari.',
      icon: ShoppingBag,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Mengikuti Materi Promosi',
      desc: 'Daftar produk dan harga utama disusun ulang berdasarkan poster menu Dapur Ama Snack yang Anda kirim.',
      icon: Sparkles,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Visual Brand Konsisten',
      desc: 'Logo Dapur Ama, warna marun-keemasan, dan foto menu kini menjadi identitas utama halaman.',
      icon: ChefHat,
      color: 'bg-red-100 text-red-700',
    },
    {
      title: 'Form Order Langsung',
      desc: 'Pengunjung bisa memilih menu, ukuran, tambahan, jumlah, lalu meneruskan format order ke admin.',
      icon: Package,
      color: 'bg-orange-100 text-orange-700',
    },
    {
      title: 'Cocok untuk Harian & Acara',
      desc: 'Risol satuan, paket risol, potachiz jumbo, hingga menu snack box semua bisa dipakai untuk kebutuhan berbeda.',
      icon: Truck,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Lokasi Terminal Pangalengan',
      desc: 'Semua copy utama sudah diarahkan ke outlet Dapur Ama Snack di area Terminal Pangalengan.',
      icon: MapPin,
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-[#FFF6E5] relative overflow-hidden border-t border-potato-brown/10">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFC928]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Keunggulan Halaman
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Struktur Baru untuk Dapur Ama Snack
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Fokusnya bukan lagi potato cheese generik, tetapi katalog Dapur Ama Snack yang lebih rapi, spesifik, dan siap dipakai.
          </p>
        </div>

        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-3xl border-2 border-[#8B5E34]/15 transition-all duration-300 hover:border-[#F59E0B] hover:shadow-xl flex flex-col space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${feature.color} transform group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-[#8B5E34]">
                    {feature.title}
                  </h3>
                  <p className="text-[#1E1E1E]/70 text-xs sm:text-sm leading-relaxed font-sans">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
