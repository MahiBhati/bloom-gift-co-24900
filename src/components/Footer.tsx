import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8" />
              <span className="text-xl font-bold">Plants for Every Occasion</span>
            </div>
            <p className="text-sm opacity-90">
              Eco-friendly plant gifting subscription service based in Pune, partnering with local nurseries.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#plans" className="hover:underline">Subscription Plans</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#faq" className="hover:underline">FAQs</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Refund Policy</a></li>
              <li><a href="#" className="hover:underline">Shipping Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@plantsforoccasion.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Plants for Every Occasion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
