import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LegalDefenseGenerator from '../components/LegalDefenseGenerator';
import DefenseHistory from '../components/DefenseHistory';

export default function LegalDefensePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="lg" onClick={() => navigate({ to: '/' })} className="mb-6 min-h-[44px]">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Legal Defense Generator</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Generate professional legal defense documents for traffic violations
        </p>

        <div className="grid gap-8">
          <LegalDefenseGenerator />
          <DefenseHistory />
        </div>
      </div>
    </div>
  );
}
