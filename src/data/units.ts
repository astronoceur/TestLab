import { Unit } from '../types';
import { unit1 } from './unit1Data';

/*
 * CENTRALIZED UNIT DATA
 * ─────────────────────
 * Para adicionar uma nova unidade no padrao da Unidade 1:
 *   1) crie src/data/unitNData.ts seguindo o mesmo formato.
 *   2) importe e adicione no array `units`.
 *
 * Unidades 2 a 5 ainda usam o formato legado (campos simples) —
 * todas as paginas continuam funcionando porque os campos novos
 * sao opcionais. Quando elas forem migradas para o formato
 * completo, as paginas correspondentes ficarao automaticamente
 * disponiveis.
 */

export const units: Unit[] = [
  /* ══════════════════════════════════════════════════════════════
     UNIDADE 1 – Fundamentos de Teste de Software
     Conteudo completo em src/data/unit1Data.ts
  ══════════════════════════════════════════════════════════════ */
  unit1,

  /* eslint-disable */
  // @ts-ignore — placeholder legado da Unidade 1 abaixo (nunca executado)
  ...((true ? [] : [{
    id: 99,
    title: 'Unidade 1 (legado)',
    subtitle: 'Fundamentos do Teste de Software',
    description:
      'Aprenda os conceitos básicos do teste de software: defeitos, erros, falhas e os verdadeiros objetivos da garantia de qualidade.',
    icon: '🐞',
    objectives: [
      'Definir e distinguir erro, defeito (bug) e falha',
      'Explicar os objetivos do teste de software além de apenas encontrar bugs',
      'Aplicar a Análise de Valor Limite (AVL) para identificar casos de teste',
      'Escrever um caso de teste estruturado com pré-condição, passos e resultado esperado',
      'Classificar a severidade de um defeito e escrever um relatório de bug',
    ],
    priorKnowledgeQuestions: [
      {
        id: 1,
        question: 'O que é um defeito de software?',
        options: [
          'A) Um requisito correto',
          'B) Um comportamento incorreto do sistema causado por uma falha no código',
          'C) Um script de teste automatizado',
        ],
        correctIndex: 1,
        explanation:
          'Um defeito (bug) é uma falha no código que faz o sistema se comportar de forma incorreta. A opção A descreve um requisito e C descreve um script de teste.',
      },
      {
        id: 2,
        question: 'O principal objetivo do teste de software é:',
        options: [
          'A) Apenas encontrar erros no código',
          'B) Garantir a qualidade do software',
          'C) Criar novas funcionalidades mais rápido',
        ],
        correctIndex: 1,
        explanation:
          'O teste garante qualidade verificando correção, confiabilidade e conformidade — não apenas encontrando erros. Criar funcionalidades é papel do desenvolvimento.',
      },
      {
        id: 3,
        question: '"Erro" e "falha" são a mesma coisa em testes de software?',
        options: ['A) Sim, significam exatamente a mesma coisa', 'B) Não, são conceitos distintos'],
        correctIndex: 1,
        explanation:
          'São diferentes: Erro é uma ação humana incorreta; Defeito é a falha no código resultante; Falha é o comportamento incorreto observável quando o defeito é executado.',
      },
    ],
    content: [
      {
        title: 'O que é Teste de Software?',
        icon: '🔍',
        body: 'O teste de software é o processo de avaliar um sistema para verificar se ele atende aos requisitos especificados e para detectar defeitos. Ele fornece confiança de que o software funciona corretamente em condições esperadas e inesperadas.\n\nTestar não é apenas encontrar bugs — é uma disciplina de garantia de qualidade que reduz riscos antes que o software chegue aos usuários reais.',
      },
      {
        title: 'Erro, Defeito e Falha',
        icon: '🐛',
        body: 'Esses três termos são frequentemente confundidos, mas descrevem coisas diferentes:\n\n• Erro: Uma ação humana incorreta durante o desenvolvimento (ex: o desenvolvedor escreve a condição errada)\n• Defeito (Bug): A falha no código-fonte resultante desse erro\n• Falha: O comportamento incorreto observável que ocorre quando o defeito é executado\n\nExemplo em cadeia:\nDesenvolvedor esquece validação de entrada (erro) → código sem validação (defeito) → app falha em entrada vazia (falha).',
      },
      {
        title: 'Objetivos do Teste de Software',
        icon: '🎯',
        body: 'O teste serve a múltiplos objetivos importantes:\n\n• Detectar defeitos antes do lançamento em produção\n• Gerar confiança na qualidade do software\n• Prevenir defeitos por meio de revisões antecipadas\n• Fornecer informações para decisões baseadas em risco\n• Cumprir padrões e regulamentações do setor\n\nPrincípio importante: O teste pode mostrar a PRESENÇA de defeitos, mas não pode provar a ausência completa deles.',
      },
      {
        title: 'Análise de Valor Limite (AVL)',
        icon: '📏',
        body: 'A Análise de Valor Limite testa valores nas bordas dos intervalos de entrada válidos, onde os defeitos se escondem com mais frequência.\n\nPara um campo que aceita valores de 1 a 100:\n• 0 → logo abaixo do limite inferior (inválido)\n• 1 → no limite inferior (válido)\n• 100 → no limite superior (válido)\n• 101 → logo acima do limite superior (inválido)\n\nO valor 50 (meio do intervalo) tem menos chance de revelar defeitos. A AVL maximiza a detecção com o mínimo de casos de teste.',
      },
    ],
    examples: [
      {
        id: 1,
        scenario:
          'Um sistema de login aceita qualquer senha digitada pelo usuário — mesmo quando a senha está completamente errada — e concede acesso à conta.',
        task: 'Como essa situação deve ser classificada?',
        options: ['Comportamento correto', 'Defeito', 'Resultado esperado', 'Caso de teste'],
        correctIndex: 1,
        explanation:
          'Isso é um Defeito. O código tem uma falha na lógica de autenticação — não está validando a senha corretamente. Esse defeito causa uma falha de segurança observável por qualquer usuário.',
      },
    ],
    guidedPractice: {
      question:
        'Um campo de formulário aceita valores numéricos de 1 a 100. Usando a Análise de Valor Limite, quais valores devem estar no conjunto de testes?',
      context: 'Selecione TODOS os valores que representam casos de teste de limite:',
      options: ['0', '1', '50', '100', '101'],
      correctAnswers: [0, 1, 3, 4],
      explanation:
        'A AVL exige testar: 0 (abaixo do limite inferior — inválido), 1 (no limite inferior — válido), 100 (no limite superior — válido) e 101 (acima do limite superior — inválido). O valor 50 é um caso de meio do intervalo e NÃO é um caso de limite.',
    },
    independentPractice: {
      title: 'Escreva um Caso de Teste para o Login',
      scenario:
        'A tela de login aceita usuário e senha. O sistema só deve conceder acesso quando ambos estiverem corretos. Teste o cenário onde o usuário insere usuário válido mas senha incorreta.',
      fields: [
        {
          key: 'precondition',
          label: '1. Pré-condição',
          placeholder: 'Descreva o que deve ser verdade antes do teste executar...',
        },
        {
          key: 'steps',
          label: '2. Passos de Execução',
          placeholder: 'Liste os passos exatos para executar o teste...',
        },
        {
          key: 'expectedResult',
          label: '3. Resultado Esperado',
          placeholder: 'O que o sistema deve fazer após os passos serem concluídos?',
        },
      ],
      sampleAnswer: {
        precondition: "Existe uma conta válida com usuário 'teste' e senha '1234' cadastrada no sistema.",
        steps:
          "1. Navegar até a tela de login\n2. Inserir 'teste' no campo de usuário\n3. Inserir 'errado' no campo de senha\n4. Clicar no botão Entrar",
        expectedResult:
          "O sistema nega o acesso e exibe mensagem de erro 'Usuário ou senha inválidos'. O usuário permanece na tela de login.",
      },
    },
    finalAssessmentQuestions: [
      {
        id: 1,
        question: 'Um teste de unidade verifica:',
        options: [
          'A) O sistema completo de ponta a ponta pela interface',
          'B) Componentes isolados ou funções individuais em isolamento',
          'C) Comunicação de rede entre serviços',
          'D) Desempenho do banco de dados sob carga',
        ],
        correctIndex: 1,
        explanation:
          'Testes de unidade verificam componentes isolados ou funções individuais, independentemente do resto do sistema.',
      },
      {
        id: 2,
        question: "Em testes de software, 'severidade' de um defeito significa:",
        options: [
          'A) Com que rapidez a equipe deve corrigi-lo (prioridade)',
          'B) Quantos usuários já reportaram',
          'C) O grau de impacto do defeito no sistema ou usuário',
          'D) Há quanto tempo o defeito existe no código',
        ],
        correctIndex: 2,
        explanation:
          'Severidade descreve o impacto de um defeito — um defeito Crítico pode travar o sistema, enquanto um de Baixa severidade pode ser apenas cosmético.',
      },
      {
        id: 3,
        question: 'Qual é o PRINCIPAL objetivo da Análise de Valor Limite (AVL)?',
        options: [
          'A) Testar exaustivamente todos os valores de entrada possíveis',
          'B) Testar valores nas bordas de intervalos válidos onde defeitos são mais comuns',
          'C) Testar apenas entradas inválidas para encontrar vulnerabilidades',
          'D) Gerar dados de teste automaticamente de forma aleatória',
        ],
        correctIndex: 1,
        explanation:
          'A AVL foca em valores de limite (logo abaixo, em e logo acima de cada limite) porque defeitos se concentram nessa região.',
      },
      {
        id: 4,
        question: "O que melhor descreve uma 'falha' de software?",
        options: [
          'A) Um erro de codificação cometido pelo desenvolvedor',
          'B) Uma falha introduzida no código-fonte',
          'C) O comportamento incorreto observável quando o software executa um defeito',
          'D) Um caso de teste faltando ou incompleto',
        ],
        correctIndex: 2,
        explanation:
          "Falha é o que o usuário observa — o sistema não funcionando conforme esperado durante a execução. É causada por um defeito subjacente (falha de código), inserido por um erro (ação humana incorreta).",
      },
    ],
    challenge: {
      title: 'Desafio: Relatório de Bug',
      scenario:
        'Durante testes exploratórios de uma aplicação web, você descobre que ao inserir um nome de usuário válido com uma senha completamente errada, o sistema faz login com sucesso e leva ao painel inicial. O acesso nunca é negado, independentemente da senha.',
      tasks: [
        'Identifique o defeito descrito no cenário',
        'Classifique o nível de severidade (Baixa / Média / Alta / Crítica)',
        'Escreva um relatório de bug completo com todos os campos obrigatórios',
      ],
      fields: [
        {
          key: 'defectDescription',
          label: 'Defeito Identificado',
          type: 'textarea',
          placeholder: 'Descreva com suas palavras qual é o defeito...',
        },
        {
          key: 'severity',
          label: 'Nível de Severidade',
          type: 'select',
          options: ['-- Selecione --', 'Baixa', 'Média', 'Alta', 'Crítica'],
        },
        {
          key: 'bugTitle',
          label: 'Título do Bug',
          type: 'text',
          placeholder: 'Título curto e descritivo (ex: "Login aceita senha incorreta")',
        },
        {
          key: 'steps',
          label: 'Passos para Reproduzir',
          type: 'textarea',
          placeholder: '1. \n2. \n3. ',
        },
        {
          key: 'expected',
          label: 'Resultado Esperado',
          type: 'textarea',
          placeholder: 'O que o sistema deveria ter feito?',
        },
        {
          key: 'actual',
          label: 'Resultado Atual',
          type: 'textarea',
          placeholder: 'O que o sistema fez na realidade?',
        },
      ],
      expectedReport: {
        title: 'Login aceita senha incorreta',
        steps:
          '1. Navegar até a tela de login\n2. Inserir um nome de usuário válido\n3. Inserir uma senha errada\n4. Clicar no botão Entrar',
        expected: 'Sistema nega acesso e exibe mensagem de erro (ex: "Credenciais inválidas")',
        actual: 'Sistema concede acesso e navega para o painel inicial mesmo com senha errada',
        severity: 'Alta',
      },
    },
  } as unknown as Unit]) as Unit[]),
  /* eslint-enable */

  /* ══════════════════════════════════════════════════════════════
     UNIDADE 2 – Técnicas de Projeto de Teste
  ══════════════════════════════════════════════════════════════ */
  {
    id: 2,
    title: 'Unidade 2',
    subtitle: 'Técnicas de Projeto de Teste',
    description:
      'Domine as principais técnicas para projetar casos de teste eficazes: Partição por Equivalência, Tabela de Decisão e Transição de Estados.',
    icon: '🐞',
    objectives: [
      'Aplicar a Partição por Equivalência para reduzir casos de teste',
      'Construir e interpretar Tabelas de Decisão',
      'Modelar Diagramas de Transição de Estado',
      'Escolher a técnica mais adequada para cada cenário',
      'Combinar múltiplas técnicas para aumentar a cobertura',
    ],
    priorKnowledgeQuestions: [
      {
        id: 1,
        question: 'Partição por Equivalência divide os dados de entrada em:',
        options: [
          'A) Grupos com comportamento esperado similar',
          'B) Apenas valores válidos',
          'C) Todos os valores possíveis',
        ],
        correctIndex: 0,
        explanation:
          'A Partição por Equivalência agrupa entradas que o sistema trata da mesma forma, permitindo representar todo o grupo com apenas um caso de teste.',
      },
      {
        id: 2,
        question: 'Uma Tabela de Decisão é mais útil quando:',
        options: [
          'A) O sistema tem uma lógica linear simples',
          'B) O comportamento depende de combinações de condições',
          'C) Os dados de entrada são apenas numéricos',
        ],
        correctIndex: 1,
        explanation:
          'Tabelas de Decisão são ideais para sistemas onde o resultado depende da combinação de múltiplas condições — garantem que todas as combinações importantes sejam testadas.',
      },
      {
        id: 3,
        question: 'No teste de Caixa-Preta, o testador:',
        options: [
          'A) Conhece a implementação interna do código',
          'B) Testa com base apenas em entradas e saídas esperadas',
          'C) Precisa ter acesso ao código-fonte',
        ],
        correctIndex: 1,
        explanation:
          'No teste de Caixa-Preta, o testador não conhece a implementação interna — ele baseia os testes nos requisitos e no comportamento esperado (entradas e saídas).',
      },
    ],
    content: [
      {
        title: 'Partição por Equivalência',
        icon: '⚖️',
        body: 'A Partição por Equivalência divide o domínio de entrada em classes onde o sistema deve se comportar da mesma forma. Testar um valor de cada classe é suficiente.\n\nExemplo — campo de nota (0 a 10):\n• Classe inválida 1: valores < 0 (ex: -1)\n• Classe válida: valores 0–10 (ex: 7)\n• Classe inválida 2: valores > 10 (ex: 11)\n\nBenefício: reduz drasticamente o número de casos de teste sem perder cobertura.',
      },
      {
        title: 'Tabela de Decisão',
        icon: '📊',
        body: 'A Tabela de Decisão organiza combinações de condições e as ações resultantes em formato de tabela.\n\nEstrutura:\n• Linhas superiores: condições (C1, C2...)\n• Linhas inferiores: ações (A1, A2...)\n• Colunas: regras (combinações)\n\nExemplo — sistema de desconto:\nC1: Cliente VIP? | C2: Compra > R$200?\nA1: 30% de desconto | A2: 10% | A3: Sem desconto\n\nGarante que todas as combinações relevantes de condições sejam testadas.',
      },
      {
        title: 'Transição de Estados',
        icon: '🔄',
        body: 'O teste de Transição de Estados verifica o comportamento do sistema à medida que ele muda de um estado para outro em resposta a eventos.\n\nComponentes:\n• Estado: condição em que o sistema se encontra\n• Evento: gatilho que causa a transição\n• Ação: o que acontece durante a transição\n• Estado resultante: próximo estado após a transição\n\nExemplo — processo de pedido:\nNovo → Confirmado → Em preparo → Entregue → Fechado\n\nIdeal para sistemas com fluxos de trabalho e ciclos de vida.',
      },
      {
        title: 'Escolhendo a Técnica Certa',
        icon: '🎯',
        body: 'Diretrizes para escolher a técnica:\n\n• Campos numéricos com intervalos → Análise de Valor Limite\n• Grupos de entradas semelhantes → Partição por Equivalência\n• Lógica com múltiplas condições → Tabela de Decisão\n• Fluxos com estados e transições → Diagrama de Transição\n• Exploração sem roteiro → Teste Exploratório\n\nNa prática, bons testadores combinam múltiplas técnicas para maximizar a cobertura.',
      },
    ],
    examples: [
      {
        id: 1,
        scenario:
          'Um campo de formulário de cadastro aceita a idade do usuário. O sistema aceita idades entre 18 e 65 anos para cadastro. Um testador insere o valor 17 e o sistema cadastra o usuário sem exibir erro.',
        task: 'Como essa situação deve ser classificada?',
        options: ['Comportamento correto', 'Defeito', 'Caso de limite válido', 'Pré-condição'],
        correctIndex: 1,
        explanation:
          'Isso é um Defeito. O valor 17 pertence à classe de equivalência inválida (< 18). O sistema deveria rejeitar esse valor, mas não o fez, revelando uma falha na validação do limite inferior.',
      },
    ],
    guidedPractice: {
      question:
        'Um sistema de desconto concede 20% se o cliente for VIP E a compra for acima de R$100. Para quais combinações de condições o desconto NÃO é concedido?',
      context: 'Selecione TODAS as combinações onde o desconto não deve ser aplicado:',
      options: [
        'VIP + compra R$150',
        'Não-VIP + compra R$150',
        'VIP + compra R$80',
        'Não-VIP + compra R$80',
      ],
      correctAnswers: [1, 2, 3],
      explanation:
        'O desconto só é concedido quando AMBAS as condições são verdadeiras: cliente VIP E compra > R$100. Portanto, sem desconto: Não-VIP (qualquer compra), VIP com compra ≤ R$100. A combinação VIP + R$150 é a única que concede desconto.',
    },
    independentPractice: {
      title: 'Projete Casos de Teste com Partição por Equivalência',
      scenario:
        'Um campo de formulário aceita o número de parcelas de um pagamento. Valores válidos: 1 a 12. Valores inválidos: 0 ou menor, 13 ou maior, e valores não-numéricos.',
      fields: [
        {
          key: 'classes',
          label: '1. Identifique as Classes de Equivalência',
          placeholder: 'Liste as classes válidas e inválidas identificadas...',
        },
        {
          key: 'testCases',
          label: '2. Casos de Teste (um por classe)',
          placeholder: 'Para cada classe, indique o valor representativo a ser testado...',
        },
        {
          key: 'expectedResult',
          label: '3. Resultado Esperado para cada caso',
          placeholder: 'O que o sistema deve fazer com cada valor de teste?',
        },
      ],
      sampleAnswer: {
        classes:
          'Classe Inválida 1: valores ≤ 0 (ex: 0, -1)\nClasse Válida: valores 1–12 (ex: 6)\nClasse Inválida 2: valores ≥ 13 (ex: 13)\nClasse Inválida 3: valores não-numéricos (ex: "abc")',
        testCases:
          'CT1: 0 (representante da classe inválida inferior)\nCT2: 6 (representante da classe válida)\nCT3: 13 (representante da classe inválida superior)\nCT4: "abc" (representante de entrada não-numérica)',
        expectedResult:
          'CT1: Sistema exibe erro "Número de parcelas inválido"\nCT2: Sistema aceita e calcula parcelas\nCT3: Sistema exibe erro "Máximo de 12 parcelas"\nCT4: Sistema exibe erro "Apenas números são aceitos"',
      },
    },
    finalAssessmentQuestions: [
      {
        id: 1,
        question: 'Na Partição por Equivalência, basta testar:',
        options: [
          'A) Todos os valores de cada partição',
          'B) Apenas os valores nos limites',
          'C) Um valor representativo de cada partição',
          'D) Apenas valores inválidos',
        ],
        correctIndex: 2,
        explanation:
          'Na Partição por Equivalência assume-se que todos os valores de uma classe se comportam da mesma forma, por isso basta testar um representante de cada classe.',
      },
      {
        id: 2,
        question: 'Uma Tabela de Decisão é especialmente útil quando:',
        options: [
          'A) O sistema tem apenas uma condição de entrada',
          'B) O resultado depende de múltiplas condições combinadas',
          'C) O sistema usa somente dados numéricos',
          'D) O teste de regressão está sendo planejado',
        ],
        correctIndex: 1,
        explanation:
          'Tabelas de Decisão são ideais quando o comportamento do sistema depende da combinação de múltiplas condições — cada coluna representa uma regra única.',
      },
      {
        id: 3,
        question: 'O que é um "estado" no contexto do Teste de Transição de Estados?',
        options: [
          'A) Um valor de entrada inválido',
          'B) Uma condição em que o sistema se encontra em um dado momento',
          'C) O resultado esperado de um caso de teste',
          'D) Uma classe de equivalência',
        ],
        correctIndex: 1,
        explanation:
          'Um estado é uma condição ou situação do sistema em um determinado momento. O sistema muda de estado em resposta a eventos, e o teste verifica se essas transições ocorrem corretamente.',
      },
      {
        id: 4,
        question: 'Para um campo que aceita idades entre 18 e 65, a Análise de Valor Limite testaria:',
        options: [
          'A) Apenas os valores 18 e 65',
          'B) Os valores 17, 18, 65 e 66',
          'C) Todos os valores de 18 a 65',
          'D) Apenas valores inválidos abaixo de 18',
        ],
        correctIndex: 1,
        explanation:
          'A AVL testa os valores logo abaixo do limite inferior (17), no limite inferior (18), no limite superior (65) e logo acima do limite superior (66) — os quatro pontos de fronteira.',
      },
    ],
    challenge: {
      title: 'Desafio: Tabela de Decisão',
      scenario:
        'Um sistema de e-commerce aplica descontos seguindo estas regras: clientes VIP com compra acima de R$200 recebem 25% de desconto; clientes VIP com compra até R$200 recebem 10%; clientes não-VIP com compra acima de R$200 recebem 5%; demais não recebem desconto. Um testador reporta que clientes não-VIP com compra de R$250 estão recebendo 25% de desconto.',
      tasks: [
        'Identifique qual regra da tabela de decisão está sendo violada',
        'Classifique a severidade do defeito',
        'Escreva o relatório de bug completo',
      ],
      fields: [
        {
          key: 'defectDescription',
          label: 'Defeito Identificado',
          type: 'textarea',
          placeholder: 'Descreva qual regra está sendo violada...',
        },
        {
          key: 'severity',
          label: 'Nível de Severidade',
          type: 'select',
          options: ['-- Selecione --', 'Baixa', 'Média', 'Alta', 'Crítica'],
        },
        {
          key: 'bugTitle',
          label: 'Título do Bug',
          type: 'text',
          placeholder: 'Título curto e descritivo...',
        },
        {
          key: 'steps',
          label: 'Passos para Reproduzir',
          type: 'textarea',
          placeholder: '1. \n2. \n3. ',
        },
        {
          key: 'expected',
          label: 'Resultado Esperado',
          type: 'textarea',
          placeholder: 'Qual deveria ser o desconto correto?',
        },
        {
          key: 'actual',
          label: 'Resultado Atual',
          type: 'textarea',
          placeholder: 'Qual desconto está sendo aplicado incorretamente?',
        },
      ],
      expectedReport: {
        title: 'Cliente não-VIP recebe desconto de 25% incorretamente',
        steps:
          '1. Acessar o sistema com uma conta não-VIP\n2. Adicionar produto de R$250 ao carrinho\n3. Finalizar compra e verificar o desconto aplicado',
        expected: 'Sistema aplica 5% de desconto (regra: não-VIP + compra > R$200)',
        actual: 'Sistema aplica 25% de desconto (regra incorreta: VIP + compra > R$200)',
        severity: 'Alta',
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════
     UNIDADE 3 – Tipos e Níveis de Teste
  ══════════════════════════════════════════════════════════════ */
  {
    id: 3,
    title: 'Unidade 3',
    subtitle: 'Tipos e Níveis de Teste',
    description:
      'Entenda os diferentes níveis de teste (unidade, integração, sistema, aceitação) e quando aplicar cada tipo para garantir cobertura completa.',
    icon: '🐞',
    objectives: [
      'Distinguir teste de unidade, integração, sistema e aceitação',
      'Identificar o escopo e objetivo de cada nível de teste',
      'Reconhecer os tipos de teste: funcional, não-funcional, regressão e smoke',
      'Aplicar o conceito de pirâmide de testes para planejar estratégias',
      'Identificar quando cada tipo de teste é mais adequado',
    ],
    priorKnowledgeQuestions: [
      {
        id: 1,
        question: 'O teste de unidade verifica:',
        options: [
          'A) O sistema completo com dados reais de produção',
          'B) Componentes individuais em isolamento (funções, métodos, classes)',
          'C) A experiência do usuário final na interface',
        ],
        correctIndex: 1,
        explanation:
          'O teste de unidade verifica as menores unidades testáveis do sistema (funções, métodos, classes) de forma isolada, sem depender de outros componentes.',
      },
      {
        id: 2,
        question: 'O teste de integração verifica:',
        options: [
          'A) Componentes individuais em isolamento',
          'B) A interface do usuário',
          'C) A interação e comunicação entre módulos ou serviços',
        ],
        correctIndex: 2,
        explanation:
          'O teste de integração verifica se módulos ou serviços funcionam corretamente em conjunto — foca na comunicação e troca de dados entre componentes.',
      },
      {
        id: 3,
        question: 'O teste de aceitação é tipicamente realizado por:',
        options: [
          'A) Apenas pelos desenvolvedores do sistema',
          'B) Usuários finais ou clientes para validar requisitos de negócio',
          'C) Ferramentas automatizadas sem intervenção humana',
        ],
        correctIndex: 1,
        explanation:
          'O teste de aceitação (UAT) é conduzido por usuários finais ou representantes do cliente para validar se o sistema atende aos requisitos de negócio antes da entrega.',
      },
    ],
    content: [
      {
        title: 'A Pirâmide de Testes',
        icon: '🔺',
        body: 'A Pirâmide de Testes é um modelo que orienta a distribuição ideal dos tipos de teste:\n\n• Base (maior): Testes de Unidade — rápidos, baratos, em grande quantidade\n• Meio: Testes de Integração — verificam a comunicação entre componentes\n• Topo (menor): Testes de Sistema/E2E — lentos, caros, em menor quantidade\n\nPrincípio: quanto mais alto na pirâmide, mais lento e caro o teste. Inverta a pirâmide e seus custos de manutenção explodem.',
      },
      {
        title: 'Níveis de Teste',
        icon: '📋',
        body: 'Os quatro níveis principais de teste:\n\n• Teste de Unidade: verifica funções/métodos individuais. Ex: testar a função calcularDesconto()\n• Teste de Integração: verifica módulos juntos. Ex: testar API + banco de dados\n• Teste de Sistema: verifica o sistema completo. Ex: fluxo de compra completo\n• Teste de Aceitação (UAT): valida com o usuário final. Ex: homologação do cliente\n\nCada nível tem objetivo, escopo e responsável diferente.',
      },
      {
        title: 'Tipos de Teste',
        icon: '🏷️',
        body: 'Além dos níveis, existem tipos de teste por objetivo:\n\n• Funcional: verifica se o sistema faz o que deve fazer\n• Não-Funcional: verifica como o sistema se comporta (performance, segurança, usabilidade)\n• Regressão: verifica que mudanças não quebraram funcionalidades existentes\n• Smoke Test: verificação rápida da build — o sistema "liga"?\n• Exploratório: teste sem roteiro, usando intuição e experiência\n\nBoas estratégias combinam múltiplos tipos.',
      },
      {
        title: 'Teste Funcional vs. Não-Funcional',
        icon: '⚙️',
        body: 'Distinção importante:\n\nFuncional — O QUÊ o sistema faz:\n• "O sistema calcula corretamente o total?"\n• "O login funciona com credenciais válidas?"\n\nNão-Funcional — COMO o sistema se comporta:\n• Performance: "O sistema responde em menos de 2 segundos?"\n• Segurança: "O sistema é vulnerável a SQL injection?"\n• Usabilidade: "Novos usuários conseguem navegar sem ajuda?"\n\nAmbos são essenciais para um software de qualidade.',
      },
    ],
    examples: [
      {
        id: 1,
        scenario:
          'Uma equipe lança uma nova versão do sistema com correções de bugs. Após a implantação, funcionalidades que antes funcionavam corretamente — como o envio de e-mail de confirmação — param de funcionar.',
        task: 'Que tipo de teste teria detectado esse problema antes da implantação?',
        options: ['Teste de Unidade', 'Teste de Regressão', 'Smoke Test', 'Teste de Aceitação'],
        correctIndex: 1,
        explanation:
          'O Teste de Regressão verifica que alterações no código não quebraram funcionalidades existentes. Deve ser executado após cada mudança significativa para detectar exatamente esse tipo de problema.',
      },
    ],
    guidedPractice: {
      question:
        'Uma equipe de desenvolvimento está testando um sistema de pagamento. Quais dos itens abaixo são exemplos de testes NÃO-FUNCIONAIS?',
      context: 'Selecione TODOS os testes não-funcionais:',
      options: [
        'Verificar se o cálculo do juros está correto',
        'Verificar se o sistema suporta 1000 usuários simultâneos',
        'Verificar se o login funciona com senha correta',
        'Verificar se os dados do cartão são criptografados',
        'Verificar se o sistema responde em menos de 3 segundos',
      ],
      correctAnswers: [1, 3, 4],
      explanation:
        'Testes não-funcionais verificam COMO o sistema se comporta: carga/performance (1000 usuários simultâneos, tempo de resposta) e segurança (criptografia de dados). Verificar se o cálculo está correto e se o login funciona são testes FUNCIONAIS — verificam O QUÊ o sistema faz.',
    },
    independentPractice: {
      title: 'Classifique os Testes por Nível',
      scenario:
        'Você recebe uma lista de atividades de teste para um sistema de biblioteca digital (empréstimo e devolução de livros). Classifique cada atividade pelo nível de teste adequado.',
      fields: [
        {
          key: 'unitTest',
          label: '1. Exemplo de Teste de UNIDADE para esse sistema',
          placeholder: 'Descreva um teste que verifica uma função/método isolado...',
        },
        {
          key: 'integrationTest',
          label: '2. Exemplo de Teste de INTEGRAÇÃO',
          placeholder: 'Descreva um teste que verifica comunicação entre módulos...',
        },
        {
          key: 'systemTest',
          label: '3. Exemplo de Teste de SISTEMA (E2E)',
          placeholder: 'Descreva um fluxo completo do ponto de vista do usuário...',
        },
      ],
      sampleAnswer: {
        unitTest:
          'Testar a função calcularMulta(diasAtraso) isoladamente — verificar se retorna o valor correto para diferentes quantidades de dias de atraso, sem envolver banco de dados ou interface.',
        integrationTest:
          'Testar se o módulo de empréstimo grava corretamente a data de devolução no banco de dados ao registrar um novo empréstimo — verificando a integração entre a lógica de negócio e a camada de persistência.',
        systemTest:
          'Testar o fluxo completo: usuário faz login → pesquisa livro → solicita empréstimo → sistema registra empréstimo → sistema envia e-mail de confirmação → usuário devolve o livro → sistema registra devolução e envia recibo.',
      },
    },
    finalAssessmentQuestions: [
      {
        id: 1,
        question: 'Qual nível de teste verifica a comunicação entre módulos ou serviços?',
        options: [
          'A) Teste de Unidade',
          'B) Teste de Integração',
          'C) Teste de Aceitação',
          'D) Smoke Test',
        ],
        correctIndex: 1,
        explanation:
          'O Teste de Integração verifica que módulos ou componentes diferentes funcionam corretamente em conjunto, focando nas interfaces e comunicação entre eles.',
      },
      {
        id: 2,
        question: 'O que é um "Smoke Test"?',
        options: [
          'A) Teste exaustivo de todas as funcionalidades do sistema',
          'B) Verificação rápida e superficial para saber se a build básica funciona',
          'C) Teste de performance com alta carga de usuários',
          'D) Teste realizado exclusivamente em ambientes de produção',
        ],
        correctIndex: 1,
        explanation:
          'O Smoke Test é uma verificação rápida e superficial executada logo após uma nova build — verifica se as funcionalidades críticas básicas funcionam antes de investir em testes mais profundos.',
      },
      {
        id: 3,
        question: 'Segundo a Pirâmide de Testes, qual tipo deve existir em MAIOR quantidade?',
        options: [
          'A) Testes de Sistema (E2E)',
          'B) Testes de Integração',
          'C) Testes de Unidade',
          'D) Testes de Aceitação',
        ],
        correctIndex: 2,
        explanation:
          'A base da pirâmide são os Testes de Unidade — são os mais rápidos, baratos e devem existir em grande quantidade. Subindo na pirâmide, os testes se tornam mais lentos e caros.',
      },
      {
        id: 4,
        question: 'Verificar se o sistema consegue lidar com 5.000 usuários simultâneos é um exemplo de teste:',
        options: [
          'A) Funcional',
          'B) De Unidade',
          'C) De Regressão',
          'D) Não-Funcional (Performance/Carga)',
        ],
        correctIndex: 3,
        explanation:
          'Testes de carga e performance são testes não-funcionais — avaliam COMO o sistema se comporta sob condições específicas, não O QUÊ ele faz funcionalmente.',
      },
    ],
    challenge: {
      title: 'Desafio: Estratégia de Testes',
      scenario:
        'Após uma atualização do módulo de pagamento de um e-commerce, o sistema passa a cobrar o valor integral em compras que deveriam ter 10% de desconto para clientes cadastrados há mais de 1 ano. O bug só foi descoberto pelos clientes em produção.',
      tasks: [
        'Identifique qual tipo/nível de teste deveria ter detectado esse problema',
        'Classifique a severidade do defeito',
        'Escreva o relatório de bug completo',
      ],
      fields: [
        {
          key: 'defectDescription',
          label: 'Defeito Identificado + Tipo de Teste que deveria ter detectado',
          type: 'textarea',
          placeholder: 'Descreva o defeito e qual tipo de teste teria detectado...',
        },
        {
          key: 'severity',
          label: 'Nível de Severidade',
          type: 'select',
          options: ['-- Selecione --', 'Baixa', 'Média', 'Alta', 'Crítica'],
        },
        {
          key: 'bugTitle',
          label: 'Título do Bug',
          type: 'text',
          placeholder: 'Título curto e descritivo...',
        },
        {
          key: 'steps',
          label: 'Passos para Reproduzir',
          type: 'textarea',
          placeholder: '1. \n2. \n3. ',
        },
        {
          key: 'expected',
          label: 'Resultado Esperado',
          type: 'textarea',
          placeholder: 'Qual deveria ser o valor cobrado?',
        },
        {
          key: 'actual',
          label: 'Resultado Atual',
          type: 'textarea',
          placeholder: 'Qual valor está sendo cobrado incorretamente?',
        },
      ],
      expectedReport: {
        title: 'Desconto de fidelidade não é aplicado no pagamento',
        steps:
          '1. Fazer login com conta cadastrada há mais de 1 ano\n2. Adicionar produto ao carrinho\n3. Finalizar compra e verificar o valor cobrado',
        expected: 'Sistema aplica 10% de desconto de fidelidade no total da compra',
        actual: 'Sistema cobra o valor integral sem aplicar o desconto de fidelidade',
        severity: 'Alta',
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════
     UNIDADE 4 – Gestão de Defeitos
  ══════════════════════════════════════════════════════════════ */
  {
    id: 4,
    title: 'Unidade 4',
    subtitle: 'Gestão de Defeitos',
    description:
      'Aprenda o ciclo de vida de um defeito, como classificar severidade e prioridade, e como escrever relatórios de bug profissionais e acionáveis.',
    icon: '🐞',
    objectives: [
      'Descrever o ciclo de vida completo de um defeito',
      'Distinguir severidade de prioridade de um defeito',
      'Escrever relatórios de bug claros, completos e acionáveis',
      'Usar métricas de defeitos para avaliar qualidade do projeto',
      'Identificar as causas raiz mais comuns de defeitos de software',
    ],
    priorKnowledgeQuestions: [
      {
        id: 1,
        question: 'A "prioridade" de um defeito refere-se a:',
        options: [
          'A) Ao impacto técnico do defeito no funcionamento do sistema',
          'B) À urgência com que o defeito deve ser corrigido (perspectiva de negócio)',
          'C) À quantidade de usuários afetados pelo defeito',
        ],
        correctIndex: 1,
        explanation:
          'Prioridade é uma decisão de negócio — indica com que urgência o defeito deve ser corrigido. Um bug cosmético em uma tela de marketing pode ter ALTA prioridade próximo ao lançamento, mesmo com baixa severidade técnica.',
      },
      {
        id: 2,
        question: 'Um defeito de severidade "Crítica" é aquele que:',
        options: [
          'A) Causa apenas um problema cosmético na interface',
          'B) Impede completamente o uso de uma funcionalidade essencial do sistema',
          'C) Foi encontrado em ambiente de desenvolvimento',
        ],
        correctIndex: 1,
        explanation:
          'Severidade Crítica significa que o defeito causa impacto máximo — o sistema falha, trava, perde dados ou torna a funcionalidade principal completamente inutilizável. Não há workaround.',
      },
      {
        id: 3,
        question: 'O ciclo de vida típico de um defeito inclui qual sequência?',
        options: [
          'A) Aberto → Em desenvolvimento → Fechado → Reabertura',
          'B) Novo → Confirmado → Em correção → Verificado → Fechado',
          'C) Detectado → Ignorado → Corrigido → Fechado',
        ],
        correctIndex: 1,
        explanation:
          'O ciclo completo: Novo (reportado) → Confirmado (reproduzido) → Em correção (desenvolvedor trabalhando) → Verificado (testador confirma a correção) → Fechado (encerrado). Pode retornar a "Novo" se a correção falhar.',
      },
    ],
    content: [
      {
        title: 'Ciclo de Vida de um Defeito',
        icon: '🔄',
        body: 'Todo defeito passa por um conjunto de estados desde sua descoberta até seu encerramento:\n\n1. Novo: defeito recém reportado pelo testador\n2. Atribuído: defeito direcionado a um desenvolvedor\n3. Em Correção: desenvolvedor trabalhando na correção\n4. Corrigido: desenvolvedor conclui a correção e notifica\n5. Em Verificação: testador testa a correção\n6. Fechado: testador confirma que está resolvido\n7. Reaberto: correção falhou, ciclo recomeça\n\nRastrear o ciclo ajuda a medir eficiência da equipe e qualidade do processo.',
      },
      {
        title: 'Severidade vs. Prioridade',
        icon: '⚡',
        body: 'São dimensões diferentes de um defeito:\n\nSeveridade (técnica) — impacto no funcionamento:\n• Crítica: sistema parado, perda de dados\n• Alta: funcionalidade principal bloqueada\n• Média: funcionalidade parcialmente afetada\n• Baixa: problema cosmético ou estético\n\nPrioridade (negócio) — urgência da correção:\n• Alta: deve ser corrigido imediatamente\n• Média: próximo sprint\n• Baixa: quando houver tempo\n\nExemplo paradoxal: bug cosmético no logotipo na véspera de um lançamento → Baixa severidade, ALTA prioridade.',
      },
      {
        title: 'Escrevendo Relatórios de Bug Eficazes',
        icon: '📝',
        body: 'Um bom relatório de bug deve ser REPRODUZÍVEL e ACIONÁVEL. Campos essenciais:\n\n• Título: descritivo e conciso ("Login falha com e-mail válido" — não "Bug no login")\n• Ambiente: versão do sistema, OS, browser\n• Pré-condições: o que deve ser verdade antes\n• Passos para reproduzir: numerados e precisos\n• Resultado Esperado: o que deveria acontecer\n• Resultado Atual: o que realmente aconteceu\n• Severidade e Prioridade\n• Evidências: screenshots, logs, vídeos\n\nRegra de ouro: se o desenvolvedor não consegue reproduzir, o bug não existe para ele.',
      },
      {
        title: 'Métricas de Qualidade',
        icon: '📊',
        body: 'Métricas importantes para acompanhar a gestão de defeitos:\n\n• Densidade de Defeitos: número de defeitos por KLOC (mil linhas de código)\n• Taxa de Escape: defeitos encontrados em produção / total de defeitos\n• Tempo Médio de Correção: tempo entre abertura e fechamento\n• Custo de Correção por Fase: defeitos em produção custam 100× mais que em requisitos\n• Taxa de Reabertura: indica qualidade das correções\n\nMonitorar métricas ajuda a identificar áreas problemáticas e melhorar o processo.',
      },
    ],
    examples: [
      {
        id: 1,
        scenario:
          'Um testador abre um bug com o título "Sistema com problema". Os passos descritos são: "1. Abrir o sistema. 2. Usar o sistema. 3. Erro acontece." Não há screenshot nem informação de ambiente.',
        task: 'Como esse relatório de bug deve ser classificado?',
        options: [
          'Relatório excelente',
          'Relatório inadequado/incompleto',
          'Relatório de alta severidade',
          'Relatório de aceite',
        ],
        correctIndex: 1,
        explanation:
          'É um relatório inadequado. Não tem título descritivo, os passos não são reproduzíveis, não há resultado esperado vs. atual, sem evidências nem informações de ambiente. Um desenvolvedor não conseguiria reproduzir nem corrigir o defeito com essas informações.',
      },
    ],
    guidedPractice: {
      question:
        'Um testador descobre que o botão "Exportar PDF" na tela de relatórios não funciona há 2 meses. Essa funcionalidade é utilizada por apenas 5% dos usuários, mas esses usuários são grandes clientes corporativos. Como classificar esse defeito?',
      context: 'Selecione as classificações CORRETAS para Severidade e Prioridade:',
      options: [
        'Severidade: Baixa (funcionalidade secundária)',
        'Severidade: Alta (funcionalidade completamente bloqueada)',
        'Prioridade: Baixa (poucos usuários afetados)',
        'Prioridade: Alta (clientes estratégicos afetados)',
      ],
      correctAnswers: [1, 3],
      explanation:
        'Severidade ALTA: a funcionalidade de exportar PDF está completamente bloqueada — sem workaround. Prioridade ALTA: os 5% afetados são grandes clientes corporativos (alto impacto no negócio). Esse é um exemplo clássico de alta severidade técnica E alta prioridade de negócio.',
    },
    independentPractice: {
      title: 'Escreva um Relatório de Bug Completo',
      scenario:
        'Ao testar um sistema de e-commerce, você descobre que ao adicionar um produto ao carrinho e alterar a quantidade para 0, o produto permanece no carrinho com quantidade 0 e o total é calculado incorretamente (mostra R$0,00 no subtotal mas o pedido é enviado com o item).',
      fields: [
        {
          key: 'title',
          label: '1. Título do Bug',
          placeholder: 'Escreva um título descritivo e conciso...',
        },
        {
          key: 'steps',
          label: '2. Passos para Reproduzir',
          placeholder: '1. \n2. \n3. \n4. ',
        },
        {
          key: 'expectedResult',
          label: '3. Resultado Esperado',
          placeholder: 'O que o sistema deveria fazer com quantidade 0?',
        },
      ],
      sampleAnswer: {
        title: 'Produto com quantidade 0 permanece no carrinho e gera pedido com valor incorreto',
        steps:
          '1. Acessar o sistema e fazer login\n2. Adicionar qualquer produto ao carrinho\n3. Na tela do carrinho, alterar a quantidade do produto para 0\n4. Clicar em "Finalizar Compra"\n5. Verificar o pedido gerado',
        expectedResult:
          'Ao alterar a quantidade para 0, o produto deve ser automaticamente removido do carrinho OU o sistema deve exibir mensagem de erro impedindo a quantidade 0. O pedido não deve ser gerado com item de quantidade 0.',
      },
    },
    finalAssessmentQuestions: [
      {
        id: 1,
        question:
          'Um bug cosmético (cor errada de um botão) que está na tela principal do sistema, visível para todos os usuários, no dia do lançamento do produto. Qual classificação é mais adequada?',
        options: [
          'A) Severidade Alta, Prioridade Baixa',
          'B) Severidade Baixa, Prioridade Alta',
          'C) Severidade Alta, Prioridade Alta',
          'D) Severidade Baixa, Prioridade Baixa',
        ],
        correctIndex: 1,
        explanation:
          'O impacto técnico é baixo (apenas visual) → Severidade Baixa. Mas no dia do lançamento, visível para todos → Prioridade Alta (urgência de negócio). Esse é o exemplo clássico de baixa severidade com alta prioridade.',
      },
      {
        id: 2,
        question: "O estado 'Reaberto' no ciclo de vida de um defeito significa:",
        options: [
          'A) O defeito foi encontrado novamente em outro módulo',
          'B) A correção aplicada não resolveu o problema; o defeito voltou ao ciclo',
          'C) O defeito foi promovido para maior severidade',
          'D) O testador confirmou que o defeito foi corrigido',
        ],
        correctIndex: 1,
        explanation:
          "'Reaberto' indica que o testador verificou a correção mas o defeito ainda existe — a correção falhou ou foi incompleta. O ciclo recomeça a partir da etapa de desenvolvimento.",
      },
      {
        id: 3,
        question: 'Qual campo do relatório de bug é mais crítico para que o desenvolvedor possa reproduzir o problema?',
        options: [
          'A) Data de criação do bug',
          'B) Nome do testador',
          'C) Passos detalhados para reproduzir',
          'D) Número de ID do bug',
        ],
        correctIndex: 2,
        explanation:
          'Os passos para reproduzir são o campo mais crítico — sem eles, o desenvolvedor não consegue reproduzir o problema e, portanto, não consegue corrigi-lo. Um bug não reproduzível praticamente não existe para a equipe de desenvolvimento.',
      },
      {
        id: 4,
        question: 'O "custo de correção por fase" indica que defeitos encontrados em produção custam:',
        options: [
          'A) O mesmo que defeitos encontrados em requisitos',
          'B) Menos, pois o sistema já está desenvolvido',
          'C) Significativamente mais do que defeitos encontrados em fases iniciais',
          'D) Menos, pois os desenvolvedores já conhecem o sistema',
        ],
        correctIndex: 2,
        explanation:
          'Estudos mostram que defeitos em produção custam até 100× mais do que os mesmos defeitos detectados na fase de requisitos. Isso reforça a importância de testar cedo e frequentemente (shift-left testing).',
      },
    ],
    challenge: {
      title: 'Desafio: Relatório de Bug Profissional',
      scenario:
        'Durante testes do sistema bancário, você descobre que ao realizar uma transferência entre contas, se o usuário clica no botão "Confirmar" duas vezes rapidamente, o valor é debitado duas vezes da conta de origem mas creditado apenas uma vez na conta de destino. O sistema não exibe erro e não detecta a duplicata.',
      tasks: [
        'Identifique e descreva o defeito técnico encontrado',
        'Classifique a severidade e justifique',
        'Escreva um relatório de bug completo e profissional',
      ],
      fields: [
        {
          key: 'defectDescription',
          label: 'Defeito Identificado',
          type: 'textarea',
          placeholder: 'Descreva o defeito técnico com precisão...',
        },
        {
          key: 'severity',
          label: 'Nível de Severidade',
          type: 'select',
          options: ['-- Selecione --', 'Baixa', 'Média', 'Alta', 'Crítica'],
        },
        {
          key: 'bugTitle',
          label: 'Título do Bug',
          type: 'text',
          placeholder: 'Título descritivo e conciso...',
        },
        {
          key: 'steps',
          label: 'Passos para Reproduzir',
          type: 'textarea',
          placeholder: '1. \n2. \n3. ',
        },
        {
          key: 'expected',
          label: 'Resultado Esperado',
          type: 'textarea',
          placeholder: 'O que deveria acontecer?',
        },
        {
          key: 'actual',
          label: 'Resultado Atual',
          type: 'textarea',
          placeholder: 'O que aconteceu de fato?',
        },
      ],
      expectedReport: {
        title: 'Duplo clique em Confirmar realiza transferência em duplicata',
        steps:
          '1. Fazer login com conta que possui saldo\n2. Iniciar uma transferência para outra conta\n3. Preencher os dados e clicar em "Confirmar" duas vezes rapidamente\n4. Verificar o extrato da conta de origem e da conta de destino',
        expected:
          'Sistema processa apenas uma transferência; duplo clique é ignorado ou exibe mensagem "Operação em andamento"',
        actual:
          'O valor é debitado duas vezes da conta de origem mas creditado apenas uma vez na conta de destino; o sistema não exibe erro',
        severity: 'Crítica',
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════
     UNIDADE 5 – Automação de Testes
  ══════════════════════════════════════════════════════════════ */
  {
    id: 5,
    title: 'Unidade 5',
    subtitle: 'Automação de Testes',
    description:
      'Descubra quando e como automatizar testes de software, conheça as principais ferramentas e entenda o ROI da automação em projetos reais.',
    icon: '🐞',
    objectives: [
      'Identificar quando a automação de testes é vantajosa',
      'Descrever os principais tipos de automação (unidade, API, UI)',
      'Reconhecer as ferramentas mais usadas no mercado',
      'Calcular o retorno sobre investimento (ROI) da automação',
      'Identificar armadilhas e falhas comuns em projetos de automação',
    ],
    priorKnowledgeQuestions: [
      {
        id: 1,
        question: 'A automação de testes é mais recomendada para:',
        options: [
          'A) Testes executados uma única vez e cenários de exploração',
          'B) Testes repetitivos, de regressão e com grande volume de dados',
          'C) Substituir completamente os testadores manuais',
        ],
        correctIndex: 1,
        explanation:
          'Automação brilha em testes repetitivos (executados a cada build), regressão (verificar que nada quebrou) e cenários com grande volume de dados. Testes exploratórios e de usabilidade ainda precisam de humanos.',
      },
      {
        id: 2,
        question: 'Uma desvantagem da automação de testes é:',
        options: [
          'A) Testes automatizados são mais lentos que manuais',
          'B) Automação elimina completamente a necessidade de testes manuais',
          'C) Alto custo e tempo iniciais de implementação e manutenção dos scripts',
        ],
        correctIndex: 2,
        explanation:
          'Automação exige investimento inicial significativo (tempo para criar scripts, ferramentas, infraestrutura) e custo contínuo de manutenção quando o sistema muda. O ROI positivo demora meses para aparecer.',
      },
      {
        id: 3,
        question: 'TDD (Test-Driven Development) significa:',
        options: [
          'A) Testar o código depois que toda a funcionalidade está pronta',
          'B) Desenvolver orientado a testes — escrever o teste antes do código de produção',
          'C) Usar apenas testes automatizados de interface gráfica',
        ],
        correctIndex: 1,
        explanation:
          'No TDD, o desenvolvedor escreve primeiro o teste (que falha), depois escreve o código mínimo para o teste passar, e então refatora. O ciclo é: Red → Green → Refactor.',
      },
    ],
    content: [
      {
        title: 'Quando Automatizar?',
        icon: '🤖',
        body: 'Nem todo teste deve ser automatizado. Critérios para automatizar:\n\nBom candidato à automação:\n• Testes executados com muita frequência (a cada commit/build)\n• Testes de regressão com grande cobertura\n• Testes com muitas variações de dados\n• Cenários críticos e de alta severidade\n\nMau candidato à automação:\n• Teste executado apenas uma vez\n• Interface gráfica que muda com frequência\n• Testes exploratórios e de usabilidade\n• Funcionalidades em constante mudança\n\nRegra prática: se um teste será executado menos de 10 vezes, provavelmente não compensa automatizar.',
      },
      {
        title: 'Tipos de Automação',
        icon: '🏗️',
        body: 'Automação pode ocorrer em diferentes camadas:\n\n• Testes de Unidade Automatizados: JUnit, Jest, PyTest — testam funções isoladas. Mais rápidos e baratos de manter.\n\n• Testes de API Automatizados: Postman/Newman, REST-assured — testam endpoints sem interface. Rápidos e estáveis.\n\n• Testes de UI Automatizados: Selenium, Playwright, Cypress — simulam interação do usuário. Mais lentos e frágeis.\n\n• Testes de Performance: JMeter, k6 — simulam carga de usuários. Essenciais para sistemas de alto acesso.\n\nA pirâmide de automação segue a mesma lógica da pirâmide de testes: mais automação de unidade, menos de UI.',
      },
      {
        title: 'Ferramentas Populares',
        icon: '🔧',
        body: 'Principais ferramentas do mercado por categoria:\n\nTestes de Unidade:\n• Java: JUnit, TestNG\n• JavaScript: Jest, Mocha\n• Python: PyTest, unittest\n\nTestes de UI/E2E:\n• Selenium WebDriver (clássico, multiplataforma)\n• Cypress (moderno, JavaScript)\n• Playwright (Microsoft, multi-browser)\n\nTestes de API:\n• Postman/Newman\n• REST-assured (Java)\n• SuperTest (Node.js)\n\nTestes de Performance:\n• Apache JMeter\n• k6 (Go/JavaScript)\n• Locust (Python)\n\nEscolha com base na tecnologia do projeto e na habilidade da equipe.',
      },
      {
        title: 'ROI da Automação',
        icon: '💰',
        body: 'Calcular o Retorno sobre Investimento (ROI) da automação:\n\nFórmula simplificada:\nROI = (Tempo Manual Economizado × Custo/hora) − Custo de Criação − Custo de Manutenção\n\nExemplo:\n• 50 casos de teste, cada um leva 10 min manual\n• Executados diariamente por 6 meses (≈ 180 execuções)\n• Tempo manual: 50 × 10 × 180 = 90.000 min = 1.500h\n• A R$100/h: R$150.000 economizados\n• Custo de automação: R$30.000\n• ROI = R$120.000 de economia\n\nAtenção: a manutenção dos scripts pode consumir 20–30% do tempo da equipe à medida que o sistema evolui.',
      },
    ],
    examples: [
      {
        id: 1,
        scenario:
          'Uma equipe implementa automação de UI com Selenium para um formulário de cadastro que muda toda semana (novos campos, novos layouts). Os scripts quebram constantemente e a equipe gasta mais tempo corrigindo automação do que fazendo testes manuais.',
        task: 'Como essa situação deve ser classificada?',
        options: [
          'Uso correto da automação',
          'Automação frágil — candidato inadequado para automação de UI',
          'Problema de falta de treinamento na ferramenta',
          'Situação normal de automação de testes',
        ],
        correctIndex: 1,
        explanation:
          'Interfaces que mudam frequentemente são maus candidatos para automação de UI — os scripts ficam frágeis e o custo de manutenção supera os benefícios. Para cenários instáveis, testes manuais ou testes de API são mais adequados.',
      },
    ],
    guidedPractice: {
      question:
        'Uma equipe tem os seguintes cenários de teste para um sistema bancário. Quais são os MELHORES candidatos à automação?',
      context: 'Selecione TODOS os cenários que se beneficiariam de automação:',
      options: [
        'Teste de regressão do login (executado a cada build)',
        'Avaliação da experiência do usuário com novos usuários reais',
        'Teste de carga com 10.000 transações simultâneas',
        'Exploração de novos comportamentos após mudança de requisito',
        'Teste de cálculo de juros com 500 combinações de dados diferentes',
      ],
      correctAnswers: [0, 2, 4],
      explanation:
        'Bons candidatos à automação: (1) Teste de regressão frequente — executado a cada build; (3) Teste de carga — impossível fazer manualmente com 10.000 usuários; (5) Múltiplas combinações de dados — automação com data-driven testing é perfeita aqui. Avaliação de experiência do usuário e exploração de novos comportamentos requerem julgamento humano.',
    },
    independentPractice: {
      title: 'Planeje uma Estratégia de Automação',
      scenario:
        'Você é o QA Lead de um e-commerce de médio porte. O time executa 200 casos de teste manualmente a cada lançamento (quinzenal). Cada caso leva em média 8 minutos. O time tem 3 testadores e 1 desenvolvedor de automação disponível.',
      fields: [
        {
          key: 'candidates',
          label: '1. Quais casos de teste você priorizaria para automação?',
          placeholder: 'Descreva os critérios e exemplos de casos prioritários...',
        },
        {
          key: 'tools',
          label: '2. Quais ferramentas você usaria e por quê?',
          placeholder: 'Justifique a escolha das ferramentas para o contexto...',
        },
        {
          key: 'roi',
          label: '3. Como você mediria o sucesso da automação?',
          placeholder: 'Que métricas e indicadores você acompanharia?',
        },
      ],
      sampleAnswer: {
        candidates:
          'Priorizaria: (1) Testes de regressão do fluxo de compra completo — executados a cada release, alto risco; (2) Testes de login e autenticação — executados a cada build; (3) Cálculos de preço e desconto — muitas combinações de dados; (4) APIs críticas de pagamento e estoque — estáveis e de alto impacto.',
        tools:
          'Para APIs: Postman/Newman — time já conhece e são estáveis. Para UI: Playwright — moderno, rápido e suporta múltiplos browsers. Para testes de unidade dos cálculos: Jest (se JavaScript) ou PyTest (se Python). Evitaria Selenium para UI instável.',
        roi:
          'Métricas: (1) Tempo de execução dos testes por sprint (antes vs. depois); (2) Número de defeitos encontrados por automação vs. manual; (3) Taxa de reabertura de bugs de regressão; (4) Cobertura de automação (% dos casos automatizados); (5) Custo de manutenção dos scripts por mês.',
      },
    },
    finalAssessmentQuestions: [
      {
        id: 1,
        question: 'Qual tipo de teste automatizado tende a ser o MAIS frágil e caro de manter?',
        options: [
          'A) Testes de unidade com Jest/JUnit',
          'B) Testes de API com Postman',
          'C) Testes de UI (interface gráfica) com Selenium/Cypress',
          'D) Testes de performance com JMeter',
        ],
        correctIndex: 2,
        explanation:
          'Testes de UI são os mais frágeis porque dependem da interface gráfica, que muda com frequência. Qualquer mudança no layout, ID de elemento ou fluxo pode quebrar dezenas de scripts simultaneamente.',
      },
      {
        id: 2,
        question: 'No ciclo TDD (Test-Driven Development), qual é a sequência correta?',
        options: [
          'A) Código de produção → Teste → Refatoração',
          'B) Teste (falha) → Código mínimo (passa) → Refatoração',
          'C) Refatoração → Teste → Código de produção',
          'D) Planejamento → Código → Teste → Deploy',
        ],
        correctIndex: 1,
        explanation:
          'O ciclo TDD é: Red (escrever teste que falha) → Green (escrever código mínimo para o teste passar) → Refactor (melhorar o código sem quebrar o teste). Repetido em ciclos curtos.',
      },
      {
        id: 3,
        question: 'O ROI da automação de testes tende a ser positivo quando:',
        options: [
          'A) O teste é executado apenas uma vez por projeto',
          'B) A interface do sistema muda com muita frequência',
          'C) O mesmo conjunto de testes é executado repetidamente ao longo do tempo',
          'D) A equipe não tem experiência com ferramentas de automação',
        ],
        correctIndex: 2,
        explanation:
          'O ROI da automação se acumula com a repetição — quanto mais vezes o mesmo teste é executado automaticamente, maior a economia de tempo manual. Para testes únicos, o custo de criação nunca é recuperado.',
      },
      {
        id: 4,
        question: 'Qual é a principal vantagem dos testes automatizados de API em comparação com testes de UI?',
        options: [
          'A) Testes de API são mais fáceis de entender por usuários não técnicos',
          'B) Testes de API são mais estáveis e rápidos pois não dependem da interface gráfica',
          'C) Testes de API detectam mais defeitos visuais',
          'D) Testes de API substituem completamente os testes de UI',
        ],
        correctIndex: 1,
        explanation:
          'Testes de API comunicam diretamente com o backend, sem passar pela interface gráfica. Isso os torna mais estáveis (menos sujeitos a mudanças visuais), mais rápidos (sem renderização) e mais fáceis de manter.',
      },
    ],
    challenge: {
      title: 'Desafio: Análise de Falha de Automação',
      scenario:
        'Uma equipe implementou automação de UI para um sistema de e-commerce há 6 meses. Atualmente, 60% dos scripts falham a cada execução não por defeitos no sistema, mas porque os seletores CSS e IDs dos elementos foram alterados durante redesigns frequentes da interface. A equipe gasta 3 dias por sprint apenas corrigindo scripts de automação.',
      tasks: [
        'Identifique o problema central na estratégia de automação da equipe',
        'Classifique a severidade do impacto no processo de qualidade',
        'Proponha um plano de melhoria e documente como um relatório de problema',
      ],
      fields: [
        {
          key: 'defectDescription',
          label: 'Problema Identificado na Estratégia de Automação',
          type: 'textarea',
          placeholder: 'Descreva o problema central e suas causas...',
        },
        {
          key: 'severity',
          label: 'Impacto no Processo (Severidade)',
          type: 'select',
          options: ['-- Selecione --', 'Baixa', 'Média', 'Alta', 'Crítica'],
        },
        {
          key: 'bugTitle',
          label: 'Título do Relatório de Problema',
          type: 'text',
          placeholder: 'Título que descreve o problema...',
        },
        {
          key: 'steps',
          label: 'Situação Atual (Contexto do Problema)',
          type: 'textarea',
          placeholder: 'Descreva a situação atual com dados...',
        },
        {
          key: 'expected',
          label: 'Situação Desejada',
          type: 'textarea',
          placeholder: 'Como deveria ser o processo de automação ideal?',
        },
        {
          key: 'actual',
          label: 'Plano de Melhoria Proposto',
          type: 'textarea',
          placeholder: 'Quais mudanças você implementaria?',
        },
      ],
      expectedReport: {
        title: 'Automação de UI frágil gera custo maior que benefício',
        steps:
          '60% dos scripts falham a cada execução por mudanças de seletores CSS/ID.\n3 dias por sprint são gastos corrigindo scripts em vez de testar.\nRedesigns frequentes da UI tornam os scripts instáveis.',
        expected:
          'Automação deve detectar defeitos reais, não gerar falsos negativos por fragilidade estrutural. Custo de manutenção deve ser menor que o benefício de tempo economizado.',
        actual:
          '1. Migrar testes de UI para Page Object Model (POM) com seletores robustos (data-testid)\n2. Priorizar automação de API em vez de UI para funcionalidades instáveis\n3. Reservar automação de UI apenas para fluxos críticos estáveis\n4. Implementar revisão de seletores como parte do processo de redesign',
        severity: 'Alta',
      },
    },
  },
];
