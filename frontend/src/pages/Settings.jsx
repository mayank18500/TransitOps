import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card } from '../components/ui/Cards';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Feedback';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Account Settings" subtitle="Manage your profile, preferences, and system settings." />
      
      <Section>
        <Grid cols={2} gap={8}>
          <Card className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border- border-border pb-6">
              <Avatar name={user?.name || 'User'} size="xl" />
              <div>
                <h3 className="text-h3 font-bold text-text-primary">{user?.name || 'User Profile'}</h3>
                <p className="text-body text-text-secondary capitalize">{user?.role || 'Administrator'}</p>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Full Name" defaultValue={user?.name || ''} />
              <Input label="Email Address" type="email" defaultValue={user?.email || ''} />
              <Input label="Role" defaultValue={user?.role || ''} isDisabled />
              
              <div className="pt-4">
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>
          
          <Card className="flex flex-col gap-6">
            <div>
              <h3 className="text-h3 font-bold text-text-primary mb-2">Security Settings</h3>
              <p className="text-body text-text-secondary">Update your password and secure your account.</p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              
              <div className="pt-4">
                <Button variant="primary" type="submit">Update Password</Button>
              </div>
            </form>
          </Card>
        </Grid>
      </Section>
    </div>
  );
}
