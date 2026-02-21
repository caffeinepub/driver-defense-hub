import { useGetAllFinancialLosses } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Printer } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { exportFinancialCalculationPDF } from '../utils/pdfExport';
import { toast } from 'sonner';

export default function CalculationHistory() {
  const { data: calculations, isLoading } = useGetAllFinancialLosses();

  const handleExport = (calc: any) => {
    exportFinancialCalculationPDF(calc);
    toast.success('Opening print dialog...');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <History className="h-6 w-6 text-amber-500" />
            Calculation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!calculations || calculations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <History className="h-6 w-6 text-amber-500" />
            Calculation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No calculations yet. Create your first calculation above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <History className="h-6 w-6 text-amber-500" />
          Calculation History ({calculations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calculations.slice().reverse().map((calc, idx) => (
            <div key={idx} className="p-4 bg-accent rounded-lg border border-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Total Loss</span>
                  <p className="text-2xl font-bold text-amber-500">${calc.total.toFixed(2)}</p>
                </div>
                <Button onClick={() => handleExport(calc)} variant="outline" size="lg" className="min-h-[44px]">
                  <Printer className="mr-2 h-5 w-5" />
                  Print
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="ml-2 font-semibold">{calc.distance.toFixed(2)} mi</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel:</span>
                  <span className="ml-2 font-semibold">${calc.fuelCost.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tolls:</span>
                  <span className="ml-2 font-semibold">${calc.tolls.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Maintenance:</span>
                  <span className="ml-2 font-semibold">${calc.maintenance.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fines:</span>
                  <span className="ml-2 font-semibold">${calc.fines.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
