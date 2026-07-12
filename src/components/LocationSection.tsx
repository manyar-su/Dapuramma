import React from 'react';
import { MapPin, Clock, Compass, PhoneCall, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.555901303867!2d107.56475657476!3d-7.20019629280521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bf53c89ccfd3%3A0x6b864195155f9cfb!2sTerminal%20Pangalengan!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid";
  const googleMapsLink = "https://maps.google.com/?q=Terminal+Pangalengan";

  const handleRouteQuery = () => {
    const text = 'Halo Potato Cheese Pangalengan, saya sedang menuju ke sana tapi masih bingung patokannya. Bisa bantu shareloc atau infokan patokan terdekat dari Terminal?';
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location-section" className="py-20 bg-white relative border-t border-potato-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            📍 TEMPAT KAMI
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            Lokasi Terminal Pangalengan
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-sm sm:text-base font-sans">
            Sangat strategis dan mudah dicari! Booth kami berada tepat di pusat keramaian Terminal Pangalengan, siap melayani rasa lapar dan keinginan kejumu.
          </p>
        </div>

        {/* 2-Column Info & Map Frame Layout */}
        <div id="location-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#FFF6E5] rounded-[2rem] p-8 border-2 border-[#8B5E34]/15 space-y-6 shadow-md">
              
              {/* Address Title */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#FFC928] text-[#8B5E34] border border-[#8B5E34]/20 rounded-2xl flex items-center justify-center relative shrink-0">
                  <MapPin className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D94841] rounded-full animate-ping" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-[#8B5E34]">
                    Alamat Lengkap
                  </h3>
                  <p className="text-[#1E1E1E]/75 text-xs sm:text-sm font-sans leading-relaxed">
                    Area Terminal Pangalengan, Jl. Raya Pangalengan, Pangalengan, Kec. Pangalengan, Kabupaten Bandung, Jawa Barat 40378
                  </p>
                </div>
              </div>

              {/* Patokan / Landmark */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#FFC928]/20 text-[#8B5E34] border border-[#8B5E34]/15 rounded-2xl flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-[#8B5E34]">
                    Patokan Booth
                  </h3>
                  <p className="text-[#1E1E1E]/75 text-xs sm:text-sm font-sans leading-relaxed">
                    Tepat di sebelah loket bus utama terminal, bersebelahan dengan pangkalan ojek terminal. Cari booth semi-kontainer kuning mencolok dengan spanduk "POTATO CHEESE PANGALENGAN".
                  </p>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-soft-black">
                    Jam Operasional
                  </h3>
                  <div className="text-[#1E1E1E]/75 text-xs sm:text-sm font-sans space-y-0.5">
                    <p className="font-bold text-emerald-700">Setiap Hari: 10:00 - 21:00 WIB</p>
                    <p className="text-[11px] opacity-75">*Tetap buka di hari libur nasional & akhir pekan</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Navigation CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#FFC928] text-[#8B5E34] hover:bg-[#F59E0B] hover:text-white border-2 border-[#8B5E34] font-display font-black text-sm rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleRouteQuery}
                className="px-6 py-3.5 bg-white border-2 border-[#8B5E34]/25 text-[#8B5E34] font-display font-black text-sm rounded-xl hover:bg-[#FFF6E5] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Tanya Patokan (WA)</span>
                <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
              </button>
            </div>

          </div>

          {/* Right Column: Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 h-[350px] sm:h-[450px] rounded-[2.5rem] overflow-hidden border-4 border-[#8B5E34]/15 shadow-2xl relative group">
            
            {/* Interactive Pulse Ping Overlay on map */}
            <div className="absolute top-4 left-4 z-10 bg-[#1E1E1E]/90 text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#FFC928] rounded-full animate-ping" />
              <span>Lokasi Valid Terminal Pangalengan</span>
            </div>

            <iframe
              src={mapUrl}
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Potato Cheese Pangalengan"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
