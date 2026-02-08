import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`/api/orders/my-orders?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-primary">My Orders</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-lg border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                  <th className="py-4 px-6 text-lg font-semibold">Product</th>
                  <th className="py-4 px-6 text-lg font-semibold">Image</th>
                  <th className="py-4 px-6 text-lg font-semibold">Quantity</th>
                  <th className="py-4 px-6 text-lg font-semibold">Price ($)</th>
                  <th className="py-4 px-6 text-lg font-semibold">Status</th>
                  <th className="py-4 px-6 text-lg font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
                    order.cartItems.map((item, idx) => (
                      <tr key={order._id + '-' + idx} className="border-b hover:bg-gray-50 transition">
                        <td className="py-4 px-6 text-center font-medium text-gray-800">{item.name || "-"}</td>
                        <td className="py-4 px-6 text-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-14 w-14 object-cover rounded-xl border border-gray-200 shadow-sm mx-auto" />
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center text-base text-gray-700">{item.quantity || 1}</td>
                        <td className="py-4 px-6 text-center text-base text-green-600 font-semibold">
                          {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : "-"}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${order.delivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.delivered ? "Delivered" : "Pending"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={order._id} className="border-b">
                      <td colSpan={6} className="py-4 px-6 text-center text-gray-400">No items in this order.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;