// Mock data cho sản phẩm giáo dục
export const mockProducts = [
  {
    id: 1,
    name: "Khóa học Tiếng Anh Giao tiếp Cơ bản",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    description: "Khóa học tiếng Anh giao tiếp cơ bản dành cho người mới bắt đầu",
    fullDescription: "Khóa học tiếng Anh giao tiếp cơ bản được thiết kế dành cho người mới bắt đầu học tiếng Anh. Với phương pháp học tập hiện đại, bạn sẽ nhanh chóng cải thiện khả năng giao tiếp tiếng Anh của mình. Khóa học bao gồm 20 bài học tương tác, nhiều bài tập thực hành và được hỗ trợ bởi giáo viên bản ngữ.",
    category: "Ngoại ngữ",
    rating: 4.8,
    reviews: 1234,
    instructor: "John Smith",
    duration: "40 giờ",
    level: "Cơ bản",
    students: 12450,
    tags: ["tiếng anh", "giao tiếp", "cơ bản"],
    discount: 25
  },
  {
    id: 2,
    name: "Lập trình React.js từ A đến Z",
    price: 599000,
    originalPrice: 799000,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    description: "Học lập trình React.js từ cơ bản đến nâng cao với dự án thực tế",
    fullDescription: "Khóa học lập trình React.js toàn diện giúp bạn thành thạo framework phổ biến nhất hiện nay. Từ những khái niệm cơ bản về components, state, props đến những kỹ thuật nâng cao như hooks, context API, và optimization. Bạn sẽ xây dựng 3 dự án thực tế hoàn chỉnh.",
    category: "Lập trình",
    rating: 4.9,
    reviews: 2156,
    instructor: "Nguyễn Văn A",
    duration: "60 giờ",
    level: "Trung bình",
    students: 8734,
    tags: ["react", "javascript", "frontend"],
    discount: 25
  },
  {
    id: 3,
    name: "Thiết kế UI/UX với Figma",
    price: 399000,
    originalPrice: 499000,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
    description: "Học thiết kế giao diện người dùng hiện đại với Figma",
    fullDescription: "Khóa học thiết kế UI/UX với Figma dành cho người mới bắt đầu và những ai muốn nâng cao kỹ năng thiết kế. Bạn sẽ học cách sử dụng Figma một cách chuyên nghiệp, từ các công cụ cơ bản đến việc tạo ra những prototype tương tác phức tạp.",
    category: "Thiết kế",
    rating: 4.7,
    reviews: 987,
    instructor: "Trần Thị B",
    duration: "35 giờ",
    level: "Cơ bản",
    students: 5432,
    tags: ["ui", "ux", "figma", "thiết kế"],
    discount: 20
  },
  {
    id: 4,
    name: "Marketing Digital 2024",
    price: 799000,
    originalPrice: 999000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    description: "Chiến lược marketing digital hiệu quả cho doanh nghiệp",
    fullDescription: "Khóa học marketing digital toàn diện với những chiến lược mới nhất năm 2024. Bạn sẽ học cách xây dựng chiến lược marketing đa kênh, tối ưu hóa quảng cáo Facebook, Google Ads, SEO, và email marketing. Khóa học bao gồm nhiều case study thực tế từ các doanh nghiệp thành công.",
    category: "Marketing",
    rating: 4.6,
    reviews: 1543,
    instructor: "Lê Văn C",
    duration: "50 giờ",
    level: "Nâng cao",
    students: 9876,
    tags: ["marketing", "digital", "ads", "seo"],
    discount: 20
  },
  {
    id: 5,
    name: "Python cho Data Science",
    price: 699000,
    originalPrice: 899000,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    description: "Học Python và phân tích dữ liệu với pandas, numpy, matplotlib",
    fullDescription: "Khóa học Python cho Data Science giúp bạn thành thạo việc phân tích dữ liệu với Python. Bạn sẽ học cách sử dụng các thư viện quan trọng như pandas, numpy, matplotlib, seaborn và scikit-learn. Khóa học bao gồm nhiều dự án thực tế với dữ liệu thật.",
    category: "Lập trình",
    rating: 4.8,
    reviews: 2087,
    instructor: "Phạm Thị D",
    duration: "45 giờ",
    level: "Trung bình",
    students: 7654,
    tags: ["python", "data science", "pandas", "numpy"],
    discount: 22
  },
  {
    id: 6,
    name: "Tiếng Nhật Sơ cấp N5",
    price: 399000,
    originalPrice: 499000,
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
    description: "Khóa học tiếng Nhật chuẩn bị cho kỳ thi N5 JLPT",
    fullDescription: "Khóa học tiếng Nhật sơ cấp N5 được thiết kế theo chuẩn JLPT với giáo trình được biên soạn bởi các chuyên gia người Nhật. Bạn sẽ học từ vựng, ngữ pháp, và kanji cần thiết cho kỳ thi N5. Khóa học bao gồm nhiều bài tập thực hành và đề thi thử.",
    category: "Ngoại ngữ",
    rating: 4.7,
    reviews: 876,
    instructor: "Yamada Sensei",
    duration: "60 giờ",
    level: "Cơ bản",
    students: 3421,
    tags: ["tiếng nhật", "n5", "jlpt"],
    discount: 20
  },
  {
    id: 7,
    name: "Kỹ năng Thuyết trình Chuyên nghiệp",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    description: "Nâng cao kỹ năng thuyết trình và giao tiếp trước đám đông",
    fullDescription: "Khóa học kỹ năng thuyết trình chuyên nghiệp giúp bạn tự tin giao tiếp trước đám đông. Bạn sẽ học cách chuẩn bị nội dung, thiết kế slide hiệu quả, và kỹ thuật trình bày cuốn hút. Khóa học bao gồm nhiều bài tập thực hành và feedback từ giảng viên.",
    category: "Kỹ năng mềm",
    rating: 4.5,
    reviews: 654,
    instructor: "Hoàng Văn E",
    duration: "25 giờ",
    level: "Cơ bản",
    students: 2109,
    tags: ["thuyết trình", "giao tiếp", "kỹ năng mềm"],
    discount: 25
  },
  {
    id: 8,
    name: "Photoshop CC 2024 Toàn tập",
    price: 499000,
    originalPrice: 699000,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    description: "Học Photoshop từ cơ bản đến nâng cao với dự án thực tế",
    fullDescription: "Khóa học Photoshop CC 2024 toàn tập giúp bạn thành thạo phần mềm chỉnh sửa ảnh phổ biến nhất. Từ những công cụ cơ bản đến kỹ thuật nâng cao như composite, retouching, và digital painting. Bạn sẽ thực hành qua 50+ dự án thực tế.",
    category: "Thiết kế",
    rating: 4.8,
    reviews: 1432,
    instructor: "Nguyễn Thị F",
    duration: "40 giờ",
    level: "Tất cả",
    students: 6543,
    tags: ["photoshop", "chỉnh sửa ảnh", "thiết kế"],
    discount: 29
  },
  {
    id: 9,
    name: "JavaScript ES6+ và Modern Web Development",
    price: 549000,
    originalPrice: 749000,
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=300&fit=crop",
    description: "Nắm vững JavaScript hiện đại và xây dựng ứng dụng web chuyên nghiệp",
    fullDescription: "Khóa học JavaScript ES6+ toàn diện giúp bạn thành thạo ngôn ngữ lập trình phổ biến nhất. Học về arrow functions, async/await, destructuring, modules, và nhiều tính năng hiện đại khác. Xây dựng 5 dự án thực tế từ cơ bản đến nâng cao.",
    category: "Lập trình",
    rating: 4.9,
    reviews: 2341,
    instructor: "Lê Minh Hoàng",
    duration: "55 giờ",
    level: "Trung bình",
    students: 9876,
    tags: ["javascript", "es6", "web development", "frontend"],
    discount: 27
  },
  {
    id: 10,
    name: "Tiếng Trung HSK 4-5",
    price: 699000,
    originalPrice: 899000,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "Khóa học tiếng Trung chuẩn bị cho kỳ thi HSK level 4-5",
    fullDescription: "Khóa học tiếng Trung HSK 4-5 được thiết kế để giúp bạn đạt trình độ trung cấp khá trong tiếng Trung. Bao gồm từ vựng, ngữ pháp, luyện nghe và nói theo chuẩn HSK. Có giáo viên bản ngữ và nhiều tài liệu thực hành.",
    category: "Ngoại ngữ",
    rating: 4.6,
    reviews: 876,
    instructor: "Wang Li Ming",
    duration: "80 giờ",
    level: "Trung bình",
    students: 4321,
    tags: ["tiếng trung", "hsk", "trung quốc"],
    discount: 22
  },
  {
    id: 11,
    name: "Excel chuyên sâu cho Doanh nghiệp",
    price: 399000,
    originalPrice: 599000,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    description: "Thành thạo Excel từ cơ bản đến nâng cao với các hàm phức tạp",
    fullDescription: "Khóa học Excel chuyên sâu giúp bạn thành thạo các công cụ phân tích dữ liệu, tạo báo cáo chuyên nghiệp và tự động hóa công việc. Học về Pivot Table, VBA, Power Query và nhiều tính năng nâng cao khác.",
    category: "Kỹ năng mềm",
    rating: 4.7,
    reviews: 1876,
    instructor: "Nguyễn Thanh Tùng",
    duration: "30 giờ",
    level: "Trung bình",
    students: 8765,
    tags: ["excel", "văn phòng", "phân tích dữ liệu"],
    discount: 33
  },
  {
    id: 12,
    name: "Node.js & MongoDB - Backend Development",
    price: 799000,
    originalPrice: 1099000,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    description: "Xây dựng API và ứng dụng backend với Node.js và MongoDB",
    fullDescription: "Khóa học backend development toàn diện với Node.js và MongoDB. Học cách xây dựng RESTful API, authentication, database design, và deploy ứng dụng. Bao gồm Express.js, Mongoose, JWT, và nhiều công nghệ hiện đại khác.",
    category: "Lập trình",
    rating: 4.8,
    reviews: 1654,
    instructor: "Trần Văn Phúc",
    duration: "70 giờ",
    level: "Nâng cao",
    students: 5432,
    tags: ["nodejs", "mongodb", "backend", "api"],
    discount: 27
  },
  {
    id: 13,
    name: "Social Media Marketing 2024",
    price: 599000,
    originalPrice: 799000,
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=300&fit=crop",
    description: "Chiến lược marketing trên các nền tảng mạng xã hội",
    fullDescription: "Khóa học marketing mạng xã hội toàn diện với chiến lược cho Facebook, Instagram, TikTok, YouTube và LinkedIn. Học cách tạo content viral, quản lý community, chạy ads hiệu quả và đo lường ROI.",
    category: "Marketing",
    rating: 4.5,
    reviews: 2109,
    instructor: "Phạm Thị Mai",
    duration: "45 giờ",
    level: "Cơ bản",
    students: 12340,
    tags: ["social media", "facebook ads", "content marketing"],
    discount: 25
  },
  {
    id: 14,
    name: "Adobe Illustrator Vector Art",
    price: 449000,
    originalPrice: 649000,
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop",
    description: "Thiết kế vector chuyên nghiệp với Adobe Illustrator",
    fullDescription: "Khóa học Adobe Illustrator từ cơ bản đến nâng cao. Học cách tạo logo, icon, illustration và artwork vector chuyên nghiệp. Bao gồm typography, color theory và các kỹ thuật thiết kế hiện đại.",
    category: "Thiết kế",
    rating: 4.7,
    reviews: 987,
    instructor: "Lê Thị Hương",
    duration: "35 giờ",
    level: "Trung bình",
    students: 4567,
    tags: ["illustrator", "vector", "logo design"],
    discount: 31
  },
  {
    id: 15,
    name: "Lập trình Mobile với Flutter",
    price: 899000,
    originalPrice: 1299000,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    description: "Phát triển ứng dụng di động đa nền tảng với Flutter",
    fullDescription: "Khóa học Flutter toàn diện giúp bạn xây dựng ứng dụng mobile cho cả iOS và Android. Học về Dart programming, Widget system, state management, API integration và publish app lên store.",
    category: "Lập trình",
    rating: 4.9,
    reviews: 1234,
    instructor: "Hoàng Minh Đức",
    duration: "90 giờ",
    level: "Nâng cao",
    students: 3456,
    tags: ["flutter", "mobile", "dart", "ios", "android"],
    discount: 31
  },
  {
    id: 16,
    name: "Kỹ năng Lãnh đạo và Quản lý",
    price: 599000,
    originalPrice: 899000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Phát triển kỹ năng lãnh đạo và quản lý nhóm hiệu quả",
    fullDescription: "Khóa học kỹ năng lãnh đạo toàn diện giúp bạn trở thành leader xuất sắc. Học về team building, conflict resolution, strategic thinking, và emotional intelligence. Bao gồm nhiều case study thực tế.",
    category: "Kỹ năng mềm",
    rating: 4.6,
    reviews: 1543,
    instructor: "Nguyễn Quang Vinh",
    duration: "40 giờ",
    level: "Nâng cao",
    students: 6789,
    tags: ["leadership", "management", "soft skills"],
    discount: 33
  },
  {
    id: 17,
    name: "AWS Cloud Architect Professional",
    price: 1299000,
    originalPrice: 1799000,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    description: "Trở thành Cloud Architect chuyên nghiệp với AWS",
    fullDescription: "Khóa học AWS Cloud Architect Professional giúp bạn thành thạo việc thiết kế và triển khai các giải pháp cloud trên AWS. Bao gồm EC2, S3, RDS, Lambda, VPC, và nhiều service khác. Chuẩn bị cho chứng chỉ AWS Solutions Architect Professional.",
    category: "Lập trình",
    rating: 4.9,
    reviews: 987,
    instructor: "DevOps Master",
    duration: "120 giờ",
    level: "Nâng cao",
    students: 2345,
    tags: ["aws", "cloud", "devops", "architecture"],
    discount: 28
  },
  {
    id: 18,
    name: "Machine Learning & AI Bootcamp",
    price: 1599000,
    originalPrice: 2199000,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    description: "Bootcamp Machine Learning và AI từ cơ bản đến triển khai",
    fullDescription: "Bootcamp Machine Learning và AI toàn diện với Python, TensorFlow, PyTorch. Học về deep learning, computer vision, NLP, và MLOps. Xây dựng 10+ dự án AI thực tế và triển khai lên production.",
    category: "Lập trình",
    rating: 4.8,
    reviews: 1543,
    instructor: "Dr. AI Expert",
    duration: "150 giờ",
    level: "Nâng cao",
    students: 1876,
    tags: ["machine learning", "ai", "python", "tensorflow"],
    discount: 27
  },
  {
    id: 19,
    name: "Digital Transformation for Enterprises",
    price: 1199000,
    originalPrice: 1599000,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    description: "Chuyển đổi số toàn diện cho doanh nghiệp",
    fullDescription: "Khóa học chuyển đổi số dành cho lãnh đạo và quản lý cấp cao. Học về chiến lược digital, technology adoption, change management, và digital culture. Bao gồm case study từ các tập đoàn lớn.",
    category: "Marketing",
    rating: 4.7,
    reviews: 876,
    instructor: "CEO Advisor",
    duration: "80 giờ",
    level: "Nâng cao",
    students: 1234,
    tags: ["digital transformation", "strategy", "leadership"],
    discount: 25
  },
  {
    id: 20,
    name: "3D Animation & VFX Masterclass",
    price: 1399000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    description: "Thiết kế 3D Animation và Visual Effects chuyên nghiệp",
    fullDescription: "Masterclass 3D Animation và VFX với Blender, After Effects, và Cinema 4D. Học về modeling, rigging, animation, lighting, và compositing. Tạo ra các tác phẩm 3D và VFX chất lượng Hollywood.",
    category: "Thiết kế",
    rating: 4.9,
    reviews: 654,
    instructor: "VFX Studio Pro",
    duration: "100 giờ",
    level: "Nâng cao",
    students: 987,
    tags: ["3d animation", "vfx", "blender", "after effects"],
    discount: 26
  },
  {
    id: 21,
    name: "Executive English for Global Business",
    price: 1099000,
    originalPrice: 1499000,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
    description: "Tiếng Anh thương mại cấp cao cho lãnh đạo doanh nghiệp",
    fullDescription: "Khóa học tiếng Anh thương mại cấp cao dành cho C-level executives và senior managers. Tập trung vào presentation skills, negotiation, international meetings, và cross-cultural communication. 1-on-1 coaching với native speakers.",
    category: "Ngoại ngữ",
    rating: 4.8,
    reviews: 432,
    instructor: "Business English Expert",
    duration: "60 giờ",
    level: "Nâng cao",
    students: 765,
    tags: ["business english", "executive", "communication"],
    discount: 27
  },
  {
    id: 22,
    name: "Cybersecurity & Ethical Hacking",
    price: 1299000,
    originalPrice: 1699000,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    description: "Chuyên gia bảo mật và ethical hacking",
    fullDescription: "Khóa học cybersecurity toàn diện với penetration testing, network security, malware analysis, và incident response. Chuẩn bị cho các chứng chỉ CEH, CISSP, và OSCP. Hands-on labs với các tool chuyên nghiệp.",
    category: "Lập trình",
    rating: 4.9,
    reviews: 1098,
    instructor: "Security Specialist",
    duration: "110 giờ",
    level: "Nâng cao",
    students: 1543,
    tags: ["cybersecurity", "ethical hacking", "penetration testing"],
    discount: 24
  },
  {
    id: 23,
    name: "Investment & Portfolio Management",
    price: 1199000,
    originalPrice: 1599000,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    description: "Quản lý đầu tư và danh mục chuyên nghiệp",
    fullDescription: "Khóa học quản lý đầu tư chuyên sâu với phân tích kỹ thuật, fundamental analysis, risk management, và portfolio optimization. Học về stocks, bonds, derivatives, và alternative investments. Sử dụng Bloomberg Terminal.",
    category: "Kỹ năng mềm",
    rating: 4.7,
    reviews: 876,
    instructor: "Finance Professional",
    duration: "75 giờ",
    level: "Nâng cao",
    students: 1234,
    tags: ["investment", "finance", "portfolio management"],
    discount: 25
  }
];

export const categories = [
  { id: "all", name: "Tất cả", count: mockProducts.length },
  { id: "lap-trinh", name: "Lập trình", count: mockProducts.filter(p => p.category === "Lập trình").length },
  { id: "ngoai-ngu", name: "Ngoại ngữ", count: mockProducts.filter(p => p.category === "Ngoại ngữ").length },
  { id: "thiet-ke", name: "Thiết kế", count: mockProducts.filter(p => p.category === "Thiết kế").length },
  { id: "marketing", name: "Marketing", count: mockProducts.filter(p => p.category === "Marketing").length },
  { id: "ky-nang-mem", name: "Kỹ năng mềm", count: mockProducts.filter(p => p.category === "Kỹ năng mềm").length }
];

export const priceRanges = [
  { id: "all", name: "Tất cả", min: 0, max: Infinity },
  { id: "under-500k", name: "Dưới 500K", min: 0, max: 500000 },
  { id: "500k-1m", name: "500K - 1 triệu", min: 500000, max: 1000000 },
  { id: "above-1m", name: "Trên 1 triệu", min: 1000000, max: Infinity }
];

export const sortOptions = [
  { id: "popularity", name: "Phổ biến nhất" },
  { id: "price-asc", name: "Giá thấp đến cao" },
  { id: "price-desc", name: "Giá cao đến thấp" },
  { id: "rating", name: "Đánh giá cao nhất" },
  { id: "newest", name: "Mới nhất" }
];
