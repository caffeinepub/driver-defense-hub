import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CalculatorPage from './pages/CalculatorPage';
import LegalDefensePage from './pages/LegalDefensePage';
import DraftsHistoryPage from './pages/DraftsHistoryPage';
import ProfileSetup from './components/ProfileSetup';
import { Toaster } from '@/components/ui/sonner';

function RootComponent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <Layout>
        {showProfileSetup && <ProfileSetup />}
        <Outlet />
      </Layout>
      <Toaster />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calculator',
  component: CalculatorPage
});

const legalDefenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/defense',
  component: LegalDefensePage
});

const draftsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/drafts',
  component: DraftsHistoryPage
});

const routeTree = rootRoute.addChildren([indexRoute, calculatorRoute, legalDefenseRoute, draftsRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
