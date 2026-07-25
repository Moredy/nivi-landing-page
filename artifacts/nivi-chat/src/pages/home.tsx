import { useState, useEffect, useRef } from "react";
import { Search, FileText, ArrowRight, Shield, CheckCircle2, ChevronRight, BarChart3, Clock, Database, Lock, Paperclip, X, Send, AlertTriangle, CheckCircle, Users, PenLine, Gavel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER_SUGGESTIONS = [
  "Gere um relatório simples da empresa ACME S.A. (CNPJ 12.345.678/0001-90)",
  "Faça um resumo rápido da situação financeira da empresa Beta Ltda.",
  "Explique em linguagem simples os principais riscos do CNPJ 98.765.432/0001-10",
  "Busque sinais de fraude cruzando documentos, SCR e processos do CNPJ 12.345.678/0001-90",
  "Relacione certidões, ações judiciais e alertas de compliance do CPF 123.456.789-09",
  "Cruze balanço e DRE com SCR para estimar risco de crédito do CNPJ 98.765.432/0001-10",
  "Confronte contratos e garantias com dívida pública e passivos do CNPJ 45.678.901/0001-55",
  "Compare bases processuais, protestos e compliance para detectar fraude no CPF 987.654.321-00",
  "Identifique inconsistências entre demonstrativos e dados externos do CNPJ 23.456.789/0001-11",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"Dossiê" | "Livre" | null>("Livre");
  const [isSimulating, setIsSimulating] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [chatStep, setChatStep] = useState(0);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeletingPlaceholder, setIsDeletingPlaceholder] = useState(false);
  const [showPlaceholderCaret, setShowPlaceholderCaret] = useState(true);
  const chatStarted = useRef(false);

  useEffect(() => {
    if (prompt) {
      setAnimatedPlaceholder("");
      return;
    }

    const currentText = PLACEHOLDER_SUGGESTIONS[placeholderIndex];
    const isTyping = !isDeletingPlaceholder;

    const speed = isTyping ? 42 : 28;
    const holdWhenComplete = 1200;
    const holdWhenEmpty = 280;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (isTyping && animatedPlaceholder.length < currentText.length) {
      timeoutId = setTimeout(() => {
        setAnimatedPlaceholder(currentText.slice(0, animatedPlaceholder.length + 1));
      }, speed);
    } else if (isTyping && animatedPlaceholder.length === currentText.length) {
      timeoutId = setTimeout(() => {
        setIsDeletingPlaceholder(true);
      }, holdWhenComplete);
    } else if (!isTyping && animatedPlaceholder.length > 0) {
      timeoutId = setTimeout(() => {
        setAnimatedPlaceholder(currentText.slice(0, animatedPlaceholder.length - 1));
      }, speed);
    } else {
      timeoutId = setTimeout(() => {
        setIsDeletingPlaceholder(false);
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_SUGGESTIONS.length);
      }, holdWhenEmpty);
    }

    return () => clearTimeout(timeoutId);
  }, [animatedPlaceholder, isDeletingPlaceholder, placeholderIndex, prompt]);

  useEffect(() => {
    if (prompt) {
      setShowPlaceholderCaret(false);
      return;
    }

    const intervalId = setInterval(() => {
      setShowPlaceholderCaret((prev) => !prev);
    }, 500);

    return () => clearInterval(intervalId);
  }, [prompt]);

  const startChatSequence = () => {
    if (chatStarted.current) return;
    chatStarted.current = true;
    const timers = [
      setTimeout(() => setChatStep(1), 300),   // user message 1
      setTimeout(() => setChatStep(2), 1300),  // typing indicator
      setTimeout(() => setChatStep(3), 3000),  // nivi response
      setTimeout(() => setChatStep(4), 3900),  // insight cards
      setTimeout(() => setChatStep(5), 5200),  // typing indicator (user)
      setTimeout(() => setChatStep(6), 6000),  // user message 2
    ];
    return () => timers.forEach(clearTimeout);
  };

  const handleSimulate = () => {
    if (!prompt && attachments.length === 0) return;
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setPrompt("");
      setAttachments([]);
    }, 2500);
  };

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setAttachments((prev) => [...prev, ...Array.from(files)]);
    e.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScrollToPrivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("sigilo-por-design")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("uma-conversa-com-os-seus-dados")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-serif text-2xl tracking-tighter text-primary font-medium">Nivi</div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#uma-conversa-com-os-seus-dados" onClick={handleScrollToAbout} className="text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
              <a href="#sigilo-por-design" onClick={handleScrollToPrivacy} className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</a>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button className="h-9 px-4 text-foreground font-medium hover:text-primary transition-colors">
              Entrar
            </button>
            <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Criar Conta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 subtle-grid pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] mb-6">
              Acelere seu crédito<br />com a IA.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans font-light mb-12">
              O primeiro teste é por nossa conta
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            {/* The Prompt Box */}
            <div 
              className={`relative bg-card rounded-lg border transition-all duration-300 shadow-sm ${
                isFocused ? "border-primary/50 shadow-md ring-4 ring-primary/5" : "border-border"
              }`}
            >
              <div className="p-4 flex items-start gap-3">
                <Search className={`w-5 h-5 mt-1 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
                <div className="w-full">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={`${animatedPlaceholder}${showPlaceholderCaret ? "|" : ""}`}
                    className="w-full bg-transparent border-none resize-none focus:outline-none min-h-[80px] text-lg font-sans placeholder:text-muted-foreground/60 text-foreground"
                  />
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 pb-1">
                      {attachments.map((file, index) => (
                        <span
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-md bg-muted/40 border border-border/50 text-sm text-foreground font-sans"
                        >
                          <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="max-w-[160px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Remover ${file.name}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Output Selectors */}
              <div className="px-4 py-3 border-t border-border/50 bg-muted/20 flex items-center justify-between rounded-b-lg">
                <div className="flex items-center gap-2">
                  <label className="hidden items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 text-sm text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border transition-colors cursor-pointer mr-2">
                    <Paperclip className="w-4 h-4" />
                    Anexar documentos
                    <input
                      type="file"
                      multiple
                      onChange={handleAttach}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
                    />
                  </label>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-2">Formato:</span>
                  {(["Livre", "Dossiê"] as const).map((format) => {
                    const icons = {
                      "Livre": Search,
                      "Dossiê": FileText,
                    };
                    const Icon = icons[format];
                    const isSelected = selectedFormat === format;
                    return (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat((prev) => (prev === format ? null : format))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                          isSelected 
                            ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {format}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={handleSimulate}
                  disabled={(!prompt && attachments.length === 0) || isSimulating}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all disabled:cursor-not-allowed"
                >
                  {isSimulating ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {isSimulating && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-sm text-muted-foreground font-sans flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 animate-pulse" />
                  Cruzando DRE, Balanço Patrimonial e Bacen...
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Rigor Institucional",
                desc: "Sem alucinações. Cada afirmação gerada no dossiê é rastreável até a linha exata do balanço ou certidão consultada."
              },
              {
                title: "Silêncio Operacional",
                desc: "Uma interface que não exige aprendizado. Feita para analistas que precisam de respostas rápidas, não de conversas longas."
              },
              {
                title: "Profundidade Analítica",
                desc: "Vai além do óbvio. Identifica inconsistências entre fluxo de caixa e variações patrimoniais automaticamente."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="h-px w-12 bg-primary/20" />
                <h3 className="font-serif text-xl text-primary">{item.title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section id="uma-conversa-com-os-seus-dados" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-serif text-primary mb-6"
          >
            Uma conversa com os seus dados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-muted-foreground font-sans text-lg leading-relaxed"
          >
            Carregue um balanço, um contrato de crédito ou demonstrativos trimestrais.<br />
            A Nivi sintetiza números e contexto de forma instantânea.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          onViewportEnter={startChatSequence}
          className="max-w-3xl mx-auto bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden"
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-sm">
              N
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Nivi</p>
              <p className="text-xs text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Análise ativa
              </p>
            </div>
          </div>

          {/* Chat body */}
          <div className="px-6 py-8 space-y-6 min-h-[420px]">
            {/* User message */}
            <AnimatePresence>
              {chatStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm leading-relaxed font-sans">
                    Pode analisar os demonstrativos do Q3 da Acme Corp? Preciso de um resumo de liquidez e serviço da dívida.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing indicator (Nivi) */}
            <AnimatePresence>
              {chatStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xs">
                    N
                  </div>
                  <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nivi response */}
            <AnimatePresence>
              {chatStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xs">
                    N
                  </div>
                  <div className="space-y-4 w-full">
                    <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-3 text-sm leading-relaxed font-sans text-foreground">
                      Revisei os demonstrativos do Q3/2023 da Acme Corp e o contrato de crédito fornecido. A receita cresceu 14% ao ano, atingindo R$ 42,5M, mas identifiquei dois fatores relevantes quanto à liquidez.
                    </div>
                    {chatStep >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid sm:grid-cols-2 gap-3"
                      >
                        <div className="bg-card border border-border/60 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-700">Compressão de Liquidez</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Índice de liquidez corrente caiu de 1,5x para 1,1x. Prazo médio de pagamento ampliado para 65 dias (era 45 dias no Q2).
                          </p>
                        </div>
                        <div className="bg-card border border-border/60 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Cobertura do Serviço da Dívida</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            DSCR mantém-se saudável em 1,45x, sustentado por margem EBITDA de 22% e redução do capex.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing indicator (user) */}
            <AnimatePresence>
              {chatStep === 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-primary rounded-lg px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary-foreground/70"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Follow-up user message */}
            <AnimatePresence>
              {chatStep >= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm leading-relaxed font-sans">
                    O que está puxando o alongamento de prazo de fornecedores? Estão preservando caixa?
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat input */}
          <div className="px-6 py-4 border-t border-border/50 bg-muted/20 flex items-center gap-3">
            <input
              disabled
              placeholder="Faça uma pergunta de acompanhamento..."
              className="w-full bg-transparent border-none focus:outline-none text-sm font-sans placeholder:text-muted-foreground/60 text-foreground"
            />
            <button
              disabled
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-70 flex-shrink-0"
              aria-label="Enviar"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Plans (Closed Beta) */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight mb-4">
              Planos para times de crédito
            </h2>
            <p className="text-muted-foreground font-sans">
              Estamos em teste fechado. A estrutura comercial e os limites por plano serão liberados em breve para empresas aprovadas na lista de espera.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Users,
                tier: "Plano Starter",
                audience: "Para squads iniciando com IA no crédito.",
                desc: "Fluxos essenciais de análise e acompanhamento para operações com menor volume.",
              },
              {
                icon: PenLine,
                tier: "Plano Pro",
                audience: "Para esteiras com alto giro e múltiplos analistas.",
                desc: "Mais automações, colaboração entre times e rastreabilidade avançada de evidências.",
              },
              {
                icon: Gavel,
                tier: "Plano Enterprise",
                audience: "Para instituições com governança e requisitos rigorosos.",
                desc: "Controles de segurança expandidos, políticas customizadas e operação dedicada.",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-background p-8 flex flex-col border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-primary/5 border border-primary/15 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/25 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    Em breve
                  </span>
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">{item.tier}</h3>
                <p className="text-sm text-foreground/90 font-sans mb-3">
                  {item.audience}
                </p>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-xs text-muted-foreground/80 font-sans mt-6 pt-5 border-t border-border/50">
                  Disponibilidade inicial para participantes do teste fechado.
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground font-sans mt-8">
            Interessado em prioridade de acesso? Entre na lista de espera para receber o cronograma de abertura pública.
          </p>
        </div>
      </section>

      {/* Security */}
      <section id="sigilo-por-design" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Shield className="w-12 h-12 text-primary/30 mx-auto" />
          <h2 className="text-3xl font-serif text-primary">Sigilo por design</h2>
          <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto leading-relaxed">
            Nenhum dado financeiro transita em modelos públicos. Operamos em infraestrutura isolada (Single-tenant) e não utilizamos os dados dos seus clientes para treinar modelos base. Em conformidade absoluta com a LGPD e resoluções do Bacen.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground pt-4">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50">
              <Lock className="w-4 h-4 text-primary" /> SOC 2 Type II
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50">
              <Database className="w-4 h-4 text-primary" /> Single-tenant disponível
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-serif text-primary-foreground">Eleve o rigor. Reduza a espera.</h2>
          <p className="text-primary-foreground/80 font-sans text-lg max-w-xl mx-auto">
            Abra vagas para acesso antecipado limitadas. Selecionamos parceiros que processam alto volume de esteira de crédito.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-medium hover:bg-primary-foreground/10 transition-colors">
              Entrar
            </button>
            <button className="bg-background text-primary px-8 py-4 rounded-md font-medium hover:bg-background/90 transition-colors inline-flex items-center gap-2">
              Criar Conta <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 text-center text-sm text-muted-foreground font-sans px-6 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-serif text-lg text-primary">Nivi</div>
          <div className="space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <div>© {new Date().getFullYear()} Nivi Chat. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
