import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Smartphone, Wallet, Building, Flower2 } from "lucide-react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState("");

  const { plan, price, selectedPlants } = location.state || {};

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to login with return path
        navigate('/login', { 
          state: { 
            returnTo: '/payment',
            paymentData: { plan, price, selectedPlants }
          } 
        });
      } else {
        setUser(session.user);
      }
    };
    
    checkAuth();
  }, [navigate, plan, price, selectedPlants]);

  if (!location.state) {
    navigate('/plans');
    return null;
  }

  const handlePayment = async () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter your delivery address in Pune.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Calculate next delivery date (7 days from now)
      const nextDeliveryDate = new Date();
      nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 7);

      // Save subscription to database
      const { error } = await (supabase as any).from("subscriptions").insert({
        user_id: user.id,
        plan_name: plan,
        price: price,
        selected_plants: selectedPlants,
        status: "active",
        next_delivery_date: nextDeliveryDate.toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Your green gifts are on their way! 🌿",
        description: "Your subscription has been activated successfully.",
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    { id: "cod", name: "Cash on Delivery", icon: Wallet, description: "Pay when you receive" },
    { id: "googlepay", name: "Google Pay", icon: Smartphone, description: "Quick UPI payment" },
    { id: "phonepe", name: "PhonePe", icon: Smartphone, description: "Quick UPI payment" },
    { id: "card", name: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, etc." },
    { id: "netbanking", name: "Net Banking", icon: Building, description: "Bank transfer" },
    { id: "upi", name: "UPI", icon: Smartphone, description: "Any UPI app" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flower2 className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Complete Your Subscription
              </h1>
              <Flower2 className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              You're one step away from starting your green journey!
            </p>
          </div>

          <div className="grid gap-6">
            {/* Order Summary */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-semibold text-lg">{plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-bold text-2xl text-primary">{price}/year</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Selected Plants:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPlants?.map((plant: any) => (
                      <div key={plant.id} className="flex items-center gap-2 p-2 rounded-lg bg-accent/30">
                        <span className="text-lg">{plant.emoji}</span>
                        <span className="text-sm">{plant.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
                <CardDescription>Enter your address in Pune</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/30 transition-colors cursor-pointer">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex items-center gap-3 cursor-pointer flex-1">
                            <Icon className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/select-plants', { state: location.state })}
                className="flex-1 rounded-full"
              >
                ← Back
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !address.trim()}
                className="flex-1 rounded-full shadow-md hover:shadow-lg"
                size="lg"
              >
                {isProcessing ? "Processing..." : `Pay ${price}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
