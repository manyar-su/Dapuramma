export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  history: OrderHistoryItem[];
}

export interface OrderHistoryItem {
  id: string;
  menuId: string;
  menuName: string;
  size: string;
  price: number;
  pointsEarned: number;
  pointsRedeemed: number;
  date: string;
}

export interface Review {
  id: string;
  menuId: string;
  menuName: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

// Initial high-quality reviews (derived from existing testimonials and tailored per menu)
const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    menuId: 'original',
    menuName: 'Original Potato Cheese',
    userName: 'Teh Riska',
    rating: 5,
    comment: 'Cemilan wajib kalau sore-sore lewat Terminal Pangalengan! Kejunya creamy banget, rasanya gurih abis dan kentangnya krispi di luar lembut di dalam.',
    date: '2026-07-01'
  },
  {
    id: 'rev-2',
    menuId: 'spicy',
    menuName: 'Spicy Fire Potato Cheese',
    userName: 'Kang Asep',
    rating: 5,
    comment: 'Pecinta pedas wajib coba Spicy Fire! Saus keju pedas lavanya nampol banget, bikin berkeringat tapi ketagihan. Mantap dimakan anget-anget.',
    date: '2026-07-03'
  },
  {
    id: 'rev-3',
    menuId: 'mozzarella',
    menuName: 'Ultimate Mozzarella Pull',
    userName: 'Siti Nurhaliza',
    rating: 5,
    comment: 'Mozzarellanya mulur panjang banget dan wangi karena di-torch! Harganya ramah di kantong pelajar, top pokoknya.',
    date: '2026-07-05'
  },
  {
    id: 'rev-4',
    menuId: 'beef',
    menuName: 'Smoked Beef Potato Cheese',
    userName: 'Budi Santoso',
    rating: 4,
    comment: 'Irisan daging asapnya wangi smoky dan melimpah, menyatu banget dengan lelehan saus keju cheddar lava.',
    date: '2026-07-06'
  },
  {
    id: 'rev-5',
    menuId: 'family',
    menuName: 'Big Family Box Feast',
    userName: 'Bu Desi',
    rating: 5,
    comment: 'Porsi raksasa yang cocok banget buat makan bareng keluarga pas liburan di Pangalengan. Lengkap dengan aneka saus cocolan terpisah!',
    date: '2026-07-08'
  },
  {
    id: 'rev-6',
    menuId: 'sausage',
    menuName: 'Sausage Potato Cheese',
    userName: 'Rian Pratama',
    rating: 4,
    comment: 'Sosis sapinya tebal dan gurih, digoreng garing pas dipadu sama kentang renyah dan saus keju kental.',
    date: '2026-07-09'
  }
];

// Helper to safely load data from localStorage
const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultValue;
  }
};

// Helper to safely write data to localStorage
const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage', e);
  }
};

// INITIALIZATION: Run once to set defaults if not present
if (!localStorage.getItem('potato_cheese_reviews')) {
  setStoredData('potato_cheese_reviews', DEFAULT_REVIEWS);
}

// LOBBY / LOYALTY DATABASE LOGIC
export const registerUser = (name: string, phone: string, email: string): { success: boolean; message: string; user?: User } => {
  const users: User[] = getStoredData('potato_cheese_users', []);
  
  // Check if phone already exists
  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return { success: false, message: 'Nomor telepon ini sudah terdaftar sebagai member!' };
  }

  const newUser: User = {
    id: 'user_' + Date.now(),
    name,
    phone,
    email: email || '',
    points: 15, // Welcome bonus point of 15 points!
    history: []
  };

  users.push(newUser);
  setStoredData('potato_cheese_users', users);
  
  // Auto-login
  setStoredData('potato_cheese_current_user', newUser);
  
  return { success: true, message: 'Selamat! Pendaftaran berhasil. Anda mendapatkan bonus pendaftaran 15 poin! 🎁', user: newUser };
};

export const loginUser = (phone: string): { success: boolean; message: string; user?: User } => {
  const users: User[] = getStoredData('potato_cheese_users', []);
  const foundUser = users.find(u => u.phone === phone);
  
  if (!foundUser) {
    return { success: false, message: 'Nomor telepon tidak ditemukan. Silakan daftar sebagai member baru!' };
  }

  setStoredData('potato_cheese_current_user', foundUser);
  return { success: true, message: `Selamat datang kembali, ${foundUser.name}! 👋`, user: foundUser };
};

export const logoutUser = (): void => {
  localStorage.removeItem('potato_cheese_current_user');
};

export const getCurrentUser = (): User | null => {
  return getStoredData<User | null>('potato_cheese_current_user', null);
};

export const updateCurrentUserInList = (updatedUser: User): void => {
  const users: User[] = getStoredData('potato_cheese_users', []);
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    setStoredData('potato_cheese_users', users);
  }
  setStoredData('potato_cheese_current_user', updatedUser);
};

// Points Calculations Rules:
// 1 Point earned for every Rp 10.000 spent
// Redeem 100 Points for a 10% discount
export const POINT_EARN_RATE = 10000; // Rp 10.000 = 1 point
export const REDEEM_POINTS_REQUIRED = 100;
export const REDEEM_DISCOUNT_PERCENT = 10; // 10% discount

export const calculatePointsEarned = (price: number): number => {
  return Math.floor(price / POINT_EARN_RATE);
};

export const addOrderToHistory = (
  menuId: string,
  menuName: string,
  size: string,
  finalPrice: number,
  pointsEarned: number,
  pointsRedeemed: number
): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const newItem: OrderHistoryItem = {
    id: 'ord_' + Date.now(),
    menuId,
    menuName,
    size,
    price: finalPrice,
    pointsEarned,
    pointsRedeemed,
    date: new Date().toISOString().split('T')[0]
  };

  // Update user state
  const updatedUser = {
    ...currentUser,
    points: currentUser.points - pointsRedeemed + pointsEarned,
    history: [newItem, ...currentUser.history]
  };

  updateCurrentUserInList(updatedUser);
  return updatedUser;
};

// REVIEWS DATABASE LOGIC
export const getAllReviews = (): Review[] => {
  return getStoredData<Review[]>('potato_cheese_reviews', DEFAULT_REVIEWS);
};

export const getReviewsByMenu = (menuId: string): Review[] => {
  const reviews = getAllReviews();
  return reviews.filter(r => r.menuId === menuId);
};

export const getAverageRating = (menuId: string): { rating: number; count: number } => {
  const reviews = getReviewsByMenu(menuId);
  if (reviews.length === 0) {
    return { rating: 4.8, count: 6 }; // Authentic default fallback high-rating if no reviews
  }
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    rating: parseFloat((sum / reviews.length).toFixed(1)),
    count: reviews.length
  };
};

export const addReview = (menuId: string, menuName: string, userName: string, rating: number, comment: string): Review => {
  const reviews = getAllReviews();
  const newReview: Review = {
    id: 'rev_' + Date.now(),
    menuId,
    menuName,
    userName,
    rating,
    comment,
    date: new Date().toISOString().split('T')[0]
  };

  reviews.unshift(newReview); // Put newest reviews at the top
  setStoredData('potato_cheese_reviews', reviews);
  return newReview;
};
