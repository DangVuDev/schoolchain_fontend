// src/data/events.ts – 10 EVENT SIÊU PHẨM 2025-2026 (ẢNH THẬT + ĐỈNH CAO)
export const EVENTS = [
  // 1. EDM CAMPUS FESTIVAL 2025
  {
    _id: "edm2025",
    title: "EDM Campus Festival 2025",
    slug: "edm-campus-festival-2025",
    shortDescription: "Đại nhạc hội EDM lớn nhất năm – Martin Garrix, Alan Walker, Zedd chính thức đổ bộ!",
    fullDescription: "3 sân khấu chính, 50.000 sinh viên quẩy tung nóc Mỹ Đình với laser 360°, pháo hoa 3D mapping, drone show và after movie cháy hết mình!",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80",
    dateStart: new Date("2025-12-20T17:00:00"),
    dateEnd: new Date("2025-12-21T06:00:00"),
    location: "Sân vận động Quốc gia Mỹ Đình, Hà Nội",
    category: "concert",
    isFeatured: true,
    ticketTypes: [
      { name: "Early Bird", priceVndc: 250000, maxQuantity: 5000, soldQuantity: 5000, benefits: ["Vào sớm 1h", "Lightstick limited"], isActive: false },
      { name: "Standard", priceVndc: 450000, maxQuantity: 20000, soldQuantity: 18950, benefits: ["Vào cửa chính"], isActive: true },
      { name: "VIP Standing", priceVndc: 1200000, maxQuantity: 3000, soldQuantity: 2789, benefits: ["Khu vực riêng sát stage", "Fast-track", "Meet & Greet"], isActive: true },
      { name: "VVIP Table", priceVndc: 25000000, maxQuantity: 50, soldQuantity: 49, benefits: ["Bàn riêng sát sân khấu", "Champagne unlimited", "Chụp ảnh nghệ sĩ"], isActive: true }
    ],
    totalTicketsSold: 26788,
    totalMaxTickets: 28050
  },

  // 2. SPRING MUSIC FESTIVAL 2026
  {
    _id: "spring2026",
    title: "Spring Music Festival 2026",
    slug: "spring-music-festival-2026",
    shortDescription: "Lễ hội âm nhạc mùa xuân bùng nổ – Sơn Tùng M-TP, AMEE, Đức Phúc, MONO, HIEUTHUHAI, tlinh cùng hàng chục sao Vpop!",
    fullDescription: "2 ngày 2 đêm tại SVĐ Quân Khu 7 – sân khấu hoa anh đào, pháo hoa, lightshow, fan meeting, ký tặng...",
    thumbnail: "https://images.pexels.com/photos-1190298/pexels-photo-1190298.jpeg?w=1920",
    dateStart: new Date("2026-03-15T16:00:00"),
    dateEnd: new Date("2026-03-16T02:00:00"),
    location: "Sân vận động Quân Khu 7, TP.HCM",
    category: "festival",
    isFeatured: true,
    ticketTypes: [
      { name: "Standard", priceVndc: 380000, maxQuantity: 10000, soldQuantity: 9430, benefits: ["Vào cửa"], isActive: true },
      { name: "VIP", priceVndc: 880000, maxQuantity: 2000, soldQuantity: 1899, benefits: ["Khu vực riêng", "Gần sân khấu hơn", "Quà tặng"], isActive: true },
      { name: "Diamond Zone", priceVndc: 2500000, maxQuantity: 300, soldQuantity: 298, benefits: ["Sát sân khấu", "Meet & Greet", "Chụp ảnh"], isActive: true }
    ],
    totalTicketsSold: 11627,
    totalMaxTickets: 12300
  },

  // 3. TECHFEST VIETNAM 2025
  {
    _id: "techfest2025",
    title: "TechFest Vietnam 2025",
    slug: "techfest-vietnam-2025",
    shortDescription: "Ngày hội công nghệ lớn nhất Đông Nam Á – AI, Blockchain, Web3, Startup Pitch, Metaverse",
    fullDescription: "Hơn 200 diễn giả quốc tế, 100 gian hàng công nghệ, AI demo, robot, VR experience, hackathon 24h...",
    thumbnail: "https://images.unsplash.com/photo-1505378879411-53f9b15fc835?w=1920&q=80",
    dateStart: new Date("2025-11-08T09:00:00"),
    dateEnd: new Date("2025-11-09T18:00:00"),
    location: "Trung tâm Hội nghị Quốc gia & Đại học Bách Khoa Hà Nội",
    category: "seminar",
    isFeatured: true,
    ticketTypes: [
      { name: "Student Pass", priceVndc: 150000, maxQuantity: 3000, soldQuantity: 2990, benefits: ["Tất cả talk", "Workshop", "Goodie bag"], isActive: true },
      { name: "Professional Pass", priceVndc: 690000, maxQuantity: 800, soldQuantity: 712, benefits: ["Priority seating", "Networking party", "1-1 với speaker"], isActive: true }
    ],
    totalTicketsSold: 3702,
    totalMaxTickets: 3800
  },

  // 4. CAMPUS RAP BATTLE CHAMPIONSHIP 2025
  {
    _id: "rapbattle2025",
    title: "Campus Rap Battle Championship 2025",
    slug: "campus-rap-battle-2025",
    shortDescription: "Giải đấu rap sinh viên lớn nhất Việt Nam – Đen Vâu, Karik, Binz, Suboi làm giám khảo!",
    fullDescription: "Vòng loại online + offline, chung kết trực tiếp tại Nhà văn hóa Sinh viên TP.HCM với sân khấu hoành tráng, âm thanh ánh sáng đỉnh cao...",
    thumbnail: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?w=1920",
    dateStart: new Date("2025-10-25T18:00:00"),
    dateEnd: new Date("2025-10-25T23:30:00"),
    location: "Nhà văn hóa Sinh viên TP.HCM",
    category: "concert",
    isFeatured: true,
    ticketTypes: [
      { name: "General", priceVndc: 280000, maxQuantity: 4000, soldQuantity: 4000, benefits: ["Vào cửa"], isActive: false },
      { name: "Judge Zone", priceVndc: 890000, maxQuantity: 200, soldQuantity: 200, benefits: ["Ngồi cùng giám khảo", "Quà tặng đặc biệt"], isActive: false },
      { name: "Last Minute", priceVndc: 590000, maxQuantity: 300, soldQuantity: 187, benefits: ["Vào cửa", "Limited"], isActive: true }
    ],
    totalTicketsSold: 4387,
    totalMaxTickets: 4500
  },

  // 5. VNDC CAMPUS FASHION WEEK 2025
  {
    _id: "fashionweek2025",
    title: "VNDC Campus Fashion Week 2025",
    slug: "vndc-campus-fashion-week-2025",
    shortDescription: "Tuần lễ thời trang sinh viên lớn nhất Việt Nam – 50 BST từ 20 trường đại học",
    fullDescription: "3 ngày runway hoành tráng, street style, designer talk, pop-up store, red carpet...",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3519b396dd?w=1920&q=80",
    dateStart: new Date("2025-09-20T19:00:00"),
    dateEnd: new Date("2025-09-22T22:00:00"),
    location: "GEM Center, Quận 1, TP.HCM",
    category: "party",
    isFeatured: true,
    ticketTypes: [
      { name: "Standard", priceVndc: 350000, maxQuantity: 1500, soldQuantity: 1234, benefits: ["Xem tất cả show"], isActive: true },
      { name: "Front Row", priceVndc: 1500000, maxQuantity: 100, soldQuantity: 89, benefits: ["Ghế đầu", "Backstage tour", "Goodie bag 5 triệu"], isActive: true }
    ],
    totalTicketsSold: 1323,
    totalMaxTickets: 1600
  },

  // 6. HALLOWEEN CAMPUS RAVE 2025
  {
    _id: "halloween2025",
    title: "Halloween Campus Rave 2025",
    slug: "halloween-campus-rave-2025",
    shortDescription: "Đêm Halloween kinh dị nhất năm – DJ quốc tế, hóa trang, máu giả, pháo giấy, horror house",
        fullDescription: "Tiệc tùng xuyên đêm tại Phố Tây Bùi Viện với sân khấu laser 360°, DJ quốc tế, khu horror house, quầy bar máu giả, cuộc thi hóa trang...",
    thumbnail: "https://images.pexels.com/photos/789296/pexels-photo-789296.jpeg?w=1920",
    dateStart: new Date("2025-10-31T21:00:00"),
    dateEnd: new Date("2025-11-01T05:00:00"),
    location: "Phố Tây Bùi Viện & New World Club, TP.HCM",
    category: "party",
    isFeatured: true,
    ticketTypes: [
      { name: "Early Ghost", priceVndc: 199000, maxQuantity: 2000, soldQuantity: 2000, benefits: ["Vào sớm", "1 shot máu"], isActive: false },
      { name: "Zombie Ticket", priceVndc: 399000, maxQuantity: 5000, soldQuantity: 4890, benefits: ["Vào cửa + 2 ly máu"], isActive: true },
      { name: "Demon VIP", priceVndc: 999000, maxQuantity: 300, soldQuantity: 287, benefits: ["Bàn riêng", "Unlimited drink", "Fast entry"], isActive: true }
    ],
    totalTicketsSold: 7177,
    totalMaxTickets: 7300
  },

  // 7. YEAR-END CAMPUS CONCERT 2025
  {
    _id: "yearend2025",
    title: "Year-End Campus Concert 2025",
    slug: "year-end-campus-concert-2025",
    shortDescription: "Đêm nhạc countdown chào 2026 cùng Hoàng Thùy Linh, HIEUTHUHAI, tlinh, Andree Right Hand, Low G",
    fullDescription: "Tiệc âm nhạc ngoài trời hoành tráng tại Phố đi bộ Nguyễn Huệ với sân khấu laser 360°, pháo hoa countdown, DJ set, quầy food truck...",
    thumbnail: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80",
    dateStart: new Date("2025-12-30T19:00:00"),
    dateEnd: new Date("2025-12-31T02:00:00"),
    location: "Phố đi bộ Nguyễn Huệ, TP.HCM",
    category: "concert",
    isFeatured: true,
    ticketTypes: [
      { name: "Free Zone", priceVndc: 0, maxQuantity: 25000, soldQuantity: 23765, benefits: ["Xem miễn phí", "Khu vực công cộng"], isActive: true },
      { name: "Golden Zone", priceVndc: 999000, maxQuantity: 1000, soldQuantity: 998, benefits: ["Gần sân khấu", "Quà tặng", "Khu vực riêng"], isActive: true },
      { name: "Platinum Table", priceVndc: 15000000, maxQuantity: 30, soldQuantity: 29, benefits: ["Bàn VIP", "Gặp nghệ sĩ", "Rượu cao cấp"], isActive: true }
    ],
    totalTicketsSold: 24792,
    totalMaxTickets: 26030
  },

  // 8. VNDC SUMMER CAMP FESTIVAL 2026
  {
    _id: "summercamp2026",
    title: "VNDC Summer Camp Festival 2026",
    slug: "vndc-summer-camp-2026",
    shortDescription: "Trại hè âm nhạc 3 ngày 2 đêm tại Đà Lạt – lều trại, DJ, BBQ, hồ bơi, countdown sao băng",
    fullDescription: "Trải nghiệm trại hè đẳng cấp với lều trại sang trọng, hồ bơi vô cực, tiệc BBQ ngoài trời, DJ set xuyên đêm, hoạt động team building, countdown dưới bầu trời sao...",
    thumbnail: "https://images.unsplash.com/photo-1504280390367-361ea8d9f37a?w=1920&q=80",
    dateStart: new Date("2026-07-10T15:00:00"),
    dateEnd: new Date("2026-07-13T12:00:00"),
    location: "Đồi thông Prenn & Thung lũng Tình Yêu, Đà Lạt",
    category: "festival",
    isFeatured: true,
    ticketTypes: [
      { name: "Early Camper", priceVndc: 1590000, maxQuantity: 500, soldQuantity: 500, benefits: ["Giá siêu sớm", "Lều xịn", "Ăn uống full"], isActive: false },
      { name: "Camp Ticket", priceVndc: 1890000, maxQuantity: 800, soldQuantity: 789, benefits: ["Lều đôi", "Ăn 3 bữa/ngày", "Tất cả hoạt động"], isActive: true },
      { name: "Glamping VIP", priceVndc: 4900000, maxQuantity: 50, soldQuantity: 48, benefits: ["Lều sang", "Máy lạnh", "BBQ riêng", "Xe đưa đón"], isActive: true }
    ],
    totalTicketsSold: 1337,
    totalMaxTickets: 1350
  },

  // 9. K-POP CAMPUS INVASION 2025
  {
    _id: "kpop2025",
    title: "K-Pop Campus Invasion 2025",
    slug: "kpop-campus-invasion-2025",
    shortDescription: "Lần đầu tiên idol K-Pop biểu diễn tại Việt Nam dành riêng cho sinh viên!",
    fullDescription: "Sự kiện K-Pop hoành tráng với sân khấu laser 360°, fan meeting, ký tặng, merchandise limited, lightstick official...",
    thumbnail: "https://images.pexels.com/photos/789812/pexels-photo-789812.jpeg?w=1920",
    dateStart: new Date("2025-11-22T18:00:00"),
    dateEnd: new Date("2025-11-22T23:00:00"),
    location: "Nhà thi đấu Phú Thọ, TP.HCM",
    category: "concert",
    isFeatured: true,
    ticketTypes: [
      { name: "Standing A", priceVndc: 990000, maxQuantity: 2000, soldQuantity: 1998, benefits: ["Sát sân khấu"], isActive: true },
      { name: "Standing B", priceVndc: 690000, maxQuantity: 3000, soldQuantity: 2789, benefits: ["Khu vực đứng"], isActive: true },
      { name: "Seated VIP", priceVndc: 1500000, maxQuantity: 500, soldQuantity: 498, benefits: ["Ghế ngồi tốt nhất"], isActive: true }
    ],
    totalTicketsSold: 5285,
    totalMaxTickets: 5500
  },

  // 10. WHITE PARTY NEW YEAR 2026
  {
    _id: "whiteparty2026",
    title: "White Party Countdown 2026",
    slug: "white-party-countdown-2026",
    shortDescription: "Đêm tiệc trắng tất niên hoành tráng nhất Đông Nam Á – Dresscode: ALL WHITE",
    fullDescription: "Tiệc trắng sang chảnh tại Landmark 81 Skydeck với view toàn cảnh TP.HCM, DJ quốc tế, quầy champagne, pháo hoa countdown...",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
    dateStart: new Date("2025-12-31T21:00:00"),
    dateEnd: new Date("2026-01-01T06:00:00"),
    location: "Marina Bay, Landmark 81 Skydeck, TP.HCM",
    category: "party",
    isFeatured: true,
    ticketTypes: [
      { name: "Silver", priceVndc: 1990000, maxQuantity: 800, soldQuantity: 756, benefits: ["Vào cửa", "Open bar"], isActive: true },
      { name: "Gold Table", priceVndc: 25000000, maxQuantity: 40, soldQuantity: 38, benefits: ["Bàn riêng view sông", "Champagne", "Fireworks view"], isActive: true }
    ],
    totalTicketsSold: 794,
    totalMaxTickets: 840
  }
] as const