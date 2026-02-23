import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface DraftIndicatorProps {
  lastSaved: Date | null;
}

export default function DraftIndicator({ lastSaved }: DraftIndicatorProps) {
  const [visible, setVisible] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSaved) return;

    setVisible(true);
    updateTimeAgo();

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    const interval = setInterval(updateTimeAgo, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [lastSaved]);

  const updateTimeAgo = () => {
    if (!lastSaved) return;

    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) {
      setTimeAgo('agora mesmo');
    } else if (minutes === 1) {
      setTimeAgo('há 1 minuto');
    } else if (minutes < 60) {
      setTimeAgo(`há ${minutes} minutos`);
    } else {
      const hours = Math.floor(minutes / 60);
      setTimeAgo(hours === 1 ? 'há 1 hora' : `há ${hours} horas`);
    }
  };

  if (!visible || !lastSaved) return null;

  const isRecent = new Date().getTime() - lastSaved.getTime() < 60000;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
        isRecent ? 'bg-green-500/90' : 'bg-muted/90'
      } backdrop-blur-sm`}
    >
      <CheckCircle className={`h-4 w-4 ${isRecent ? 'text-white' : 'text-foreground'}`} />
      <span className={`text-sm font-medium ${isRecent ? 'text-white' : 'text-foreground'}`}>
        Salvo {timeAgo}
      </span>
    </div>
  );
}
