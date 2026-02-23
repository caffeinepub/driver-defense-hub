import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Printer } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

interface ExportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewReport: () => void;
  onDashboard: () => void;
}

export default function ExportSuccessModal({
  isOpen,
  onClose,
  onNewReport,
  onDashboard,
}: ExportSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {TRANSLATIONS.success.pdfExported}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Sua defesa jurídica completa foi gerada e está pronta para impressão ou envio.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-accent/50 rounded-lg p-4 my-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            {TRANSLATIONS.nextSteps.title}
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>{TRANSLATIONS.nextSteps.step1}</li>
            <li>{TRANSLATIONS.nextSteps.step2}</li>
            <li>{TRANSLATIONS.nextSteps.step3}</li>
          </ol>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={onNewReport}
            size="lg"
            className="w-full min-h-[44px]"
          >
            {TRANSLATIONS.buttons.newReport}
          </Button>
          <Button
            onClick={onDashboard}
            variant="outline"
            size="lg"
            className="w-full min-h-[44px]"
          >
            {TRANSLATIONS.buttons.backToDashboard}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            size="lg"
            className="w-full min-h-[44px]"
          >
            {TRANSLATIONS.buttons.close}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
