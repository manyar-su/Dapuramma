import React, { useState } from 'react';
import { Menu } from '../types';
import { MENUS } from '../data';
import { Sparkles, ShoppingCart, PlusCircle, Info, ChevronRight, Check, Star } from 'lucide-react';
import { getAverageRating } from '../lib/storage';

interface FavoriteMenuProps {
  onSelectMenuForTopping: (menu: Menu) => void;
  onDirectOrder: (menu: Menu) => void;
}

export default function FavoriteMenu({ onSelectMenuForTopping, onDirectOrder }: FavoriteMenuProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'Regular' | 'Medium' | 'Large' | 'Family Box'>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSizeChange = (menuId: string, sizeName: 'Regular' | 'Medium' | 'Large' | 'Family Box') => {
    setSelectedSizes((prev) => ({
      ...prev,
      [menuId]: sizeName,
    }));
  };

  return (
    <section id="favorite-menu-section" className="py-20 bg-white relative border-t border-potato-brown/10">
      {/* Decorative absolute element */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFF6E5] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div id="menu-heading" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            ✨ Pilihan Terlaris
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Menu Potato Cheese Favorit
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Pilih menu dasar favoritmu di bawah ini, sesuaikan ukuran porsi, lalu tambahkan berbagai topping mewah sepuasnya untuk kenikmatan maksimal!
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div id="menu-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MENUS.map((menu) => {
            const currentSize = selectedSizes[menu.id] || menu.sizes[0].name;
            const sizeOption = menu.sizes.find((s) => s.name === currentSize) || menu.sizes[0];
            const calculatedPrice = menu.price + sizeOption.priceAdjustment;

            return (
              <div
                key={menu.id}
                id={`menu-card-${menu.id}`}
                className="bg-[#FFF6E5]/40 rounded-3xl overflow-hidden shadow-sm border-2 border-[#8B5E34]/15 transition-all duration-300 transform hover:-translate-y-2 hover:border-[#F59E0B] hover:shadow-xl flex flex-col group relative"
                onMouseEnter={() => setHoveredCardId(menu.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                
                {/* Visual Image Area */}
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-gray-100 border-b-2 border-[#8B5E34]/15">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  {menu.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-[#D94841] text-white text-[10px] font-display font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>BEST SELLER</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-mono text-xs bg-[#1E1E1E]/90 px-2.5 py-1 rounded-lg border border-white/10 font-bold">
                      Mulai {formatPrice(menu.price)}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-lg text-[#8B5E34] group-hover:text-cheese-orange transition-colors">
                      {menu.name}
                    </h3>
                    
                    {/* Live Average Rating Indicator */}
                    <div className="flex items-center gap-1 text-xs text-[#1E1E1E]/70">
                      <div className="flex text-[#FFC928]">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const ratingData = getAverageRating(menu.id);
                          return (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < Math.round(ratingData.rating) ? 'fill-[#FFC928] text-[#FFC928]' : 'text-gray-300'}`}
                            />
                          );
                        })}
                      </div>
                      <span className="font-bold text-[#8B5E34]">{getAverageRating(menu.id).rating}</span>
                      <span className="text-[10px] text-[#1E1E1E]/50">({getAverageRating(menu.id).count} Ulasan)</span>
                    </div>

                    <p className="text-[#1E1E1E]/70 text-xs leading-relaxed line-clamp-3">
                      {menu.description}
                    </p>
                  </div>

                  {/* Size Selectors (Compacted & Interactive) */}
                  <div className="space-y-1.5 pt-2 border-t border-[#8B5E34]/10">
                    <span className="text-[10px] font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                      Pilih Ukuran Porsi:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {menu.sizes.map((sz) => {
                        const isSelected = currentSize === sz.name;
                        return (
                          <button
                            key={sz.name}
                            onClick={() => handleSizeChange(menu.id, sz.name)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#FFC928] text-[#8B5E34] border-[#8B5E34] shadow-sm scale-105'
                                : 'bg-white text-[#1E1E1E]/80 border-[#8B5E34]/10 hover:bg-[#FFF6E5]'
                            }`}
                          >
                            {sz.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Pricing display */}
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-xs text-[#1E1E1E]/60 font-sans">Total Harga:</span>
                    <span className="text-xl font-display font-black text-[#D94841]">
                      {formatPrice(calculatedPrice)}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      id={`btn-topping-${menu.id}`}
                      onClick={() => {
                        // Pass menu but with size configuration
                        const configuredMenu = { ...menu };
                        onSelectMenuForTopping({
                          ...configuredMenu,
                          price: calculatedPrice,
                          // Maintain size index based on selected
                          sizes: menu.sizes.filter(s => s.name === currentSize)
                        });
                      }}
                      className="bg-white border-2 border-[#8B5E34] hover:bg-[#FFF6E5] text-[#8B5E34] font-display font-bold text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer hover:scale-105"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Topping</span>
                    </button>

                    <button
                      id={`btn-pesan-${menu.id}`}
                      onClick={() => {
                        const configuredMenu = { ...menu };
                        onDirectOrder({
                          ...configuredMenu,
                          price: calculatedPrice,
                          sizes: menu.sizes.filter(s => s.name === currentSize)
                        });
                      }}
                      className="bg-[#F59E0B] text-white hover:bg-[#FFC928] hover:text-[#8B5E34] font-display font-bold text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer hover:scale-105"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Pesan</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
