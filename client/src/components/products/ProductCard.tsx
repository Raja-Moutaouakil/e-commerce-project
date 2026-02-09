import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const getImageUrl = (image: string) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  // Normalize: if it doesn't start with /, add it
  let p = image.startsWith('/') ? image : `/${image}`;
  // If path does not already target /uploads, assume it’s a filename under /uploads
  if (!p.startsWith('/uploads/')) {
    const name = p.replace(/^\/+/, '');
    p = `/uploads/${name}`;
  }
  return `${base}${p}`;
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Adding product to cart:', product);
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        'card-product group opacity-0 animate-fade-up',
        `stagger-${(index % 4) + 1}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-card">
        <div
          className={cn(
            'absolute inset-0 bg-card animate-pulse',
            imageLoaded && 'hidden'
          )}
        />
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-full">
          {product.category}
        </span>
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            'absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center',
            'transition-all duration-300 transform',
            'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0',
            isAdded
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-foreground hover:bg-primary hover:text-primary-foreground'
          )}
          aria-label="Add to cart"
        >
          {isAdded ? (
            <Check className="w-5 h-5 animate-scale-in" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-sm font-medium text-primary hover:text-foreground transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
