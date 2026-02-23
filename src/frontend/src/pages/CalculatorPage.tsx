import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import BlockReportForm from '../components/BlockReportForm';
import WorkHistoryForm from '../components/WorkHistoryForm';
import CalculationReview from '../components/CalculationReview';
import LegalDefenseGenerator from '../components/LegalDefenseGenerator';
import DefenseEditor from '../components/DefenseEditor';
import ProgressIndicator from '../components/ProgressIndicator';
import DraftIndicator from '../components/DraftIndicator';
import ExportSuccessModal from '../components/ExportSuccessModal';
import { useDraftPersistence } from '../hooks/useDraftPersistence';
import { useAddBlockReport, useAddWorkHistory, useCalculateCeasedProfits, useGenerateLegalDefense } from '../hooks/useQueries';
import { generateLegalDocumentPDF } from '../utils/pdfExport';
import type { BlockReport, WorkHistory, CeasedProfits, LegalDefense } from '../backend';

const TOTAL_STEPS = 5;
const DRAFT_ID = 'current-draft';

export default function CalculatorPage() {
  const navigate = useNavigate();
  const { saveDraft, loadDraft, lastSaved } = useDraftPersistence();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [blockReport, setBlockReport] = useState<BlockReport | null>(null);
  const [workHistory, setWorkHistory] = useState<WorkHistory | null>(null);
  const [blockedDays, setBlockedDays] = useState(0);
  const [ceasedProfits, setCeasedProfits] = useState<CeasedProfits | null>(null);
  const [legalDefense, setLegalDefense] = useState<LegalDefense | null>(null);
  const [editedDefenseText, setEditedDefenseText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addBlockReportMutation = useAddBlockReport();
  const addWorkHistoryMutation = useAddWorkHistory();
  const calculateCeasedProfitsMutation = useCalculateCeasedProfits();
  const generateLegalDefenseMutation = useGenerateLegalDefense();

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft(DRAFT_ID);
    if (draft && draft.blockReport) {
      const shouldContinue = window.confirm('Você tem um rascunho salvo. Deseja continuar de onde parou?');
      if (shouldContinue) {
        if (draft.blockReport) setBlockReport(draft.blockReport as BlockReport);
        if (draft.workHistory) setWorkHistory(draft.workHistory as WorkHistory);
        if (draft.ceasedProfits) setCeasedProfits(draft.ceasedProfits);
        if (draft.legalDefense) setEditedDefenseText(draft.legalDefense);
        setCurrentStep(draft.step);
      }
    }
  }, []);

  // Auto-save on step change
  useEffect(() => {
    if (blockReport) {
      saveDraft({
        id: DRAFT_ID,
        timestamp: new Date(),
        blockReport,
        workHistory,
        ceasedProfits,
        legalDefense: editedDefenseText || null,
        step: currentStep,
      });
    }
  }, [currentStep, blockReport, workHistory, ceasedProfits, editedDefenseText]);

  const handleBlockReportSubmit = async (report: BlockReport) => {
    try {
      await addBlockReportMutation.mutateAsync(report);
      setBlockReport(report);
      setCurrentStep(2);
      toast.success('Dados do bloqueio salvos!');
    } catch (error) {
      toast.error('Erro ao salvar dados do bloqueio');
      console.error(error);
    }
  };

  const handleWorkHistorySubmit = async (history: WorkHistory, days: number) => {
    try {
      await addWorkHistoryMutation.mutateAsync(history);
      setWorkHistory(history);
      setBlockedDays(days);

      const totalMonthlyExpenses =
        history.monthlyVehicleFinancing +
        history.monthlyInsurance +
        history.monthlyFuel +
        history.monthlyMaintenance;

      const profits = await calculateCeasedProfitsMutation.mutateAsync({
        totalBlockedDays: BigInt(days),
        avgDailyEarnings: history.dailyAvgEarnings,
        monthlyExpenses: totalMonthlyExpenses,
      });

      setCeasedProfits(profits);
      setCurrentStep(3);
      toast.success('Cálculo de lucros cessantes concluído!');
    } catch (error) {
      toast.error('Erro ao calcular lucros cessantes');
      console.error(error);
    }
  };

  const handleReviewConfirm = () => {
    setCurrentStep(4);
  };

  const handleDefenseGenerated = async (defense: LegalDefense) => {
    setLegalDefense(defense);
    setEditedDefenseText(defense.structuredDocument);
    setCurrentStep(5);
  };

  const handleDefenseEdited = (text: string) => {
    setEditedDefenseText(text);
    setCurrentStep(5); // Stay on same step, just update text
  };

  const handleExportPDF = () => {
    if (!blockReport || !workHistory || !ceasedProfits || !legalDefense) {
      toast.error('Dados incompletos para exportação');
      return;
    }

    try {
      const defenseWithEditedText = {
        ...legalDefense,
        structuredDocument: editedDefenseText,
      };

      generateLegalDocumentPDF(blockReport, workHistory, ceasedProfits, defenseWithEditedText);
      setShowSuccessModal(true);
      toast.success('Abrindo diálogo de impressão...');
    } catch (error) {
      toast.error('Erro ao exportar PDF');
      console.error(error);
    }
  };

  const handleNewReport = () => {
    setCurrentStep(1);
    setBlockReport(null);
    setWorkHistory(null);
    setCeasedProfits(null);
    setLegalDefense(null);
    setEditedDefenseText('');
    setShowSuccessModal(false);
  };

  const handleBackToDashboard = () => {
    navigate({ to: '/' });
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="lg"
        onClick={handleBackToDashboard}
        className="mb-6 min-h-[44px]"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar ao Início
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Assistente de Defesa Jurídica</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Gere sua defesa completa contra bloqueio indevido
        </p>

        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {currentStep === 1 && (
          <BlockReportForm
            onSubmit={handleBlockReportSubmit}
            initialData={blockReport || undefined}
          />
        )}

        {currentStep === 2 && blockReport && (
          <WorkHistoryForm
            onSubmit={handleWorkHistorySubmit}
            blockDate={blockReport.blockDate}
            initialData={workHistory || undefined}
          />
        )}

        {currentStep === 3 && blockReport && workHistory && (
          <CalculationReview
            blockReport={blockReport}
            workHistory={workHistory}
            ceasedProfits={ceasedProfits}
            onEdit={goBack}
            onConfirm={handleReviewConfirm}
          />
        )}

        {currentStep === 4 && blockReport && workHistory && ceasedProfits && (
          <LegalDefenseGenerator
            blockReport={blockReport}
            workHistory={workHistory}
            ceasedProfits={ceasedProfits}
            onDefenseGenerated={handleDefenseGenerated}
          />
        )}

        {currentStep === 5 && legalDefense && (
          <div className="space-y-6">
            <DefenseEditor
              originalText={legalDefense.structuredDocument}
              onSave={handleDefenseEdited}
            />
            <Button
              onClick={handleExportPDF}
              size="lg"
              className="w-full min-h-[44px]"
            >
              Exportar PDF Completo
            </Button>
          </div>
        )}
      </div>

      <DraftIndicator lastSaved={lastSaved} />

      <ExportSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onNewReport={handleNewReport}
        onDashboard={handleBackToDashboard}
      />
    </div>
  );
}
