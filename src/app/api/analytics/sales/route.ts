import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/analytics/sales - Get detailed sales analytics (Admin only)
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

    // Get all orders in period
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                category: true,
                brand: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate metrics
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

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
    });

    const prevTotalSales = prevOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const prevTotalOrders = prevOrders.length;
    const prevAverageOrderValue = prevTotalOrders > 0 ? prevTotalSales / prevTotalOrders : 0;

    const salesGrowth = prevTotalSales > 0 
      ? ((totalSales - prevTotalSales) / prevTotalSales) * 100 
      : 0;
    const ordersGrowth = prevTotalOrders > 0 
      ? ((totalOrders - prevTotalOrders) / prevTotalOrders) * 100 
      : 0;
    const aovGrowth = prevAverageOrderValue > 0 
      ? ((averageOrderValue - prevAverageOrderValue) / prevAverageOrderValue) * 100 
      : 0;

    // Sales by day
    const salesByDay: { [key: string]: { date: string; sales: number; orders: number } } = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      if (!salesByDay[date]) {
        salesByDay[date] = { date, sales: 0, orders: 0 };
      }
      salesByDay[date].sales += order.totalAmount;
      salesByDay[date].orders += 1;
    });

    const dailySales = Object.values(salesByDay).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Sales by category
    const salesByCategory: { [key: string]: { name: string; sales: number; orders: number } } = {};
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const categoryName = item.product.category.name;
        if (!salesByCategory[categoryName]) {
          salesByCategory[categoryName] = { name: categoryName, sales: 0, orders: 0 };
        }
        salesByCategory[categoryName].sales += item.price * item.quantity;
        salesByCategory[categoryName].orders += 1;
      });
    });

    const categorySales = Object.values(salesByCategory).sort((a, b) => b.sales - a.sales);

    // Sales by brand
    const salesByBrand: { [key: string]: { name: string; sales: number; units: number } } = {};
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const brandName = item.product.brand.name;
        if (!salesByBrand[brandName]) {
          salesByBrand[brandName] = { name: brandName, sales: 0, units: 0 };
        }
        salesByBrand[brandName].sales += item.price * item.quantity;
        salesByBrand[brandName].units += item.quantity;
      });
    });

    const brandSales = Object.values(salesByBrand)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);

    // Sales by status
    const salesByStatus: { [key: string]: { status: string; count: number; revenue: number } } = {};
    orders.forEach((order) => {
      if (!salesByStatus[order.status]) {
        salesByStatus[order.status] = { status: order.status, count: 0, revenue: 0 };
      }
      salesByStatus[order.status].count += 1;
      salesByStatus[order.status].revenue += order.totalAmount;
    });

    const statusBreakdown = Object.values(salesByStatus);

    // Top products
    const productSales: { [key: string]: { id: string; name: string; quantity: number; revenue: number } } = {};
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            id: item.productId,
            name: item.product.name,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Recent orders
    const recentOrders = orders.slice(0, 10).map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.user.name || order.user.email,
      total: order.totalAmount,
      status: order.status,
      items: order.orderItems.length,
      date: order.createdAt,
    }));

    // Sales by hour (for heatmap)
    const salesByHour: { [key: number]: number } = {};
    orders.forEach((order) => {
      const hour = new Date(order.createdAt).getHours();
      salesByHour[hour] = (salesByHour[hour] || 0) + order.totalAmount;
    });

    const hourlySales = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sales: salesByHour[i] || 0,
    }));

    return successResponse({
      overview: {
        totalSales,
        salesGrowth: parseFloat(salesGrowth.toFixed(1)),
        totalOrders,
        ordersGrowth: parseFloat(ordersGrowth.toFixed(1)),
        averageOrderValue: Math.round(averageOrderValue),
        aovGrowth: parseFloat(aovGrowth.toFixed(1)),
      },
      dailySales,
      categorySales,
      brandSales,
      statusBreakdown,
      topProducts,
      recentOrders,
      hourlySales,
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    return errorResponse('Failed to fetch sales analytics', 500);
  }
}
