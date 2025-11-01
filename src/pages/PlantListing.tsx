import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const PlantListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const { plan = "Basic", price = "₹99", selectCount = 2, plants = [] } = location.state || {};

  if (!location.state) {
    navigate('/plans');
    return null;
  }

  const currentPlan = { name: plan, price, selectCount, plants };

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

  const handleConfirm = async () => {
    if (selectedPlants.length !== currentPlan.selectCount) {
      toast({
        title: "Incomplete Selection",
        description: `Please select exactly ${currentPlan.selectCount} plants to continue.`,
        variant: "destructive",
      });
      return;
    }
    
    navigate('/payment', {
      state: {
        plan: currentPlan.name,
        price: currentPlan.price,
        selectedPlants: selectedPlants.map(id => 
          currentPlan.plants.find((p: any) => p.id === id)
        )
      }
    });
  };

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
