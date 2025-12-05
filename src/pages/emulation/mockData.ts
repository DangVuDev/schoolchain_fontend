// src/emulation/mockData.ts

/** Icons */
const ICON = {
  Man: '👨🏻‍🎓',
  Woman: '👩🏻‍🎓',
  Girl: '👧🏻',
  Check: '✅',
  Book: '📚',
  Party: '🎉',
  Trophy: '🏆',
  ShoppingBag: '🛍️',
  TShirt: '👕',
  Coin: '💰',
  Document: '📄',
};

// Dữ liệu Người dùng hiện tại
export const currentUser = {
  name: "Nguyễn Thị Mai Anh",
  studentId: "22DH110001",
  points: 18720,
  rank: 12,
  avatar: ICON.Girl,
};

// Dữ liệu Bảng Xếp Hạng (Leaderboard)
export const leaderboard = [
  { rank: 1, name: "Nguyễn Văn An", studentId: "22DH110045", points: 35920, avatar: ICON.Man },
  { rank: 2, name: "Lê Thị Hương", studentId: "22DH110089", points: 28450, avatar: ICON.Woman },
  { rank: 3, name: "Phạm Minh Tuấn", studentId: "22DH110156", points: 26780, avatar: ICON.Man },
  { rank: 4, name: "Trần Thị Bích", studentId: "22DH110234", points: 24560, avatar: ICON.Woman },
  { rank: 5, name: "Hoàng Văn Long", studentId: "22DH110456", points: 22340, avatar: ICON.Man },
  { rank: 6, name: "Đỗ Minh Hiếu", studentId: "22DH110789", points: 20100, avatar: ICON.Man },
  { rank: 7, name: "Phan Thị Yến", studentId: "22DH110901", points: 19500, avatar: ICON.Woman },
  // ... chèn người dùng hiện tại vào vị trí của họ
  { ...currentUser, isYou: true }, 
  { rank: 13, name: "Vũ Đình Phong", studentId: "22DH110013", points: 17500, avatar: ICON.Man },
];

// Dữ liệu Nhiệm vụ (Tasks)
export const tasks = [
  { title: "Điểm danh hàng ngày", points: 50, progress: 1, total: 1, icon: ICON.Check, type: 'daily' },
  { title: "Hoàn thành 5 bài tập LMS", points: 300, progress: 3, total: 5, icon: ICON.Book, type: 'weekly' },
  { title: "Tham gia Workshop Blockchain", points: 1000, progress: 0, total: 1, icon: ICON.Party, expired: "15/12", type: 'event' },
  { title: "Sử dụng Ví VNDC 3 lần", points: 150, progress: 3, total: 3, icon: ICON.Coin, type: 'daily' },
  { title: "Mời 1 bạn mới tham gia Campus", points: 500, progress: 0, total: 1, icon: ICON.Man, type: 'onetime' },
];

// Dữ liệu Phần thưởng theo Rank (Reward Tiers)
export const rewardTiers = [
  { rank: "1", reward: "10.000.000 VNDC + MacBook Pro M3" },
  { rank: "2", reward: "5.000.000 VNDC + iPhone 16 Pro" },
  { rank: "3", reward: "3.000.000 VNDC + iPad Pro" },
  { rank: "4-10", reward: "1.000.000 VNDC" },
  { rank: "11-50", reward: "300.000 VNDC" },
];

// Dữ liệu Cửa hàng (Shop Items)
const ICON_SHOP = {
  // ... (các icons khác như Man, Woman, Check, Book, Party)
  ShoppingBag: '🛍️',
  TShirt: '👕',
  Coin: '💰',
  Book: '📚',
  Party: '🎉',
  Laptop: '💻',
  Diamond: '💎',
  Wallet: '💳',
  Lightning: '⚡',
};

export const shopItems = [
  // --- Vật phẩm Tăng cường/Đổi VNDC (Hấp dẫn hơn) ---
  { name: "20.000 VNDC", cost: 120000, icon: ICON_SHOP.Wallet, category: 'VNDC' },
  { name: "5.000 VNDC", cost: 32000, icon: ICON_SHOP.Coin, category: 'VNDC' },
  { name: "Voucher Nạp ĐT 50k", cost: 15000, icon: ICON_SHOP.Lightning, category: 'Voucher' },
  
  // --- Vật phẩm Thú vị/Công nghệ ---
  { name: "Tai nghe Bluetooth", cost: 95000, icon: ICON_SHOP.Laptop, category: 'Technology' },
  { name: "Áo hoodie Campus Limited", cost: 35000, icon: ICON_SHOP.TShirt, category: 'Merchandise' },
  
  // --- Vật phẩm Trải nghiệm Độc quyền ---
  { name: "Vé VIP FPTU Concert", cost: 60000, icon: ICON_SHOP.Party, category: 'Experience' },
  { name: "Gặp Gỡ CEO (15 phút)", cost: 500000, icon: ICON_SHOP.Diamond, category: 'Experience' },

  // --- Vật phẩm cơ bản (Vẫn giữ lại) ---
  { name: "Voucher Shopee 200k", cost: 5000, icon: ICON_SHOP.ShoppingBag, category: 'Voucher' },
  { name: "Sổ tay cao cấp", cost: 2500, icon: ICON_SHOP.Book, category: 'Merchandise' },
  { name: "500 VNDC", cost: 3000, icon: ICON_SHOP.Coin, category: 'VNDC' },
];

// Dữ liệu Thể lệ/FAQ (Guide)
export const guideSections = [
    { 
        title: "Cách tích lũy VNDC Points", 
        icon: '💡',
        content: [
            "Hoàn thành các **Nhiệm vụ** hàng ngày/tuần.",
            "Tham gia các **Sự kiện** và Workshop của Campus.",
            "Thực hiện giao dịch trong hệ sinh thái VNDC Campus."
        ] 
    },
    { 
        title: "Quy tắc tính điểm Leaderboard", 
        icon: '⚖️',
        content: [
            "Leaderboard xếp hạng dựa trên tổng số VNDC Points kiếm được trong khoảng thời gian đã chọn.",
            "Điểm được cập nhật **real-time**.",
            "Trường hợp bằng điểm, xếp hạng sẽ dựa trên thời gian đạt điểm đó sớm hơn."
        ] 
    },
    { 
        title: "Quy đổi và Đổi thưởng", 
        icon: '💵',
        content: [
            "VNDC Points có thể được đổi thành vật phẩm hoặc VNDC thông qua **Cửa Hàng**.",
            "Các giải thưởng theo Rank sẽ được trao vào cuối mỗi Học Kỳ.",
            "Điểm tích lũy không có giá trị quy đổi thành tiền mặt ngoài hệ thống VNDC."
        ] 
    },
];