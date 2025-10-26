import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ktcomputer.rw' },
    update: {},
    create: {
      email: 'admin@ktcomputer.rw',
      password: adminPassword,
      name: 'Admin User',
      phone: '+250 798 681 126',
      bio: 'System Administrator for KT Computer Supply',
      role: 'ADMIN',
      lastLogin: new Date(),
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create a customer user
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      name: 'John Doe',
      phone: '+250 788 123 456',
      role: 'CUSTOMER',
    },
  });
  console.log('✅ Customer user created:', customer.email);

  // Create categories
  const categories = [
    { name: 'Computers', slug: 'computers', description: 'Laptops and desktop computers' },
    { name: 'Tablets', slug: 'tablets', description: 'Tablets and iPads' },
    { name: 'Printers', slug: 'printers', description: 'Printers and printing solutions' },
    { name: 'Routers', slug: 'routers', description: 'Networking equipment and routers' },
    { name: 'Speakers', slug: 'speakers', description: 'Audio speakers and sound systems' },
    { name: 'Monitors', slug: 'monitors', description: 'Computer monitors and displays' },
  ];

  const createdCategories: any = {};
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories[category.slug] = created;
    console.log(`✅ Category created: ${created.name}`);
  }

  // Create brands
  const brands = [
    { name: 'Apple', slug: 'apple', logo: '/brands/apple.png' },
    { name: 'Dell', slug: 'dell', logo: '/brands/dell.png' },
    { name: 'HP', slug: 'hp', logo: '/brands/hp.png' },
    { name: 'Lenovo', slug: 'lenovo', logo: '/brands/lenovo.png' },
    { name: 'Samsung', slug: 'samsung', logo: '/brands/samsung.png' },
    { name: 'Asus', slug: 'asus', logo: '/brands/asus.png' },
    { name: 'Acer', slug: 'acer', logo: '/brands/acer.png' },
    { name: 'Canon', slug: 'canon', logo: '/brands/canon.png' },
    { name: 'Epson', slug: 'epson', logo: '/brands/epson.png' },
    { name: 'Brother', slug: 'brother', logo: '/brands/brother.png' },
    { name: 'Google', slug: 'google', logo: '/brands/google.png' },
    { name: 'TP-Link', slug: 'tp-link', logo: '/brands/tp-link.png' },
    { name: 'NETGEAR', slug: 'netgear', logo: '/brands/netgear.png' },
    { name: 'JBL', slug: 'jbl', logo: '/brands/jbl.png' },
    { name: 'Sony', slug: 'sony', logo: '/brands/sony.png' },
    { name: 'Bose', slug: 'bose', logo: '/brands/bose.png' },
    { name: 'LG', slug: 'lg', logo: '/brands/lg.png' },
    { name: 'BenQ', slug: 'benq', logo: '/brands/benq.png' },
    { name: 'Modio', slug: 'modio', logo: '/brands/modio.png' },
  ];

  const createdBrands: any = {};
  for (const brand of brands) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
    createdBrands[brand.slug] = created;
    console.log(`✅ Brand created: ${created.name}`);
  }

  // Create sample products
  const products = [
    {
      name: 'MacBook Pro 14" M3 Pro (2024) 18GB 1TB - Space Black',
      slug: 'macbook-pro-m3',
      description: 'Apple M3 Pro, 18GB RAM, 1TB SSD',
      price: 100,
      oldPrice: 2599000,
      image: 'https://macfinder.co.uk/wp-content/uploads/2023/12/img-MacBook-Pro-Retina-14-Inch-96139-scaled.jpg',
      badge: 'New',
      rating: 4.8,
      reviewCount: 127,
      stockCount: 5,
      inStock: true,
      featured: true,
      brandId: createdBrands['apple'].id,
      categoryId: createdCategories['computers'].id,
    },
    {
      name: 'Dell XPS 15 OLED (2024) i9/32GB/1TB RTX 4070',
      slug: 'dell-xps-15',
      description: 'Intel Core i9, 32GB RAM, 1TB SSD, RTX 4070',
      price: 100,
      oldPrice: 2199000,
      image: 'https://astringo-rugged.com/wp-content/uploads/2023/10/Dell-XPS-15-9530-b.jpg',
      badge: 'Hot',
      rating: 4.6,
      reviewCount: 89,
      stockCount: 12,
      inStock: true,
      featured: true,
      brandId: createdBrands['dell'].id,
      categoryId: createdCategories['computers'].id,
    },
    {
      name: 'iPad Pro 12.9" M2 256GB WiFi - Space Gray',
      slug: 'ipad-pro-12-9-m2',
      description: 'Apple M2 chip, 12.9" Liquid Retina XDR display, 256GB storage',
      price: 1299000,
      oldPrice: 1399000,
      image: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-Pro-Spring21_Hero_04202021_big.jpg.large.jpg',
      badge: 'New',
      rating: 4.9,
      reviewCount: 342,
      stockCount: 15,
      inStock: true,
      featured: true,
      brandId: createdBrands['apple'].id,
      categoryId: createdCategories['tablets'].id,
    },
    {
      name: 'iPad Air 10.9" M1 128GB WiFi - Starlight',
      slug: 'ipad-air-m1',
      description: 'Apple M1 chip, 10.9" Liquid Retina display, Touch ID',
      price: 649000,
      oldPrice: 699000,
      image: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_new-ipad-air-hero_03082022_big.jpg.large.jpg',
      badge: 'Hot',
      rating: 4.8,
      reviewCount: 278,
      stockCount: 20,
      inStock: true,
      featured: true,
      brandId: createdBrands['apple'].id,
      categoryId: createdCategories['tablets'].id,
    },
    {
      name: 'Modio Kids Tablet 10" 32GB - Blue',
      slug: 'modio-kids-tablet-blue',
      description: 'Kid-friendly tablet with parental controls, educational apps, durable case',
      price: 89000,
      oldPrice: 119000,
      image: 'https://m.media-amazon.com/images/I/61VN8QHZX5L._AC_SL1500_.jpg',
      badge: 'Sale',
      rating: 4.5,
      reviewCount: 156,
      stockCount: 30,
      inStock: true,
      featured: false,
      brandId: createdBrands['modio'].id,
      categoryId: createdCategories['tablets'].id,
    },
    {
      name: 'Modio Kids Tablet 7" 16GB - Pink',
      slug: 'modio-kids-tablet-pink',
      description: 'Compact kids tablet with educational content, parental controls',
      price: 59000,
      oldPrice: 79000,
      image: 'https://m.media-amazon.com/images/I/71qKXJH3KiL._AC_SL1500_.jpg',
      badge: 'Sale',
      rating: 4.4,
      reviewCount: 98,
      stockCount: 25,
      inStock: true,
      featured: false,
      brandId: createdBrands['modio'].id,
      categoryId: createdCategories['tablets'].id,
    },
    {
      name: 'HP LaserJet Pro M404dn',
      slug: 'hp-laserjet-pro-m404dn',
      description: 'Monochrome Laser Printer, Duplex, Ethernet',
      price: 450000,
      oldPrice: 500000,
      image: 'https://www.blessingcomputers.com/wp-content/uploads/2021/03/HP-LJ-M436DN-2KY38A-WHITE-1.png',
      badge: 'Sale',
      rating: 4.8,
      reviewCount: 198,
      stockCount: 20,
      inStock: true,
      featured: false,
      brandId: createdBrands['hp'].id,
      categoryId: createdCategories['printers'].id,
    },
    {
      name: 'TP-Link Archer AX73 AX5400',
      slug: 'tp-link-archer-ax73',
      description: 'WiFi 6 Router, Dual Band, 5400Mbps',
      price: 189000,
      oldPrice: 219000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXkPX67HY7CIyMamvPTeYWZ7SWYaOevYUMA&s',
      badge: 'Hot',
      rating: 4.7,
      reviewCount: 234,
      stockCount: 25,
      inStock: true,
      featured: false,
      brandId: createdBrands['tp-link'].id,
      categoryId: createdCategories['routers'].id,
    },
    // Speakers
    {
      name: 'JBL Boombox 3',
      slug: 'jbl-boombox-3',
      description: 'Massive Sound, 24hr Battery, IP67 Waterproof',
      price: 549000,
      oldPrice: 599000,
      image: 'https://www.techhive.com/wp-content/uploads/2024/03/jbl-boombox-angled-100894505-orig-2.jpg?quality=50&strip=all&w=1024',
      badge: 'New',
      rating: 4.8,
      reviewCount: 234,
      stockCount: 15,
      inStock: true,
      featured: true,
      brandId: createdBrands['jbl'].id,
      categoryId: createdCategories['speakers'].id,
    },
    {
      name: 'Sony SRS-XG500',
      slug: 'sony-srs-xg500',
      description: 'Portable Bluetooth Speaker, 30hr Battery',
      price: 479000,
      image: 'https://m.media-amazon.com/images/I/81-ncaAy-mS._UF1000,1000_QL80_.jpg',
      badge: 'Hot',
      rating: 4.7,
      reviewCount: 189,
      stockCount: 20,
      inStock: true,
      featured: true,
      brandId: createdBrands['sony'].id,
      categoryId: createdCategories['speakers'].id,
    },
    {
      name: 'Bose SoundLink Revolve+ II',
      slug: 'bose-soundlink-revolve-plus',
      description: '360° Sound, 17hr Battery, Water Resistant',
      price: 429000,
      oldPrice: 479000,
      image: 'https://www.worldshop.eu/medias/img/8916439793694_w1500_z_6830532/bose-soundlink-revolve-ii-thinsp-bluetooth-speaker-luxe-silver.jpeg',
      badge: 'Sale',
      rating: 4.6,
      reviewCount: 312,
      stockCount: 18,
      inStock: true,
      featured: false,
      brandId: createdBrands['bose'].id,
      categoryId: createdCategories['speakers'].id,
    },
    {
      name: 'JBL Flip 6',
      slug: 'jbl-flip-6',
      description: 'Portable Waterproof Speaker, 12hr Battery',
      price: 179000,
      image: 'https://images.crutchfieldonline.com/ImageHandler/trim/620/378/products/2022/8/109/g109FLIP6WH-F.jpg',
      rating: 4.6,
      reviewCount: 445,
      stockCount: 35,
      inStock: true,
      featured: false,
      brandId: createdBrands['jbl'].id,
      categoryId: createdCategories['speakers'].id,
    },
    // Monitors
    {
      name: 'Dell UltraSharp U2723DE 27"',
      slug: 'dell-ultrasharp-u2723de',
      description: 'QHD IPS, USB-C Hub, 100% sRGB',
      price: 649000,
      oldPrice: 699000,
      image: 'https://www.dellonline.co.za/cdn/shop/products/E8F39CC0-00E5-4FB4-B43E-359076AC66B7_122925_1080x.jpg?v=1681477487',
      badge: 'New',
      rating: 4.8,
      reviewCount: 234,
      stockCount: 15,
      inStock: true,
      featured: true,
      brandId: createdBrands['dell'].id,
      categoryId: createdCategories['monitors'].id,
    },
    {
      name: 'LG 27GP850-B 27" Gaming',
      slug: 'lg-27gp850-b',
      description: 'QHD 165Hz, 1ms, G-Sync Compatible',
      price: 549000,
      image: 'https://www.lg.com/content/dam/channel/wcms/my/images/monitors/27gp850-b_ats_eaml_my_c/gallery/medium01.jpg',
      badge: 'Hot',
      rating: 4.7,
      reviewCount: 456,
      stockCount: 20,
      inStock: true,
      featured: true,
      brandId: createdBrands['lg'].id,
      categoryId: createdCategories['monitors'].id,
    },
    {
      name: 'Samsung Odyssey G7 32"',
      slug: 'samsung-odyssey-g7',
      description: 'QHD 240Hz Curved, 1ms, G-Sync',
      price: 899000,
      oldPrice: 999000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg5Zwi4XfZhEcqw6XtY0p8YhWaA3pvu7ugg&s',
      badge: 'Sale',
      rating: 4.8,
      reviewCount: 312,
      stockCount: 12,
      inStock: true,
      featured: false,
      brandId: createdBrands['samsung'].id,
      categoryId: createdCategories['monitors'].id,
    },
    {
      name: 'BenQ PD2725U 27" 4K Designer',
      slug: 'benq-pd2725u',
      description: '4K UHD, 100% sRGB/Rec.709, Thunderbolt 3',
      price: 749000,
      image: 'https://fotospeed.com/media/catalog/product/p/d/pd2725u-04_2.webp',
      badge: 'New',
      rating: 4.8,
      reviewCount: 145,
      stockCount: 10,
      inStock: true,
      featured: false,
      brandId: createdBrands['benq'].id,
      categoryId: createdCategories['monitors'].id,
    },
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`✅ Product created: ${created.name}`);
  }

  // Create sample audit logs
  const auditLogs = [
    {
      action: 'User Login',
      resource: 'Authentication',
      level: 'INFO' as const,
      description: 'Admin user logged in successfully',
      userEmail: admin.email,
      userId: admin.id,
      ipAddress: '192.168.1.100',
    },
    {
      action: 'Product Created',
      resource: 'Products',
      level: 'SUCCESS' as const,
      description: 'Created new product: MacBook Pro 14" M3 Pro',
      userEmail: admin.email,
      userId: admin.id,
      ipAddress: '192.168.1.100',
    },
    {
      action: 'Category Created',
      resource: 'Categories',
      level: 'SUCCESS' as const,
      description: 'Created new category: Computers',
      userEmail: admin.email,
      userId: admin.id,
      ipAddress: '192.168.1.100',
    },
    {
      action: 'Brand Created',
      resource: 'Brands',
      level: 'SUCCESS' as const,
      description: 'Created new brand: Apple',
      userEmail: admin.email,
      userId: admin.id,
      ipAddress: '192.168.1.100',
    },
  ];

  for (const log of auditLogs) {
    await prisma.auditLog.create({
      data: log,
    });
  }
  console.log(`✅ Created ${auditLogs.length} audit log entries`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('Admin:');
  console.log('  Email: admin@ktcomputer.rw');
  console.log('  Password: admin123');
  console.log('\nCustomer:');
  console.log('  Email: customer@example.com');
  console.log('  Password: customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
