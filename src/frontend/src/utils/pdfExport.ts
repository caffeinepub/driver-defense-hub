import type { FinancialBreakdown, LegalDefense } from '../backend';

// Helper function to create a printable document
function createPrintWindow(content: string, title: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to export PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          @media print {
            @page {
              margin: 20mm;
              size: A4;
            }
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
          }
          
          h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #1a1a1a;
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 10px;
          }
          
          h2 {
            font-size: 20px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #1a1a1a;
          }
          
          h3 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #1a1a1a;
          }
          
          .header {
            margin-bottom: 30px;
          }
          
          .meta {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .breakdown-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e5e5e5;
          }
          
          .breakdown-item:last-child {
            border-bottom: none;
          }
          
          .breakdown-label {
            font-weight: 500;
            color: #666;
          }
          
          .breakdown-value {
            font-weight: 600;
            color: #1a1a1a;
          }
          
          .total-section {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .total-label {
            font-size: 20px;
            font-weight: bold;
            color: #1a1a1a;
          }
          
          .total-value {
            font-size: 28px;
            font-weight: bold;
            color: #f59e0b;
          }
          
          .argument-item, .law-item, .step-item {
            background: #f9fafb;
            padding: 15px;
            margin-bottom: 12px;
            border-radius: 6px;
            border-left: 4px solid #f59e0b;
          }
          
          .step-item {
            display: flex;
            gap: 15px;
          }
          
          .step-number {
            flex-shrink: 0;
            width: 32px;
            height: 32px;
            background: #f59e0b;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          
          .step-content {
            flex: 1;
          }
          
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 11px;
            color: #999;
            text-align: center;
          }
          
          .document-preview {
            background: #f9fafb;
            padding: 20px;
            border-radius: 6px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.5;
            margin-top: 15px;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 100);
          };
        </script>
      </body>
    </html>
  `);
  
  printWindow.document.close();
}

export function exportFinancialCalculationPDF(breakdown: FinancialBreakdown): void {
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  
  const content = `
    <div class="header">
      <h1>Financial Loss Report</h1>
      <div class="meta">Generated: ${dateStr} ${timeStr}</div>
    </div>
    
    <div class="section">
      <h2>Financial Breakdown</h2>
      
      <div class="breakdown-item">
        <span class="breakdown-label">Distance</span>
        <span class="breakdown-value">${breakdown.distance.toFixed(2)} miles</span>
      </div>
      
      <div class="breakdown-item">
        <span class="breakdown-label">Fuel Cost</span>
        <span class="breakdown-value">$${breakdown.fuelCost.toFixed(2)}</span>
      </div>
      
      <div class="breakdown-item">
        <span class="breakdown-label">Tolls</span>
        <span class="breakdown-value">$${breakdown.tolls.toFixed(2)}</span>
      </div>
      
      <div class="breakdown-item">
        <span class="breakdown-label">Maintenance</span>
        <span class="breakdown-value">$${breakdown.maintenance.toFixed(2)}</span>
      </div>
      
      <div class="breakdown-item">
        <span class="breakdown-label">Fines</span>
        <span class="breakdown-value">$${breakdown.fines.toFixed(2)}</span>
      </div>
      
      <div class="total-section">
        <span class="total-label">Total Financial Loss:</span>
        <span class="total-value">$${breakdown.total.toFixed(2)}</span>
      </div>
    </div>
    
    <div class="footer">
      Driver Defense Hub - Financial Loss Calculator<br>
      Page 1
    </div>
  `;
  
  createPrintWindow(content, `Financial Loss Report - ${dateStr}`);
}

export function exportLegalDefensePDF(
  defense: LegalDefense,
  incidentDate?: string,
  incidentLocation?: string
): void {
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  
  const incidentInfo = `
    ${incidentDate ? `<div class="meta">Incident Date: ${incidentDate}</div>` : ''}
    ${incidentLocation ? `<div class="meta">Location: ${incidentLocation}</div>` : ''}
  `;
  
  const argumentsHtml = defense.arguments
    .map((arg, idx) => `
      <div class="argument-item">
        <strong>${idx + 1}.</strong> ${arg}
      </div>
    `)
    .join('');
  
  const lawsHtml = defense.applicableLaws
    .map((law, idx) => `
      <div class="law-item">
        <strong>${idx + 1}.</strong> ${law}
      </div>
    `)
    .join('');
  
  const stepsHtml = defense.suggestedNextSteps
    .map((step, idx) => `
      <div class="step-item">
        <div class="step-number">${idx + 1}</div>
        <div class="step-content">${step}</div>
      </div>
    `)
    .join('');
  
  const content = `
    <div class="header">
      <h1>Legal Defense Document</h1>
      <div class="meta">Generated: ${dateStr} ${timeStr}</div>
      ${incidentInfo}
    </div>
    
    <div class="section">
      <h2>Legal Arguments</h2>
      ${argumentsHtml}
    </div>
    
    <div class="section">
      <h2>Applicable Laws & Regulations</h2>
      ${lawsHtml}
    </div>
    
    <div class="section">
      <h2>Suggested Next Steps</h2>
      ${stepsHtml}
    </div>
    
    <div class="section">
      <h2>Complete Document</h2>
      <div class="document-preview">${defense.structuredDocument}</div>
    </div>
    
    <div class="footer">
      Driver Defense Hub - Legal Defense Generator<br>
      Page 1
    </div>
  `;
  
  createPrintWindow(content, `Legal Defense - ${dateStr}`);
}
