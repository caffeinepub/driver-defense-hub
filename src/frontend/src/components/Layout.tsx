import { Outlet } from '@tanstack/react-router';
import LoginButton from './LoginButton';
import { Calculator, Scale } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-7 w-7 text-amber-500" />
                <Scale className="h-7 w-7 text-amber-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Driver Defense Hub</h1>
            </button>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {isAuthenticated ? (
          children
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Welcome to Driver Defense Hub</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Please log in to access your financial calculator and legal defense tools.
            </p>
            <LoginButton />
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Driver Defense Hub. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'driver-defense-hub'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
