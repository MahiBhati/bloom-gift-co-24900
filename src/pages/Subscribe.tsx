import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !address || !plan) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Leaf className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-3xl text-primary">🎉 Thank You!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for subscribing to Plants for Every Occasion! Your plants will bloom soon 🌱
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We've received your subscription request. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-2">
              <Button className="w-full" size="lg" onClick={() => navigate("/login")}>
                Login to Track My Subscription
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Plants for Every Occasion</h1>
          </div>
          <CardTitle>Subscribe to Green Gifting</CardTitle>
          <CardDescription>
            Fill in your details to start your eco-friendly plant subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address (Pune)</Label>
              <Input
                id="address"
                type="text"
                placeholder="Your address in Pune"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Select Plan</Label>
              <Select value={plan} onValueChange={setPlan} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - ₹99/year</SelectItem>
                  <SelectItem value="standard">Standard - ₹499/year</SelectItem>
                  <SelectItem value="premium">Premium - ₹1999/year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment Option</Label>
              <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                📱 Scan QR for UPI Payment
                <div className="mt-2 text-xs">(Payment integration coming soon)</div>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Confirm Subscription
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => navigate("/")}>
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscribe;
