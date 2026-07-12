import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { MessageCircle, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { MENUS, TOPPINGS, WHATSAPP_URL } from '../data';
import type { Menu, Topping } from '../types';

interface CustomBuilderProps {
  initialMenu?: Menu;
  onOrderSuccess?: () => void;
}

export default function CustomBuilder({ initialMenu, onOrderSuccess }: CustomBuilderProps) {
  const [menu, setMenu] = useState<Menu>(initialMenu || MENUS[0]);
  const [size, setSize] = useState(initialMenu?.sizes[0]?.name || MENUS[0].sizes[0].name);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'Ambil di tempat' | 'Kirim ke alamat'>('Ambil di tempat');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const targetMenu = initialMenu || MENUS[0];
    setMenu(targetMenu);
    setSize(targetMenu.sizes[0].name);
  }, [initialMenu]);

  useEffect(() => {
    if (menu.defaultToppings?.length) {
      setSelectedToppings(TOPPINGS.filter((topping) => menu.defaultToppings?.includes(topping.name)));
    } else {
      setSelectedToppings([]);
    }
  }, [menu]);

  const currentSizeOption = useMemo(
    () => menu.sizes.find((option) => option.name === size) || menu.sizes[0],
    [menu, size],
  );

  const basePrice = menu.price + currentSizeOption.priceAdjustment;
  const toppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const handleToggleTopping = (topping: Topping) => {
    setSelectedToppings((previous) =>
      previous.some((item) => item.id === topping.id)
        ? previous.filter((item) => item.id !== topping.id)
        : [...previous, topping],
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const toppingsText =
      selectedToppings.length > 0
        ? selectedToppings.map((topping) => `- ${topping.name} (${formatPrice(topping.price)})`).join('\n')
        : '- Tanpa tambahan';

    const message = `Halo Dapur Ama Snack, saya ingin pesan:
*Kategori*: ${menu.category}
*Menu*: ${menu.name}
*Ukuran*: ${size}
*Tambahan*:
${toppingsText}
*Jumlah*: ${quantity}
*Metode*: ${deliveryMethod}
${deliveryMethod === 'Kirim ke alamat' ? `*Alamat*: ${address}\n` : ''}*Catatan*: ${notes || '-'}
*Estimasi Total*: ${formatPrice(totalPrice)}

Mohon konfirmasi ketersediaan menu ini ya. Terima kasih.`;

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    onOrderSuccess?.();
  };

  return (
    <section id="custom-builder-section" className="py-20 bg-[#FFF6E5] text-[#1E1E1E] relative border-t border-potato-brown/10">
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#FFC928]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#8B1E24]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Form Pesan
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#8B5E34]">
            Pilih Menu dan Kirim ke Admin
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/75 text-sm sm:text-base font-sans">
            Form ini menyesuaikan kategori menu baru: Ubi Creme, Snack, Cilung, Risol, dan Potachiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form id="builder-form" onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 bg-white border-2 border-[#8B5E34]/15 p-6 sm:p-8 rounded-[2rem] shadow-xl">
            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">1</span>
                Pilih Menu
              </label>
              <select
                value={menu.id}
                onChange={(event) => {
                  const nextMenu = MENUS.find((item) => item.id === event.target.value) || MENUS[0];
                  setMenu(nextMenu);
                  setSize(nextMenu.sizes[0].name);
                }}
                className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3.5 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#F59E0B] font-sans"
              >
                {MENUS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category} - {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">2</span>
                Pilih Ukuran
              </label>
              <div className="flex flex-wrap gap-2">
                {menu.sizes.map((option) => {
                  const isSelected = size === option.name;
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setSize(option.name)}
                      className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all border ${
                        isSelected
                          ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                          : 'bg-[#FFF6E5] text-[#8B5E34] border-[#8B5E34]/15'
                      }`}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">3</span>
                Tambahan Opsional
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((item) => item.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => handleToggleTopping(topping)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                          : 'bg-white text-[#1E1E1E] border-[#8B5E34]/15 hover:bg-[#FFF6E5]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{topping.image}</span>
                        <div className="space-y-1">
                          <p className="font-display font-bold text-sm">{topping.name}</p>
                          <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#1E1E1E]/65'}`}>
                            {topping.description}
                          </p>
                          <p className={`text-xs font-bold ${isSelected ? 'text-[#FFD166]' : 'text-[#8B1E24]'}`}>
                            +{formatPrice(topping.price)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">4</span>
                  Jumlah
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="w-10 h-10 bg-[#FFF6E5] rounded-lg border border-[#8B5E34]/10 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4 text-[#8B5E34]" />
                  </button>
                  <span className="w-14 text-center text-lg font-display font-black text-[#8B5E34]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="w-10 h-10 bg-[#FFF6E5] rounded-lg border border-[#8B5E34]/10 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-[#8B5E34]" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-display font-bold text-lg text-[#8B5E34] flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-[#FFC928] text-[#8B5E34] rounded-full text-xs font-bold">5</span>
                  Metode
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Ambil di tempat', 'Kirim ke alamat'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDeliveryMethod(method)}
                      className={`px-4 py-2 rounded-xl font-display font-bold text-sm border ${
                        deliveryMethod === method
                          ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                          : 'bg-[#FFF6E5] text-[#8B5E34] border-[#8B5E34]/15'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {deliveryMethod === 'Kirim ke alamat' && (
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase block">
                  Alamat Pengiriman
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tulis alamat lengkap, patokan, dan area sekitar Terminal Pangalengan."
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3.5 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#F59E0B] font-sans"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#8B5E34] uppercase block">
                Catatan Tambahan
              </label>
              <input
                type="text"
                placeholder="Contoh: tambah saus mentai, tanpa oreo, pesanan untuk acara."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full bg-white border-2 border-[#8B5E34]/15 rounded-xl p-3.5 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#F59E0B] font-sans"
              />
            </div>
          </form>

          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border-2 border-[#8B5E34]/15 p-6 rounded-[2.5rem] shadow-xl text-[#1E1E1E]">
              <div className="w-full flex items-center justify-between pb-4 border-b border-[#8B5E34]/10">
                <span className="font-display font-bold text-sm text-[#8B5E34] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  Ringkasan Pesanan
                </span>
                <span className="text-[10px] font-mono bg-[#FFF6E5] border border-[#8B5E34]/15 px-2 py-0.5 rounded text-[#8B5E34] font-bold">
                  Live
                </span>
              </div>

              <div className="mt-6 aspect-[4/3] rounded-[2rem] overflow-hidden border border-[#8B5E34]/10">
                <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
              </div>

              <div className="mt-6 bg-[#FFF6E5]/60 border-2 border-[#8B5E34]/15 rounded-2xl p-5 space-y-4 text-xs font-sans text-[#1E1E1E]">
                <h4 className="font-display font-bold text-sm text-[#8B5E34] tracking-wider uppercase border-b border-[#8B5E34]/15 pb-2">
                  Detail
                </h4>

                <div className="grid grid-cols-2 gap-y-2 text-[#1E1E1E]/75">
                  <span>Kategori:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{menu.category}</span>
                  <span>Menu:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{menu.name}</span>
                  <span>Ukuran:</span>
                  <span className="text-[#8B1E24] font-bold text-right">{size}</span>
                  <span>Tambahan:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">
                    {selectedToppings.length ? selectedToppings.map((item) => item.name).join(', ') : 'Tidak ada'}
                  </span>
                  <span>Jumlah:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{quantity}</span>
                  <span>Metode:</span>
                  <span className="text-[#1E1E1E] font-bold text-right">{deliveryMethod}</span>
                </div>

                {notes && (
                  <div className="bg-white p-3 rounded-lg border border-[#8B5E34]/10 text-[#1E1E1E]/70">
                    <span className="font-bold text-[#8B5E34] block mb-1">Catatan:</span>
                    <span>{notes}</span>
                  </div>
                )}

                <div className="border-t border-[#8B5E34]/15 pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#8B5E34]">Estimasi Total:</span>
                  <span className="text-2xl font-display font-black text-[#D94841]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="builder-form"
                className="w-full mt-4 bg-[#8B1E24] hover:bg-[#A52A2A] text-white font-display font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim ke WhatsApp Admin</span>
              </button>

              <p className="text-center text-[10px] text-[#1E1E1E]/50 mt-3 font-mono">
                Format order akan terbuka otomatis di WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
