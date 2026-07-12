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
  rating: number;
  comment: string;
  date: string;
}

const STORAGE_KEYS = {
  reviews: 'dapur_ama_reviews',
  users: 'dapur_ama_users',
  currentUser: 'dapur_ama_current_user',
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    menuId: 'double-mozzarella',
    menuName: 'Double Mozzarella',
    userName: 'Teh Nisa',
    rating: 5,
    comment: 'Kejunya lumer banget dan tampilannya sama seperti yang di foto promo.',
    date: '2026-07-08',
  },
  {
    id: 'rev-2',
    menuId: 'pizza-bread',
    menuName: "Pizza D'Potachiz",
    userName: 'Kang Bima',
    rating: 5,
    comment: 'Varian pizza gurih dan porsinya pas, jumbo juga worth it buat sharing.',
    date: '2026-07-09',
  },
  {
    id: 'rev-3',
    menuId: 'ori-mozza-creme',
    menuName: 'Ori Topping Keju Mozza',
    userName: 'Mba Fira',
    rating: 5,
    comment: 'Ubi creme brulee-nya unik, manisnya pas dan topping mozza bikin beda.',
    date: '2026-07-10',
  },
  {
    id: 'rev-4',
    menuId: 'risol-mentai-paket',
    menuName: 'Paketan Risol Mentai',
    userName: 'Pak Yudi',
    rating: 4,
    comment: 'Paket risol praktis buat acara dan saus mentainya enak.',
    date: '2026-07-11',
  },
];

const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading localStorage', error);
    return defaultValue;
  }
};

const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing localStorage', error);
  }
};

if (!localStorage.getItem(STORAGE_KEYS.reviews)) {
  setStoredData(STORAGE_KEYS.reviews, DEFAULT_REVIEWS);
}

export const registerUser = (
  name: string,
  phone: string,
  email: string,
): { success: boolean; message: string; user?: User } => {
  const users: User[] = getStoredData(STORAGE_KEYS.users, []);
  const existingUser = users.find((user) => user.phone === phone);

  if (existingUser) {
    return { success: false, message: 'Nomor telepon ini sudah terdaftar sebagai member.' };
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    phone,
    email: email || '',
    points: 15,
    history: [],
  };

  users.push(newUser);
  setStoredData(STORAGE_KEYS.users, users);
  setStoredData(STORAGE_KEYS.currentUser, newUser);

  return {
    success: true,
    message: 'Pendaftaran member berhasil. Anda mendapatkan bonus 15 poin.',
    user: newUser,
  };
};

export const loginUser = (phone: string): { success: boolean; message: string; user?: User } => {
  const users: User[] = getStoredData(STORAGE_KEYS.users, []);
  const foundUser = users.find((user) => user.phone === phone);

  if (!foundUser) {
    return { success: false, message: 'Nomor telepon tidak ditemukan. Silakan daftar lebih dulu.' };
  }

  setStoredData(STORAGE_KEYS.currentUser, foundUser);
  return { success: true, message: `Selamat datang kembali, ${foundUser.name}.`, user: foundUser };
};

export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
};

export const getCurrentUser = (): User | null => {
  return getStoredData<User | null>(STORAGE_KEYS.currentUser, null);
};

export const updateCurrentUserInList = (updatedUser: User): void => {
  const users: User[] = getStoredData(STORAGE_KEYS.users, []);
  const index = users.findIndex((user) => user.id === updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser;
    setStoredData(STORAGE_KEYS.users, users);
  }

  setStoredData(STORAGE_KEYS.currentUser, updatedUser);
};

export const POINT_EARN_RATE = 10000;
export const REDEEM_POINTS_REQUIRED = 100;
export const REDEEM_DISCOUNT_PERCENT = 10;

export const calculatePointsEarned = (price: number): number => {
  return Math.floor(price / POINT_EARN_RATE);
};

export const addOrderToHistory = (
  menuId: string,
  menuName: string,
  size: string,
  finalPrice: number,
  pointsEarned: number,
  pointsRedeemed: number,
): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const newItem: OrderHistoryItem = {
    id: `ord_${Date.now()}`,
    menuId,
    menuName,
    size,
    price: finalPrice,
    pointsEarned,
    pointsRedeemed,
    date: new Date().toISOString().split('T')[0],
  };

  const updatedUser = {
    ...currentUser,
    points: currentUser.points - pointsRedeemed + pointsEarned,
    history: [newItem, ...currentUser.history],
  };

  updateCurrentUserInList(updatedUser);
  return updatedUser;
};

export const getAllReviews = (): Review[] => {
  return getStoredData<Review[]>(STORAGE_KEYS.reviews, DEFAULT_REVIEWS);
};

export const getReviewsByMenu = (menuId: string): Review[] => {
  return getAllReviews().filter((review) => review.menuId === menuId);
};

export const getAverageRating = (menuId: string): { rating: number; count: number } => {
  const reviews = getReviewsByMenu(menuId);
  if (reviews.length === 0) {
    return { rating: 4.8, count: 6 };
  }

  const sum = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
  return {
    rating: parseFloat((sum / reviews.length).toFixed(1)),
    count: reviews.length,
  };
};

export const addReview = (
  menuId: string,
  menuName: string,
  userName: string,
  rating: number,
  comment: string,
): Review => {
  const reviews = getAllReviews();
  const newReview: Review = {
    id: `rev_${Date.now()}`,
    menuId,
    menuName,
    userName,
    rating,
    comment,
    date: new Date().toISOString().split('T')[0],
  };

  reviews.unshift(newReview);
  setStoredData(STORAGE_KEYS.reviews, reviews);
  return newReview;
};
