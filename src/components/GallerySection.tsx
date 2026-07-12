import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { Maximize2, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filters = ['Semua', 'Menu Utama', 'Detail Topping', 'Proses Dapur', 'Packaging'];

  const filteredItems = activeFilter === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="gallery-section" className="py-20 bg-[#FFF6E5] relative border-t border-potato-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            <span>📷 GALERI KULINER</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Galeri Menu yang Bikin Lapar
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/75 text-sm sm:text-base font-sans">
            Lihat lelehan keju lumer, taburan topping garing, dan proses penyajian higienis kami. Dijamin bikin kamu langsung pengen order!
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                activeFilter === filter
                  ? 'bg-[#F59E0B] text-white border-[#8B5E34] shadow-md scale-105'
                  : 'bg-white text-[#8B5E34] border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="bg-white rounded-[2rem] overflow-hidden border-2 border-[#8B5E34]/15 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer relative"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                
                {/* Search hover indicator */}
                <div className="absolute top-4 right-4 bg-white/95 border border-[#8B5E34]/15 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#F59E0B]" />
                </div>

                {/* Info Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#FFC928] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-lg leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
            <img
              src={selectedImage}
              alt="Mouth-watering close up"
              className="w-full h-auto object-contain max-h-[80vh] pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-black/75 px-3 py-1.5 rounded-full text-white text-xs font-mono font-bold">
              Klik di mana saja untuk menutup ❌
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
