import { useState, useEffect } from "react";
import { Search, FileText, Presentation, Table, ArrowRight, Shield, CheckCircle2, ChevronRight, BarChart3, Clock, Database, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"Dossiê" | "Slides" | "Planilha">("Dossiê");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    if (!prompt) return;
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setPrompt("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-tighter text-primary font-medium">Nivi</div>
          <div className="flex items-center gap-6 text-sm">
            <button className="text-muted-foreground hover:text-foreground transition-colors">Manifesto</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Segurança</button>
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
              Austeridade analítica.<br />Escala algorítmica.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans font-light mb-12">
              Transforme dados brutos, demonstrações financeiras e históricos de mercado em decisões de crédito fundamentadas em segundos.
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
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Peça para o Nivi analisar o crédito de..."
                  className="w-full bg-transparent border-none resize-none focus:outline-none min-h-[80px] text-lg font-sans placeholder:text-muted-foreground/60 text-foreground"
                />
              </div>

              {/* Output Selectors */}
              <div className="px-4 py-3 border-t border-border/50 bg-muted/20 flex items-center justify-between rounded-b-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-2">Formato:</span>
                  {(["Dossiê", "Slides", "Planilha"] as const).map((format) => {
                    const icons = {
                      "Dossiê": FileText,
                      "Slides": Presentation,
                      "Planilha": Table
                    };
                    const Icon = icons[format];
                    const isSelected = selectedFormat === format;
                    return (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
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
                  disabled={!prompt || isSimulating}
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
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                O dossiê que você leria.<br />Escrito antes de você pedir.
              </h2>
              <p className="text-muted-foreground font-sans text-lg mb-8 leading-relaxed">
                Nivi ingere PDFs extensos, planilhas despadronizadas e extratos bancários. Em minutos, estrutura o racional de crédito sob as lentes do seu comitê de risco.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Análise horizontal e vertical de DRE",
                  "Cálculo de covenants e índices de liquidez",
                  "Apontamentos restritivos (Serasa, Bacen, SCR)",
                  "Projeção de capacidade de pagamento"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card border border-border/60 rounded-xl p-8 shadow-sm relative"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 flex gap-2">
                <span className="bg-background border border-border text-xs px-2 py-1 rounded shadow-sm text-muted-foreground">PDF</span>
                <span className="bg-background border border-border text-xs px-2 py-1 rounded shadow-sm text-muted-foreground">XLSX</span>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-semibold text-lg text-primary">Risco de Liquidez</h4>
                    <span className="text-xs font-mono bg-destructive/10 text-destructive px-2 py-1 rounded">ALTO</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A empresa apresenta descasamento no curto prazo. O índice de liquidez corrente caiu de 1.2 para 0.8 no último trimestre, pressionado por antecipação de recebíveis.
                  </p>
                </div>
                <div className="h-px bg-border/50" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-semibold text-lg text-primary">Capacidade de Pagamento</h4>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">ADEQUADO</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Apesar da pressão de liquidez, a margem EBITDA sustentada em 18% permite cobertura do serviço da dívida proposto com folga de 1.4x.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outputs Formats */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif text-primary mb-4">Saídas preparadas para o comitê</h2>
            <p className="text-muted-foreground font-sans">
              O trabalho de análise não termina na conclusão. Termina na apresentação.
              Nivi entrega no formato que o seu processo exige.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Dossiê Executivo",
                desc: "Documento textual longo, parágrafos densos, focado no racional de decisão. Ideal para registro formal e auditoria."
              },
              {
                icon: Presentation,
                title: "Slides Resumo",
                desc: "Bullet points, gráficos de tendência e destaques visuais. Formatado para defesa rápida em comitê de crédito."
              },
              {
                icon: Table,
                title: "Planilha de Covenants",
                desc: "Dados extraídos e estruturados em células, prontos para integração no seu modelo interno de rating."
              }
            ].map((format, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-6 rounded-lg border border-border/40 hover:border-primary/20 bg-background transition-colors hover:shadow-sm"
              >
                <format.icon className="w-8 h-8 text-primary/40 mb-4 group-hover:text-primary transition-colors" />
                <h3 className="font-serif text-lg text-primary mb-2">{format.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {format.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-32 px-6">
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
