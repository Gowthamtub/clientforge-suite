import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-display font-bold">
        <Zap className="h-5 w-5 text-primary" />
        ClientForge
      </div>
      <p className="text-sm text-muted-foreground">© 2026 ClientForge. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
