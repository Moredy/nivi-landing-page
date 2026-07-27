import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Database,
  FileCheck2,
  FileText,
  Inbox,
  Lock,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const partnerLogos = ["Atlas Bank", "Cora", "Monet", "Aster", "Nexo", "Vértice"];

const whatsappHref = "https://wa.me/5511971728811?text=Ol%C3%A1%2C%20estou%20com%20algumas%20d%C3%BAvidas%20a%20respeito%20da%20Nivi";
const demoHref = "https://cal.com/matheus-marques-bkv7ag/demonstracao-nivi";

const inboxItems = [
  {
    title: "Dossiê Acme S.A.",
    time: "2 min",
    copy: "Liquidez corrente caiu para 1,1x; DSCR segue saudável em 1,45x.",
    owner: "Nivi",
    active: true,
  },
  {
    title: "Risco cruzado Beta Ltda.",
    time: "16 min",
    copy: "Inconsistência entre DRE, SCR e protestos recentes encontrada.",
    owner: "Ana",
  },
  {
    title: "Garantias Grupo Prisma",
    time: "1 h",
    copy: "Contratos anexados conferidos com certidões e passivos judiciais.",
    owner: "Rui",
  },
];

const features = [
  {
    title: "Dossiê personalizado",
    copy: "Você já tem todas as informações em um único documento de acordo com o padrão da instituição.",
    visual: "workflow",
  },
  {
    title: "Análise setorial",
    copy: "Realize uma analise e comparação setorial da empresa a nível de mercado em segundos",
    visual: "agent",
  },
  {
    title: "Integração simples",
    copy: "Integre diretamente com seu CRM ou ERP para trazer os demonstrativos financeiros direto para os estudos",
    visual: "evidence",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Sob convite",
    period: "",
    copy: "Para squads iniciando com IA em crédito.",
    items: ["Até 2 modelos de dossiê", "Relatórios livres", "Upload de documentos", "Pareceres com fontes", "Suporte por email"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "Piloto assistido",
    period: "",
    copy: "Para times com volume e colaboração diária.",
    items: ["Tudo do Starter", "Dossiês padronizados", "Alertas de inconsistência", "Histórico auditável", "Análise colaborativa", "Onboarding guiado", "Relatórios gerenciais"],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Customizado",
    period: "",
    copy: "Para instituições com governança e segurança avançadas.",
    items: ["Tudo do Growth", "Ambiente dedicado", "SSO e controles LGPD", "Políticas customizadas", "Integrações internas", "Trilha de auditoria", "Suporte dedicado"],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "A Nivi usa dados dos clientes para treinar modelos?",
    answer:
      "Não. Os dados processados pela Nivi não são utilizados para treinar modelos de inteligência artificial. Eles são usados exclusivamente para executar as funcionalidades da plataforma e permanecem protegidos durante todo o processamento.",
  },
  {
    question: "Posso começar com um piloto pequeno antes de integrar sistemas?",
    answer:
      "Sim. A Nivi pode ser implementada gradualmente. Você pode iniciar com um piloto para validar os resultados na sua operação e expandir a utilização conforme a necessidade, sem depender de uma integração completa desde o primeiro dia.",
  },
  {
    question: "Os relatórios mostram a fonte de cada conclusão?",
    answer:
      "Sim. Sempre que aplicável, a Nivi apresenta as fontes utilizadas para fundamentar cada informação e conclusão, permitindo que o analista valide os dados e tome decisões com transparência e confiança.",
  },
  {
    question: "Quais documentos posso analisar?",
    answer:
      "Praticamente qualquer documento. A Nivi analisa desde demonstrativos financeiros e contratos até documentos societários, certidões, comprovantes e outros arquivos utilizados na análise de crédito.",
  },
];

function DashboardMockup() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-t-2xl border border-black/10 bg-white text-sm shadow-2xl">
      <div className="flex h-[500px] flex-col sm:flex-row">
        <aside className="hidden w-56 shrink-0 flex-col gap-6 border-r border-black/5 bg-[#FCFAFB] p-4 sm:flex">
          <div className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-2">
            <span className="flex items-center gap-2 font-medium text-[#272125]">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#272125] text-xs text-white">N</span>
              Nivi
            </span>
            <ChevronDown className="h-4 w-4 text-black/40" />
          </div>

          <div className="flex items-center gap-3 px-2 font-medium text-black/60">
            <Search className="h-4 w-4" />
            Buscar
            <span className="ml-auto rounded border border-black/10 px-1.5 py-0.5 text-xs">⌘K</span>
          </div>

          <div className="space-y-1">
            {[
              { icon: Inbox, label: "Análises", count: "6", active: true },
              { icon: Users, label: "Comitê", count: "10" },
              { icon: Clock, label: "Pendentes", count: "3" },
              { icon: FileText, label: "Rascunhos", count: "1" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-md px-2 py-1.5 font-medium ${item.active ? "bg-black/5 text-[#272125]" : "text-black/60"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <span className="ml-auto text-xs text-black/50">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="mb-2 px-2 text-xs font-medium text-black/40">Fontes</div>
            <div className="space-y-2 px-2 font-medium text-black/60">
              <div>Balanços</div>
              <div>SCR</div>
              <div>Certidões</div>
              <div>Processos</div>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="border-b border-black/5 p-4">
            <div className="pb-4 text-base font-medium text-[#272125]">Assistente de crédito</div>
            <div className="flex gap-2">
              <span className="rounded-full bg-[#272125] px-3 py-1 text-xs font-medium text-white">Perguntas</span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">Dossiês</span>
            </div>
          </div>

          <div className="divide-y divide-black/10 p-6">
            {inboxItems.map((item) => (
              <div key={item.title} className="relative space-y-1 py-5 first:pt-0">
                {item.active && <span className="absolute -left-3 top-6 h-1.5 w-1.5 rounded-full bg-[#5E7C8D]" />}
                <div className="flex items-start justify-between gap-3">
                  <div className="font-medium text-[#272125]">{item.title}</div>
                  <div className="whitespace-nowrap text-xs text-black/40">{item.time}</div>
                </div>
                <p className="line-clamp-2 leading-relaxed text-black/60">{item.copy}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-black/50">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[10px] font-medium text-[#272125]">
                    {item.owner[0]}
                  </span>
                  <span className="font-medium text-black/80">{item.owner}</span> atualizou agora
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function CreditStudyMockup({ activeTab }: { activeTab: "dossiers" | "research" | "compliance" }) {
  const tabContent = {
    dossiers: { title: "Estudo de crédito", subtitle: "Grupo Horizonte Ltda. · Atualizado agora", status: "Recomendado" },
    research: { title: "Pesquisa cadastral", subtitle: "Grupo Horizonte Ltda. · 12 fontes consultadas", status: "Em análise" },
    compliance: { title: "Verificação de compliance", subtitle: "Grupo Horizonte Ltda. · Última checagem agora", status: "Sem bloqueios" },
  }[activeTab];
  const factors = [
    { label: "Liquidez", value: "1,42x", tone: "bg-[#A6E1CE]" },
    { label: "Endividamento", value: "2,1x", tone: "bg-[#E3C593]" },
    { label: "Cobertura DSCR", value: "1,58x", tone: "bg-[#79BCA8]" },
  ];

  return (
    <div className="w-full max-w-[41rem] overflow-hidden rounded-xl border border-black/10 bg-[#FCFBF8] p-5 text-[#272125] shadow-2xl sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <div className="font-serif text-xl sm:text-2xl">{tabContent.title}</div>
          <div className="mt-1 text-xs text-black/50">{tabContent.subtitle}</div>
        </div>
        <span className="shrink-0 rounded-full border border-[#2F8B6D]/30 bg-[#E4F5EE] px-3 py-1 text-xs font-semibold text-[#17664E]">{tabContent.status}</span>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-[#F1EFEB] p-3">
          <div className="text-[10px] font-medium uppercase tracking-wide text-black/45">Limite sugerido</div>
          <div className="mt-1 text-lg font-semibold">R$ 2,4 mi</div>
          <div className="mt-1 text-[11px] text-[#17664E]">↑ 12% vs. anterior</div>
        </div>
        <div className="rounded-lg bg-[#F1EFEB] p-3">
          <div className="text-[10px] font-medium uppercase tracking-wide text-black/45">Score de risco</div>
          <div className="mt-1 text-lg font-semibold">812</div>
          <div className={`mt-1 text-[11px] ${activeTab === "dossiers" ? "text-[#17664E]" : "text-[#9B641C]"}`}>{activeTab === "dossiers" ? "Baixo risco" : activeTab === "research" ? "2 alertas mapeados" : "Nenhuma restrição"}</div>
        </div>
        <div className="col-span-2 rounded-lg bg-[#F1EFEB] p-3 sm:col-span-1">
          <div className="text-[10px] font-medium uppercase tracking-wide text-black/45">Prazo</div>
          <div className="mt-1 text-lg font-semibold">36 meses</div>
          <div className="mt-1 text-[11px] text-black/45">Com garantias</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.35fr_1fr]">
        <div className="rounded-lg border border-black/10 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/55">{activeTab === "dossiers" ? "Geração de caixa" : activeTab === "research" ? "Cobertura de garantias" : "Consultas concluídas"}</span>
            <span className="text-xs text-black/45">{activeTab === "dossiers" ? "Últimos 6 meses" : activeTab === "research" ? "87% do limite" : "6 verificações"}</span>
          </div>
          <div className="flex h-32 items-end gap-2 border-b border-l border-black/10 px-3 pt-3">
            {[45, 61, 54, 76, 68, 94].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col justify-end gap-1">
                <div className={`rounded-t-sm ${index === 5 ? "bg-[#2F8B6D]" : activeTab === "dossiers" ? "bg-[#A6E1CE]" : activeTab === "research" ? "bg-[#E3C593]" : "bg-[#79BCA8]"}`} style={{ height: `${activeTab === "dossiers" ? height : activeTab === "research" ? [70, 70, 58, 58, 87, 87][index] : [85, 85, 85, 65, 100, 100][index]}%` }} />
                <span className="pb-1 text-center text-[9px] text-black/40">{activeTab === "dossiers" ? `M${index + 1}` : activeTab === "research" ? `G${index + 1}` : `C${index + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-black/55">{activeTab === "dossiers" ? "Indicadores" : activeTab === "research" ? "Pontos de atenção" : "Verificações"}</div>
          <div className="space-y-3">
            {(activeTab === "dossiers" ? factors : activeTab === "research" ? [
              { label: "Recebíveis cedidos", value: "Monitorar", tone: "bg-[#E3C593]" },
              { label: "Alienação fiduciária", value: "Regular", tone: "bg-[#A6E1CE]" },
              { label: "Concentração", value: "18%", tone: "bg-[#E3C593]" },
            ] : [
              { label: "PEP e sanções", value: "Aprovado", tone: "bg-[#A6E1CE]" },
              { label: "Mídia adversa", value: "Nenhum achado", tone: "bg-[#A6E1CE]" },
              { label: "Processos", value: "Monitorar", tone: "bg-[#E3C593]" },
            ]).map((factor) => (
              <div key={factor.label}>
                <div className="mb-1 flex justify-between text-[11px] text-black/55"><span>{factor.label}</span><span className="font-semibold text-[#272125]">{factor.value}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/8"><div className={`h-full rounded-full ${factor.tone}`} style={{ width: factor.label === "Endividamento" ? "57%" : activeTab === "dossiers" ? "78%" : activeTab === "research" ? "64%" : "90%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "evidence") {
    return (
      <div className="grid h-full gap-3 bg-white p-5">
        {["Balanço 2024", "DRE Q3", "Certidão Federal"].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-xl border border-black/5 bg-[#FCFAFB] p-3">
            <FileCheck2 className="h-5 w-5 text-[#5E7C8D]" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-[#272125]">{item}</div>
              <div className="mt-1 h-1.5 rounded-full bg-black/10">
                <div className="h-full rounded-full bg-[#7A6470]" style={{ width: `${78 - index * 12}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "agent") {
    return (
      <div className="flex h-full flex-col justify-end gap-3 bg-[#2C2428] p-5 text-sm">
        <div className="max-w-[82%] rounded-2xl bg-white/10 p-3 text-white/80">Explique os riscos do CNPJ em 3 pontos.</div>
        <div className="ml-auto max-w-[86%] rounded-2xl bg-white p-3 text-[#272125] shadow-sm">
          Encontrei compressão de liquidez, concentração em fornecedor e passivo trabalhista relevante.
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-white/60">
          <Sparkles className="h-4 w-4" />
          Gerando dossiê...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-5">
      <div className="grid h-full grid-cols-2 gap-3">
        {[
          { label: "Docs", icon: FileText },
          { label: "Risco", icon: AlertTriangle },
          { label: "Índices", icon: BarChart3 },
          { label: "LGPD", icon: Lock },
        ].map((item) => (
          <div key={item.label} className="flex flex-col justify-between rounded-2xl border border-black/5 bg-[#FCFAFB] p-4">
            <item.icon className="h-5 w-5 text-[#272125]/50" />
            <span className="text-sm font-medium text-[#272125]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [creditViewTab, setCreditViewTab] = useState<"dossiers" | "research" | "compliance">("dossiers");

  return (
    <div className="min-h-screen bg-[#F0EDEF] text-[#272125] selection:bg-[#272125] selection:text-[#F8F6F8]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-serif text-3xl text-[#272125]">
          Nivi.
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-base font-medium text-[#272125] transition-opacity hover:opacity-70">
            Sobre
          </a>
          <a href="#pricing" className="text-base font-medium text-[#272125] transition-opacity hover:opacity-70">
            Planos
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="hidden text-base font-medium text-[#272125] transition-opacity hover:opacity-70 sm:block">
            Fale conosco
          </a>
          <a href={demoHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#272125] px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#272125]/90">
            Agendar demo
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-[90rem] px-4 pb-20 pt-4 sm:px-6">
        <div className="relative isolate flex min-h-[600px] flex-col items-center overflow-hidden rounded-[2rem] bg-[#7A6470] px-8 pt-20 lg:flex-row lg:items-start lg:px-20">
          <div className="absolute inset-0 -z-20 bg-[#2C2428]" />
          <div className="grain-overlay pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-overlay" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="z-10 flex w-full flex-col items-center pb-20 pt-10 text-center lg:w-1/2 lg:items-start lg:pb-32 lg:pt-20 lg:text-left"
          >
            <a href="#pricing" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
              <span>Primeiro teste por nossa conta</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="flex items-center gap-1">
                Saiba mais <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <h1 className="mb-6 max-w-2xl font-serif text-[2.75rem] leading-[1.05] text-white sm:text-[3.45rem] lg:text-[4.1rem]">
              Analistas de crédito deveriam analisar crédito.
            </h1>

            <p className="mb-10 max-w-lg text-lg font-light leading-relaxed text-white/80">
              Elimine horas de trabalho operacional. A Nivi automatiza pesquisas, consolida informações e cria estudos de crédito alinhados à política da instituição.
            </p>

            <div className="inline-flex w-full max-w-md overflow-hidden rounded-xl border border-white/25 bg-white text-base font-medium shadow-sm sm:w-auto">
              <a href="#about" className="flex flex-1 items-center justify-center bg-[#272125] px-6 py-3 text-white transition-colors hover:bg-[#272125]/90 sm:flex-none">
                Conheça a solução
              </a>
              <a href={demoHref} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center px-6 py-3 text-[#272125] transition-colors hover:bg-[#F8F6F8] sm:flex-none">
                Agendar demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="z-10 mt-12 flex w-full justify-center lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-1/2 lg:translate-x-12 lg:translate-y-16 lg:justify-end"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale md:justify-between">
          {partnerLogos.map((logo) => (
            <span key={logo} className="font-serif text-2xl text-[#272125]/80">
              {logo}
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-6 font-serif text-4xl leading-[1.1] text-[#272125] sm:text-5xl">
            Tudo o que seu analista precisa, em um único lugar
          </h2>
          <p className="mb-6 text-lg font-light leading-relaxed text-[#272125]/70">
            A Nivi consulta mais de 300 fontes, organiza documentos, cruza informações e responde perguntas durante a análise, eliminando tarefas operacionais para que seu time decida com mais contexto e agilidade
          </p>
          <a href="#scale" className="inline-flex items-center gap-1.5 text-base font-medium text-[#272125] transition-opacity hover:opacity-70">
            Ver como funciona <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mx-auto max-w-[90rem]">
          <div className="mb-4 flex overflow-x-auto px-2 sm:px-4">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-[#272125]/10 bg-[#3A3035]/90 p-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              {[
                { id: "dossiers", label: "Dossiês", icon: FileText },
                { id: "research", label: "Pesquisas", icon: Search },
                { id: "compliance", label: "Compliance", icon: Lock },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCreditViewTab(tab.id as "dossiers" | "research" | "compliance")}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${creditViewTab === tab.id ? "bg-[#1E181B] text-white" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#30272B] px-6 py-12 sm:px-10 lg:min-h-[590px] lg:px-20 lg:py-16">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-25" style={{ backgroundImage: "repeating-radial-gradient(ellipse at 15% 105%, transparent 0 52px, #D8D0D4 54px 58px, transparent 60px 102px)" }} />
            <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.75fr] lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: "easeOut" }} className="order-2 lg:order-1">
                <CreditStudyMockup activeTab={creditViewTab} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }} className="order-1 space-y-3 lg:order-2">
                <div className="rounded-xl bg-[#171516] p-5 text-white shadow-xl">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">Prompt</div>
                  <p className="text-sm leading-relaxed text-white/72">Analise o pedido de crédito do Grupo Horizonte. Consolide balanços, SCR, garantias e comportamento de pagamento. Recomende limite, prazo e pontos de atenção para o comitê.</p>
                </div>
                <div className="rounded-xl bg-[#171516] p-5 text-white shadow-xl">
                  <div className="mb-3 text-sm font-semibold">Fontes conectadas</div>
                  <div className="space-y-2">
                    {["Dados financeiros", "SCR e endividamento", "Documentos e garantias"].map((source) => (
                      <div key={source} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white/85"><span className="flex h-6 w-6 items-center justify-center rounded bg-[#2F8B6D] text-white"><Database className="h-3.5 w-3.5" /></span>{source}<Check className="ml-auto h-4 w-4 text-[#A6E1CE]" /></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="scale" className="relative overflow-hidden bg-[#F0EDEF] py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[380px] grid-cols-[repeat(9,minmax(0,1fr))] px-6 sm:grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="h-full border-l border-dashed border-[#272125]/20" />
          ))}
        </div>

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[330px] w-full text-[#272125]/18"
          viewBox="0 0 1440 330"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 258C236 251 394 217 586 183C811 143 1026 115 1440 0" stroke="currentColor" strokeWidth="2" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="mb-5 text-sm font-medium uppercase tracking-wider text-[#272125]/60">Escale sua operação</div>
            <h2 className="mb-7 max-w-3xl font-serif text-4xl leading-[1.05] text-[#272125] sm:text-5xl lg:text-[3.4rem]">
              Quando seu analista ganha tempo, a produtividade da equipe aumenta.
            </h2>
            <p className="mb-20 max-w-xl text-lg font-light leading-relaxed text-[#272125]/70">
              A Nivi ajuda analistas, gerentes e comitês a reduzir tempo de coleta, padronizar pareceres e encontrar sinais que passam batido.
            </p>
          </div>

          <div className="grid gap-10 pb-14 sm:grid-cols-2 sm:gap-20 lg:w-[47rem] lg:grid-cols-[15rem_15rem]">
            {[
              ["80%", "menos tempo reunindo documentos e evidências para o parecer."],
              ["2x", "pelo menos mais oportunidades analisadas pelo mesmo time."],
            ].map(([value, copy]) => (
              <div key={value} className="min-h-36 border-l border-[#272125]/12 pl-6">
                <div className="mb-3 text-4xl font-semibold leading-none text-[#272125]">{value}</div>
                <div className="max-w-[190px] text-base font-light leading-relaxed text-[#272125]/68">{copy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 font-serif text-3xl leading-[1.15] text-[#272125] sm:text-4xl lg:text-[2.75rem]">
          “A Nivi tira a análise do modo caça-documento e coloca o time direto na decisão.”
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#272125] font-serif text-xl text-white">G</div>
          <div>
            <div className="text-base font-medium text-[#272125]">Guilherme Bausas</div>
            <div className="text-base font-light text-[#272125]/60">Head de Crédito, Larca Capital</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 border-t border-[#272125]/10 pt-20 lg:grid-cols-[1fr_0.92fr] lg:gap-24">
          <h2 className="font-serif text-4xl leading-[1.05] text-[#272125] sm:text-5xl lg:text-[3.4rem]">
            Perguntas e respostas
          </h2>

          <div className="divide-y divide-[#272125]/10 border-t border-[#272125]/10">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-8 py-7 text-left"
                  >
                    <span className="text-lg font-light leading-relaxed text-[#272125] transition-opacity group-hover:opacity-70">
                      {faq.question}
                    </span>
                    <Plus
                      className={`h-4 w-4 shrink-0 stroke-[1.5] text-[#272125]/45 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p id={answerId} className="-mt-2 pb-7 pr-12 text-base font-light leading-relaxed text-[#272125]/68">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-16 max-w-4xl font-serif text-4xl leading-[1.05] text-[#272125] sm:text-5xl lg:text-[3.4rem]">
          Planos para usar a Nivi como assistente.
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="flex min-h-[37rem] flex-col rounded-[1.35rem] border border-[#272125]/8 bg-[#E8E4E7] p-8 shadow-[0_1px_2px_rgba(39,33,37,0.06)]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-medium text-[#272125]">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-[#D3CED2] px-4 py-1 text-xs font-semibold text-[#272125]">Mais popular</span>
                )}
              </div>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-[2rem] font-medium leading-none text-[#272125]">{plan.price}</span>
                {plan.period && <span className="pb-1 text-base font-light text-[#272125]/60">{plan.period}</span>}
              </div>
              <p className="mb-10 min-h-[3.5rem] max-w-xs text-base font-light leading-relaxed text-[#272125]/68">{plan.copy}</p>

              <ul className="mb-10 space-y-5">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-base font-light leading-snug text-[#272125]/72">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5] text-[#272125]/45" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={demoHref}
                target="_blank"
                rel="noreferrer"
                className={`mt-auto w-full rounded-full border px-8 py-4 text-center text-base font-semibold transition-colors ${plan.highlighted
                    ? "border-[#272125] bg-[#272125] text-white shadow-[0_6px_14px_rgba(39,33,37,0.18)] hover:bg-[#272125]/90"
                    : "border-[#272125]/8 bg-[#DDD8DC] text-[#272125] hover:bg-[#D6D0D5]"
                  }`}
              >
                Fale com especialista
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="invite" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#E5E0E3] px-8 py-20 text-center">
          <h2 className="mx-auto mb-6 max-w-2xl font-serif text-4xl leading-[1.1] text-[#272125] sm:text-5xl">
            Pronto para acelerar o crédito da sua companhia com a Nivi?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-[#272125]/70">
            Agende uma demonstração e veja como a Nivi acelera a análise de crédito da sua equipe com documentos reais.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={demoHref} target="_blank" rel="noreferrer" className="w-full rounded-full bg-[#272125] px-8 py-3 text-center text-base font-medium text-white shadow-md transition-colors hover:bg-[#272125]/90 sm:w-auto">
              Agendar demo
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-medium text-[#272125] transition-colors hover:bg-black/5 sm:w-auto">
              Fale conosco <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-10 border-t border-black/[0.05] bg-[#EFECEE] pb-12 pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="mb-4 font-serif text-3xl text-[#272125]">Nivi.</div>
            <p className="max-w-md text-base font-light leading-relaxed text-[#272125]/60">
              Sua assistente para otimizar sua operação e ir para o próximo nível.
            </p>
          </div>
          {[
            ["Produto", "Features", "Planos"],
          ].map(([heading, ...links]) => (
            <div key={heading}>
              <div className="mb-4 text-base font-medium text-[#272125]">{heading}</div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href={link === "Features" ? "#about" : link === "Planos" ? "#pricing" : "#"} className="text-base font-light text-[#272125]/60 transition-colors hover:text-[#272125]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="mb-4 text-base font-medium text-[#272125]">Social</div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-base font-light text-[#272125]/60 transition-colors hover:text-[#272125]">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="mb-4 text-base font-medium text-[#272125]">Contato</div>
            <div className="space-y-3 text-base font-light leading-relaxed text-[#272125]/60">
              <p>(11) 97172-8811</p>
              <p>Rua Hungria, 888, 8º andar - Jardim Europa, São Paulo, SP 01455-905, BR</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 px-6 text-sm font-light text-[#272125]/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Nivi. Todos os direitos reservados.</span>
          <span>Feita para times de crédito que preferem evidência a achismo.</span>
        </div>
      </footer>
    </div>
  );
}
