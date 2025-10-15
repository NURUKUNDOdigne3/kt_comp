import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/analytics - Get analytics data (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const daysAgo = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Get total revenue from orders
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        totalAmount: true,
        status: true,
        createdAt: true,
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;

    // Get previous period for comparison
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - daysAgo);
    
    const prevOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: prevStartDate,
          lt: startDate,
        },
      },
      select: {
        totalAmount: true,
      },
    });

    const prevRevenue = prevOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const prevOrderCount = prevOrders.length;

    const revenueGrowth = prevRevenue > 0 
      ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 
      : 0;
    const ordersGrowth = prevOrderCount > 0 
      ? ((totalOrders - prevOrderCount) / prevOrderCount) * 100 
      : 0;

    // Get customer count
    const totalCustomers = await prisma.user.count({
      where: {
        role: 'CUSTOMER',
        createdAt: {
          gte: startDate,
        },
      },
    });

    const prevCustomers = await prisma.user.count({
      where: {
        role: 'CUSTOMER',
        createdAt: {
          gte: prevStartDate,
          lt: startDate,
        },
      },
    });

    const customersGrowth = prevCustomers > 0 
      ? ((totalCustomers - prevCustomers) / prevCustomers) * 100 
      : 0;

    // Calculate conversion rate (orders / customers)
    const allCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    });
    const conversionRate = allCustomers > 0 ? (totalOrders / allCustomers) * 100 : 0;

    // Get sales by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySales = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Group by month
    const salesByMonth: { [key: string]: number } = {};
    monthlySales.forEach((sale) => {
      const month = new Date(sale.createdAt).toLocaleString('en-US', { month: 'short' });
      salesByMonth[month] = (salesByMonth[month] || 0) + (sale._sum.totalAmount || 0);
    });

    const salesData = Object.entries(salesByMonth).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    // Get category distribution
    const categoryStats = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
    });

    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryStats.map((stat) => stat.categoryId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const categoryData = categoryStats.map((stat) => {
      const category = categories.find((c) => c.id === stat.categoryId);
      return {
        name: category?.name || 'Unknown',
        value: stat._count.id,
      };
    });

    // Get order status distribution
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const statusData = ordersByStatus.map((stat) => ({
      status: stat.status,
      count: stat._count.id,
    }));

    // Get daily performance (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyOrders = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    const performanceByDay: { [key: string]: number } = {};
    dailyOrders.forEach((order) => {
      const day = new Date(order.createdAt).toLocaleString('en-US', { weekday: 'short' });
      performanceByDay[day] = (performanceByDay[day] || 0) + order._count.id;
    });

    const performanceData = Object.entries(performanceByDay).map(([day, performance]) => ({
      day,
      performance,
    }));

    // Get top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const productIds = topProducts.map((p) => p.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    const topProductsData = topProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        name: product?.name || 'Unknown',
        quantity: item._sum.quantity || 0,
        revenue: (item._sum.quantity || 0) * (product?.price || 0),
      };
    });

    return successResponse({
      overview: {
        totalRevenue,
        revenueGrowth: parseFloat(revenueGrowth.toFixed(1)),
        totalOrders,
        ordersGrowth: parseFloat(ordersGrowth.toFixed(1)),
        totalCustomers,
        customersGrowth: parseFloat(customersGrowth.toFixed(1)),
        conversionRate: parseFloat(conversionRate.toFixed(1)),
      },
      salesData,
      categoryData,
      statusData,
      performanceData,
      topProducts: topProductsData,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return errorResponse('Failed to fetch analytics', 500);
  }
}
