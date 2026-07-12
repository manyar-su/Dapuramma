import React, { useState, useEffect } from 'react';
import { Menu, Topping, OrderState } from '../types';
import { MENUS, TOPPINGS } from '../data';
import { Check, Plus, Minus, Send, ShoppingBag, Sparkles, HelpCircle, AlertCircle, Award, Coins } from 'lucide-react';
import { getCurrentUser, addOrderToHistory, REDEEM_POINTS_REQUIRED, REDEEM_DISCOUNT_PERCENT, calculatePointsEarned } from '../lib/storage';

interface CustomBuilderProps {
  initialMenu?: Menu;
  onOrderSuccess?: () => void;
}

export default function CustomBuilder({ initialMenu, onOrderSuccess }: CustomBuilderProps) {
  // Use first menu (Original) as fallback if none provided
  const baseMenu = initialMenu || MENUS[0];

  const [menu, setMenu] = useState<Menu>(baseMenu);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [useRedemption, setUseRedemption] = useState<boolean>(false);

  // Monitor logged in member status
  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const interval = setInterval(() => {
      setCurrentUser(getCurrentUser());
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  const [size, setSize] = useState<'Regular' | 'Medium' | 'Large' | 'Family Box'>('Regular');
  const [sauce, setSauce] = useState<'Cheese Original' | 'Spicy Cheese' | 'BBQ Cheese' | 'Mix Sauce'>('Cheese Original');
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<'Tidak pedas' | 'Sedang' | 'Pedas' | 'Extra pedas'>('Tidak pedas');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'Ambil di tempat' | 'Kirim ke alamat'>('Ambil di tempat');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Sync state if initialMenu changes
  useEffect(() => {
    if (initialMenu) {
      setMenu(initialMenu);
      // Try to match available sizes for the selected menu
      const hasSelectedSize = initialMenu.sizes.some(s => s.name === size);
      if (!hasSelectedSize && initialMenu.sizes.length > 0) {
        setSize(initialMenu.sizes[0].name);
      }
    }
  }, [initialMenu]);

  // Handle multi-select toggle of toppings
  const handleToppingToggle = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  // Calculate pricing
  const currentSizeOption = menu.sizes.find((s) => s.name === size) || menu.sizes[0];
  const sizeAdjustment = currentSizeOption ? currentSizeOption.priceAdjustment : 0;
  const basePrice = menu.price + sizeAdjustment;
  const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const totalPriceSingle = basePrice + toppingsPrice;
  const totalPriceTotal = totalPriceSingle * quantity;

  // Loyalty calculations
  const canRedeem = currentUser && currentUser.points >= REDEEM_POINTS_REQUIRED;
  const pointsRedeemed = (canRedeem && useRedemption) ? REDEEM_POINTS_REQUIRED : 0;
  const discountAmount = pointsRedeemed > 0 ? Math.round(totalPriceTotal * (REDEEM_DISCOUNT_PERCENT / 100)) : 0;
  const finalPriceTotal = totalPriceTotal - discountAmount;
  const pointsEarned = currentUser ? calculatePointsEarned(finalPriceTotal) : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Pre-fill default toppings if the menu has them (e.g. Spicy menu starts with Spicy Sauce)
  useEffect(() => {
    if (menu.defaultToppings && menu.defaultToppings.length > 0) {
      const preloaded = TOPPINGS.filter(t => menu.defaultToppings?.includes(t.name));
      setSelectedToppings(preloaded);
    } else {
      setSelectedToppings([]);
    }
  }, [menu]);

  // Format WhatsApp message on submission
  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const toppingsListStr = selectedToppings.length > 0 
      ? selectedToppings.map(t => `- ${t.name} (${formatPrice(t.price)})`).join('\n')
      : '- Tanpa topping tambahan';

    // Loyalty detail message additions
    const loyaltyDetailsStr = currentUser
      ? `\n\n*--- INFO MEMBER LOYALTY ---*\n*Member*: ${currentUser.name}\n*Member ID*: ${currentUser.id.substring(5, 15).toUpperCase()}\n*Poin Saat Ini*: ${currentUser.points} Poin\n${pointsRedeemed > 0 ? `*Poin Ditukar*: -${pointsRedeemed} Poin (Diskon ${REDEEM_DISCOUNT_PERCENT}%)\n*Diskon Diperoleh*: -${formatPrice(discountAmount)}\n` : ''}*Poin Baru Diperoleh*: +${pointsEarned} Poin\n*Estimasi Poin Akhir*: ${currentUser.points - pointsRedeemed + pointsEarned} Poin`
      : '';

    const text = `Halo Potato Cheese Pangalengan, saya ingin pesan:
*Menu*: ${menu.name}
*Ukuran*: ${size}
*Saus*: ${sauce}
*Tambahan Topping*:
${toppingsListStr}
*Level Pedas*: ${spicyLevel}
*Jumlah*: ${quantity} Porsi
*Metode Penerimaan*: ${deliveryMethod}
${deliveryMethod === 'Kirim ke alamat' ? `*Alamat*: ${address}` : ''}
*Catatan*: ${notes || '-'}${loyaltyDetailsStr}

*Total Estimasi*: ${formatPrice(finalPriceTotal)}

Mohon segera dikonfirmasi ya, terima kasih! 🥔🧀🔥`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/628123456789?text=${encodedText}`;
    
    // Record the order into member history if logged in
    if (currentUser) {
      addOrderToHistory(
        menu.id,
        menu.name,
        size,
        finalPriceTotal,
        pointsEarned,
        pointsRedeemed
      );
      // Reset useRedemption after successful order logging
      setUseRedemption(false);
    }

    // Open WhatsApp link in new tab safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (onOrderSuccess) {
      onOrderSuccess();
    }
  };

  return (
    <section id="custom-builder-section" className="py-20 bg-[#FFF6E5] text-[#1E1E1E] relative border-t border-potato-brown/10">
      {/* Decorative Warm Backglow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#FFC928]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D94841]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            🛠️ RAKIT SENDIRI
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#8B5E34]">
            Buat Potato Cheese Versimu
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/75 text-sm sm:text-base font-sans">
            Sesuaikan porsi, saus, level pedas, dan kreasikan topping melimpah sesuka hatimu. Lihat visual hidanganmu berubah langsung di sebelah kanan!
          </p>
        </div>

        {/* Builder Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Controls (7 cols) */}
          <form id="builder-form" onSubmit={handleWhatsAppOrder} className="lg:col-span-7 space-y-8 bg-white border-2 border-[#8B5E34]/15 p-6 sm:p-8 rounded-[2rem] shadow-xl">
            
            {/* Step 0: Choose Base Menu */}
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">0</span>
                Pilih Varian Dasar Kentang:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MENUS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMenu(m);
                      // Reset to first size if the new menu doesn't support the currently selected size
                      if (!m.sizes.some(s => s.name === size)) {
                        setSize(m.sizes[0].name);
                      }
                    }}
                    className={`p-3 rounded-xl border font-display font-bold text-xs text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      menu.id === m.id
                        ? 'bg-[#FFC928] text-[#8B5E34] border-2 border-[#8B5E34] shadow-md scale-105'
                        : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                    }`}
                  >
                    <span className="text-xl">🥔</span>
                    <span className="line-clamp-1">{m.name.split(' ')[0]} {m.name.split(' ')[1] || ''}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1: Choose Size */}
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">1</span>
                Pilih Ukuran Porsi:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {menu.sizes.map((sz) => {
                  const isSelected = size === sz.name;
                  return (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSize(sz.name)}
                      className={`p-3.5 rounded-xl border font-display font-bold text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFC928] text-[#8B5E34] border-2 border-[#8B5E34] shadow-md scale-105'
                          : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <div className="text-base">{sz.name === 'Regular' ? '🥣' : sz.name === 'Medium' ? '🍟' : sz.name === 'Large' ? '🍱' : '📦'}</div>
                      <div className="font-bold">{sz.name}</div>
                      <div className="text-[10px] opacity-75 font-mono">+{formatPrice(sz.priceAdjustment)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Sauce */}
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">2</span>
                Pilih Saus Keju Utama:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Cheese Original', 'Spicy Cheese', 'BBQ Cheese', 'Mix Sauce'] as const).map((sc) => {
                  const isSelected = sauce === sc;
                  return (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setSauce(sc)}
                      className={`p-3 rounded-xl border font-display font-bold text-xs text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#F59E0B] text-white border-2 border-[#8B5E34] shadow-md'
                          : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <span className="text-lg">
                        {sc === 'Cheese Original' ? '🫕' : sc === 'Spicy Cheese' ? '🌶️' : sc === 'BBQ Cheese' ? '🍯' : '🌀'}
                      </span>
                      <span>{sc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Extra Toppings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">3</span>
                  Tambahkan Topping Mewah (Bisa Pilih Banyak):
                </label>
                <span className="text-xs text-[#1E1E1E]/60 font-mono font-bold">{selectedToppings.length} Terpilih</span>
              </div>

              {/* Topping Categories Filter Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => handleToppingToggle(topping)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-[#FFC928]/20 text-[#1E1E1E] border-2 border-[#8B5E34] shadow-sm scale-[1.03]'
                          : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl">{topping.image}</span>
                        {isSelected ? (
                          <div className="w-5 h-5 bg-[#FFC928] text-[#8B5E34] border border-[#8B5E34] rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-[#8B5E34]/30 rounded-full flex items-center justify-center">
                            <Plus className="w-3 h-3 text-[#1E1E1E]/50" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-display font-bold text-xs tracking-tight leading-tight block truncate">
                          {topping.name}
                        </div>
                        <div className="text-[10px] text-[#D94841] font-mono font-bold block">
                          +{formatPrice(topping.price)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Level Pedas */}
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">4</span>
                Tingkat Kepedasan:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Tidak pedas', 'Sedang', 'Pedas', 'Extra pedas'] as const).map((lvl) => {
                  const isSelected = spicyLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicyLevel(lvl)}
                      className={`p-3 rounded-xl border font-display font-bold text-[10px] sm:text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D94841] text-white border-2 border-[#8B5E34] shadow-md'
                          : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <div className="text-base">
                        {lvl === 'Tidak pedas' ? '🟢' : lvl === 'Sedang' ? '🟡' : lvl === 'Pedas' ? '🔥' : '💥'}
                      </div>
                      <div>{lvl}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Quantity Selector */}
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">5</span>
                Tentukan Jumlah Pesanan:
              </label>
              <div className="flex items-center gap-4 bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3 w-max">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-[#FFF6E5] hover:bg-[#FFC928]/30 active:scale-90 rounded-lg flex items-center justify-center transition-all cursor-pointer border border-[#8B5E34]/10"
                >
                  <Minus className="w-4 h-4 text-[#8B5E34]" />
                </button>
                <span className="font-display font-black text-2xl w-12 text-center text-[#8B5E34]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-[#FFF6E5] hover:bg-[#FFC928]/30 active:scale-90 rounded-lg flex items-center justify-center transition-all cursor-pointer border border-[#8B5E34]/10"
                >
                  <Plus className="w-4 h-4 text-[#8B5E34]" />
                </button>
                <span className="text-xs text-[#1E1E1E]/60 font-mono font-bold">Porsi / Bowl</span>
              </div>
            </div>

            {/* Step 6: Delivery Option */}
            <div className="space-y-4">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">6</span>
                Pilih Metode Penerimaan:
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(['Ambil di tempat', 'Kirim ke alamat'] as const).map((method) => {
                  const isSelected = deliveryMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDeliveryMethod(method)}
                      className={`p-4 rounded-xl border text-center font-display font-bold text-sm transition-all cursor-pointer flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'bg-[#FFC928] text-[#8B5E34] border-2 border-[#8B5E34] shadow-md'
                          : 'bg-white text-[#1E1E1E]/80 border border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <span className="text-xl">{method === 'Ambil di tempat' ? '🚶‍♂️' : '🛵'}</span>
                      <span>{method}</span>
                    </button>
                  );
                })}
              </div>

              {/* Conditional Address Area */}
              {deliveryMethod === 'Kirim ke alamat' && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase block">
                    Alamat Pengiriman Lengkap (Kec. Pangalengan):
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Contoh: Jl. Raya Pangalengan No. 45, RT 02/RW 03, Margamulya (Dekat SMAN 1 Pangalengan)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3.5 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#F59E0B] font-sans placeholder-[#1E1E1E]/30"
                  />
                  <span className="text-[11px] text-[#1E1E1E]/60 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Ongkos kirim disesuaikan dengan jarak dari Terminal Pangalengan.
                  </span>
                </div>
              )}

              {/* Special Notes / Catatan Tambahan */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-[#1E1E1E]/60 uppercase block">
                  Catatan Tambahan untuk Koki (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Keju saus dipisah, garingin kentangnya, dll."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3.5 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#F59E0B] font-sans placeholder-[#1E1E1E]/30"
                />
              </div>

              {/* Langkah 5: Poin Loyalitas & Diskon */}
              <div className="space-y-3 pt-5 border-t-2 border-dashed border-[#8B5E34]/15">
                <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">5</span>
                  Sistem Poin Loyalitas (Member Area):
                </label>

                {currentUser ? (
                  <div className="bg-[#FFF6E5] border-2 border-[#8B5E34]/15 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#F59E0B]" />
                        <span className="font-display font-bold text-sm text-[#8B5E34]">Member: {currentUser.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#D94841] text-white px-2.5 py-0.5 rounded-full">
                        Saldo: {currentUser.points} Poin
                      </span>
                    </div>

                    <div className="text-xs font-sans text-[#1E1E1E]/80 space-y-2">
                      <p>
                        Dari pesanan ini, Anda akan mendapatkan bonus <strong className="text-green-600">+{pointsEarned} Poin</strong> baru!
                      </p>

                      {currentUser.points >= REDEEM_POINTS_REQUIRED ? (
                        <div className="bg-white p-3 rounded-xl border border-[#8B5E34]/10 space-y-2">
                          <label className="flex items-start gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={useRedemption}
                              onChange={(e) => setUseRedemption(e.target.checked)}
                              className="mt-1 accent-[#D94841]"
                            />
                            <div>
                              <span className="font-display font-bold text-[#8B5E34] text-xs block">Tukarkan {REDEEM_POINTS_REQUIRED} Poin untuk DISKON {REDEEM_DISCOUNT_PERCENT}%</span>
                              <span className="text-[10px] text-[#1E1E1E]/60 block mt-0.5">Potongan harga otomatis sebesar {formatPrice(discountAmount)}!</span>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#1E1E1E]/60 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>Poin Anda belum cukup untuk penukaran diskon 10% (Butuh {REDEEM_POINTS_REQUIRED} Poin, kurang {REDEEM_POINTS_REQUIRED - currentUser.points} lagi).</span>
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFF6E5]/40 border-2 border-dashed border-[#8B5E34]/15 p-4 rounded-2xl text-xs font-sans text-[#1E1E1E]/80 space-y-2">
                    <p className="font-bold text-[#8B5E34] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F59E0B] animate-pulse" />
                      Ingin Mengumpulkan Poin & Diskon Belanja?
                    </p>
                    <p className="text-[11px] text-[#1E1E1E]/70 leading-relaxed">
                      Daftar member di area tab <strong>Loyalty Member</strong> untuk mendapatkan langsung bonus 15 Poin pendaftaran dan kumpulkan poin dari setiap pesanan Anda!
                    </p>
                  </div>
                )}
              </div>
            </div>

          </form>

          {/* Right Column: Dynamic Live Preview & Visual Summary (5 cols) */}
          <div id="builder-preview-col" className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Live Interactive Dish Overlay Preview */}
            <div className="bg-white border-2 border-[#8B5E34]/15 p-6 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center shadow-xl text-[#1E1E1E]">
              
              {/* Radial warm backdrop aura */}
              <div className="absolute inset-0 bg-radial-gradient from-[#F59E0B]/10 via-transparent to-transparent pointer-events-none" />

              <div className="w-full flex items-center justify-between pb-4 border-b border-[#8B5E34]/10">
                <span className="font-display font-bold text-sm text-[#8B5E34] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 animate-spin text-[#F59E0B]" />
                  Live Preview Potato Cheese
                </span>
                <span className="text-[10px] font-mono bg-[#FFF6E5] border border-[#8B5E34]/15 px-2 py-0.5 rounded text-[#8B5E34] font-bold">
                  Visualisasi Instan
                </span>
              </div>

              {/* Dish Visual Graphics Wrapper */}
              <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center my-6">
                
                {/* 1. Base Plate / Wooden Board */}
                <div className="absolute inset-0 bg-[#3E2723] rounded-full scale-[1.05] border-4 border-white/5 shadow-2xl flex items-center justify-center">
                  <div className="w-[94%] h-[94%] border-2 border-dashed border-white/10 rounded-full" />
                </div>

                {/* 2. Custom Bowl */}
                <div className="absolute w-[80%] h-[80%] bg-[#ECEFF1] rounded-full shadow-inner border border-gray-300 overflow-hidden flex items-center justify-center z-10">
                  
                  {/* Potatoes Layer (Crispy Golden French Fries/Wedges) */}
                  <img
                    src="https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80"
                    alt="Potatoes"
                    className="w-full h-full object-cover opacity-90 transform rotate-12 scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* 3. Sauce Overlay - Cheese lava splash! */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC928]/85 via-[#F59E0B]/70 to-transparent mix-blend-multiply transition-all duration-300 z-10" />

                  {/* 4. Mozzarella Melt Layer (Visible if selected) */}
                  {selectedToppings.some((t) => t.id === 'mozzarella') && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] mix-blend-color-dodge rounded-full flex items-center justify-center z-15 animate-pulse border-4 border-dashed border-white">
                      <span className="text-[10px] font-mono font-bold text-soft-black bg-white/90 px-2 py-1 rounded">
                        🧀 MOZZARELLA MELT ON TORCH!
                      </span>
                    </div>
                  )}

                  {/* 5. Extra Sauce Overlap */}
                  {selectedToppings.some((t) => t.id === 'extra-cheese') && (
                    <div className="absolute inset-0 bg-[#FFC928]/90 mix-blend-overlay border-[14px] border-double border-[#F59E0B]/50 rounded-full z-15" />
                  )}

                  {/* Toppings Micro-sprites rendered dynamically within the bowl */}
                  <div className="absolute inset-0 z-20 pointer-events-none p-6 grid grid-cols-4 gap-4">
                    {/* Sausage pieces */}
                    {selectedToppings.some((t) => t.id === 'sosis') && (
                      <>
                        <span className="text-xl transform rotate-12 self-start justify-self-center animate-bounce">🌭</span>
                        <span className="text-xl transform -rotate-45 self-end justify-self-start">🌭</span>
                        <span className="text-xl transform rotate-[70deg] self-center justify-self-end">🌭</span>
                      </>
                    )}

                    {/* Smoked Beef slice */}
                    {selectedToppings.some((t) => t.id === 'beef') && (
                      <>
                        <span className="text-xl transform -rotate-12 self-center justify-self-center">🥓</span>
                        <span className="text-xl transform rotate-[130deg] self-start justify-self-end">🥓</span>
                      </>
                    )}

                    {/* Chicken chunks */}
                    {selectedToppings.some((t) => t.id === 'ayam') && (
                      <>
                        <span className="text-lg self-start justify-self-start">🍗</span>
                        <span className="text-lg self-end justify-self-center">🍗</span>
                      </>
                    )}

                    {/* Corn Kernels */}
                    {selectedToppings.some((t) => t.id === 'jagung') && (
                      <>
                        <span className="text-xs self-start justify-self-center bg-yellow-400 text-yellow-900 rounded-full px-1">🌽</span>
                        <span className="text-xs self-end justify-self-start bg-yellow-400 text-yellow-900 rounded-full px-1">🌽</span>
                        <span className="text-xs self-center justify-self-end bg-yellow-400 text-yellow-900 rounded-full px-1">🌽</span>
                      </>
                    )}

                    {/* Seaweed Nori */}
                    {selectedToppings.some((t) => t.id === 'nori') && (
                      <>
                        <span className="text-xs text-green-900 bg-green-300 font-bold px-1 rounded transform rotate-45 self-end justify-self-end">🍙 nori</span>
                        <span className="text-xs text-green-900 bg-green-300 font-bold px-1 rounded transform -rotate-12 self-start justify-self-start">🍙 nori</span>
                      </>
                    )}

                    {/* Green Spring Onion */}
                    {selectedToppings.some((t) => t.id === 'daun-bawang') && (
                      <>
                        <span className="text-[9px] bg-green-500 text-white rounded-full px-1.5 self-center justify-self-center">🌱</span>
                        <span className="text-[9px] bg-green-500 text-white rounded-full px-1.5 self-start justify-self-end">🌱</span>
                      </>
                    )}

                    {/* Crispy Onion */}
                    {selectedToppings.some((t) => t.id === 'bawang-crispy') && (
                      <>
                        <span className="text-[9px] bg-amber-700 text-amber-100 rounded px-1 self-end justify-self-start">🧅 crispy onion</span>
                      </>
                    )}
                  </div>

                </div>

                {/* Floating sauce drip vectors */}
                <div className="absolute -bottom-2 z-20 bg-[#FFC928] text-[#8B5E34] text-[9px] font-mono font-bold px-3 py-1 rounded-full shadow-lg border border-[#F59E0B]/30 animate-pulse">
                  Base Sauce: {sauce}
                </div>

              </div>

              {/* Live Order Summary details */}
              <div id="live-order-summary" className="w-full bg-[#FFF6E5]/60 border-2 border-[#8B5E34]/15 rounded-2xl p-5 space-y-4 text-xs font-sans text-[#1E1E1E]">
                <h4 className="font-display font-bold text-sm text-[#8B5E34] tracking-wider uppercase border-b border-[#8B5E34]/15 pb-2">
                  Ringkasan Pesanan Anda
                </h4>
                
                <div className="grid grid-cols-2 gap-y-2 text-[#1E1E1E]/75">
                  <span>Menu Utama:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{menu.name}</span>

                  <span>Ukuran Porsi:</span>
                  <span className="text-[#F59E0B] font-bold text-right">{size}</span>

                  <span>Saus Keju:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{sauce}</span>

                  <span>Topping Tambahan:</span>
                  <span className="text-[#1E1E1E] font-bold text-right max-w-[180px] break-words line-clamp-2">
                    {selectedToppings.length > 0 
                      ? selectedToppings.map(t => t.name).join(', ')
                      : 'Tanpa Topping'
                    }
                  </span>

                  <span>Level Pedas:</span>
                  <span className="text-[#D94841] font-bold text-right uppercase">{spicyLevel}</span>

                  <span>Jumlah Porsi:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{quantity} Porsi</span>

                  <span>Metode:</span>
                  <span className="text-[#F59E0B] font-bold text-right">{deliveryMethod}</span>
                </div>

                {deliveryMethod === 'Kirim ke alamat' && address && (
                  <div className="bg-white p-2.5 rounded-lg border border-[#8B5E34]/10 text-[#1E1E1E]/70">
                    <span className="font-bold text-[#8B5E34] block mb-0.5">Alamat Kirim:</span>
                    <span className="line-clamp-2">{address}</span>
                  </div>
                )}

                {notes && (
                  <div className="bg-white p-2.5 rounded-lg border border-[#8B5E34]/10 text-[#1E1E1E]/70">
                    <span className="font-bold text-[#8B5E34] block mb-0.5">Catatan:</span>
                    <span>"{notes}"</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="border-t border-[#8B5E34]/10 pt-2.5 flex items-center justify-between text-xs font-sans text-emerald-600 font-bold">
                    <span>Diskon Member (10%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                {currentUser && (
                  <div className="border-t border-dashed border-[#8B5E34]/10 pt-2.5 flex items-center justify-between text-xs font-sans text-[#8B5E34] font-medium">
                    <span>Poin diperoleh dari pesanan ini:</span>
                    <span className="font-bold">+{pointsEarned} Poin</span>
                  </div>
                )}

                <div className="border-t border-[#8B5E34]/15 pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#8B5E34]">Total Pembayaran:</span>
                  <span className="text-2xl font-display font-black text-[#D94841]">
                    {formatPrice(finalPriceTotal)}
                  </span>
                </div>
              </div>

              {/* Interactive checkout action inside summary */}
              <button
                type="submit"
                form="builder-form"
                className="w-full mt-4 bg-[#D94841] hover:bg-[#c13e38] text-white font-display font-bold py-4 rounded-2xl shadow-xl shadow-red-200/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Pesan Sekarang via WhatsApp</span>
              </button>

              <p className="text-center text-[10px] text-[#1E1E1E]/50 mt-3 font-mono">
                ⚡ Pesanan akan langsung terformat dan dikirim ke kontak WA kami.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
