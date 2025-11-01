import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the subscription work?",
    answer: "Choose your plan, and we'll deliver handpicked plants for your selected occasions throughout the year. You can customize delivery dates and plant preferences through your dashboard.",
  },
  {
    question: "What areas in Pune do you deliver to?",
    answer: "We currently deliver across all major areas in Pune including Koregaon Park, Baner, Kothrud, Viman Nagar, Hinjewadi, and more. Contact us to check if we deliver to your specific location.",
  },
  {
    question: "Can I gift a subscription to someone?",
    answer: "Absolutely! During checkout, you can specify the recipient's address and add a personalized message. We'll ensure the plants reach them on their special day.",
  },
  {
    question: "What if a plant arrives damaged?",
    answer: "We take great care in packaging, but if a plant arrives damaged, contact us within 24 hours with photos. We'll arrange a free replacement immediately.",
  },
  {
    question: "Do you provide plant care instructions?",
    answer: "Yes! Every plant delivery includes detailed care instructions. Premium subscribers also get access to our monthly plant care tips and exclusive workshops.",
  },
  {
    question: "Can I cancel or modify my subscription?",
    answer: "You can modify delivery dates, plant preferences, or pause your subscription anytime through your dashboard. For cancellations, please contact our support team.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-accent/20" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our plant subscription service
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
