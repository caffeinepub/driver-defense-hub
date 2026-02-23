import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function LegalDefensePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="lg" onClick={() => navigate({ to: '/' })} className="mb-6 min-h-[44px]">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar ao Início
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Gerador de Defesa Jurídica</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Use o fluxo completo para gerar sua defesa
        </p>

        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
            <p className="text-lg text-muted-foreground mb-6">
              Para gerar uma defesa jurídica completa, use o fluxo de relatório de bloqueio.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/calculator' })}
              className="min-h-[44px]"
            >
              Iniciar Relatório de Bloqueio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
