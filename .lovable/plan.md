# Science Slice A — Ambientes, Animais & Adaptações

Plano de implementação. Nenhum código foi escrito. Matemática permanece intacta e pausada.

---

## S1 — Auditoria de reuso da implementação atual

| Capacidade existente | Reusar como está | Estender | Nova capacidade reutilizável | Notas |
|---|---|---|---|---|
| Rota de mundo (`/mundo/$worldId`) | — | Sim | — | Hoje só aceita `world-placeholder`; precisa de registro de mundos por id |
| World Board / `WorldBoardScene` | — | Sim | — | Cena é genérica; precisa aceitar asset/rota/landmarks do mundo Ciências via visual-config |
| Activity Slot (schema + anchors) | Sim | — | — | `sequence.discover/practice/challenge` já existe e nunca foi exercitada |
| Challenge Stage (rota overlay) | — | Sim | — | Hoje resolve só `challenge[0]` e `items[0]`; precisa percorrer modo + itens |
| `PuzzleTemplateHost` | Sim | — | — | Contrato neutro já adequado |
| Narração/replay (`useNarration`, narration config) | Sim | — | — | Só acrescentar entradas por slot |
| Companheiro (arte do pet, SpeechBubble) | Sim | — | — | `petId` já é configuração |
| Persistência local + fatos | Sim | — | — | Nenhum store novo de Ciências |
| Success return (`useSuccessReturn`) | Sim | — | — | Comportamento já corrigido em 1B.1a |
| Restauração (`restoration-units`, `RestoredUnit`) | — | Sim | — | Novo catálogo de unidades costeiras; mesma mecânica derivada |
| Templates | `placeholder-order` fica só para Matemática | — | Sim (4 genéricos) | ver S7 |
| Evaluators (`selection`, `ordering`) | Sim | — | Sim (`placement`, evidência em 2 etapas) | ver S8 |
| Conteúdo (`placeholder-fixture`) | — | — | Sim | Registro de conteúdo por mundo; fixture de Matemática preservado |

Ciências **não** é aplicação nova: reusa domínio, avaliação, evidência, estado e persistência existentes.

---

## S2 — Arquitetura de aprendizagem da Slice A

| Etapa | Skill | Modo | Propósito | Evidência esperada |
|---|---|---|---|---|
| A. Descobrir ambientes | `SCI-ENV-COMP-01` (+`SCI-OBS-CHAR-01`) | discover | Observar que um ambiente tem muitos elementos; distinguir vivos/não vivos | Seleção guiada + escolha da observação que sustenta a classificação (não conta como autônoma) |
| B. Ambientes brasileiros | `SCI-ENV-BRAZIL-01` | practice | Diferenciar os seis ambientes por características observáveis | Acerto com variação de imagem/representação |
| C. Animal ↔ ambiente | `SCI-ENV-HABITAT-01` (+`SCI-OBS-CHAR-01`) | practice | Relacionar ser vivo ao lugar onde vive, com observação de apoio | Conclusão + evidência (duas etapas) |
| D. Terrestre × aquático | `SCI-ENV-LANDWATER-01` | practice | Classificar por critério explícito e separar habitat de identidade do animal | Classificação + caso conceitual (vive na água ≠ é peixe) |
| E. Adaptação | `SCI-ENV-ADAPT-01` | practice | Ligar característica → função → ambiente | Característica escolhida + função escolhida (duas etapas) |
| F. Camuflagem | `SCI-ENV-CAMOUFLAGE-01` | challenge | Localizar o organismo camuflado **e** escolher por que isso dificulta a detecção | Localização + escolha conceitual; só a segunda etapa vale como evidência da skill |
| G. Desafio integrado | `SCI-ENV-BRAZIL-01` + `SCI-ENV-ADAPT-01` (+ HABITAT) | challenge | Combinar duas dimensões sem virar leitura | Ambiente provável → organismo/característica compatível → por que ajuda |

Regra pedagógica de toda a fatia: nunca "foto do animal → rótulo memorizado → correto". Sempre observação → relação → evidência.

---

## S3 — Primeiro Board de Ciências (PROVISIONAL)

- **Mundo:** Oceano das Descobertas (contêiner de matéria, não currículo aquático).
- **Nome da primeira zona (PROVISIONAL):** *Praia das Conchas* — lado costeiro/entrada, conforme direção provisória já registrada.
- **Composição:** litoral oblíquo em estilo livro ilustrado, poças de maré, rochas, conchas, vegetação costeira, instrumentos de expedição; mar raso visível; *Observatório Abissal* ao longe como antecipação (não entrável).
- **Rota:** trilha ilustrada contínua da areia seca até a linha d'água.
- **Slots (PROVISIONAL): 6** — o menor conjunto que demonstra Discover, prática guiada, prática variada, raciocínio/evidência e desafio integrado. Sem slots de enchimento.
- **Maittê:** presente fisicamente na rota, na posição derivada dos fatos.
- **Landmark da zona (PROVISIONAL):** mesa/barraca de pesquisa da expedição na entrada.
- **Manifestações visuais dos slots:** janela de observação, mesa de mapas, caderno de campo, kit de lupa, aglomerado de conchas/rochas, luneta.
- Ambientes terrestres (Caatinga, Cerrado…) aparecem **através de dispositivos de expedição** (fotos de campo, painel recuperado, projeção), nunca submersos.
- Sem dashboard e sem grade de cards.

---

## S4 — Plano de Activity Slots

| Slot | Modo | Skill(s) | Fonte | Família | Interação | Narração | Evidência | Manifestação visual | Restauração |
|---|---|---|---|---|---|---|---|---|---|
| sci-1 | discover | ENV-COMP-01, OBS-CHAR-01 | pp.94–98 | CH-SCI-SCENE + EVIDENCE | Tocar elementos vivos/não vivos na cena; depois escolher a observação que apoia | "O que existe neste lugar? Toque no que está vivo." + replay | conclusão + evidência (discover, não autônoma) | Janela de observação | Detalhe de poça de maré ganha cor |
| sci-2 | practice | ENV-BRAZIL-01 | pp.99–104 | CH-SCI-MATCH | Relacionar foto de campo ↔ ambiente brasileiro por característica observável | "Que ambiente esta foto mostra?" | acerto com representação variada | Mesa de mapas | Marcador de pesquisa pintado |
| sci-3 | practice | ENV-HABITAT-01, OBS-CHAR-01 | pp.99–106 | CH-SCI-MATCH + EVIDENCE | Colocar o animal no ambiente provável e escolher a observação que sustenta | "Onde este animal provavelmente vive? Como você sabe?" | conclusão + evidência | Quadro de espécimes/fotos | Grupo de conchas colorido |
| sci-4 | practice | ENV-LANDWATER-01 | pp.105–107 | CH-SCI-SORT + CH-SCI-CASE | Classificar exemplos em terrestre/aquático; caso: "vive na água" não permite concluir "é peixe" | "Este vive na água — o que dá para concluir?" | classificação + decisão conceitual | Poça de maré / kit de lupa | Vida da poça de maré aparece |
| sci-5 | challenge | ENV-ADAPT-01 | pp.106–108 | CH-SCI-EVIDENCE (2 etapas) | Escolher a característica e depois o que ela ajuda o animal a fazer naquele ambiente | "Que parte do corpo ajuda? Ajuda a fazer o quê?" | característica + função | Caderno de campo | Instrumento de observação recupera pintura |
| sci-6 | challenge | ENV-CAMOUFLAGE-01 + BRAZIL/ADAPT | p.108 + síntese p.118 | CH-SCI-SCENE + EVIDENCE (integrado) | Localizar o organismo camuflado; identificar o ambiente provável; escolher por que a característica ajuda | "Achou? Agora: por que é difícil de ver?" | localização + conclusão + evidência | Luneta/estação de observação | Coral/planta costeira e marco da rota ganham cor |

Nenhum slot é correspondência de uma única etapa, exceto sci-2, que existe para introduzir o vocabulário visual mínimo com variação de representação.

---

## S5 — Matriz de rastreabilidade de fonte

| Cluster | Skill | Fonte no livro | Status | Relação com o pacote Claude | Adaptação de produto |
|---|---|---|---|---|---|
| Composição do ambiente | ENV-COMP-01 | pp.94–98 | SOURCE-CONFIRMED / OMISSION-RESTORED | Sub-representado no pacote | Restaurado como Discover próprio antes de classificar |
| Observação/comparação de características | OBS-CHAR-01 | pp.68–69, 77–79, 94–98 | SOURCE-CONFIRMED / OMISSION-RESTORED | Sub-representado | Skill de apoio nas etapas de evidência |
| Seis ambientes brasileiros | ENV-BRAZIL-01 | pp.99–104 | SOURCE-CONFIRMED | C1 equivalente | Imagem + fala; sem descrições longas; mais de um identificador por ambiente |
| Animal ↔ ambiente | ENV-HABITAT-01 | pp.99–106 | SOURCE-CONFIRMED | C2 equivalente | Acrescenta etapa de evidência |
| Terrestre × aquático + caso do boto | ENV-LANDWATER-01 | pp.105–107 | SOURCE-CONFIRMED / ADAPTATION | C3 | Vira verificação de concepção errônea, não taxonomia |
| Adaptação | ENV-ADAPT-01 | pp.106–108 | SOURCE-CONFIRMED | C4 | Raciocínio em duas etapas obrigatório |
| Camuflagem | ENV-CAMOUFLAGE-01 | p.108 | SOURCE-CONFIRMED | C5 | Busca visual sozinha não é evidência |
| Síntese integrada | BRAZIL + ADAPT | p.118 (mapa conceitual), p.119 (metas) | SOURCE-CONFIRMED | Sem equivalente direto | Desafio integrado curto, não leitura |

Página 117 permanece `SOURCE-GAP` e não é citada por nenhum pack. Nenhum item de Build depende de material `SECONDARY-ONLY`.

---

## S6 — Plano de Content Packs

Um pack por cluster; os itens finais são autorados no Build e validados item a item contra a fonte fotografada.

1. **pack-sci-env-comp** — ENV-COMP-01. Exemplos: cenas apoiadas na fonte com elementos vivos e não vivos. Representações: cena ilustrada + cartas de observação. Distratores: elementos plausíveis do mesmo cenário, nunca ambíguos entre vivo/não vivo. Regras: conjunto aceito de elementos vivos + uma evidência correta. Templates: `scene-investigate`, `evidence-two-stage`. Narração: instrução + "como você sabe?". Dica: destacar a região da cena sem revelar itens.
2. **pack-sci-env-brazil** — ENV-BRAZIL-01. Seis ambientes nomeados na fonte, cada um com pelo menos duas características observáveis (nunca um único objeto estereotipado). Distratores: ambientes vizinhos com vegetação parecida. Template: `pair-match`. Dica: destacar a característica relevante.
3. **pack-sci-env-habitat** — ENV-HABITAT-01 + OBS-CHAR-01. Animais confirmados pela fonte para cada ambiente. Regras: par correto e evidência correta avaliados separadamente. Templates: `pair-match`, `evidence-two-stage`.
4. **pack-sci-landwater** — ENV-LANDWATER-01. Inclui obrigatoriamente um caso contrastante (animal aquático que não é peixe). Distratores nunca introduzem afirmações biológicas fora da fonte de 2º ano. Templates: `sort-into-groups`, `evidence-two-stage`.
5. **pack-sci-adapt** — ENV-ADAPT-01. Trios característica → função → ambiente apoiados na fonte. Distratores: funções plausíveis mas não sustentadas pela característica. Template: `evidence-two-stage`.
6. **pack-sci-camouflage** — ENV-CAMOUFLAGE-01. Cena com organismo camuflado + pergunta conceitual. A localização nunca é o único critério de acerto. Templates: `scene-investigate` + `evidence-two-stage`.

Regras comuns: nenhum ativo visual codifica a resposta por tamanho, brilho, posição ou saliência; toda instrução essencial é falada, com legenda e replay.

---

## S7 — Plano de templates

| Necessidade | Template existente | Reuso/estender/novo | Contrato genérico proposto | Skills servidas |
|---|---|---|---|---|
| Classificar em grupos por critério autorado | — | **Novo reutilizável** `sort-into-groups` | recebe itens + grupos rotulados; emite `placement` (item → grupo); nunca conhece o critério | LANDWATER e futuras OBS-GROUP/ANIMAL-* |
| Relacionar dois conjuntos | — | **Novo reutilizável** `pair-match` | conjuntos esquerdo/direito embaralhados; emite `placement` de pares; posições randomizadas, sem proximidade reveladora | BRAZIL, HABITAT, ADAPT, futuras REL-* |
| Conclusão + evidência | — | **Novo reutilizável** `evidence-two-stage` | etapa 1 escolhe a conclusão, etapa 2 escolhe a observação; emite uma resposta estruturada única | ADAPT, HABITAT, CAMOUFLAGE, COMP |
| Investigar cena ilustrada | — | **Novo reutilizável** `scene-investigate` | regiões de acerto autoradas por dados; emite `selection` de regionIds; alvos grandes | COMP, CAMOUFLAGE, OBS-CHAR |
| Caso / concepção errônea | — | Configuração de conteúdo sobre `evidence-two-stage` | nenhuma UI nova | LANDWATER |
| Ordenação | `placeholder-order` | Reuso apenas para Matemática | — | — |

Rejeitado explicitamente: `PuzzleAmazonia`, `PuzzleCamuflagemDaOnca`, `PuzzlePantanal` e qualquer tela JSX de currículo. Todo template novo serve pelo menos duas skills e não importa currículo, respostas nem avaliadores.

---

## S8 — Semântica de avaliação científica

Pipeline preservado: Template → `UserResponse` → `ResponseEvaluator` → `EvaluationResult` → `AttemptResult` → `Evidence`.

- **Raciocínio completo:** conclusão correta + evidência correta → `outcome: "correct"`.
- **Conclusão correta, evidência errada:** `outcome: "partially-correct"`, `perTargetOutcome: { conclusion: true, evidence: false }`, `diagnosticCode: "evidence-mismatch"`. Não equivale a sucesso conceitual pleno e não completa o slot em modo challenge.
- **Conclusão incorreta:** `outcome: "incorrect"`; permanece no Challenge Stage para nova tentativa.
- **Sucesso assistido:** `assisted: true` no `AttemptResult`, já propagado ao `EvidenceRecord` e contabilizado à parte por `selectSkillEvidence`.

Nenhum limiar de maestria é definido aqui. O template nunca decide correção científica.

**GAP / PROPOSAL de schema:** `answerRulesSchema` cobre hoje apenas `selection` e `ordering`. A Slice A exige `placement` (pares/grupos) e `evidence` (conclusão + evidência, com resultado por etapa). `EvidenceRecord` também não registra o resultado da etapa de evidência. Proposta: acrescentar as duas variantes, os dois evaluators correspondentes e um campo opcional `reasoningOutcome` em `EvidenceRecord`. Sem isso a distinção "conclusão certa, evidência errada" não é representável. Requer aprovação antes do Build.

---

## S9 — Áudio e companheiro

- **Pet de demonstração proposto: Pipoca.** Motivo: um companheiro curioso e observador combina com expedição/observação e evita consolidar "Burpee = tudo". A escolha é configuração (`petId` na narration config), não regra de matéria; qualquer pet é trocável sem tocar em currículo.
- Fluxo: instrução falada ao abrir, legenda visível e botão de replay, usando a arquitetura de narração existente. Sem TTS remoto, sem microfone, sem ASR, sem motor de áudio específico de Ciências.
- Dica: dirige a atenção ("olhe de novo para as patas deste animal") sem revelar a resposta; usar dica marca `assisted`.
- Retentativa: mensagem que reorienta para a evidência relevante, nunca "Errado".
- Sucesso: reação breve e limitada, seguida do retorno automático já implementado.
- Frases a configurar por slot: instrução, pergunta de evidência, primeiro erro, erro repetido, dica, sucesso e rótulo de confirmação. Gravação final de voz não é pré-requisito.

---

## S10 — Integração com o mundo

1. Overworld: a região `region-science` (Oceano das Descobertas) recebe `worldId` e passa a ser destino real, com o mesmo zoom/transição da Matemática.
2. Entrada: chegada espacial à Praia das Conchas, com Maittê na rota.
3. Board → Challenge: overlay existente, preservando continuidade espacial.
4. Sucesso: fato de conclusão comprometido → reação curta → retorno automático ao mesmo Board → restauração visível → Maittê na próxima posição.
5. Restauração: novas unidades concretas costeiras derivadas de fatos existentes; sem novo store e sem regra "1 atividade = 1 objeto".
6. Retorno ao Overworld pelo mapa dobrado existente.
7. Reload: reconstrói tudo a partir dos fatos persistidos, incluindo posição e restauração.

---

## S11 — Plano de assets

- **Conceito/técnico agora:** cena costeira do Board, objetos de slot, marcadores de rota, unidades de restauração — qualidade de conceito, substituíveis.
- **Assets de interação reutilizáveis:** cartas de foto de campo, cartas de observação/evidência, rótulos de ambiente, cenas de investigação com regiões de acerto autoradas por dados.
- **Substituição futura por produção:** ilustração final do litoral, imagens finais dos seis ambientes, arte final dos animais, criatura narrativa de Ciências.

Sem polimento artístico extenso em JSX/SVG à mão; a arte final não bloqueia a validação pedagógica.

---

## S12 — Estratégia de teste

- Validação Zod de todos os packs e do mundo de Ciências no carregamento, incluindo checagem de que nenhum pack cita a p.117.
- Testes de evaluator: placement, sort e evidência em duas etapas, incluindo "conclusão certa + evidência errada".
- Testes de template: emitem apenas `UserResponse` e não importam avaliador nem currículo.
- Arrastar e alternativa confiável por toque em todos os templates novos.
- Fluxo de evidência em duas etapas, sem pular a etapa 2.
- Tentativa incorreta permanece no Challenge Stage.
- Retorno automático após sucesso, sem reset do arranjo local.
- Persistência/reload reconstrói progresso e restauração.
- Restauração derivada de fatos.
- Replay de narração e legenda sempre presentes.
- Layout em tablet paisagem com alvos de toque grandes.
- Movimento reduzido respeitado.

---

## S13 — Registro GAP / CONFLICT / ASSUMPTION

**[GAP] — answerRules e evidência não cobrem Ciências**
Descrição: o schema só tem `selection` e `ordering`; faltam `placement` e `evidence`; `EvidenceRecord` não registra a etapa de evidência.
Fonte/Spec: `src/game/domain/schemas.ts`, `src/game/domain/responses.ts`, SCIENCE-GRADE-2 §6.
Consequência: impossível distinguir conclusão correta com evidência errada.
Tratamento proposto: acrescentar variantes, evaluators e campo opcional conforme S8.
Resolver antes do Build? **SIM**

**[GAP] — Registro de conteúdo por mundo inexistente**
Descrição: as rotas importam `placeholder-fixture` diretamente e rejeitam qualquer `worldId` diferente.
Consequência: Ciências não pode coexistir com Matemática.
Tratamento: registro de mundos/packs/atividades por id, preservando o fixture de Matemática.
Resolver antes do Build? **SIM**

**[GAP] — Sequência discover/practice/challenge nunca executada**
Descrição: o Challenge Stage resolve apenas `challenge[0]` e `items[0]`.
Consequência: os modos de aprendizagem da Slice A não rodam.
Tratamento: orquestração por modo e por item dentro do slot.
Resolver antes do Build? **SIM**

**[GAP] — Política de maestria**
Descrição: nenhum limiar aprovado; a sugestão de "dois dias" do pacote Claude não é política do motor.
Tratamento: continuar emitindo evidência bruta, sem rótulo de maestria.
Resolver antes do Build? **NÃO**

**[ASSUMPTION] — 6 slots e nome "Praia das Conchas"**
Fonte/Spec: SCIENCE-WORLD §5 marca a primeira zona como PROVISIONAL.
Tratamento: manter PROVISIONAL, ajustável na revisão visual.
Resolver antes do Build? **NÃO**

**[ASSUMPTION] — Pipoca como pet de demonstração**
Tratamento: configuração; trocável sem mudar currículo. Nenhum pet fica preso a Ciências.
Resolver antes do Build? **NÃO**

**[GAP] — Exemplos finais de animais/ambientes**
Descrição: os itens exatos exigem validação contra as fotos das pp.94–108 no momento da autoria.
Tratamento: autorar no Build com revisão de fonte item a item; nenhum fato biológico inventado.
Resolver antes do Build? **NÃO** (mas bloqueia o envio de cada item)

**[CONFLICT] — Nenhum identificado** entre as specs lidas.

---

## S14 — Sequência de Build

1. **Costura de conteúdo:** registro de mundos/packs por id; Matemática preservada; validação Zod; Ciências entrável pelo Overworld.
2. **Extensões de avaliação:** answerRules `placement` e `evidence`, evaluators correspondentes, semântica de `partially-correct` e testes puros.
3. **Templates reutilizáveis:** `sort-into-groups`, `pair-match`, `evidence-two-stage`, `scene-investigate`, com arrastar + toque.
4. **Orquestração por modo:** discover → practice → challenge dentro do slot, com assistência registrada.
5. **Board Praia das Conchas:** cena de conceito, rota, 6 slots, manifestações visuais e unidades de restauração costeiras.
6. **Narração e companheiro:** falas por slot, replay, dicas e reações.
7. **Endurecimento:** testes de reload/restauração/tablet/movimento reduzido e revisão da rastreabilidade de fonte.

O Build é interrompível após o passo 7. Nenhuma fatia B/C/D de Ciências e nenhum conteúdo de Matemática entram neste Build.

---

## S15 — Prontidão

`SCIENCE SLICE A NOT READY FOR BUILD`

Bloqueadores:

1. Aprovação da extensão de schema para `placement` / `evidence` e do campo opcional de resultado de raciocínio (S8).
2. Aprovação do registro de conteúdo por mundo e da orquestração por modo dentro do slot (S13).
3. Confirmação do escopo provisório do primeiro Board: nome da zona e contagem de 6 slots (S3).