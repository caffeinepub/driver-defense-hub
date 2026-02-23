import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileEdit, RotateCcw } from 'lucide-react';
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

interface DefenseEditorProps {
  originalText: string;
  onSave: (editedText: string) => void;
}

export default function DefenseEditor({ originalText, onSave }: DefenseEditorProps) {
  const [editedText, setEditedText] = useState(originalText);
  const [hasChanges, setHasChanges] = useState(false);

  const handleTextChange = (value: string) => {
    setEditedText(value);
    setHasChanges(value !== originalText);
  };

  const handleReset = () => {
    setEditedText(originalText);
    setHasChanges(false);
  };

  const handleSave = () => {
    onSave(editedText);
  };

  const characterCount = editedText.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileEdit className="h-6 w-6 text-primary" />
          Editar Defesa Jurídica
        </CardTitle>
        <div className="text-sm text-muted-foreground mt-2 space-y-2">
          <p>
            Você pode revisar e editar o texto da defesa gerada. Mantenha as citações legais e a estrutura do documento.
          </p>
          <p className="text-xs">
            <strong>Dica:</strong> Evite alterar os artigos de lei e a fundamentação jurídica. Você pode adicionar detalhes específicos do seu caso.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Texto da Defesa</label>
            <span className="text-xs text-muted-foreground">{characterCount} caracteres</span>
          </div>
          <Textarea
            value={editedText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[400px] font-mono text-sm leading-relaxed"
            placeholder="O texto da defesa aparecerá aqui..."
          />
        </div>

        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 min-h-[44px]"
                disabled={!hasChanges}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                {TRANSLATIONS.buttons.restoreOriginal}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restaurar texto original?</AlertDialogTitle>
                <AlertDialogDescription>
                  {TRANSLATIONS.confirmations.restoreOriginal}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Restaurar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            type="button"
            size="lg"
            onClick={handleSave}
            className="flex-1 min-h-[44px]"
          >
            {TRANSLATIONS.buttons.continue}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
