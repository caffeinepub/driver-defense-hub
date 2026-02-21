import { useState } from 'react';
import { useGenerateLegalDefense } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale } from 'lucide-react';
import { toast } from 'sonner';
import type { LegalDefense } from '../backend';
import DefenseDocument from './DefenseDocument';

export default function LegalDefenseGenerator() {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [violationType, setViolationType] = useState('');
  const [circumstances, setCircumstances] = useState('');
  const [result, setResult] = useState<LegalDefense | null>(null);

  const generateMutation = useGenerateLegalDefense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !location || !violationType || !circumstances) {
      toast.error('Please fill in all fields');
      return;
    }

    const incidentDetails = {
      date,
      location,
      violationType,
      circumstances
    };

    try {
      const defense = await generateMutation.mutateAsync(incidentDetails);
      setResult(defense);
      toast.success('Legal defense generated successfully!');
    } catch (error) {
      toast.error('Failed to generate legal defense');
      console.error(error);
    }
  };

  const handleReset = () => {
    setDate('');
    setLocation('');
    setViolationType('');
    setCircumstances('');
    setResult(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Scale className="h-6 w-6 text-amber-500" />
            Generate Legal Defense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base">
                  Incident Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="min-h-[44px] text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-base">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State or Address"
                  className="min-h-[44px] text-base"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="violationType" className="text-base">
                  Violation Type
                </Label>
                <Select value={violationType} onValueChange={setViolationType}>
                  <SelectTrigger className="min-h-[44px] text-base">
                    <SelectValue placeholder="Select violation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speeding">Speeding</SelectItem>
                    <SelectItem value="red-light">Red Light Violation</SelectItem>
                    <SelectItem value="stop-sign">Stop Sign Violation</SelectItem>
                    <SelectItem value="parking">Parking Violation</SelectItem>
                    <SelectItem value="reckless-driving">Reckless Driving</SelectItem>
                    <SelectItem value="dui">DUI/DWI</SelectItem>
                    <SelectItem value="license">License/Registration Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="circumstances" className="text-base">
                  Circumstances & Details
                </Label>
                <Textarea
                  id="circumstances"
                  value={circumstances}
                  onChange={(e) => setCircumstances(e.target.value)}
                  placeholder="Describe the circumstances of the incident in detail..."
                  className="min-h-[120px] text-base"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1 min-h-[44px]" disabled={generateMutation.isPending}>
                {generateMutation.isPending ? 'Generating...' : 'Generate Defense'}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={handleReset} className="min-h-[44px]">
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {result && <DefenseDocument defense={result} incidentDate={date} incidentLocation={location} />}
    </>
  );
}
