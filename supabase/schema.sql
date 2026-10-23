-- ==============================================================================
-- SIGO-CBMAM: SISTEMA INTEGRADO DE GESTÃO OPERACIONAL E ADMINISTRATIVA
-- UNIDADE BOMBEIRO MILITAR DE ITACOATIARA - AM
-- Banco de Dados: PostgreSQL (Supabase)
-- ==============================================================================

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS DO SISTEMA
DO $$ BEGIN
    CREATE TYPE tipo_militar_enum AS ENUM ('militar', 'civil');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_militar_enum AS ENUM ('ativo', 'ferias', 'licenca', 'atestado');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE posto_graduacao_enum AS ENUM (
        'Sd BM', 'Cb BM', '3º Sgt BM', '2º Sgt BM', '1º Sgt BM', 
        'SubTen BM', '2º Ten BM', '1º Ten BM', 'Cap BM', 'Maj BM', 'Ten-Cel BM', 'Cel BM'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE tipo_local_enum AS ENUM ('Operacional/Viatura', 'Administrativo', 'Predial');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_permuta_enum AS ENUM (
        'AGUARDANDO_PARCEIRO', 'AGUARDANDO_COMANDO', 'DEFERIDA', 'INDEFERIDA'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_seg_enum AS ENUM ('Aberta', 'Encerrada', 'Homologada');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_candidatura_seg_enum AS ENUM ('Candidatado', 'Selecionado', 'Reserva', 'Recusado');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE categoria_material_enum AS ENUM (
        'EPI', 'Desencarceramento', 'APH', 'Comunicação', 'Combate a Incêndio', 'Salvamento Aquático'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE estado_conservacao_enum AS ENUM ('Excelente', 'Bom', 'Regular', 'Inservível');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_cautela_enum AS ENUM ('Aberta', 'Finalizada', 'Atrasada');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_geral_checklist_enum AS ENUM (
        '100% Operacional', 'Operacional c/ Restrições', 'Inoperante'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE status_item_checklist_enum AS ENUM ('OK', 'Ausente', 'Danificado');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE tipo_documento_enum AS ENUM (
        'Boletim Geral', 'Boletim Interno', 'Requerimento', 'Nota de Serviço'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE tipo_evento_feed_enum AS ENUM (
        'CHECKLIST_CONCLUIDO', 'PERMUTA_APROVADA', 'SEG_ABERTA', 
        'BOLETIM_PUBLICADO', 'AVISO_CMT', 'EMPRESTIMO_MATERIAL', 'OCORRENCIA'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TABELAS: NÚCLEO DE PESSOAL E ESTRUTURA
CREATE TABLE IF NOT EXISTS quadros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS perfis (
    id UUID PRIMARY KEY, -- pode referenciar auth.users(id)
    nome_completo VARCHAR(255) NOT NULL,
    nome_guerra VARCHAR(100) NOT NULL,
    rg_militar VARCHAR(30) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    posto_graduacao posto_graduacao_enum NOT NULL,
    quadro_id UUID REFERENCES quadros(id) ON DELETE SET NULL,
    classificacao VARCHAR(50),
    categoria_cnh VARCHAR(10), -- ex: B, C, D, E
    cnh_validade DATE,
    data_incorporacao DATE,
    foto_url TEXT,
    tipo tipo_militar_enum DEFAULT 'militar',
    status status_militar_enum DEFAULT 'ativo',
    role VARCHAR(50) DEFAULT 'Prontidao', -- 'Admin', 'Comandante', 'Oficial_Dia', 'Prontidao'
    telefone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cursos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    perfil_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    nome_curso VARCHAR(200) NOT NULL,
    instituicao VARCHAR(150),
    carga_horaria INT,
    validade DATE,
    certificado_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS locais_postos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(120) NOT NULL,
    tipo tipo_local_enum NOT NULL,
    codigo_radio VARCHAR(50), -- Ex: ABT-01, UR-02, ABS-03
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guarnicoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(50) NOT NULL UNIQUE, -- Alfa, Bravo, Charlie, Delta
    cor_identificadora VARCHAR(20) NOT NULL, -- #EF4444, #3B82F6, #10B981, #F59E0B
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guarnicao_membros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guarnicao_id UUID NOT NULL REFERENCES guarnicoes(id) ON DELETE CASCADE,
    perfil_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    funcao_nome VARCHAR(100) NOT NULL, -- 'Comandante de Socorro', 'Motorista', 'Linha de Fogo', 'Resgatista'
    UNIQUE(guarnicao_id, perfil_id)
);

-- 4. TABELAS: OPERACIONAL, ESCALA E PERMUTA
CREATE TABLE IF NOT EXISTS escalas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    guarnicao_id UUID REFERENCES guarnicoes(id) ON DELETE SET NULL,
    local_posto_id UUID REFERENCES locais_postos(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'Escalada',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permutas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitante_id UUID NOT NULL REFERENCES perfis(id),
    substituto_id UUID NOT NULL REFERENCES perfis(id),
    data_servico_original DATE NOT NULL,
    data_servico_paga DATE NOT NULL,
    status status_permuta_enum DEFAULT 'AGUARDANDO_PARCEIRO',
    motivo TEXT NOT NULL,
    documento_gerado_url TEXT,
    aprovado_por_cmt_id UUID REFERENCES perfis(id),
    data_aprovacao TIMESTAMP WITH TIME ZONE,
    parecer_cmt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seg_escalas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(200) NOT NULL,
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    vagas INT NOT NULL DEFAULT 1,
    valor_remuneracao NUMERIC(10,2) DEFAULT 0.00,
    local_posto_id UUID REFERENCES locais_postos(id) ON DELETE SET NULL,
    descricao TEXT,
    status status_seg_enum DEFAULT 'Aberta',
    criterios TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seg_candidaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seg_id UUID NOT NULL REFERENCES seg_escalas(id) ON DELETE CASCADE,
    militar_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    data_inscricao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status status_candidatura_seg_enum DEFAULT 'Candidatado',
    posicao_fila INT,
    motivo_recusa TEXT,
    UNIQUE(seg_id, militar_id)
);

-- 5. TABELAS: LOGÍSTICA E MATERIAIS
CREATE TABLE IF NOT EXISTS materiais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_tombamento VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    categoria categoria_material_enum NOT NULL,
    estado_conservacao estado_conservacao_enum DEFAULT 'Excelente',
    local_armazenado_id UUID REFERENCES locais_postos(id) ON DELETE SET NULL,
    foto_url TEXT,
    especificacoes TEXT,
    data_aquisicao DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cautelas_emprestimos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID NOT NULL REFERENCES materiais(id) ON DELETE CASCADE,
    responsavel_militar_id UUID NOT NULL REFERENCES perfis(id),
    autorizado_por_id UUID REFERENCES perfis(id),
    data_saida TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_previsao_retorno TIMESTAMP WITH TIME ZONE NOT NULL,
    data_devolucao_real TIMESTAMP WITH TIME ZONE,
    observacao TEXT,
    status status_cautela_enum DEFAULT 'Aberta',
    assinatura_militar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checklists_matinais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_verificacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    local_posto_viatura_id UUID NOT NULL REFERENCES locais_postos(id),
    realizado_por_id UUID NOT NULL REFERENCES perfis(id),
    status_geral status_geral_checklist_enum DEFAULT '100% Operacional',
    quilometragem INT,
    nivel_combustivel VARCHAR(20), -- '1/4', '1/2', '3/4', 'Cheio'
    nivel_agua_bomba VARCHAR(20), -- 'Vazio', '1/2', 'Cheio'
    observacoes_finais TEXT,
    concluido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checklist_itens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    checklist_id UUID NOT NULL REFERENCES checklists_matinais(id) ON DELETE CASCADE,
    material_id UUID NOT NULL REFERENCES materiais(id) ON DELETE CASCADE,
    status status_item_checklist_enum DEFAULT 'OK',
    observacao TEXT,
    foto_avaria_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABELAS: DOCUMENTOS E FEED OPERACIONAL
CREATE TABLE IF NOT EXISTS documentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo tipo_documento_enum NOT NULL,
    numero INT NOT NULL,
    ano INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    arquivo_pdf_url TEXT NOT NULL,
    criado_por_id UUID REFERENCES perfis(id),
    publicado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_eventos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo_evento tipo_evento_feed_enum NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    autor_id UUID REFERENCES perfis(id),
    payload_json JSONB DEFAULT '{}'::jsonb,
    pinado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. REGRAS DE NEGÓCIO E TRIGGERS
-- 7.1. Imutabilidade do Checklist Encerrado
CREATE OR REPLACE FUNCTION check_checklist_imutabilidade()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.concluido = TRUE THEN
        RAISE EXCEPTION 'Regra CBMAM: O checklist matinal concluído é imutável para efeitos de auditoria militar.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_checklist_imutavel ON checklists_matinais;
CREATE TRIGGER trg_checklist_imutavel
BEFORE UPDATE ON checklists_matinais
FOR EACH ROW
WHEN (OLD.concluido = TRUE)
EXECUTE FUNCTION check_checklist_imutabilidade();

-- 7.2. Trigger: Publicação automática no Feed quando Boletim for inserido
CREATE OR REPLACE FUNCTION notify_feed_on_boletim()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO feed_eventos (tipo_evento, titulo, descricao, autor_id, payload_json)
    VALUES (
        'BOLETIM_PUBLICADO',
        NEW.tipo || ' Nº ' || NEW.numero || '/' || NEW.ano || ' Publicado',
        NEW.titulo,
        NEW.criado_por_id,
        jsonb_build_object('documento_id', NEW.id, 'pdf_url', NEW.arquivo_pdf_url)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_feed_boletim ON documentos;
CREATE TRIGGER trg_feed_boletim
AFTER INSERT ON documentos
FOR EACH ROW EXECUTE FUNCTION notify_feed_on_boletim();

-- 7.3. Trigger: Publicação automática no Feed quando SEG for aberta
CREATE OR REPLACE FUNCTION notify_feed_on_seg()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO feed_eventos (tipo_evento, titulo, descricao, payload_json)
    VALUES (
        'SEG_ABERTA',
        'Novo Edital de SEG: ' || NEW.titulo,
        'Vagas: ' || NEW.vagas || ' | Remuneração: R$ ' || NEW.valor_remuneracao,
        jsonb_build_object('seg_id', NEW.id, 'vagas', NEW.vagas, 'inicio', NEW.data_inicio)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_feed_seg ON seg_escalas;
CREATE TRIGGER trg_feed_seg
AFTER INSERT ON seg_escalas
FOR EACH ROW EXECUTE FUNCTION notify_feed_on_seg();

-- 7.4. Trigger: Publicação automática quando Checklist for finalizado
CREATE OR REPLACE FUNCTION notify_feed_on_checklist()
RETURNS TRIGGER AS $$
DECLARE
    militar_nome VARCHAR(100);
    viatura_nome VARCHAR(100);
BEGIN
    IF NEW.concluido = TRUE AND (OLD.concluido = FALSE OR OLD.concluido IS NULL) THEN
        SELECT nome_guerra INTO militar_nome FROM perfis WHERE id = NEW.realizado_por_id;
        SELECT nome INTO viatura_nome FROM locais_postos WHERE id = NEW.local_posto_viatura_id;
        
        INSERT INTO feed_eventos (tipo_evento, titulo, descricao, autor_id, payload_json)
        VALUES (
            'CHECKLIST_CONCLUIDO',
            'Passagem de Serviço: ' || COALESCE(viatura_nome, 'Posto') || ' (' || NEW.status_geral || ')',
            'Conferência matinal das 08h00 finalizada por ' || COALESCE(militar_nome, 'Militar de Serviço') || '.',
            NEW.realizado_por_id,
            jsonb_build_object('checklist_id', NEW.id, 'status_geral', NEW.status_geral)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_feed_checklist ON checklists_matinais;
CREATE TRIGGER trg_feed_checklist
AFTER UPDATE ON checklists_matinais
FOR EACH ROW EXECUTE FUNCTION notify_feed_on_checklist();

-- 8. POLÍTICAS RLS (Row Level Security)
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_matinais ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE permutas ENABLE ROW LEVEL SECURITY;
ALTER TABLE seg_escalas ENABLE ROW LEVEL SECURITY;
ALTER TABLE seg_candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiais ENABLE ROW LEVEL SECURITY;
ALTER TABLE cautelas_emprestimos ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Aberta para militares autenticados
CREATE POLICY "Militares podem visualizar perfis" ON perfis FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar feed" ON feed_eventos FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar documentos" ON documentos FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar materiais" ON materiais FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar SEGs abertas" ON seg_escalas FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar checklists" ON checklists_matinais FOR SELECT USING (true);
CREATE POLICY "Militares podem visualizar itens de checklist" ON checklist_itens FOR SELECT USING (true);
CREATE POLICY "Militares podem ler suas permutas ou comando lê todas" ON permutas FOR SELECT USING (true);
CREATE POLICY "Militares podem ler suas candidaturas" ON seg_candidaturas FOR SELECT USING (true);
CREATE POLICY "Militares podem ler cautelas" ON cautelas_emprestimos FOR SELECT USING (true);

-- Permissões de Inserção e Atualização
CREATE POLICY "Qualquer militar pode criar feed ou sistema cria" ON feed_eventos FOR INSERT WITH CHECK (true);
CREATE POLICY "Militar pode propor permuta" ON permutas FOR INSERT WITH CHECK (true);
CREATE POLICY "Militar pode atualizar permuta em que participa" ON permutas FOR UPDATE USING (true);
CREATE POLICY "Militar pode se candidatar em SEG" ON seg_candidaturas FOR INSERT WITH CHECK (true);
CREATE POLICY "Militar pode registrar checklist" ON checklists_matinais FOR INSERT WITH CHECK (true);
CREATE POLICY "Militar pode editar checklist aberto" ON checklists_matinais FOR UPDATE USING (concluido = false);
CREATE POLICY "Militar pode inserir itens checklist" ON checklist_itens FOR INSERT WITH CHECK (true);

-- 9. DADOS DE SEED INICIAIS (ITACOATIARA - AM)
-- Quadros
INSERT INTO quadros (id, nome, descricao) VALUES 
('a0000000-0000-0000-0000-000000000001', 'QOBM - Combatente', 'Quadro de Oficiais Bombeiros Militares Combatentes'),
('a0000000-0000-0000-0000-000000000002', 'QPBM - Praças Combatentes', 'Quadro de Praças Bombeiros Militares'),
('a0000000-0000-0000-0000-000000000003', 'QOS - Saúde', 'Quadro de Oficiais de Saúde (Médicos, Enfermeiros)')
ON CONFLICT (nome) DO NOTHING;

-- Guarnições
INSERT INTO guarnicoes (id, nome, cor_identificadora, descricao) VALUES
('b0000000-0000-0000-0000-000000000001', 'Alfa', '#DC2626', 'Guarnição Alfa de Prontidão'),
('b0000000-0000-0000-0000-000000000002', 'Bravo', '#2563EB', 'Guarnição Bravo de Prontidão'),
('b0000000-0000-0000-0000-000000000003', 'Charlie', '#16A34A', 'Guarnição Charlie de Prontidão'),
('b0000000-0000-0000-0000-000000000004', 'Delta', '#D97706', 'Guarnição Delta de Prontidão')
ON CONFLICT (nome) DO NOTHING;

-- Postos e Viaturas de Itacoatiara
INSERT INTO locais_postos (id, nome, tipo, codigo_radio, ativo) VALUES
('c0000000-0000-0000-0000-000000000001', 'ABT-01 (Auto Bomba Tanque)', 'Operacional/Viatura', 'ABT-01', true),
('c0000000-0000-0000-0000-000000000002', 'UR-02 (Unidade de Resgate / APH)', 'Operacional/Viatura', 'UR-02', true),
('c0000000-0000-0000-0000-000000000003', 'ABS-03 (Auto Busca e Salvamento)', 'Operacional/Viatura', 'ABS-03', true),
('c0000000-0000-0000-0000-000000000004', 'Bote Inflável / Lancha Rápida Rio Amazonas', 'Operacional/Viatura', 'L-01', true),
('c0000000-0000-0000-0000-000000000005', 'Permanência / Rádio Operador', 'Administrativo', 'BASE-ITA', true),
('c0000000-0000-0000-0000-000000000006', 'Almoxarifado Central Itacoatiara', 'Predial', 'ALMOX', true)
ON CONFLICT DO NOTHING;

-- Perfis Iniciais de Demonstração
INSERT INTO perfis (id, nome_completo, nome_guerra, rg_militar, cpf, posto_graduacao, quadro_id, categoria_cnh, cnh_validade, data_incorporacao, tipo, status, role, telefone) VALUES
('d0000000-0000-0000-0000-000000000001', 'Major BM Rodrigo Albuquerque Paes', 'Maj Rodrigo', 'BM-12345', '111.222.333-44', 'Maj BM', 'a0000000-0000-0000-0000-000000000001', 'B', '2028-12-31', '2010-02-01', 'militar', 'ativo', 'Comandante', '(92) 98111-0001'),
('d0000000-0000-0000-0000-000000000002', 'Capitão BM Juliana Matos Fernandes', 'Cap Juliana', 'BM-23456', '222.333.444-55', 'Cap BM', 'a0000000-0000-0000-0000-000000000001', 'B', '2027-08-15', '2012-03-01', 'militar', 'ativo', 'Oficial_Dia', '(92) 98111-0002'),
('d0000000-0000-0000-0000-000000000003', '1º Sargento BM Carlos Eduardo Silva', 'Sgt Silva', 'BM-34567', '333.444.555-66', '1º Sgt BM', 'a0000000-0000-0000-0000-000000000002', 'D', '2027-11-20', '2014-06-15', 'militar', 'ativo', 'Admin', '(92) 98111-0003'),
('d0000000-0000-0000-0000-000000000004', 'Cabo BM Lucas Mendes Souza', 'Cb Lucas', 'BM-45678', '444.555.666-77', 'Cb BM', 'a0000000-0000-0000-0000-000000000002', 'E', '2026-05-10', '2018-09-01', 'militar', 'ativo', 'Prontidao', '(92) 98111-0004'),
('d0000000-0000-0000-0000-000000000005', 'Soldado BM Thiago Rocha Lima', 'Sd Rocha', 'BM-56789', '555.666.777-88', 'Sd BM', 'a0000000-0000-0000-0000-000000000002', 'B', '2029-01-14', '2022-04-10', 'militar', 'ativo', 'Prontidao', '(92) 98111-0005')
ON CONFLICT (rg_militar) DO NOTHING;

-- Materiais Críticos de Exemplo
INSERT INTO materiais (id, codigo_tombamento, nome, categoria, estado_conservacao, local_armazenado_id, especificacoes) VALUES
('e0000000-0000-0000-0000-000000000001', 'CBM-ITAC-001', 'Desencarcerador Hidráulico Lucas Combinado', 'Desencarceramento', 'Excelente', 'c0000000-0000-0000-0000-000000000001', 'Pressão 720 bar, mangueira dupla core'),
('e0000000-0000-0000-0000-000000000002', 'CBM-ITAC-002', 'Desfibrilador Externo Automático (DEA) Zoll', 'APH', 'Excelente', 'c0000000-0000-0000-0000-000000000002', 'Pás adulto/infantil, bateria 100%'),
('e0000000-0000-0000-0000-000000000003', 'CBM-ITAC-003', 'Prancha Rígida em Polietileno c/ Tirantes', 'APH', 'Bom', 'c0000000-0000-0000-0000-000000000002', 'Tirantes tipo aranha completos'),
('e0000000-0000-0000-0000-000000000004', 'CBM-ITAC-004', 'Conjunto Autônomo de Respiração (EPR) Scott 300bar', 'EPI', 'Excelente', 'c0000000-0000-0000-0000-000000000001', 'Cilindro fibra de carbono'),
('e0000000-0000-0000-0000-000000000005', 'CBM-ITAC-005', 'Motobomba Flutuante 11HP', 'Combate a Incêndio', 'Bom', 'c0000000-0000-0000-0000-000000000004', 'Vazão 1200 L/min para captação no Rio'),
('e0000000-0000-0000-0000-000000000006', 'CBM-ITAC-006', 'Rádio Transceptor Portátil Motorola APX2000', 'Comunicação', 'Excelente', 'c0000000-0000-0000-0000-000000000005', 'Frequência Operacional CBMAM Itacoatiara')
ON CONFLICT (codigo_tombamento) DO NOTHING;

-- Feed Inicial de Demonstração
INSERT INTO feed_eventos (tipo_evento, titulo, descricao, pinado, created_at) VALUES
('AVISO_CMT', 'Diretriz de Prontidão Operacional no Festival da Canção (Fecani)', 'Todos os comandantes de guarnição devem revisar a lista de viaturas e equipamentos de reserva técnica.', true, NOW() - INTERVAL '2 hours'),
('BOLETIM_PUBLICADO', 'Boletim Interno nº 042/2026 Publicado', 'Publicação das novas escalas ordinárias e homologação de SEGs para o mês corrente.', false, NOW() - INTERVAL '5 hours'),
('CHECKLIST_CONCLUIDO', 'Passagem de Serviço: ABT-01 (100% Operacional)', 'Conferência matinal das 08h00 finalizada pelo Cb Lucas Mendes sem pendências de materiais.', false, NOW() - INTERVAL '1 day'),
('SEG_ABERTA', 'Edital Aberto: Serviço Extra Gratificado - Prainha de Itacoatiara', 'Disponíveis 4 vagas para salvamento aquático e prevenção no fim de semana.', false, NOW() - INTERVAL '1 day 3 hours')
ON CONFLICT DO NOTHING;
