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
    { name: 'Phones', slug: 'phones', description: 'Smartphones and mobile devices' },
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
    { name: 'OnePlus', slug: 'oneplus', logo: '/brands/1plus.png' },
    { name: 'Xiaomi', slug: 'xiaomi', logo: '/brands/xiaomi.png' },
    { name: 'TP-Link', slug: 'tp-link', logo: '/brands/tp-link.png' },
    { name: 'NETGEAR', slug: 'netgear', logo: '/brands/netgear.png' },
    { name: 'JBL', slug: 'jbl', logo: '/brands/jbl.png' },
    { name: 'Sony', slug: 'sony', logo: '/brands/sony.png' },
    { name: 'Bose', slug: 'bose', logo: '/brands/bose.png' },
    { name: 'LG', slug: 'lg', logo: '/brands/lg.png' },
    { name: 'BenQ', slug: 'benq', logo: '/brands/benq.png' },
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
      price: 2399000,
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
      price: 1999000,
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
      name: 'iPhone 15 Pro Max 256GB - Natural Titanium',
      slug: 'iphone-15-pro-max',
      description: 'A17 Pro chip, 256GB storage, ProMotion display',
      price: 1299000,
      oldPrice: 1399000,
      image: 'https://eworkshop.co.za/cdn/shop/files/iPhone15ProMax256GB-NaturalTitanium.png?v=1726073287&width=1946',
      badge: 'New',
      rating: 4.9,
      reviewCount: 342,
      stockCount: 15,
      inStock: true,
      featured: true,
      brandId: createdBrands['apple'].id,
      categoryId: createdCategories['phones'].id,
    },
    {
      name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Gray',
      slug: 'samsung-s24-ultra',
      description: 'Snapdragon 8 Gen 3, 512GB, S Pen included',
      price: 1349000,
      oldPrice: 1449000,
      image: 'https://d2x1ielih67ej4.cloudfront.net/media/ee/41/18/1706117313/SM-S928BZTHEUB%205.webp?ts=1706117313',
      badge: 'New',
      rating: 4.8,
      reviewCount: 278,
      stockCount: 12,
      inStock: true,
      featured: true,
      brandId: createdBrands['samsung'].id,
      categoryId: createdCategories['phones'].id,
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
