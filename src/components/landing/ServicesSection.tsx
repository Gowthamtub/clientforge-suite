import { Globe, BarChart3, Users, Zap, Shield, Headphones } from "lucide-react";

const services = [
  { icon: Globe, title: "AI Website Builder", description: "Auto-generate stunning, conversion-optimized websites tailored to your brand in minutes." },
  { icon: BarChart3, title: "Marketing Analytics", description: "Track leads, conversions, and ROI with real-time dashboards and AI-driven insights." },
  { icon: Users, title: "Client Management", description: "Manage all your clients, projects, and communications in one powerful CRM." },
  { icon: Zap, title: "Growth Automation", description: "Automate email campaigns, social posting, and lead nurturing with AI workflows." },
  { icon: Shield, title: "Secure Infrastructure", description: "Enterprise-grade security with SSL, backups, and role-based access control." },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated support team and AI assistant to help you succeed at every step." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One platform, every tool. Build and scale your business without juggling dozens of services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="glass rounded-xl p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
