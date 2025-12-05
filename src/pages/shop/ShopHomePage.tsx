// src/shop/pages/ShopHomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchProducts, type Product } from './shopService';
import { categories } from './mockData';

// Giả định ICON
const ICON: { [key: string]: string } = {
  Search: '🔎',
  Filter: '⚙️',
  Sort: '⬆️⬇️',
  Location: '📍',
  Heart: '❤️',
  New: '✨',
  Buy: '🛒',
  Electronics: '📱',
  Books: '📚',
};

// Component Card Sản phẩm
const ProductCard = ({ product }: { product: Product }) => {
  // Tìm icon phù hợp
  const categoryIcon = categories.find((c: any) => c.name === product.category)?.icon || '🎁';

  return (
    // Thay đổi Link to đường dẫn chi tiết sản phẩm
    <Link to={`/shop/product/${product.id}`} className="block bg-slate-800/80 rounded-xl shadow-lg hover:shadow-purple-500/30 transition duration-300 transform hover:scale-[1.02]">
      <div className="relative h-40 bg-gray-700 rounded-t-xl overflow-hidden">
          {/* Giả định hình ảnh */}
          <div className="flex items-center justify-center h-full text-5xl bg-gray-700/50">
              {categoryIcon}
          </div>
          <div className="absolute top-2 right-2 bg-pink-600 px-3 py-1 rounded-full text-xs font-semibold">{product.category}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate text-white mb-1">{product.title}</h3>
        <p className="text-2xl font-black text-yellow-400 mb-2">
          {product.price.toLocaleString('vi-VN')} VND
        </p>
        <div className="flex justify-between text-sm opacity-70">
          <span>{product.condition}</span>
          <span className="flex items-center gap-1">{ICON.Location} {product.location}</span>
        </div>
        <div className="mt-3 flex justify-between items-center text-xs opacity-60">
          <span className="flex items-center gap-1">{ICON.Heart} {product.likes} Likes</span>
          <span>{product.views} Views</span>
        </div>
      </div>
    </Link>
  );
}


export default function ShopHomePage() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState(''); // State để kích hoạt useEffect
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price_asc' | 'date_desc' | 'views'>('date_desc');


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Sử dụng filterQuery để tránh fetch liên tục khi gõ
        const data = await searchProducts(filterQuery, selectedCategory, sortBy);
        setProductsList(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filterQuery, selectedCategory, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Cập nhật filterQuery để kích hoạt useEffect
    setFilterQuery(searchQuery);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div className="bg-gradient-to-b from-purple-900/50 via-pink-900/30 to-slate-900 pt-10 pb-16 shadow-2xl">
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 flex items-center justify-center gap-3">
            <span className="text-green-400">{ICON.Buy}</span> Market Place
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Mua bán, trao đổi đồ dùng cá nhân và dịch vụ.</p>
        </div>
        
        {/* --- Thanh tìm kiếm và Tạo bài đăng --- */}
        <div className="max-w-4xl mx-auto px-4 mb-1">
            <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sách, điện thoại, dịch vụ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                    <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 text-2xl text-purple-400">
                        {ICON.Search}
                    </button>
                </div>
                <Link to="/shop/create" className="bg-pink-600 hover:bg-pink-700 px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition whitespace-nowrap">
                    {ICON.New} Đăng Bán
                </Link>
            </form>
        </div>
      </div>

      {/* --- Khu vực Lọc và Sắp xếp --- */}
      <div className="max-w-6xl mx-auto px-4 mt-3">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          
          {/* Lọc Category */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {/* Nút All */}
            <button
                onClick={() => {
                    setSelectedCategory(null);
                    setFilterQuery(''); // Reset tìm kiếm khi chuyển Category
                    setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${!selectedCategory ? 'bg-purple-600 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
                Tất Cả Sản Phẩm
            </button>
            
            {/* Các Category khác */}
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => {
                    setSelectedCategory(cat.name);
                    setFilterQuery('');
                    setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition whitespace-nowrap ${selectedCategory === cat.name ? 'bg-purple-600 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {cat.icon} {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Sắp xếp */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-gray-700 border border-white/20 rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer"
          >
            <option value="date_desc">{ICON.Sort} Mới nhất</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="views">Phổ biến nhất</option>
          </select>
        </div>

        {/* --- Tiêu đề và Danh sách Sản phẩm --- */}
        <h2 className="text-2xl font-bold text-purple-400 mb-4">
            {filterQuery ? `Kết quả tìm kiếm cho "${filterQuery}"` : selectedCategory || 'Sản phẩm mới nhất'}
        </h2>
        
        {loading ? (
          <div className="text-center py-10 text-lg opacity-70">Đang tải sản phẩm...</div>
        ) : productsList.length === 0 ? (
          <div className="text-center py-10 text-lg opacity-70">
            Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {productsList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}