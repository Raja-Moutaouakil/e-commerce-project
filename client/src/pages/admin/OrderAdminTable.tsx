import React, { useEffect, useState } from "react";
import client from "@/api/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type OrderItem = {
  product?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cartItems: OrderItem[];
  total: number;
  shipping: number;
  createdAt: string;
  delivered?: boolean;
}

const OrderAdminTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await client.get(`/api/orders`);
      setOrders(res.data);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch orders";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (id: string) => {
    try {
      await client.put(`/api/orders/${id}/deliver`);
      setOrders(orders.map(order => (order._id === id ? { ...order, delivered: true } : order)));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update order";
      setError(msg);
    }
  };

  // Delete order
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await client.delete(`/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete order";
      setError(msg);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <Table>
        <TableCaption>All orders placed</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Delivered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>${order.shipping.toFixed(2)}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span>{item.name} x{item.quantity} (${item.price})</span>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2 items-start">
                  {!order.delivered && (
                    <button
                      className="px-3 py-1 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/80 transition border border-border shadow-soft w-full"
                      onClick={() => handleDeliver(order._id)}
                      disabled={order.delivered}
                    >
                      Deliver
                    </button>
                  )}
                  <button
                    className="px-3 py-1 rounded bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/80 transition border border-border shadow-soft w-full"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                  {order.delivered && (
                    <span className="mt-1 px-3 py-1 rounded bg-green-100 text-green-700 font-semibold border border-green-300 shadow-soft w-full text-center">
                      Delivered
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderAdminTable;
