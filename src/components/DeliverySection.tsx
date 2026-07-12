import { CheckCircle, Truck } from 'lucide-react';
import { WHATSAPP_URL } from '../data';

export default function DeliverySection() {
  const options = [
    {
      title: 'Ambil Langsung di Terminal',
      icon: '🍽️',
      description:
        'Pengunjung bisa langsung datang ke area Terminal Pangalengan untuk mengambil menu Potachiz, Ubi Creme, Snack, atau Risol.',
      points: ['Mudah untuk pembelian satuan', 'Bisa cek stok varian langsung', 'Cocok untuk pembeli harian'],
      border: 'border-2 border-[#8B5E34]/15',
    },
    {
      title: 'Order via WhatsApp',
      icon: '📲',
      description:
        'Form order di web ini menyusun pesan otomatis supaya admin lebih cepat konfirmasi kategori, ukuran, dan tambahan.',
      points: ['Format menu lebih rapi', 'Cocok untuk pre-order', 'Lebih cepat untuk paket acara'],
      border: 'border-2 border-[#F59E0B]',
      highlight: true,
    },
    {
      title: 'Paket Acara & Sharing',
      icon: '📦',
      description:
        'Paket risol, snack box, atau pembelian beberapa menu sekaligus bisa diproses untuk kebutuhan rapat, sekolah, dan keluarga.',
      points: ['Bisa pesan jumlah banyak', 'Pilihan menu lebih fleksibel', 'Mudah untuk kebutuhan konsumsi'],
      border: 'border-2 border-[#8B5E34]/15',
    },
  ];

  const handleCheckOrder = () => {
    const text =
      'Halo Dapur Ama Snack, saya ingin bertanya tentang pemesanan menu, stok, dan opsi paket acara.';
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="delivery-section" className="py-20 bg-[#FFF6E5] relative border-t border-potato-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Pemesanan
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Jalur Order yang Lebih Praktis
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Struktur order kini disesuaikan untuk menu Dapur Ama Snack yang lebih variatif daripada versi web sebelumnya.
          </p>
        </div>

        <div id="delivery-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((option) => (
            <div
              key={option.title}
              className={`rounded-3xl p-8 ${option.border} bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-6 relative`}
            >
              {option.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8B1E24] text-white text-[10px] font-display font-bold px-3 py-1 rounded-full tracking-wider shadow-md">
                  REKOMENDASI
                </span>
              )}

              <div className="space-y-4">
                <span className="text-5xl block">{option.icon}</span>
                <h3 className="font-display font-black text-xl text-[#8B5E34]">{option.title}</h3>
                <p className="text-[#1E1E1E]/70 text-xs sm:text-sm leading-relaxed">{option.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#8B5E34]/15">
                {option.points.map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-[#1E1E1E]/80 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white border-2 border-[#8B5E34]/15 rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#FFC928]/20 rounded-full flex items-center justify-center text-[#8B5E34] shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-black text-lg text-[#8B5E34]">
                Butuh Konfirmasi Paket, Stok, atau Pengambilan?
              </h4>
              <p className="text-[#1E1E1E]/70 text-xs sm:text-sm font-sans">
                Hubungi admin lewat WhatsApp untuk memastikan ketersediaan menu Dapur Ama Snack.
              </p>
            </div>
          </div>
          <button
            onClick={handleCheckOrder}
            className="px-6 py-3 bg-[#8B1E24] hover:bg-[#A52A2A] text-white font-display font-bold text-sm rounded-xl transition-all text-center cursor-pointer shadow-md"
          >
            Chat Admin Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
