"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  Truck,
  CalendarCheck,
  FileText,
  Shield,
  ArrowRight,
  ArrowLeft,
  LogOut,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Check,
  X,
  Search,
  PlusCircle,
  FileBadge2,
  Sparkles,
  Lock,
  UserCheck
} from "lucide-react";

export default function App() {
  // Estado de Autenticação
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rgMilitar, setRgMilitar] = useState("");
  const [senha, setSenha] = useState("");
  
  // Usuário Atual
  const [usuario, setUsuario] = useState({
    nome: "Maj BM Rodrigo Paes",
    posto: "Major BM",
    funcao: "Comandante do 17º GBM",
    unidade: "17º GBM - Itacoatiara / AM",
    avatar: "MR"
  });

  // Módulo ativo: null = Hub de Quadros Grandes; ou "efetivo", "logistica", "escalas", "documental"
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(null);

  // Estados de demonstração interativa
  const [permutas, setPermutas] = useState([
    {
      id: "perm-1",
      solicitante: "Sd BM Rocha",
      substituto: "Sd BM Lima",
      dataOriginal: "14/05/2026",
      dataPaga: "22/05/2026",
      posto: "Guarnição Alfa (ABT-01)",
      motivo: "Comparecimento a audiência judicial em Manaus com comprovação anexa.",
      status: "AGUARDANDO_COMANDO"
    },
    {
      id: "perm-2",
      solicitante: "Cb BM Souza",
      substituto: "Cb BM Ferreira",
      dataOriginal: "18/05/2026",
      dataPaga: "25/05/2026",
      posto: "Guarnição Bravo (UR-02)",
      motivo: "Participação em instrução de resgate veicular pesado.",
      status: "AGUARDANDO_COMANDO"
    }
  ]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLoginDemo = (tipo: "cmt" | "oficial") => {
    if (tipo === "cmt") {
      setUsuario({
        nome: "Maj BM Rodrigo Paes",
        posto: "Major BM",
        funcao: "Comandante do 17º GBM",
        unidade: "17º GBM - Itacoatiara / AM",
        avatar: "MR"
      });
    } else {
      setUsuario({
        nome: "Cap BM Juliana Matos",
        posto: "Capitão BM",
        funcao: "Oficial de Dia",
        unidade: "17º GBM - Itacoatiara / AM",
        avatar: "JM"
      });
    }
    setIsLoggedIn(true);
  };

  const aprovarPermuta = (id: string, deferida: boolean) => {
    setPermutas(prev => prev.filter(p => p.id !== id));
    alert(deferida ? "Permuta homologada e DEFERIDA com sucesso! Escala atualizada." : "Permuta INDEFERIDA pelo Comando.");
  };

  // =========================================================================
  // 1. TELA DE LOGIN (TEMA CLARO, CLEAN E PROFISSIONAL)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 flex flex-col justify-center items-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/60 p-8 flex flex-col items-center">
          {/* Logo Oficial Enviada */}
          <div className="relative w-36 h-36 mb-2">
            <Image
              src="/logo.png"
              alt="SIGO 17º GBM"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              SIGO — 17º GBM
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Sistema Integrado de Gestão Operacional e Administrativa
            </p>
            <div className="inline-block mt-2 px-2.5 py-0.5 bg-red-50 text-red-700 text-[11px] font-semibold rounded-full border border-red-200">
              Corpo de Bombeiros Militar de Itacoatiara - AM
            </div>
          </div>

          {/* Formulário de Acesso */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                RG Militar ou E-mail
              </label>
              <input
                type="text"
                placeholder="Ex: BM-12345 ou militar@cbm.am.gov.br"
                value={rgMilitar}
                onChange={e => setRgMilitar(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Senha de Acesso
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Acessar Sistema
            </button>
          </form>

          {/* Atalhos de Acesso Rápido para Demonstração */}
          <div className="w-full mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Acesso Rápido de Teste
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2.5">
              <button
                type="button"
                onClick={() => handleLoginDemo("cmt")}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <UserCheck className="w-3.5 h-3.5 text-red-600" />
                Como Comandante
              </button>
              <button
                type="button"
                onClick={() => handleLoginDemo("oficial")}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Como Oficial de Dia
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 text-center">
          SIGO-CBMAM v2.0 • 17º Batalhão Bombeiro Militar de Itacoatiara
        </p>
      </div>
    );
  }

  // =========================================================================
  // 2. PAINEL PÓS-LOGIN (PORTAL LIMPO E QUADROS GRANDES COM OS MÓDULOS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* HEADER SUPERIOR LIMPO E INSTITUCIONAL */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 cursor-pointer" onClick={() => setModuloAtivo(null)}>
              <Image
                src="/logo.png"
                alt="SIGO 17º GBM"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-base">
                  SIGO
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  17º GBM Itacoatiara
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Corpo de Bombeiros Militar do Estado do Amazonas
              </p>
            </div>
          </div>

          {/* Perfil do Militar e Botão Sair */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100/80 py-1.5 px-3 rounded-xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {usuario.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {usuario.nome}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {usuario.funcao}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                setModuloAtivo(null);
              }}
              title="Encerrar Sessão"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ÁREA CENTRAL */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================================= */}
        {/* TELA A: HUB DE QUADROS GRANDES (QUANDO NENHUM MÓDULO ESTÁ ABERTO)         */}
        {/* ========================================================================= */}
        {moduloAtivo === null ? (
          <div className="space-y-8">
            {/* Boas-Vindas e Resumo Operacional Limpo */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Painel de Comando e Gestão
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Selecione um dos 4 módulos abaixo para acessar as operações correspondentes.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Prontidão de Serviço: <strong>Guarnição Alfa</strong></span>
              </div>
            </div>

            {/* OS 4 QUADROS GRANDES COM AS CATEGORIAS DE ACESSO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* QUADRO 1: ADMINISTRAÇÃO & EFETIVO */}
              <div
                onClick={() => setModuloAtivo("efetivo")}
                className="bg-white border-2 border-slate-200/80 hover:border-red-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Users className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                      32 Militares
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    1. Administração & Efetivo
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Controle cadastral completo da unidade, patentes, funções táticas, alertas de validade de CNHs e registro de cursos periódicos.
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Quadro de Oficiais e Praças atualizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>1 militar com CNH próxima do vencimento</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>Acessar Módulo de Efetivo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* QUADRO 2: LOGÍSTICA & ALMOXARIFADO */}
              <div
                onClick={() => setModuloAtivo("logistica")}
                className="bg-white border-2 border-slate-200/80 hover:border-blue-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Truck className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                      Viaturas 100% OK
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    2. Logística & Almoxarifado
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Livro de carga e tombamento, cautelas eletrônicas de equipamentos com assinatura digital e auditoria dos checklists matinais das 08h00.
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>ABT-01, UR-02, ABS-03 e Lancha em linha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-blue-500" />
                      <span>1 cautela ativa de rádio com devolução hoje</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Acessar Módulo de Logística</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* QUADRO 3: ESCALAS OPERACIONAIS & SEGs */}
              <div
                onClick={() => setModuloAtivo("escalas")}
                className="bg-white border-2 border-slate-200/80 hover:border-amber-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all">
                      <CalendarCheck className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                      2 Editais Abertos
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    3. Escalas Operacionais & SEG
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Matriz mensal das guarnições (Alfa, Bravo, Charlie, Delta), abertura de Serviços Extras Gratificados e triagem automática de candidatos.
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Escala ordinária de Maio/2026 fechada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>6 vagas de SEG disponíveis para candidatura</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>Acessar Módulo de Escalas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* QUADRO 4: GESTÃO DOCUMENTAL & PERMUTAS */}
              <div
                onClick={() => setModuloAtivo("documental")}
                className="bg-white border-2 border-slate-200/80 hover:border-purple-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <FileText className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                      {permutas.length} p/ Homologar
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                    4. Gestão Documental & Permutas
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Central de homologação de permutas pelo Comando, publicação de Boletins Internos (BI) e Gerais (BG) e geração de despachos timbrados.
                  </p>

                  <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <FileBadge2 className="w-3.5 h-3.5 text-purple-500" />
                      <span>Último BI nº 042/2026 arquivado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{permutas.length} permutas aguardando parecer</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                  <span>Acessar Módulo Documental</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* TELA B: VISÃO DEDICADA DE UM MÓDULO (LIMPA, FOCO TOTAL, SEM POLUIÇÃO)     */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Botão Superior para Voltar ao Hub de Quadros */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setModuloAtivo(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-bold shadow-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar aos Módulos Principais
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Navegação: Hub Principal &gt; <strong className="text-slate-800 capitalize">{moduloAtivo}</strong>
              </div>
            </div>

            {/* CONTEÚDO DO MÓDULO 1: ADMINISTRAÇÃO & EFETIVO */}
            {moduloAtivo === "efetivo" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Módulo 1: Administração & Efetivo
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Controle nominal, qualificação profissional e prontuário dos militares do 17º GBM.
                    </p>
                  </div>
                  <button 
                    onClick={() => alert("Formulário de cadastro aberto para inserção de novo militar no banco.")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Novo Cadastro
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { nome: "Maj BM Rodrigo Albuquerque Paes", rg: "BM-12345", funcao: "Comandante da Unidade", cnh: "Cat B (2028)", status: "Ativo" },
                    { nome: "Cap BM Juliana Matos Fernandes", rg: "BM-23456", funcao: "Oficial de Dia", cnh: "Cat B (2027)", status: "Ativo" },
                    { nome: "1º Sgt BM Carlos Eduardo Silva", rg: "BM-34567", funcao: "Almoxarife / Mecânico", cnh: "Cat D (2027)", status: "Ativo" },
                    { nome: "Cb BM Lucas Mendes Souza", rg: "BM-45678", funcao: "Motorista Socorrista ABT-01", cnh: "Cat E (Maio/2026 - Alerta)", status: "Ativo" },
                    { nome: "Sd BM Thiago Rocha Lima", rg: "BM-56789", funcao: "Linha de Fogo / Resgate", cnh: "Cat B (2029)", status: "Ativo" },
                  ].map((militar, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                          {militar.nome.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{militar.nome}</div>
                          <div className="text-xs text-slate-500">
                            RG: {militar.rg} • Função: {militar.funcao} • CNH: {militar.cnh}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                        {militar.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTEÚDO DO MÓDULO 2: LOGÍSTICA & ALMOXARIFADO */}
            {moduloAtivo === "logistica" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-black text-slate-900">
                    Módulo 2: Logística & Almoxarifado
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Conferência das viaturas, cautelas ativas e registros dos checklists matinais das 08h00.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-bold text-slate-900">ABT-01 (Auto Bomba Tanque)</h4>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">100% Operacional</span>
                    </div>
                    <p className="text-xs text-slate-500">Água: 5.000 L • Combustível: Cheio • Desencarcerador Lucas OK</p>
                    <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Checklist matinal conferido por Cb Lucas Mendes às 08:00
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-bold text-slate-900">UR-02 (Unidade de Resgate / APH)</h4>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">100% Operacional</span>
                    </div>
                    <p className="text-xs text-slate-500">DEA Zoll OK • Cilindro de Oxigênio 100% • Prancha Rígida OK</p>
                    <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Checklist matinal conferido por Sd Rocha às 08:05
                    </div>
                  </div>
                </div>

                {/* Cautela em Andamento */}
                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-blue-600" /> Cautela Ativa de Equipamento
                    </h4>
                    <span className="text-xs bg-white text-blue-700 font-bold px-2.5 py-0.5 rounded border border-blue-200">
                      Devolução Prevista: Hoje às 19:00
                    </span>
                  </div>
                  <p className="text-xs text-blue-950 mt-1">
                    Rádio APX2000 (Tombamento #006) sob responsabilidade de <strong>1º Sgt Silva</strong> para instrução fluvial no Rio Amazonas.
                  </p>
                </div>
              </div>
            )}

            {/* CONTEÚDO DO MÓDULO 3: ESCALAS OPERACIONAIS & SEGs */}
            {moduloAtivo === "escalas" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Módulo 3: Escalas Operacionais & SEG
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Grade mensal de serviço e editais de Serviço Extra Gratificado (SEG).
                    </p>
                  </div>
                  <button 
                    onClick={() => alert("Abertura de edital de SEG: Notificação instantânea disparada para o Mobile.")}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Publicar Novo Edital SEG
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">SEG: Prevenção Aquática Orla de Itacoatiara</h4>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">R$ 280,00</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Sábado (14:00 às 22:00) • 4 Vagas disponíveis</p>
                      </div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                        8 Militares Candidatados
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Critério legal: menor quantidade de SEGs no mês vigente.</span>
                      <button 
                        onClick={() => alert("Triagem realizada com sucesso! Militares aptos selecionados e lista nominal gerada para o Boletim.")}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm"
                      >
                        Triar Candidatos Automaticamente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTEÚDO DO MÓDULO 4: GESTÃO DOCUMENTAL & PERMUTAS */}
            {moduloAtivo === "documental" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-black text-slate-900">
                    Módulo 4: Gestão Documental & Central de Permutas
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Homologação de trocas de serviço pelo Comando e publicação de boletins oficiais.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Permutas Aguardando Parecer do Comando ({permutas.length})
                  </h3>

                  {permutas.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-slate-800">Todas as permutas foram homologadas!</p>
                      <p className="text-xs text-slate-500 mt-0.5">As escalas foram automaticamente atualizadas no banco.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {permutas.map(permuta => (
                        <div key={permuta.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm font-bold text-purple-900">
                              {permuta.solicitante} ⇄ {permuta.substituto}
                            </span>
                            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                              Aguardando Decisão do Comandante
                            </span>
                          </div>

                          <p className="text-xs text-slate-700">
                            <strong>Data Original:</strong> {permuta.dataOriginal} • <strong>Data da Paga:</strong> {permuta.dataPaga} ({permuta.posto})
                          </p>
                          <p className="text-xs text-slate-500 italic bg-white p-2.5 rounded-lg border border-slate-200">
                            "{permuta.motivo}"
                          </p>

                          <div className="pt-2 flex justify-end gap-2">
                            <button
                              onClick={() => aprovarPermuta(permuta.id, false)}
                              className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" /> Indeferir
                            </button>
                            <button
                              onClick={() => aprovarPermuta(permuta.id, true)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" /> Deferir e Publicar Despacho
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* RODAPÉ CLEAN */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-400">
        SIGO 17º GBM • Corpo de Bombeiros Militar de Itacoatiara – AM
      </footer>
    </div>
  );
}
