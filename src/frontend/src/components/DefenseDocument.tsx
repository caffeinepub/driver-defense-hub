import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Scale, FileText, Gavel } from 'lucide-react';
import type { LegalDefense } from '../backend';
import { exportLegalDefensePDF } from '../utils/pdfExport';
import { toast } from 'sonner';

interface DefenseDocumentProps {
  defense: LegalDefense;
  incidentDate?: string;
  incidentLocation?: string;
}

export default function DefenseDocument({ defense, incidentDate, incidentLocation }: DefenseDocumentProps) {
  const handleExportPDF = () => {
    exportLegalDefensePDF(defense, incidentDate, incidentLocation);
    toast.success('Opening print dialog...');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-amber-500" />
            Legal Defense Document
          </CardTitle>
          <Button onClick={handleExportPDF} variant="outline" size="lg" className="min-h-[44px]">
            <Printer className="mr-2 h-5 w-5" />
            Print PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Legal Arguments Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold">Legal Arguments</h3>
          </div>
          <div className="space-y-4">
            {defense.arguments.map((argument, idx) => (
              <div key={idx} className="p-4 bg-accent rounded-lg border border-border">
                <p className="text-base leading-relaxed">{argument}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Applicable Laws Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold">Applicable Laws & Regulations</h3>
          </div>
          <div className="space-y-3">
            {defense.applicableLaws.map((law, idx) => (
              <div key={idx} className="p-4 bg-accent rounded-lg border border-border">
                <p className="text-base leading-relaxed">{law}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Next Steps Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold">Suggested Next Steps</h3>
          </div>
          <div className="space-y-3">
            {defense.suggestedNextSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 p-4 bg-accent rounded-lg border border-border">
                <span className="shrink-0 w-8 h-8 bg-amber-500 text-background rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <p className="text-base leading-relaxed flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Document Preview */}
        <div className="border-t border-border pt-6">
          <h3 className="text-xl font-bold mb-4">Complete Document</h3>
          <div className="p-6 bg-accent rounded-lg border border-border">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{defense.structuredDocument}</pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
