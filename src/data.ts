import { Menu, Topping, FAQ, GalleryItem } from './types';
import jajananMenuImage from './assets/dapur-ama/jajanan-menu.jpeg';
import potachizCloseupImage from './assets/dapur-ama/potachiz-closeup.jpeg';
import potachizHeroImage from './assets/dapur-ama/potachiz-hero.jpeg';
import ubiCremeBruleeMenuImage from './assets/dapur-ama/ubi-creme-brulee-menu.jpeg';

export const BRAND_NAME = 'Dapur Ama Snack';
export const BRAND_SHORT_NAME = 'Dapur Ama';
export const INSTAGRAM_HANDLE = '@dapurama.snack';
export const INSTAGRAM_URL = 'https://instagram.com/dapurama.snack';
export const WHATSAPP_NUMBER = '6281223385559';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const LOCATION_NAME = 'Terminal Pangalengan';
export const LOCATION_ADDRESS =
  'Area Terminal Pangalengan, Jl. Raya Pangalengan, Kec. Pangalengan, Kabupaten Bandung, Jawa Barat 40378';
export const LOCATION_NOTE =
  'Tersedia di area Terminal Pangalengan dengan fokus menu Korean bread, ubi creme brulee, dan jajanan harian.';
export const MENU_CATEGORIES = ['Ubi Creme', 'Snack', 'Cilung', 'Risol', 'Potachiz'] as const;

const regularJumboSizes = (regularPrice: number, jumboPrice: number) => [
  { name: 'Reguler', priceAdjustment: 0 },
  { name: 'Jumbo', priceAdjustment: jumboPrice - regularPrice },
];

const fixedSize = (label: string) => [{ name: label, priceAdjustment: 0 }];

export const MENUS: Menu[] = [
  {
    id: 'pizza-bread',
    slug: 'pizza-dpotachiz',
    category: 'Potachiz',
    name: "Pizza D'Potachiz",
    description:
      'Korean bread gurih dengan topping pizza, saus melimpah, dan tekstur lembut di dalam.',
    price: 20000,
    image: potachizHeroImage,
    isBestSeller: true,
    sizes: regularJumboSizes(20000, 27000),
    defaultToppings: ['Extra Mozzarella'],
  },
  {
    id: 'double-mozzarella',
    slug: 'double-mozzarella-dpotachiz',
    category: 'Potachiz',
    name: 'Double Mozzarella',
    description:
      'Varian keju mulur yang paling ikonik, lumer tebal dengan permukaan brûléed seperti pada foto promo.',
    price: 20000,
    image: potachizCloseupImage,
    isBestSeller: true,
    sizes: regularJumboSizes(20000, 24000),
    defaultToppings: ['Extra Mozzarella'],
  },
  {
    id: 'plus-mozza',
    slug: 'plus-mozza-dpotachiz',
    category: 'Potachiz',
    name: '+ Mozza',
    description:
      'Versi keju ekstra untuk penikmat mozzarella yang ingin tekstur tarikan lebih tebal dan creamy.',
    price: 25000,
    image: potachizCloseupImage,
    sizes: regularJumboSizes(25000, 30000),
    defaultToppings: ['Extra Mozzarella'],
  },
  {
    id: 'abon-mayo-saus',
    slug: 'abon-mayo-saus-dpotachiz',
    category: 'Potachiz',
    name: 'Abon Mayo Saus',
    description:
      'Kombinasi abon gurih dengan mayo saus yang tebal di atas bread panggang hangat.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
    defaultToppings: ['Saus Mentai'],
  },
  {
    id: 'abon-mayo',
    slug: 'abon-mayo-dpotachiz',
    category: 'Potachiz',
    name: 'Abon Mayo',
    description:
      'Rasa favorit dengan taburan abon dan mayo ringan, cocok untuk yang ingin gurih manis seimbang.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
  },
  {
    id: 'choco-melt',
    slug: 'choco-melt-dpotachiz',
    category: 'Potachiz',
    name: 'Choco Melt',
    description:
      'Pilihan manis dengan lelehan cokelat pekat yang menutup seluruh permukaan bread.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
    isBestSeller: true,
    defaultToppings: ['Cokelat Lumer'],
  },
  {
    id: 'bbq-bread',
    slug: 'bbq-dpotachiz',
    category: 'Potachiz',
    name: 'BBQ',
    description:
      'Varian simpel gurih dengan saus BBQ smoky dan topping ringan untuk camilan cepat.',
    price: 15000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(15000, 18000),
  },
  {
    id: 'bulgogi-bread',
    slug: 'bulgogi-dpotachiz',
    category: 'Potachiz',
    name: 'Bulgogi',
    description:
      'Rasa ala Korea dengan sentuhan saus manis gurih dan tampilan yang tetap cheesy.',
    price: 15000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(15000, 18000),
  },
  {
    id: 'tiramisu-milo',
    slug: 'tiramisu-milo-dpotachiz',
    category: 'Potachiz',
    name: 'Tiramisu Milo',
    description:
      'Perpaduan rasa tiramisu dan taburan milo untuk penikmat dessert bread yang creamy.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
  },
  {
    id: 'cheese-meses-ceres',
    slug: 'cheese-meses-ceres-dpotachiz',
    category: 'Potachiz',
    name: 'Cheese Meses Ceres',
    description:
      'Kombinasi meses cokelat dan keju yang cocok untuk pelanggan yang ingin manis gurih klasik.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
    defaultToppings: ['Keju Parut'],
  },
  {
    id: 'coklat-keju',
    slug: 'coklat-keju-dpotachiz',
    category: 'Potachiz',
    name: 'Coklat Keju',
    description:
      'Lelehan cokelat dengan taburan keju parut tebal, manis dan gurih dalam satu gigitan.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
    defaultToppings: ['Keju Parut', 'Cokelat Lumer'],
  },
  {
    id: 'matcha-oreo',
    slug: 'matcha-oreo-dpotachiz',
    category: 'Potachiz',
    name: 'Matcha Oreo',
    description:
      'Bread dessert dengan nuansa matcha lembut dan topping oreo untuk rasa yang lebih bold.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
    defaultToppings: ['Oreo Crumble'],
  },
  {
    id: 'taro-bread',
    slug: 'taro-dpotachiz',
    category: 'Potachiz',
    name: 'Taro',
    description:
      'Varian taro lembut berwarna ungu muda yang menonjol di katalog Dapur Ama Snack.',
    price: 18000,
    image: potachizHeroImage,
    sizes: regularJumboSizes(18000, 21000),
  },
  {
    id: 'creme-brulee-original',
    slug: 'ubi-creme-brulee-original',
    category: 'Ubi Creme',
    name: 'Creme Brulee Original',
    description:
      'Ubi creme brulee basic dengan permukaan torch, lembut dan legit.',
    price: 15000,
    image: ubiCremeBruleeMenuImage,
    isBestSeller: true,
    sizes: fixedSize('Single'),
  },
  {
    id: 'creme-brulee-matcha',
    slug: 'ubi-creme-brulee-matcha',
    category: 'Ubi Creme',
    name: 'Creme Brulee Matcha',
    description:
      'Base ubi dengan krim matcha lembut dan aroma teh hijau yang lebih earthy.',
    price: 15000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
  },
  {
    id: 'creme-brulee-coklat',
    slug: 'ubi-creme-brulee-coklat',
    category: 'Ubi Creme',
    name: 'Creme Brulee Coklat',
    description:
      'Versi cokelat dengan topping brûlée yang lebih kaya dan dessert-forward.',
    price: 15000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
  },
  {
    id: 'ori-oreo',
    slug: 'ubi-ori-topping-oreo',
    category: 'Ubi Creme',
    name: 'Ori Topping Oreo',
    description:
      'Original creme brulee dengan crumble oreo untuk tekstur lebih ramai.',
    price: 18000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Oreo Crumble'],
  },
  {
    id: 'matcha-oreo-creme',
    slug: 'ubi-matcha-topping-oreo',
    category: 'Ubi Creme',
    name: 'Matcha Topping Oreo',
    description:
      'Matcha creme brulee dipadukan oreo, cocok untuk penikmat rasa manis pahit ringan.',
    price: 18000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Oreo Crumble'],
  },
  {
    id: 'coklat-oreo-creme',
    slug: 'ubi-coklat-topping-oreo',
    category: 'Ubi Creme',
    name: 'Coklat Topping Oreo',
    description:
      'Base cokelat dengan oreo crumble, lebih intense dan cocok untuk pencinta dessert pekat.',
    price: 18000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Oreo Crumble', 'Cokelat Lumer'],
  },
  {
    id: 'ori-keju-creme',
    slug: 'ubi-ori-topping-keju',
    category: 'Ubi Creme',
    name: 'Ori Topping Keju',
    description:
      'Creme original dengan keju parut tebal untuk rasa gurih yang lebih dominan.',
    price: 18000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Keju Parut'],
  },
  {
    id: 'double-matcha',
    slug: 'ubi-double-matcha',
    category: 'Ubi Creme',
    name: 'Double Matcha',
    description:
      'Pilihan matcha paling intens di seri creme brulee, hijau pekat dan creamy.',
    price: 18000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
  },
  {
    id: 'ori-lotus',
    slug: 'ubi-ori-topping-lotus',
    category: 'Ubi Creme',
    name: 'Ori Topping Lotus',
    description:
      'Original creme brulee dengan crumble lotus untuk aroma karamel biskuit.',
    price: 19000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Lotus Crumble'],
  },
  {
    id: 'matcha-lotus',
    slug: 'ubi-matcha-topping-lotus',
    category: 'Ubi Creme',
    name: 'Matcha Topping Lotus',
    description:
      'Matcha dan lotus dalam satu porsi, kombinasi earthy dan caramelized.',
    price: 19000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Lotus Crumble'],
  },
  {
    id: 'ori-mozza-creme',
    slug: 'ubi-ori-topping-keju-mozza',
    category: 'Ubi Creme',
    name: 'Ori Topping Keju Mozza',
    description:
      'Creme brulee original dengan mozzarella bakar dan visual lelehan yang paling menarik.',
    price: 20000,
    image: ubiCremeBruleeMenuImage,
    isBestSeller: true,
    sizes: fixedSize('Single'),
    defaultToppings: ['Extra Mozzarella'],
  },
  {
    id: 'matcha-mozza-creme',
    slug: 'ubi-matcha-topping-mozza',
    category: 'Ubi Creme',
    name: 'Matcha Topping Mozza',
    description:
      'Matcha creme brulee dengan mozzarella torched di atasnya, unik dan viral.',
    price: 20000,
    image: ubiCremeBruleeMenuImage,
    sizes: fixedSize('Single'),
    defaultToppings: ['Extra Mozzarella'],
  },
  {
    id: 'rogut-sayur',
    slug: 'risol-rogut-sayur',
    category: 'Risol',
    name: 'Rogut Sayur',
    description:
      'Risol gurih isi ragout sayur, cocok untuk snack harian atau tambahan box acara.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'mayo-keju-mozza-risol',
    slug: 'risol-mayo-keju-mozza',
    category: 'Risol',
    name: 'Mayo Keju Mozza',
    description:
      'Risol creamy dengan mayo, keju, dan sensasi mozzarella yang lebih mewah.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'beef-bolognese-risol',
    slug: 'risol-beef-bolognese',
    category: 'Risol',
    name: 'Beef Bolognese',
    description:
      'Isian daging dan saus bolognese yang gurih untuk camilan asin yang lebih padat.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'ayam-suwir-original-risol',
    slug: 'risol-ayam-suwir-original',
    category: 'Risol',
    name: 'Ayam Suir Original',
    description:
      'Risol ayam suwir gurih dengan rasa yang aman dan mudah disukai banyak orang.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'ayam-suwir-sambal-matah-risol',
    slug: 'risol-ayam-suwir-sambal-matah',
    category: 'Risol',
    name: 'Ayam Suir Sambal Matah',
    description:
      'Versi ayam suwir dengan sentuhan sambal matah yang lebih segar dan pedas.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'ati-ayam-pedas-risol',
    slug: 'risol-ati-ayam-pedas',
    category: 'Risol',
    name: 'Ati Ayam Pedas',
    description:
      'Pilihan risol gurih pedas dengan karakter rasa yang lebih kuat.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'coklat-pisang-risol',
    slug: 'risol-coklat-pisang',
    category: 'Snack',
    name: 'Coklat Pisang',
    description:
      'Risol manis dengan isian pisang dan cokelat untuk teman ngopi atau ngemil sore.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'ubi-ungu-keju-meleleh',
    slug: 'risol-ubi-ungu-keju-meleleh',
    category: 'Snack',
    name: 'Ubi Ungu Keju Meleleh',
    description:
      'Varian manis gurih dengan warna ungu menarik dan isian keju lumer.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'matcha-cheese-risol',
    slug: 'risol-matcha-cheese',
    category: 'Snack',
    name: 'Matcha Cheese',
    description:
      'Risol dessert rasa matcha dengan kombinasi keju yang unik dan kekinian.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'jasuke-mozzarella-risol',
    slug: 'risol-jasuke-mozzarella',
    category: 'Snack',
    name: 'Jasuke Mozzarella',
    description:
      'Risol jagung susu keju dengan sentuhan mozzarella, cocok untuk pencinta snack creamy.',
    price: 4000,
    image: jajananMenuImage,
    sizes: fixedSize('1 pcs'),
  },
  {
    id: 'risol-biasa-paket',
    slug: 'paketan-risol-biasa',
    category: 'Risol',
    name: 'Paketan Risol Biasa',
    description:
      'Paket hemat risol biasa untuk sharing atau pesanan snack box. Pilih 3, 4, atau 5 pcs.',
    price: 12000,
    image: jajananMenuImage,
    isBestSeller: true,
    sizes: [
      { name: '3 pcs', priceAdjustment: 0 },
      { name: '4 pcs', priceAdjustment: 4000 },
      { name: '5 pcs', priceAdjustment: 8000 },
    ],
  },
  {
    id: 'risol-mentai-paket',
    slug: 'paketan-risol-mentai',
    category: 'Risol',
    name: 'Paketan Risol Mentai',
    description:
      'Paket risol mentai sesuai daftar menu, lebih creamy dan cocok untuk pembelian rame-rame.',
    price: 15000,
    image: jajananMenuImage,
    sizes: [
      { name: '3 pcs', priceAdjustment: 0 },
      { name: '4 pcs', priceAdjustment: 5000 },
      { name: '5 pcs', priceAdjustment: 10000 },
    ],
    defaultToppings: ['Saus Mentai'],
  },
];

export const TOPPINGS: Topping[] = [
  {
    id: 'extra-mozzarella',
    name: 'Extra Mozzarella',
    price: 5000,
    category: 'cheese',
    image: '🧀',
    description: 'Tambahan mozzarella untuk sensasi lumer yang lebih tebal.',
  },
  {
    id: 'keju-parut',
    name: 'Keju Parut',
    price: 3000,
    category: 'cheese',
    image: '🧀',
    description: 'Taburan keju parut gurih untuk menu manis maupun gurih.',
  },
  {
    id: 'oreo-crumble',
    name: 'Oreo Crumble',
    price: 3000,
    category: 'garnish',
    image: '🍪',
    description: 'Remahan oreo untuk topping dessert yang lebih crunchy.',
  },
  {
    id: 'lotus-crumble',
    name: 'Lotus Crumble',
    price: 4000,
    category: 'garnish',
    image: '🍪',
    description: 'Biskuit lotus crumble dengan karakter karamel yang kuat.',
  },
  {
    id: 'saus-mentai',
    name: 'Saus Mentai',
    price: 1000,
    category: 'sauce',
    image: '🍣',
    description: 'Tambahan saus mentai seperti catatan pada menu jajanan.',
  },
  {
    id: 'cokelat-lumer',
    name: 'Cokelat Lumer',
    price: 3000,
    category: 'sauce',
    image: '🍫',
    description: 'Lelehan cokelat ekstra untuk varian dessert.',
  },
];

export const FAQS: FAQ[] = [
  {
    question: "Apakah semua varian D'Potachiz tersedia ukuran Reguler dan Jumbo?",
    answer:
      'Mayoritas menu D’Potachiz tersedia dalam ukuran Reguler dan Jumbo sesuai daftar pada gambar menu. Untuk varian tertentu, tim kami akan konfirmasi ulang jika stok topping sedang terbatas.',
  },
  {
    question: 'Apakah Ubi Creme Brulee bisa ditambah topping lagi?',
    answer:
      'Bisa. Kami menyediakan opsi tambahan seperti mozzarella, keju parut, oreo crumble, lotus crumble, atau cokelat lumer untuk menyesuaikan selera.',
  },
  {
    question: 'Berapa harga risol satuan dan paket?',
    answer:
      'Risol satuan mulai dari Rp4.000 per pcs. Untuk paket tersedia risol biasa 3 pcs Rp12.000, 4 pcs Rp16.000, 5 pcs Rp20.000, dan risol mentai 3 pcs Rp15.000, 4 pcs Rp20.000, 5 pcs Rp25.000.',
  },
  {
    question: 'Apakah bisa pesan untuk acara atau snack box?',
    answer:
      'Bisa. Dapur Ama Snack menerima pemesanan untuk acara keluarga, rapat, sekolah, atau snack box dengan jumlah banyak. Hubungi admin lebih awal untuk pengaturan menu dan jadwal.',
  },
  {
    question: 'Lokasinya di mana?',
    answer:
      'Outlet tersedia di area Terminal Pangalengan, Kabupaten Bandung. Lokasi ini juga tercantum pada materi promosi yang Anda kirim.',
  },
  {
    question: 'Cara pesan paling cepat bagaimana?',
    answer:
      'Pilih menu dan ukuran di web ini, tambahkan catatan bila perlu, lalu kirim format pesanan langsung ke WhatsApp admin untuk konfirmasi stok dan proses.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: "D'Potachiz Korean Bread Menu Board",
    category: 'Menu Board',
    image: potachizHeroImage,
  },
  {
    id: 'gal-2',
    title: 'Double Mozzarella Close-up',
    category: 'Best Seller',
    image: potachizCloseupImage,
  },
  {
    id: 'gal-3',
    title: 'Ubi Creme Brulee Variants',
    category: 'Dessert',
    image: ubiCremeBruleeMenuImage,
  },
  {
    id: 'gal-4',
    title: 'Risol dan Menu Jajanan',
    category: 'Jajanan',
    image: jajananMenuImage,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Teh Nisa',
    role: 'Pelanggan Terminal Pangalengan',
    comment:
      'Double mozzarella dan pizza bread-nya enak banget. Kejunya lumer dan porsinya pas buat ngemil sore.',
    rating: 5,
  },
  {
    name: 'Kang Bima',
    role: 'Pengunjung wisata Pangalengan',
    comment:
      'Ubi creme brulee matcha topping lotus unik dan tampilannya persis kayak di poster. Cocok buat oleh-oleh ringan.',
    rating: 5,
  },
  {
    name: 'Mba Fira',
    role: 'Pesanan acara sekolah',
    comment:
      'Risol paketnya praktis buat konsumsi rame-rame. Variannya banyak dan gampang dipilih lewat daftar menu.',
    rating: 5,
  },
];
