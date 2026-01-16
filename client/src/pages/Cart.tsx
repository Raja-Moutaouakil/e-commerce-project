import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const shipping = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + shipping;

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8 animate-fade-up">
            Shopping Cart
          </h1>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 mt-6 text-primary hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl p-6 sticky top-32 animate-fade-up">
                  <h2 className="text-xl font-serif font-semibold mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $50
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between py-6">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-lg">${total.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-up">
              <div className="w-24 h-24 mx-auto mb-6 bg-card rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-serif font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items yet.
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
