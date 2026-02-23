import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LoginButton from './LoginButton';
import InstallPrompt from './InstallPrompt';
import { TRANSLATIONS } from '../constants/translations';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <InstallPrompt />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CD</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              {TRANSLATIONS.dashboard.title}
            </span>
          </Link>

          {isAuthenticated && (
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
            </nav>
          )}

          <LoginButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary font-bold text-3xl">CD</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {TRANSLATIONS.dashboard.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {TRANSLATIONS.dashboard.subtitle}
            </p>
            <p className="text-muted-foreground mb-6">
              {TRANSLATIONS.auth.loginPrompt}
            </p>
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
            © {new Date().getFullYear()} {TRANSLATIONS.dashboard.title}
          </p>
        </div>
      </footer>
    </div>
  );
}
