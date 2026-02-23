import { useGetDashboard } from '../hooks/useQueries';
import { useDraftPersistence } from '../hooks/useDraftPersistence';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText, ArrowRight, TrendingDown, Clock } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '../utils/currencyFormat';
import { TRANSLATIONS } from '../constants/translations';
import { SiCaffeine } from 'react-icons/si';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading } = useGetDashboard();
  const { getAllDrafts } = useDraftPersistence();

  const drafts = getAllDrafts();
  const mostRecentDraft = drafts.length > 0 ? drafts[0] : null;

  const totalCeasedProfits = dashboard?.ceasedProfitsCalculations.reduce(
    (sum, calc) => sum + calc.netLostProfits,
    0
  ) || 0;

  const totalDefensesGenerated = dashboard?.savedDefenses.length || 0;

  const recentDefenses = dashboard?.savedDefenses.slice(-3).reverse() || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Primary CTA */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Assistente Jurídico para Motoristas
            </h1>
            <p className="text-xl text-muted-foreground">
              Defenda-se contra bloqueios indevidos com documentação profissional
            </p>
          </div>

          <Button
            onClick={() => navigate({ to: '/calculator' })}
            size="lg"
            className="w-full min-h-[56px] text-lg font-semibold"
          >
            <AlertCircle className="mr-2 h-6 w-6" />
            {TRANSLATIONS.buttons.reportNewBlock}
          </Button>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {mostRecentDraft && (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {TRANSLATIONS.buttons.continueDraft}
                </CardTitle>
                <CardDescription>
                  Salvo em {new Date(mostRecentDraft.timestamp).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate({ to: '/calculator' })}
                  variant="outline"
                  size="lg"
                  className="w-full min-h-[44px]"
                >
                  {TRANSLATIONS.buttons.load}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {TRANSLATIONS.buttons.viewHistory}
              </CardTitle>
              <CardDescription>
                {drafts.length} {drafts.length === 1 ? 'rascunho salvo' : 'rascunhos salvos'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate({ to: '/drafts' })}
                variant="outline"
                size="lg"
                className="w-full min-h-[44px]"
              >
                Ver Rascunhos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="h-5 w-5 text-primary" />
                Total que Você Deixou de Ganhar
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <p className="text-4xl font-bold text-primary">
                  {formatCurrency(totalCeasedProfits)}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Defesas Geradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <p className="text-4xl font-bold text-primary">
                  {totalDefensesGenerated}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Defenses */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Defesas Recentes</h2>
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
                      <AlertCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">
                          Tipo: {defense.blockType}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {defense.arguments[0]}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {defense.arguments.length} argumentos • {defense.applicableLaws.length} leis citadas
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{TRANSLATIONS.empty.noDefenses}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 safe-area-bottom">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {new Date().getFullYear()} Assistente Jurídico para Motoristas
          </p>
          <p className="flex items-center justify-center gap-2">
            Feito com <SiCaffeine className="h-4 w-4 text-primary" /> usando{' '}
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
        </div>
      </footer>
    </div>
  );
}
