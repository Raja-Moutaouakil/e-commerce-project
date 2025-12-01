import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, Heart, Droplets } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container-main relative z-10 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium animate-fade-up">
                <Droplets className="w-4 h-4 text-primary" />
                <span>100% Natural Hair Care</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight animate-fade-up stagger-1">
                Nourish Your Hair
                <span className="block text-primary">Naturally</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-up stagger-2">
                Discover our premium collection of natural hair care products - 
                from nourishing oils to luxurious butters, crafted for healthy, beautiful hair.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
                <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Our Story
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 animate-fade-up stagger-4">
                <div>
                  <p className="text-3xl font-serif font-semibold text-foreground">20+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-semibold text-foreground">25K+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-semibold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Natural</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-up stagger-2">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://botanicalex.ma/cdn/shop/articles/4c2e60ac0045761f8b6124fe33f9168c.jpg?v=1696419923&width=1780"
                  alt="Natural hair care products"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Premium Quality</p>
                    <p className="text-xs text-muted-foreground">Natural Ingredients</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float hidden md:block" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Made with Love</p>
                    <p className="text-xs text-muted-foreground">For All Hair Types</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2">
                Popular Products
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2 mb-4">
              Why Choose Botanica Hair
            </h2>
            <p className="text-muted-foreground">
              We believe in the power of nature to transform your hair care routine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'All Natural',
                description: 'Pure oils, butters, and botanical extracts - no harmful chemicals.',
              },
              {
                icon: Heart,
                title: 'Hair Health First',
                description: 'Formulated to nourish and strengthen your hair from root to tip.',
              },
              {
                icon: Sparkles,
                title: 'Premium Quality',
                description: 'Carefully sourced ingredients and beautifully packaged products.',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center p-8 bg-background rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/30 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Start Your Natural Hair Journey
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Subscribe to receive exclusive offers, hair care tips, and be the first 
            to know about new products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors"
            />
            <button className="px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
