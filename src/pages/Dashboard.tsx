import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const planDetails = {
  basic: {
    name: "Basic Plan",
    price: "₹99/year",
    plants: ["Money Plant", "Jade Plant"],
  },
  standard: {
    name: "Standard Plan",
    price: "₹499/year",
    plants: ["Snake Plant", "Areca Palm", "Peace Lily", "Marigold Seeds", "Basil Seeds"],
  },
  premium: {
    name: "Premium Plan",
    price: "₹1999/year",
    plants: [
      "Fiddle Leaf Fig",
      "Bonsai Tree",
      "Rubber Plant",
      "Succulent Combo",
      "Bamboo Palm",
      "Sunflower Seeds",
    ],
  },
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/login");
      return;
    }
    
    setUser(session.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center">
        <Leaf className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  // For demo purposes, showing standard plan
  const currentPlan = planDetails.standard;
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">My Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back, {userName}! 🌱</CardTitle>
              <CardDescription>
                Here's an overview of your plant subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="text-xl font-bold text-primary">{currentPlan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-xl font-bold">{currentPlan.price}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold text-green-600">Active</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Next Delivery</p>
                    <p className="text-lg font-semibold">Coming Soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Your Plants</CardTitle>
              <CardDescription>Plants included in your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentPlan.plants.map((plant, index) => (
                  <div
                    key={plant}
                    className="p-4 bg-primary/5 rounded-lg text-center hover:bg-primary/10 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{plant}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Button size="lg" variant="outline" className="flex-1">
              Update Address
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate("/plans")}>
              Change Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
