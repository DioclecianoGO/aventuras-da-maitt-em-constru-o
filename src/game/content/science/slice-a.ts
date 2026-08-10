/**
 * SCIENCE SLICE A — Ambientes, Animais & Adaptações.
 *
 * Source authority: docs/pedagogy/SCIENCE-SLICE-A-BUILD-GATE.md (approved
 * anchors + source-bounded seeds), docs/pedagogy/SCIENCE-SOURCE-MAP.md,
 * docs/pedagogy/SCIENCE-GRADE-2.md.
 *
 * HARD AUTHORING RULE: every scientific relationship below is traceable to an
 * approved anchor recorded in `source`. No fact was added from general
 * knowledge. Textbook p.117 is SOURCE-GAP and is never referenced (schema
 * validation rejects it).
 *
 * Distractors are recombinations of already-approved tokens presented as
 * options to evaluate; none of them asserts a new biological claim.
 */
import {
  activitySchema,
  activitySlotSchema,
  contentPackSchema,
  curriculumSchema,
  skillSchema,
  subjectSchema,
  worldConfigSchema,
  type Activity,
  type ContentPack,
  type Curriculum,
  type Skill,
  type Subject,
  type WorldConfig,
} from "@/game/domain/schemas";
import type { ContentBundle } from "@/game/content/registry";

export const SCIENCE_WORLD_ID = "world-science-oceano";
export const SCIENCE_SUBJECT_ID = "subject-science";
const CURRICULUM_ID = "curriculum-science-grade-2";
const SEGMENT_ID = "praia-das-conchas";
const WORK = "livro-ciencias-2ano";

const src = (pages: number[], seed: string) => ({ work: WORK, pages, audit: "SOURCE-CONFIRMED" as const, seed });

export const scienceSubject: Subject = subjectSchema.parse({
  id: SCIENCE_SUBJECT_ID,
  name: "Ciências",
  worldId: SCIENCE_WORLD_ID,
});

export const scienceCurriculum: Curriculum = curriculumSchema.parse({
  id: CURRICULUM_ID,
  subjectId: SCIENCE_SUBJECT_ID,
  gradeLabel: "2º ano",
  source: "Livro de Ciências — 2º ano, pp.94–108 e 118–119",
});

const skill = (id: string, group: string, name: string): Skill =>
  skillSchema.parse({ id, curriculumId: CURRICULUM_ID, group, name, placeholder: false });

export const scienceSkills: Skill[] = [
  skill("SCI-ENV-COMP-01", "Ambientes", "Observar o que compõe um ambiente natural"),
  skill("SCI-ENV-BRAZIL-01", "Ambientes", "Reconhecer ambientes brasileiros por suas pistas"),
  skill("SCI-ENV-HABITAT-01", "Ambientes", "Relacionar um animal ao ambiente onde vive"),
  skill("SCI-ENV-LANDWATER-01", "Ambientes", "Distinguir ambientes aquáticos e terrestres"),
  skill("SCI-ENV-ADAPT-01", "Adaptações", "Relacionar característica, função e ambiente"),
  skill("SCI-ENV-CAMOUFLAGE-01", "Adaptações", "Explicar como a camuflagem dificulta a percepção"),
  skill("SCI-OBS-CHAR-01", "Observação", "Observar e descrever características observáveis"),
];

/* ------------------------------------------------------------------ *
 * Content packs — one principal required item per Activity (Slice A). *
 * ------------------------------------------------------------------ */

const packs: ContentPack[] = [
  /* SLOT 1 — environment investigation (pp.94–98) */
  contentPackSchema.parse({
    id: "pack-sci-s1-discover",
    skillIds: ["SCI-ENV-COMP-01", "SCI-OBS-CHAR-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([94, 95, 96, 97, 98], "abertura: investigar um ambiente natural e o que existe nele"),
    items: [
      {
        id: "item-sci-s1-d1",
        prompt: "Observe o ambiente e toque em algo que faz parte dele.",
        representation: "pictorial",
        source: src([94, 95, 96], "um ambiente natural tem muitos elementos"),
        options: [
          { id: "obs-planta", label: "uma planta" },
          { id: "obs-passaro", label: "um pássaro" },
          { id: "obs-pedra", label: "uma pedra" },
          { id: "obs-agua", label: "a água" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [
            { id: "planta", optionIds: ["obs-planta"] },
            { id: "passaro", optionIds: ["obs-passaro"] },
            { id: "pedra", optionIds: ["obs-pedra"] },
            { id: "agua", optionIds: ["obs-agua"] },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez: o que você consegue ver neste lugar?",
      repeatedError: "Vamos observar juntos e tocar em uma coisa que está no ambiente.",
      hints: ["Tudo o que você vê aqui faz parte do ambiente."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s1-practice",
    skillIds: ["SCI-ENV-COMP-01", "SCI-OBS-CHAR-01"],
    representation: "pictorial",
    eligibleTemplates: ["group-sort"],
    source: src([94, 95, 96, 97, 98], "elementos vivos e não vivos que compõem o ambiente"),
    items: [
      {
        id: "item-sci-s1-p1",
        prompt: "Separe o que é ser vivo e o que não é ser vivo neste ambiente.",
        representation: "pictorial",
        source: src([94, 96], "composição do ambiente: seres vivos e elementos não vivos"),
        options: [
          { id: "el-arvore", label: "árvore" },
          { id: "el-caranguejo", label: "caranguejo" },
          { id: "el-pedra", label: "pedra" },
          { id: "el-agua", label: "água" },
        ],
        targets: [
          { id: "grp-vivo", label: "Seres vivos" },
          { id: "grp-nao-vivo", label: "Não vivos" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "vivo-nao-vivo",
              mapping: [
                { itemId: "el-arvore", targetId: "grp-vivo" },
                { itemId: "el-caranguejo", targetId: "grp-vivo" },
                { itemId: "el-pedra", targetId: "grp-nao-vivo" },
                { itemId: "el-agua", targetId: "grp-nao-vivo" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: qual deles nasce, cresce e precisa de alimento?",
      repeatedError: "Qual detalhe ajuda a descobrir se aquilo é um ser vivo?",
      hints: ["Seres vivos crescem e precisam de alimento."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s1-challenge",
    skillIds: ["SCI-ENV-COMP-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([94, 95, 96, 97, 98], "o ambiente é formado por muitos elementos diferentes"),
    items: [
      {
        id: "item-sci-s1-c1",
        prompt: "Escolha a conclusão e a observação que a apoia.",
        representation: "pictorial",
        source: src([94, 96], "observação do ambiente e seus elementos"),
        parts: [
          { id: "conclusion", label: "O que dá para concluir sobre este ambiente?" },
          { id: "evidence", label: "Qual observação mostra isso?" },
        ],
        options: [
          { id: "conc-muitos", partId: "conclusion", label: "Este ambiente tem muitos elementos diferentes." },
          { id: "conc-so-areia", partId: "conclusion", label: "Neste ambiente só existe areia." },
          { id: "ev-varios", partId: "evidence", label: "Vejo plantas, animais e água no mesmo lugar." },
          { id: "ev-uma-pedra", partId: "evidence", label: "Vejo apenas uma pedra." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-muitos"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-varios"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s1-evidence-mismatch", incorrect: "sci-s1-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: o que você viu junto neste lugar?",
      repeatedError: "Qual observação mostra que existem muitas coisas diferentes aqui?",
      hints: ["Conte quantos tipos diferentes de coisas aparecem."],
    },
  }),

  /* SLOT 2 — Brazilian environments (pp.99–101, review pp.106–107) */
  contentPackSchema.parse({
    id: "pack-sci-s2-discover",
    skillIds: ["SCI-ENV-BRAZIL-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([99, 100, 101], "seis ambientes brasileiros apresentados no livro"),
    items: [
      {
        id: "item-sci-s2-d1",
        prompt: "Esta é uma floresta grande e úmida, onde chove muito. Toque no nome dela.",
        representation: "pictorial",
        source: src([99], "Floresta Amazônica: floresta grande e úmida, com chuvas frequentes"),
        options: [
          { id: "amb-amazonia", label: "Floresta Amazônica" },
          { id: "amb-caatinga", label: "Caatinga" },
          { id: "amb-pampa", label: "Pampa" },
          { id: "amb-cerrado", label: "Cerrado" },
          { id: "amb-pantanal", label: "Pantanal" },
          { id: "amb-mata", label: "Mata Atlântica" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [{ id: "amazonia", optionIds: ["amb-amazonia"] }],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: chove muito e a floresta é bem úmida.",
      repeatedError: "Qual ambiente do livro é a floresta grande e úmida?",
      hints: ["É a maior floresta úmida do livro."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s2-practice",
    skillIds: ["SCI-ENV-BRAZIL-01"],
    representation: "pictorial",
    eligibleTemplates: ["pair-match"],
    source: src([99, 100, 101], "pistas de clima, vegetação e animais de cada ambiente"),
    items: [
      {
        id: "item-sci-s2-p1",
        prompt: "Leve cada pista até o ambiente brasileiro certo.",
        representation: "pictorial",
        source: src([100, 101], "Caatinga: mandacaru/xique-xique; Cerrado: lobo-guará; Pampa: campos e gato-dos-pampas; Pantanal: planície que alaga"),
        options: [
          { id: "pista-mandacaru", label: "calor seco e plantas com espinhos, como o mandacaru" },
          { id: "pista-lobo", label: "épocas seca e chuvosa, árvores tortas e o lobo-guará" },
          { id: "pista-gato", label: "clima mais frio, campos baixos e o gato-dos-pampas" },
          { id: "pista-jacare", label: "planície que alaga na chuva, com o jacaré-de-papo-amarelo" },
        ],
        targets: [
          { id: "amb-caatinga", label: "Caatinga" },
          { id: "amb-cerrado", label: "Cerrado" },
          { id: "amb-pampa", label: "Pampa" },
          { id: "amb-pantanal", label: "Pantanal" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "ambientes",
              mapping: [
                { itemId: "pista-mandacaru", targetId: "amb-caatinga" },
                { itemId: "pista-lobo", targetId: "amb-cerrado" },
                { itemId: "pista-gato", targetId: "amb-pampa" },
                { itemId: "pista-jacare", targetId: "amb-pantanal" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: fale sobre a chuva e sobre as plantas.",
      repeatedError: "Qual detalhe do clima ajuda a descobrir o ambiente?",
      hints: ["Cada pista fala do clima e de quem vive lá."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s2-challenge",
    skillIds: ["SCI-ENV-BRAZIL-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([100, 106], "Caatinga: quente e seca, plantas com espinhos; identificação por pistas"),
    items: [
      {
        id: "item-sci-s2-c1",
        prompt: "Faz muito calor e chove pouco. Qual é o ambiente e qual pista mostra isso?",
        representation: "pictorial",
        source: src([100], "Caatinga: calor, pouca chuva, mandacaru e xique-xique"),
        parts: [
          { id: "conclusion", label: "Qual é o ambiente?" },
          { id: "evidence", label: "Qual pista mostra isso?" },
        ],
        options: [
          { id: "conc-caatinga", partId: "conclusion", label: "Caatinga" },
          { id: "conc-pantanal", partId: "conclusion", label: "Pantanal" },
          { id: "ev-espinhos", partId: "evidence", label: "As plantas têm espinhos e caule grosso, como o mandacaru." },
          { id: "ev-alaga", partId: "evidence", label: "A planície alaga na época das chuvas." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-caatinga"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-espinhos"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s2-evidence-mismatch", incorrect: "sci-s2-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: como são as plantas deste lugar?",
      repeatedError: "Qual detalhe das plantas ajuda a descobrir o ambiente?",
      hints: ["Pense em plantas que guardam água."],
    },
  }),

  /* SLOT 3 — animal and environment (pp.99–101, 106, 107) */
  contentPackSchema.parse({
    id: "pack-sci-s3-discover",
    skillIds: ["SCI-ENV-HABITAT-01", "SCI-OBS-CHAR-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([99, 106], "boto-cor-de-rosa aparece como animal da Floresta Amazônica"),
    items: [
      {
        id: "item-sci-s3-d1",
        prompt: "O boto-cor-de-rosa aparece em qual ambiente do livro?",
        representation: "pictorial",
        source: src([99, 106], "ambiente quente e chuvoso com boto-cor-de-rosa → Floresta Amazônica"),
        options: [
          { id: "amb-amazonia", label: "Floresta Amazônica" },
          { id: "amb-pampa", label: "Pampa" },
          { id: "amb-caatinga", label: "Caatinga" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [{ id: "amazonia", optionIds: ["amb-amazonia"] }],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: onde chove muito e há rios grandes?",
      repeatedError: "Qual ambiente do livro mostra o boto?",
      hints: ["É o ambiente mais úmido do livro."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s3-practice",
    skillIds: ["SCI-ENV-HABITAT-01"],
    representation: "pictorial",
    eligibleTemplates: ["pair-match"],
    source: src([101, 106, 107], "revisão animal ↔ ambiente brasileiro"),
    items: [
      {
        id: "item-sci-s3-p1",
        prompt: "Leve cada animal até o ambiente onde o livro mostra ele.",
        representation: "pictorial",
        source: src([106, 107], "lobo-guará → Cerrado; mico-leão-dourado → Mata Atlântica; jacaré-de-papo-amarelo → Pantanal"),
        options: [
          { id: "an-lobo", label: "lobo-guará" },
          { id: "an-mico", label: "mico-leão-dourado" },
          { id: "an-jacare", label: "jacaré-de-papo-amarelo" },
        ],
        targets: [
          { id: "amb-cerrado", label: "Cerrado" },
          { id: "amb-mata", label: "Mata Atlântica" },
          { id: "amb-pantanal", label: "Pantanal" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "animais",
              mapping: [
                { itemId: "an-lobo", targetId: "amb-cerrado" },
                { itemId: "an-mico", targetId: "amb-mata" },
                { itemId: "an-jacare", targetId: "amb-pantanal" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: lembre onde o livro mostrou cada animal.",
      repeatedError: "Qual ambiente combina com esse animal?",
      hints: ["Volte às páginas dos ambientes brasileiros."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s3-challenge",
    skillIds: ["SCI-ENV-HABITAT-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([106], "pista do Cerrado: lobo-guará e queimadas naturais que não prejudicam plantas adaptadas"),
    items: [
      {
        id: "item-sci-s3-c1",
        prompt: "Descubra o ambiente e escolha a pista que mostra isso.",
        representation: "pictorial",
        source: src([106], "identificação de ambiente por pistas"),
        parts: [
          { id: "conclusion", label: "Qual é o ambiente?" },
          { id: "evidence", label: "Qual pista mostra isso?" },
        ],
        options: [
          { id: "conc-cerrado", partId: "conclusion", label: "Cerrado" },
          { id: "conc-amazonia", partId: "conclusion", label: "Floresta Amazônica" },
          { id: "ev-lobo", partId: "evidence", label: "O lobo-guará vive ali e as plantas suportam o fogo natural." },
          { id: "ev-boto", partId: "evidence", label: "O boto-cor-de-rosa nada nos rios." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-cerrado"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-lobo"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s3-evidence-mismatch", incorrect: "sci-s3-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: quem vive ali e como são as plantas?",
      repeatedError: "Qual detalhe ajuda a descobrir o ambiente?",
      hints: ["Um dos animais só aparece nesse ambiente do livro."],
    },
  }),

  /* SLOT 4 — land or water as habitat criterion (p.105, boto p.102) */
  contentPackSchema.parse({
    id: "pack-sci-s4-discover",
    skillIds: ["SCI-ENV-LANDWATER-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([102, 103, 105], "ambientes terrestres e aquáticos"),
    items: [
      {
        id: "item-sci-s4-d1",
        prompt: "Toque no ambiente aquático.",
        representation: "pictorial",
        source: src([102, 105], "distinção entre ambiente aquático e terrestre"),
        options: [
          { id: "amb-agua", label: "o mar" },
          { id: "amb-terra", label: "o campo" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [{ id: "aquatico", optionIds: ["amb-agua"] }],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez: em qual deles a água é o lugar de viver?",
      repeatedError: "Ambiente aquático é o ambiente de água.",
      hints: ["Aquático vem de água."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s4-practice",
    skillIds: ["SCI-ENV-LANDWATER-01"],
    representation: "pictorial",
    eligibleTemplates: ["group-sort"],
    source: src([105], "atividade do livro: agrupar animais em aquáticos e terrestres"),
    items: [
      {
        id: "item-sci-s4-p1",
        prompt: "Separe os animais em aquáticos e terrestres.",
        representation: "pictorial",
        source: src([105], "aquáticos: orca, foca, polvo, água-viva; terrestres: tucano, ema, tatu, vaca, leão"),
        options: [
          { id: "an-orca", label: "orca" },
          { id: "an-polvo", label: "polvo" },
          { id: "an-tucano", label: "tucano" },
          { id: "an-tatu", label: "tatu" },
        ],
        targets: [
          { id: "grp-aquatico", label: "Aquáticos" },
          { id: "grp-terrestre", label: "Terrestres" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "agua-terra",
              mapping: [
                { itemId: "an-orca", targetId: "grp-aquatico" },
                { itemId: "an-polvo", targetId: "grp-aquatico" },
                { itemId: "an-tucano", targetId: "grp-terrestre" },
                { itemId: "an-tatu", targetId: "grp-terrestre" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: onde este animal vive, na água ou na terra?",
      repeatedError: "Qual detalhe mostra o lugar onde ele vive?",
      hints: ["Pense no lugar onde o animal passa a vida."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s4-challenge",
    skillIds: ["SCI-ENV-LANDWATER-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([102], "boto-vermelho é apresentado como mamífero que sobe à superfície para respirar"),
    items: [
      {
        id: "item-sci-s4-c1",
        prompt: "O boto-cor-de-rosa vive na água. Só por isso já dá para dizer que ele é um peixe?",
        representation: "pictorial",
        source: src([102], "habitat e grupo do animal são coisas diferentes"),
        parts: [
          { id: "conclusion", label: "O que dá para responder?" },
          { id: "evidence", label: "Qual observação do livro mostra isso?" },
        ],
        options: [
          { id: "conc-nao", partId: "conclusion", label: "Não. Viver na água, sozinho, não diz isso." },
          { id: "conc-sim", partId: "conclusion", label: "Sim. Quem vive na água é peixe." },
          { id: "ev-mamifero", partId: "evidence", label: "O livro mostra o boto como mamífero, que sobe à superfície para respirar." },
          { id: "ev-nada", partId: "evidence", label: "O boto nada muito rápido." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-nao"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-mamifero"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s4-evidence-mismatch", incorrect: "sci-s4-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: o que o livro conta sobre a respiração do boto?",
      repeatedError: "Qual detalhe mostra que o lugar de viver não conta tudo sobre o animal?",
      hints: ["O boto precisa subir para respirar."],
    },
  }),

  /* SLOT 5 — adaptation: characteristic -> function (pp.102–103) */
  contentPackSchema.parse({
    id: "pack-sci-s5-discover",
    skillIds: ["SCI-ENV-ADAPT-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([102, 103], "características do corpo e do comportamento que ajudam o animal a viver onde vive"),
    items: [
      {
        id: "item-sci-s5-d1",
        prompt: "Para que serve a língua comprida do tamanduá-bandeira?",
        representation: "pictorial",
        source: src([102, 103], "tamanduá-bandeira: língua comprida ajuda a capturar formigas e cupins"),
        options: [
          { id: "fn-formigas", label: "para capturar formigas e cupins" },
          { id: "fn-nadar", label: "para nadar mais rápido" },
          { id: "fn-subir", label: "para subir em árvores" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [{ id: "formigas", optionIds: ["fn-formigas"] }],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: o que o tamanduá come?",
      repeatedError: "Qual detalhe da língua comprida ajuda a descobrir?",
      hints: ["A língua entra em lugares bem estreitos."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s5-practice",
    skillIds: ["SCI-ENV-ADAPT-01"],
    representation: "pictorial",
    eligibleTemplates: ["pair-match"],
    source: src([102, 103], "relações característica → função aprovadas"),
    items: [
      {
        id: "item-sci-s5-p1",
        prompt: "Leve cada característica até aquilo que ela ajuda o animal a fazer.",
        representation: "pictorial",
        source: src([102, 103], "guelras → oxigênio da água; nadadeiras → movimento na água; patas em remo → nadar; boa visão do veado-campeiro → perceber predadores"),
        options: [
          { id: "car-guelras", label: "guelras do peixe" },
          { id: "car-nadadeiras", label: "nadadeiras do peixe" },
          { id: "car-patas-remo", label: "patas em forma de remo da tartaruga-marinha" },
          { id: "car-visao", label: "boa visão do veado-campeiro" },
        ],
        targets: [
          { id: "fn-oxigenio", label: "obter oxigênio da água" },
          { id: "fn-mover-agua", label: "mover-se na água" },
          { id: "fn-nadar", label: "nadar" },
          { id: "fn-perceber", label: "perceber predadores e fugir" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "caracteristica-funcao",
              mapping: [
                { itemId: "car-guelras", targetId: "fn-oxigenio" },
                { itemId: "car-nadadeiras", targetId: "fn-mover-agua" },
                { itemId: "car-patas-remo", targetId: "fn-nadar" },
                { itemId: "car-visao", targetId: "fn-perceber" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: para que serve essa parte do corpo?",
      repeatedError: "Qual detalhe mostra o que essa característica ajuda a fazer?",
      hints: ["Pense no ambiente onde o animal vive."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s5-challenge",
    skillIds: ["SCI-ENV-ADAPT-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([102, 103], "macaco-prego: braços, pernas e dedos ajudam a se mover e subir nas árvores"),
    items: [
      {
        id: "item-sci-s5-c1",
        prompt: "O macaco-prego vive na floresta. O que ele consegue fazer, e por quê?",
        representation: "pictorial",
        source: src([102, 103], "característica → função → relação com o ambiente"),
        parts: [
          { id: "conclusion", label: "O que ele consegue fazer no ambiente dele?" },
          { id: "evidence", label: "Qual característica ajuda nisso?" },
        ],
        options: [
          { id: "conc-subir", partId: "conclusion", label: "Consegue subir e se mover pelas árvores." },
          { id: "conc-respirar-agua", partId: "conclusion", label: "Consegue obter oxigênio da água." },
          { id: "ev-bracos", partId: "evidence", label: "Tem braços, pernas e dedos que ajudam a se segurar." },
          { id: "ev-lingua", partId: "evidence", label: "Tem uma língua comprida." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-subir"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-bracos"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s5-evidence-mismatch", incorrect: "sci-s5-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: qual parte do corpo ajuda a se segurar nos galhos?",
      repeatedError: "Qual característica combina com subir em árvores?",
      hints: ["Pense nas mãos e nos dedos."],
    },
  }),

  /* SLOT 6 — camouflage + integrated investigation (p.104, p.106, p.118) */
  contentPackSchema.parse({
    id: "pack-sci-s6-discover",
    skillIds: ["SCI-ENV-CAMOUFLAGE-01"],
    representation: "pictorial",
    eligibleTemplates: ["scene-investigate"],
    source: src([104], "camuflagem: bicho-pau, onça-pintada, borboleta-folha"),
    items: [
      {
        id: "item-sci-s6-d1",
        prompt: "Procure com calma: qual destes está camuflado, parecendo um galho?",
        representation: "pictorial",
        source: src([104], "bicho-pau parece um galho e se mistura aos ramos"),
        options: [
          { id: "cam-bicho-pau", label: "bicho-pau" },
          { id: "cam-tucano", label: "tucano" },
          { id: "cam-orca", label: "orca" },
        ],
        answerRules: {
          kind: "selection",
          acceptedSets: [{ id: "bicho-pau", optionIds: ["cam-bicho-pau"] }],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: qual deles parece parte da planta?",
      repeatedError: "Qual detalhe faz o animal se misturar aos galhos?",
      hints: ["Ele é fininho e da cor do galho."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s6-practice",
    skillIds: ["SCI-ENV-CAMOUFLAGE-01"],
    representation: "pictorial",
    eligibleTemplates: ["pair-match"],
    source: src([104], "cada animal camuflado se parece com um elemento do ambiente"),
    items: [
      {
        id: "item-sci-s6-p1",
        prompt: "Leve cada animal até aquilo com que ele se parece no ambiente.",
        representation: "pictorial",
        source: src([104], "bicho-pau ↔ galho; onça-pintada ↔ luz e sombra da floresta; borboleta-folha ↔ folha seca"),
        options: [
          { id: "cam-bicho-pau", label: "bicho-pau" },
          { id: "cam-onca", label: "onça-pintada" },
          { id: "cam-borboleta", label: "borboleta-folha" },
        ],
        targets: [
          { id: "el-galho", label: "um galho fino" },
          { id: "el-luz-sombra", label: "a luz e a sombra da floresta" },
          { id: "el-folha-seca", label: "uma folha seca" },
        ],
        answerRules: {
          kind: "placement",
          allowPartial: false,
          acceptedMappings: [
            {
              id: "camuflagem",
              mapping: [
                { itemId: "cam-bicho-pau", targetId: "el-galho" },
                { itemId: "cam-onca", targetId: "el-luz-sombra" },
                { itemId: "cam-borboleta", targetId: "el-folha-seca" },
              ],
            },
          ],
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: com o que a cor dele se parece?",
      repeatedError: "Qual detalhe do ambiente combina com esse animal?",
      hints: ["Compare as cores e o formato."],
    },
  }),
  contentPackSchema.parse({
    id: "pack-sci-s6-challenge",
    skillIds: ["SCI-ENV-CAMOUFLAGE-01", "SCI-OBS-CHAR-01"],
    representation: "pictorial",
    eligibleTemplates: ["conclusion-evidence"],
    source: src([104, 106, 118], "camuflagem dificulta a percepção por predadores e presas; bicho-pau e camaleão compartilham a camuflagem"),
    items: [
      {
        id: "item-sci-s6-c1",
        prompt: "Quem está camuflado aqui, e por que isso ajuda?",
        representation: "pictorial",
        source: src([104, 106], "identificação do organismo camuflado + porquê da camuflagem"),
        parts: [
          { id: "conclusion", label: "Quem está camuflado?" },
          { id: "evidence", label: "Por que a camuflagem ajuda?" },
        ],
        options: [
          { id: "conc-bicho-pau", partId: "conclusion", label: "o bicho-pau" },
          { id: "conc-ema", partId: "conclusion", label: "a ema" },
          { id: "ev-dificil", partId: "evidence", label: "Parecendo um galho, fica mais difícil de ser percebido." },
          { id: "ev-rapido", partId: "evidence", label: "Porque ele corre muito rápido." },
        ],
        answerRules: {
          kind: "composition",
          parts: [
            { partId: "conclusion", acceptedTargetIds: ["conc-bicho-pau"], required: true, primary: true },
            { partId: "evidence", acceptedTargetIds: ["ev-dificil"], required: true, primary: false },
          ],
          diagnostics: { partial: "sci-s6-evidence-mismatch", incorrect: "sci-s6-conclusion-mismatch" },
        },
      },
    ],
    feedback: {
      firstError: "Olhe outra vez para a pista: encontrar o animal é difícil por quê?",
      repeatedError: "Qual detalhe explica por que a camuflagem ajuda?",
      hints: ["Pense em quem procura o animal."],
    },
  }),
];

/* ---------------- Activities: one per mode, per slot ---------------- */

type Mode = "discover" | "practice" | "challenge";

const activity = (slot: number, mode: Mode, templateId: string, difficulty: number): Activity =>
  activitySchema.parse({
    id: `activity-sci-s${slot}-${mode}`,
    contentPackId: `pack-sci-s${slot}-${mode}`,
    templateId,
    difficultyLevel: difficulty,
    supportLevelId: "support-provisional",
    mode,
  });

export const scienceActivities: Activity[] = [
  activity(1, "discover", "scene-investigate", 1),
  activity(1, "practice", "group-sort", 1),
  activity(1, "challenge", "conclusion-evidence", 2),
  activity(2, "discover", "scene-investigate", 1),
  activity(2, "practice", "pair-match", 2),
  activity(2, "challenge", "conclusion-evidence", 2),
  activity(3, "discover", "scene-investigate", 1),
  activity(3, "practice", "pair-match", 2),
  activity(3, "challenge", "conclusion-evidence", 3),
  activity(4, "discover", "scene-investigate", 1),
  activity(4, "practice", "group-sort", 2),
  activity(4, "challenge", "conclusion-evidence", 3),
  activity(5, "discover", "scene-investigate", 1),
  activity(5, "practice", "pair-match", 2),
  activity(5, "challenge", "conclusion-evidence", 3),
  activity(6, "discover", "scene-investigate", 1),
  activity(6, "practice", "pair-match", 2),
  activity(6, "challenge", "conclusion-evidence", 3),
];

/* -------------------------- World & slots --------------------------- */

const slotAnchors: { x: number; y: number }[] = [
  { x: 12, y: 74 },
  { x: 27, y: 64 },
  { x: 43, y: 70 },
  { x: 58, y: 60 },
  { x: 73, y: 66 },
  { x: 88, y: 56 },
];

export const scienceWorld: WorldConfig = worldConfigSchema.parse({
  id: SCIENCE_WORLD_ID,
  subjectId: SCIENCE_SUBJECT_ID,
  name: "Oceano das Descobertas",
  placeholder: false,
  segments: [{ id: SEGMENT_ID, worldId: SCIENCE_WORLD_ID, label: "Praia das Conchas" }],
  slots: slotAnchors.map((anchor, index) =>
    activitySlotSchema.parse({
      id: `sci-slot-${index + 1}`,
      worldId: SCIENCE_WORLD_ID,
      segmentId: SEGMENT_ID,
      order: index,
      anchor,
      restorationWeight: 1,
      sequence: {
        discover: `activity-sci-s${index + 1}-discover`,
        practice: [`activity-sci-s${index + 1}-practice`],
        challenge: [`activity-sci-s${index + 1}-challenge`],
      },
    }),
  ),
});

export const sciencePacks = packs;

export const scienceBundle: ContentBundle = {
  subject: scienceSubject,
  curriculum: scienceCurriculum,
  skills: scienceSkills,
  world: scienceWorld,
  activities: scienceActivities,
  packs: sciencePacks,
};