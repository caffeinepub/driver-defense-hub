import { TRANSLATIONS } from '../constants/translations';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  const defaultLabels = [
    TRANSLATIONS.steps.blockReport,
    TRANSLATIONS.steps.workHistory,
    TRANSLATIONS.steps.review,
    TRANSLATIONS.steps.defense,
    TRANSLATIONS.steps.edit,
  ];

  const labels = stepLabels || defaultLabels;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          Passo {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {labels[currentStep - 1]}
        </span>
      </div>
      
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index < currentStep
                ? 'bg-primary'
                : index === currentStep
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
