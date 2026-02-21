import { useState } from 'react';
import { useCalculateFinancialLoss } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Printer } from 'lucide-react';
import { toast } from 'sonner';
import type { FinancialBreakdown } from '../backend';
import { exportFinancialCalculationPDF } from '../utils/pdfExport';

export default function FinancialCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [tolls, setTolls] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [fines, setFines] = useState('');
  const [result, setResult] = useState<FinancialBreakdown | null>(null);

  const calculateMutation = useCalculateFinancialLoss();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tripData = {
      distance: parseFloat(distance) || 0,
      fuelCost: parseFloat(fuelCost) || 0,
      tolls: parseFloat(tolls) || 0,
      maintenance: parseFloat(maintenance) || 0,
      fines: parseFloat(fines) || 0
    };

    try {
      const breakdown = await calculateMutation.mutateAsync(tripData);
      setResult(breakdown);
      toast.success('Calculation completed successfully!');
    } catch (error) {
      toast.error('Failed to calculate financial loss');
      console.error(error);
    }
  };

  const handleReset = () => {
    setDistance('');
    setFuelCost('');
    setTolls('');
    setMaintenance('');
    setFines('');
    setResult(null);
  };

  const handleExportPDF = () => {
    if (result) {
      exportFinancialCalculationPDF(result);
      toast.success('Opening print dialog...');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="h-6 w-6 text-amber-500" />
          Calculate Financial Loss
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="distance" className="text-base">
                Distance (miles)
              </Label>
              <Input
                id="distance"
                type="number"
                step="0.01"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="0.00"
                className="min-h-[44px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelCost" className="text-base">
                Fuel Cost ($)
              </Label>
              <Input
                id="fuelCost"
                type="number"
                step="0.01"
                value={fuelCost}
                onChange={(e) => setFuelCost(e.target.value)}
                placeholder="0.00"
                className="min-h-[44px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tolls" className="text-base">
                Tolls ($)
              </Label>
              <Input
                id="tolls"
                type="number"
                step="0.01"
                value={tolls}
                onChange={(e) => setTolls(e.target.value)}
                placeholder="0.00"
                className="min-h-[44px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance" className="text-base">
                Maintenance ($)
              </Label>
              <Input
                id="maintenance"
                type="number"
                step="0.01"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                placeholder="0.00"
                className="min-h-[44px] text-base"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fines" className="text-base">
                Fines ($)
              </Label>
              <Input
                id="fines"
                type="number"
                step="0.01"
                value={fines}
                onChange={(e) => setFines(e.target.value)}
                placeholder="0.00"
                className="min-h-[44px] text-base"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1 min-h-[44px]" disabled={calculateMutation.isPending}>
              {calculateMutation.isPending ? 'Calculating...' : 'Calculate'}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset} className="min-h-[44px]">
              Reset
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-accent rounded-lg border border-border">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">Financial Breakdown</h3>
              <Button onClick={handleExportPDF} variant="outline" size="lg" className="min-h-[44px]">
                <Printer className="mr-2 h-5 w-5" />
                Print PDF
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-base text-muted-foreground">Distance</span>
                <span className="text-lg font-semibold">{result.distance.toFixed(2)} miles</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-base text-muted-foreground">Fuel Cost</span>
                <span className="text-lg font-semibold">${result.fuelCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-base text-muted-foreground">Tolls</span>
                <span className="text-lg font-semibold">${result.tolls.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-base text-muted-foreground">Maintenance</span>
                <span className="text-lg font-semibold">${result.maintenance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-base text-muted-foreground">Fines</span>
                <span className="text-lg font-semibold">${result.fines.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-amber-500/10 px-4 rounded-lg mt-4">
                <span className="text-xl font-bold">Total Financial Loss</span>
                <span className="text-3xl font-bold text-amber-500">${result.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
