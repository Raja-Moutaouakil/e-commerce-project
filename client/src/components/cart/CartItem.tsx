import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

// Helper to get correct image URL
const getImageUrl = (image: string) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image}`;
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-border animate-fade-up">
      {/* Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-card flex-shrink-0">
        <img
          src={getImageUrl(item.image)}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-serif text-lg font-medium text-foreground">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 rounded-full hover:bg-card transition-colors duration-300 text-muted-foreground hover:text-destructive"
            aria-label="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-card rounded-full p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <span className="font-semibold text-lg">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;