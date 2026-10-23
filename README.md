# SIGO-CBMAM — Sistema Integrado de Gestão Operacional e Administrativa
### Unidade Bombeiro Militar de Itacoatiara – Amazonas (CBMAM)

Sistema corporativo de alto desempenho composto por:
1. **Web Admin (Gestão & Comando):** Next.js 14, Tailwind CSS, Lucide Icons, painéis com quadros grandes de categorias operacionais e administrativas.
2. **Mobile App (Operacional / "Rede Social do Quartel"):** React Native / Expo, feed operacional em tempo real, rotina de conferência matinal das 08h00, SEGs e permutas.
3. **Backend & Nuvem:** Supabase (PostgreSQL, Triggers de auditoria e imutabilidade, Auth com RLS e Storage).

---

## Estrutura do Monorepo

```
sigo-cbmam/
├── apps/
│   ├── web/                # Aplicação Web Admin de Comando (Next.js)
│   │   ├── src/app/        # Páginas e rotas (Dashboard de Quadros)
│   │   └── src/lib/        # Cliente Supabase
│   └── mobile/             # Aplicação Mobile da Guarnição (Expo)
│       └── App.tsx         # 4 Abas: Feed, Escala/SEG, Checklist, Permutas
├── supabase/
│   └── schema.sql          # DDL completo do PostgreSQL, Triggers, RLS e Seeds
├── .github/
│   └── workflows/          # Automações de CI/CD
└── README.md
```

---

## 🚀 Passo a Passo de Configuração

### 1. Configuração do Supabase (Banco de Dados e Auth)
1. Acesse [https://supabase.com](https://supabase.com) e crie um novo projeto (ex: `sigo-cbmam-itacoatiara`).
2. Abra o menu **SQL Editor** no painel do Supabase.
3. Copie todo o conteúdo do arquivo [`supabase/schema.sql`](./supabase/schema.sql) e clique em **RUN**.
   - Isso criará todas as tabelas, tipos ENUM, triggers de auditoria (checklist imutável e notificações automáticas no feed), regras de RLS e os registros de seed da unidade de Itacoatiara.
4. No menu **Storage**, crie três buckets públicos ou autenticados:
   - `avarias` (fotos de problemas em viaturas/materiais)
   - `perfis` (fotos de perfil dos militares)
   - `documentos` (PDFs de boletins e despachos de permutas)
5. No menu **Project Settings > API**, copie:
   - `Project URL`
   - `Project API Keys (anon / public)`

---

### 2. Configuração do Repositório no GitHub
1. Abra o terminal na raiz do projeto (`sigo-cbmam`) e inicialize o Git:
   ```bash
   git init
   git add .
   git commit -m "feat: estrutura inicial do SIGO-CBMAM Itacoatiara"
   ```
2. Crie um novo repositório no [GitHub](https://github.com/new) chamado `sigo-cbmam` (pode ser privado ou público).
3. Conecte o remoto e faça o push:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/sigo-cbmam.git
   git branch -M main
   git push -u origin main
   ```

---

### 3. Configuração do Deploy na Vercel (Web Admin)
1. Acesse [https://vercel.com](https://vercel.com) e conecte com sua conta do GitHub.
2. Clique em **Add New... > Project** e selecione o repositório `sigo-cbmam`.
3. Na tela de configuração do projeto:
   - Em **Root Directory**, clique em Edit e selecione: `apps/web`.
   - Em **Environment Variables**, adicione:
     - `NEXT_PUBLIC_SUPABASE_URL`: sua URL do Supabase.
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sua chave pública anon do Supabase.
4. Clique em **Deploy**. A aplicação Web Admin estará online instantaneamente com HTTPS e CI/CD a cada commit!

---

### 4. Executando Localmente

#### Web Admin:
```bash
cd apps/web
npm install
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

#### Mobile App (Expo):
```bash
cd apps/mobile
npm install
npx expo start
```
Escaneie o QR Code no app **Expo Go** (Android/iOS) para testar na tela do seu aparelho físico.
