import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <Zap className="h-6 w-6 text-primary" />
          <span>ClientForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-4 py-4 flex flex-col gap-3">
          <a href="#services" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Services</a>
          <a href="#pricing" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#about" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Contact</a>
          <Button variant="ghost" asChild className="justify-start"><Link to="/login">Sign In</Link></Button>
          <Button asChild><Link to="/signup">Get Started</Link></Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
