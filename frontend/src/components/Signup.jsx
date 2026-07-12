import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { KeyRound, Mail, User, Shield } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { m, AnimatePresence } from 'framer-motion';

import { useAuth } from '../context/AuthContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Cards';

const signupSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  role: z.enum(['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' })
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  });

  const onSubmit = async (data) => {
    const result = await signup(data.name, data.email, data.password, data.role);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <m.div 
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <Card className="p-8 bg-bg-surface border border-border shadow-modal rounded-xl relative">
        <div className="space-y-2 mb-8">
          <h2 className="text-h3 font-bold tracking-tight text-text-primary">Create your account</h2>
          <p className="text-body text-text-secondary">Join TransitOps to manage your fleet</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Input
              type="text"
              label="Full Name"
              placeholder="e.g. Jane Doe"
              {...register('name')}
              icon={<User className="h-4.5 w-4.5" />}
              isDisabled={isSubmitting}
              isError={!!errors.name}
            />
            {errors.name && <p className="text-tiny text-danger-fg mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="email"
              label="Email Address"
              placeholder="e.g. name@company.com"
              {...register('email')}
              icon={<Mail className="h-4.5 w-4.5" />}
              isDisabled={isSubmitting}
              isError={!!errors.email}
            />
            {errors.email && <p className="text-tiny text-danger-fg mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-tiny font-semibold tracking-wider text-text-muted uppercase mb-1.5 block">
              Role
            </label>
            <div className="relative">
              <Shield className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-text-muted z-10" />
              <select
                {...register('role')}
                disabled={isSubmitting}
                className={`w-full h-10 pl-10 pr-4 bg-bg-surface-elevated text-text-primary border ${errors.role ? 'border-danger' : 'border-border'} rounded-m text-body outline-none transition-all duration-fast focus:border-brand-primary focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer disabled:opacity-50`}
              >
                <option value="" disabled>Select a role...</option>
                <option value="Fleet Manager">Fleet Manager</option>
                <option value="Dispatcher">Dispatcher</option>
                <option value="Safety Officer">Safety Officer</option>
                <option value="Financial Analyst">Financial Analyst</option>
              </select>
            </div>
            {errors.role && <p className="text-tiny text-danger-fg mt-1">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                {...register('password')}
                icon={<KeyRound className="h-4.5 w-4.5" />}
                isDisabled={isSubmitting}
                isError={!!errors.password}
              />
              {errors.password && <p className="text-tiny text-danger-fg mt-1">{errors.password.message}</p>}
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                label="Confirm"
                placeholder="••••••••"
                {...register('confirmPassword')}
                icon={<KeyRound className="h-4.5 w-4.5" />}
                isDisabled={isSubmitting}
                isError={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <p className="text-tiny text-danger-fg mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer group pt-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  {...register('agreeToTerms')}
                  disabled={isSubmitting}
                  className="peer appearance-none h-5 w-5 rounded-s border border-border bg-bg-surface checked:bg-brand-primary checked:border-transparent outline-none focus:ring-2 focus:ring-border-focus transition-all cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-brand-primary-fg pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-caption text-text-secondary group-hover:text-text-primary transition-colors">
                I agree to the <a href="#" className="text-brand-primary font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-brand-primary font-semibold hover:underline">Privacy Policy</a>
              </span>
            </label>
            {errors.agreeToTerms && <p className="text-tiny text-danger-fg mt-1 ml-8">{errors.agreeToTerms.message}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4 h-11"
            isLoading={isSubmitting}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-caption text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-primary hover:underline transition-all">
            Sign In
          </Link>
        </div>
      </Card>
    </m.div>
  );
}
