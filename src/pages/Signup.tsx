import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <Link to="/" className="flex items-center justify-center gap-2 font-display text-2xl font-bold mb-10">
            <Zap className="h-7 w-7 text-primary" />
            ClientForge
          </Link>
          <div className="glass rounded-xl p-8">
            <h1 className="font-display text-2xl font-bold mb-2">Check your email</h1>
            <p className="text-muted-foreground text-sm mb-6">We sent a verification link to <strong>{email}</strong>. Please verify your email to continue.</p>
            <Link to="/login" className="text-primary hover:underline text-sm">Back to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 font-display text-2xl font-bold mb-10">
          <Zap className="h-7 w-7 text-primary" />
          ClientForge
        </Link>

        <div className="glass rounded-xl p-8">
          <h1 className="font-display text-2xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Start your free trial today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/50 border-border" />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/50 border-border" />
            <Input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-secondary/50 border-border" />
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
