// src/shop/shopService.ts
import { products } from './mockData';

// Định nghĩa kiểu dữ liệu cho sản phẩm
export type Product = typeof products[0];

// --- API Giả định ---

export const searchProducts = async (
    query: string = '', 
    categoryName: string | null = null, 
    sortBy: 'price_asc' | 'date_desc' | 'views' = 'date_desc'
): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập độ trễ API

    let filtered = products;

    // 1. Lọc theo Danh mục
    if (categoryName) {
        filtered = filtered.filter(p => p.category === categoryName);
    }

    // 2. Lọc theo Từ khóa
    if (query) {
        const lowerCaseQuery = query.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(lowerCaseQuery) || 
            p.description.toLowerCase().includes(lowerCaseQuery)
        );
    }

    // 3. Sắp xếp
    filtered.sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'views') return b.views - a.views;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filtered;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.id === id);
};

// ... (các hàm khác)