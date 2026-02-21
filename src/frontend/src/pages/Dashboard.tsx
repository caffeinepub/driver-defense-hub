import { useGetDashboard } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Scale, ArrowRight, TrendingDown, FileText } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading } = useGetDashboard();

  const recentCalculations = dashboard?.savedCalculations.slice(-3).reverse() || [];
  const recentDefenses = dashboard?.savedDefenses.slice(-3).reverse() || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Complete Driver Defense Toolkit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate financial losses and generate professional legal defense documents with ease.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate({ to: '/calculator' })}>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-amber-500/10 rounded-lg">
                  <img src="/assets/generated/calculator-icon.dim_128x128.png" alt="Calculator" className="w-16 h-16" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">Financial Loss Calculator</CardTitle>
                  <CardDescription className="text-base">
                    Track and calculate your trip expenses, fines, and total financial impact
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full min-h-[44px] group-hover:bg-amber-600 transition-colors">
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate({ to: '/defense' })}>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-amber-500/10 rounded-lg">
                  <img src="/assets/generated/legal-icon.dim_128x128.png" alt="Legal Defense" className="w-16 h-16" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">Legal Defense Generator</CardTitle>
                  <CardDescription className="text-base">
                    Generate professional legal defense documents for traffic violations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full min-h-[44px] group-hover:bg-amber-600 transition-colors">
                Generate Defense
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Calculations */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingDown className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Recent Calculations</h2>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : recentCalculations.length > 0 ? (
              <div className="space-y-4">
                {recentCalculations.map((calc, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm text-muted-foreground">Total Loss</span>
                        <span className="text-2xl font-bold text-amber-500">
                          ${calc.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Fuel: ${calc.fuelCost.toFixed(2)}</div>
                        <div>Tolls: ${calc.tolls.toFixed(2)}</div>
                        <div>Maintenance: ${calc.maintenance.toFixed(2)}</div>
                        <div>Fines: ${calc.fines.toFixed(2)}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No calculations yet. Start by creating your first calculation.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Defenses */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Recent Legal Defenses</h2>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : recentDefenses.length > 0 ? (
              <div className="space-y-4">
                {recentDefenses.map((defense, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Scale className="h-5 w-5 text-amber-500 mt-1 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-2">Legal Defense Document</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {defense.arguments[0]}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {defense.arguments.length} arguments • {defense.applicableLaws.length} laws cited
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No legal defenses yet. Generate your first defense document.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
