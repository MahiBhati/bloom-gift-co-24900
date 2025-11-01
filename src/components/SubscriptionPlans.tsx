import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import basicPlant from "@/assets/basic-plant.jpg";
import standardPlants from "@/assets/standard-plants.jpg";
import premiumPlants from "@/assets/premium-plants.jpg";

const plans = [
  {
    name: "Basic",
    price: "₹99",
    image: basicPlant,
    description: "Perfect for plant beginners",
    occasions: 2,
    features: [
      "2 saplings annually",
      "Seasonal plant selection",
      "Care instructions included",
      "Delivery across Pune",
    ],
  },
  {
    name: "Standard",
    price: "₹499",
    image: standardPlants,
    description: "Ideal for plant enthusiasts",
    occasions: 3,
    features: [
      "3 plants annually",
      "2 seed packets included",
      "Premium plant varieties",
      "Priority delivery",
      "Monthly care tips",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹999",
    image: premiumPlants,
    description: "For the dedicated green thumb",
    occasions: 5,
    features: [
      "5 plants annually",
      "2 seed packets included",
      "Exotic plant varieties",
      "Same-day delivery",
      "Dedicated plant care support",
      "Exclusive plant care workshops",
    ],
  },
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const planData = [
    { name: "Basic", selectCount: 2 },
    { name: "Standard", selectCount: 3 },
    { name: "Premium", selectCount: 5 },
  ];

  const getPlantsByPlan = (planName: string) => {
    const allPlants = {
      Basic: [
        { id: "tulsi", name: "Tulsi (Holy Basil)", note: "Spiritual and purifying", emoji: "🌿" },
        { id: "money-plant", name: "Money Plant", note: "Symbol of prosperity", emoji: "💚" },
        { id: "jade", name: "Jade Plant", note: "Good luck and positivity", emoji: "🍀" },
        { id: "rose", name: "Rose Plant", note: "Love and beauty", emoji: "🌹" },
      ],
      Standard: [
        { id: "snake", name: "Snake Plant", note: "Low-maintenance gift", emoji: "🌿" },
        { id: "areca", name: "Areca Palm", note: "Indoor air purifier", emoji: "🌴" },
        { id: "peace-lily", name: "Peace Lily", note: "Elegant and purifying", emoji: "🕊️" },
        { id: "jasmine", name: "Jasmine (Mogra)", note: "Fragrant and peaceful", emoji: "🌸" },
        { id: "aloe", name: "Aloe Vera", note: "Easy care, healing plant", emoji: "🌱" },
        { id: "marigold", name: "Marigold Seeds", note: "Bright and cheerful", emoji: "🌼" },
      ],
      Premium: [
        { id: "bonsai", name: "Bonsai Tree", note: "Artistic and symbolic", emoji: "🌳" },
        { id: "rubber", name: "Rubber Plant", note: "Elegant indoor choice", emoji: "🌿" },
        { id: "bamboo", name: "Bamboo Palm", note: "Prosperity & positivity", emoji: "🎋" },
        { id: "fiddle", name: "Fiddle Leaf Fig", note: "Statement indoor plant", emoji: "🌿" },
        { id: "lavender", name: "Lavender", note: "Fragrant & relaxing", emoji: "💜" },
        { id: "succulent", name: "Succulent Combo", note: "Trendy gifting option", emoji: "🌵" },
      ],
    };
    return allPlants[planName as keyof typeof allPlants] || [];
  };

  return (
    <section className="py-20 bg-background" id="plans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect subscription plan for your gifting needs. All plans include eco-friendly packaging 
            and support local Pune nurseries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all hover:shadow-xl bg-gradient-to-br from-card to-accent/20 ${
                plan.popular ? "border-primary border-2 scale-105" : ""
              } animate-fade-in rounded-2xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={plan.image} 
                    alt={`${plan.name} plan plants`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">per year</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {plan.occasions} special occasions covered
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full rounded-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => {
                    const planInfo = planData.find(p => p.name === plan.name);
                    navigate('/select-plants', {
                      state: {
                        plan: plan.name,
                        price: plan.price,
                        selectCount: planInfo?.selectCount,
                        plants: getPlantsByPlan(plan.name)
                      }
                    });
                  }}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
