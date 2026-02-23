import React from 'react';
import { Link } from '@tanstack/react-router';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { AlertCircle, Home } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { TRANSLATIONS } from '../constants/translations';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{TRANSLATIONS.admin.loading}</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{TRANSLATIONS.admin.accessDenied.title}</AlertTitle>
          <AlertDescription>
            {TRANSLATIONS.admin.accessDenied.message}
          </AlertDescription>
        </Alert>
        <Link to="/">
          <Button className="gap-2">
            <Home className="w-4 h-4" />
            {TRANSLATIONS.admin.accessDenied.backToDashboard}
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
