import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          AI-Powered Business Growth
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Build, Run & Grow<br />
          <span className="text-gradient">Your Business</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          ClientForge is the all-in-one platform that builds websites, manages clients, and grows your revenue — powered by AI and shared success.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow" asChild>
            <Link to="/signup">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <a href="#services">See How It Works</a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
          {[
            { value: "500+", label: "Businesses" },
            { value: "98%", label: "Uptime" },
            { value: "3x", label: "Growth" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
