import React from 'react';
import { TOPPINGS } from '../data';
import { Sparkles, HelpCircle, Flame } from 'lucide-react';

interface ToppingSectionProps {
  onCustomizeClick: () => void;
}

export default function ToppingSection({ onCustomizeClick }: ToppingSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = [
    { key: 'meat', label: '🥩 Daging & Protein', desc: 'Topping tebal penuh gizi' },
    { key: 'cheese', label: '🧀 Keju & Lumeran', desc: 'Mulur gurih melimpah' },
    { key: 'sauce', label: '🌶️ Saus Spesial', desc: 'Sensasi rasa menggoda' },
    { key: 'garnish', label: '🌱 Garnish & Taburan', desc: 'Sentuhan krispi aroma' },
  ];

  return (
    <section id="toppings-showcase-section" className="py-20 bg-[#FFF6E5] relative overflow-hidden border-t border-potato-brown/10">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            🧀 Kreasi Tanpa Batas
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Tambahan Topping Sesuai Selera
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Bebaskan imajinasi kulinermu! Tambahkan aneka pilihan topping premium di bawah ini agar Potato Cheese pesananmu terasa lebih mantap dan spesial.
          </p>
        </div>

        {/* Categories grid */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catToppings = TOPPINGS.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key} className="space-y-6">
                
                {/* Category Header */}
                <div className="border-b border-[#8B5E34]/15 pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-display font-black text-xl text-[#8B5E34] flex items-center gap-2">
                    {cat.label}
                  </h3>
                  <span className="text-xs text-[#1E1E1E]/60 font-sans">{cat.desc}</span>
                </div>

                {/* Toppings Cards inside Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catToppings.map((topping) => (
                    <div
                      key={topping.id}
                      className="bg-white hover:bg-cream-soft/10 rounded-2xl p-5 border-2 border-[#8B5E34]/15 shadow-sm hover:shadow-xl hover:border-[#F59E0B] transition-all duration-300 flex items-center gap-4 group"
                    >
                      <div className="w-14 h-14 bg-[#FFF6E5] border border-[#8B5E34]/10 rounded-full flex items-center justify-center text-3xl shadow-inner transform group-hover:scale-110 transition-transform">
                        {topping.image}
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-display font-black text-sm text-[#8B5E34] tracking-tight">
                          {topping.name}
                        </h4>
                        <p className="text-[#1E1E1E]/70 text-[11px] leading-tight line-clamp-2">
                          {topping.description}
                        </p>
                        <span className="font-mono text-xs font-black text-[#D94841] block">
                          +{formatPrice(topping.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Prompt CTA */}
        <div className="mt-16 bg-[#1E1E1E] border-2 border-[#8B5E34] rounded-[2rem] p-8 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#FFC928_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-3xl">🧑‍🍳</span>
            <h3 className="font-display font-black text-2xl text-[#FFC928]">
              Sudah Menemukan Kombinasi Impianmu?
            </h3>
            <p className="text-white/85 text-sm font-sans">
              Campur mozzarella leleh dengan sosis tebal, smoked beef gurih, lalu diguyur saus pedas lava dalam satu wadah. Klik di bawah untuk mulai merakit porsi impianmu!
            </p>
            <button
              onClick={onCustomizeClick}
              className="px-8 py-3.5 bg-[#FFC928] text-[#8B5E34] border-2 border-[#8B5E34] font-display font-black rounded-xl hover:bg-[#F59E0B] hover:text-white hover:scale-105 active:scale-95 transition-all text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Mulai Rancang Sekarang</span>
              <span className="animate-bounce">🔥</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
