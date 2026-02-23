import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Trash2, FileText, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useDraftPersistence } from '../hooks/useDraftPersistence';
import { TRANSLATIONS } from '../constants/translations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DraftsHistoryPage() {
  const navigate = useNavigate();
  const { getAllDrafts, deleteDraft, clearAllDrafts } = useDraftPersistence();
  const [drafts, setDrafts] = useState(getAllDrafts());

  const handleDelete = (id: string) => {
    try {
      deleteDraft(id);
      setDrafts(getAllDrafts());
      toast.success(TRANSLATIONS.success.draftDeleted);
    } catch (error) {
      toast.error('Erro ao apagar rascunho');
      console.error(error);
    }
  };

  const handleClearAll = () => {
    try {
      clearAllDrafts();
      setDrafts([]);
      toast.success('Todos os rascunhos foram apagados');
    } catch (error) {
      toast.error('Erro ao apagar rascunhos');
      console.error(error);
    }
  };

  const handleLoad = (id: string) => {
    navigate({ to: '/calculator' });
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgressText = (step: number) => {
    return `${step}/5 completo`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 min-h-[44px]"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar ao Início
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Rascunhos Salvos</h1>
            <p className="text-xl text-muted-foreground">
              Continue de onde você parou
            </p>
          </div>
          {drafts.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="min-h-[44px]">
                  {TRANSLATIONS.buttons.clearAll}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apagar todos os rascunhos?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {TRANSLATIONS.confirmations.clearAllDrafts}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>Apagar Todos</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {drafts.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg text-muted-foreground mb-6">
                {TRANSLATIONS.empty.noDrafts}
              </p>
              <Button
                size="lg"
                onClick={() => navigate({ to: '/calculator' })}
                className="min-h-[44px]"
              >
                {TRANSLATIONS.buttons.reportNewBlock}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <Card key={draft.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {draft.blockReport?.driverName || 'Rascunho sem nome'}
                          </h3>
                          {draft.blockReport?.platform && (
                            <p className="text-sm text-muted-foreground">
                              Plataforma: {draft.blockReport.platform}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatTimestamp(draft.timestamp)}
                        </div>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {getProgressText(draft.step)}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleLoad(draft.id)}
                          size="lg"
                          className="min-h-[44px]"
                        >
                          {TRANSLATIONS.buttons.load}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              className="min-h-[44px]"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apagar rascunho?</AlertDialogTitle>
                              <AlertDialogDescription>
                                {TRANSLATIONS.confirmations.deleteDraft}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(draft.id)}>
                                Apagar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
