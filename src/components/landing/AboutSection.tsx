const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Built on <span className="text-gradient">Shared Success</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe when our clients win, we win. ClientForge was built by entrepreneurs who were tired of expensive, disconnected tools that don't talk to each other.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our AI-powered platform unifies website creation, client management, and marketing analytics into a single, beautiful experience — so you can focus on what matters: growing your business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "50ms", label: "Avg Response" },
              { value: "10k+", label: "Active Users" },
              { value: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-6 text-center hover-lift">
                <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
