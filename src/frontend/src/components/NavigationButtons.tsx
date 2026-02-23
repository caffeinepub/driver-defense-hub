import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  loading?: boolean;
}

export default function NavigationButtons({
  onBack,
  onNext,
  backLabel = 'Voltar',
  nextLabel = 'Continuar',
  showBack = true,
  showNext = true,
  nextDisabled = false,
  loading = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-4 pt-6">
      {showBack && onBack && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1 min-h-[44px]"
          disabled={loading}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {backLabel}
        </Button>
      )}
      {showNext && onNext && (
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          className="flex-1 min-h-[44px]"
          disabled={nextDisabled || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              {nextLabel}
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
