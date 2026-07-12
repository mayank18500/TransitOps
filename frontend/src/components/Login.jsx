import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Shield, KeyRound, Mail, UserCheck } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Cards';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target after login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = async (user) => {
    setIsSubmitting(true);
    setEmail(user.email);
    setPassword(user.password);
    
    const result = await login(user.email, user.password);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(`Logged in as ${user.name} (${user.role})`);
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Centered Login Card */}
      <Card className="p-8 bg-bg-surface border border-border shadow-modal rounded-xl relative overflow-hidden">
        {/* Abstract Glow Circle */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-primary/5 blur-2xl pointer-events-none" />
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-l bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mb-2">
            <Shield className="h-5 w-5" />
          </div>
          <h2 className="text-h3 font-bold tracking-tight text-text-primary">Welcome to TransitOps</h2>
          <p className="text-caption text-text-secondary">Enter credentials or select a demo role below</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <Input
            type="email"
            label="Email Address"
            placeholder="e.g. manager@transitops.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-4.5 w-4.5" />}
            isDisabled={isSubmitting}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<KeyRound className="h-4.5 w-4.5" />}
            isDisabled={isSubmitting}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 h-11"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </Card>

      {/* Judge Quick Login Box */}
      <Card className="p-5 bg-bg-surface-elevated/40 border border-border/60 rounded-l space-y-4">
        <div className="flex items-center gap-2 border-b border-border-muted pb-2 text-text-secondary">
          <UserCheck className="h-4 w-4 text-brand-primary" />
          <span className="text-tiny font-semibold uppercase tracking-wider">Judge Demo Gateway</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {DEMO_USERS.map((user) => (
            <button
              key={user.role}
              type="button"
              onClick={() => handleQuickLogin(user)}
              className="flex flex-col items-start p-2.5 rounded-m border border-border bg-bg-surface/50 text-left hover:border-brand-primary/50 hover:bg-bg-hover active:scale-98 transition-all duration-fast focus:outline-none focus:ring-1 focus:ring-brand-primary group"
            >
              <span className="text-caption font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                {user.role}
              </span>
              <span className="text-tiny text-text-muted mt-0.5 truncate w-full">
                {user.name}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
