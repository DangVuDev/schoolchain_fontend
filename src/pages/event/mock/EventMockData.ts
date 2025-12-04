import {type  Event } from '../types/EventTypes';

export const EVENT_MOCK_DATA: Event[] = [
  {
    id: 'evt-001',
    title: 'Hội thảo React Advanced 2025',
    description: 'Học các kỹ thuật mới nhất về React 19, Server Components, Streaming SSR...',
    startDate: '2025-12-20T09:00:00+07:00',
    endDate: '2025-12-20T17:00:00+07:00',
    location: 'Hồ Chí Minh',
    address: 'Quận 1, Tòa nhà Landmark 81',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'Công nghệ',
    status: 'upcoming',
    ticketPrice: 1500000,
    maxParticipants: 200,
    currentParticipants: 156,
    organizer: {
      name: 'Vietnam React Community',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    tags: ['react', 'frontend', 'workshop', '2025']
  },
  {
    id: 'evt-002',
    title: 'Âm nhạc đường phố Vol.12',
    description: 'Đêm nhạc acoustic bên hồ Hoàn Kiếm với các nghệ sĩ indie nổi bật',
    startDate: '2025-12-15T19:00:00+07:00',
    endDate: '2025-12-15T23:00:00+07:00',
    location: 'Hà Nội',
    address: 'Phố đi bộ Hồ Gươm',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbb7f33?w=800',
    category: 'Âm nhạc',
    status: 'upcoming',
    ticketPrice: 0,
    maxParticipants: 1000,
    currentParticipants: 890,
    organizer: {
      name: 'Hà Nội Street Music'
    },
    tags: ['acoustic', 'indie', 'miễn phí']
  },
  {
    id: 'evt-003',
    title: 'Hội chợ ẩm thực Hàn Quốc 2025',
    description: 'Trải nghiệm hơn 50 gian hàng ẩm thực đường phố Hàn Quốc chính gốc',
    startDate: '2025-12-10T10:00:00+07:00',
    endDate: '2025-12-12T22:00:00+07:00',
    location: 'Hồ Chí Minh',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    category: 'Ẩm thực',
    status: 'ongoing',
    ticketPrice: 100000,
    maxParticipants: 5000,
    currentParticipants: 4230,
    organizer: {
      name: 'Korean Cultural Center Vietnam'
    },
    tags: ['korea', 'food', 'festival']
  },
  {
    id: 'evt-004',
    title: 'Workshop Design Thinking',
    description: 'Áp dụng Design Thinking vào sản phẩm thực tế cùng chuyên gia từ Figma',
    startDate: '2025-11-28T09:00:00+07:00',
    endDate: '2025-11-28T16:00:00+07:00',
    location: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    category: 'Thiết kế',
    status: 'ended',
    ticketPrice: 800000,
    maxParticipants: 100,
    currentParticipants: 100,
    organizer: {
      name: 'UX Vietnam'
    },
    tags: ['design', 'ux', 'online', 'workshop']
  }
];