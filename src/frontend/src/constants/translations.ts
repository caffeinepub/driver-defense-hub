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
    generic: 'Ocorreu um erro. Por favor, tente novamente.',
    unauthorized: 'Não autorizado. Por favor, faça login.',
    notFound: 'Não encontrado.',
    networkError: 'Erro de rede. Verifique sua conexão.',
  },

  // Success Messages
  success: {
    draftSaved: 'Rascunho salvo! Você pode continuar depois.',
    reportSaved: 'Relatório de bloqueio salvo com sucesso!',
    calculationComplete: 'Cálculo concluído com sucesso!',
    defenseGenerated: 'Defesa jurídica gerada com sucesso!',
    pdfExported: 'Documento exportado com sucesso!',
    draftDeleted: 'Rascunho apagado.',
    profileSaved: 'Perfil salvo com sucesso!',
    calculationSaved: 'Cálculo salvo com sucesso!',
    defenseSaved: 'Defesa salva com sucesso!',
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
    calculationTitle: 'Cálculo de Lucros Cessantes',
    defenseTitle: 'Defesa Jurídica',
  },

  // Navigation
  nav: {
    dashboard: 'Início',
    calculator: 'Calculadora',
    legalDefense: 'Defesa Jurídica',
    drafts: 'Rascunhos',
  },

  // Dashboard
  dashboard: {
    welcome: 'Bem-vindo ao ROTAS & DIREITOS',
    subtitle: 'Sua ferramenta completa para calcular lucros cessantes e gerar defesas jurídicas contra bloqueios indevidos em plataformas de transporte e delivery.',
    quickActions: 'Ações Rápidas',
    calculatorCard: {
      title: 'Calcular Lucros Cessantes',
      description: 'Calcule quanto você perdeu financeiramente durante o bloqueio',
      action: 'Iniciar Cálculo',
    },
    defenseCard: {
      title: 'Gerar Defesa Jurídica',
      description: 'Crie uma defesa completa com fundamentação legal',
      action: 'Gerar Defesa',
    },
    stats: {
      totalCalculations: 'Cálculos Realizados',
      totalDefenses: 'Defesas Geradas',
      totalLoss: 'Prejuízo Total',
    },
    recentCalculations: 'Cálculos Recentes',
    recentDefenses: 'Defesas Recentes',
    noCalculations: 'Nenhum cálculo realizado ainda',
    noDefenses: 'Nenhuma defesa gerada ainda',
  },

  // Auth
  auth: {
    loginPrompt: 'Faça login para começar a usar o sistema',
    login: 'Entrar',
    logout: 'Sair',
    loggingIn: 'Entrando...',
  },

  // Profile Setup
  profile: {
    setup: {
      title: 'Complete seu Perfil',
      description: 'Por favor, forneça algumas informações básicas para começar',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'Digite seu nome completo',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      saveButton: 'Salvar Perfil',
    },
    setupTitle: 'Complete seu Perfil',
    setupDescription: 'Por favor, forneça algumas informações básicas para começar',
    name: 'Nome Completo',
    namePlaceholder: 'Digite seu nome completo',
    email: 'E-mail',
    emailPlaceholder: 'Digite seu e-mail',
    saveProfile: 'Salvar Perfil',
    saving: 'Salvando...',
    nameRequired: 'Nome é obrigatório',
    emailRequired: 'E-mail é obrigatório',
    emailInvalid: 'E-mail inválido',
  },

  // Footer
  footer: {
    builtWith: 'Feito com',
    using: 'usando',
  },

  // Next Steps
  nextSteps: {
    title: 'Próximos Passos',
    step1: '1. Revise o documento gerado e faça ajustes se necessário',
    step2: '2. Imprima ou salve o PDF para seus registros',
    step3: '3. Envie a defesa para a plataforma dentro do prazo estabelecido',
  },

  // Install Prompt
  install: {
    message: 'Instale o app ROTAS & DIREITOS para acesso rápido',
    install: 'Instalar',
    dismiss: 'Agora não',
  },

  // Admin
  admin: {
    loading: 'Verificando permissões...',
    menu: {
      title: 'Administração',
      dashboard: 'Painel Admin',
      users: 'Gerenciar Usuários',
      activity: 'Registro de Atividades',
    },
    accessDenied: {
      title: 'Acesso Negado',
      message: 'Você não tem permissão para acessar esta área. Apenas administradores podem visualizar esta página.',
      backToDashboard: 'Voltar ao Início',
    },
    blockedUser: {
      title: 'Conta Bloqueada',
      message: 'Sua conta foi bloqueada por um administrador. Entre em contato com o suporte para mais informações.',
    },
    dashboard: {
      title: 'Painel Administrativo',
      subtitle: 'Visão geral das estatísticas e atividades do sistema',
      stats: {
        totalUsers: 'Total de Usuários',
        activeUsers: 'Usuários Ativos',
        blockedUsers: 'Usuários Bloqueados',
      },
      recentRegistrations: 'Registros Recentes',
      noRegistrations: 'Nenhum registro recente',
    },
    users: {
      title: 'Gerenciamento de Usuários',
      subtitle: 'Visualize e gerencie todos os usuários do sistema',
      searchPlaceholder: 'Buscar por nome, e-mail ou ID...',
      usersFound: 'usuários encontrados',
      noUsers: 'Nenhum usuário encontrado',
      table: {
        name: 'Nome',
        email: 'E-mail',
        registrationDate: 'Data de Registro',
        status: 'Status',
        actions: 'Ações',
      },
      status: {
        active: 'Ativo',
        blocked: 'Bloqueado',
      },
      actions: {
        block: 'Bloquear',
        unblock: 'Desbloquear',
      },
      blockDialog: {
        title: 'Bloquear Usuário',
        description: 'Tem certeza que deseja bloquear o usuário {name}? O usuário não poderá mais acessar o sistema.',
        reasonLabel: 'Motivo do bloqueio (opcional)',
        reasonPlaceholder: 'Descreva o motivo do bloqueio para documentação...',
        confirmButton: 'Bloquear Usuário',
      },
      unblockDialog: {
        title: 'Desbloquear Usuário',
        description: 'Tem certeza que deseja desbloquear o usuário {name}? O usuário recuperará o acesso ao sistema.',
        confirmButton: 'Desbloquear Usuário',
      },
      blockSuccess: 'Usuário bloqueado com sucesso',
      unblockSuccess: 'Usuário desbloqueado com sucesso',
    },
    activity: {
      title: 'Registro de Atividades',
      subtitle: 'Histórico de todas as ações administrativas realizadas no sistema',
      filters: {
        all: 'Todas as Ações',
        block: 'Bloqueios',
        unblock: 'Desbloqueios',
      },
      actionsFound: 'ações encontradas',
      noActivity: 'Nenhuma atividade registrada',
      table: {
        timestamp: 'Data/Hora',
        action: 'Ação',
        targetUser: 'Usuário Afetado',
        admin: 'Administrador',
      },
      actions: {
        block: 'Bloqueio',
        unblock: 'Desbloqueio',
        other: 'Outra Ação',
      },
    },
  },
};
