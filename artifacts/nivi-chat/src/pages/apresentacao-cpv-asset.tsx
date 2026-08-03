import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Database,
  FileCheck2,
  FileSearch,
  Gauge,
  Layers3,
  LockKeyhole,
  Network,
  Play,
  Radar,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

import niviChatPreview from "../../../../attached_assets/image_1783959534178.png";

const slideCount = 10;

type SlideProps = {
  index: number;
  goTo: (index: number) => void;
};

const dataSources = [
  "Começar com upload, data room e documentos reais",
  "Conectar políticas, modelos e exemplos aprovados da CPV",
  "Ler balanços, DRE, contratos, garantias e certidões",
  "Cruzar SCR, bureaus, protestos e bases públicas",
  "Evoluir para CRM, ERP, planilhas e APIs internas",
  "Manter histórico de fontes, prompts, versões e revisões",
];

const pilotSteps = [
  [
    "Antes da demo",
    "Escolher 1 operação",
    "Separar um caso real com documentos e um dossiê já aprovado como referência.",
  ],
  [
    "Setup",
    "Configurar o padrão CPV",
    "Definir seções, indicadores, fontes, critérios, tom e anexos esperados.",
  ],
  [
    "Validação",
    "Rodar 3 prompts",
    "Gerar dossiês e comparar contra tempo, qualidade e rastreabilidade atuais.",
  ],
  [
    "Próximo passo",
    "Decidir escopo",
    "Escolher se o piloto segue por upload, data room ou primeira integração.",
  ],
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#23342a] font-serif text-xl text-white">
        N
      </div>
      {!compact && (
        <span className="font-serif text-3xl leading-none">Nivi.</span>
      )}
    </div>
  );
}

function DeckShell({
  activeSlide,
  goTo,
  next,
  previous,
  children,
}: {
  activeSlide: number;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#edf3ef] text-[#23342a] selection:bg-[#23342a] selection:text-white">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-[#23342a]/10 bg-[#edf3ef]/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-4 sm:px-6">
          <a href="/" aria-label="Voltar para a landing page da Nivi">
            <BrandMark />
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para slide ${index + 1}`}
                title={`Slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-9 bg-[#23342a]"
                    : "w-2.5 bg-[#23342a]/20 hover:bg-[#23342a]/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden min-w-12 text-right text-sm font-medium text-[#23342a]/58 sm:block">
              {String(activeSlide + 1).padStart(2, "0")}/
              {String(slideCount).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Slide anterior"
              title="Slide anterior"
              onClick={previous}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#23342a]/10 bg-white/45 text-[#23342a] shadow-sm transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo slide"
              title="Próximo slide"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#23342a] text-white shadow-sm transition-colors hover:bg-[#23342a]/90"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-1 bg-[#23342a]/8">
          <div
            className="h-full bg-[#5E7C8D] transition-all duration-300"
            style={{ width: `${((activeSlide + 1) / slideCount) * 100}%` }}
          />
        </div>
      </div>

      <div className="pt-16">{children}</div>
    </main>
  );
}

function SlideFrame({
  eyebrow,
  title,
  copy,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`min-h-[calc(100vh-4rem)] px-4 py-7 sm:px-6 sm:py-10 ${dark ? "bg-[#23342a] text-white" : ""}`}
    >
      <div className="mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-[92rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div className="max-w-xl">
          <div
            className={`mb-5 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/48" : "text-[#23342a]/52"}`}
          >
            {eyebrow}
          </div>
          <h1
            className={`font-serif text-[2.8rem] leading-[0.98] sm:text-[4rem] lg:text-[5rem] ${dark ? "text-white" : "text-[#23342a]"}`}
          >
            {title}
          </h1>
          {copy && (
            <p
              className={`mt-6 max-w-lg text-lg font-light leading-relaxed sm:text-xl ${dark ? "text-white/68" : "text-[#23342a]/68"}`}
            >
              {copy}
            </p>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function ProblemVisual() {
  const rows = [
    [
      "Informações",
      "Buscar dados em sistemas, bureaus e bases públicas",
      "horas",
    ],
    ["Dossiê", "Montar estrutura, anexos, indicadores e narrativa", "manual"],
    ["Dados", "Consolidar números, documentos e evidências", "fragmentado"],
    ["Comitê", "Preparar material antes da discussão de crédito", "retrabalho"],
  ];

  return (
    <div className="rounded-[1.5rem] border border-[#23342a]/10 bg-[#fbfdfb] p-4 shadow-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="font-serif text-2xl">Esteira atual</div>
          <div className="text-sm text-[#23342a]/52">
            Muito trabalho antes da análise começar de verdade
          </div>
        </div>
        <Radar className="h-6 w-6 text-[#5E7C8D]" />
      </div>
      <div className="space-y-3">
        {rows.map(([stage, detail, status], index) => (
          <div
            key={stage}
            className="grid gap-3 rounded-xl border border-[#23342a]/8 bg-white p-4 sm:grid-cols-[7rem_1fr_8rem] sm:items-center"
          >
            <div className="flex items-center gap-3 font-medium">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#23342a] text-xs text-white">
                {index + 1}
              </span>
              {stage}
            </div>
            <div className="text-sm text-[#23342a]/62">{detail}</div>
            <div className="rounded-md bg-[#EFE9E3] px-3 py-2 text-center text-xs font-semibold text-[#8A5A1B]">
              {status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentWorkflowVisual() {
  const tools = [
    "ERP",
    "Bureau",
    "Receita",
    "Processos",
    "Planilhas",
    "PowerPoint",
    "Comitê",
  ];

  return (
    <div className="rounded-[1.5rem] border border-[#23342a]/10 bg-[#fbfdfb] p-5 shadow-xl sm:p-7">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="font-serif text-3xl">Fluxo atual</div>
          <div className="mt-1 text-sm text-[#23342a]/52">
            Muitas ferramentas para chegar em um único parecer
          </div>
        </div>
        <Radar className="h-6 w-6 text-[#5E7C8D]" />
      </div>

      <div className="grid gap-3 lg:grid-cols-7">
        {tools.map((tool, index) => (
          <div key={tool} className="relative">
            <div className="flex min-h-28 flex-col justify-between rounded-xl border border-[#23342a]/8 bg-white p-4 shadow-sm">
              <span className="text-xs font-semibold text-[#23342a]/38">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-semibold">{tool}</span>
            </div>
            {index < tools.length - 1 && (
              <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-[#23342a]/28 lg:block" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          "Muito trabalho manual",
          "Muitas ferramentas",
          "Pouca padronização",
        ].map((pain) => (
          <div
            key={pain}
            className="rounded-lg bg-[#EFE9E3] px-4 py-3 text-sm font-semibold text-[#8A5A1B]"
          >
            {pain}
          </div>
        ))}
      </div>
    </div>
  );
}

function FitVisual() {
  const items = [
    {
      icon: Bot,
      title: "Assistente de IA",
      copy: "O analista pergunta em linguagem natural e a Nivi conduz a análise.",
    },
    {
      icon: Database,
      title: "Mais de 300 fontes",
      copy: "Consulta, organiza e cruza dados internos, documentos e bases externas.",
    },
    {
      icon: FileCheck2,
      title: "Dossiês automáticos",
      copy: "Gera estudos no padrão da instituição depois do setup inicial.",
    },
    {
      icon: Gauge,
      title: "Fluxo de caixa",
      copy: "Organiza indicadores financeiros e sinais para apoiar a decisão.",
    },
    {
      icon: FileSearch,
      title: "Análise documental",
      copy: "Lê contratos, certidões, garantias e documentos societários.",
    },
    {
      icon: Sparkles,
      title: "Perguntas naturais",
      copy: "Permite investigar riscos e detalhes sem montar buscas manuais.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="min-h-48 rounded-[1.25rem] border border-[#23342a]/10 bg-[#fbfdfb] p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-serif text-4xl text-[#23342a]/28">
              0{index + 1}
            </span>
            <item.icon className="h-5 w-5 text-[#2F8B6D]" />
          </div>
          <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
          <p className="text-base font-light leading-relaxed text-[#23342a]/64">
            {item.copy}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProductVisual() {
  const dossierSections = [
    "Resumo executivo",
    "Indicadores financeiros",
    "Garantias e mitigantes",
    "Riscos e recomendação",
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.5rem] border border-[#23342a]/10 bg-[#fbfdfb] p-5 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#23342a] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-serif text-2xl">Prompt da demo</div>
            <div className="text-sm text-[#23342a]/52">
              O ponto que precisa ficar claro hoje
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#1f3027] p-5 text-base font-medium leading-relaxed text-white shadow-inner">
          Gere um dossiê CPV para esta operação. Use o template combinado no
          setup, leia os documentos anexados, aplique a política do fundo e
          entregue resumo executivo, indicadores, riscos, mitigantes,
          recomendação e fontes.
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Cedente", "Fundo", "Período"].map((label) => (
            <div key={label} className="rounded-lg bg-[#e3ebe6] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#23342a]/42">
                Parâmetro
              </div>
              <div className="mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#23342a]/10">
          <img
            src={niviChatPreview}
            alt="Interface da Nivi conversando com dados e documentos"
            className="h-44 w-full object-cover object-top"
          />
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-[#23342a]/10 bg-[#fbfdfb] p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-serif text-2xl">O que sai</div>
            <div className="text-sm text-[#23342a]/52">
              Uma primeira versão pronta para revisão
            </div>
          </div>
          <FileCheck2 className="h-6 w-6 text-[#2F8B6D]" />
        </div>
        <div className="space-y-3">
          {dossierSections.map((section, index) => (
            <div
              key={section}
              className="rounded-xl border border-[#23342a]/8 bg-white p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium">{section}</span>
                <span className="rounded-md bg-[#E4F5EE] px-2 py-1 text-xs font-semibold text-[#17664E]">
                  fonte {index + 1}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#e3ebe6]">
                <div
                  className="h-full rounded-full bg-[#5E7C8D]"
                  style={{ width: `${88 - index * 9}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  const nodes = [
    {
      icon: Target,
      label: "Prompt",
      copy: "Pedido do usuário com tipo de operação, objetivo e padrão esperado",
    },
    {
      icon: Database,
      label: "Contexto",
      copy: "Documentos reais, políticas CPV, modelos aprovados e bases externas",
    },
    {
      icon: CircuitBoard,
      label: "Raciocínio",
      copy: "Extração, comparação, regras da operação e checagens de consistência",
    },
    {
      icon: Gauge,
      label: "Controle",
      copy: "Fontes abertas, evidências, confiança e revisão humana",
    },
    {
      icon: FileCheck2,
      label: "Dossiê",
      copy: "Documento estruturado no padrão da CPV",
    },
  ];

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
      <div className="grid gap-4">
        {nodes.map((node, index) => (
          <div
            key={node.label}
            className="grid gap-4 rounded-xl border border-white/10 bg-[#142019] p-4 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f6faf7] text-[#23342a]">
              <node.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">
                {node.label}
              </div>
              <div className="text-sm leading-relaxed text-white/58">
                {node.copy}
              </div>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight className="hidden h-5 w-5 text-white/32 sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalizationVisual() {
  const controls = [
    {
      icon: Layers3,
      title: "Tipos de operação",
      copy: "Crédito Estruturado e Securitização, Real Estate, FIIs e outros formatos da CPV",
    },
    {
      icon: Target,
      title: "Setup com a instituição",
      copy: "em conjunto com o time, configuramos seções, indicadores, critérios, tom e anexos",
    },
    {
      icon: LockKeyhole,
      title: "Base de conhecimento",
      copy: "políticas, modelos aprovados, documentos internos e regras por operação viram contexto da IA",
    },
    {
      icon: FileCheck2,
      title: "Depois, 1 prompt",
      copy: "o usuário pede o dossiê e recebe uma versão no padrão configurado, revisável e com fontes",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {controls.map((control) => (
        <div
          key={control.title}
          className="rounded-[1.25rem] border border-[#23342a]/10 bg-[#fbfdfb] p-6 shadow-sm"
        >
          <control.icon className="mb-8 h-7 w-7 text-[#2F8B6D]" />
          <h3 className="mb-3 text-xl font-semibold">{control.title}</h3>
          <p className="text-base font-light leading-relaxed text-[#23342a]/64">
            {control.copy}
          </p>
        </div>
      ))}
    </div>
  );
}

function DataVisual() {
  return (
    <div className="rounded-[1.5rem] bg-[#1f3027] p-5 shadow-2xl sm:p-7">
      <div className="mb-6 flex items-center justify-between text-white">
        <div className="font-serif text-3xl">Mapa de fontes</div>
        <Network className="h-6 w-6 text-white/54" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {dataSources.map((source, index) => (
          <div
            key={source}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 text-white"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#A6E1CE] text-xs font-semibold text-[#173D33]">
              {index + 1}
            </span>
            <div className="text-sm font-medium leading-relaxed">{source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoiVisual() {
  const metrics = [
    ["1", "setup para configurar os modelos de dossiê com a CPV"],
    ["1", "prompt para gerar a primeira versão do dossiê"],
    ["3", "critérios para validar: tempo, qualidade e rastreabilidade"],
  ];

  return (
    <div className="grid gap-4">
      {metrics.map(([value, label]) => (
        <div
          key={value}
          className="grid min-h-32 gap-4 rounded-[1.25rem] border border-[#23342a]/10 bg-[#fbfdfb] p-6 shadow-sm sm:grid-cols-[10rem_1fr] sm:items-center"
        >
          <div className="font-serif text-6xl leading-none text-[#23342a]">
            {value}
          </div>
          <div className="max-w-md text-xl font-light leading-snug text-[#23342a]/66">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function PilotVisual() {
  return (
    <div className="rounded-[1.5rem] border border-[#23342a]/10 bg-[#fbfdfb] p-5 shadow-xl sm:p-7">
      <div className="space-y-4">
        {pilotSteps.map(([period, title, copy], index) => (
          <div
            key={title}
            className="grid gap-4 rounded-xl border border-[#23342a]/8 bg-white p-4 sm:grid-cols-[8.5rem_1fr]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#23342a] text-sm text-white">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-[#23342a]/58">
                {period}
              </span>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-[#23342a]/62">
                {copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingVisual({ goTo }: SlideProps) {
  return (
    <div className="rounded-[1.5rem] bg-[#23342a] p-6 text-white shadow-2xl sm:p-8">
      <div className="mb-12 flex items-center justify-between">
        <BrandMark compact />
        <span className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/58">
          Próximo passo
        </span>
      </div>
      <div className="mb-8 font-serif text-4xl leading-tight sm:text-5xl">
        Sair da reunião com um piloto simples: 1 operação, 1 template, 3 dossiês
        gerados por prompt.
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["1", "escolher o tipo de operação"],
          ["2", "separar documentos reais"],
          ["3", "validar o dossiê gerado"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
          >
            <div className="mb-6 text-2xl font-semibold">{value}</div>
            <div className="text-sm text-white/62">{label}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => goTo(0)}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#23342a] transition-colors hover:bg-[#edf3ef]"
      >
        <Play className="h-4 w-4" />
        Recomeçar apresentação
      </button>
    </div>
  );
}

export default function CpvAssetPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goTo = (index: number) => {
    setActiveSlide(Math.min(Math.max(index, 0), slideCount - 1));
  };

  const next = () => goTo(activeSlide + 1);
  const previous = () => goTo(activeSlide - 1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        setActiveSlide((current) => Math.min(current + 1, slideCount - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setActiveSlide((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Home") {
        setActiveSlide(0);
      }

      if (event.key === "End") {
        setActiveSlide(slideCount - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slides = useMemo(
    () => [
      <SlideFrame
        key="hero"
        eyebrow="Problema"
        title="Analistas de crédito passam horas antes mesmo de começar a analisar."
        copy="Eles reúnem informações, montam dossiês e consolidam dados em várias fontes antes da discussão de crédito começar de verdade."
      >
        <ProblemVisual />
      </SlideFrame>,
      <SlideFrame
        key="problem"
        eyebrow="Como as instituições fazem hoje"
        title="ERP, bureau, Receita, processos, planilhas, PowerPoint e comitê."
        copy="O fluxo atual costuma depender de muitas ferramentas, muito trabalho manual e pouca padronização entre análises, áreas e tipos de operação."
      >
        <CurrentWorkflowVisual />
      </SlideFrame>,
      <SlideFrame
        key="fit"
        eyebrow="A solução"
        title="Nivi centraliza toda a análise em um único lugar."
        copy="Assistente de IA, mais de 300 fontes, dossiês automáticos, fluxo de caixa, análise documental e perguntas em linguagem natural para acelerar o caminho até o comitê."
      >
        <FitVisual />
      </SlideFrame>,
      <SlideFrame
        key="product"
        eyebrow="Demonstração"
        title="O ponto da demo: 1 prompt gera um dossiê CPV revisável."
        copy="Não é um chat solto. O prompt aciona o template configurado, lê os documentos disponíveis, aplica a política do fundo e devolve um dossiê com seções, riscos, mitigantes, recomendação e fontes."
      >
        <ProductVisual />
      </SlideFrame>,
      <SlideFrame
        key="architecture"
        eyebrow="Para tecnologia"
        title="O que precisa ficar claro: isso é configurável e auditável."
        copy="A IA não decide sozinha. Ela executa uma esteira controlada: prompt, contexto, extração, regras, geração estruturada, fontes abertas e revisão humana."
        dark
      >
        <ArchitectureVisual />
      </SlideFrame>,
      <SlideFrame
        key="security"
        eyebrow="Setup com a CPV"
        title="A Nivi elabora dossiês para diferentes tipos de operação."
        copy="Durante o setup, configuramos modelos para Crédito Estruturado e Securitização, Real Estate, FIIs e outros fluxos. Depois disso, um prompt já gera o dossiê no padrão combinado com a instituição."
      >
        <PersonalizationVisual />
      </SlideFrame>,
      <SlideFrame
        key="data"
        eyebrow="Como começar"
        title="Não precisa nascer integrado a tudo para provar valor."
        copy="Para a reunião de hoje, o melhor caminho é propor um início leve: documentos reais, data room ou upload, modelos CPV e validação do dossiê gerado. Integrações vêm depois."
        dark
      >
        <DataVisual />
      </SlideFrame>,
      <SlideFrame
        key="roi"
        eyebrow="Critérios de aceite"
        title="A validação técnica precisa ser objetiva."
        copy="A pergunta para o piloto é: a Nivi reduziu o tempo de montagem, preservou fontes, respeitou o padrão CPV e gerou um dossiê bom o suficiente para revisão?"
      >
        <RoiVisual />
      </SlideFrame>,
      <SlideFrame
        key="pilot"
        eyebrow="Plano de piloto"
        title="Saída desejada da conversa: combinar um piloto pequeno."
        copy="Escolher uma operação, configurar o modelo de dossiê junto com a CPV, rodar prompts em casos reais e comparar a saída contra o material produzido manualmente."
      >
        <PilotVisual />
      </SlideFrame>,
      <SlideFrame
        key="closing"
        eyebrow="Fechamento"
        title="A frase para fechar: vamos testar com um caso real da CPV."
        copy="Se a Nivi gerar um dossiê personalizado, com fontes e no padrão combinado, a conversa deixa de ser sobre promessa e vira uma decisão técnica sobre implantação."
        dark
      >
        <ClosingVisual index={activeSlide} goTo={goTo} />
      </SlideFrame>,
    ],
    [activeSlide],
  );

  return (
    <DeckShell
      activeSlide={activeSlide}
      goTo={goTo}
      next={next}
      previous={previous}
    >
      <div className="relative">
        {slides[activeSlide]}
        <div className="pointer-events-none fixed bottom-5 left-4 right-4 z-30 flex justify-between sm:left-6 sm:right-6">
          <button
            type="button"
            aria-label="Slide anterior"
            title="Slide anterior"
            onClick={previous}
            className="pointer-events-auto hidden h-11 w-11 items-center justify-center rounded-lg border border-[#23342a]/10 bg-white/65 text-[#23342a] shadow-sm backdrop-blur transition-colors hover:bg-white lg:flex"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo slide"
            title="Próximo slide"
            onClick={next}
            className="pointer-events-auto ml-auto hidden h-11 w-11 items-center justify-center rounded-lg border border-[#23342a]/10 bg-white/65 text-[#23342a] shadow-sm backdrop-blur transition-colors hover:bg-white lg:flex"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </DeckShell>
  );
}
