import { Leaf, Heart, Award, Users, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider animate-fade-up">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight animate-fade-up stagger-1">
                Natural Hair Care,
                <span className="block text-primary">Rooted in Tradition</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
                Botanica Hair was founded with a simple belief: your hair deserves the 
                purest, most effective natural ingredients. We craft premium hair care 
                products using time-honored recipes and the finest botanical extracts.
              </p>
            </div>
            <div className="relative animate-fade-up stagger-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://www.rachellebery.ca/wp-content/uploads/2018/12/katherine-hanlon-242211_560x370-560x350.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower people to embrace their natural hair with confidence by providing 
              premium, all-natural hair care products. From nourishing oils like argan and 
              jojoba to traditional ingredients like henna and sidr, we bring you the best 
              of nature for healthy, beautiful hair.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, value: '100%', label: 'Natural Ingredients' },
              { icon: Users, value: '25K+', label: 'Happy Customers' },
              { icon: Heart, value: '0', label: 'Harmful Chemicals' },
              { icon: Award, value: '20+', label: 'Premium Products' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-card rounded-2xl animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <p className="text-3xl font-serif font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                  src="https://img.freepik.com/premium-photo/showcase-range-certified-organic-ingredient-generative-ai_1198283-11576.jpg"
                  alt="Core Values"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  What We Believe
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2">
                  Our Core Values
                </h2>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: 'Pure Ingredients',
                    description: 'Every product contains only the finest natural ingredients - from aloe vera and sidr to premium oils and butters.',
                  },
                  {
                    title: 'Hair Health First',
                    description: 'We focus on long-term hair health, not quick fixes. Our products nourish from root to tip.',
                  },
                  {
                    title: 'Quality Craftsmanship',
                    description: 'Each product is carefully formulated and packaged with the Botanica Hair name you can trust.',
                  },
                  {
                    title: 'For All Hair Types',
                    description: 'Whether curly, straight, thick, or fine - our products are designed to work beautifully on all hair types.',
                  },
                ].map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg font-semibold mb-1">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Meet The Founder
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2 mb-4">
                The Visionary Behind Botanica Hair
              </h2>
            </div>
            
            <div className="bg-card rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Founder Icon */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-secondary/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-16 h-16 text-primary" />
                </div>
                
                {/* Founder Info */}
                <div className="text-center md:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-semibold">
                      Raja Moutaouakil
                    </h3>
                    <p className="text-primary font-medium">
                      Founder, CEO & Creator
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Raja Moutaouakil founded Botanica Hair with a passion for natural beauty 
                    and a deep understanding of traditional hair care wisdom. Drawing from 
                    generations of knowledge about natural ingredients like argan oil, henna, 
                    and sidr, Raja created a brand that combines heritage with modern 
                    formulations. Her vision is to make premium, natural hair care accessible 
                    to everyone who wants to embrace their natural beauty.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    "I believe that healthy, beautiful hair starts with nature's finest 
                    ingredients. Every product we create is a reflection of my commitment 
                    to quality and my love for natural hair care."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy */}
      <section className="section-padding bg-card">
        <div className="container-main text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Every Botanica Hair product is crafted with care and packaged with our 
            signature branding you can trust.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Natural Oils',
                description: 'From argan to jojoba, coconut to castor - pure oils for every hair need.',
              },
              {
                icon: Heart,
                title: 'Rich Butters',
                description: 'Shea, cocoa, and mango butters for deep nourishment and moisture.',
              },
              {
                icon: Award,
                title: 'Premium Accessories',
                description: 'Wooden brushes and satin bonnets designed for healthy hair care routines.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="p-8 bg-background rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/30 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;