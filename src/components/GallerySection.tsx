import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery-section" className="py-20 bg-[#FFF6E5] relative border-t border-potato-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Galeri Brand
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Visual Menu dari Materi Dapur Ama
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/75 text-sm sm:text-base font-sans">
            Empat visual utama dipakai sebagai dasar branding dan penyusunan kategori menu di halaman ini.
          </p>
        </div>

        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="bg-white rounded-[2rem] overflow-hidden border-2 border-[#8B5E34]/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/95 border border-[#8B5E34]/15 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#FFC928] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-base leading-tight">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
            <img src={selectedImage} alt="Galeri menu Dapur Ama" className="w-full h-auto object-contain max-h-[80vh]" />
            <div className="absolute top-4 right-4 bg-black/75 px-3 py-1.5 rounded-full text-white text-xs font-mono font-bold">
              Klik untuk menutup
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
