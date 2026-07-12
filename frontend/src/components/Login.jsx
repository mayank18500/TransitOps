import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { KeyRound, Mail, UserCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { m, AnimatePresence } from 'framer-motion';

import { useAuth, DEMO_USERS } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = async (user) => {
    setIsSubmittingQuick(true);
    const result = await login(user.email, user.password);
    setIsSubmittingQuick(false);

    if (result.success) {
      toast.success(`Logged in as ${user.name} (${user.role})`);
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  const getRoleIcon = (role) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('manager')) return <Briefcase size={16} />;
    if (roleLower.includes('dispatcher')) return <Radio size={16} />;
    return <Zap size={16} />;
  };

  return (
    <m.div 
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Login Card */}
      <Card className="p-8 bg-bg-surface border border-border shadow-modal rounded-xl relative">
        <div className="space-y-2 mb-8">
          <h2 className="text-h3 font-bold tracking-tight text-text-primary">Welcome back</h2>
          <p className="text-body text-text-secondary">Enter your credentials to manage your fleet</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Input
              type="email"
              label="Email Address"
              placeholder="e.g. manager@transitops.com"
              {...register('email')}
              icon={<Mail className="h-4.5 w-4.5" />}
              isDisabled={isSubmitting || isSubmittingQuick}
              isError={!!errors.email}
            />
            <AnimatePresence>
              {errors.email && (
                <m.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-tiny text-danger-fg mt-1"
                >
                  {errors.email.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              {...register('password')}
              icon={<KeyRound className="h-4.5 w-4.5" />}
              isDisabled={isSubmitting || isSubmittingQuick}
              isError={!!errors.password}
            />
            <AnimatePresence>
              {errors.password && (
                <m.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-tiny text-danger-fg mt-1"
                >
                  {errors.password.message}
                </m.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 h-11"
            isLoading={isSubmitting}
            isDisabled={isSubmittingQuick}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-caption text-text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-primary hover:underline transition-all">
            Sign Up
          </Link>
        </div>
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
    </m.div>
  );
}
