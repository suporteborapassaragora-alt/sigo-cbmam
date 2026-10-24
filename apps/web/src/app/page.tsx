"use client";

import React, { useState, useEffect } from "react";
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
  UserCheck,
  Settings,
  Building2,
  MapPin,
  Phone,
  Activity,
  Flame,
  Award,
  Filter,
  Save,
  RotateCcw,
  CheckSquare,
  LifeBuoy,
  Anchor,
  Compass,
  FileSpreadsheet,
  Download,
  Eye,
  Sliders,
  AlertCircle
} from "lucide-react";

// TIPO PARA PERSONALIZAÇÃO DO QUARTEL
interface QuartelConfig {
  nomeUnidade: string;
  sigla: string;
  comandante: string;
  subcomandante: string;
  endereco: string;
  telefoneEmergencia: string;
  telefoneAdministrativo: string;
  cidadeEstado: string;
  diretrizComando: string;
  atuacoes: string[];
}

export default function App() {
  // =========================================================================
  // 1. ESTADO DE AUTENTICAÇÃO E CONFIGURAÇÃO DO QUARTEL
  // =========================================================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rgMilitar, setRgMilitar] = useState("");
  const [senha, setSenha] = useState("");
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Configurações personalizáveis do quartel
  const [quartel, setQuartel] = useState<QuartelConfig>({
    nomeUnidade: "17º Batalhão Bombeiro Militar",
    sigla: "17º GBM / CBMAM",
    comandante: "Maj BM Rodrigo Albuquerque Paes",
    subcomandante: "Cap BM Juliana Matos Fernandes",
    endereco: "Av. Parque, nº 1240 - Centro",
    cidadeEstado: "Itacoatiara - AM, CEP 69100-000",
    telefoneEmergencia: "193 (Emergência CBMAM)",
    telefoneAdministrativo: "(92) 3521-1234 / 98111-0001",
    diretrizComando: "Prontidão Operacional Máxima nas operações ribeirinhas no Rio Amazonas e rodovia AM-010.",
    atuacoes: [
      "Combate a Incêndios Urbanos e Florestais",
      "Busca e Salvamento Fluvial (Rio Amazonas)",
      "Atendimento Pré-Hospitalar (APH Resgate)",
      "Resgate Veicular Pesado (Rodovia AM-010)",
      "Vistorias Técnicas e Defesa Civil Municipal"
    ]
  });

  // Temporário para formulário de configuração
  const [tempConfig, setTempConfig] = useState<QuartelConfig>(quartel);

  // Usuário Atual Logado
  const [usuario, setUsuario] = useState({
    nome: "Maj BM Rodrigo Paes",
    posto: "Major BM",
    funcao: "Comandante da Unidade",
    avatar: "MR"
  });

  // Navegação: null = Hub dos 4 Quadros; ou "efetivo", "logistica", "escalas", "documental"
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(null);

  // Sub-abas dentro de cada módulo
  const [subTabEfetivo, setSubTabEfetivo] = useState<"nominal" | "cnh" | "guarnicoes" | "cursos">("nominal");
  const [subTabLogistica, setSubTabLogistica] = useState<"frota" | "tombamento" | "cautelas" | "checklists">("frota");
  const [subTabEscalas, setSubTabEscalas] = useState<"matriz" | "segs" | "triagem">("matriz");
  const [subTabDocumental, setSubTabDocumental] = useState<"permutas" | "boletins" | "ocorrencias">("permutas");

  // Filtros de busca no Efetivo
  const [buscaEfetivo, setBuscaEfetivo] = useState("");
  const [filtroGuarnicao, setFiltroGuarnicao] = useState<string>("todas");

  // Estados dinâmicos dos dados
  const [efetivoList, setEfetivoList] = useState([
    { id: "1", nome: "Rodrigo Albuquerque Paes", guerra: "Maj Rodrigo", rg: "BM-12345", posto: "Major BM", quadro: "QOBM Combatente", cnh: "B", cnhVenc: "2028-12-31", guarnicao: "Comando", funcao: "Comandante do 17º GBM", status: "Ativo", cursos: ["Comando e Estado-Maior", "Prevenção a Desastres", "SCI"] },
    { id: "2", nome: "Juliana Matos Fernandes", guerra: "Cap Juliana", rg: "BM-23456", posto: "Capitão BM", quadro: "QOBM Combatente", cnh: "B", cnhVenc: "2027-08-15", guarnicao: "Comando", funcao: "Subcomandante / Oficial de Dia", status: "Ativo", cursos: ["Gestão Operacional", "APH Avançado"] },
    { id: "3", nome: "Carlos Eduardo Silva", guerra: "1º Sgt Silva", rg: "BM-34567", posto: "1º Sgt BM", quadro: "QPBM", cnh: "D", cnhVenc: "2027-11-20", guarnicao: "Alfa", funcao: "Comandante de Socorro", status: "Ativo", cursos: ["BREC", "Salvamento Aquático", "Mergulho"] },
    { id: "4", nome: "Lucas Mendes Souza", guerra: "Cb Lucas", rg: "BM-45678", posto: "Cb BM", quadro: "QPBM", cnh: "E", cnhVenc: "2026-05-10", guarnicao: "Alfa", funcao: "Motorista Socorrista (ABT-01)", status: "Ativo", cursos: ["Condutor de Emergência", "Desencarceramento"] },
    { id: "5", nome: "Thiago Rocha Lima", guerra: "Sd Rocha", rg: "BM-56789", posto: "Sd BM", quadro: "QPBM", cnh: "B", cnhVenc: "2029-01-14", guarnicao: "Alfa", funcao: "Linha de Fogo / Socorrista", status: "Ativo", cursos: ["APH Tático", "Combate a Incêndio Urbano"] },
    { id: "6", nome: "André Felipe Castro", guerra: "2º Sgt Castro", rg: "BM-67890", posto: "2º Sgt BM", quadro: "QPBM", cnh: "D", cnhVenc: "2027-03-22", guarnicao: "Bravo", funcao: "Comandante de Socorro", status: "Ativo", cursos: ["Instrutor de Salvamento", "APH"] },
    { id: "7", nome: "Marcos Paulo Ferreira", guerra: "Cb Ferreira", rg: "BM-78901", posto: "Cb BM", quadro: "QPBM", cnh: "D", cnhVenc: "2026-09-30", guarnicao: "Bravo", funcao: "Motorista Socorrista (UR-02)", status: "Ativo", cursos: ["Condutor de Emergência", "APH"] },
    { id: "8", nome: "Gabriel Santos Nogueira", guerra: "Sd Nogueira", rg: "BM-89012", posto: "Sd BM", quadro: "QPBM", cnh: "B", cnhVenc: "2028-06-18", guarnicao: "Bravo", funcao: "Resgatista / Linha de Fogo", status: "Ativo", cursos: ["APH", "Combate a Incêndio"] }
  ]);

  // Viaturas e Frota Operacional
  const [frota, setFrota] = useState([
    { id: "v1", prefixo: "ABT-01", tipo: "Auto Bomba Tanque", placa: "PHC-1930", tanqueAgua: "5.000 L", bombaPressao: "750 PSI / 100%", combustivel: "95% (Diesel S10)", km: "42.850 km", status: "100% Operacional", responsavel: "Cb Lucas", ultimaPassagem: "Hoje 08:00 (Alfa)" },
    { id: "v2", prefixo: "UR-02", tipo: "Unidade de Resgate / APH", placa: "PHD-1932", tanqueAgua: "N/A", bombaPressao: "Cilindro O2 100%", combustivel: "85% (Diesel S10)", km: "36.210 km", status: "100% Operacional", responsavel: "Sd Rocha", ultimaPassagem: "Hoje 08:05 (Alfa)" },
    { id: "v3", prefixo: "ABS-03", tipo: "Auto Busca e Salvamento", placa: "PHE-1934", tanqueAgua: "1.500 L", bombaPressao: "Guincho 5T OK", combustivel: "80% (Diesel S10)", km: "28.400 km", status: "100% Operacional", responsavel: "1º Sgt Silva", ultimaPassagem: "Hoje 08:10 (Alfa)" },
    { id: "v4", prefixo: "L-01 Rio Amazonas", tipo: "Lancha Rápida Resgate Fluvial", placa: "CBMAM-AMAZON-01", tanqueAgua: "N/A", bombaPressao: "Motor 115HP OK", combustivel: "100% (Gasolina Náutica)", km: "140 Horas de Uso", status: "100% Operacional", responsavel: "Guarnição Fluvial", ultimaPassagem: "Ontem 18:00 (Alfa)" }
  ]);

  // Cautelas de Materiais
  const [cautelas, setCautelas] = useState([
    { id: "c1", material: "Rádio Transceptor Motorola APX2000 (#006)", militar: "1º Sgt Silva", saida: "23/10 07:30", previsao: "Hoje 19:00", motivo: "Instrução e reconhecimento fluvial no Rio Amazonas", status: "Ativa" },
    { id: "c2", material: "Motosserra Husqvarna 372XP (#012)", militar: "Cb Lucas", saida: "22/10 14:00", previsao: "24/10 12:00", motivo: "Corte emergencial de árvore com risco de queda", status: "Ativa" }
  ]);

  // Permutas Pendentes
  const [permutas, setPermutas] = useState([
    {
      id: "perm-1",
      solicitante: "Sd BM Rocha",
      substituto: "Sd BM Lima",
      dataOriginal: "14/05/2026",
      dataPaga: "22/05/2026",
      posto: "Guarnição Alfa (ABT-01)",
      motivo: "Comparecimento obrigatório a audiência judicial comprovada em Manaus.",
      status: "AGUARDANDO_COMANDO"
    },
    {
      id: "perm-2",
      solicitante: "Cb BM Souza",
      substituto: "Cb BM Ferreira",
      dataOriginal: "18/05/2026",
      dataPaga: "25/05/2026",
      posto: "Guarnição Bravo (UR-02)",
      motivo: "Participação em curso de especialização de desencarceramento avançado.",
      status: "AGUARDANDO_COMANDO"
    }
  ]);

  // SEGs (Serviço Extra Gratificado)
  const [segs, setSegs] = useState([
    { id: "seg-1", titulo: "Operação Orla do Rio Amazonas / Prainha", data: "26/10/2026 (Sábado)", horario: "14:00 às 22:00 (8 horas)", vagas: 4, remuneracao: "R$ 280,00", candidatos: 7, status: "Inscrições Abertas" },
    { id: "seg-2", titulo: "Prevenção Festividade Cultural de Itacoatiara", data: "27/10/2026 (Domingo)", horario: "18:00 às 02:00 (8 horas)", vagas: 2, remuneracao: "R$ 280,00", candidatos: 5, status: "Triagem Concluída" }
  ]);

  // Boletins Oficiais
  const [boletins, setBoletins] = useState([
    { id: "b1", numero: "042/2026", tipo: "Boletim Interno (BI)", data: "23/10/2026", autor: "Maj BM Rodrigo", descricao: "Publicação das escalas ordinárias de Novembro e homologação de permutas deferidas." },
    { id: "b2", numero: "041/2026", tipo: "Boletim Interno (BI)", data: "16/10/2026", autor: "Maj BM Rodrigo", descricao: "Designação de comissão de inspeção de viaturas e abertura de editais de SEG." }
  ]);

  // Ocorrências Recentes
  const [ocorrencias, setOcorrencias] = useState([
    { id: "oc-1", horario: "Hoje 10:45", tipo: "Salvamento Aquático", local: "Orla do Rio Amazonas - Prainha", viatura: "L-01 Fluvial", guarnicao: "Alfa", vitimas: "1 banhista resgatado estável", situacao: "Finalizada" },
    { id: "oc-2", horario: "Ontem 22:15", tipo: "Incêndio em Vegetação", local: "Rodovia AM-010, km 268", viatura: "ABT-01", guarnicao: "Alfa", vitimas: "Sem vítimas", situacao: "Controlada / Rescaldo Finalizado" },
    { id: "oc-3", horario: "21/10 15:30", tipo: "Resgate Veicular / APH", local: "Av. Parque cruzamento com Rua 15", viatura: "UR-02", guarnicao: "Delta", vitimas: "2 vítimas imobilizadas e conduzidas ao Hospital Regional", situacao: "Finalizada" }
  ]);

  // Carregar configurações salvas no localStorage se houver
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sigo_quartel_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuartel(parsed);
        setTempConfig(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const salvarConfiguracoes = (e: React.FormEvent) => {
    e.preventDefault();
    setQuartel(tempConfig);
    try {
      localStorage.setItem("sigo_quartel_config", JSON.stringify(tempConfig));
    } catch (err) {}
    setShowConfigModal(false);
    alert("Configurações da Unidade Bombeiro Militar salvas com sucesso!");
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLoginDemo = (tipo: "cmt" | "oficial") => {
    if (tipo === "cmt") {
      setUsuario({
        nome: quartel.comandante,
        posto: "Major BM",
        funcao: "Comandante da Unidade",
        avatar: "MR"
      });
    } else {
      setUsuario({
        nome: quartel.subcomandante,
        posto: "Capitão BM",
        funcao: "Oficial de Dia / Subcomandante",
        avatar: "JM"
      });
    }
    setIsLoggedIn(true);
  };

  const aprovarPermuta = (id: string, deferida: boolean) => {
    setPermutas(prev => prev.filter(p => p.id !== id));
    alert(deferida ? "Permuta homologada e DEFERIDA com despacho oficial do Comando! Escala atualizada." : "Permuta INDEFERIDA pelo Comando.");
  };

  const devolverCautela = (id: string) => {
    setCautelas(prev => prev.filter(c => c.id !== id));
    alert("Devolução do equipamento registrada com sucesso no Livro de Carga!");
  };

  // Militares filtrados
  const militaresFiltrados = efetivoList.filter(m => {
    const matchBusca = m.nome.toLowerCase().includes(buscaEfetivo.toLowerCase()) || 
                       m.guerra.toLowerCase().includes(buscaEfetivo.toLowerCase()) ||
                       m.rg.toLowerCase().includes(buscaEfetivo.toLowerCase());
    const matchGuarnicao = filtroGuarnicao === "todas" || m.guarnicao.toLowerCase() === filtroGuarnicao.toLowerCase();
    return matchBusca && matchGuarnicao;
  });

  // =========================================================================
  // TELA DE LOGIN (TEMA CLARO REFINADO E MILITAR)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
        {/* Elemento de fundo geométrico suave */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-red-600/10 via-slate-100 to-slate-100 pointer-events-none" />

        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-300/60 p-8 flex flex-col items-center relative z-10">
          {/* Logo Oficial Enviada */}
          <div className="relative w-36 h-36 mb-2 drop-shadow-md">
            <Image
              src="/logo.png"
              alt={quartel.sigla}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
              <span>SIGO</span>
              <span className="text-red-600 font-extrabold">•</span>
              <span className="text-slate-800 text-lg font-bold">{quartel.sigla}</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {quartel.nomeUnidade}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200 shadow-sm">
              <MapPin className="w-3 h-3 text-red-600" />
              <span>{quartel.cidadeEstado}</span>
            </div>
          </div>

          {/* Formulário de Acesso */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                RG Militar ou Identificação Funcional
              </label>
              <input
                type="text"
                placeholder="Ex: BM-12345 ou comando@cbm.am.gov.br"
                value={rgMilitar}
                onChange={e => setRgMilitar(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Senha Operacional
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              <Lock className="w-4 h-4" /> Entrar no Posto de Comando
            </button>
          </form>

          {/* Atalhos para Demonstração Rápida */}
          <div className="w-full mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Acesso Rápido de Demonstração
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2.5">
              <button
                type="button"
                onClick={() => handleLoginDemo("cmt")}
                className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Como Comandante
              </button>
              <button
                type="button"
                onClick={() => handleLoginDemo("oficial")}
                className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Como Oficial de Dia
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500 font-medium">
          <p>{quartel.nomeUnidade} • CBMAM</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Plantão 24 Horas: {quartel.telefoneEmergencia}</p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SISTEMA LOGADO: INTERFACE PRINCIPAL
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      
      {/* 1. BARRA SUPERIOR INSTITUCIONAL COM IDENTIFICAÇÃO E PERSONALIZAÇÃO */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          
          {/* Logo e Nome da Unidade */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setModuloAtivo(null)}>
            <div className="relative w-12 h-12 flex-shrink-0 drop-shadow-sm">
              <Image
                src="/logo.png"
                alt={quartel.sigla}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-lg">
                  SIGO
                </span>
                <span className="text-xs font-black uppercase tracking-wider bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full border border-red-200">
                  {quartel.sigla}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-none mt-0.5">
                {quartel.nomeUnidade} • {quartel.cidadeEstado}
              </p>
            </div>
          </div>

          {/* Ações da Barra Superior */}
          <div className="flex items-center gap-3">
            
            {/* BOTÃO PARA PERSONALIZAR O QUARTEL */}
            <button
              onClick={() => {
                setTempConfig(quartel);
                setShowConfigModal(true);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-bold transition-all shadow-sm"
              title="Personalizar dados e identidade da Unidade"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Personalizar Quartel</span>
            </button>

            {/* Militar Logado */}
            <div className="flex items-center gap-2.5 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {usuario.avatar}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-black text-slate-900 leading-tight">
                  {usuario.nome}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">
                  {usuario.funcao}
                </div>
              </div>
            </div>

            {/* Desconectar */}
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setModuloAtivo(null);
              }}
              title="Encerrar Sessão"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. BARRA DE DIRETRIZ OPERACIONAL E PRONTIDÃO */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="text-slate-800">Diretriz do Comando:</strong>
            <span className="italic truncate max-w-xl text-slate-500">{quartel.diretrizComando}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
            <span className="bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
              Prontidão Hoje: <span className="text-red-600">Guarnição Alfa</span>
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
              Emergência: <span className="text-emerald-700">193</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* ========================================================================= */}
        {/* TELA A: HUB PRINCIPAL COM OS 4 GRANDES QUADROS (VISUAL IMPONENTE E LIMPO) */}
        {/* ========================================================================= */}
        {moduloAtivo === null ? (
          <div className="space-y-8">
            
            {/* Banner de Identificação da Unidade e Especialidades */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-black uppercase tracking-wider border border-red-200">
                  <Flame className="w-3.5 h-3.5 text-red-600" />
                  Centro de Gestão Operacional Integrada
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {quartel.nomeUnidade}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Comando: <strong className="text-slate-800">{quartel.comandante}</strong> • Subcomando: <strong className="text-slate-800">{quartel.subcomandante}</strong>
                </p>
                
                {/* Badges de Atuações Principais */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {quartel.atuacoes.map((at, idx) => (
                    <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {at}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estatísticas Rápidas de Prontidão */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto flex-shrink-0">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-red-600">32</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Efetivo Total</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-blue-600">4 / 4</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Viaturas em Linha</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-amber-600">2</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Editais de SEG</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-purple-600">{permutas.length}</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Permutas Pendentes</div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* OS 4 GRANDES QUADROS DE MÓDULOS (GRUPOS DE ACESSO)                        */}
            {/* ========================================================================= */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Compass className="w-5 h-5 text-red-600" />
                  Módulos de Gestão e Operação
                </h2>
                <span className="text-xs text-slate-400 font-medium">
                  Clique em um quadro para abrir os detalhes do grupo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* QUADRO 1: ADMINISTRAÇÃO & EFETIVO */}
                <div
                  onClick={() => setModuloAtivo("efetivo")}
                  className="bg-white border-2 border-slate-200 hover:border-red-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                        <Users className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                        32 Militares
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
                      Módulo 1: Administração & Efetivo
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Quadro de oficiais e praças, controle de validade de CNHs para motoristas de socorro, cursos operacionais e distribuição das 4 guarnições.
                    </p>

                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Quadro de Oficiais & Praças
                        </span>
                        <strong className="text-slate-800">100% Atualizado</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          Controle de CNH Cat. D e E
                        </span>
                        <strong className="text-amber-700">1 alerta de renovação</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-blue-600" />
                          Guarnições Táticas
                        </span>
                        <strong className="text-slate-800">Alfa, Bravo, Charlie, Delta</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-red-600">
                    <span>Acessar Detalhes do Efetivo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* QUADRO 2: LOGÍSTICA & ALMOXARIFADO */}
                <div
                  onClick={() => setModuloAtivo("logistica")}
                  className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Truck className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                        Frota 100% Operacional
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Módulo 2: Logística & Almoxarifado
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Livro de carga e patrimônio tombado, cautelas de materiais em uso operacional e relatórios imutáveis dos checklists matinais das 08h00.
                    </p>

                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Truck className="w-3.5 h-3.5 text-blue-600" />
                          Viaturas em Serviço (ABT, UR, ABS, Lancha)
                        </span>
                        <strong className="text-emerald-700">4 unidades OK</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-amber-600" />
                          Cautelas Eletrônicas Ativas
                        </span>
                        <strong className="text-amber-700">{cautelas.length} equipamentos</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                          Checklist Matinal 08h00
                        </span>
                        <strong className="text-emerald-700">Homologado hoje</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
                    <span>Acessar Detalhes da Logística</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* QUADRO 3: ESCALAS OPERACIONAIS & SEGs */}
                <div
                  onClick={() => setModuloAtivo("escalas")}
                  className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                        <CalendarCheck className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                        2 Editais de SEG
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                      Módulo 3: Escalas Operacionais & SEG
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Ciclo de prontidão 24x72 das guarnições, abertura e gerenciamento de Serviços Extras Gratificados e triagem automática de candidatos por regras legais.
                    </p>

                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-amber-600" />
                          Escala Ordinária Mensal
                        </span>
                        <strong className="text-emerald-700">Fechada</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          Vagas de SEG Abertas
                        </span>
                        <strong className="text-amber-800">6 vagas disponíveis</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-blue-600" />
                          Classificação de Militares
                        </span>
                        <strong className="text-slate-800">Menor nº de SEGs</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                    <span>Acessar Detalhes das Escalas</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* QUADRO 4: GESTÃO DOCUMENTAL & PERMUTAS */}
                <div
                  onClick={() => setModuloAtivo("documental")}
                  className="bg-white border-2 border-slate-200 hover:border-purple-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                        <FileText className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-black bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                        {permutas.length} Permutas Pendentes
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                      Módulo 4: Gestão Documental & Permutas
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Central de homologação de trocas de serviço pelo Comando, publicação de Boletins Internos e Gerais (BI/BG) e registro de ocorrências da unidade.
                    </p>

                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          Permutas Aguardando Parecer
                        </span>
                        <strong className="text-purple-700">{permutas.length} requerimentos</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <FileBadge2 className="w-3.5 h-3.5 text-slate-600" />
                          Último Boletim Publicado
                        </span>
                        <strong className="text-slate-800">BI nº 042/2026</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-red-600" />
                          Ocorrências Registradas
                        </span>
                        <strong className="text-slate-800">3 nas últimas 48h</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-600">
                    <span>Acessar Detalhes Documentais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* TELA B: VISÃO PROFUNDAMENTE DETALHADA DO MÓDULO ESCOLHIDO                 */
          /* ========================================================================= */
          <div className="space-y-6">
            
            {/* Barra de Retorno e Navegação do Módulo */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <button
                onClick={() => setModuloAtivo(null)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-black transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar aos 4 Módulos Principais
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Navegação: <span className="font-bold text-slate-700">{quartel.sigla}</span> &gt;{" "}
                <span className="font-black text-red-600 uppercase tracking-wide">
                  {moduloAtivo === "efetivo" && "Módulo 1: Administração & Efetivo"}
                  {moduloAtivo === "logistica" && "Módulo 2: Logística & Almoxarifado"}
                  {moduloAtivo === "escalas" && "Módulo 3: Escalas Operacionais & SEG"}
                  {moduloAtivo === "documental" && "Módulo 4: Gestão Documental & Permutas"}
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DETALHAMENTO DO MÓDULO 1: ADMINISTRAÇÃO & EFETIVO                         */}
            {/* ========================================================================= */}
            {moduloAtivo === "efetivo" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Cabeçalho do Módulo */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Users className="w-6 h-6 text-red-600" />
                      Módulo 1: Administração & Efetivo Militar
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Gerenciamento nominal dos combatentes, funções táticas, CNHs e guarnições do {quartel.nomeUnidade}.
                    </p>
                  </div>

                  <button
                    onClick={() => alert("Formulário aberto: Insira os dados do novo militar para sincronização com o Supabase.")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Cadastrar Novo Militar
                  </button>
                </div>

                {/* Sub-abas do Módulo 1 */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                  {[
                    { id: "nominal", label: "Efetivo Geral Nominal" },
                    { id: "cnh", label: "Controle & Alertas de CNH" },
                    { id: "guarnicoes", label: "Distribuição das 4 Guarnições" },
                    { id: "cursos", label: "Qualificação & Cursos" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSubTabEfetivo(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        subTabEfetivo === tab.id
                          ? "bg-red-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* SUB-ABA 1.1: EFETIVO NOMINAL */}
                {subTabEfetivo === "nominal" && (
                  <div className="space-y-4">
                    {/* Filtros de Busca */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Buscar por nome, nome de guerra ou RG militar..."
                          value={buscaEfetivo}
                          onChange={e => setBuscaEfetivo(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <select
                        value={filtroGuarnicao}
                        onChange={e => setFiltroGuarnicao(e.target.value)}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none"
                      >
                        <option value="todas">Todas as Guarnições</option>
                        <option value="comando">Comando / Administrativo</option>
                        <option value="alfa">Guarnição Alfa</option>
                        <option value="bravo">Guarnição Bravo</option>
                        <option value="charlie">Guarnição Charlie</option>
                        <option value="delta">Guarnição Delta</option>
                      </select>
                    </div>

                    {/* Tabela Rica de Efetivo */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-black text-[11px]">
                          <tr>
                            <th className="p-3.5">Militar & Graduação</th>
                            <th className="p-3.5">RG Militar</th>
                            <th className="p-3.5">Guarnição / Função</th>
                            <th className="p-3.5">CNH</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {militaresFiltrados.map(m => (
                            <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3.5">
                                <div className="font-black text-slate-900">{m.posto} {m.nome}</div>
                                <div className="text-[11px] text-slate-500 font-medium">Nome de Guerra: {m.guerra} • {m.quadro}</div>
                              </td>
                              <td className="p-3.5 font-mono text-slate-800 font-bold">{m.rg}</td>
                              <td className="p-3.5">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mr-1.5 ${
                                  m.guarnicao === 'Alfa' ? 'bg-red-100 text-red-800' :
                                  m.guarnicao === 'Bravo' ? 'bg-blue-100 text-blue-800' :
                                  m.guarnicao === 'Charlie' ? 'bg-emerald-100 text-emerald-800' :
                                  m.guarnicao === 'Delta' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {m.guarnicao}
                                </span>
                                <span className="font-semibold text-slate-700">{m.funcao}</span>
                              </td>
                              <td className="p-3.5">
                                <span className="font-bold text-slate-800">Cat {m.cnh}</span>
                                <div className="text-[10px] text-slate-500">Val: {m.cnhVenc}</div>
                              </td>
                              <td className="p-3.5">
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                                  {m.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => alert(`Ficha Completa do Militar:\n\nNome: ${m.nome}\nRG: ${m.rg}\nGraduação: ${m.posto}\nFunção: ${m.funcao}\nCursos: ${m.cursos.join(", ")}`)}
                                  className="text-xs text-red-600 hover:text-red-700 font-bold"
                                >
                                  Ver Ficha
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUB-ABA 1.2: CONTROLE DE CNH */}
                {subTabEfetivo === "cnh" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <h4 className="text-xs font-black text-amber-900">Alerta de Renovação Preventiva</h4>
                          <p className="text-xs text-amber-800">Militares escalados como motoristas de viaturas de emergência (ABT e UR) devem estar com a CNH válida.</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-lg">1 Militar com Vencimento Próximo</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {efetivoList.filter(m => m.cnh === "D" || m.cnh === "E").map(m => (
                        <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-black text-slate-900">{m.posto} {m.guerra}</span>
                            <p className="text-xs text-slate-500">Função: {m.funcao} ({m.guarnicao})</p>
                            <p className="text-xs font-bold text-slate-700 mt-1">
                              CNH Categoria <span className="text-red-600 text-sm font-black">{m.cnh}</span> • Vencimento: {m.cnhVenc}
                            </p>
                          </div>
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                            m.cnhVenc.startsWith("2026") ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}>
                            {m.cnhVenc.startsWith("2026") ? "Renovação Necessária" : "Válida"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-ABA 1.3: AS 4 GUARNIÇÕES */}
                {subTabEfetivo === "guarnicoes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { nome: "Guarnição Alfa", cor: "border-red-500 bg-red-50/30 text-red-700", status: "Em Serviço (Hoje 08h às 08h)", cmt: "1º Sgt Silva", mot: "Cb Lucas", resg: "Sd Rocha" },
                      { nome: "Guarnição Bravo", cor: "border-blue-500 bg-blue-50/30 text-blue-700", status: "1º Dia de Folga", cmt: "2º Sgt Castro", mot: "Cb Ferreira", resg: "Sd Nogueira" },
                      { nome: "Guarnição Charlie", cor: "border-emerald-500 bg-emerald-50/30 text-emerald-700", status: "2º Dia de Folga", cmt: "1º Sgt Pinheiro", mot: "Cb Alencar", resg: "Sd Martins" },
                      { nome: "Guarnição Delta", cor: "border-amber-500 bg-amber-50/30 text-amber-700", status: "Prontidão Seguinte", cmt: "SubTen Braga", mot: "Cb Ramos", resg: "Sd Fontes" }
                    ].map((g, idx) => (
                      <div key={idx} className={`p-5 rounded-2xl border-2 ${g.cor} bg-white shadow-sm flex flex-col justify-between space-y-4`}>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-black text-slate-900 text-sm">{g.nome}</h4>
                            <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">{g.status}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2"><strong>Comandante:</strong> {g.cmt}</p>
                          <p className="text-xs text-slate-500"><strong>Motorista Socorrista:</strong> {g.mot}</p>
                          <p className="text-xs text-slate-500"><strong>Linha de Fogo/Resgate:</strong> {g.resg}</p>
                        </div>
                        <button
                          onClick={() => alert(`Escala detalhada da ${g.nome} aberta para visualização.`)}
                          className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                        >
                          Ver Componentes
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-ABA 1.4: QUALIFICAÇÃO & CURSOS */}
                {subTabEfetivo === "cursos" && (
                  <div className="space-y-3">
                    {efetivoList.map(m => (
                      <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <div className="font-black text-slate-900 text-xs">{m.posto} {m.nome}</div>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {m.cursos.map((c, i) => (
                              <span key={i} className="text-[11px] font-bold bg-white text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                                🎓 {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Certificados de ${m.guerra} validados no acervo institucional do CBMAM.`)}
                          className="text-xs text-red-600 hover:text-red-700 font-bold"
                        >
                          Visualizar Certificados
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* ========================================================================= */}
            {/* DETALHAMENTO DO MÓDULO 2: LOGÍSTICA & ALMOXARIFADO                        */}
            {/* ========================================================================= */}
            {moduloAtivo === "logistica" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Truck className="w-6 h-6 text-blue-600" />
                      Módulo 2: Logística, Frota & Almoxarifado
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Controle das viaturas de socorro, embarcações no Rio Amazonas, patrimônio tombado e cautelas de materiais.
                    </p>
                  </div>

                  <button
                    onClick={() => alert("Formulário aberto para abertura de cautela rápida de equipamento.")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Nova Cautela de Equipamento
                  </button>
                </div>

                {/* Sub-abas do Módulo 2 */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                  {[
                    { id: "frota", label: "Frota & Viaturas Operacionais" },
                    { id: "cautelas", label: "Cautelas Eletrônicas em Aberto" },
                    { id: "tombamento", label: "Livro de Carga & Materiais" },
                    { id: "checklists", label: "Checklists Matinais (Passagem 08h00)" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSubTabLogistica(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        subTabLogistica === tab.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* SUB-ABA 2.1: FROTA OPERACIONAL */}
                {subTabLogistica === "frota" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {frota.map(v => (
                      <div key={v.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-slate-900">{v.prefixo}</h3>
                              <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                {v.placa}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">{v.tipo}</p>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {v.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 text-slate-700">
                          <div>Água: <strong className="text-slate-900">{v.tanqueAgua}</strong></div>
                          <div>Bomba / Pressão: <strong className="text-slate-900">{v.bombaPressao}</strong></div>
                          <div>Combustível: <strong className="text-slate-900">{v.combustivel}</strong></div>
                          <div>Odômetro: <strong className="text-slate-900">{v.km}</strong></div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                          <span>Passagem: {v.ultimaPassagem}</span>
                          <span className="font-semibold text-slate-700">Resp: {v.responsavel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-ABA 2.2: CAUTELAS ELETRÔNICAS */}
                {subTabLogistica === "cautelas" && (
                  <div className="space-y-4">
                    {cautelas.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">Nenhuma cautela de material pendente</h4>
                        <p className="text-xs text-slate-500 mt-1">Todos os equipamentos estão resguardados na reserva técnica ou nas viaturas.</p>
                      </div>
                    ) : (
                      cautelas.map(c => (
                        <div key={c.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-900">{c.material}</span>
                              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                                Cautela Ativa
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              Militar Responsável: <strong className="text-slate-900">{c.militar}</strong> • Retirada: {c.saida} • Previsão de Retorno: <strong className="text-red-600">{c.previsao}</strong>
                            </p>
                            <p className="text-xs text-slate-500 italic">"{c.motivo}"</p>
                          </div>

                          <button
                            onClick={() => devolverCautela(c.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap"
                          >
                            Dar Baixa / Registrar Devolução
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* SUB-ABA 2.3: LIVRO DE CARGA */}
                {subTabLogistica === "tombamento" && (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black text-[11px]">
                        <tr>
                          <th className="p-3.5">Patrimônio / Tombamento</th>
                          <th className="p-3.5">Nome do Equipamento</th>
                          <th className="p-3.5">Localização / Viatura</th>
                          <th className="p-3.5">Estado de Conservação</th>
                          <th className="p-3.5 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { cod: "CBM-ITAC-001", nome: "Desencarcerador Hidráulico Lucas Combinado", local: "ABT-01", estado: "Excelente", desc: "Pressão 720 bar, mangueiras duplas" },
                          { cod: "CBM-ITAC-002", nome: "Desfibrilador Externo Automático (DEA Zoll)", local: "UR-02", estado: "Excelente", desc: "Pás adulto e pediátricas inclusas" },
                          { cod: "CBM-ITAC-003", nome: "Prancha Rígida em Polietileno c/ Tirantes", local: "UR-02", estado: "Bom", desc: "Tirantes tipo aranha completos" },
                          { cod: "CBM-ITAC-004", nome: "Conjunto Autônomo de Respiração (EPR) Scott", local: "ABT-01", estado: "Excelente", desc: "Cilindro de fibra de carbono 300bar" },
                          { cod: "CBM-ITAC-005", nome: "Motobomba Flutuante 11HP Rio Amazonas", local: "L-01 Fluvial", estado: "Bom", desc: "Vazão 1200 L/min captação no rio" }
                        ].map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3.5 font-mono font-bold text-slate-900">{m.cod}</td>
                            <td className="p-3.5 font-bold text-slate-800">
                              {m.nome}
                              <div className="text-[10px] text-slate-400 font-normal">{m.desc}</div>
                            </td>
                            <td className="p-3.5">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">{m.local}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">{m.estado}</span>
                            </td>
                            <td className="p-3.5 text-right">
                              <button onClick={() => alert(`Histórico de manutenção do patrimônio ${m.cod} recuperado.`)} className="text-xs text-blue-600 hover:text-blue-700 font-bold">
                                Detalhes
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* SUB-ABA 2.4: CHECKLISTS MATINAIS */}
                {subTabLogistica === "checklists" && (
                  <div className="space-y-3">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <div>
                          <h4 className="text-xs font-black text-emerald-900">Passagem de Serviço das 08h00 Concluída</h4>
                          <p className="text-xs text-emerald-800">Garantia de imutabilidade militar registrada no PostgreSQL do Supabase.</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-3 py-1 rounded-lg">100% Operacional</span>
                    </div>

                    {[
                      { viatura: "ABT-01", responsavel: "Cb BM Lucas Mendes", hora: "Hoje 08:00", status: "100% Operacional", obs: "Conferidos mangueiramento, esguichos, água e conjunto desencarcerador." },
                      { viatura: "UR-02", responsavel: "Sd BM Thiago Rocha", hora: "Hoje 08:05", status: "100% Operacional", obs: "DEA testado (bateria 100%), cilindro de O2 medicinal abastecido e talas completas." },
                      { viatura: "L-01 Rio Amazonas", responsavel: "Guarnição Fluvial", hora: "Ontem 18:00", status: "100% Operacional", obs: "Motor 115HP ligado, coletes salva-vidas conferidos e boias prontas." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 text-sm">{item.viatura}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Realizado por: <strong>{item.responsavel}</strong> às {item.hora}</p>
                          <p className="text-xs text-slate-600 mt-1 italic">"{item.obs}"</p>
                        </div>
                        <button
                          onClick={() => alert(`Checklist eletrônico assinado digitalmente por ${item.responsavel}.`)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-bold"
                        >
                          Ver Laudo
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* ========================================================================= */}
            {/* DETALHAMENTO DO MÓDULO 3: ESCALAS OPERACIONAIS & SEGs                     */}
            {/* ========================================================================= */}
            {moduloAtivo === "escalas" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <CalendarCheck className="w-6 h-6 text-amber-600" />
                      Módulo 3: Escalas Operacionais & SEG
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Matriz mensal de guarnições 24x72, editais de Serviço Extra Gratificado e triagem por antiguidade/menor frequência.
                    </p>
                  </div>

                  <button
                    onClick={() => alert("Formulário aberto para publicação de novo edital de SEG no mobile.")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Publicar Novo Edital SEG
                  </button>
                </div>

                {/* Sub-abas do Módulo 3 */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                  {[
                    { id: "matriz", label: "Matriz Mensal de Guarnições (24x72)" },
                    { id: "segs", label: "Editais de SEG Abertos" },
                    { id: "triagem", label: "Triagem & Classificação de Candidatos" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSubTabEscalas(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        subTabEscalas === tab.id
                          ? "bg-amber-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* SUB-ABA 3.1: MATRIZ DE ESCALAS */}
                {subTabEscalas === "matriz" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">Ciclo de Prontidão de Maio de 2026</h4>
                        <p className="text-xs text-slate-500">Escala de 24 horas de serviço por 72 horas de folga regulamentar.</p>
                      </div>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Homologada pelo Comando</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { dia: "Dia 23 (Hoje)", guarnicao: "Alfa", status: "Prontidão Total", cor: "border-red-500 bg-red-50 text-red-700" },
                        { dia: "Dia 24 (Amanhã)", guarnicao: "Bravo", status: "Próximo Turno", cor: "border-blue-500 bg-blue-50 text-blue-700" },
                        { dia: "Dia 25", guarnicao: "Charlie", status: "Folga Atual", cor: "border-emerald-500 bg-emerald-50 text-emerald-700" },
                        { dia: "Dia 26", guarnicao: "Delta", status: "Folga Atual", cor: "border-amber-500 bg-amber-50 text-amber-700" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border-2 ${item.cor} text-center space-y-1`}>
                          <div className="text-xs font-bold text-slate-500">{item.dia}</div>
                          <div className="text-lg font-black text-slate-900">{item.guarnicao}</div>
                          <div className="text-[11px] font-semibold">{item.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-ABA 3.2: EDITAIS DE SEG */}
                {subTabEscalas === "segs" && (
                  <div className="space-y-4">
                    {segs.map(s => (
                      <div key={s.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">{s.titulo}</h4>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
                              {s.remuneracao}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">
                            <strong>Data:</strong> {s.data} • <strong>Horário:</strong> {s.horario} • <strong>Vagas:</strong> {s.vagas}
                          </p>
                          <p className="text-xs text-amber-700 font-bold">
                            Total de Candidatos Inscritos pelo Mobile: {s.candidatos} militares
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-lg">
                            {s.status}
                          </span>
                          <button
                            onClick={() => setSubTabEscalas("triagem")}
                            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm"
                          >
                            Ver Triagem
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-ABA 3.3: TRIAGEM DE CANDIDATOS */}
                {subTabEscalas === "triagem" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-amber-900">Critério de Classificação CBMAM</h4>
                        <p className="text-xs text-amber-800">Militares sem impedimento de escala ordinária e com menor número de SEGs executadas no mês.</p>
                      </div>
                      <button
                        onClick={() => alert("Triagem oficial processada! Lista nominal homologada e pronta para publicação no próximo Boletim.")}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm"
                      >
                        Homologar Selecionados
                      </button>
                    </div>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 uppercase font-black text-[11px] text-slate-600">
                          <tr>
                            <th className="p-3.5">Posição</th>
                            <th className="p-3.5">Militar Candidato</th>
                            <th className="p-3.5">SEGs no Mês</th>
                            <th className="p-3.5">Escala Ordinária no Dia</th>
                            <th className="p-3.5">Resultado da Triagem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { pos: "1º", nome: "Sd BM Thiago Rocha", segsMes: 0, conflito: "Não (Folga)", status: "Selecionado (Titular)" },
                            { pos: "2º", nome: "Cb BM Lucas Mendes", segsMes: 1, conflito: "Não (Folga)", status: "Selecionado (Titular)" },
                            { pos: "3º", nome: "Sd BM Gabriel Nogueira", segsMes: 1, conflito: "Não (Folga)", status: "Selecionado (Titular)" },
                            { pos: "4º", nome: "Cb BM Marcos Ferreira", segsMes: 2, conflito: "Não (Folga)", status: "Selecionado (Titular)" },
                            { pos: "5º", nome: "1º Sgt BM Carlos Silva", segsMes: 2, conflito: "Não (Folga)", status: "Reserva Técnica" }
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-3.5 font-black text-slate-900">{item.pos}</td>
                              <td className="p-3.5 font-bold text-slate-800">{item.nome}</td>
                              <td className="p-3.5 font-bold">{item.segsMes} executada(s)</td>
                              <td className="p-3.5 text-emerald-700 font-bold">{item.conflito}</td>
                              <td className="p-3.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status.includes("Titular") ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ========================================================================= */}
            {/* DETALHAMENTO DO MÓDULO 4: GESTÃO DOCUMENTAL & PERMUTAS                    */}
            {/* ========================================================================= */}
            {moduloAtivo === "documental" && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <FileText className="w-6 h-6 text-purple-600" />
                      Módulo 4: Gestão Documental & Central de Permutas
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Despachos do Comandante ({quartel.comandante}), boletins internos/gerais e livro de ocorrências da unidade.
                    </p>
                  </div>

                  <button
                    onClick={() => alert("Janela de upload: Anexe o PDF do novo Boletim Geral ou Interno para notificação automática.")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" /> Publicar Novo Boletim
                  </button>
                </div>

                {/* Sub-abas do Módulo 4 */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                  {[
                    { id: "permutas", label: `Central de Permutas (${permutas.length})` },
                    { id: "boletins", label: "Boletins Oficiais (BI / BG)" },
                    { id: "ocorrencias", label: "Livro de Ocorrências Diárias" },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSubTabDocumental(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        subTabDocumental === tab.id
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* SUB-ABA 4.1: CENTRAL DE PERMUTAS */}
                {subTabDocumental === "permutas" && (
                  <div className="space-y-4">
                    {permutas.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-slate-800">Nenhuma permuta pendente de homologação</h4>
                        <p className="text-xs text-slate-500 mt-1">Todas as propostas dos militares foram avaliadas pelo Comando.</p>
                      </div>
                    ) : (
                      permutas.map(permuta => (
                        <div key={permuta.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm font-black text-purple-900">
                              {permuta.solicitante} ⇄ {permuta.substituto}
                            </span>
                            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-0.5 rounded-full">
                              Aguardando Parecer do Comandante
                            </span>
                          </div>

                          <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                            <div><strong>Data do Serviço Original:</strong> {permuta.dataOriginal} ({permuta.posto})</div>
                            <div><strong>Data da Paga / Retribuição:</strong> {permuta.dataPaga}</div>
                            <div className="italic text-slate-500 pt-1">Justificativa: "{permuta.motivo}"</div>
                          </div>

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => aprovarPermuta(permuta.id, false)}
                              className="px-3.5 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" /> Indeferir
                            </button>
                            <button
                              onClick={() => aprovarPermuta(permuta.id, true)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" /> Deferir e Publicar Despacho
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* SUB-ABA 4.2: BOLETINS */}
                {subTabDocumental === "boletins" && (
                  <div className="space-y-3">
                    {boletins.map(b => (
                      <div key={b.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FileBadge2 className="w-6 h-6 text-purple-600 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-black text-slate-900">{b.tipo} nº {b.numero}</div>
                            <p className="text-xs text-slate-500">Publicado em: {b.data} por {b.autor}</p>
                            <p className="text-xs text-slate-600 mt-1">{b.descricao}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => alert(`Download simulado do arquivo oficial: ${b.tipo} nº ${b.numero} em formato PDF timbrado do CBMAM.`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold transition-all"
                        >
                          <Download className="w-3.5 h-3.5" /> Baixar PDF
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUB-ABA 4.3: LIVRO DE OCORRÊNCIAS */}
                {subTabDocumental === "ocorrencias" && (
                  <div className="space-y-3">
                    {ocorrencias.map(oc => (
                      <div key={oc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4 text-red-600" />
                            {oc.tipo} — {oc.horario}
                          </span>
                          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                            {oc.situacao}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>Local:</strong> {oc.local} • <strong>Guarnição:</strong> {oc.guarnicao} ({oc.viatura})
                        </p>
                        <p className="text-xs text-slate-500">
                          <strong>Desfecho / Vítimas:</strong> {oc.vitimas}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 4. MODAL DE PERSONALIZAÇÃO DO QUARTEL (CONFIGURAÇÕES DA UNIDADE)           */}
      {/* ========================================================================= */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Personalizar Dados do Quartel</h3>
                  <p className="text-xs text-slate-500">
                    Ajuste o nome, comando, endereço, contatos e atuações da sua Unidade Bombeiro Militar.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={salvarConfiguracoes} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Nome Oficial da Unidade</label>
                  <input
                    type="text"
                    value={tempConfig.nomeUnidade}
                    onChange={e => setTempConfig({ ...tempConfig, nomeUnidade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: 17º Batalhão Bombeiro Militar"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Sigla / Código Operacional</label>
                  <input
                    type="text"
                    value={tempConfig.sigla}
                    onChange={e => setTempConfig({ ...tempConfig, sigla: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: 17º GBM / CBMAM"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Comandante da Unidade</label>
                  <input
                    type="text"
                    value={tempConfig.comandante}
                    onChange={e => setTempConfig({ ...tempConfig, comandante: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: Major BM Rodrigo Paes"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Subcomandante / Oficial Adjunto</label>
                  <input
                    type="text"
                    value={tempConfig.subcomandante}
                    onChange={e => setTempConfig({ ...tempConfig, subcomandante: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: Capitão BM Juliana Matos"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Endereço do Quartel</label>
                  <input
                    type="text"
                    value={tempConfig.endereco}
                    onChange={e => setTempConfig({ ...tempConfig, endereco: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: Av. Parque, nº 1240 - Centro"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Município e Estado</label>
                  <input
                    type="text"
                    value={tempConfig.cidadeEstado}
                    onChange={e => setTempConfig({ ...tempConfig, cidadeEstado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: Itacoatiara - AM, CEP 69100-000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Telefone de Emergência</label>
                  <input
                    type="text"
                    value={tempConfig.telefoneEmergencia}
                    onChange={e => setTempConfig({ ...tempConfig, telefoneEmergencia: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: 193 (Emergência)"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Linha Administrativa / Rádio</label>
                  <input
                    type="text"
                    value={tempConfig.telefoneAdministrativo}
                    onChange={e => setTempConfig({ ...tempConfig, telefoneAdministrativo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Ex: (92) 3521-1234"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Diretriz Operacional do Dia</label>
                <textarea
                  rows={2}
                  value={tempConfig.diretrizComando}
                  onChange={e => setTempConfig({ ...tempConfig, diretrizComando: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Instrução do Comandante para a tropa..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Salvar Configurações
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 5. RODAPÉ INSTITUCIONAL */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-700">{quartel.nomeUnidade} ({quartel.sigla})</p>
        <p className="text-[11px] text-slate-400 mt-0.5">{quartel.endereco} • {quartel.cidadeEstado} • Contato: {quartel.telefoneAdministrativo}</p>
      </footer>
    </div>
  );
}
