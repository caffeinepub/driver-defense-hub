import { useGetAllLegalDefenses } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { exportLegalDefensePDF } from '../utils/pdfExport';
import { toast } from 'sonner';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function DefenseHistory() {
  const { data: defenses, isLoading } = useGetAllLegalDefenses();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleExport = (defense: any) => {
    exportLegalDefensePDF(defense);
    toast.success('Opening print dialog...');
  };

  const toggleItem = (idx: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(idx)) {
      newOpenItems.delete(idx);
    } else {
      newOpenItems.add(idx);
    }
    setOpenItems(newOpenItems);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <History className="h-6 w-6 text-amber-500" />
            Defense History
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

  if (!defenses || defenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <History className="h-6 w-6 text-amber-500" />
            Defense History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No legal defenses yet. Generate your first defense above.
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
          Defense History ({defenses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {defenses.slice().reverse().map((defense, idx) => (
            <Collapsible key={idx} open={openItems.has(idx)} onOpenChange={() => toggleItem(idx)}>
              <div className="p-4 bg-accent rounded-lg border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-base font-semibold mb-2">Legal Defense Document #{defenses.length - idx}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{defense.arguments[0]}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button onClick={() => handleExport(defense)} variant="outline" size="lg" className="min-h-[44px]">
                      <Printer className="h-5 w-5" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="lg" className="min-h-[44px]">
                        {openItems.has(idx) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>

                <CollapsibleContent className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Arguments:</h4>
                    <ul className="space-y-2">
                      {defense.arguments.map((arg, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-amber-500">{arg}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Applicable Laws:</h4>
                    <ul className="space-y-2">
                      {defense.applicableLaws.map((law, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-amber-500">{law}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Next Steps:</h4>
                    <ul className="space-y-2">
                      {defense.suggestedNextSteps.map((step, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-amber-500">{step}</li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
