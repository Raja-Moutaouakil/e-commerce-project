import { Leaf, Heart, Award, Users } from 'lucide-react';
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
                Rooted in Nature,
                <span className="block text-primary">Crafted with Care</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up stagger-2">
                Since 2015, Botanica has been on a mission to bring the purest, most 
                effective natural wellness products to your doorstep. We believe that 
                nature holds the key to true wellness.
              </p>
            </div>
            <div className="relative animate-fade-up stagger-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                  alt="Our workshop"
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
              To create thoughtfully formulated wellness products that harness the 
              power of organic botanicals, while maintaining our commitment to 
              sustainability and ethical sourcing. Every product we create is a 
              testament to our belief that self-care should never come at the 
              expense of our planet.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, value: '100%', label: 'Organic Ingredients' },
              { icon: Users, value: '50K+', label: 'Happy Customers' },
              { icon: Heart, value: '0', label: 'Animal Testing' },
              { icon: Award, value: '15+', label: 'Industry Awards' },
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
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop"
                    alt="Natural ingredients"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop"
                    alt="Product crafting"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                    title: 'Transparency',
                    description: 'We believe you deserve to know exactly what goes into every product. No hidden ingredients, no misleading claims.',
                  },
                  {
                    title: 'Sustainability',
                    description: 'From sourcing to packaging, every decision we make considers its impact on our planet.',
                  },
                  {
                    title: 'Quality First',
                    description: 'We never compromise on quality. Each product undergoes rigorous testing to ensure it meets our high standards.',
                  },
                  {
                    title: 'Community',
                    description: 'We support local farmers and communities who share our vision for a healthier, more sustainable world.',
                  },
                ].map((value, index) => (
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

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container-main text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Meet The Team
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2 mb-4">
            The People Behind Botanica
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our dedicated team of botanists, formulators, and wellness enthusiasts 
            work tirelessly to bring you the best nature has to offer.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Emma Chen',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
              },
              {
                name: 'Dr. James Miller',
                role: 'Head of R&D',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
              },
              {
                name: 'Sofia Rodriguez',
                role: 'Sustainability Director',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
