import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Scale } from 'lucide-react';
import { toast } from 'sonner';
import { TRANSLATIONS } from '../constants/translations';
import Tooltip from './Tooltip';
import { useGenerateLegalDefense } from '../hooks/useQueries';
import { formatCurrency } from '../utils/currencyFormat';
import type { BlockReport, WorkHistory, CeasedProfits, LegalDefense } from '../backend';

interface LegalDefenseGeneratorProps {
  blockReport: BlockReport;
  workHistory: WorkHistory;
  ceasedProfits: CeasedProfits;
  onDefenseGenerated: (defense: LegalDefense) => void;
}

const BLOCK_TYPES = [
  { value: 'arbitraryDismissal', label: TRANSLATIONS.blockTypes.arbitraryDismissal, help: TRANSLATIONS.help.blockTypes.arbitraryDismissal },
  { value: 'falseAccusation', label: TRANSLATIONS.blockTypes.falseAccusation, help: TRANSLATIONS.help.blockTypes.falseAccusation },
  { value: 'systemError', label: TRANSLATIONS.blockTypes.systemError, help: TRANSLATIONS.help.blockTypes.systemError },
  { value: 'discrimination', label: TRANSLATIONS.blockTypes.discrimination, help: TRANSLATIONS.help.blockTypes.discrimination },
  { value: 'retaliation', label: TRANSLATIONS.blockTypes.retaliation, help: TRANSLATIONS.help.blockTypes.retaliation },
];

export default function LegalDefenseGenerator({
  blockReport,
  workHistory,
  ceasedProfits,
  onDefenseGenerated,
}: LegalDefenseGeneratorProps) {
  const [blockType, setBlockType] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const generateMutation = useGenerateLegalDefense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blockType) {
      toast.error('Selecione o tipo de bloqueio');
      return;
    }

    const contextString = `
Plataforma: ${blockReport.platform}
Motivo alegado: ${blockReport.blockReason}
Nome do motorista: ${blockReport.driverName}
CPF: ${blockReport.cpf}
Telefone: ${blockReport.phone}
Data do bloqueio: ${blockReport.blockDate}
Tempo de atividade: ${Number(workHistory.activeMonths)} meses
Ganho médio diário: ${formatCurrency(workHistory.dailyAvgEarnings)}
Lucros cessantes: ${formatCurrency(ceasedProfits.netLostProfits)}
Dias bloqueado: ${Number(ceasedProfits.totalBlockedDays)}
Contexto adicional: ${blockReport.additionalContext || 'Nenhum'}
Detalhes adicionais: ${additionalContext || 'Nenhum'}
    `.trim();

    try {
      const defense = await generateMutation.mutateAsync({
        blockType,
        context: contextString,
      });
      onDefenseGenerated(defense);
      toast.success(TRANSLATIONS.success.defenseGenerated);
    } catch (error) {
      toast.error('Erro ao gerar defesa jurídica');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Scale className="h-6 w-6 text-primary" />
          {TRANSLATIONS.headings.legalDefense}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Selecione o tipo de bloqueio e forneça detalhes adicionais para gerar uma defesa jurídica personalizada.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base flex items-center gap-2">
              {TRANSLATIONS.labels.blockType}
              <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-3">
              {BLOCK_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    blockType === type.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="blockType"
                    value={type.value}
                    checked={blockType === type.value}
                    onChange={(e) => setBlockType(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{type.label}</span>
                      <Tooltip content={type.help} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{type.help}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalContext" className="text-base">
              Detalhes Adicionais (Opcional)
            </Label>
            <Textarea
              id="additionalContext"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Adicione qualquer informação relevante que possa fortalecer sua defesa..."
              className="min-h-[120px] text-base"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full min-h-[44px]"
            disabled={generateMutation.isPending}
          >
            {generateMutation.isPending ? 'Gerando defesa...' : TRANSLATIONS.buttons.generateDefense}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
