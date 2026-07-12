import React from 'react';
import { ChefHat, Flame, Sparkles, Box, Truck, MapPin } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Dibuat Selalu Fresh',
      desc: 'Kentang digoreng dadakan saat pesanan masuk. Disajikan panas-panas, renyah gurih di luar dan lembut pulen di dalam.',
      icon: ChefHat,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Saus Keju Creamy Melimpah',
      desc: 'Guyuran saus keju cheddar lava pilihan dengan tekstur kental yang gurih asin manis khas kuliner kekinian.',
      icon: Flame,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Topping Bisa Bebas Custom',
      desc: 'Mulai dari Mozzarella bakar, smoked beef asap, sosis sapi, hingga nori rumput laut. Rancang porsi impianmu sendiri!',
      icon: Sparkles,
      color: 'bg-orange-100 text-orange-700',
    },
    {
      title: 'Pilihan Porsi Fleksibel',
      desc: 'Tersedia ukuran Regular yang hemat, Medium, Large yang bikin puas, hingga Family Box jumbo untuk dimakan beramai-ramai.',
      icon: Box,
      color: 'bg-red-100 text-red-700',
    },
    {
      title: 'Kurir Delivery Siaga',
      desc: 'Melayani pesan antar cepat untuk wilayah Pangalengan. Pesanan terbungkus rapi dalam kemasan tahan panas berkualitas.',
      icon: Truck,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Lokasi Strategis & Nyaman',
      desc: 'Berlokasi tepat di Terminal Pangalengan. Sangat gampang diakses oleh pejalan kaki, penumpang bus, maupun kendaraan pribadi.',
      icon: MapPin,
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-[#FFF6E5] relative overflow-hidden border-t border-potato-brown/10">
      {/* Visual back glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFC928]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            ⭐ KELEBIHAN KAMI
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Kenapa Harus Potato Cheese Pangalengan?
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Kami menjamin kepuasan rasa dan layanan di setiap gigitan kentang keju yang kami sajikan hangat untukmu.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white hover:bg-cream-soft/10 p-8 rounded-3xl border-2 border-[#8B5E34]/15 transition-all duration-300 hover:border-[#F59E0B] hover:shadow-xl flex flex-col space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${feat.color} transform group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-[#8B5E34] group-hover:text-cheese-orange transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-[#1E1E1E]/70 text-xs sm:text-sm leading-relaxed font-sans">
                    {feat.desc}
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
