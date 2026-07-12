export interface Menu {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isBestSeller?: boolean;
  sizes: {
    name: 'Regular' | 'Medium' | 'Large' | 'Family Box';
    priceAdjustment: number;
  }[];
  defaultToppings?: string[];
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  category: 'meat' | 'cheese' | 'sauce' | 'garnish';
  image: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface OrderState {
  menu: Menu;
  size: 'Regular' | 'Medium' | 'Large' | 'Family Box';
  sauce: 'Cheese Original' | 'Spicy Cheese' | 'BBQ Cheese' | 'Mix Sauce';
  selectedToppings: Topping[];
  spicyLevel: 'Tidak pedas' | 'Sedang' | 'Pedas' | 'Extra pedas';
  quantity: number;
  deliveryMethod: 'Ambil di tempat' | 'Kirim ke alamat';
  address: string;
  notes: string;
}
