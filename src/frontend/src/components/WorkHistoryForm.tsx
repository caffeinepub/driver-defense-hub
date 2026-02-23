import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, TrendingUp } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import Tooltip from './Tooltip';
import { formatCurrency, parseCurrencyInput, formatCurrencyInput } from '../utils/currencyFormat';
import type { WorkHistory } from '../backend';

interface WorkHistoryFormProps {
  onSubmit: (history: WorkHistory, blockedDays: number) => void;
  blockDate: string;
  initialData?: Partial<WorkHistory>;
}

export default function WorkHistoryForm({ onSubmit, blockDate, initialData }: WorkHistoryFormProps) {
  const [activeYears, setActiveYears] = useState(initialData ? Math.floor(Number(initialData.activeMonths) / 12).toString() : '0');
  const [activeMonths, setActiveMonths] = useState(initialData ? (Number(initialData.activeMonths) % 12).toString() : '0');
  const [dailyAvgEarnings, setDailyAvgEarnings] = useState(initialData?.dailyAvgEarnings?.toString() || '');
  const [weeklyAvgEarnings, setWeeklyAvgEarnings] = useState(initialData?.weeklyAvgEarnings?.toString() || '');
  const [monthlyVehicleFinancing, setMonthlyVehicleFinancing] = useState(initialData?.monthlyVehicleFinancing?.toString() || '');
  const [monthlyInsurance, setMonthlyInsurance] = useState(initialData?.monthlyInsurance?.toString() || '');
  const [monthlyFuel, setMonthlyFuel] = useState(initialData?.monthlyFuel?.toString() || '');
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(initialData?.monthlyMaintenance?.toString() || '');

  const [calculatedLoss, setCalculatedLoss] = useState<{
    blockedDays: number;
    dailyExpenses: number;
    dailyCeasedProfits: number;
    totalCeasedProfits: number;
  } | null>(null);

  useEffect(() => {
    const daily = parseCurrencyInput(dailyAvgEarnings);
    const vehicle = parseCurrencyInput(monthlyVehicleFinancing);
    const insurance = parseCurrencyInput(monthlyInsurance);
    const fuel = parseCurrencyInput(monthlyFuel);
    const maintenance = parseCurrencyInput(monthlyMaintenance);

    const totalMonthlyExpenses = vehicle + insurance + fuel + maintenance;
    const dailyExpenses = totalMonthlyExpenses / 30;

    const blockDateObj = new Date(blockDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - blockDateObj.getTime());
    const blockedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dailyCeasedProfits = daily - dailyExpenses;
    const totalCeasedProfits = dailyCeasedProfits * blockedDays;

    setCalculatedLoss({
      blockedDays,
      dailyExpenses,
      dailyCeasedProfits: Math.max(0, dailyCeasedProfits),
      totalCeasedProfits: Math.max(0, totalCeasedProfits),
    });
  }, [dailyAvgEarnings, monthlyVehicleFinancing, monthlyInsurance, monthlyFuel, monthlyMaintenance, blockDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalMonths = (parseInt(activeYears) || 0) * 12 + (parseInt(activeMonths) || 0);

    const history: WorkHistory = {
      activeMonths: BigInt(totalMonths),
      dailyAvgEarnings: parseCurrencyInput(dailyAvgEarnings),
      weeklyAvgEarnings: parseCurrencyInput(weeklyAvgEarnings),
      monthlyVehicleFinancing: parseCurrencyInput(monthlyVehicleFinancing),
      monthlyInsurance: parseCurrencyInput(monthlyInsurance),
      monthlyFuel: parseCurrencyInput(monthlyFuel),
      monthlyMaintenance: parseCurrencyInput(monthlyMaintenance),
    };

    onSubmit(history, calculatedLoss?.blockedDays || 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Briefcase className="h-6 w-6 text-primary" />
          {TRANSLATIONS.headings.workHistory}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Informe seu histórico de trabalho e ganhos para calcular os lucros cessantes.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Active Time */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tempo de Atividade na Plataforma</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="activeYears" className="text-base">
                  {TRANSLATIONS.labels.activeYears}
                </Label>
                <Input
                  id="activeYears"
                  type="number"
                  min="0"
                  value={activeYears}
                  onChange={(e) => setActiveYears(e.target.value)}
                  className="min-h-[44px] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeMonths" className="text-base">
                  {TRANSLATIONS.labels.activeMonths}
                </Label>
                <Input
                  id="activeMonths"
                  type="number"
                  min="0"
                  max="11"
                  value={activeMonths}
                  onChange={(e) => setActiveMonths(e.target.value)}
                  className="min-h-[44px] text-base"
                />
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {TRANSLATIONS.headings.earningsHistory}
              <Tooltip content={TRANSLATIONS.help.avgEarnings} />
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dailyAvgEarnings" className="text-base">
                  {TRANSLATIONS.labels.dailyAvgEarnings}
                </Label>
                <Input
                  id="dailyAvgEarnings"
                  type="text"
                  value={dailyAvgEarnings}
                  onChange={(e) => setDailyAvgEarnings(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.dailyEarnings}
                  className="min-h-[44px] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyAvgEarnings" className="text-base">
                  {TRANSLATIONS.labels.weeklyAvgEarnings}
                </Label>
                <Input
                  id="weeklyAvgEarnings"
                  type="text"
                  value={weeklyAvgEarnings}
                  onChange={(e) => setWeeklyAvgEarnings(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.weeklyEarnings}
                  className="min-h-[44px] text-base"
                />
              </div>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {TRANSLATIONS.headings.monthlyExpenses}
              <Tooltip content={TRANSLATIONS.help.fixedExpenses} />
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyVehicleFinancing" className="text-base">
                  {TRANSLATIONS.labels.monthlyVehicleFinancing}
                </Label>
                <Input
                  id="monthlyVehicleFinancing"
                  type="text"
                  value={monthlyVehicleFinancing}
                  onChange={(e) => setMonthlyVehicleFinancing(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.vehicleFinancing}
                  className="min-h-[44px] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyInsurance" className="text-base">
                  {TRANSLATIONS.labels.monthlyInsurance}
                </Label>
                <Input
                  id="monthlyInsurance"
                  type="text"
                  value={monthlyInsurance}
                  onChange={(e) => setMonthlyInsurance(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.insurance}
                  className="min-h-[44px] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyFuel" className="text-base">
                  {TRANSLATIONS.labels.monthlyFuel}
                </Label>
                <Input
                  id="monthlyFuel"
                  type="text"
                  value={monthlyFuel}
                  onChange={(e) => setMonthlyFuel(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.fuel}
                  className="min-h-[44px] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyMaintenance" className="text-base">
                  {TRANSLATIONS.labels.monthlyMaintenance}
                </Label>
                <Input
                  id="monthlyMaintenance"
                  type="text"
                  value={monthlyMaintenance}
                  onChange={(e) => setMonthlyMaintenance(e.target.value)}
                  placeholder={TRANSLATIONS.placeholders.maintenance}
                  className="min-h-[44px] text-base"
                />
              </div>
            </div>
          </div>

          {/* Calculation Preview */}
          {calculatedLoss && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Prévia do Cálculo</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dias bloqueado:</span>
                  <span className="font-semibold">{calculatedLoss.blockedDays} dias</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Despesas diárias:</span>
                  <span className="font-semibold">{formatCurrency(calculatedLoss.dailyExpenses)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lucro cessante por dia:</span>
                  <span className="font-semibold">{formatCurrency(calculatedLoss.dailyCeasedProfits)}</span>
                </div>
                <div className="border-t border-primary/20 pt-3 flex justify-between">
                  <span className="font-semibold">Total de Lucros Cessantes:</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(calculatedLoss.totalCeasedProfits)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Fórmula: (Ganho diário - Despesas diárias) × Dias bloqueado
              </p>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full min-h-[44px]">
            {TRANSLATIONS.buttons.continue}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
