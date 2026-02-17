import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for new businesses",
    features: ["AI Website Builder", "5 Client Slots", "Basic Analytics", "Email Support", "SSL Certificate"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$129",
    description: "For scaling businesses",
    features: ["Everything in Starter", "Unlimited Clients", "Advanced Analytics", "Marketing Automation", "Priority Support", "Custom Domain"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    description: "For agencies & teams",
    features: ["Everything in Growth", "White-label Solution", "Dedicated Account Mgr", "API Access", "Custom Integrations", "SLA Guarantee"],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 flex flex-col ${
                plan.highlight
                  ? "glass glow-border border-primary/40 scale-105"
                  : "glass"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider">Most Popular</div>
              )}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
              <div className="mt-6 mb-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={plan.highlight ? "default" : "outline"} asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
