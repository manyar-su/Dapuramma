import { useState } from 'react';
import { ShoppingCart, Sparkles, Star } from 'lucide-react';
import { MENUS, MENU_CATEGORIES } from '../data';
import { getAverageRating } from '../lib/storage';
import type { Menu } from '../types';

interface FavoriteMenuProps {
  onOrder: (menu: Menu) => void;
}

export default function FavoriteMenu({ onOrder }: FavoriteMenuProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof MENU_CATEGORIES)[number]>('Ubi Creme');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const filteredMenus = MENUS.filter((menu) => menu.category === activeCategory);

  const handleSizeChange = (menuId: string, sizeName: string) => {
    setSelectedSizes((previous) => ({
      ...previous,
      [menuId]: sizeName,
    }));
  };

  return (
    <section id="favorite-menu-section" className="py-20 bg-white relative border-t border-potato-brown/10">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFF6E5] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="menu-heading" className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Kategori Menu
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Menu Dapur Ama Snack
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Halaman menu sekarang dipisah per kategori: Ubi Creme, Snack, Cilung, Risol, dan Potachiz.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-display font-bold text-sm border-2 transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#8B1E24] text-white border-[#8B1E24] shadow-lg'
                  : 'bg-[#FFF6E5] text-[#8B5E34] border-[#8B5E34]/15 hover:bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredMenus.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-[#FFF6E5] border-2 border-dashed border-[#8B5E34]/20 rounded-[2rem] px-8 py-14 text-center">
            <h3 className="font-display font-black text-2xl text-[#8B5E34] mb-3">
              Kategori {activeCategory} sedang disiapkan
            </h3>
            <p className="text-sm text-[#1E1E1E]/70">
              Struktur kategorinya sudah dibuat di halaman menu. Isi menu untuk kategori ini bisa ditambahkan begitu foto atau daftar produknya sudah final.
            </p>
          </div>
        ) : (
          <div id="menu-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenus.map((menu) => {
              const currentSize = selectedSizes[menu.id] || menu.sizes[0].name;
              const sizeOption = menu.sizes.find((size) => size.name === currentSize) || menu.sizes[0];
              const calculatedPrice = menu.price + sizeOption.priceAdjustment;
              const ratingData = getAverageRating(menu.id);

              return (
                <div
                  key={menu.id}
                  id={`menu-card-${menu.id}`}
                  className="bg-[#FFF6E5]/40 rounded-3xl overflow-hidden shadow-sm border-2 border-[#8B5E34]/15 transition-all duration-300 hover:-translate-y-2 hover:border-[#F59E0B] hover:shadow-xl flex flex-col group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 border-b-2 border-[#8B5E34]/15">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-white/95 text-[#8B5E34] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {menu.category}
                      </span>
                      {menu.isBestSeller && (
                        <span className="bg-[#D94841] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="font-mono text-xs bg-[#1E1E1E]/90 px-2.5 py-1 rounded-lg border border-white/10 font-bold">
                        Mulai {formatPrice(menu.price)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display font-black text-lg text-[#8B5E34] group-hover:text-cheese-orange transition-colors">
                        {menu.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#1E1E1E]/70">
                        <div className="flex text-[#FFC928]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-3.5 h-3.5 ${
                                index < Math.round(ratingData.rating)
                                  ? 'fill-[#FFC928] text-[#FFC928]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-[#8B5E34]">{ratingData.rating}</span>
                        <span className="text-[10px] text-[#1E1E1E]/50">({ratingData.count} ulasan)</span>
                      </div>
                      <p className="text-[#1E1E1E]/70 text-xs leading-relaxed line-clamp-3">
                        {menu.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#8B5E34]/10">
                      <span className="text-[10px] font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                        Pilih Ukuran:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {menu.sizes.map((size) => {
                          const isSelected = currentSize === size.name;
                          return (
                            <button
                              key={size.name}
                              onClick={() => handleSizeChange(menu.id, size.name)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#FFC928] text-[#8B5E34] border-[#8B5E34] shadow-sm scale-105'
                                  : 'bg-white text-[#1E1E1E]/80 border-[#8B5E34]/10 hover:bg-[#FFF6E5]'
                              }`}
                            >
                              {size.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-2">
                      <span className="text-xs text-[#1E1E1E]/60 font-sans">Harga terpilih:</span>
                      <span className="text-xl font-display font-black text-[#D94841]">
                        {formatPrice(calculatedPrice)}
                      </span>
                    </div>

                    <button
                      id={`btn-pesan-${menu.id}`}
                      onClick={() =>
                        onOrder({
                          ...menu,
                          price: calculatedPrice,
                          sizes: menu.sizes.filter((size) => size.name === currentSize),
                        })
                      }
                      className="bg-[#8B1E24] text-white hover:bg-[#A52A2A] font-display font-bold text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Pilih untuk Dipesan</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
