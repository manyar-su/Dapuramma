export interface Menu {
  id: string;
  slug: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isBestSeller?: boolean;
  sizes: {
    name: string;
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
  size: string;
  sauce: string;
  selectedToppings: Topping[];
  spicyLevel: string;
  quantity: number;
  deliveryMethod: string;
  address: string;
  notes: string;
}
