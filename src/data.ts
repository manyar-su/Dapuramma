import { Menu, Topping, FAQ, GalleryItem } from './types';

export const MENUS: Menu[] = [
  {
    id: 'original',
    slug: 'original-potato-cheese',
    name: 'Original Potato Cheese',
    description: 'Kentang potong premium berbalut tepung renyah bumbu gurih khas Pangalengan, diguyur saus keju cheddar lava asli yang melimpah dan creamy.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 30000 }
    ],
    defaultToppings: []
  },
  {
    id: 'spicy',
    slug: 'spicy-potato-cheese',
    name: 'Spicy Fire Potato Cheese',
    description: 'Bagi pecinta pedas! Kentang krispi dibumbui bubuk cabai pedas berlevel, lalu disiram saus keju spesial yang dicampur saus lava pedas membara.',
    price: 17000,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 30000 }
    ],
    defaultToppings: ['Saus Pedas']
  },
  {
    id: 'sausage',
    slug: 'sausage-potato-cheese',
    name: 'Sausage Potato Cheese',
    description: 'Kombinasi klasik kentang keju dengan irisan sosis sapi premium tebal yang digoreng garing, ditaburi keju parut di atasnya.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 25000 }
    ],
    defaultToppings: ['Sosis']
  },
  {
    id: 'beef',
    slug: 'beef-potato-cheese',
    name: 'Smoked Beef Potato Cheese',
    description: 'Topping melimpah irisan daging asap (smoked beef) yang gurih dan harum aroma smoky, menyatu sempurna dengan lelehan saus keju hangat.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 23000 }
    ],
    defaultToppings: ['Beef']
  },
  {
    id: 'mozzarella',
    slug: 'mozzarella-potato-cheese',
    name: 'Ultimate Mozzarella Pull',
    description: 'Sensasi keju mozzarella mulur yang meleleh sempurna dibakar torch di atas kentang krispi panas, memberikan tekstur kenyal dan rasa super gurih.',
    price: 23000,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 22000 }
    ],
    defaultToppings: ['Mozzarella']
  },
  {
    id: 'mix',
    slug: 'mix-topping-potato-cheese',
    name: 'Macho Mix Topping Potato',
    description: 'Varian termewah! Kentang renyah dengan paduan tiga topping sekaligus: potongan sosis sapi, serpihan smoked beef, dan taburan nori serta keju cheddar parut.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 20000 }
    ],
    defaultToppings: ['Sosis', 'Beef', 'Nori']
  },
  {
    id: 'extra-cheese',
    slug: 'extra-cheese-potato',
    name: 'Cheese Avalanche (Extra Cheese)',
    description: 'Khusus Cheese Lovers! Kentang disiram saus keju cheddar berlipat ganda, ditumpuk parutan keju cheddar batangan melimpah, dan mayonaise lembut.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Medium', priceAdjustment: 5000 },
      { name: 'Large', priceAdjustment: 10000 },
      { name: 'Family Box', priceAdjustment: 27000 }
    ],
    defaultToppings: ['Extra Cheese']
  },
  {
    id: 'family',
    slug: 'family-box-potato-cheese',
    name: 'Big Family Box Feast',
    description: 'Porsi raksasa yang dikemas dalam tray modern ramah lingkungan. Dilengkapi aneka saus cocolan (Cheese, Spicy, & Mayonaise) serta taburan parsley melimpah.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1518013041257-6917b7c2e391?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    sizes: [
      { name: 'Family Box', priceAdjustment: 0 }
    ],
    defaultToppings: ['Bawang crispy', 'Nori']
  }
];

export const TOPPINGS: Topping[] = [
  {
    id: 'sosis',
    name: 'Sosis Sapi',
    price: 4000,
    category: 'meat',
    image: '🌭',
    description: 'Irisan sosis sapi premium panggang'
  },
  {
    id: 'beef',
    name: 'Beef Slice',
    price: 5000,
    category: 'meat',
    image: '🥓',
    description: 'Smoked beef gurih beraroma asap'
  },
  {
    id: 'ayam',
    name: 'Ayam Suwir',
    price: 4000,
    category: 'meat',
    image: '🍗',
    description: 'Daging ayam gurih bumbu rempah'
  },
  {
    id: 'mozzarella',
    name: 'Mozzarella',
    price: 6000,
    category: 'cheese',
    image: '🧀',
    description: 'Keju mozzarella mulur dibakar torch'
  },
  {
    id: 'extra-cheese',
    name: 'Extra Cheese Sauce',
    price: 3000,
    category: 'cheese',
    image: '🫕',
    description: 'Tambahan guyuran saus keju kental'
  },
  {
    id: 'saus-pedas',
    name: 'Saus Pedas Lava',
    price: 1500,
    category: 'sauce',
    image: '🌶️',
    description: 'Saus lava pedas mantap membakar lidah'
  },
  {
    id: 'saus-bbq',
    name: 'Saus BBQ',
    price: 1500,
    category: 'sauce',
    image: '🍯',
    description: 'Saus BBQ manis gurih beraroma bakar'
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnaise',
    price: 1500,
    category: 'sauce',
    image: '🥛',
    description: 'Mayonaise putih lembut yang creamy'
  },
  {
    id: 'jagung',
    name: 'Jagung Manis',
    price: 2000,
    category: 'garnish',
    image: '🌽',
    description: 'Pipilan jagung manis rebus segar'
  },
  {
    id: 'daun-bawang',
    name: 'Daun Bawang',
    price: 1000,
    category: 'garnish',
    image: '🌱',
    description: 'Irisan daun bawang segar pemberi aroma'
  },
  {
    id: 'nori',
    name: 'Nori Rumput Laut',
    price: 2000,
    category: 'garnish',
    image: '🍙',
    description: 'Taburan rumput laut krispi Jepang'
  },
  {
    id: 'bawang-crispy',
    name: 'Bawang Goreng Crispy',
    price: 1000,
    category: 'garnish',
    image: '🧅',
    description: 'Bawang merah goreng garing yang gurih'
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'Apakah topping bisa ditambah sesuka hati?',
    answer: 'Sangat bisa! Kamu bisa menambahkan hingga lebih dari 5 topping sekaligus dalam satu bowl menggunakan fitur "Custom Builder" kami. Rasakan sensasi kentang bertumpuk mozzarella, sosis, smoked beef, dan aneka saus!'
  },
  {
    question: 'Apa saja topping yang paling laris (best-seller)?',
    answer: 'Perpaduan Mozzarella mulur yang di-torch dengan irisan Smoked Beef dan guyuran Extra Cheese Sauce adalah kombinasi favorit pelanggan Terminal Pangalengan!'
  },
  {
    question: 'Apakah bisa memilih tingkat kepedasan?',
    answer: 'Ya! Mulai dari Tidak Pedas (aman untuk anak-anak), Sedang, Pedas, hingga Extra Pedas Lava yang dijamin bikin berkeringat dingin namun tetap nagih.'
  },
  {
    question: 'Apakah melayani pengiriman (delivery)?',
    answer: 'Tentu saja! Kami melayani jasa pengiriman di seluruh area Pangalengan seperti Margamulya, Sukamanah, Tribakti Mulya, dan sekitarnya dengan ongkir terjangkau. Kamu juga bisa memesan pre-order untuk porsi banyak (acara ulang tahun, rapat, dll).'
  },
  {
    question: 'Lokasi tepatnya di mana?',
    answer: 'Outlet kami berlokasi sangat strategis di area Terminal Pangalengan, Kabupaten Bandung, Jawa Barat. Cari booth dengan spanduk kuning menyala khas keju berlogo "POTATO CHEESE PANGALENGAN".'
  },
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer: 'Kamu bisa memilih menu dan merakit custom topping langsung di website ini. Setelah selesai, klik tombol "Pesan via WhatsApp". Pesanan akan terformat otomatis dan langsung dikirim ke WhatsApp kami untuk diproses cepat.'
  },
  {
    question: 'Apakah kentang digoreng dadakan?',
    answer: 'Pasti! Kami berkomitmen menjaga kualitas cita rasa. Kentang hanya akan digoreng saat pesanan masuk agar disajikan dalam keadaan panas, renyah di luar, lembut di dalam, dan kejunya meleleh sempurna saat sampai ke tanganmu.'
  },
  {
    question: 'Berapa lama estimasi pengirimannya?',
    answer: 'Untuk area sekitar Pangalengan, rata-rata pengiriman memakan waktu 15 - 30 menit setelah digoreng selesai agar makanan tetap hangat saat diterima.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Original Potato Cheese Lava',
    category: 'Menu Utama',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-2',
    title: 'Proses Penuangan Saus Keju',
    category: 'Proses Dapur',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-3',
    title: 'Kemasan Takeaway Modern',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1518013041257-6917b7c2e391?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-4',
    title: 'Keju Mozzarella Pull Sempurna',
    category: 'Detail Topping',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-5',
    title: 'Pecinta Pedas Level Lava',
    category: 'Menu Utama',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-6',
    title: 'Macho Mix Full Topping',
    category: 'Menu Utama',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Teh Riska',
    role: 'Warga Margamulya',
    comment: 'Cemilan wajib kalau sore-sore lewat Terminal Pangalengan! Kejunya creamy banget, anak-anak suka yang original sedangkan saya ketagihan yang pedas pakai topping smoked beef.',
    rating: 5
  },
  {
    name: 'Kang Asep',
    role: 'Wisatawan Bandung',
    comment: 'Porsi family box-nya mantap buat dimakan bareng keluarga pas camping di Situ Cileunca. Walaupun dibawa agak jauh, kentangnya tetap enak dan saus kejunya melimpah ga pelit!',
    rating: 5
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Pelajar SMAN 1 Pangalengan',
    comment: 'Harganya ramah di kantong pelajar, bisa custom topping pakai mozarella terus dibakar gitu kejunya mulur panjang banget. Keren bisa pesen lewat web langsung ke WA.',
    rating: 5
  }
];
