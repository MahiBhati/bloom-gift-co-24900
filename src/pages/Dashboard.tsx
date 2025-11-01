import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  plan_name: string;
  price: string;
  selected_plants: any[];
  status: string;
  next_delivery_date?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
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
    await fetchSubscription(session.user.id);
    setLoading(false);
  };

  const fetchSubscription = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setSubscription({
          ...data,
          selected_plants: data.selected_plants as any[]
        } as Subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
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

          {!subscription ? (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {userName}! 🌱</CardTitle>
                <CardDescription>
                  You don't have an active subscription yet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" onClick={() => navigate('/plans')}>
                  Browse Plans
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
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
                        <p className="text-xl font-bold text-primary">{subscription.plan_name} Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-bold">{subscription.price}/year</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="text-lg font-semibold text-green-600 capitalize">{subscription.status}</p>
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
                  <CardDescription>Plants you selected for your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {subscription.selected_plants.map((plant: any, index: number) => (
                      <div
                        key={plant.id}
                        className="p-4 bg-primary/5 rounded-lg text-center hover:bg-primary/10 transition-colors"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-3xl mb-2">{plant.emoji}</div>
                        <p className="text-sm font-medium">{plant.name}</p>
                        <p className="text-xs text-muted-foreground">{plant.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="mt-8 flex gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1" 
              onClick={() => navigate("/plans")}
            >
              Change Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
