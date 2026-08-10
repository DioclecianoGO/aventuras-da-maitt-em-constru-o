# Science Slice A — Reconciliação do plano

Só reconciliação. O restante do plano aprovado (S1–S15) permanece autoritativo onde não conflita com este documento.

---

## R1 — Arquitetura de avaliação (ADR-010 confirmada)

A proposta anterior de um response kind `evidence` e de `reasoningOutcome` está **retirada**. Vale ADR-010.

- **`placement`** (kind já existente em `UserResponse`): usado para item → categoria, item → grupo, item → alvo e pareamento representado como relação item/alvo estável. Adiciona-se uma variante genérica `placement` em `answerRulesSchema` (um ou mais mapeamentos aceitos, com detalhe opcional por alvo) e um evaluator puro `placement`.
- **`composition`** (kind já existente): usado para resposta multi-parte autorada, por exemplo `conclusion → opção` e `evidence → observação`. Adiciona-se variante genérica `composition` em `answerRulesSchema` e evaluator puro `composition`. Os ids de parte são identificadores de conteúdo autorado; o domínio não lhes atribui semântica de Ciências.
- Resultado usa apenas campos genéricos já existentes em `EvaluationResult`: `outcome`, `perTargetOutcome`, `diagnosticCode`, `matchedAnswerId`.
- `EvidenceRecord` ganha apenas `perTargetOutcome?` e `diagnosticCode?` opcionais e genéricos, copiados por `toEvidence()` quando presentes.
- **Não** serão criados: kind `evidence`, `reasoningOutcome`, `scienceEvidence` nem qualquer campo específico de matéria no domínio compartilhado.
- Templates continuam emitindo `UserResponse` cru; evaluators continuam puros e sem UI (ADR-009 intacta).

Semântica confirmada (R9 do pedido): conclusão certa + evidência certa → `correct`; conclusão certa + evidência errada → `partially-correct` com detalhe por parte e `diagnosticCode`, **sem** completar a Challenge Activity; conclusão errada → `incorrect` com retentativa no lugar; sucesso com apoio → `assisted: true` registrado à parte. Nenhum limiar de maestria é introduzido.

---

## R2 — Registro de conteúdo multi-mundo

Registro local/estático único, conforme `docs/technical/CONTENT-ORCHESTRATION.md`, resolvendo por id: Subject, WorldConfig, ActivitySlot, Activity, ContentPack e PackItem no contexto do pack/activity.

- Matemática continua registrada e funcional: o fixture atual passa a ser **um** conjunto registrado, não a fonte importada diretamente pelas rotas.
- Ciências entra como outro conjunto registrado (mundo `Oceano das Descobertas` + packs Slice A).
- `/mundo/$worldId`, `/mundo/$worldId/index` e `/mundo/$worldId/desafio/$slotId` deixam de importar `placeholder-fixture` e passam a resolver pelo registro; o `loader` valida o id pelo registro e lança `notFound()` quando não existir. Nenhuma cópia de rota por matéria.
- Configuração validada por Zod no carregamento; ids inválidos falham explicitamente em desenvolvimento.
- O registro educacional permanece separado do registro visual/cenário (`src/visual/world-config`, `assetRegistry`): nenhum asset entra no domínio, nenhum dado curricular entra na configuração visual.
- Sem backend, CMS, Supabase ou entrega remota de conteúdo.

---

## R3 — Orquestração da sequência dentro do Slot

Cada Slot executa `discover? → practice[] → challenge[]`. Nenhum Slot é uma única Activity.

Exemplo concreto — **Slot 4 (terrestre × aquático)**:

1. A criança entra no Slot 4. O orquestrador resolve a primeira Activity incompleta comparando a sequência configurada com `SlotFacts.completedActivityIds`: `sci4-discover`.
2. `sci4-discover` (mode `discover`, template de investigação de cena, resposta `selection`) estabelece o critério terrestre/aquático. Acerto → evidência registrada com `mode: "discover"`, Activity marcada como concluída, reação curta, e o **mesmo** Challenge Stage avança para a próxima Activity. Nenhum `SLOT_COMPLETED`.
3. `sci4-practice-1` (mode `practice`, ordenação em grupos, resposta `placement`) classifica os animais aprovados da p.105. Acerto → mesma lógica, avança no lugar. Erro → permanece, com fala de reorientação.
4. `sci4-challenge-1` (mode `challenge`, multi-parte, resposta `composition`) apresenta o contraste do boto-vermelho: conclusão ("vive na água") + evidência ("é mamífero e sobe à superfície para respirar"). `partially-correct` **não** conclui a Activity; a criança tenta de novo.
5. Somente quando discover + todas as practice + todas as challenge estão concluídas: `SLOT_COMPLETED` é despachado, ocorre a reação final limitada, retorno automático ao mesmo Science Board, restauração visível derivada dos fatos e Maittê avança para o próximo slot derivado.
6. **Reload no meio:** ao reabrir o Slot 4 com `completedActivityIds = [sci4-discover]`, o orquestrador retoma em `sci4-practice-1`. Nenhum `currentActivityIndex` é persistido; a retomada é derivada dos fatos existentes.

`Activity.mode` é a única fonte de modo em AttemptResult/Evidence — nunca inferido da posição no Board, do cenário ou do template. Apoio usado permanece registrado separadamente e não vira evidência autônoma de Challenge.

---

## R4 — Plano corrigido dos seis Slots

| Slot | Skill(s) | Fonte | Discover | Practice | Challenge | Famílias genéricas de template |
|---|---|---|---|---|---|---|
| 1 — Investigação do ambiente | SCI-ENV-COMP-01 (+ SCI-OBS-CHAR-01) | pp.94–98 | Inspecionar um ambiente natural e notar vários elementos | Classificar observações vivas/não vivas com critério explícito | Concluir e escolher a observação que sustenta | cena (`selection`) + multi-parte (`composition`) |
| 2 — Ambientes brasileiros | SCI-ENV-BRAZIL-01 | pp.99–101; apoio pp.106–107 | Apresentação visual/falada dos seis ambientes | Identificar/parear ambiente por mais de uma pista observável | Identificar ambiente a partir de nova pista dentro da fonte, sem texto longo | pareamento (`placement`) |
| 3 — Animal e ambiente | SCI-ENV-HABITAT-01 (+ SCI-OBS-CHAR-01) | pp.99–101, p.106, p.107 | Observar exemplos de animais e onde vivem | Pareamento organismo ↔ ambiente | Escolher ambiente e depois a pista/evidência de apoio | pareamento (`placement`) + multi-parte (`composition`) |
| 4 — Água ou terra como critério | SCI-ENV-LANDWATER-01 | p.105; contraste p.102 | Estabelecer o critério terrestre × aquático | Classificar os animais apresentados na p.105 | Contraste conceitual: "vive na água" não implica "é peixe" | grupos (`placement`) + multi-parte (`composition`) |
| 5 — Adaptação | SCI-ENV-ADAPT-01 | pp.102–103 | Observar uma característica e o que ela ajuda o animal a fazer | Pareamento característica ↔ função | Resposta multi-parte com característica/função em contexto da fonte | pareamento (`placement`) + multi-parte (`composition`) |
| 6 — Camuflagem + investigação integrada | SCI-ENV-CAMOUFLAGE-01 (+ skills anteriores da Slice A) | p.104 e p.106; síntese p.118 | Exemplos de camuflagem da fonte | Investigação de cena com áreas de toque grandes | Localizar o organismo/pista **e** escolher por que a camuflagem dificulta a detecção, podendo integrar ambiente/adaptação | cena (`selection`) + multi-parte (`composition`) |

Sem slots de enchimento. Os seis são colocações curriculares provisórias, não cenário permanente nomeado por skill. Zona inicial `Praia das Conchas` em `Oceano das Descobertas`, PROVISIONAL. p.108 só como material de revisão de animais amazônicos; pp.118–119 só como síntese/metas; p.117 proibida.

---

## R5 — Guarda de autoria de fonte

1. Itens só podem instanciar relações já presentes nas âncoras e sementes aprovadas do `SCIENCE-SLICE-A-BUILD-GATE.md` (ambientes brasileiros, classificação p.105, contraste do boto, adaptações, camuflagem) ou em outra Spec aprovada.
2. O agente de implementação não inventa fato biológico a partir de conhecimento geral, inclusive para distratores: distratores são plausíveis, mas nunca afirmam biologia não apoiada.
3. Se um item exigir um fato ausente das Specs, o item **para** e é reportado como `SOURCE-GAP`; nada é preenchido por conhecimento geral.
4. Cada item/cluster do Content Pack carrega metadados de fonte (página/intervalo aprovado) suficientes para rastreio, validados no carregamento.
5. Validação automática recusa qualquer referência à p.117.
6. O primeiro Build cria um conjunto pequeno e revisado, suficiente para rodar as seis estações — não um banco gerado.

---

## R6 — Companheiro

**Burpee** é o companheiro padrão do primeiro Build de Ciências, apenas como configuração técnica/demo: o seam de asset, atuação e áudio já existe e sua apresentação estratégica combina com perguntas de evidência. Nada codifica "Burpee = Ciências": `petId` continua sendo configuração de narração por slot, trocável sem mudar pedagogia ou arquitetura. Nenhuma arte de produção de Pipoca, Will ou Lyra é criada neste Build; um asset revisado futuro pode substituir o pet configurado pelo seam existente.

---

## R7 — GAP / CONFLICT / ASSUMPTION remanescentes

**[ASSUMPTION] — Zona `Praia das Conchas` e 6 slots**
PROVISIONAL, aprovado no Build Gate §3; ajustável em revisão visual. Não bloqueia.

**[ASSUMPTION] — Nomes de campo das novas AnswerRules**
`CONFIG-SCHEMAS` permite evolução de nomes desde que as regras de propriedade sejam preservadas; os nomes exatos de `placement`/`composition` serão fixados no Build. Não bloqueia.

**[GAP] — Política de maestria**
Permanece sem limiar aprovado; o motor continua emitindo evidência bruta sem rótulo de maestria. Não bloqueia.

**[GAP] — Imagens de fonte por item**
Alguns exemplos da p.107 exigem cópia fiel dos animais da imagem da fonte. Tratamento: usar apenas exemplos já listados nas sementes aprovadas e reportar `SOURCE-GAP` para os demais. Não bloqueia o Build; bloqueia itens individuais.

Nenhum CONFLICT identificado. Bloqueadores anteriores (schemas de avaliação, registro multi-mundo, orquestração por modo, escopo do Board) estão resolvidos por ADR-010, `CONTENT-ORCHESTRATION.md` e o Build Gate.

---

## R8 — Prontidão

`SCIENCE SLICE A READY FOR BUILD`