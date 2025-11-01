import { Leaf, Heart, Truck, Phone } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "100% sustainable packaging and locally sourced plants from Pune nurseries",
  },
  {
    icon: Heart,
    title: "Thoughtful Gifts",
    description: "Curated plant selections perfect for every occasion and celebration",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Safe and timely delivery across Pune with plant care instructions",
  },
  {
    icon: Phone,
    title: "Expert Support",
    description: "Dedicated customer support and plant care guidance whenever you need",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to sustainable gifting and supporting local communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
