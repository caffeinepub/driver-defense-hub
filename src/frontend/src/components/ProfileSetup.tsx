import React, { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { TRANSLATIONS } from '../constants/translations';

interface ProfileSetupProps {
  open: boolean;
}

export default function ProfileSetup({ open }: ProfileSetupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  
  const saveProfile = useSaveCallerUserProfile();

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = TRANSLATIONS.profile.nameRequired;
    }
    
    if (!email.trim()) {
      newErrors.email = TRANSLATIONS.profile.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = TRANSLATIONS.profile.emailInvalid;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await saveProfile.mutateAsync({ name: name.trim(), email: email.trim() });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{TRANSLATIONS.profile.setupTitle}</DialogTitle>
          <DialogDescription>
            {TRANSLATIONS.profile.setupDescription}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">{TRANSLATIONS.profile.name}</Label>
            <Input
              id="name"
              type="text"
              placeholder={TRANSLATIONS.profile.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{TRANSLATIONS.profile.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={TRANSLATIONS.profile.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? TRANSLATIONS.profile.saving : TRANSLATIONS.profile.saveProfile}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
