import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "₹99",
    duration: "year",
    emoji: "🌼",
    description: "Perfect for plant beginners or simple eco gifts",
    features: [
      "2 saplings annually",
      "Seasonal plant selection",
      "Care instructions included",
      "Delivery across Pune",
    ],
    plants: [
      { name: "Tulsi (Holy Basil)", note: "Spiritual and purifying", emoji: "🌿" },
      { name: "Money Plant", note: "Symbol of prosperity", emoji: "💚" },
      { name: "Jade Plant", note: "Good luck and positivity", emoji: "🍀" },
      { name: "Aloe Vera", note: "Easy care, healing plant", emoji: "🌱" },
      { name: "Syngonium", note: "Attractive and low-maintenance", emoji: "🌿" },
    ],
    selectCount: 2,
  },
  {
    name: "Standard",
    price: "₹499",
    duration: "year",
    emoji: "🌷",
    description: "Ideal for gifting to friends or decorating homes",
    features: [
      "3 plants annually",
      "2 seed packets included",
      "Premium and flowering plant mix",
      "Priority delivery",
      "Monthly care tips",
    ],
    plants: [
      { name: "Rose Plant", note: "Love and beauty", emoji: "🌹" },
      { name: "Jasmine (Mogra)", note: "Fragrant and peaceful", emoji: "🌸" },
      { name: "Hibiscus", note: "Vibrant and auspicious", emoji: "🌺" },
      { name: "Areca Palm", note: "Indoor air purifier", emoji: "🌴" },
      { name: "Snake Plant", note: "Low-maintenance gift", emoji: "🌿" },
      { name: "Peace Lily", note: "Elegant and purifying", emoji: "🕊️" },
    ],
    selectCount: 3,
    popular: true,
  },
  {
    name: "Premium",
    price: "₹999",
    duration: "year",
    emoji: "🌺",
    description: "For meaningful, long-lasting green gifts",
    features: [
      "5 plants annually",
      "2 seed packets included",
      "Exotic and flowering varieties",
      "Same-day delivery",
      "Dedicated care support",
      "Exclusive plant care workshops",
    ],
    plants: [
      { name: "Bonsai Tree", note: "Artistic and symbolic", emoji: "🌳" },
      { name: "Rubber Plant", note: "Elegant indoor choice", emoji: "🌿" },
      { name: "Bamboo Palm", note: "Prosperity & positivity", emoji: "🎋" },
      { name: "Lavender", note: "Fragrant & relaxing", emoji: "💜" },
      { name: "Anthurium", note: "Modern decorative plant", emoji: "❤️" },
      { name: "Succulent Combo", note: "Trendy gifting option", emoji: "🌵" },
      { name: "Fiddle Leaf Fig", note: "Statement indoor plant", emoji: "🌿" },
      { name: "Sunflower Seeds", note: "Cheerful and bright", emoji: "🌻" },
    ],
    selectCount: 5,
  },
];

const Plans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explore Our Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the ideal subscription for thoughtful green gifting. All plans include eco-friendly packaging
            and support local Pune nurseries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(45,125,50,0.15)] hover:-translate-y-2 bg-card ${
                plan.popular ? "border-primary border-2 scale-[1.02]" : "border-border"
              } animate-fade-in rounded-2xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-bl-2xl rounded-tr-2xl">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-3">{plan.emoji}</div>
                <CardTitle className="text-3xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold text-primary">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">per {plan.duration}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">Features:</h4>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">
                    Plants to choose from (any {plan.selectCount}):
                  </h4>
                  <div className="space-y-2">
                    {plan.plants.map((plant) => (
                      <div
                        key={plant.name}
                        className="flex items-start gap-2 p-2 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                      >
                        <span className="text-lg">{plant.emoji}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{plant.name}</div>
                          <div className="text-xs text-muted-foreground">{plant.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full mt-6 rounded-full shadow-md hover:shadow-lg transition-all"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => navigate(`/plants?plan=${plan.name.toLowerCase()}`)}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" onClick={() => navigate("/")} className="rounded-full">
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
