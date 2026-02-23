import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, AlertCircle, Briefcase, Calculator } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import { formatCurrency } from '../utils/currencyFormat';
import type { BlockReport, WorkHistory, CeasedProfits } from '../backend';

interface CalculationReviewProps {
  blockReport: BlockReport;
  workHistory: WorkHistory;
  ceasedProfits: CeasedProfits | null;
  onEdit: () => void;
  onConfirm: () => void;
}

export default function CalculationReview({
  blockReport,
  workHistory,
  ceasedProfits,
  onEdit,
  onConfirm,
}: CalculationReviewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const formatActiveTime = (months: bigint) => {
    const totalMonths = Number(months);
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (years === 0) return `${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    return `${years} ${years === 1 ? 'ano' : 'anos'}, ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
  };

  const totalMonthlyExpenses = 
    workHistory.monthlyVehicleFinancing +
    workHistory.monthlyInsurance +
    workHistory.monthlyFuel +
    workHistory.monthlyMaintenance;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle className="h-6 w-6 text-primary" />
            Revisão dos Dados
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Revise todas as informações antes de gerar a defesa jurídica. Você pode voltar e editar se necessário.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Block Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{TRANSLATIONS.headings.driverInfo}</h3>
            </div>
            <div className="bg-accent/50 rounded-lg p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-semibold">{blockReport.driverName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p className="font-semibold">{blockReport.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-semibold">{blockReport.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plataforma</p>
                  <p className="font-semibold">{blockReport.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data do Bloqueio</p>
                  <p className="font-semibold">{formatDate(blockReport.blockDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Motivo Alegado</p>
                  <p className="font-semibold">{blockReport.blockReason}</p>
                </div>
              </div>
              {blockReport.additionalContext && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">Contexto Adicional</p>
                  <p className="text-sm mt-1">{blockReport.additionalContext}</p>
                </div>
              )}
            </div>
          </div>

          {/* Work History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{TRANSLATIONS.headings.workHistory}</h3>
            </div>
            <div className="bg-accent/50 rounded-lg p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo de Atividade</p>
                  <p className="font-semibold">{formatActiveTime(workHistory.activeMonths)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ganho Médio Diário</p>
                  <p className="font-semibold">{formatCurrency(workHistory.dailyAvgEarnings)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ganho Médio Semanal</p>
                  <p className="font-semibold">{formatCurrency(workHistory.weeklyAvgEarnings)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Despesas Mensais Totais</p>
                  <p className="font-semibold">{formatCurrency(totalMonthlyExpenses)}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Detalhamento das Despesas</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financiamento:</span>
                    <span>{formatCurrency(workHistory.monthlyVehicleFinancing)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seguro:</span>
                    <span>{formatCurrency(workHistory.monthlyInsurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Combustível:</span>
                    <span>{formatCurrency(workHistory.monthlyFuel)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manutenção:</span>
                    <span>{formatCurrency(workHistory.monthlyMaintenance)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ceased Profits Calculation */}
          {ceasedProfits && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{TRANSLATIONS.headings.lossCalculation}</h3>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dias bloqueado:</span>
                    <span className="font-semibold">{Number(ceasedProfits.totalBlockedDays)} dias</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ganho médio diário:</span>
                    <span className="font-semibold">{formatCurrency(ceasedProfits.avgDailyEarnings)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total de ganhos perdidos:</span>
                    <span className="font-semibold">{formatCurrency(ceasedProfits.totalLostEarnings)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Despesas no período:</span>
                    <span className="font-semibold">{formatCurrency(ceasedProfits.totalExpensesDuringBlock)}</span>
                  </div>
                  <div className="border-t border-primary/20 pt-3 flex justify-between">
                    <span className="text-lg font-semibold">Lucros Cessantes Líquidos:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(ceasedProfits.netLostProfits)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onEdit}
              className="flex-1 min-h-[44px]"
            >
              <Edit className="mr-2 h-5 w-5" />
              {TRANSLATIONS.buttons.edit}
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={onConfirm}
              className="flex-1 min-h-[44px]"
            >
              {TRANSLATIONS.buttons.generateDefense}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
