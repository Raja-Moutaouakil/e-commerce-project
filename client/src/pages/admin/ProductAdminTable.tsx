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

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  countInStock?: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductAdminTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CRUD states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await client.get(`/api/products`);
      setProducts(res.data);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch products";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create product
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name as string);
      formData.append('description', newProduct.description as string);
      formData.append('price', String(newProduct.price));
      formData.append('category', newProduct.category as string);
      formData.append('countInStock', String(newProduct.countInStock || 0));
      if (newProduct.image && newProduct.image instanceof File) {
        formData.append('image', newProduct.image);
      }
      const res = await client.post(`/api/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts([...products, res.data]);
      setNewProduct({});
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && (err as any).response?.status === 403
        ? 'Forbidden: Admin access required'
        : err instanceof Error ? err.message : "Failed to create product";
      setError(msg);
    }
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setEditData(product);
  };

  // Update product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editData.name as string);
      formData.append('description', editData.description as string);
      formData.append('price', String(editData.price));
      formData.append('category', editData.category as string);
      formData.append('countInStock', String(editData.countInStock || 0));
      if (editData.image && editData.image instanceof File) {
        formData.append('image', editData.image);
      }
      const res = await client.put(`/api/products/${editingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts(products.map(p => (p._id === editingId ? res.data : p)));
      setEditingId(null);
      setEditData({});
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && (err as any).response?.status === 403
        ? 'Forbidden: Admin access required'
        : err instanceof Error ? err.message : "Failed to update product";
      setError(msg);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await client.delete(`/api/products/${id}`);
      // بعد الحذف، أعد جلب المنتجات من السيرفر
      fetchProducts();
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && (err as any).response?.status === 403
        ? 'Forbidden: Admin access required'
        : err instanceof Error ? err.message : "Failed to delete product";
      setError(msg);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading && <div className="mt-2 text-primary font-semibold animate-pulse">Loading...</div>}
      <div className="bg-white border rounded-xl shadow-lg p-4">
        <Table className="w-full">
          <TableCaption className="text-muted-foreground mb-2">All products in your store</TableCaption>
          <TableHeader>
            <TableRow className="bg-card">
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Image</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Name</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Description</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Price</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Category</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Stock</TableHead>
              <TableHead className="font-bold text-lg pb-2 text-center align-middle">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              editingId === product._id ? (
                <TableRow key={product._id} className="bg-muted/50">
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setEditData({ ...editData, image: e.target.files?.[0] })}
                      />
                      {product.image && (
                        <img src={`${API_URL}${product.image}`} alt="product" className="h-12 w-12 object-cover inline-block align-middle mt-2" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold p-2 whitespace-nowrap pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <span className="flex items-center gap-2">
                        {product.image && (
                          <img src={`${API_URL}${product.image}`} alt="product" className="h-10 w-10 object-cover rounded-full" />
                        )}
                        <input
                          value={editData.name || ""}
                          onChange={e => setEditData({ ...editData, name: e.target.value })}
                          className="input-field w-full"
                          placeholder="Name"
                        />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <input value={editData.description || ""} onChange={e => setEditData({ ...editData, description: e.target.value })} className="input-field w-full" placeholder="Description" />
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <input type="number" value={editData.price || 0} onChange={e => setEditData({ ...editData, price: Number(e.target.value) })} className="input-field w-full" placeholder="Price" />
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <input value={editData.category || ""} onChange={e => setEditData({ ...editData, category: e.target.value })} className="input-field w-full" placeholder="Category" />
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <input type="number" value={editData.countInStock || 0} onChange={e => setEditData({ ...editData, countInStock: Number(e.target.value) })} className="input-field w-full" placeholder="Stock" />
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px] gap-2">
                      <button className="btn btn-primary mr-2" onClick={handleUpdate}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={product._id} className="hover:bg-muted/30 transition-all">
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      {product.image ? (
                        <img src={`${API_URL}${product.image}`} alt="product" className="h-10 w-10 object-cover rounded-full" />
                      ) : (
                        <span className="text-muted-foreground">No image</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold p-2 whitespace-nowrap pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      <span className="truncate max-w-xs">{product.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      ${product.price.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      {product.category}
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                      {product.countInStock}
                    </div>
                  </TableCell>
                  <TableCell className="pt-4 text-center align-middle">
                    <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px] gap-2">
                      <button className="btn btn-primary mr-2" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn btn-danger" onClick={async () => { await handleDelete(product._id); if(!error) alert('Product deleted successfully!'); }}>Delete</button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            ))}
            {/* New Product Row */}
            <TableRow className="bg-card/50">
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex flex-col items-center justify-center min-h-[60px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setNewProduct({ ...newProduct, image: e.target.files?.[0] })}
                  />
                  {newProduct.image && typeof newProduct.image === 'string' && (
                    <img src={newProduct.image.startsWith('http') ? newProduct.image : `${API_URL}${newProduct.image}`} alt="product" className="h-12 mt-2" />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-semibold p-2 whitespace-nowrap pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <span className="flex items-center gap-2">
                    {newProduct.image && typeof newProduct.image === 'string' && (
                      <img src={`${API_URL}${newProduct.image}`} alt="product" className="h-10 w-10 object-cover rounded-full" />
                    )}
                    <input
                      value={newProduct.name || ""}
                      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="input-field w-full"
                      placeholder="Name"
                    />
                  </span>
                </div>
              </TableCell>
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <input value={newProduct.description || ""} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="input-field w-full" placeholder="Description" />
                </div>
              </TableCell>
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <input type="number" value={newProduct.price || ""} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="input-field w-full" placeholder="Price" />
                </div>
              </TableCell>
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <input value={newProduct.category || ""} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="input-field w-full" placeholder="Category" />
                </div>
              </TableCell>
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <input type="number" value={newProduct.countInStock || ""} onChange={e => setNewProduct({ ...newProduct, countInStock: Number(e.target.value) })} className="input-field w-full" placeholder="Stock" />
                </div>
              </TableCell>
              <TableCell className="pt-4 text-center align-middle">
                <div className="bg-gray-50 border rounded-lg p-2 flex items-center justify-center min-h-[60px]">
                  <button className="btn btn-success" onClick={handleCreate}>Add</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductAdminTable;
