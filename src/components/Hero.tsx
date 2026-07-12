import logoImage from '../assets/dapur-ama/logo.png';
import heroImage from '../assets/dapur-ama/potachiz-closeup.jpeg';

interface HeroProps {
  onOrderClick: () => void;
  onViewMenuClick: () => void;
}

export default function Hero({ onOrderClick, onViewMenuClick }: HeroProps) {
  return (
    <header
      id="hero-header"
      className="relative min-h-screen bg-[#FFF5EA] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(circle_at_top_right,_rgba(139,30,36,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.18),_transparent_36%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#8B5E34_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div id="hero-left-col" className="lg:col-span-6 text-left flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <img
                src={logoImage}
                alt="Logo Dapur Ama"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              />
              <span className="inline-block px-4 py-1.5 bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold rounded-full uppercase tracking-wider">
                Terminal Pangalengan
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[60px] leading-[1.02] font-black text-[#5A2B14] mb-6 font-display">
              Dapur Ama Snack
              <br />
              <span className="text-[#8B1E24]">Menu Lengkap Lebih Rapi</span>
            </h1>

            <p className="text-lg text-[#1E1E1E]/70 max-w-xl mb-8 leading-relaxed font-sans">
              Sekarang halaman menu dipisah ke kategori Ubi Creme, Snack, Cilung, Risol, dan Potachiz. Fokus utamanya menampilkan katalog asli Dapur Ama Snack dari materi promosi yang Anda kirim.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                'Potachiz Korean Bread',
                'Ubi Creme Brulee',
                'Risol & Snack Harian',
                'Tersedia di Terminal Pangalengan',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F9C74F] flex items-center justify-center border border-potato-brown/20 shadow-sm">
                    <svg className="w-4 h-4 text-[#8B1E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-[#1E1E1E]/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                id="hero-primary-cta"
                onClick={onOrderClick}
                className="bg-[#8B1E24] text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                Pesan Sekarang
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onViewMenuClick}
                className="bg-white border-2 border-[#8B1E24] text-[#8B1E24] px-8 py-3.5 rounded-2xl font-bold text-base sm:text-lg hover:bg-[#FFF0DD] transition-all cursor-pointer"
              >
                Lihat Kategori Menu
              </button>
            </div>

            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-[#8B5E34]/15 text-[#1E1E1E]/60 text-xs sm:text-sm">
              <span className="flex text-[#FFC928] text-base">★★★★★</span>
              <span className="font-semibold text-[#8B5E34]">Brand Dapur Ama dengan menu yang disusun ulang sesuai materi promosi</span>
            </div>
          </div>

          <div id="hero-right-col" className="lg:col-span-6 relative flex justify-center items-center py-10 lg:py-0">
            <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-[#8B1E24]/10 rounded-full blur-3xl -z-10" />

            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[42px] bg-[#8B1E24] shadow-2xl border-8 border-white overflow-hidden group">
              <img
                src={heroImage}
                alt="Menu best seller Dapur Ama Snack"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1E1E]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1E1E1E]/85 via-[#1E1E1E]/35 to-transparent">
                <span className="text-white text-xs sm:text-sm font-display font-black tracking-wide bg-[#8B1E24] px-3 py-1 rounded-full shadow-md inline-block">
                  Best Seller: Double Mozzarella
                </span>
              </div>
            </div>

            <div className="absolute top-10 right-0 bg-white px-4 py-3 rounded-2xl shadow-xl border border-[#FFF6E5] flex flex-col items-center rotate-6 z-20">
              <span className="text-[10px] font-black tracking-wider text-[#8B1E24]">MENU BARU</span>
              <span className="text-xs font-black text-[#1E1E1E]">Kategori Lebih Jelas</span>
            </div>

            <div className="absolute bottom-10 left-0 bg-[#1E1E1E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 -rotate-6 z-20">
              <span className="text-base">🔥</span>
              <span className="text-xs font-bold tracking-tight">Potachiz • Ubi Creme • Risol</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
