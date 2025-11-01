import Hero from "@/components/Hero";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <SubscriptionPlans />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
