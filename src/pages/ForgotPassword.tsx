import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
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
          {submitted ? (
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold mb-2">Check your email</h1>
              <p className="text-muted-foreground text-sm mb-6">We sent a password reset link to <strong>{email}</strong></p>
              <Link to="/login" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-center mb-2">Reset Password</h1>
              <p className="text-muted-foreground text-sm text-center mb-8">Enter your email to receive a reset link</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/50 border-border" />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</Button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
