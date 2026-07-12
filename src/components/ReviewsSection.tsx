import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Sparkles, Filter, CheckCircle, Send, HelpCircle, LogIn } from 'lucide-react';
import { MENUS } from '../data';
import { 
  Review, 
  getAllReviews, 
  getAverageRating, 
  addReview, 
  getCurrentUser 
} from '../lib/storage';

interface ReviewsSectionProps {
  onLoginClick?: () => void;
}

export default function ReviewsSection({ onLoginClick }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'view' | 'write'>('view');

  // Review Form States
  const [formMenuId, setFormMenuId] = useState<string>(MENUS[0].id);
  const [formRating, setFormRating] = useState<number>(5);
  const [formName, setFormName] = useState<string>('');
  const [formComment, setFormComment] = useState<string>('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  // Member user state
  const [memberUser, setMemberUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadData = () => {
    setReviews(getAllReviews());
    const user = getCurrentUser();
    setMemberUser(user);
    if (user) {
      setFormName(user.name);
    } else {
      setFormName('');
    }
  };

  useEffect(() => {
    loadData();
    
    // Listen for custom event or local storage changes
    const interval = setInterval(() => {
      const user = getCurrentUser();
      setMemberUser(user);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formName.trim()) {
      setErrorMessage('Nama wajib diisi untuk menulis ulasan!');
      return;
    }

    if (!formComment.trim()) {
      setErrorMessage('Isi ulasan singkat Anda wajib ditulis!');
      return;
    }

    const selectedMenuObj = MENUS.find(m => m.id === formMenuId);
    const menuName = selectedMenuObj ? selectedMenuObj.name : 'Potato Cheese';

    // Save review
    addReview(formMenuId, menuName, formName, formRating, formComment);
    
    // Reset Form
    setFormRating(5);
    if (!memberUser) setFormName('');
    setFormComment('');
    setSuccessMessage('Terima kasih! Ulasan Anda telah berhasil diterbitkan dan langsung tampil di website. 🙌');
    
    // Reload Reviews List
    loadData();

    // Switch tab back to view with a slight delay
    setTimeout(() => {
      setActiveTab('view');
      setSuccessMessage('');
    }, 3000);
  };

  const filteredReviews = selectedFilter === 'all'
    ? reviews
    : reviews.filter(r => r.menuId === selectedFilter);

  // Calculate overall metrics
  const overallAverage = reviews.length > 0
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1))
    : 4.8;

  const totalReviewsCount = reviews.length;

  return (
    <section id="reviews-section" className="py-12 bg-white rounded-3xl relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-1 uppercase tracking-wider">
            ⭐ ULASAN PELANGGAN
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#8B5E34]">
            Apa Kata Mereka Tentang Kelezatan Kami?
          </h2>
          <div className="w-16 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/70 text-xs sm:text-sm font-sans">
            Kami mengutamakan kualitas rasa dan pelayanan terbaik. Baca ulasan jujur para pelanggan atau berikan ulasan Anda sendiri sekarang!
          </p>
        </div>

        {/* Live Rating Overview Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-8">
          
          {/* Average metrics card (4 cols) */}
          <div className="md:col-span-4 bg-[#FFF6E5] border-2 border-[#8B5E34]/15 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-widest block mb-2">
              RATA-RATA PENILAIAN
            </span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-display font-black text-[#D94841]">{overallAverage}</span>
              <span className="text-sm font-sans text-[#1E1E1E]/50">/ 5.0</span>
            </div>
            <div className="flex text-[#FFC928] gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(overallAverage) ? 'fill-[#FFC928]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-[#1E1E1E]/70 font-sans">
              Berdasarkan <strong>{totalReviewsCount} Ulasan Valid</strong> dari Member & Pelanggan
            </span>
          </div>

          {/* Action Choice Tab Buttons (8 cols) */}
          <div className="md:col-span-8 bg-[#FFF6E5]/40 border-2 border-[#8B5E34]/10 rounded-[2rem] p-6 flex flex-col justify-between shadow-sm space-y-4">
            
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm sm:text-base text-[#8B5E34]">
                Bagikan Pengalaman Kuliner Anda!
              </h4>
              <p className="text-[#1E1E1E]/70 text-xs leading-relaxed font-sans">
                Apakah Anda menyukai sensasi lelehan keju lumer kami? Berikan penilaian bintang dan tulis komentar singkat. Ulasan Anda sangat berharga bagi kami!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveTab('view');
                  setSuccessMessage('');
                }}
                className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
                  activeTab === 'view'
                    ? 'bg-[#8B5E34] text-white border-[#8B5E34] shadow-md'
                    : 'bg-white text-[#8B5E34] border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lihat Semua Ulasan</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('write');
                  setSuccessMessage('');
                }}
                className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
                  activeTab === 'write'
                    ? 'bg-[#D94841] text-white border-[#D94841] shadow-md'
                    : 'bg-white text-[#D94841] border-[#D94841]/15 hover:bg-red-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Tulis Ulasan Baru</span>
              </button>
            </div>

          </div>
        </div>

        {/* DYNAMIC TAB VIEWS */}
        {activeTab === 'view' ? (
          
          /* VIEW REVIEWS PANEL */
          <div className="space-y-6">
            
            {/* Filter Menu Category Selector */}
            <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-[#8B5E34]/10">
              <span className="text-xs font-display font-bold text-[#8B5E34] flex items-center gap-1 mr-2">
                <Filter className="w-3.5 h-3.5 text-[#F59E0B]" />
                Saring Menu:
              </span>
              
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition-all border cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[#FFC928] text-[#8B5E34] border-[#8B5E34]'
                    : 'bg-white text-[#1E1E1E]/70 border-[#8B5E34]/10 hover:bg-[#FFF6E5]'
                }`}
              >
                Semua Varian ({reviews.length})
              </button>

              {MENUS.map((menu) => {
                const count = reviews.filter(r => r.menuId === menu.id).length;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setSelectedFilter(menu.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition-all border cursor-pointer ${
                      selectedFilter === menu.id
                        ? 'bg-[#FFC928] text-[#8B5E34] border-[#8B5E34]'
                        : 'bg-white text-[#1E1E1E]/70 border-[#8B5E34]/10 hover:bg-[#FFF6E5]'
                    }`}
                  >
                    {menu.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* List of reviews */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 text-[#1E1E1E]/40 font-sans text-xs sm:text-sm space-y-3">
                <p>Belum ada ulasan khusus untuk menu ini.</p>
                <button
                  onClick={() => setActiveTab('write')}
                  className="px-4 py-2 bg-[#FFF6E5] text-[#8B5E34] border border-[#8B5E34]/15 font-display font-bold text-xs rounded-xl hover:bg-[#FFC928] transition-all"
                >
                  Jadilah Yang Pertama Memberi Ulasan! ✍️
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#FFF6E5]/20 hover:bg-[#FFF6E5]/40 border-2 border-[#8B5E34]/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-[#8B5E34] text-sm">
                          {rev.userName}
                        </span>
                        <span className="text-[10px] font-mono bg-white border border-[#8B5E34]/10 px-2 py-0.5 rounded text-[#8B5E34] font-bold">
                          {rev.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex text-[#FFC928]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#FFC928]' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono bg-red-50 text-[#D94841] font-bold px-2 py-0.5 rounded">
                          {rev.menuName}
                        </span>
                      </div>

                      <p className="text-[#1E1E1E]/75 text-xs sm:text-sm font-sans italic leading-relaxed pt-1.5">
                        "{rev.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          
          /* WRITE REVIEWS PANEL */
          <div className="bg-[#FFF6E5]/30 border-2 border-[#8B5E34]/15 p-6 sm:p-8 rounded-[2rem] max-w-xl mx-auto shadow-md">
            
            {successMessage ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-lg text-emerald-700">Ulasan Berhasil Terbit!</h4>
                <p className="text-[#1E1E1E]/70 text-xs sm:text-sm font-sans max-w-sm mx-auto">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                
                {/* Intro */}
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-display font-bold text-lg text-[#8B5E34]">
                    Bagikan Penilaian Kuliner Anda
                  </h3>
                  <p className="text-[#1E1E1E]/60 text-xs font-sans">
                    Isi detail ulasan di bawah ini. Jika Anda masuk member, ulasan akan dikaitkan dengan akun loyalty Anda!
                  </p>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs">
                    <span>⚠️ {errorMessage}</span>
                  </div>
                )}

                {/* Grid controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Select menu item to review */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                      Varian Menu Potato:
                    </label>
                    <select
                      value={formMenuId}
                      onChange={(e) => setFormMenuId(e.target.value)}
                      className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl py-2 px-3 text-xs font-sans focus:outline-none focus:border-[#F59E0B]"
                      required
                    >
                      {MENUS.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                          {menu.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating selection (1-5 stars) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                      Nilai Rating Anda:
                    </label>
                    <div className="flex gap-1.5 items-center pt-2">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starVal = idx + 1;
                        const isGold = starVal <= (hoveredStar ?? formRating);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormRating(starVal)}
                            onMouseEnter={() => setHoveredStar(starVal)}
                            onMouseLeave={() => setHoveredStar(null)}
                            className="text-2xl transition-all hover:scale-125 focus:outline-none cursor-pointer"
                            title={`${starVal} Bintang`}
                          >
                            <Star 
                              className={`w-6 h-6 ${isGold ? 'fill-[#FFC928] text-[#FFC928]' : 'text-gray-300'}`} 
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-display font-bold text-[#8B5E34] ml-2">
                        ({formRating} / 5)
                      </span>
                    </div>
                  </div>

                </div>

                {/* Name fields */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                      Nama Pengulas:
                    </label>
                    {memberUser ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Akun Member Terdeteksi
                      </span>
                    ) : (
                      onLoginClick && (
                        <button
                          type="button"
                          onClick={onLoginClick}
                          className="text-[10px] text-[#8B5E34] font-bold hover:underline flex items-center gap-0.5"
                        >
                          <LogIn className="w-2.5 h-2.5" />
                          Masuk Member dulu?
                        </button>
                      )
                    )}
                  </div>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Teh Rina, Kak Budi"
                    className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-[#F59E0B]"
                    disabled={!!memberUser}
                    required
                  />
                </div>

                {/* Comment area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                    Ulasan Singkat:
                  </label>
                  <textarea
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Tulis ulasan jujur Anda disini. Bagaimana rasanya, porsinya, kemasannya, dsb..."
                    rows={3}
                    maxLength={200}
                    className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-[#F59E0B]"
                    required
                  />
                  <div className="text-right text-[10px] text-[#1E1E1E]/50">
                    {formComment.length}/200 karakter
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D94841] hover:bg-[#c13e38] text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Terbitkan Ulasan Sekarang</span>
                </button>

              </form>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
