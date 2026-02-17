import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Password updated successfully" });
      navigate("/login");
    }
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-2">Invalid Reset Link</h1>
          <p className="text-muted-foreground mb-4">This link is invalid or has expired.</p>
          <Link to="/forgot-password" className="text-primary hover:underline">Request a new link</Link>
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
          <h1 className="font-display text-2xl font-bold text-center mb-2">Set New Password</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">Enter your new password below</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-secondary/50 border-border" />
            <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="bg-secondary/50 border-border" />
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Updating..." : "Update Password"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
