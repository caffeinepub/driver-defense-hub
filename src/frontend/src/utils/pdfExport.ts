import type { BlockReport, WorkHistory, CeasedProfits, LegalDefense } from '../backend';
import { formatCurrency } from './currencyFormat';

function createPrintWindow(content: string, title: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor, permita pop-ups para exportar o PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
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
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.5;
            color: #000;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
            background: white;
          }
          
          h1 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
            text-align: center;
            text-transform: uppercase;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          
          h2 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 12px;
            color: #000;
            text-transform: uppercase;
          }
          
          h3 {
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 8px;
            color: #000;
          }
          
          .header {
            margin-bottom: 30px;
          }
          
          .meta {
            font-size: 11px;
            color: #666;
            text-align: center;
            margin-bottom: 5px;
          }
          
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .info-item {
            margin-bottom: 10px;
          }
          
          .info-label {
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 3px;
          }
          
          .info-value {
            font-size: 13px;
            font-weight: 600;
            color: #000;
          }
          
          .calculation-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          
          .calculation-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          
          .calculation-table td:first-child {
            color: #666;
          }
          
          .calculation-table td:last-child {
            text-align: right;
            font-weight: 600;
          }
          
          .calculation-table tr.total td {
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding-top: 15px;
            padding-bottom: 15px;
            font-size: 16px;
            font-weight: bold;
          }
          
          .legal-text {
            text-align: justify;
            white-space: pre-wrap;
            font-size: 12px;
            line-height: 1.6;
            margin: 15px 0;
          }
          
          .signature-section {
            margin-top: 50px;
            page-break-inside: avoid;
          }
          
          .signature-line {
            border-top: 1px solid #000;
            margin-top: 60px;
            padding-top: 5px;
            text-align: center;
            font-size: 12px;
          }
          
          .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            font-size: 10px;
            color: #999;
            text-align: center;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .no-print {
              display: none;
            }
            
            .page-break {
              page-break-before: always;
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

export function generateLegalDocumentPDF(
  blockReport: BlockReport,
  workHistory: WorkHistory,
  ceasedProfits: CeasedProfits,
  legalDefense: LegalDefense
): void {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const blockDateStr = new Date(blockReport.blockDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  
  const totalMonthlyExpenses =
    workHistory.monthlyVehicleFinancing +
    workHistory.monthlyInsurance +
    workHistory.monthlyFuel +
    workHistory.monthlyMaintenance;

  const formatActiveTime = (months: bigint) => {
    const totalMonths = Number(months);
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (years === 0) return `${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
  };

  const content = `
    <div class="header">
      <h1>Defesa Administrativa - Bloqueio Indevido</h1>
      <div class="meta">Documento gerado em ${dateStr}</div>
    </div>
    
    <div class="section">
      <h2>1. Dados do Motorista e Bloqueio</h2>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Nome Completo</div>
          <div class="info-value">${blockReport.driverName}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">CPF</div>
          <div class="info-value">${blockReport.cpf}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Telefone</div>
          <div class="info-value">${blockReport.phone}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Plataforma</div>
          <div class="info-value">${blockReport.platform}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Data do Bloqueio</div>
          <div class="info-value">${blockDateStr}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Motivo Alegado</div>
          <div class="info-value">${blockReport.blockReason}</div>
        </div>
      </div>
      
      ${blockReport.additionalContext ? `
        <div class="info-item">
          <div class="info-label">Contexto Adicional</div>
          <div class="info-value">${blockReport.additionalContext}</div>
        </div>
      ` : ''}
    </div>
    
    <div class="section">
      <h2>2. Histórico de Trabalho</h2>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Tempo de Atividade</div>
          <div class="info-value">${formatActiveTime(workHistory.activeMonths)}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Ganho Médio Diário</div>
          <div class="info-value">${formatCurrency(workHistory.dailyAvgEarnings)}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Ganho Médio Semanal</div>
          <div class="info-value">${formatCurrency(workHistory.weeklyAvgEarnings)}</div>
        </div>
        
        <div class="info-item">
          <div class="info-label">Despesas Mensais Totais</div>
          <div class="info-value">${formatCurrency(totalMonthlyExpenses)}</div>
        </div>
      </div>
      
      <h3>Detalhamento das Despesas Mensais</h3>
      <table class="calculation-table">
        <tr>
          <td>Financiamento do Veículo</td>
          <td>${formatCurrency(workHistory.monthlyVehicleFinancing)}</td>
        </tr>
        <tr>
          <td>Seguro</td>
          <td>${formatCurrency(workHistory.monthlyInsurance)}</td>
        </tr>
        <tr>
          <td>Combustível</td>
          <td>${formatCurrency(workHistory.monthlyFuel)}</td>
        </tr>
        <tr>
          <td>Manutenção</td>
          <td>${formatCurrency(workHistory.monthlyMaintenance)}</td>
        </tr>
      </table>
    </div>
    
    <div class="section page-break">
      <h2>3. Cálculo de Lucros Cessantes</h2>
      
      <table class="calculation-table">
        <tr>
          <td>Dias Bloqueado</td>
          <td>${Number(ceasedProfits.totalBlockedDays)} dias</td>
        </tr>
        <tr>
          <td>Ganho Médio Diário</td>
          <td>${formatCurrency(ceasedProfits.avgDailyEarnings)}</td>
        </tr>
        <tr>
          <td>Total de Ganhos Perdidos (Bruto)</td>
          <td>${formatCurrency(ceasedProfits.totalLostEarnings)}</td>
        </tr>
        <tr>
          <td>Despesas Durante o Período de Bloqueio</td>
          <td>${formatCurrency(ceasedProfits.totalExpensesDuringBlock)}</td>
        </tr>
        <tr class="total">
          <td>Lucros Cessantes Líquidos</td>
          <td>${formatCurrency(ceasedProfits.netLostProfits)}</td>
        </tr>
      </table>
      
      <p style="font-size: 11px; color: #666; margin-top: 10px;">
        <strong>Fórmula aplicada:</strong> (Ganho médio diário - Despesas diárias) × Dias bloqueado
      </p>
    </div>
    
    <div class="section page-break">
      <h2>4. Fundamentação Jurídica</h2>
      
      <h3>Tipo de Bloqueio: ${legalDefense.blockType}</h3>
      
      <div class="legal-text">${legalDefense.structuredDocument}</div>
      
      <h3>Leis Aplicáveis</h3>
      ${legalDefense.applicableLaws.map((law, idx) => `
        <p style="margin: 8px 0; font-size: 12px;"><strong>${idx + 1}.</strong> ${law}</p>
      `).join('')}
      
      <h3>Próximos Passos Recomendados</h3>
      ${legalDefense.suggestedNextSteps.map((step, idx) => `
        <p style="margin: 8px 0; font-size: 12px;"><strong>${idx + 1}.</strong> ${step}</p>
      `).join('')}
    </div>
    
    <div class="section signature-section page-break">
      <h2>5. Assinatura</h2>
      
      <div class="signature-line">
        ${blockReport.driverName}
      </div>
      <p style="text-align: center; font-size: 11px; margin-top: 5px;">Nome Completo</p>
      
      <div class="signature-line">
        ${blockReport.cpf}
      </div>
      <p style="text-align: center; font-size: 11px; margin-top: 5px;">CPF</p>
      
      <div class="signature-line">
        ${dateStr}
      </div>
      <p style="text-align: center; font-size: 11px; margin-top: 5px;">Data</p>
    </div>
    
    <div class="footer">
      Documento gerado pelo Assistente Jurídico para Motoristas de Aplicativo<br>
      Este documento foi gerado automaticamente e deve ser revisado por um advogado antes do envio oficial.
    </div>
  `;
  
  createPrintWindow(content, `Defesa_Administrativa_${blockReport.driverName.replace(/\s+/g, '_')}_${dateStr}`);
}
