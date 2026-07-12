import React from 'react';
import { ArrowRight, Flame, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onViewMenuClick: () => void;
}

export default function Hero({ onOrderClick, onViewMenuClick }: HeroProps) {
  // Let's define the floating toppings that make the screen feel delicious, and let users interact with them!
  const floatingToppings = [
    { name: 'Keju Mozzarella', emoji: '🧀', x: '10%', y: '12%', color: 'bg-cheese-yellow' },
    { name: 'Sosis Sapi', emoji: '🌭', x: '82%', y: '15%', color: 'bg-orange-500' },
    { name: 'Beef Slice', emoji: '🥓', x: '5%', y: '75%', color: 'bg-sauce-red' },
    { name: 'Crispy Onion', emoji: '🧅', x: '85%', y: '70%', color: 'bg-potato-brown' },
  ];

  const valueProps = [
    'Bisa Custom Topping Sesukamu',
    'Saus Keju Creamy Melimpah',
    'Melayani Delivery Area Pangalengan',
    'Lokasi Strategis di Terminal Pangalengan',
  ];

  return (
    <header
      id="hero-header"
      className="relative min-h-screen bg-[#FFF6E5] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Decorative Warm Backglow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFC928]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#8B5E34_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div id="hero-left-col" className="lg:col-span-6 text-left flex flex-col justify-center">
            
            {/* Tagline Badge */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                Jajanan Hangat Terminal Pangalengan
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[60px] leading-[1.05] font-black text-[#8B5E34] mb-6 font-display">
              Potato Cheese <br/> <span className="text-[#F59E0B]">Lumer & Renyah</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-[#1E1E1E]/70 max-w-md mb-8 leading-relaxed font-sans">
              Kentang renyah, saus keju creamy, dan pilihan topping favorit yang bisa kamu custom sendiri. Dinikmati hangat langsung dari panggangan.
            </p>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFC928] flex items-center justify-center border border-potato-brown/20 shadow-sm">
                  <svg className="w-4 h-4 text-[#8B5E34]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-bold text-[#1E1E1E]/90">Custom Topping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFC928] flex items-center justify-center border border-potato-brown/20 shadow-sm">
                  <svg className="w-4 h-4 text-[#8B5E34]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-bold text-[#1E1E1E]/90">Saus Keju Melimpah</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFC928] flex items-center justify-center border border-potato-brown/20 shadow-sm">
                  <svg className="w-4 h-4 text-[#8B5E34]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-bold text-[#1E1E1E]/90">Bisa Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFC928] flex items-center justify-center border border-potato-brown/20 shadow-sm">
                  <svg className="w-4 h-4 text-[#8B5E34]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-bold text-[#1E1E1E]/90">Terminal Pangalengan</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                id="hero-primary-cta"
                onClick={onOrderClick}
                className="bg-[#D94841] text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-red-200/50 hover:scale-105 hover:bg-[#c13e38] transition-all cursor-pointer"
              >
                Pesan via WhatsApp
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onViewMenuClick}
                className="bg-white border-2 border-[#8B5E34] text-[#8B5E34] px-8 py-3.5 rounded-2xl font-bold text-base sm:text-lg hover:bg-[#FFF6E5] transition-all cursor-pointer"
              >
                Lihat Daftar Menu
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-[#8B5E34]/15 text-[#1E1E1E]/60 text-xs sm:text-sm">
              <span className="flex text-[#FFC928] text-base">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-[#8B5E34]">4.9/5 Rating dari 500+ Pecinta Kuliner</span>
            </div>
          </div>

          {/* Right Column - Mouth-Watering Visual Interactive Stage */}
          <div id="hero-right-col" className="lg:col-span-6 relative flex justify-center items-center py-10 lg:py-0">
            
            {/* Stage Background circle */}
            <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-[#FFC928]/15 rounded-full blur-3xl -z-10" />

            {/* Main Culinary Artwork Container */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-[60px] bg-[#8B5E34] shadow-2xl border-8 border-white overflow-hidden group">
              
              {/* Actual Image */}
              <img
                src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"
                alt="Potato Cheese Pangalengan Super Lezat"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1E1E]/40 to-transparent pointer-events-none" />

              {/* Cheese Drip Simulated Visual overlay bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FFC928]/95 via-[#FFC928]/60 to-transparent pointer-events-none flex items-end justify-center pb-3">
                <span className="text-[#1E1E1E] text-xs sm:text-sm font-display font-black tracking-wide bg-white px-3 py-1 rounded-full shadow-md border border-[#8B5E34]/10">
                  Lumer & Gurih Melimpah 🧀
                </span>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-12 right-0 bg-white px-4 py-3 rounded-2xl shadow-xl border border-[#FFF6E5] flex flex-col items-center rotate-12 z-20">
              <span className="text-[10px] font-black tracking-wider text-[#D94841]">BEST SELLER</span>
              <span className="text-xs font-black text-[#1E1E1E]">Original Mozza</span>
            </div>

            <div className="absolute bottom-12 left-0 bg-[#1E1E1E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 -rotate-6 z-20">
              <span className="text-base">🔥</span>
              <span className="text-xs font-bold tracking-tight">Custom Your Topping!</span>
            </div>

            {/* Custom Topping Floating Label (Geometric Element) */}
            <div className="absolute top-[340px] -right-4 flex flex-col gap-1.5 z-25 hidden sm:flex">
              <div className="px-3.5 py-1 bg-white border border-[#8B5E34] rounded-full text-[10px] font-bold text-[#8B5E34] shadow-sm transform rotate-3">+ Mozzarella</div>
              <div className="px-3.5 py-1 bg-[#FFC928] border border-[#8B5E34] rounded-full text-[10px] font-bold text-potato-brown shadow-sm transform -rotate-2">+ Sosis Sapi</div>
              <div className="px-3.5 py-1 bg-white border border-[#8B5E34] rounded-full text-[10px] font-bold text-[#8B5E34] shadow-sm transform rotate-6">+ Extra Cheese</div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
