import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import LoginButton from './LoginButton';
import InstallPrompt from './InstallPrompt';
import AdminMenu from './AdminMenu';
import { TRANSLATIONS } from '../constants/translations';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  
  const { data: userProfile } = useGetCallerUserProfile();
  const isBlocked = userProfile?.isBlocked || false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <InstallPrompt />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/LOGO LARANJA-2.png" 
              alt="ROTAS & DIREITOS" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
          </Link>

          {isAuthenticated && !isBlocked && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {TRANSLATIONS.nav.dashboard}
              </Link>
              <Link
                to="/calculator"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === '/calculator' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {TRANSLATIONS.nav.calculator}
              </Link>
              <Link
                to="/defense"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === '/defense' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {TRANSLATIONS.nav.legalDefense}
              </Link>
              <Link
                to="/pricing"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === '/pricing' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {TRANSLATIONS.nav.pricing}
              </Link>
              <AdminMenu />
            </nav>
          )}

          <LoginButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              <img 
                src="/assets/LOGO LARANJA-2.png" 
                alt="ROTAS & DIREITOS" 
                className="w-64 h-auto object-contain mx-auto"
                loading="eager"
              />
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {TRANSLATIONS.dashboard.subtitle}
            </p>
            <p className="text-muted-foreground mb-6">
              {TRANSLATIONS.auth.loginPrompt}
            </p>
            <LoginButton />
          </div>
        ) : isBlocked ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{TRANSLATIONS.admin.blockedUser.title}</AlertTitle>
              <AlertDescription>
                {TRANSLATIONS.admin.blockedUser.message}
              </AlertDescription>
            </Alert>
            <LoginButton />
          </div>
        ) : (
          children
        )}
      </main>

      <footer className="border-t border-border bg-card/50 mt-auto pb-safe">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            {TRANSLATIONS.footer.builtWith}{' '}
            <span className="text-destructive">❤️</span>{' '}
            {TRANSLATIONS.footer.using}{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2 text-xs">
            © {new Date().getFullYear()} ROTAS & DIREITOS
          </p>
        </div>
      </footer>
    </div>
  );
}
