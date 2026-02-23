import React from 'react';
import { Link } from '@tanstack/react-router';
import { useGetDashboard } from '../hooks/useQueries';
import { Calculator, FileText, TrendingUp, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { TRANSLATIONS } from '../constants/translations';

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-32 w-full" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  const totalCalculations = dashboard?.ceasedProfitsCalculations?.length || 0;
  const totalDefenses = dashboard?.savedDefenses?.length || 0;
  const totalLoss = dashboard?.ceasedProfitsCalculations?.reduce(
    (sum, calc) => sum + calc.netLostProfits,
    0
  ) || 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {TRANSLATIONS.dashboard.welcome}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {TRANSLATIONS.dashboard.subtitle}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.dashboard.stats.totalCalculations}
            </CardTitle>
            <Calculator className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalCalculations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.dashboard.stats.totalDefenses}
            </CardTitle>
            <Shield className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalDefenses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.dashboard.stats.totalLoss}
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalLoss)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          {TRANSLATIONS.dashboard.quickActions}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{TRANSLATIONS.dashboard.calculatorCard.title}</CardTitle>
              <CardDescription>
                {TRANSLATIONS.dashboard.calculatorCard.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculator">
                <Button className="w-full">
                  {TRANSLATIONS.dashboard.calculatorCard.action}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>{TRANSLATIONS.dashboard.defenseCard.title}</CardTitle>
              <CardDescription>
                {TRANSLATIONS.dashboard.defenseCard.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/defense">
                <Button className="w-full" variant="secondary">
                  {TRANSLATIONS.dashboard.defenseCard.action}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{TRANSLATIONS.dashboard.recentCalculations}</CardTitle>
          </CardHeader>
          <CardContent>
            {totalCalculations === 0 ? (
              <p className="text-muted-foreground text-sm">
                {TRANSLATIONS.dashboard.noCalculations}
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard?.ceasedProfitsCalculations?.slice(0, 3).map((calc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {calc.totalBlockedDays.toString()} dias bloqueados
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(calc.netLostProfits)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{TRANSLATIONS.dashboard.recentDefenses}</CardTitle>
          </CardHeader>
          <CardContent>
            {totalDefenses === 0 ? (
              <p className="text-muted-foreground text-sm">
                {TRANSLATIONS.dashboard.noDefenses}
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard?.savedDefenses?.slice(0, 3).map((defense, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {defense.blockType}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {defense.arguments.length} argumentos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
