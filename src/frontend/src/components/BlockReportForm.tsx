import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import Tooltip from './Tooltip';
import { formatCPF, formatPhone, validateCPF, validatePhone } from '../utils/currencyFormat';
import type { BlockReport } from '../backend';

interface BlockReportFormProps {
  onSubmit: (report: BlockReport) => void;
  initialData?: Partial<BlockReport>;
}

export default function BlockReportForm({ onSubmit, initialData }: BlockReportFormProps) {
  const [platform, setPlatform] = useState(initialData?.platform || '');
  const [blockReason, setBlockReason] = useState(initialData?.blockReason || '');
  const [driverName, setDriverName] = useState(initialData?.driverName || '');
  const [cpf, setCpf] = useState(initialData?.cpf || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [blockDate, setBlockDate] = useState(initialData?.blockDate || '');
  const [additionalContext, setAdditionalContext] = useState(initialData?.additionalContext || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCpfChange = (value: string) => {
    const formatted = formatCPF(value);
    setCpf(formatted);
    if (errors.cpf) {
      setErrors(prev => ({ ...prev, cpf: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!platform) newErrors.platform = 'Selecione a plataforma';
    if (!blockReason.trim()) newErrors.blockReason = 'Informe o motivo do bloqueio';
    if (!driverName.trim()) newErrors.driverName = 'Informe seu nome';
    if (!cpf.trim()) {
      newErrors.cpf = 'Informe seu CPF';
    } else if (!validateCPF(cpf)) {
      newErrors.cpf = TRANSLATIONS.errors.invalidCPF;
    }
    if (!phone.trim()) {
      newErrors.phone = 'Informe seu telefone';
    } else if (!validatePhone(phone)) {
      newErrors.phone = TRANSLATIONS.errors.invalidPhone;
    }
    if (!blockDate) newErrors.blockDate = 'Informe a data do bloqueio';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const report: BlockReport = {
      id: initialData?.id || `block-${Date.now()}`,
      platform,
      blockReason,
      driverName,
      cpf,
      phone,
      blockDate,
      additionalContext,
    };
    
    onSubmit(report);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <AlertCircle className="h-6 w-6 text-primary" />
          {TRANSLATIONS.headings.blockInfo}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Preencha os dados sobre o bloqueio que você sofreu. Todas as informações são necessárias para gerar sua defesa.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform" className="text-base flex items-center gap-2">
              {TRANSLATIONS.labels.platform}
              <span className="text-destructive">*</span>
            </Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="min-h-[44px] text-base">
                <SelectValue placeholder={TRANSLATIONS.placeholders.selectPlatform} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uber">Uber</SelectItem>
                <SelectItem value="99">99</SelectItem>
                <SelectItem value="iFood">iFood</SelectItem>
                <SelectItem value="Rappi">Rappi</SelectItem>
                <SelectItem value="Indrive">Indrive</SelectItem>
              </SelectContent>
            </Select>
            {errors.platform && <p className="text-sm text-destructive">{errors.platform}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="blockReason" className="text-base flex items-center gap-2">
              {TRANSLATIONS.labels.blockReason}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="blockReason"
              type="text"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder={TRANSLATIONS.placeholders.blockReason}
              className="min-h-[44px] text-base"
            />
            {errors.blockReason && <p className="text-sm text-destructive">{errors.blockReason}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="driverName" className="text-base flex items-center gap-2">
                {TRANSLATIONS.labels.driverName}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="driverName"
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder={TRANSLATIONS.placeholders.driverName}
                className="min-h-[44px] text-base"
              />
              {errors.driverName && <p className="text-sm text-destructive">{errors.driverName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-base flex items-center gap-2">
                {TRANSLATIONS.labels.cpf}
                <span className="text-destructive">*</span>
                <Tooltip content={TRANSLATIONS.help.cpf} />
              </Label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => handleCpfChange(e.target.value)}
                placeholder={TRANSLATIONS.placeholders.cpf}
                className="min-h-[44px] text-base"
                maxLength={14}
              />
              {errors.cpf && <p className="text-sm text-destructive">{errors.cpf}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base flex items-center gap-2">
                {TRANSLATIONS.labels.phone}
                <span className="text-destructive">*</span>
                <Tooltip content={TRANSLATIONS.help.phone} />
              </Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder={TRANSLATIONS.placeholders.phone}
                className="min-h-[44px] text-base"
                maxLength={15}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockDate" className="text-base flex items-center gap-2">
                {TRANSLATIONS.labels.blockDate}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="blockDate"
                type="date"
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                className="min-h-[44px] text-base"
              />
              {errors.blockDate && <p className="text-sm text-destructive">{errors.blockDate}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalContext" className="text-base">
              {TRANSLATIONS.labels.additionalContext}
            </Label>
            <Textarea
              id="additionalContext"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder={TRANSLATIONS.placeholders.additionalContext}
              className="min-h-[100px] text-base"
            />
          </div>

          <Button type="submit" size="lg" className="w-full min-h-[44px]">
            {TRANSLATIONS.buttons.continue}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
