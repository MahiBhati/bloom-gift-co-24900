import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-plants.jpg";
import { Leaf } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-primary justify-center md:justify-start">
              <Leaf className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Eco-Friendly Gifting</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-center md:text-left">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in block">
                Gift Happiness 🌸
              </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in block" style={{ animationDelay: '0.2s' }}>
                Grow Green 🌿
              </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in block" style={{ animationDelay: '0.4s' }}>
                Make Every Occasion Bloom 🌼
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl text-center md:text-left">
              Celebrate life's special moments with thoughtful plant gifts. Our eco-friendly subscriptions make gifting meaningful and sustainable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" className="text-base rounded-full shadow-md hover:shadow-lg" onClick={() => window.location.href = '/login'}>
                Login
              </Button>
              <Button size="lg" variant="outline" className="text-base rounded-full" onClick={() => window.location.href = '/plans'}>
                Explore Plans
              </Button>
            </div>
            <div className="flex gap-8 pt-4 justify-center md:justify-start">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-muted-foreground">Plants Delivered</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Eco-Friendly</div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(45,125,50,0.15)]">
              <img 
                src={heroImage} 
                alt="Beautiful collection of potted plants" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-6 shadow-xl animate-float">
              <div className="text-center">
                <div className="text-2xl font-bold">₹99</div>
                <div className="text-xs">Starting at</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
