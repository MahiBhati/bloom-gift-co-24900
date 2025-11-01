import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

const planData = {
  basic: {
    name: "Basic",
    price: "₹99",
    selectCount: 2,
    plants: [
      { id: "tulsi", name: "Tulsi (Holy Basil)", note: "Spiritual and purifying", emoji: "🌿" },
      { id: "money-plant", name: "Money Plant", note: "Symbol of prosperity", emoji: "💚" },
      { id: "jade", name: "Jade Plant", note: "Good luck and positivity", emoji: "🍀" },
      { id: "aloe", name: "Aloe Vera", note: "Easy care, healing plant", emoji: "🌱" },
      { id: "syngonium", name: "Syngonium", note: "Attractive and low-maintenance", emoji: "🌿" },
    ],
  },
  standard: {
    name: "Standard",
    price: "₹499",
    selectCount: 3,
    plants: [
      { id: "rose", name: "Rose Plant", note: "Love and beauty", emoji: "🌹" },
      { id: "jasmine", name: "Jasmine (Mogra)", note: "Fragrant and peaceful", emoji: "🌸" },
      { id: "hibiscus", name: "Hibiscus", note: "Vibrant and auspicious", emoji: "🌺" },
      { id: "areca", name: "Areca Palm", note: "Indoor air purifier", emoji: "🌴" },
      { id: "snake", name: "Snake Plant", note: "Low-maintenance gift", emoji: "🌿" },
      { id: "peace-lily", name: "Peace Lily", note: "Elegant and purifying", emoji: "🕊️" },
    ],
  },
  premium: {
    name: "Premium",
    price: "₹999",
    selectCount: 5,
    plants: [
      { id: "bonsai", name: "Bonsai Tree", note: "Artistic and symbolic", emoji: "🌳" },
      { id: "rubber", name: "Rubber Plant", note: "Elegant indoor choice", emoji: "🌿" },
      { id: "bamboo", name: "Bamboo Palm", note: "Prosperity & positivity", emoji: "🎋" },
      { id: "lavender", name: "Lavender", note: "Fragrant & relaxing", emoji: "💜" },
      { id: "anthurium", name: "Anthurium", note: "Modern decorative plant", emoji: "❤️" },
      { id: "succulent", name: "Succulent Combo", note: "Trendy gifting option", emoji: "🌵" },
      { id: "fiddle", name: "Fiddle Leaf Fig", note: "Statement indoor plant", emoji: "🌿" },
      { id: "sunflower", name: "Sunflower Seeds", note: "Cheerful and bright", emoji: "🌻" },
    ],
  },
};

const PlantListing = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "basic";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentPlan = planData[plan as keyof typeof planData] || planData.basic;

  const handlePlantToggle = (plantId: string) => {
    setSelectedPlants((prev) => {
      if (prev.includes(plantId)) {
        return prev.filter((id) => id !== plantId);
      } else if (prev.length < currentPlan.selectCount) {
        return [...prev, plantId];
      } else {
        toast({
          title: "Selection Limit Reached",
          description: `You can only select ${currentPlan.selectCount} plants for the ${currentPlan.name} plan.`,
          variant: "destructive",
        });
        return prev;
      }
    });
  };

  const handleConfirm = () => {
    if (selectedPlants.length !== currentPlan.selectCount) {
      toast({
        title: "Incomplete Selection",
        description: `Please select exactly ${currentPlan.selectCount} plants to continue.`,
        variant: "destructive",
      });
      return;
    }
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-lg rounded-3xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Leaf className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-3xl text-primary">🎉 Success!</CardTitle>
            <CardDescription className="text-lg mt-2">
              You've subscribed successfully! 🌱 Your thoughtful green gift is on its way.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent/30 rounded-2xl p-4">
              <h3 className="font-semibold text-primary mb-2">Your Selected Plants:</h3>
              <div className="space-y-1">
                {selectedPlants.map((plantId) => {
                  const plant = currentPlan.plants.find((p) => p.id === plantId);
                  return (
                    <div key={plantId} className="text-sm">
                      {plant?.emoji} {plant?.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full rounded-full shadow-md" size="lg" onClick={() => navigate("/login")}>
                Login to Track My Subscription
              </Button>
              <Button variant="outline" className="w-full rounded-full" onClick={() => navigate("/")}>
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Select Your Plants
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose {currentPlan.selectCount} plants for your {currentPlan.name} plan ({currentPlan.price}/year)
          </p>
          <div className="mt-4">
            <span className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
              {selectedPlants.length} of {currentPlan.selectCount} selected
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentPlan.plants.map((plant) => {
            const isSelected = selectedPlants.includes(plant.id);
            return (
              <Card
                key={plant.id}
                className={`cursor-pointer transition-all duration-300 rounded-2xl ${
                  isSelected
                    ? "border-primary border-2 shadow-[0_8px_30px_rgba(45,125,50,0.15)] scale-[1.02]"
                    : "border-border hover:shadow-md hover:-translate-y-1"
                }`}
                onClick={() => handlePlantToggle(plant.id)}
              >
                <CardHeader className="text-center pb-3">
                  <div className="text-5xl mb-3">{plant.emoji}</div>
                  <CardTitle className="text-xl">{plant.name}</CardTitle>
                  <CardDescription className="text-sm">{plant.note}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handlePlantToggle(plant.id)}
                    className="w-6 h-6"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <Button
            size="lg"
            className="px-12 rounded-full shadow-md hover:shadow-lg"
            onClick={handleConfirm}
            disabled={selectedPlants.length !== currentPlan.selectCount}
          >
            Confirm Selection
          </Button>
          <div>
            <Button variant="ghost" onClick={() => navigate("/plans")} className="rounded-full">
              ← Back to Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantListing;
