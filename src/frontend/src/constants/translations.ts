export const TRANSLATIONS = {
  // Form Labels
  labels: {
    platform: 'Plataforma que bloqueou você',
    blockReason: 'Motivo alegado pela plataforma',
    driverName: 'Seu nome completo',
    cpf: 'CPF',
    phone: 'Telefone',
    blockDate: 'Data do bloqueio',
    additionalContext: 'Informações adicionais (opcional)',
    activeYears: 'Anos trabalhando',
    activeMonths: 'Meses adicionais',
    dailyAvgEarnings: 'Média de ganhos por dia',
    weeklyAvgEarnings: 'Média de ganhos por semana',
    monthlyVehicleFinancing: 'Financiamento do veículo (mensal)',
    monthlyInsurance: 'Seguro (mensal)',
    monthlyFuel: 'Combustível (mensal)',
    monthlyMaintenance: 'Manutenção (mensal)',
    blockType: 'Tipo de bloqueio',
  },

  // Placeholders
  placeholders: {
    selectPlatform: 'Selecione a plataforma',
    blockReason: 'Ex: Cancelamento de corridas, reclamação de passageiro...',
    driverName: 'Ex: João da Silva',
    cpf: 'Ex: 123.456.789-00',
    phone: 'Ex: (11) 98765-4321',
    additionalContext: 'Descreva qualquer informação adicional relevante...',
    dailyEarnings: 'Ex: R$ 150,00',
    weeklyEarnings: 'Ex: R$ 900,00',
    vehicleFinancing: 'Ex: R$ 800,00',
    insurance: 'Ex: R$ 200,00',
    fuel: 'Ex: R$ 600,00',
    maintenance: 'Ex: R$ 150,00',
  },

  // Buttons
  buttons: {
    continue: 'Continuar',
    back: 'Voltar',
    saveDraft: 'Salvar Rascunho',
    exportPDF: 'Exportar PDF',
    reset: 'Limpar',
    edit: 'Editar',
    confirm: 'Confirmar',
    reviewCalculation: 'Revisar Cálculo',
    generateDefense: 'Gerar Defesa',
    restoreOriginal: 'Restaurar Original',
    saveChanges: 'Salvar Alterações',
    newReport: 'Começar Novo Relatório',
    backToDashboard: 'Voltar ao Início',
    close: 'Fechar',
    load: 'Retomar',
    delete: 'Apagar',
    clearAll: 'Apagar Todos',
    reportNewBlock: 'Reportar Novo Bloqueio',
    continueDraft: 'Continuar Rascunho',
    viewHistory: 'Ver Histórico de Rascunhos',
  },

  // Section Headings
  headings: {
    blockInfo: 'Dados do Bloqueio',
    workHistory: 'Histórico de Trabalho',
    ceasedProfits: 'Cálculo de Lucros Cessantes',
    legalDefense: 'Defesa Jurídica',
    driverInfo: 'Dados do Motorista e Bloqueio',
    earningsHistory: 'Histórico de Ganhos',
    monthlyExpenses: 'Despesas Fixas Mensais',
    lossCalculation: 'Cálculo de Perdas',
    legalFoundation: 'Fundamentação Jurídica',
    signature: 'Assinatura',
  },

  // Error Messages
  errors: {
    fillAllFields: 'Por favor, preencha todos os campos obrigatórios',
    invalidCPF: 'Por favor, insira um CPF válido',
    invalidPhone: 'Por favor, insira um telefone válido',
    saveFailed: 'Erro ao salvar. Tente novamente.',
    loadFailed: 'Erro ao carregar dados.',
    exportFailed: 'Erro ao exportar PDF.',
  },

  // Success Messages
  success: {
    draftSaved: 'Rascunho salvo! Você pode continuar depois.',
    reportSaved: 'Relatório de bloqueio salvo com sucesso!',
    calculationComplete: 'Cálculo concluído com sucesso!',
    defenseGenerated: 'Defesa jurídica gerada com sucesso!',
    pdfExported: 'Documento exportado com sucesso!',
    draftDeleted: 'Rascunho apagado.',
  },

  // Help Text & Tooltips
  help: {
    cpf: 'Seu CPF é necessário para identificação no documento legal. Formato: 000.000.000-00',
    phone: 'Telefone para contato. Formato: (00) 00000-0000',
    ceasedProfits: 'Lucros cessantes são o dinheiro que você deixou de ganhar por estar bloqueado',
    fixedExpenses: 'Despesas fixas são os custos que você tem todo mês, independente de trabalhar',
    avgEarnings: 'Calcule a média dos seus ganhos nos últimos 30 dias de trabalho',
    blockTypes: {
      arbitraryDismissal: 'Bloqueio sem justificativa clara ou motivo válido',
      falseAccusation: 'Bloqueio baseado em acusação falsa de passageiro ou restaurante',
      systemError: 'Bloqueio causado por erro no sistema ou aplicativo',
      discrimination: 'Bloqueio por discriminação (raça, gênero, idade, etc.)',
      retaliation: 'Bloqueio como retaliação por reclamação ou denúncia',
    },
    legalTerms: {
      clt: 'Consolidação das Leis do Trabalho - lei que protege direitos trabalhistas',
      cdc: 'Código de Defesa do Consumidor - lei que protege seus direitos como prestador de serviço',
      marcoCivil: 'Marco Civil da Internet - lei sobre direitos e deveres no uso da internet',
    },
  },

  // Empty States
  empty: {
    noDrafts: 'Nenhum rascunho salvo ainda',
    noCalculations: 'Nenhum cálculo realizado ainda',
    noDefenses: 'Nenhuma defesa gerada ainda',
  },

  // Confirmation Dialogs
  confirmations: {
    deleteDraft: 'Tem certeza que deseja apagar este rascunho?',
    clearAllDrafts: 'Tem certeza que deseja apagar todos os rascunhos?',
    resetForm: 'Tem certeza que deseja limpar o formulário?',
    restoreOriginal: 'Tem certeza que deseja restaurar o texto original? Suas alterações serão perdidas.',
  },

  // Platform Names
  platforms: {
    uber: 'Uber',
    '99': '99',
    ifood: 'iFood',
    rappi: 'Rappi',
    indrive: 'Indrive',
  },

  // Block Types
  blockTypes: {
    arbitraryDismissal: 'Dispensa Arbitrária',
    falseAccusation: 'Acusação Falsa',
    systemError: 'Erro do Sistema',
    discrimination: 'Discriminação',
    retaliation: 'Retaliação',
  },

  // Step Labels
  steps: {
    blockReport: 'Dados do Bloqueio',
    workHistory: 'Histórico de Trabalho',
    review: 'Revisão',
    defense: 'Defesa Jurídica',
    edit: 'Edição Final',
  },

  // PDF Document
  pdf: {
    title: 'Defesa Administrativa - Bloqueio Indevido',
    generatedOn: 'Gerado em',
    page: 'Página',
    signatureLine: 'Assinatura',
    printedName: 'Nome Completo',
    date: 'Data',
    cpfLine: 'CPF',
  },

  // Next Steps
  nextSteps: {
    title: 'Próximos passos',
    step1: '1. Imprima o documento',
    step2: '2. Assine na última página',
    step3: '3. Envie para a plataforma via SAC ou e-mail',
  },
};
