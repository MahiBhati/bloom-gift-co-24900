import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CheckCircle } from "lucide-react";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { plan, price, selectedPlants } = location.state || {};

  if (!location.state) {
    navigate('/plans');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg rounded-3xl animate-fade-in">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Leaf className="w-16 h-16 text-primary animate-pulse" />
              <CheckCircle className="w-8 h-8 text-primary absolute -top-2 -right-2 fill-background" />
            </div>
          </div>
          <CardTitle className="text-3xl text-primary">🎉 Success!</CardTitle>
          <CardDescription className="text-lg mt-2">
            You've subscribed successfully! 🌱 Thank you for growing green with us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-accent/30 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wide mb-2">
                Your Plan:
              </h3>
              <div className="text-2xl font-bold text-foreground">
                {plan} - {price}/year
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wide mb-3">
                Your Selected Plants:
              </h3>
              <div className="space-y-2">
                {selectedPlants?.map((plant: any, index: number) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                  >
                    <span className="text-2xl">{plant.emoji}</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-foreground">{plant.name}</div>
                      <div className="text-xs text-muted-foreground">{plant.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your thoughtful green gift is on its way! 🌿
            </p>
            <Button 
              className="w-full rounded-full shadow-md" 
              size="lg" 
              onClick={() => navigate("/login")}
            >
              Login to Track My Subscription
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-full" 
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirmation;
