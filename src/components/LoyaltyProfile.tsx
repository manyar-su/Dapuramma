import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  Award, 
  Gift, 
  TrendingUp, 
  History, 
  LogOut, 
  Check, 
  Sparkles, 
  UserPlus, 
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  User, 
  getCurrentUser, 
  registerUser, 
  loginUser, 
  logoutUser, 
  REDEEM_POINTS_REQUIRED, 
  REDEEM_DISCOUNT_PERCENT, 
  POINT_EARN_RATE 
} from '../lib/storage';

interface LoyaltyProfileProps {
  onLoginStateChange?: () => void;
}

export default function LoyaltyProfile({ onLoginStateChange }: LoyaltyProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Reload current user state
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name || !phone) {
      setError('Nama dan nomor telepon wajib diisi!');
      return;
    }

    // Basic phone validation
    if (phone.length < 9) {
      setError('Nomor telepon tidak valid (minimal 9 digit)!');
      return;
    }

    const res = registerUser(name, phone, email);
    if (res.success && res.user) {
      setSuccessMsg(res.message);
      setUser(res.user);
      setName('');
      setPhone('');
      setEmail('');
      if (onLoginStateChange) onLoginStateChange();
    } else {
      setError(res.message);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!phone) {
      setError('Nomor telepon wajib diisi!');
      return;
    }

    const res = loginUser(phone);
    if (res.success && res.user) {
      setSuccessMsg(res.message);
      setUser(res.user);
      setPhone('');
      if (onLoginStateChange) onLoginStateChange();
    } else {
      setError(res.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setSuccessMsg('Anda telah keluar dari akun member.');
    if (onLoginStateChange) onLoginStateChange();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="loyalty-profile-section" className="py-12 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card / Auth Choice Frame */}
        {user ? (
          /* LOGGED IN MEMBER PANEL */
          <div className="space-y-8">
            
            {/* Header section */}
            <div className="text-center space-y-2">
              <span className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full uppercase tracking-wider">
                👑 MEMBER LOYALTY AREA
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#8B5E34]">
                Halo, {user.name}!
              </h2>
              <p className="text-[#1E1E1E]/70 text-sm font-sans">
                Terima kasih telah menjadi bagian dari keluarga Potato Cheese Pangalengan.
              </p>
            </div>

            {/* Main Interactive Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* MEMBER CARD (5 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#8B5E34] via-[#754E29] to-[#5C3E20] text-[#FFF6E5] p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-2 border-[#FFC928]/30 min-h-[260px]">
                {/* Accent lights */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC928]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#D94841]/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Member card top */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#FFC928] font-bold uppercase block">
                      POTATO CHEESE MEMBER
                    </span>
                    <span className="font-display font-black text-lg tracking-tight uppercase">
                      GOLD LEVEL
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-[#FFC928]/20 rounded-xl flex items-center justify-center text-[#FFC928] border border-[#FFC928]/40">
                    <Award className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                {/* Member card bottom */}
                <div className="space-y-4 pt-10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono opacity-70 block uppercase">NAMA MEMBER</span>
                    <span className="font-display font-bold text-base tracking-wide block">{user.name}</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-3">
                    <div>
                      <span className="text-[9px] font-mono opacity-70 block uppercase">MEMBER ID</span>
                      <span className="font-mono text-xs font-bold tracking-wider">{user.id.substring(5, 15).toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono opacity-70 block uppercase text-right">TELEPON</span>
                      <span className="font-mono text-xs font-bold">{user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* POINTS STATUS & RULES (7 cols) */}
              <div className="md:col-span-7 bg-white border-2 border-[#8B5E34]/15 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
                
                {/* Point Balance Header */}
                <div className="flex items-center justify-between border-b border-[#8B5E34]/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFC928]/20 text-[#8B5E34] rounded-full flex items-center justify-center font-bold">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-[#1E1E1E]/60 font-sans">Saldo Poin Anda</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-black text-[#D94841]">{user.points}</span>
                        <span className="text-xs font-sans text-[#8B5E34] font-bold">Poin</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-1.5 bg-[#D94841]/10 hover:bg-[#D94841]/20 text-[#D94841] font-display font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-[#D94841]/20"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </div>

                {/* Loyalty Point Rules Info */}
                <div className="bg-[#FFF6E5]/60 p-4 rounded-2xl border border-[#8B5E34]/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#8B5E34] font-display font-bold text-xs sm:text-sm">
                    <Info className="w-4 h-4 text-[#F59E0B]" />
                    <span>Aturan Main & Keuntungan:</span>
                  </div>
                  <ul className="text-xs text-[#1E1E1E]/85 space-y-2 font-sans pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B] font-bold">✓</span>
                      <span>Earn: Setiap kelipatan <strong>{formatPrice(POINT_EARN_RATE)}</strong> transaksi belanja Anda akan menghasilkan <strong>1 poin</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B] font-bold">✓</span>
                      <span>Redeem: Kumpulkan minimal <strong>{REDEEM_POINTS_REQUIRED} poin</strong> untuk mendapatkan potongan diskon sebesar <strong>{REDEEM_DISCOUNT_PERCENT}%</strong> pada pesanan berikutnya!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Cara Pakai: Saat melakukan kustomisasi di menu rakit, pilih opsi <em>Redeem Poin</em> sebelum menekan Pesan ke WhatsApp.</span>
                    </li>
                  </ul>
                </div>

                {/* Redeem Check Status Banner */}
                {user.points >= REDEEM_POINTS_REQUIRED ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs flex items-center gap-2.5 animate-pulse">
                    <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Selamat! Poin Anda cukup untuk ditukarkan dengan <strong>Diskon {REDEEM_DISCOUNT_PERCENT}%</strong> pada pesanan selanjutnya!</span>
                  </div>
                ) : (
                  <div className="text-xs text-[#1E1E1E]/60 flex items-center gap-1.5 font-sans">
                    <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
                    <span>Kumpulkan <strong>{REDEEM_POINTS_REQUIRED - user.points} poin lagi</strong> untuk membuka diskon {REDEEM_DISCOUNT_PERCENT}%.</span>
                  </div>
                )}
              </div>
            </div>

            {/* TRANSACTION HISTORY TABLE */}
            <div className="bg-white border-2 border-[#8B5E34]/15 rounded-[2.5rem] p-6 sm:p-8 shadow-xl space-y-5">
              <h3 className="font-display font-black text-lg text-[#8B5E34] flex items-center gap-2">
                <History className="w-5 h-5 text-[#F59E0B]" />
                Riwayat Transaksi & Poin
              </h3>
              
              {user.history.length === 0 ? (
                <div className="text-center py-8 text-[#1E1E1E]/50 text-xs sm:text-sm font-sans space-y-2">
                  <p>Belum ada riwayat pemesanan di akun Anda.</p>
                  <p className="text-xs text-[#8B5E34]">Coba rakit kentang pertamamu di pembuat custom dan kumpulkan poin pertamamu! 🥔</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#8B5E34]/20 text-[#8B5E34] font-bold font-display uppercase tracking-wider">
                        <th className="py-3 px-2">Tanggal</th>
                        <th className="py-3 px-2">Pesanan</th>
                        <th className="py-3 px-2">Total Harga</th>
                        <th className="py-3 px-2 text-center">Poin Diperoleh</th>
                        <th className="py-3 px-2 text-center">Poin Ditukar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#8B5E34]/10 font-sans text-[#1E1E1E]/80">
                      {user.history.map((hist, hIdx) => (
                        <tr key={hIdx} className="hover:bg-[#FFF6E5]/30">
                          <td className="py-3 px-2 font-mono text-xs">{hist.date}</td>
                          <td className="py-3 px-2 font-semibold">
                            {hist.menuName} <span className="text-[10px] bg-[#FFF6E5] text-[#8B5E34] px-1.5 py-0.5 rounded border border-[#8B5E34]/10">{hist.size}</span>
                          </td>
                          <td className="py-3 px-2 font-mono">{formatPrice(hist.price)}</td>
                          <td className="py-3 px-2 text-center font-bold text-green-600">
                            {hist.pointsEarned > 0 ? `+${hist.pointsEarned}` : '0'}
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-red-500">
                            {hist.pointsRedeemed > 0 ? `-${hist.pointsRedeemed}` : '0'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* REGISTRATION AND LOGIN AUTH SELECTION PANEL */
          <div className="bg-white border-2 border-[#8B5E34]/15 rounded-[2.5rem] p-6 sm:p-10 shadow-xl max-w-lg mx-auto relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC928]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D94841]/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Tab selection */}
            <div className="flex border-b border-[#8B5E34]/15 pb-4 mb-6">
              <button
                onClick={() => {
                  setIsRegister(false);
                  setError('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 font-display font-black text-sm transition-all text-center cursor-pointer ${
                  !isRegister 
                    ? 'text-[#8B5E34] border-b-2 border-[#F59E0B] scale-105' 
                    : 'text-[#1E1E1E]/50 hover:text-[#8B5E34]'
                }`}
              >
                Masuk Member
              </button>
              <button
                onClick={() => {
                  setIsRegister(true);
                  setError('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 font-display font-black text-sm transition-all text-center cursor-pointer ${
                  isRegister 
                    ? 'text-[#8B5E34] border-b-2 border-[#F59E0B] scale-105' 
                    : 'text-[#1E1E1E]/50 hover:text-[#8B5E34]'
                }`}
              >
                Daftar Member Baru
              </button>
            </div>

            {/* Error & Success Toast Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs mb-4 flex items-center gap-2">
                <span className="font-bold">⚠️ Error:</span>
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs mb-4 flex items-center gap-2">
                <span className="font-bold">✨ Sukses:</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {!isRegister ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-display font-bold text-lg text-[#8B5E34] flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 text-[#F59E0B]" />
                    Masuk ke Akun Member
                  </h3>
                  <p className="text-[#1E1E1E]/60 text-xs font-sans">
                    Masukkan nomor HP Anda yang terdaftar untuk memeriksa poin dan menukarkan kupon diskon.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                    Nomor Telepon (WhatsApp):
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#8B5E34]/50" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full bg-[#FFF6E5]/30 border-2 border-[#8B5E34]/20 rounded-xl py-3 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[#F59E0B] transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F59E0B] hover:bg-[#FFC928] hover:text-[#8B5E34] text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
                >
                  <span>Masuk Akun Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-[#1E1E1E]/50 font-sans mt-4">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-[#8B5E34] font-bold hover:underline"
                  >
                    Daftar di sini
                  </button>
                </p>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <h3 className="font-display font-bold text-lg text-[#8B5E34] flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#F59E0B]" />
                    Pendaftaran Member Baru
                  </h3>
                  <p className="text-[#1E1E1E]/60 text-xs font-sans">
                    Dapatkan langsung <strong>bonus 15 Poin</strong> secara instan setelah sukses mendaftar! 🎁
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                    Nama Lengkap Anda:
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#8B5E34]/50" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-[#FFF6E5]/30 border-2 border-[#8B5E34]/20 rounded-xl py-3 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[#F59E0B] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                    Nomor Telepon (WhatsApp):
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#8B5E34]/50" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full bg-[#FFF6E5]/30 border-2 border-[#8B5E34]/20 rounded-xl py-3 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[#F59E0B] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase tracking-wider block">
                    Alamat Email (Opsional):
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#8B5E34]/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Contoh: email@anda.com"
                      className="w-full bg-[#FFF6E5]/30 border-2 border-[#8B5E34]/20 rounded-xl py-3 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D94841] hover:bg-[#c13e38] text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md mt-2"
                >
                  <span>Daftar Sekarang (Dapat 15 Poin)</span>
                  <Check className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-[#1E1E1E]/50 font-sans mt-4">
                  Sudah terdaftar?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="text-[#8B5E34] font-bold hover:underline"
                  >
                    Masuk di sini
                  </button>
                </p>
              </form>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
