import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import ProductAdminTable from './ProductAdminTable';
import axios from 'axios';
import OrderAdminTable from './OrderAdminTable';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [revenue, setRevenue] = useState<number | null>(null);
  const [productsCount, setProductsCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch orders count and revenue
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders`);
        setOrdersCount(res.data.length);
        const totalRevenue = res.data.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        setRevenue(totalRevenue);
      } catch (err) {
        setOrdersCount(null);
        setRevenue(null);
      }
    };
    // Fetch products count
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProductsCount(res.data.length);
      } catch (err) {
        setProductsCount(null);
      }
    };
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-6">Welcome{user ? `, ${user.name}` : ''}. Overview and quick actions.</p>

        <ProductAdminTable />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg">Products<br/><span className="text-2xl font-bold">{productsCount !== null ? productsCount : '—'}</span></div>
          <div className="p-4 bg-card rounded-lg">Orders<br/><span className="text-2xl font-bold">{ordersCount !== null ? ordersCount : '—'}</span></div>
          <div className="p-4 bg-card rounded-lg">Revenue<br/><span className="text-2xl font-bold">{revenue !== null ? `$${revenue}` : '—'}</span></div>
        </div>
        <section className="mt-8">
          <h2 className="text-xl font-medium mb-2">Quick Links</h2>
          <div className="flex gap-3">
            <a href="/admin/products" className="btn">Manage Products</a>
            <a href="/admin/orders" className="btn">View Orders</a>
          </div>
        </section>
        <div className="mt-12">
          <OrderAdminTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;