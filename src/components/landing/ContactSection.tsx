import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground">Have questions? We'd love to hear from you.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" required className="bg-secondary/50 border-border" />
            <Input type="email" placeholder="Email" required className="bg-secondary/50 border-border" />
          </div>
          <Input placeholder="Subject" required className="bg-secondary/50 border-border" />
          <Textarea placeholder="Your message..." required rows={5} className="bg-secondary/50 border-border resize-none" />
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
