"use client";

import React, { useState } from "react";
import {
  Shield,
  Truck,
  Users,
  CalendarCheck,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Radio,
  FileCheck,
  ExternalLink,
  Award,
  Layers,
  Search,
  Bell,
  Check,
  X,
  RefreshCw,
  FolderLock
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"todos" | "efetivo" | "logistica" | "escalas" | "documental">("todos");
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  // Estados de demonstração interativa
  const [permutasPendentes, setPermutasPendentes] = useState([
    {
      id: "perm-1",
      solicitante: "Sd BM Rocha",
      substituto: "Sd BM Lima",
      dataOriginal: "14/05/2026",
      dataPaga: "22/05/2026",
      posto: "Guarnição Alfa (ABT-01)",
      motivo: "Comparecimento a audiência judicial em Manaus devidamente comprovada.",
      status: "AGUARDANDO_COMANDO"
    },
    {
      id: "perm-2",
      solicitante: "Cb BM Souza",
      substituto: "Cb BM Ferreira",
      dataOriginal: "18/05/2026",
      dataPaga: "25/05/2026",
      posto: "Guarnição Bravo (UR-02)",
      motivo: "Participação em instrução de especialização de resgate veicular pesado.",
      status: "AGUARDANDO_COMANDO"
    }
  ]);

  const aprovarPermuta = (id: string, deferida: boolean) => {
    setPermutasPendentes(prev => prev.filter(p => p.id !== id));
    alert(deferida ? "Permuta DEFERIDA pelo Comando! Escala atualizada e documento timbrado arquivado." : "Permuta INDEFERIDA pelo Comando.");
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans">
      {/* BARRA SUPERIOR DE COMANDO MILITAR */}
      <header className="border-b border-slate-800 bg-[#0c1322] sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-red-600 via-red-700 to-amber-700 flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-500/30">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wider text-white">SIGO-CBMAM</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800/60">
                  Unidade Itacoatiara
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Corpo de Bombeiros Militar do Estado do Amazonas • Posto Avançado Rio Amazonas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-3 bg-slate-900/90 px-3.5 py-1.5 rounded-lg border border-slate-800">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-slate-300 font-semibold">Prontidão:</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider">Guarnição Alfa</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Oficial de Dia: <strong className="text-slate-200">Cap BM Juliana</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-xs">
                MR
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-200 leading-tight">Maj BM Rodrigo</div>
                <div className="text-[10px] text-amber-400 font-medium">Comandante da Unidade</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SUB-HEADER: NAVEGAÇÃO DE CATEGORIAS E STATUS GERAL */}
      <nav className="bg-[#0b101d] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { id: "todos", label: "Visão Geral dos Quadros", icon: Layers },
              { id: "efetivo", label: "1. Efetivo & Pessoal", icon: Users },
              { id: "logistica", label: "2. Logística & Materiais", icon: Truck },
              { id: "escalas", label: "3. Escalas & SEGs", icon: CalendarCheck },
              { id: "documental", label: "4. Documentos & Permutas", icon: FileText },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-950/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
            SISTEMA OPERACIONAL ATIVO • CBMAM 2026
          </div>
        </div>
      </nav>

      {/* ÁREA PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6 w-full">
        {/* BARRA DE MÉTRICAS RÁPIDAS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0e1626] border border-slate-800/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-red-600" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Efetivo de Prontidão</p>
                <h3 className="text-2xl font-black text-white mt-1">28 <span className="text-xs font-normal text-emerald-400">/ 32 ativos</span></h3>
              </div>
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 4 militares em folga regulamentar
            </p>
          </div>

          <div className="bg-[#0e1626] border border-slate-800/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-600" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Viaturas em Linha</p>
                <h3 className="text-2xl font-black text-white mt-1">4 <span className="text-xs font-normal text-slate-400">em serviço</span></h3>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> ABT-01, UR-02, ABS-03, L-01
            </p>
          </div>

          <div className="bg-[#0e1626] border border-slate-800/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-amber-500" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">SEGs Abertas</p>
                <h3 className="text-2xl font-black text-amber-400 mt-1">2 <span className="text-xs font-normal text-slate-400">editais</span></h3>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/40 text-amber-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> 6 vagas disponíveis no mobile
            </p>
          </div>

          <div className="bg-[#0e1626] border border-slate-800/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-purple-600" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Permutas Pendentes</p>
                <h3 className="text-2xl font-black text-purple-400 mt-1">{permutasPendentes.length} <span className="text-xs font-normal text-slate-400">p/ despacho</span></h3>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-900/40 text-purple-400">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Aguardando aval do Comandante
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* OS 4 GRANDES QUADROS POR CATEGORIA (ADMIN WEB)                             */}
        {/* ========================================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* QUADRO 1: ADMINISTRAÇÃO & EFETIVO */}
          {(activeTab === "todos" || activeTab === "efetivo") && (
            <div className="bg-[#0c1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-slate-700">
              <div className="bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">Quadro 1: Administração & Efetivo</h2>
                    <p className="text-xs text-slate-400">Controle Cadastral, CNHs, Cursos e Funções Táticas</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-mono">
                  32 Cadastrados
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Item Militar 1 */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs border border-slate-600">
                        RP
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Maj BM Rodrigo Albuquerque Paes</span>
                          <span className="text-[10px] bg-red-900/50 text-red-300 font-semibold px-2 py-0.5 rounded border border-red-800">Comandante</span>
                        </div>
                        <p className="text-xs text-slate-400">RG: BM-12345 • QOBM Combatente • CNH B (Venc: 2028)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-medium">
                      Ativo
                    </span>
                  </div>

                  {/* Item Militar 2 */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs border border-slate-600">
                        JM
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Cap BM Juliana Matos Fernandes</span>
                          <span className="text-[10px] bg-blue-900/50 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-800">Oficial de Dia</span>
                        </div>
                        <p className="text-xs text-slate-400">RG: BM-23456 • QOBM Combatente • CNH B (Venc: 2027)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-medium">
                      Ativo
                    </span>
                  </div>

                  {/* Item Militar 3 */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs border border-slate-600">
                        LM
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Cb BM Lucas Mendes Souza</span>
                          <span className="text-[10px] bg-amber-900/50 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-800">Motorista ABT</span>
                        </div>
                        <p className="text-xs text-slate-400">RG: BM-45678 • QPBM • CNH Cat E (Alerta de Renovação Próxima)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/60 font-medium">
                      CNH 2026
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Integração com Supabase Auth & Storage para fotos e prontuários.</span>
                  <button 
                    onClick={() => alert("Módulo de Cadastro Rápido: Conectado à tabela 'perfis' do Supabase.")}
                    className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold"
                  >
                    Novo Cadastro de Militar <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUADRO 2: LOGÍSTICA & ALMOXARIFADO */}
          {(activeTab === "todos" || activeTab === "logistica") && (
            <div className="bg-[#0c1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-slate-700">
              <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">Quadro 2: Logística & Almoxarifado</h2>
                    <p className="text-xs text-slate-400">Tombamento, Cautelas Eletrônicas e Checklists Matinais 08h00</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-950/70 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800/60 font-semibold">
                  100% Conferido
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Status das Viaturas */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111c30] p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-slate-200">ABT-01 (Bomba Tanque)</span>
                        <span className="text-[10px] text-emerald-400 font-bold">100% OK</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Água: 5.000 L • Combustível: Cheio</p>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Passagem Cb Lucas (08:00)
                      </div>
                    </div>

                    <div className="bg-[#111c30] p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-slate-200">UR-02 (Resgate / APH)</span>
                        <span className="text-[10px] text-emerald-400 font-bold">100% OK</span>
                      </div>
                      <p className="text-[11px] text-slate-400">DEA Zoll OK • Cilindro O2 Cheio</p>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Passagem Sd Rocha (08:05)
                      </div>
                    </div>
                  </div>

                  {/* Cautela Ativa em Destaque */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-amber-400" /> Cautela Ativa: Rádio APX2000 (#006)
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        Devolução: Hoje 19:00
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Militar Responsável: <strong>1º Sgt Silva</strong> (Instrução Operacional no Rio Amazonas)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Auditoria imutável garantida por trigger no Postgres.</span>
                  <button 
                    onClick={() => alert("Acesso ao Livro de Carga Geral e Avarias do CBMAM.")}
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Livro de Carga Completo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUADRO 3: ESCALAS OPERACIONAIS & SEGs */}
          {(activeTab === "todos" || activeTab === "escalas") && (
            <div className="bg-[#0c1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-slate-700">
              <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">Quadro 3: Escalas Operacionais & SEG</h2>
                    <p className="text-xs text-slate-400">Matriz Mensal (Alfa/Bravo/Charlie/Delta) e Editais Extras</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-950/70 text-amber-400 px-2.5 py-1 rounded-full border border-amber-800/60 font-semibold">
                  2 SEGs Abertas
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Edital SEG 1 */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">SEG - Operação Fecani / Orla do Rio</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold">R$ 280,00</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Data: Sábado (18:00 às 02:00) • 4 Vagas disponíveis</p>
                      </div>
                      <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-900/60 px-2 py-0.5 rounded">
                        8 Candidatos
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                      <span className="text-slate-400">Critério: Menor qtd de SEGs no mês anterior</span>
                      <button 
                        onClick={() => alert("Triagem automática de candidatos: militares sem impedimento de escala ordinária selecionados com sucesso!")}
                        className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded transition-colors"
                      >
                        Triar Candidatos
                      </button>
                    </div>
                  </div>

                  {/* Edital SEG 2 */}
                  <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">SEG - Guarda-Vidas Prainha Itacoatiara</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold">R$ 250,00</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Data: Domingo (08:00 às 17:00) • 2 Vagas</p>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
                        Homologada
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Notificação push instantânea para o aplicativo mobile.</span>
                  <button 
                    onClick={() => alert("Abertura de novo Edital de SEG: Dispara evento no Realtime do Supabase.")}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    Publicar Nova SEG <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUADRO 4: GESTÃO DOCUMENTAL & COMANDO */}
          {(activeTab === "todos" || activeTab === "documental") && (
            <div className="bg-[#0c1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-slate-700">
              <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">Quadro 4: Documentos & Central de Permutas</h2>
                    <p className="text-xs text-slate-400">Homologação do Comando, Boletins BI/BG e Despachos Oficiais</p>
                  </div>
                </div>
                <span className="text-xs bg-purple-950/70 text-purple-400 px-2.5 py-1 rounded-full border border-purple-800/60 font-semibold">
                  {permutasPendentes.length} Pendente(s)
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {permutasPendentes.length === 0 ? (
                    <div className="bg-[#111c30] p-6 rounded-xl border border-slate-800 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-200">Todas as permutas foram homologadas!</p>
                      <p className="text-xs text-slate-400 mt-1">Escalas e registros atualizados no Supabase.</p>
                    </div>
                  ) : (
                    permutasPendentes.map(permuta => (
                      <div key={permuta.id} className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">
                            {permuta.solicitante} ⇄ {permuta.substituto}
                          </span>
                          <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-medium">
                            Aguardando Comandante
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1.5">
                          <strong>Original:</strong> {permuta.dataOriginal} • <strong>Paga:</strong> {permuta.dataPaga} ({permuta.posto})
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 italic">
                          "{permuta.motivo}"
                        </p>

                        <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                          <button
                            onClick={() => aprovarPermuta(permuta.id, false)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-950 hover:bg-red-900 text-red-300 text-xs rounded border border-red-800 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Indeferir
                          </button>
                          <button
                            onClick={() => aprovarPermuta(permuta.id, true)}
                            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded shadow-md shadow-emerald-950 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" /> Deferir e Publicar
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Publicação de BI */}
                  <div className="bg-[#111c30] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Boletim Interno nº 042/2026</div>
                        <div className="text-[10px] text-slate-400">Publicado em 23/10/2026 pelo Maj BM Rodrigo</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Download/Visualização do PDF com timbre oficial CBMAM.")}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                    >
                      Ver PDF <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Despachos gerados com timbre oficial do CBMAM.</span>
                  <button 
                    onClick={() => alert("Upload de novo Boletim Interno / Geral: Gera notificação automática no feed mobile.")}
                    className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Publicar Novo Boletim <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FEED OPERACIONAL EM TEMPO REAL (CANAL DE INTEGRAÇÃO COM O APP MOBILE) */}
        <section className="bg-[#0c1424] border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <h3 className="text-base font-bold text-white tracking-wide">
                Feed Operacional Integrado (Realtime Quartel)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Sincronizado com App Mobile da Guarnição
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                  Aviso CMT • Pinado
                </span>
                <h4 className="text-xs font-bold text-white mt-2">Diretriz Operacional Fecani</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Revisão completa das embarcações de resgate e testes dos motores de popa no Rio Amazonas.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 font-mono">Há 2 horas • Por Maj BM Rodrigo</p>
            </div>

            <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                  Checklist Matinal
                </span>
                <h4 className="text-xs font-bold text-white mt-2">ABT-01 100% Operacional</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Conferência matinal das 08h00 finalizada pelo Cb Lucas Mendes sem avarias de equipamentos.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 font-mono">Hoje às 08:00 • Guarnição Alfa</p>
            </div>

            <div className="bg-[#111c30] p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60">
                  Edital SEG Aberto
                </span>
                <h4 className="text-xs font-bold text-white mt-2">Vagas para Salvamento na Orla</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Inscrições abertas no App Mobile para serviço no fim de semana. Vagas prioritárias por escala.
                </p>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 font-mono">Ontem • Adm do Comando</p>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-4 text-center text-xs text-slate-500">
        <p>SIGO-CBMAM • Destacamento Bombeiro Militar de Itacoatiara – Amazonas</p>
        <p className="text-[10px] text-slate-600 mt-1">
          Hospedado na Vercel • Supabase Database & Auth • CI/CD via GitHub Actions
        </p>
      </footer>
    </div>
  );
}
