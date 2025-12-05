// src/shop/mockData.ts

// Icon giả định
const ICON = {
  Electronics: '📱',
  Books: '📚',
  Clothes: '👕',
  Furniture: '🛋️',
  Service: '🛠️',
  Location: '📍',
  Heart: '❤️',
};

// --- Danh mục sản phẩm ---
export const categories = [
  { id: 1, name: 'Điện Tử & Gadgets', icon: ICON.Electronics, count: 45 },
  { id: 2, name: 'Sách & Giáo Trình', icon: ICON.Books, count: 89 },
  { id: 3, name: 'Thời Trang & Phụ Kiện', icon: ICON.Clothes, count: 120 },
  { id: 4, name: 'Đồ Dùng Học Tập', icon: ICON.Furniture, count: 65 },
  { id: 5, name: 'Dịch Vụ Khác', icon: ICON.Service, count: 15 },
];

// --- Thông tin Người bán ---
export const sellers = {
    'S22DH1001': { name: 'Nguyễn Văn An', avatar: '👨🏻‍🎓', rating: 4.9, listings: 12 },
    // ... (thông tin người bán khác nếu cần)
};

// --- Dữ liệu Sản phẩm ---
export const products = [
  {
    id: 101,
    title: 'iPad Air 5 (Màu Xanh, 64GB)',
    description: 'Máy dùng được 6 tháng, còn bảo hành 6 tháng, kèm bút Pencil 2.',
    price: 13500000,
    category: 'Điện Tử & Gadgets',
    condition: 'Đã dùng (95%)',
    sellerId: 'S22DH1001',
    location: 'Khu A',
    views: 120,
    likes: 15,
    images: ['ipad_1.jpg'],
    date: '2025-11-20T10:00:00Z',
  },
  {
    id: 102,
    title: 'Giáo trình Giải tích 1 (Nguyên seal)',
    description: 'Mua nhầm bản, chưa hề mở sách.',
    price: 150000,
    category: 'Sách & Giáo Trình',
    condition: 'Mới 100%',
    sellerId: 'S22DH1001',
    location: 'Khu D',
    views: 85,
    likes: 5,
    images: ['sach_1.jpg'],
    date: '2025-11-21T14:30:00Z',
  },
  {
    id: 103,
    title: 'Áo Khoác Đồng Phục FPTU',
    description: 'Áo size L, mới giặt 1 lần.',
    price: 300000,
    category: 'Thời Trang & Phụ Kiện',
    condition: 'Đã dùng (90%)',
    sellerId: 'S22DH1001',
    location: 'Ký Túc Xá',
    views: 200,
    likes: 25,
    images: ['ao_1.jpg'],
    date: '2025-11-22T08:15:00Z',
  },
  {
    id: 104,
    title: 'Ghế Công Thái Học (Đen)',
    description: 'Ghế mua cho kỳ học online, nay không cần dùng nữa.',
    price: 1800000,
    category: 'Đồ Dùng Học Tập',
    condition: 'Đã dùng (85%)',
    sellerId: 'S22DH1001',
    location: 'Ký Túc Xá',
    views: 30,
    likes: 2,
    images: ['ghe.jpg'],
    date: '2025-11-23T08:15:00Z',
  },
];