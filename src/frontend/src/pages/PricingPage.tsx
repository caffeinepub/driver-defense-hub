import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Home, QrCode } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import { toast } from 'sonner';

export default function PricingPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const pixKey = 'proj.defdriver+pagbank@gmail.com';

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopiedKey(true);
      toast.success(TRANSLATIONS.pricing.pixKeyCopied);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch (error) {
      toast.error(TRANSLATIONS.errors.generic);
    }
  };

  const plans = [
    {
      name: TRANSLATIONS.pricing.plans.basic.name,
      price: TRANSLATIONS.pricing.plans.basic.price,
      description: TRANSLATIONS.pricing.plans.basic.description,
      features: TRANSLATIONS.pricing.plans.basic.features,
      highlighted: false,
    },
    {
      name: TRANSLATIONS.pricing.plans.premium.name,
      price: TRANSLATIONS.pricing.plans.premium.price,
      description: TRANSLATIONS.pricing.plans.premium.description,
      features: TRANSLATIONS.pricing.plans.premium.features,
      highlighted: true,
    },
    {
      name: TRANSLATIONS.pricing.plans.professional.name,
      price: TRANSLATIONS.pricing.plans.professional.price,
      description: TRANSLATIONS.pricing.plans.professional.description,
      features: TRANSLATIONS.pricing.plans.professional.features,
      highlighted: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <Home className="h-4 w-4 mr-2" />
            {TRANSLATIONS.buttons.backToDashboard}
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-4">{TRANSLATIONS.pricing.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {TRANSLATIONS.pricing.subtitle}
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${
              plan.highlighted
                ? 'border-primary shadow-lg scale-105'
                : 'border-border'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                {TRANSLATIONS.pricing.mostPopular}
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">
                  {TRANSLATIONS.pricing.perMonth}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {TRANSLATIONS.pricing.selectPlan}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* PIX Payment Section */}
      <Card className="max-w-3xl mx-auto border-primary/50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <QrCode className="h-6 w-6 text-primary" />
            <CardTitle className="text-3xl">{TRANSLATIONS.pricing.pixPayment.title}</CardTitle>
          </div>
          <CardDescription className="text-base">
            {TRANSLATIONS.pricing.pixPayment.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* QR Code Display */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/assets/generated/pix-qr-code.dim_400x400.png"
                alt="QR Code PIX"
                className="w-64 h-64 md:w-80 md:h-80"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {TRANSLATIONS.pricing.pixPayment.scanInstruction}
            </p>
          </div>

          {/* PIX Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {TRANSLATIONS.pricing.pixPayment.pixKeyLabel}
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted px-4 py-3 rounded-md font-mono text-sm break-all">
                {pixKey}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyPixKey}
                className="shrink-0"
              >
                {copiedKey ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {TRANSLATIONS.pricing.pixPayment.instructionsTitle}
            </h3>
            <ol className="space-y-3 list-decimal list-inside">
              {TRANSLATIONS.pricing.pixPayment.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-muted-foreground pl-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Important Note */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              {TRANSLATIONS.pricing.pixPayment.importantNote}
            </p>
          </div>

          {/* Support Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-2">
              {TRANSLATIONS.pricing.pixPayment.supportTitle}
            </h3>
            <p className="text-sm text-muted-foreground">
              {TRANSLATIONS.pricing.pixPayment.supportText}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
