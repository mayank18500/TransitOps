import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Mail, KeyRound, Briefcase, Radio, Zap } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const getRoleIcon = (role) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('manager')) return <Briefcase size={16} />;
    if (roleLower.includes('dispatcher')) return <Radio size={16} />;
    return <Zap size={16} />;
  };

  return (
    <div className="brutalist-wrapper">
      <div className="login-container">
        <div className="card">
          {/* Decorative Elements */}
          <div className="card-pattern-grid" />
          <div className="card-overlay-dots" />
          <div className="bold-pattern">
            <svg viewBox="0 0 100 100">
              <path strokeDasharray="15 10" strokeWidth={10} stroke="#000" fill="none" d="M0,0 L100,0 L100,100 L0,100 Z" />
            </svg>
          </div>

          {/* Header */}
          <div className="card-title-area">
            <span>TransitOps</span>
            <span className="card-tag">Portal</span>
          </div>

          <div className="card-body">
            <div className="card-content-split">
              <div className="left-panel">
                <div className="card-description">
                  Next-generation fleet intelligence. Enter your credentials or use the judge gateway below.
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="form-wrapper">
                  <div className="input-group">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      className="brutalist-input"
                      placeholder="manager@transitops.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <KeyRound className="input-icon" size={18} />
                    <input
                      type="password"
                      className="brutalist-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="card-button w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
              </div>

              <div className="right-panel">
                {/* Divider */}
                <div className="card-actions">
                  <div className="price">
                    <span className="price-currency">#</span>Demo
                    <span className="price-period">Judge Gateway</span>
                  </div>
                </div>

                {/* Demo Users Grid */}
                <div className="feature-grid">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.role}
                      type="button"
                      onClick={() => handleQuickLogin(user)}
                      disabled={isSubmitting}
                      className="feature-item"
                    >
                      <div className="feature-icon">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="feature-text-wrapper">
                        <span className="feature-text">{user.role}</span>
                        <span className="feature-subtext">{user.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorations */}
          <div className="dots-pattern">
            <svg viewBox="0 0 80 40">
              <circle fill="#000" r={3} cy={10} cx={10} />
              <circle fill="#000" r={3} cy={10} cx={30} />
              <circle fill="#000" r={3} cy={10} cx={50} />
              <circle fill="#000" r={3} cy={10} cx={70} />
              <circle fill="#000" r={3} cy={20} cx={20} />
              <circle fill="#000" r={3} cy={20} cx={40} />
              <circle fill="#000" r={3} cy={20} cx={60} />
              <circle fill="#000" r={3} cy={30} cx={10} />
              <circle fill="#000" r={3} cy={30} cx={30} />
              <circle fill="#000" r={3} cy={30} cx={50} />
              <circle fill="#000" r={3} cy={30} cx={70} />
            </svg>
          </div>
          <div className="accent-shape" />
          <div className="corner-slice" />
          <div className="stamp">
            <span className="stamp-text">Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}
