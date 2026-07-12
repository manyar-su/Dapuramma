import React from 'react';
import { Truck, CheckCircle, Smartphone, MapPin, Clock } from 'lucide-react';

export default function DeliverySection() {
  const options = [
    {
      title: 'Makan di Tempat / Ambil Langsung',
      icon: '🚶‍♂️',
      description: 'Langsung kunjungi booth semi-kontainer kami di Terminal Pangalengan. Nikmati kentang goreng dadakan super renyah dengan keju lava selagi mengepul panas.',
      points: ['Digoreng dadakan 5-7 menit', 'Area duduk bersih & santai', 'Buka setiap hari 10:00 - 21:00'],
      bg: 'bg-white',
      border: 'border-2 border-[#8B5E34]/15',
    },
    {
      title: 'Delivery Area Pangalengan',
      icon: '🛵',
      description: 'Malas keluar rumah atau villa? Santai saja, kurir kami siap mengantarkan Potato Cheese hangat langsung ke pintu rumah, hotel, sekolah, atau camping ground kamu.',
      points: ['Pengantaran cepat 15-30 menit', 'Kemasan tray tahan panas eksklusif', 'Saus keju tetap lumer & hangat'],
      bg: 'bg-white',
      border: 'border-2 border-[#F59E0B]',
      highlight: true,
    },
    {
      title: 'Pre-Order / Partai Besar',
      icon: '📦',
      description: 'Punya acara kumpul keluarga, arisan, rapat kantor, atau gathering di villa Pangalengan? Pesan porsi besar (Family Box) jauh-jauh hari dengan harga spesial.',
      points: ['Min. pemesanan H-1 untuk diskon', 'Pilihan custom rasa beraneka', 'Dilengkapi aneka saus cocolan terpisah'],
      bg: 'bg-white',
      border: 'border-2 border-[#8B5E34]/15',
    },
  ];

  const handleCheckOngkir = () => {
    const text = 'Halo Potato Cheese Pangalengan, saya mau tanya kisaran ongkir pengiriman ke alamat saya: \n\nNama penerima:\nAlamat detail:\nPatokan lokasi:';
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="delivery-section" className="py-20 bg-[#FFF6E5] relative border-t border-potato-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            🛵 LAYANAN ANTAR
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Bisa Dinikmati di Tempat atau Dikirim
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Kami berkomitmen memberikan kemudahan terbaik bagi setiap pelanggan. Pilih cara menikmati Potato Cheese Pangalengan favoritmu!
          </p>
        </div>

        {/* 3 Delivery Cards */}
        <div id="delivery-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 ${opt.border} ${opt.bg} shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-6 relative`}
            >
              {opt.highlight && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#D94841] text-white text-[10px] font-display font-bold px-3 py-1 rounded-full tracking-wider shadow-md">
                  REKOMENDASI PRAKTIS 🚀
                </span>
              )}

              <div className="space-y-4">
                <span className="text-5xl block">{opt.icon}</span>
                <h3 className="font-display font-black text-xl text-[#8B5E34]">
                  {opt.title}
                </h3>
                <p className="text-[#1E1E1E]/70 text-xs sm:text-sm leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#8B5E34]/15">
                {opt.points.map((p, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2.5 text-[#1E1E1E]/80 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Ongkir Checker Banner */}
        <div className="mt-16 bg-white border-2 border-[#8B5E34]/15 rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#FFC928]/20 rounded-full flex items-center justify-center text-[#8B5E34] shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-black text-lg text-[#8B5E34]">
                Ingin Cek Ongkir ke Villa / Rumah Kamu?
              </h4>
              <p className="text-[#1E1E1E]/70 text-xs sm:text-sm font-sans">
                Hubungi kami via WhatsApp, infokan lokasi atau bagikan shareloc. Kami hitung ongkir termurah langsung!
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleCheckOngkir}
              className="px-6 py-3 bg-[#F59E0B] hover:bg-[#FFC928] hover:text-[#8B5E34] text-white font-display font-bold text-sm rounded-xl transition-all text-center cursor-pointer shadow-md border border-[#8B5E34]/10"
            >
              Cek Ongkir via WhatsApp
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
