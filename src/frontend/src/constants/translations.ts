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
    pricing: 'Planos',
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
      subtitle: 'Visão geral do sistema e estatísticas de usuários',
      stats: {
        totalUsers: 'Total de Usuários',
        activeUsers: 'Usuários Ativos',
        blockedUsers: 'Usuários Bloqueados',
      },
      recentRegistrations: 'Registros Recentes',
      noUsers: 'Nenhum usuário registrado ainda',
      noRegistrations: 'Nenhum registro recente',
    },
    users: {
      title: 'Gerenciamento de Usuários',
      subtitle: 'Gerencie usuários, bloqueios e permissões',
      searchPlaceholder: 'Buscar por nome ou e-mail...',
      usersFound: 'usuários encontrados',
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
      noUsers: 'Nenhum usuário encontrado',
      blockSuccess: 'Usuário bloqueado com sucesso',
      unblockSuccess: 'Usuário desbloqueado com sucesso',
      blockDialog: {
        title: 'Bloquear Usuário',
        description: 'Tem certeza que deseja bloquear {name}? O usuário não poderá mais acessar o sistema.',
        reasonLabel: 'Motivo do bloqueio (opcional)',
        reasonPlaceholder: 'Digite o motivo do bloqueio...',
        confirmButton: 'Bloquear Usuário',
      },
      unblockDialog: {
        title: 'Desbloquear Usuário',
        description: 'Tem certeza que deseja desbloquear {name}? O usuário poderá acessar o sistema novamente.',
        confirmButton: 'Desbloquear Usuário',
      },
    },
    activity: {
      title: 'Registro de Atividades',
      subtitle: 'Histórico de ações administrativas no sistema',
      filterAll: 'Todas',
      filterBlock: 'Bloqueios',
      filterUnblock: 'Desbloqueios',
      actionsFound: 'ações encontradas',
      filters: {
        all: 'Todas as Ações',
        block: 'Bloqueios',
        unblock: 'Desbloqueios',
      },
      table: {
        timestamp: 'Data/Hora',
        admin: 'Administrador',
        action: 'Ação',
        user: 'Usuário Afetado',
        targetUser: 'Usuário',
      },
      actions: {
        blocked: 'Bloqueou',
        unblocked: 'Desbloqueou',
        block: 'Bloqueio',
        unblock: 'Desbloqueio',
        other: 'Outra Ação',
      },
      noActivity: 'Nenhuma atividade registrada',
    },
    blockDialog: {
      title: 'Bloquear Usuário',
      description: 'Tem certeza que deseja bloquear este usuário? Ele não poderá mais acessar o sistema.',
      reasonLabel: 'Motivo do bloqueio (opcional)',
      reasonPlaceholder: 'Digite o motivo do bloqueio...',
      cancel: 'Cancelar',
      confirm: 'Bloquear',
      blocking: 'Bloqueando...',
    },
    unblockDialog: {
      title: 'Desbloquear Usuário',
      description: 'Tem certeza que deseja desbloquear este usuário? Ele poderá acessar o sistema novamente.',
      cancel: 'Cancelar',
      confirm: 'Desbloquear',
      unblocking: 'Desbloqueando...',
    },
  },

  // Pricing
  pricing: {
    title: 'Planos e Preços',
    subtitle: 'Escolha o plano ideal para suas necessidades e comece a defender seus direitos hoje mesmo',
    perMonth: '/mês',
    mostPopular: 'Mais Popular',
    selectPlan: 'Selecionar Plano',
    plans: {
      basic: {
        name: 'Básico',
        price: 'R$ 29,90',
        description: 'Ideal para motoristas que precisam de ferramentas essenciais',
        features: [
          'Calculadora de lucros cessantes',
          'Até 5 cálculos por mês',
          'Geração de defesa jurídica básica',
          'Exportação em PDF',
          'Suporte por e-mail',
        ],
      },
      premium: {
        name: 'Premium',
        price: 'R$ 59,90',
        description: 'Perfeito para motoristas profissionais que precisam de recursos avançados',
        features: [
          'Tudo do plano Básico',
          'Cálculos ilimitados',
          'Defesas jurídicas personalizadas',
          'Modelos de documentos avançados',
          'Histórico completo de casos',
          'Suporte prioritário por WhatsApp',
          'Consultoria jurídica básica',
        ],
      },
      professional: {
        name: 'Profissional',
        price: 'R$ 99,90',
        description: 'Para frotas e grupos de motoristas que precisam de gestão completa',
        features: [
          'Tudo do plano Premium',
          'Gestão de múltiplos motoristas',
          'Relatórios analíticos detalhados',
          'API para integração',
          'Consultoria jurídica completa',
          'Suporte 24/7',
          'Treinamento personalizado',
          'Gerente de conta dedicado',
        ],
      },
    },
    pixPayment: {
      title: 'Pagamento via PIX',
      description: 'Escaneie o QR Code ou copie a chave PIX para realizar o pagamento do seu plano',
      scanInstruction: 'Escaneie este QR Code com o aplicativo do seu banco para realizar o pagamento',
      pixKeyLabel: 'Chave PIX (E-mail)',
      instructionsTitle: 'Como realizar o pagamento',
      instructions: [
        'Abra o aplicativo do seu banco',
        'Selecione a opção "Pagar com PIX"',
        'Escaneie o QR Code acima ou copie a chave PIX',
        'Verifique os dados do pagamento (valor e destinatário)',
        'Confirme a transação',
        'Após o pagamento, envie o comprovante para nosso suporte',
      ],
      importantNote: '⚠️ Importante: Os pagamentos são verificados manualmente. Após realizar o pagamento, entre em contato com nosso suporte enviando o comprovante para ativar seu plano.',
      supportTitle: 'Precisa de ajuda?',
      supportText: 'Se você tiver dúvidas sobre os planos ou problemas com o pagamento, entre em contato com nosso suporte através do e-mail: suporte@rotasedireitos.com.br',
    },
    pixKeyCopied: 'Chave PIX copiada!',
  },
};
