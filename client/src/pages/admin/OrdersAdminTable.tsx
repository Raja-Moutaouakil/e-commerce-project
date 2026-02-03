import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/layout/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const OrdersAdminTable: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/orders`);
        setOrders(res.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {loading ? (
          <div>Loading orders...</div>
        ) : (
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Shipping</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td className="px-4 py-2 border">{order.phone}</td>
                  <td className="px-4 py-2 border">{order.address}, {order.city}, {order.postalCode}</td>
                  <td className="px-4 py-2 border">
                    <ul>
                      {order.cartItems.map((item: any, idx: number) => (
                        <li key={idx}>
                          <span className="font-semibold">{item.name}</span> x{item.quantity} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border">${order.total}</td>
                  <td className="px-4 py-2 border">${order.shipping}</td>
                  <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default OrdersAdminTable;