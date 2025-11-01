import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const { plan = "Basic", price = "₹99", selectedPlants = [] } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/plans');
      return;
    }

    const saveSubscription = async () => {
      setSaving(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please log in to save your subscription.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: session.user.id,
            plan_name: plan,
            price: price,
            selected_plants: selectedPlants,
            status: 'active',
          });

        if (error) throw error;

        toast({
          title: "Subscription Saved! 🌿",
          description: "Your subscription has been successfully created.",
        });
      } catch (error) {
        console.error('Error saving subscription:', error);
        toast({
          title: "Error",
          description: "Failed to save subscription. Please try again.",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    };

    saveSubscription();
  }, [location.state, plan, price, selectedPlants, navigate, toast]);

  if (saving) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background flex items-center justify-center">
        <Card className="max-w-md p-8 text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Saving your subscription...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="animate-fade-in rounded-2xl shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl text-foreground">
                You've subscribed successfully! 🌿
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Thank you for growing green with us
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

              <div className="text-center mt-8 space-y-4">
                <Button
                  size="lg"
                  className="rounded-full px-12"
                  onClick={() => navigate("/dashboard")}
                >
                  View My Dashboard
                </Button>
                <div>
                  <Button
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
