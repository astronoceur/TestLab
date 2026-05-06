import { Unit } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * UNIDADE 1 — Fundamentos de Teste de Software
 *
 * Conteudo fiel ao documento "TestLab_Unidade1_Fundamentos_de_Teste
 * _de_Software.pdf". Estrutura serve de molde para as proximas
 * unidades: basta criar unit2Data.ts seguindo o mesmo formato e
 * importar em data/units.ts.
 * ────────────────────────────────────────────────────────────────── */

export const unit1: Unit = {
  id: 1,
  title: 'Unidade 1',
  subtitle: 'Fundamentos de Teste de Software',
  description:
    'Compreenda por que o software falha, como erros se originam, o que diferencia defeitos de falhas e qual o papel do teste no ciclo de vida do desenvolvimento.',
  icon: '🐞',
  meta: {
    cargaHoraria: '6 horas',
    nivel: 'Introdutório',
    referencia: 'CTFL / ISTQB',
    abordagem: 'Eventos de Gagné',
  },
  objectives: [
    'Definir o conceito de qualidade de software e relacioná-lo com as expectativas dos usuários e com os requisitos do sistema.',
    'Explicar o que é teste de software e qual é a sua função no processo de desenvolvimento.',
    'Identificar os principais objetivos do teste de software, distinguindo detecção de defeitos de outros objetivos secundários.',
    'Diferenciar com precisão os conceitos de erro humano, defeito (bug) no código e falha observada no comportamento do sistema.',
    'Justificar a importância do teste em cada fase do ciclo de desenvolvimento de software, reconhecendo o custo crescente da correção tardia de problemas.',
  ],

  /* ─── 3. Situacao-problema inicial ─────────────────────────── */
  situationProblem: {
    title: 'O Sistema Acadêmico que Aprovou a Todos',
    paragraphs: [
      'Era véspera do encerramento do período letivo em uma universidade particular. A coordenação acadêmica havia acabado de implantar um novo sistema de gestão de notas, desenvolvido em apenas três meses por uma equipe reduzida. Os testes foram mínimos, feitos apenas pelos próprios desenvolvedores, sem critérios formais.',
      'Na manhã seguinte, estudantes com médias reprovatórias receberam e-mails automáticos de parabenização pela aprovação em todas as disciplinas. O sistema havia calculado incorretamente as médias ao tratar campos nulos como zero em vez de ignorar as disciplinas sem lançamento. O resultado: 847 estudantes com situação acadêmica incorreta, a necessidade de recálculo manual de todos os registros e uma crise de confiança institucional.',
    ],
    dialogues: [
      {
        speaker: 'Diretora acadêmica',
        text: 'O sistema foi testado pelos desenvolvedores antes de entrar em produção.',
      },
      {
        speaker: 'Líder da equipe de TI',
        text: 'Testamos que o sistema funcionava. Não testamos o que acontecia quando os dados não estavam completos.',
      },
    ],
    reflectionQuestions: [
      'O que diferencia "o sistema funcionar" de "o sistema funcionar corretamente"?',
      'Quem é responsável por garantir que um software se comporta bem em situações não previstas?',
      'Qual seria o custo de ter identificado esse problema antes da implantação?',
    ],
    conclusion:
      'Este cenário ilustra um problema real e recorrente no desenvolvimento de software: a confusão entre "o sistema executa" e "o sistema está correto". Ao longo desta unidade, você aprenderá os conceitos que permitem compreender e prevenir situações como essa.',
  },

  /* ─── 4. Ativacao de conhecimentos previos ─────────────────── */
  priorKnowledgeQuestions: [
    {
      id: 'PK-1',
      question:
        'Ao desenvolver um programa, um programador escreve a seguinte condição de forma equivocada: utiliza o operador de atribuição (=) onde deveria usar o operador de comparação (==). O programa compila sem erros, mas produz resultados errados em tempo de execução. Como você classificaria a situação descrita?',
      options: [
        'A) Uma falha, porque o usuário percebe o resultado incorreto.',
        'B) Um erro humano, porque foi o programador que escreveu o código de forma errada.',
        'C) Um defeito, porque o código compilou sem problemas.',
        'D) Uma exceção, porque o programa não encerrou com erro.',
      ],
      correctIndex: 1,
      explanation:
        'Correto! O engano do programador ao usar o operador errado é classificado como erro humano (ou simplesmente "erro"). Esse erro produz um defeito no código, que pode eventualmente causar uma falha percebida pelo usuário.',
      errorExplanation:
        'Revise a distinção entre erro, defeito e falha. O erro é a causa humana; o defeito é o problema no artefato produzido; e a falha é a manifestação observada em execução. Você estudará essa classificação no Bloco 4.',
    },
    {
      id: 'PK-2',
      question: 'Qual das afirmações abaixo melhor descreve o principal objetivo do teste de software?',
      options: [
        'A) Demonstrar que o software não possui defeitos.',
        'B) Garantir que o software foi desenvolvido dentro do prazo.',
        'C) Revelar defeitos no software para que possam ser corrigidos antes da entrega.',
        'D) Substituir a revisão de código e a análise de requisitos.',
      ],
      correctIndex: 2,
      explanation:
        'Excelente! O teste de software não pode provar que um sistema é livre de defeitos, mas é fundamental para revelar defeitos existentes. Essa distinção, originalmente estabelecida por Dijkstra e amplamente discutida por Myers, é um dos pilares conceituais da área.',
      errorExplanation:
        'Cuidado com a crença de que testes "provam" a ausência de erros. Isso é uma ideia comum, mas incorreta. Testes revelam a presença de defeitos, não a sua ausência. Esse conceito será aprofundado no Bloco 3.',
    },
    {
      id: 'PK-3',
      question:
        'Considere um sistema bancário em que a transferência entre contas funciona corretamente quando os valores são inteiros, mas arredonda incorretamente transações com centavos. Um usuário realiza uma transferência de R$ 150,75 e o sistema transfere R$ 150,00. Do ponto de vista do conceito de qualidade de software, como você avaliaria esse sistema?',
      options: [
        'A) O sistema é de alta qualidade, pois funciona para a maioria das operações.',
        'B) O sistema não atende ao requisito de corretude para todos os casos de entrada válidos, comprometendo sua qualidade.',
        'C) O sistema é de qualidade aceitável, pois a diferença é pequena.',
        'D) A qualidade do sistema depende exclusivamente da satisfação do usuário com a interface gráfica.',
      ],
      correctIndex: 1,
      explanation:
        'Muito bem! Qualidade de software envolve conformidade com requisitos e adequação ao uso esperado. Um sistema que produz resultados incorretos para entradas válidas não atende ao requisito de corretude, mesmo que funcione em outros casos.',
      errorExplanation:
        'Qualidade não é binária (funciona ou não funciona). Um sistema pode executar sem erros aparentes em muitos casos e ainda assim ter qualidade insatisfatória em situações específicas. Esse conceito é explorado no Bloco 1.',
    },
  ],

  /* ─── 5. Conteudo teorico (5 blocos) ───────────────────────── */
  theoryBlocks: [
    {
      id: 'bloco-1',
      number: 1,
      title: 'Qualidade de Software',
      icon: '⭐',
      explanation: [
        'A noção de qualidade é intuitivamente compreensível: todos sabemos quando um produto é bom ou ruim. No entanto, aplicar esse conceito de forma rigorosa ao software exige uma definição mais precisa. Qualidade de software pode ser compreendida como o grau em que um sistema satisfaz os requisitos especificados e as necessidades implícitas dos usuários, comportando-se de forma confiável, segura e eficiente nas condições de uso previstas.',
        'Sommerville destaca que a qualidade de software não pode ser avaliada por um único atributo. Ela é multidimensional e envolve aspectos como corretude (o sistema faz o que deveria fazer?), confiabilidade (o sistema falha com que frequência?), eficiência (o sistema utiliza os recursos de forma adequada?), usabilidade (o usuário consegue operar o sistema sem dificuldade?) e manutenibilidade (o sistema pode ser evoluído com razoável esforço?).',
        'É importante distinguir dois conceitos correlatos: qualidade de produto e qualidade de processo. A qualidade do produto diz respeito ao software em si, isto é, ao artefato entregue. A qualidade do processo refere-se às práticas, metodologias e controles utilizados durante o desenvolvimento. Embora relacionados, um processo bem definido não garante automaticamente um produto de alta qualidade.',
        'Do ponto de vista prático, um software de qualidade é aquele que: executa as funções descritas nos requisitos sem desvios observáveis; não apresenta comportamentos inesperados em condições normais de uso; responde de forma adequada a entradas inválidas ou imprevistas; e mantém seu desempenho ao longo do tempo e sob carga esperada.',
      ],
      example: {
        title: 'Exemplo prático',
        body: 'Um sistema de agendamento médico permite que o paciente escolha uma data de consulta. O requisito especifica que o sistema deve impedir agendamentos em datas passadas. Se o sistema aceita datas passadas sem emitir qualquer alerta, ele viola o requisito de corretude, comprometendo sua qualidade — mesmo que todas as outras funcionalidades funcionem perfeitamente.',
      },
      observation: {
        title: 'Atenção',
        body: 'Qualidade não significa perfeição. Significa conformidade com o que foi acordado e adequação ao propósito. Um software simples e bem delimitado pode ter alta qualidade, enquanto um sistema complexo com muitos recursos pode ter qualidade baixa se apresentar comportamentos incorretos frequentes.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt:
          '"Um software que não apresenta erros de compilação e que executa sem encerrar de forma inesperada é, necessariamente, um software de qualidade."',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 1,
        expectedAnswer:
          'Falsa. A ausência de erros de compilação e de encerramento inesperado indica apenas que o programa é sintaticamente válido e executa. Isso não garante que o software produz os resultados corretos, atende aos requisitos ou satisfaz as necessidades do usuário. Qualidade envolve dimensões que vão além da simples execução.',
      },
    },
    {
      id: 'bloco-2',
      number: 2,
      title: 'O que é Teste de Software',
      icon: '🔍',
      explanation: [
        'Teste de software é o processo de executar um sistema ou componente com o objetivo de avaliar se ele se comporta conforme o esperado. Mais do que simplesmente "rodar o programa e ver o que acontece", o teste é uma atividade técnica planejada, que envolve a definição de casos de teste, a execução controlada do software e a comparação sistemática entre os resultados obtidos e os resultados esperados.',
        'Myers, em sua obra clássica, propõe uma definição que permanece relevante: testar é o processo de executar um programa com a intenção de encontrar erros. Essa intenção é deliberada — o testador parte da premissa de que o software possui problemas e busca revelá-los, não confirmar que tudo está correto. Essa postura mental é fundamental para conduzir testes eficazes.',
        'O teste engloba diferentes níveis de abstração. No nível de unidade, são verificados componentes individuais, como funções ou métodos. No nível de integração, avalia-se a interação entre componentes. No nível de sistema, o software é testado como um todo, em condições próximas ao ambiente real. E no nível de aceitação, o próprio usuário ou seu representante valida se o sistema atende às suas necessidades.',
        'É igualmente importante distinguir teste de depuração (debugging). Depuração é o processo de localizar e corrigir a causa de uma falha já conhecida. O teste, por sua vez, é o processo que revela a existência dessa falha. As duas atividades são complementares, mas distintas: o testador encontra o problema; o desenvolvedor o resolve.',
      ],
      example: {
        title: 'Exemplo prático',
        body: 'Um desenvolvedor implementa uma função de cálculo de desconto em um sistema de e-commerce. Para testar a função, o testador cria casos com diferentes valores de compra, incluindo valores no limite (como zero e valores negativos), e verifica se os descontos calculados correspondem ao esperado. Quando a função retorna um desconto negativo para uma compra de R$ 0,00, o testador identificou uma falha — e a depuração pode então começar.',
      },
      observation: {
        title: 'Atenção',
        body: 'Testar um software não é o mesmo que usar o software. O uso casual não é sistemático e não cobre todos os cenários críticos. O teste planejado define antecipadamente quais entradas serão fornecidas, quais comportamentos são esperados e como os resultados serão avaliados.',
      },
      miniActivity: {
        type: 'fill',
        prompt:
          '"Segundo a visão clássica de Myers, o objetivo principal do teste é ___________ erros no software, e não demonstrar que ele está ___________."',
        placeholder: 'Digite as duas palavras separadas por vírgula. Ex: encontrar, correto',
        expectedAnswer:
          '"encontrar" (ou revelar / identificar) e "correto" (ou livre de erros / sem defeitos). O teste parte de uma postura investigativa e pessimista em relação ao estado do software.',
      },
    },
    {
      id: 'bloco-3',
      number: 3,
      title: 'Objetivos do Teste',
      icon: '🎯',
      explanation: [
        'O objetivo primário do teste de software é revelar defeitos existentes para que possam ser corrigidos antes que causem falhas em produção. Mas o teste serve a outros propósitos igualmente importantes, que devem ser compreendidos em conjunto.',
        'Um segundo objetivo é fornecer informações para a tomada de decisão sobre qualidade. O teste não apenas encontra problemas — ele também fornece dados sobre o estado atual do software, permitindo que gestores e desenvolvedores decidam se o sistema está pronto para ser entregue. Uma suíte de testes bem elaborada que não revela defeitos pode ser uma evidência (não uma prova) de que o sistema está em bom estado.',
        'O terceiro objetivo é a prevenção de defeitos por meio da atividade de teste em si. Quando os testadores revisam requisitos e especificações para elaborar casos de teste, frequentemente identificam ambiguidades, inconsistências ou lacunas que, se não corrigidas, levariam ao desenvolvimento de funcionalidades erradas. Nesse sentido, o teste contribui para a qualidade mesmo antes de executar uma linha de código.',
        'É importante reafirmar, em alinhamento com Dijkstra e Myers, que o teste não pode provar que um software é correto. Para sistemas não triviais, o número de possíveis entradas e estados é tão grande que a execução de todos os casos de teste seria impraticável ou impossível. O que o teste pode fazer é aumentar a confiança de que o sistema funciona corretamente para os casos testados.',
      ],
      example: {
        title: 'Exemplo prático',
        body: 'Uma equipe elabora casos de teste para um módulo de autenticação. Ao escrever o caso de teste para "usuário com senha expirada", o testador percebe que o requisito não especifica o que deve acontecer nessa situação: bloquear o acesso, redirecionar para troca de senha ou apenas alertar? Ao levar essa dúvida ao analista, um defeito de especificação foi prevenido antes mesmo de o código ser escrito.',
      },
      observation: {
        title: 'Atenção',
        body: 'O teste exaustivo — testar todas as combinações possíveis de entradas — é inviável para qualquer sistema real. Por isso, o testador precisa selecionar criteriosamente quais casos de teste são mais relevantes, priorizando situações de maior risco, casos extremos e cenários de uso frequente.',
      },
      miniActivity: {
        type: 'match',
        prompt: 'Associe cada objetivo do teste com sua descrição correta.',
        pairs: [
          {
            left: 'Revelar defeitos',
            right: 'Executar o sistema com intenção de encontrar problemas antes da entrega.',
          },
          {
            left: 'Informar decisões',
            right: 'Fornecer dados sobre o estado de qualidade do software para gestores e equipes.',
          },
          {
            left: 'Prevenir defeitos',
            right: 'Identificar falhas em requisitos ao elaborar casos de teste, antes de codificar.',
          },
          {
            left: 'Aumentar confiança',
            right: 'Demonstrar que o sistema se comporta conforme o esperado nos casos testados.',
          },
        ],
        expectedAnswer:
          'Revelar defeitos → encontrar problemas antes da entrega; Informar decisões → fornecer dados de qualidade; Prevenir defeitos → identificar falhas em requisitos; Aumentar confiança → demonstrar conformidade nos casos testados.',
      },
    },
    {
      id: 'bloco-4',
      number: 4,
      title: 'Erro, Falha e Defeito',
      icon: '🐛',
      explanation: [
        'A terminologia de teste de software distingue três conceitos que frequentemente são confundidos no uso cotidiano: erro, defeito e falha. Compreender essa distinção é essencial para comunicar com precisão os problemas encontrados em um sistema e para identificar suas causas e consequências.',
        'O erro (em inglês, error ou mistake) é uma ação humana que produz um resultado incorreto. É o engano cometido por um desenvolvedor, analista, arquiteto ou qualquer pessoa envolvida na criação do software. Exemplos incluem: interpretar erroneamente um requisito, escolher um algoritmo inadequado, digitar um operador errado, ou omitir um caso de tratamento de exceção. O erro é a origem, a causa raiz.',
        'O defeito (em inglês, defect ou fault, frequentemente chamado de bug) é a manifestação do erro no artefato produzido — seja no código-fonte, nos documentos de requisitos, nos casos de teste ou em qualquer outro produto do processo de desenvolvimento. O defeito é o problema que existe no artefato, independentemente de ter sido detectado ou de ter causado algum problema observável.',
        'A falha (em inglês, failure) é o comportamento incorreto ou inesperado observado durante a execução do sistema. É o efeito visível do defeito quando ele é ativado por uma entrada ou situação específica.',
        'A relação causal é clara: um erro humano produz um defeito no artefato; o defeito, quando ativado, provoca uma falha observável. É importante notar que um defeito pode existir sem nunca causar uma falha — se a parte defeituosa do código nunca for executada com as entradas que ativam o problema.',
      ],
      example: {
        title: 'Exemplo prático — Cálculo de IMC',
        body:
          'ERRO: O programador, ao implementar o cálculo do IMC, divide o peso pela altura uma única vez, em vez de dividir pelo quadrado da altura.\n\n' +
          'DEFEITO: O código resultante contém a fórmula errada — IMC = peso / altura, em vez de IMC = peso / (altura * altura).\n\n' +
          'FALHA: Quando o sistema calcula o IMC de um usuário com 70 kg e 1,75 m, exibe o valor 40,0 (70/1,75) em vez de 22,86 (70/3,0625). O usuário percebe um resultado incorreto.',
      },
      observation: {
        title: 'Terminologia',
        body: 'O CTFL/ISTQB utiliza "error" para o engano humano, "defect" para o problema no artefato e "failure" para o comportamento incorreto observado. Alguns autores usam "bug" como sinônimo de defeito. Independentemente da terminologia adotada, o importante é distinguir claramente a causa (humana), o artefato afetado e o efeito observado.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Uma analista interpreta erroneamente o requisito de validação de CPF e implementa uma regra que aceita CPFs com 10 dígitos como válidos, quando o correto são 11 dígitos. O sistema é implantado e, durante o uso, usuários conseguem cadastrar CPFs inválidos sem que nenhuma mensagem de erro seja exibida. Classifique cada elemento como erro, defeito ou falha.',
        placeholder:
          'Erro: ...\nDefeito: ...\nFalha: ...',
        expectedAnswer:
          'Erro: a interpretação incorreta da analista sobre o número de dígitos do CPF.\nDefeito: a regra de validação implementada no código que aceita 10 dígitos.\nFalha: o comportamento do sistema ao aceitar CPFs inválidos sem emitir qualquer alerta.',
      },
    },
    {
      id: 'bloco-5',
      number: 5,
      title: 'Importância do Teste no Ciclo de Desenvolvimento',
      icon: '🔄',
      explanation: [
        'O teste de software não é uma etapa opcional que acontece apenas ao final do desenvolvimento. É uma atividade que permeia todo o ciclo de vida do software e que, quando bem integrada, reduz significativamente o custo e o risco associados a defeitos.',
        'Uma das observações mais importantes da engenharia de software — amplamente documentada por Boehm e Basili e discutida por Sommerville — é que o custo de corrigir um defeito aumenta exponencialmente conforme o tempo passa sem que ele seja detectado. Um requisito mal especificado identificado na fase de levantamento pode ser corrigido com uma reunião. O mesmo problema, descoberto após a implantação, pode exigir retrabalho de arquitetura, reteste de múltiplos módulos e suporte emergencial aos usuários.',
        'O modelo clássico de desenvolvimento em cascata tendia a concentrar os testes no final do ciclo, o que amplificava esse problema. As abordagens modernas, como o desenvolvimento iterativo e as metodologias ágeis, integram o teste ao longo de todo o ciclo. Práticas como TDD e integração contínua automatizam a verificação a cada nova modificação, reduzindo o tempo entre a introdução de um defeito e sua detecção.',
        'Além do impacto econômico, a importância do teste é evidente em domínios críticos. Sistemas embarcados em dispositivos médicos, software de controle de aeronaves, sistemas de pagamento e infraestrutura bancária operam em contextos onde uma falha pode ter consequências irreversíveis — financeiras, físicas ou mesmo sobre vidas humanas. Nesses domínios, o teste não é uma escolha: é uma obrigação ética e legal.',
        'Por fim, é importante reconhecer que o teste por si só não garante qualidade. Ele deve ser visto como parte de um conjunto maior de práticas de garantia de qualidade, que inclui revisões de requisitos, inspeções de código, análise estática, controle de versão e gestão de configuração.',
      ],
      example: {
        title: 'Exemplo prático',
        body: 'Uma startup desenvolve um aplicativo de pagamentos. Durante o desenvolvimento, um defeito é introduzido no módulo de cálculo de tarifas. Se o defeito for identificado por um desenvolvedor durante a revisão de código (fase de codificação), a correção leva cerca de 30 minutos. Se for encontrado nos testes de sistema, pode exigir um dia de trabalho. Se for descoberto pelos usuários após o lançamento, pode envolver compensações financeiras, atualizações emergenciais, impacto na reputação e horas de suporte — um custo centenas de vezes maior.',
      },
      observation: {
        title: 'Cultura de qualidade',
        body: 'O teste não elimina defeitos; ele os revela. A correção é responsabilidade do time de desenvolvimento. Por isso, a efetividade do processo de teste depende de uma cultura colaborativa, em que encontrar um defeito é visto como uma contribuição ao produto, não como crítica ao desenvolvedor.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Por que o teste realizado apenas no final do ciclo de desenvolvimento é considerado uma prática de risco? Escreva sua resposta em duas a três frases.',
        placeholder: 'Escreva sua reflexão aqui...',
        expectedAnswer:
          'Testar apenas no final aumenta o risco porque defeitos introduzidos nas fases iniciais passam mais tempo sem detecção, tornando sua correção mais cara e complexa. Defeitos acumulados podem ter gerado outros defeitos derivados, dificultando a análise de causa raiz. A descoberta tardia de problemas pode inviabilizar o prazo de entrega ou exigir decisões difíceis sobre o que corrigir e o que entregar com riscos conhecidos.',
      },
    },
  ],

  /* ─── 6. Demonstracao com exemplo resolvido ────────────────── */
  demonstration: {
    requirement:
      'O sistema de matrículas de uma universidade deve impedir que um estudante se matricule em uma disciplina quando seu coeficiente de rendimento acadêmico (CRA) for inferior a 5.0. Caso o estudante tente realizar a matrícula nessa condição, o sistema deve exibir a mensagem: "Matrícula não permitida: CRA insuficiente."',
    situation:
      'Durante os testes de aceitação, o testador percebe que um estudante com CRA igual a 4.8 conseguiu realizar a matrícula sem qualquer impedimento. A mensagem de erro não foi exibida e a matrícula foi registrada normalmente.',
    steps: [
      {
        id: 1,
        label: 'Erro humano',
        question: 'Qual foi o erro humano ou de desenvolvimento?',
        body:
          'O desenvolvedor implementou a condição de bloqueio utilizando o operador "menor que" estrito (<) em vez de "menor que ou igual a" (<=). O código resultante verifica se CRA < 5.0, mas o requisito determina que o bloqueio deve ocorrer quando CRA for inferior a 5.0, o que inclui valores como 4.9 e 4.8. O erro é a escolha do operador errado na hora de traduzir o requisito em código.',
        color: '#8b0000',
      },
      {
        id: 2,
        label: 'Defeito no produto',
        question: 'Qual foi o defeito no produto?',
        body:
          'O defeito é a instrução condicional incorreta no código-fonte: a lógica não cobre adequadamente o intervalo definido pelo requisito. Como o CRA é calculado com casas decimais, o operador correto deveria garantir que qualquer valor abaixo de 5.0 (exclusive) bloqueasse a matrícula. O defeito está no artefato de código, existindo independentemente de ter sido detectado.',
        color: '#a85a00',
      },
      {
        id: 3,
        label: 'Falha percebida',
        question: 'Qual foi a falha percebida pelo usuário?',
        body:
          'O usuário (ou testador) observou que estudantes com CRA abaixo de 5.0 conseguiam realizar matrículas que deveriam ser bloqueadas. A falha é o comportamento incorreto observado em execução: a ausência do bloqueio e da mensagem de erro em casos em que eles deveriam ocorrer.',
        color: '#1a7f1a',
      },
      {
        id: 4,
        label: 'Como um teste identificaria',
        question: 'Como um teste poderia ter identificado o problema?',
        body:
          'Um caso de teste específico para o valor limite seria suficiente. O testador poderia criar um caso de teste com CRA = 4.9 (valor abaixo do limite) e verificar se o sistema exibe a mensagem de bloqueio. Além disso, testes com CRA = 5.0 (no limite) e CRA = 5.1 (acima do limite) completariam a cobertura. Esse é um exemplo clássico de Análise de Valor de Fronteira.',
        color: '#3a3a8b',
      },
    ],
    lesson:
      'Um único caso de teste bem escolhido — CRA = 4.9 — seria suficiente para revelar esse defeito antes da entrega. A ausência de casos de teste para valores de fronteira é uma das causas mais comuns de defeitos não detectados em sistemas reais.',
  },

  /* ─── 7. Atividade 1.1 — questionario objetivo (8 questoes) ── */
  atividade11: {
    description:
      'Responda às questões a seguir. Cada questão tem apenas uma alternativa correta. Você recebe feedback imediato após cada resposta.',
    questions: [
      {
        id: '1.1.1',
        question:
          'Qual das alternativas abaixo representa corretamente a relação causal entre erro, defeito e falha?',
        options: [
          'A) O defeito causa o erro, que causa a falha.',
          'B) O erro humano produz um defeito no artefato, que pode causar uma falha em execução.',
          'C) A falha é identificada primeiro; em seguida, o defeito é encontrado; por último, o erro é corrigido.',
          'D) Erro, defeito e falha são sinônimos utilizados em contextos diferentes.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! A sequência causal é: erro (causa humana) → defeito (problema no artefato) → falha (comportamento incorreto observado). Cada conceito representa uma etapa distinta na cadeia de causalidade.',
        errorExplanation:
          'Revise o Bloco 4. A relação causal tem uma direção específica: o erro humano é a causa raiz, o defeito é sua manifestação no artefato e a falha é o efeito observado em execução.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '1.1.2',
        question:
          'De acordo com os fundamentos do teste de software, qual afirmação sobre o objetivo do teste é correta?',
        options: [
          'A) O teste prova que o software não possui defeitos.',
          'B) O teste garante que o software atende a todos os requisitos possíveis.',
          'C) O teste revela defeitos presentes no software, aumentando a confiança na sua qualidade.',
          'D) O teste é responsável por corrigir os defeitos encontrados no software.',
        ],
        correctIndex: 2,
        explanation:
          'Excelente! O teste não prova ausência de defeitos nem os corrige — ele os revela. A correção é responsabilidade da equipe de desenvolvimento. Aumentar a confiança na qualidade é um dos resultados práticos do processo de teste.',
        errorExplanation:
          'Cuidado: o teste revela defeitos, mas não os corrige e não pode provar a ausência total de problemas. Revise o Bloco 3.',
        reviewBlock: 'bloco-3',
      },
      {
        id: '1.1.3',
        question:
          'Um programador esquece de implementar a validação de um campo obrigatório em um formulário de cadastro. Como resultado, usuários conseguem submeter o formulário sem preencher esse campo, o que causa erros no banco de dados. Qual dos elementos abaixo corresponde ao defeito nessa situação?',
        options: [
          'A) O esquecimento do programador ao implementar o sistema.',
          'B) A ausência da lógica de validação no código-fonte.',
          'C) Os erros gerados no banco de dados durante o uso.',
          'D) A mensagem de erro que o usuário recebe ao tentar cadastrar.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! O defeito é o problema que existe no artefato: a ausência da validação no código. O esquecimento do programador é o erro (causa humana); os erros no banco de dados são as falhas (efeitos observados).',
        errorExplanation:
          'O defeito é o problema que existe no produto de software — no código, na documentação ou em outro artefato. O esquecimento do programador é o erro; os erros no banco são as falhas. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '1.1.4',
        question: 'Qual das alternativas descreve corretamente a distinção entre teste e depuração?',
        options: [
          'A) Teste e depuração são sinônimos; ambos identificam e corrigem problemas.',
          'B) O teste identifica a presença de defeitos; a depuração localiza e corrige a causa da falha.',
          'C) A depuração é realizada antes do teste para prevenir defeitos.',
          'D) O teste ocorre apenas após a depuração ser concluída.',
        ],
        correctIndex: 1,
        explanation:
          'Muito bem! O teste revela que algo está errado; a depuração investiga por que isso acontece e onde está o problema no código. São atividades complementares, mas distintas em objetivo e responsabilidade.',
        errorExplanation:
          'Teste e depuração são atividades distintas. O teste é sistemático e busca revelar falhas; a depuração é investigativa e busca a causa do problema já identificado. Revise o Bloco 2.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '1.1.5',
        question:
          'Por que o teste exaustivo — testar todas as combinações possíveis de entradas — é considerado inviável na prática?',
        options: [
          'A) Porque os testadores não possuem conhecimento suficiente para criar todos os casos de teste.',
          'B) Porque ferramentas de automação não suportam grandes volumes de testes.',
          'C) Porque o número de combinações possíveis de entradas e estados em sistemas reais é demasiadamente grande para ser coberto integralmente.',
          'D) Porque o teste exaustivo foi proibido pelas normas internacionais de qualidade de software.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Mesmo para sistemas simples, a quantidade de combinações possíveis de entradas e condições de estado cresce exponencialmente. Por isso, o testador deve selecionar criteriosamente os casos mais relevantes com base em critérios técnicos.',
        errorExplanation:
          'A inviabilidade do teste exaustivo é uma propriedade matemática do espaço de entradas, não uma limitação de ferramentas ou conhecimento. Revise o Bloco 3.',
        reviewBlock: 'bloco-3',
      },
      {
        id: '1.1.6',
        question:
          'Qual das opções representa um atributo de qualidade de software relacionado à confiabilidade?',
        options: [
          'A) O sistema possui uma interface gráfica moderna e intuitiva.',
          'B) O sistema apresenta poucos erros de execução ao longo do tempo e em diferentes condições de uso.',
          'C) O sistema foi desenvolvido utilizando uma linguagem de programação moderna.',
          'D) O sistema possui documentação técnica completa.',
        ],
        correctIndex: 1,
        explanation:
          'Excelente! Confiabilidade refere-se à capacidade do sistema de funcionar corretamente ao longo do tempo e sob diferentes condições. Poucos erros de execução é um indicador direto desse atributo.',
        errorExplanation:
          'Confiabilidade é um atributo de qualidade que diz respeito ao comportamento do sistema em execução ao longo do tempo, não a características de interface ou processo. Revise o Bloco 1.',
        reviewBlock: 'bloco-1',
      },
      {
        id: '1.1.7',
        question:
          'Em qual fase do ciclo de desenvolvimento o custo de correção de um defeito é geralmente menor?',
        options: [
          'A) Na fase de implantação, pois o sistema já está em produção e a equipe conhece melhor o código.',
          'B) Na fase de testes de sistema, pois os defeitos já são facilmente localizáveis.',
          'C) Na fase de levantamento e análise de requisitos, antes que o defeito se propague para outros artefatos.',
          'D) Nas fases finais, pois a equipe já acumulou mais experiência com o sistema.',
        ],
        correctIndex: 2,
        explanation:
          'Muito bem! Quanto mais cedo um defeito é identificado, menor é o custo e o esforço de correção. Um defeito de requisito corrigido na fase de análise evita que ele se propague para o projeto, o código, os testes e a documentação.',
        errorExplanation:
          'O custo de correção cresce com o tempo e com a propagação do defeito para outros artefatos. Identificar problemas cedo, na fase de requisitos, é muito mais econômico. Revise o Bloco 5.',
        reviewBlock: 'bloco-5',
      },
      {
        id: '1.1.8',
        question:
          'Considere a afirmação: "Um código que nunca apresenta falhas durante o uso não possui defeitos." Essa afirmação é:',
        options: [
          'A) Verdadeira, pois defeito é o mesmo que falha.',
          'B) Verdadeira, pois a ausência de falhas indica ausência de defeitos.',
          'C) Falsa, pois um defeito pode existir no código sem jamais ser ativado pelas entradas utilizadas no uso normal.',
          'D) Falsa, pois o conceito de defeito não se aplica a código em execução.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Um defeito pode existir no código e nunca ser ativado se as entradas que o desencadeariam nunca forem fornecidas. Ausência de falha observada não equivale a ausência de defeito.',
        errorExplanation:
          'Defeito e falha são conceitos distintos. Um defeito existe no artefato independentemente de ter sido ativado. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
    ],
  },

  /* ─── 8. Atividade 1.2 — discussao guiada ──────────────────── */
  atividade12: {
    question:
      'Por que testar software antes de entregá-lo ao usuário é uma prática importante? Considere em sua resposta pelo menos dois dos seguintes aspectos: custo de correção de defeitos, impacto das falhas no usuário, confiança no produto e papel do teste no ciclo de desenvolvimento.',
    minWords: 150,
    criteria: [
      'O aluno deve mencionar que o teste identifica defeitos antes que eles causem falhas em produção.',
      'O aluno deve abordar o custo crescente da correção tardia de defeitos.',
      'O aluno deve relacionar a qualidade do software com a confiança do usuário ou o impacto de falhas.',
      'O aluno deve posicionar o teste como parte do ciclo de desenvolvimento, não apenas como etapa final.',
    ],
    sampleAnswer:
      'Testar software antes da entrega é fundamental por diversas razões. Em primeiro lugar, defeitos identificados durante os testes podem ser corrigidos com custo muito menor do que quando descobertos pelos usuários em produção. Uma falha detectada na fase de testes exige apenas a correção do código e novo teste. Já uma falha em produção pode envolver suporte emergencial, retrabalho de múltiplas camadas do sistema, compensações ao usuário e danos reputacionais difíceis de mensurar.\n\nEm segundo lugar, o teste contribui diretamente para a confiança no produto. Um software bem testado chega ao usuário com maior grau de previsibilidade no seu comportamento, o que reduz a ocorrência de surpresas desagradáveis e fortalece a relação entre o usuário e o sistema. Além disso, o teste não é uma atividade isolada no final do desenvolvimento: ele deve estar presente em todas as fases, desde a revisão de requisitos até a validação do sistema completo, tornando o processo de desenvolvimento mais seguro e controlado.',
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        description:
          'A resposta não aborda a importância do teste ou apresenta conceitos incorretos. Não menciona nenhum dos aspectos solicitados.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        description:
          'A resposta menciona superficialmente a importância do teste, mas sem justificativa técnica. Aborda apenas um aspecto solicitado, com pouca profundidade.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        description:
          'A resposta aborda dois ou mais aspectos com clareza e justificativa adequada. Demonstra compreensão dos conceitos, embora com algumas imprecisões terminológicas.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        description:
          'A resposta é clara, bem estruturada e aborda múltiplos aspectos com fundamentação técnica precisa. Demonstra compreensão profunda do papel do teste no ciclo de desenvolvimento.',
      },
    ],
  },

  /* ─── 9. Pratica guiada — cupom de desconto ────────────────── */
  guidedPracticeRich: {
    scenario:
      'Um sistema de compras online permite que o usuário aplique um cupom de desconto no carrinho. O requisito especifica que um cupom só pode ser utilizado uma vez por conta de usuário. Porém, durante os testes, o testador observa que, ao aplicar o cupom, fechar o navegador e reabrir o carrinho, o cupom pode ser aplicado novamente, gerando um segundo desconto indevido.',
    question:
      'Analise o cenário e responda: com base na terminologia de teste de software, identifique e descreva o erro, o defeito e a falha presentes nessa situação.',
    fields: [
      {
        key: 'erro',
        label: 'Erro (causa humana)',
        placeholder: 'Descreva o engano ou omissão cometido pelo desenvolvedor...',
        color: '#8b0000',
      },
      {
        key: 'defeito',
        label: 'Defeito (no artefato)',
        placeholder: 'Descreva o problema presente no código ou na documentação...',
        color: '#a85a00',
      },
      {
        key: 'falha',
        label: 'Falha (observada)',
        placeholder: 'Descreva o comportamento incorreto observado pelo usuário...',
        color: '#1a7f1a',
      },
    ],
    hints: [
      'Comece pelo que você observou acontecendo de errado no sistema. O que o usuário viu de incorreto?',
      'Agora pense: onde no código esse problema pode ter origem? O sistema armazena o uso do cupom de alguma forma? O que pode estar faltando ou errado na lógica de verificação?',
      'O erro humano normalmente está na fase de design ou codificação. Pergunte: o desenvolvedor se esqueceu de algo? Implementou uma lógica incompleta?',
    ],
    expectedAnswers: {
      erro:
        'O desenvolvedor não implementou a lógica de persistência do uso do cupom entre sessões. Ao planejar o sistema, gerenciou o estado do cupom apenas na sessão atual, sem registrar permanentemente que o cupom já foi utilizado por aquele usuário.',
      defeito:
        'O código não registra no banco de dados (ou em persistência equivalente) que o cupom foi utilizado. A verificação de uso é feita apenas na sessão ativa, sem consulta ao histórico persistente do usuário.',
      falha:
        'O usuário consegue aplicar o mesmo cupom de desconto mais de uma vez ao fechar e reabrir o navegador, obtendo descontos indevidos.',
    },
    feedback:
      'O cenário demonstra como um defeito pode não ser aparente durante o uso convencional (aplicar o cupom uma vez na mesma sessão), mas se manifesta como falha quando o usuário altera seu comportamento (fechar e reabrir o navegador). Esse é um exemplo de por que testar apenas o "caminho feliz" é insuficiente: é preciso testar cenários de borda e comportamentos fora do fluxo principal.',
  },

  /* ─── 10. Pratica independente — biblioteca digital ───────── */
  independentPracticeRich: {
    scenario:
      'Um sistema de biblioteca digital permite que usuários realizem a reserva de livros eletrônicos. O requisito estabelece que um usuário só pode ter, simultaneamente, no máximo 3 reservas ativas. Durante o uso do sistema, um usuário com 3 reservas ativas consegue realizar uma quarta reserva acessando a funcionalidade de busca por ISBN e clicando diretamente no botão "Reservar" na página do livro, sem passar pela página do carrinho. O limite de 3 reservas não é verificado nesse fluxo alternativo de reserva.',
    tasks: [
      'Identifique o erro humano ou de desenvolvimento que originou o problema.',
      'Identifique o defeito presente no sistema.',
      'Identifique a falha observada pelo usuário ou testador.',
      'Proponha como um caso de teste poderia ter identificado esse problema antes da implantação.',
    ],
    fields: [
      {
        key: 'erro',
        label: 'Erro humano ou de desenvolvimento',
        placeholder: 'Qual engano ou omissão originou o problema?',
        color: '#8b0000',
      },
      {
        key: 'defeito',
        label: 'Defeito presente no sistema',
        placeholder: 'Qual é o problema no artefato de software?',
        color: '#a85a00',
      },
      {
        key: 'falha',
        label: 'Falha observada',
        placeholder: 'Qual comportamento incorreto foi observado?',
        color: '#1a7f1a',
      },
      {
        key: 'teste',
        label: 'Caso de teste proposto',
        placeholder: 'Como um caso de teste teria identificado o problema?',
        color: '#3a3a8b',
      },
    ],
    expectedAnswers: {
      erro:
        'O desenvolvedor implementou a validação do limite de reservas apenas no fluxo principal (via carrinho), sem aplicar a mesma regra ao fluxo alternativo de reserva direta por ISBN. A causa humana é a implementação incompleta da regra de negócio.',
      defeito:
        'A lógica de verificação do limite de reservas está ausente no endpoint ou funcionalidade de reserva direta via página de livro. O código não valida o número de reservas ativas ao processar requisições por esse caminho alternativo.',
      falha:
        'Um usuário com 3 reservas ativas consegue realizar uma quarta reserva pelo fluxo alternativo, violando a regra de negócio estabelecida. O sistema não exibe qualquer mensagem de erro ou bloqueio nesse fluxo.',
      teste:
        'Um caso de teste que simula um usuário com 3 reservas ativas tentando realizar uma quarta reserva diretamente pela página de um livro (sem passar pelo carrinho) identificaria essa falha. O resultado esperado seria uma mensagem de erro informando que o limite de reservas foi atingido.',
    },
    criteria: [
      {
        label: 'Identificação do erro',
        weight: '25%',
        description:
          'Menciona que o desenvolvedor não aplicou a regra ao fluxo alternativo (omissão de implementação).',
      },
      {
        label: 'Identificação do defeito',
        weight: '25%',
        description: 'Descreve a ausência da lógica de validação no caminho alternativo de reserva.',
      },
      {
        label: 'Identificação da falha',
        weight: '25%',
        description:
          'Descreve o comportamento incorreto observado: quarta reserva realizada sem bloqueio.',
      },
      {
        label: 'Proposta de caso de teste',
        weight: '25%',
        description:
          'Descreve um teste com usuário com 3 reservas tentando reservar via fluxo alternativo.',
      },
    ],
    feedbackCorrect:
      'Você demonstrou capacidade de analisar um cenário de software real e identificar com precisão a cadeia causal erro → defeito → falha. Parabéns! Esse raciocínio é fundamental para a atividade de teste. A observação sobre o fluxo alternativo indica maturidade na análise de cobertura de teste.',
    feedbackIncorrect:
      'Se você teve dificuldade em distinguir o erro do defeito, lembre-se: o erro é humano (o que o desenvolvedor deixou de fazer ou fez errado); o defeito é o resultado disso no código (o que está ausente ou errado no artefato). Revise o Bloco 4 e tente novamente.',
  },

  /* ─── 11. Avaliacao final — 10 questoes (AF-01 a AF-10) ───── */
  finalAssessmentQuestions: [
    {
      id: 'AF-01',
      question:
        'Qual das afirmações a seguir melhor descreve o conceito de "falha" (failure) no contexto do teste de software?',
      options: [
        'A) Um engano cometido pelo desenvolvedor ao escrever o código.',
        'B) Uma instrução incorreta presente no código-fonte do sistema.',
        'C) Um comportamento incorreto ou inesperado observado durante a execução do sistema.',
        'D) A atividade de executar o sistema com o objetivo de identificar defeitos.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. Falha é o comportamento incorreto observado externamente durante a execução, diferente do erro (causa humana) e do defeito (problema no artefato). Conteúdo: Bloco 4.',
      errorExplanation:
        'Reveja a distinção entre erro, defeito e falha. A falha é o efeito visível, o que o usuário ou testador percebe. Conteúdo relacionado: Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF-02',
      question:
        'Um engenheiro de software interpreta incorretamente um requisito de segurança e implementa uma funcionalidade de controle de acesso sem verificar o perfil do usuário para operações de edição. Qual termo classifica corretamente o ato de interpretar incorretamente o requisito?',
      options: ['A) Falha.', 'B) Defeito.', 'C) Erro.', 'D) Exceção.'],
      correctIndex: 2,
      explanation:
        'Correto. O ato humano de interpretar ou executar algo de forma incorreta é classificado como erro. O defeito será a implementação resultante no código. Conteúdo: Bloco 4.',
      errorExplanation:
        'O engano cometido por uma pessoa é um erro. O resultado desse engano no artefato é um defeito. O efeito observado em execução é uma falha. Conteúdo relacionado: Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF-03',
      question: 'Qual das seguintes afirmações sobre os objetivos do teste de software é FALSA?',
      options: [
        'A) O teste pode revelar a presença de defeitos em um sistema.',
        'B) O teste provê evidências para decisões sobre a qualidade do produto.',
        'C) O teste pode provar que um sistema está completamente livre de defeitos.',
        'D) O teste pode contribuir para a prevenção de defeitos ao identificar problemas em requisitos.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O teste não pode provar ausência total de defeitos, pois o teste exaustivo é inviável para sistemas reais. Essa é uma das premissas fundamentais do teste de software. Conteúdo: Bloco 3.',
      errorExplanation:
        'O teste não prova ausência de defeitos — ele revela sua presença. A alternativa C é a afirmação falsa. Conteúdo relacionado: Bloco 3.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF-04',
      question:
        'Uma empresa decide implantar um novo sistema de gestão financeira sem realizar testes formais, confiando apenas na experiência da equipe de desenvolvimento. Qual risco essa decisão mais claramente introduz?',
      options: [
        'A) O sistema será desenvolvido mais lentamente devido à ausência de uma etapa de testes.',
        'B) Defeitos que poderiam ser identificados antes da implantação poderão causar falhas em produção, com custo de correção significativamente maior.',
        'C) A equipe de desenvolvimento perderá a motivação para manter a qualidade do código.',
        'D) O sistema não poderá ser certificado por normas internacionais de qualidade.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A ausência de testes aumenta o risco de defeitos chegarem a produção, onde o custo de correção é muito maior do que nas fases iniciais de desenvolvimento. Conteúdo: Bloco 5.',
      errorExplanation:
        'O principal risco da ausência de testes formais é que defeitos chegam a produção, onde seu impacto e custo de correção são maiores. Conteúdo relacionado: Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF-05',
      question:
        'Qual das alternativas representa corretamente uma característica da qualidade de software conforme descrita pela Engenharia de Software?',
      options: [
        'A) Um software é de qualidade apenas se foi desenvolvido em uma linguagem de programação moderna.',
        'B) Qualidade de software é exclusivamente determinada pela satisfação imediata do usuário com a interface.',
        'C) Qualidade de software envolve múltiplos atributos, incluindo corretude, confiabilidade, usabilidade e manutenibilidade.',
        'D) Um software de qualidade é aquele que não apresenta erros de compilação.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. Qualidade de software é multidimensional e envolve atributos como corretude, confiabilidade, usabilidade e manutenibilidade, entre outros. Conteúdo: Bloco 1.',
      errorExplanation:
        'Qualidade não se resume a compilação ou interface. É um conjunto de atributos que devem ser avaliados em diferentes dimensões. Conteúdo relacionado: Bloco 1.',
      reviewBlock: 'bloco-1',
    },
    {
      id: 'AF-06',
      question: 'Qual das afirmações descreve corretamente a relação entre teste e depuração?',
      options: [
        'A) O teste localiza e corrige defeitos; a depuração verifica se a correção foi bem-sucedida.',
        'B) O teste revela a existência de falhas; a depuração localiza e corrige a causa do defeito.',
        'C) A depuração é realizada antes do teste, para evitar que defeitos sejam introduzidos.',
        'D) Teste e depuração são sinônimos que descrevem a mesma atividade de verificação.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O teste identifica que algo está errado (revela a falha); a depuração investiga onde e por que o problema existe no código e realiza a correção. Conteúdo: Bloco 2.',
      errorExplanation:
        'Teste e depuração são complementares, não sinônimas. O teste revela; a depuração investiga e corrige. Conteúdo relacionado: Bloco 2.',
      reviewBlock: 'bloco-2',
    },
    {
      id: 'AF-07',
      question:
        'Considere o seguinte cenário: um sistema de folha de pagamento calcula corretamente os salários de todos os funcionários durante seis meses de operação. No sétimo mês, um funcionário recebe um bônus de valor nulo, e o sistema divide o salário por zero, causando um encerramento inesperado. Qual conclusão sobre o defeito no sistema é correta?',
      options: [
        'A) O defeito foi introduzido no sétimo mês, pois o sistema funcionava corretamente antes.',
        'B) O defeito existia desde a implementação, mas só foi ativado quando a condição de divisão por zero ocorreu.',
        'C) Não houve defeito, pois o sistema funcionou corretamente por seis meses.',
        'D) O defeito é uma falha de hardware, não de software.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O defeito existia no código desde sua escrita. Ele não se manifestou como falha por seis meses porque a condição que o ativa (bônus nulo) não havia ocorrido. Isso ilustra que defeito e falha são eventos distintos no tempo. Conteúdo: Bloco 4.',
      errorExplanation:
        'Um defeito pode existir por longo tempo sem causar falha, se a condição que o ativa nunca ocorrer. Conteúdo relacionado: Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF-08',
      question: 'Por que o teste exaustivo não é praticável em sistemas de software reais?',
      options: [
        'A) Porque as ferramentas de automação de teste não suportam volumes elevados de casos de teste.',
        'B) Porque o número de combinações possíveis de entradas, pré-condições e estados cresce de forma que torna a execução completa inviável dentro de limites razoáveis de tempo e custo.',
        'C) Porque testes exaustivos são proibidos pelas normas ISO de qualidade de software.',
        'D) Porque testadores não possuem acesso ao código-fonte para criar todos os casos de teste necessários.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A inviabilidade do teste exaustivo é uma propriedade matemática do espaço de entradas dos sistemas. Para qualquer programa não trivial, o número de combinações possível é tão grande que a execução integral seria impraticável. Conteúdo: Bloco 3.',
      errorExplanation:
        'Não é uma limitação de ferramentas ou normas — é uma propriedade matemática do problema. Conteúdo relacionado: Bloco 3.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF-09',
      question:
        'Em qual das fases do ciclo de vida de desenvolvimento o custo de correção de um defeito é tipicamente mais baixo?',
      options: [
        'A) Durante os testes de sistema, pois os defeitos já são conhecidos pela equipe.',
        'B) Após a implantação, pois o ambiente de produção revela os defeitos com maior clareza.',
        'C) Durante o levantamento e análise de requisitos, antes que o defeito se propague para outros artefatos.',
        'D) Durante a manutenção, pois a equipe possui mais conhecimento do sistema nessa fase.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. Quanto mais cedo um defeito é identificado, menor o custo de correção, pois ele ainda não se propagou para o projeto, o código, os testes e a documentação. Conteúdo: Bloco 5.',
      errorExplanation:
        'O custo de correção cresce com o tempo e com a propagação. Identificar problemas na fase de requisitos é muito mais barato do que corrigi-los em produção. Conteúdo relacionado: Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF-10',
      question:
        'Analise as afirmações a seguir sobre qualidade e teste de software e identifique aquela que é correta:\nI. Um software que compila sem erros e executa sem encerramento inesperado possui, necessariamente, alta qualidade.\nII. O principal objetivo do teste é provar que o software está correto.\nIII. Um defeito pode existir em um sistema sem jamais causar uma falha observável.\nIV. Teste e depuração descrevem a mesma atividade de identificação e correção de defeitos.',
      options: [
        'A) Apenas a afirmação I é correta.',
        'B) Apenas a afirmação III é correta.',
        'C) As afirmações II e IV são corretas.',
        'D) As afirmações I e III são corretas.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A afirmação III é a única verdadeira: um defeito pode existir no código sem nunca ser ativado. As demais são falsas: compilação sem erros não garante qualidade (I); o teste não prova corretude, revela defeitos (II); teste e depuração são atividades distintas (IV). Conteúdo: Blocos 1, 2, 3 e 4.',
      errorExplanation:
        'Analise cada afirmação separadamente. III é correta; as demais contêm equívocos conceituais fundamentais. Revisite os Blocos 1 a 4.',
      reviewBlock: 'bloco-1,bloco-2,bloco-3,bloco-4',
    },
  ],

  reviewMap: {
    'AF-01': ['bloco-4'],
    'AF-02': ['bloco-4'],
    'AF-03': ['bloco-3'],
    'AF-04': ['bloco-5'],
    'AF-05': ['bloco-1'],
    'AF-06': ['bloco-2'],
    'AF-07': ['bloco-4'],
    'AF-08': ['bloco-3'],
    'AF-09': ['bloco-5'],
    'AF-10': ['bloco-1', 'bloco-2', 'bloco-3', 'bloco-4'],
  },

  /* ─── 12. Desafio aplicado final ───────────────────────────── */
  finalChallenge: {
    enunciado:
      'Leia atentamente o cenário a seguir e responda às cinco questões propostas. Utilize os conceitos estudados nesta unidade para fundamentar suas respostas. Esta atividade avalia sua capacidade de transferir o conhecimento para uma situação nova e realista.',
    scenario:
      'Uma empresa de seguros desenvolveu um sistema web para emissão de apólices de seguro de vida. O sistema calcula o valor do prêmio mensal com base em três variáveis: idade do segurado, valor do bem segurado e perfil de risco (baixo, médio ou alto). O requisito especifica que segurados com mais de 65 anos e perfil de risco alto devem ser automaticamente recusados, com exibição da mensagem: "Apólice não disponível para o perfil informado."\n\nDurante os testes de aceitação, o gerente de TI — que não é testador — decide simular um caso de uso e cadastra um segurado com 66 anos e perfil de risco alto. O sistema emite a apólice normalmente, sem exibir qualquer mensagem de recusa e sem registrar o perfil de risco como alto no banco de dados. Ao investigar, o time de desenvolvimento descobre que o desenvolvedor responsável pelo módulo de emissão havia entendido que a restrição se aplicava apenas a segurados com mais de 70 anos, e havia implementado a verificação com esse valor incorreto.',
    fields: [
      {
        key: 'problema',
        label: '1. Problema percebido pelo usuário',
        description: 'Descreva o que o gerente de TI (usuário) observou de incorreto.',
        placeholder: 'O gerente observou que...',
        color: '#3a3a8b',
      },
      {
        key: 'falha',
        label: '2. A possível falha',
        description: 'Qual é o comportamento incorreto observado em execução?',
        placeholder: 'O sistema...',
        color: '#1a7f1a',
      },
      {
        key: 'defeito',
        label: '3. O defeito relacionado',
        description: 'Qual é o problema que existe no artefato de software (código)?',
        placeholder: 'No código...',
        color: '#a85a00',
      },
      {
        key: 'erro',
        label: '4. O erro humano ou de desenvolvimento',
        description: 'Qual engano ou omissão originou o defeito?',
        placeholder: 'O desenvolvedor...',
        color: '#8b0000',
      },
      {
        key: 'teste',
        label: '5. Por que um teste seria importante',
        description: 'Justifique como um caso de teste teria prevenido ou revelado esse problema.',
        placeholder: 'Um caso de teste com...',
        color: '#4a148c',
      },
    ],
    expectedAnswers: {
      problema:
        'O gerente de TI observou que o sistema emitiu uma apólice normalmente para um segurado com 66 anos e perfil de risco alto, sem exibir a mensagem de recusa exigida pelo requisito.',
      falha:
        'O comportamento incorreto é a emissão da apólice para um perfil que deveria ser recusado, sem exibir a mensagem de aviso e sem registrar corretamente o perfil de risco no banco de dados.',
      defeito:
        'A condição de restrição no código utiliza o valor 70 em vez de 65 como limite de idade. O defeito é a instrução condicional incorreta que verifica if (idade > 70) quando deveria verificar if (idade > 65).',
      erro:
        'O desenvolvedor interpretou erroneamente o requisito, entendendo que a restrição se aplicava a maiores de 70 anos, quando o correto era maiores de 65. Esse equívoco de interpretação é o erro humano que originou o defeito.',
      teste:
        'Um caso de teste específico para o valor de fronteira (segurado com exatamente 65, 66 e 64 anos, com perfil de risco alto) teria revelado que o sistema não aplicava a restrição corretamente. Sem esse teste, o defeito chegou a produção, expondo a empresa ao risco de emitir apólices indevidas para perfis restritos, com potenciais consequências financeiras e legais.',
    },
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        achievementCount: '0–1 elementos corretos',
        description:
          'O aluno não demonstrou compreensão dos conceitos fundamentais. Recomenda-se revisitar todos os blocos da unidade antes de tentar novamente.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        achievementCount: '2 elementos corretos',
        description:
          'O aluno identificou parte da cadeia causal, mas não conseguiu distinguir todos os elementos. Revise especialmente o Bloco 4 e o Exemplo Resolvido.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        achievementCount: '3–4 elementos corretos',
        description:
          'O aluno demonstra boa compreensão dos conceitos, com algumas imprecisões. A justificativa da importância do teste pode ser aprofundada.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        achievementCount: '5 elementos corretos',
        description:
          'O aluno identificou corretamente todos os elementos da cadeia causal e justificou com clareza o papel do teste. Excelente aplicação dos conceitos.',
      },
    ],
    finalFeedback:
      'Ao concluir este desafio, você aplicou os cinco conceitos centrais desta unidade a um cenário realista do mercado de software. A capacidade de identificar a cadeia causal erro → defeito → falha e de relacioná-la ao papel do teste é uma competência fundamental para qualquer profissional que atue no desenvolvimento, verificação ou gestão de qualidade de sistemas. Você está pronto para avançar para a próxima unidade.',
  },

  /* ─── Estrutura legada (mantida para compatibilidade) ──────── */
  content: [],
  examples: [],
  guidedPractice: {
    question: '',
    context: '',
    options: [],
    correctAnswers: [],
    explanation: '',
  },
  independentPractice: {
    title: '',
    scenario: '',
    fields: [],
    sampleAnswer: {},
  },
  challenge: {
    title: '',
    scenario: '',
    tasks: [],
    fields: [],
    expectedReport: { title: '', steps: '', expected: '', actual: '', severity: '' },
  },
};
