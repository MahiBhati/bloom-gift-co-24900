import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Koregaon Park, Pune",
    rating: 5,
    text: "Absolutely love this service! The plants arrived healthy and beautiful. Perfect gift for my mom's birthday.",
  },
  {
    name: "Rahul Patil",
    location: "Kothrud, Pune",
    rating: 5,
    text: "The subscription has been wonderful. Quality plants, eco-friendly packaging, and excellent customer support.",
  },
  {
    name: "Anjali Desai",
    location: "Baner, Pune",
    rating: 5,
    text: "Supporting local nurseries while gifting greenery - what's not to love? Highly recommend their premium plan!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of happy plant lovers across Pune
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
