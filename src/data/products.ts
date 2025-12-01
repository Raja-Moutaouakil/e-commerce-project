export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Lavender Oil",
    price: 24.99,
    description: "Pure essential lavender oil for relaxation and aromatherapy. Sourced from organic farms.",
    image: "https://images.unsplash.com/photo-1611073615830-2e0e6a59598d?w=400&h=400&fit=crop",
    category: "Essential Oils",
    featured: true,
  },
  {
    id: 2,
    name: "Natural Face Serum",
    price: 38.99,
    description: "Rejuvenating face serum with vitamin C and hyaluronic acid for glowing skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    category: "Skincare",
    featured: true,
  },
  {
    id: 3,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    description: "Eco-friendly bamboo toothbrushes with charcoal bristles. Pack of 4.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
    category: "Personal Care",
    featured: false,
  },
  {
    id: 4,
    name: "Herbal Tea Collection",
    price: 19.99,
    description: "Curated collection of organic herbal teas for wellness and relaxation.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop",
    category: "Wellness",
    featured: true,
  },
  {
    id: 5,
    name: "Eucalyptus Candle",
    price: 28.99,
    description: "Hand-poured soy candle with pure eucalyptus essential oil. 60-hour burn time.",
    image: "https://images.unsplash.com/photo-1602607434424-0dc3d8bb6615?w=400&h=400&fit=crop",
    category: "Home",
    featured: true,
  },
  {
    id: 6,
    name: "Rose Water Toner",
    price: 22.99,
    description: "Gentle rose water toner for all skin types. Hydrates and refreshes.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    category: "Skincare",
    featured: false,
  },
  {
    id: 7,
    name: "Linen Bath Towel Set",
    price: 54.99,
    description: "Premium organic linen bath towels. Ultra-soft and quick-drying. Set of 2.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop",
    category: "Home",
    featured: false,
  },
  {
    id: 8,
    name: "Matcha Powder",
    price: 32.99,
    description: "Ceremonial grade organic matcha powder. Rich in antioxidants.",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop",
    category: "Wellness",
    featured: true,
  },
  {
    id: 9,
    name: "Natural Body Butter",
    price: 26.99,
    description: "Rich shea butter moisturizer with coconut and jojoba oils.",
    image: "https://images.unsplash.com/photo-1608181831688-9b6c14230b65?w=400&h=400&fit=crop",
    category: "Skincare",
    featured: false,
  },
  {
    id: 10,
    name: "Aromatherapy Diffuser",
    price: 45.99,
    description: "Elegant ceramic diffuser with color-changing LED. Whisper-quiet operation.",
    image: "https://images.unsplash.com/photo-1602928298849-325cec4f9b57?w=400&h=400&fit=crop",
    category: "Home",
    featured: true,
  },
  {
    id: 11,
    name: "Hemp Lip Balm Set",
    price: 14.99,
    description: "Organic hemp lip balms in 3 flavors: mint, honey, and vanilla.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop",
    category: "Personal Care",
    featured: false,
  },
  {
    id: 12,
    name: "Yoga Mat - Natural Cork",
    price: 68.99,
    description: "Eco-friendly cork and natural rubber yoga mat. Non-slip and sustainable.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Wellness",
    featured: false,
  },
];

export const categories = [...new Set(products.map(p => p.category))];
