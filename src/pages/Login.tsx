import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 font-display text-2xl font-bold mb-10">
          <Zap className="h-7 w-7 text-primary" />
          ClientForge
        </Link>

        <div className="glass rounded-xl p-8">
          <h1 className="font-display text-2xl font-bold text-center mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/50 border-border" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-secondary/50 border-border" />
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">Forgot password?</Link>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
