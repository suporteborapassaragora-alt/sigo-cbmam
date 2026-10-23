import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image
} from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<'feed' | 'escala' | 'checklist' | 'permutas'>('feed');
  
  // Checklist interativo
  const [checklistItems, setChecklistItems] = useState([
    { id: '1', nome: 'Desfibrilador Externo Automático (DEA)', status: 'OK' },
    { id: '2', nome: 'Prancha Rígida c/ Tirantes Aranha', status: 'OK' },
    { id: '3', nome: 'Cilindro de Oxigênio Medicinal (Cheio)', status: 'OK' },
    { id: '4', nome: 'Colar Cervical Regulável (Kit 4 un)', status: 'OK' },
    { id: '5', nome: 'KED (Colete Imobilizador)', status: 'OK' },
  ]);

  const [candidatadoSeg, setCandidatadoSeg] = useState(false);

  // =========================================================================
  // TELA DE LOGIN MOBILE (TEMA CLARO E LIMPO)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <View style={styles.loginCard}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.loginLogo}
            resizeMode="contain"
          />
          <Text style={styles.loginTitle}>SIGO — 17º GBM</Text>
          <Text style={styles.loginSubtitle}>Corpo de Bombeiros Militar de Itacoatiara</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => setIsLoggedIn(true)}
          >
            <Text style={styles.loginBtnText}>Entrar como Guarnição de Serviço</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // =========================================================================
  // TELA PRINCIPAL PÓS-LOGIN MOBILE (4 ABAS LIMPAS)
  // =========================================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* TOP BAR: IDENTIFICAÇÃO MILITAR E PRONTIDÃO */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.topLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.militarNome}>Sd BM Rocha</Text>
            <Text style={styles.militarStatus}>17º GBM • Guarnição Alfa (ABT-01)</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => setIsLoggedIn(false)}
        >
          <Text style={styles.logoutBtnText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      <ScrollView style={styles.contentArea} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ABA 1: FEED OPERACIONAL */}
        {currentTab === 'feed' && (
          <View>
            <Text style={styles.sectionTitle}>Feed Operacional em Tempo Real</Text>
            
            {/* Aviso Comandante Pinado */}
            <View style={[styles.card, styles.pinnedCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagAvisoCmt}>📌 AVISO DO COMANDANTE</Text>
                <Text style={styles.cardTime}>Há 2h</Text>
              </View>
              <Text style={styles.cardTitle}>Diretriz Operacional do Festival (Fecani)</Text>
              <Text style={styles.cardBody}>
                Todos os militares de serviço devem redobrar a atenção na contenção aquática e prontidão no Rio Amazonas.
              </Text>
              <Text style={styles.cardAuthor}>Maj BM Rodrigo • Comandante do 17º GBM</Text>
            </View>

            {/* Checklist Matinal */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagChecklist}>✅ CHECKLIST 08H00</Text>
                <Text style={styles.cardTime}>08:15</Text>
              </View>
              <Text style={styles.cardTitle}>Viatura ABT-01 Liberada (100% Operacional)</Text>
              <Text style={styles.cardBody}>
                Conferência de materiais concluída por Cb BM Lucas Mendes. Tanque com 5.000 L e desencarcerador testado.
              </Text>
            </View>

            {/* Nova SEG */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagSeg}>⭐ NOVA SEG ABERTA</Text>
                <Text style={styles.cardTime}>Ontem</Text>
              </View>
              <Text style={styles.cardTitle}>Edital SEG: Salvamento Orla de Itacoatiara</Text>
              <Text style={styles.cardBody}>
                Remuneração: R$ 280,00 • Turno de 8h. Acesse a aba Escala/SEG para se candidatar.
              </Text>
            </View>
          </View>
        )}

        {/* ABA 2: MINHA ESCALA & SEG */}
        {currentTab === 'escala' && (
          <View>
            <Text style={styles.sectionTitle}>Minha Escala & Serviços Extras</Text>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Status de Escala Pessoal</Text>
              <View style={styles.escalaRow}>
                <View style={styles.escalaItem}>
                  <Text style={styles.escalaLabel}>Hoje (23/10)</Text>
                  <Text style={[styles.escalaValue, { color: '#dc2626' }]}>PRONTIDÃO (Alfa)</Text>
                </View>
                <View style={styles.escalaItem}>
                  <Text style={styles.escalaLabel}>Amanhã (24/10)</Text>
                  <Text style={[styles.escalaValue, { color: '#16a34a' }]}>FOLGA 1º DIA</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Editais de SEG Disponíveis</Text>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagSeg}>4 VAGAS DISPONÍVEIS</Text>
                <Text style={styles.cardTime}>Inscrições Abertas</Text>
              </View>
              <Text style={styles.cardTitle}>Prevenção Aquática Orla de Itacoatiara</Text>
              <Text style={styles.cardBody}>
                Data: Sábado, 26/10 • 14:00 às 22:00{'\n'}
                Valor: R$ 280,00{'\n'}
                Uniforme: 5º RBM (Operacional Leve)
              </Text>

              <TouchableOpacity 
                style={[styles.primaryBtn, candidatadoSeg && { backgroundColor: '#16a34a' }]}
                onPress={() => {
                  setCandidatadoSeg(!candidatadoSeg);
                  Alert.alert('SEG CBMAM', candidatadoSeg ? 'Candidatura cancelada.' : 'Candidatura realizada com sucesso! Critério de seleção: menor número de SEGs no mês.');
                }}
              >
                <Text style={styles.primaryBtnText}>
                  {candidatadoSeg ? '✓ Candidatura Confirmada' : 'Candidatar-se à Vaga'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ABA 3: CHECKLIST MATINAL 08H00 */}
        {currentTab === 'checklist' && (
          <View>
            <Text style={styles.sectionTitle}>Passagem de Serviço - 08h00</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Viatura: UR-02 (Resgate e APH)</Text>
              <Text style={styles.cardBody}>
                Confira os itens antes de assumir o socorro. O checklist concluído é imutável para efeitos de auditoria.
              </Text>

              <View style={{ marginTop: 12 }}>
                {checklistItems.map(item => (
                  <View key={item.id} style={styles.checklistItemRow}>
                    <Text style={styles.checklistItemText}>{item.nome}</Text>
                    <TouchableOpacity 
                      style={styles.okPill}
                      onPress={() => Alert.alert('Item ' + item.nome, 'Item verificado e operacional.')}
                    >
                      <Text style={styles.okPillText}>✓ OK</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[styles.primaryBtn, { backgroundColor: '#dc2626', marginTop: 16 }]}
                onPress={() => Alert.alert('Passagem Concluída', 'Checklist da UR-02 finalizado com sucesso! Evento publicado no feed do Quartel.')}
              >
                <Text style={styles.primaryBtnText}>Encerrar e Assinar Checklist 08h00</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ABA 4: PERMUTAS */}
        {currentTab === 'permutas' && (
          <View>
            <Text style={styles.sectionTitle}>Central de Permutas</Text>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Minha Solicitação Atual</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardBody}>
                  • Solicitante: Sd BM Rocha{'\n'}
                  • Substituto: Sd BM Lima{'\n'}
                  • Data Original: 14/05/2026 (Alfa){'\n'}
                  • Data Paga: 22/05/2026 (Bravo)
                </Text>
                
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>⏳ Aguardando Homologação do Comando</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, { marginTop: 15 }]}
              onPress={() => Alert.alert('Nova Permuta', 'Abra o formulário para selecionar o parceiro e datas.')}
            >
              <Text style={styles.primaryBtnText}>+ Propor Nova Permuta</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* BARRA INFERIOR DE 4 ABAS */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.tabBtn} 
          onPress={() => setCurrentTab('feed')}
        >
          <Text style={[styles.tabIcon, currentTab === 'feed' && styles.tabActiveText]}>📰</Text>
          <Text style={[styles.tabLabel, currentTab === 'feed' && styles.tabActiveText]}>Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabBtn} 
          onPress={() => setCurrentTab('escala')}
        >
          <Text style={[styles.tabIcon, currentTab === 'escala' && styles.tabActiveText]}>📅</Text>
          <Text style={[styles.tabLabel, currentTab === 'escala' && styles.tabActiveText]}>Escala/SEG</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabBtn} 
          onPress={() => setCurrentTab('checklist')}
        >
          <Text style={[styles.tabIcon, currentTab === 'checklist' && styles.tabActiveText]}>🚒</Text>
          <Text style={[styles.tabLabel, currentTab === 'checklist' && styles.tabActiveText]}>Checklist</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabBtn} 
          onPress={() => setCurrentTab('permutas')}
        >
          <Text style={[styles.tabIcon, currentTab === 'permutas' && styles.tabActiveText]}>🔄</Text>
          <Text style={[styles.tabLabel, currentTab === 'permutas' && styles.tabActiveText]}>Permutas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  loginLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },
  loginSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topLogo: {
    width: 38,
    height: 38,
  },
  militarNome: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  militarStatus: {
    color: '#64748b',
    fontSize: 11,
  },
  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  logoutBtnText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pinnedCard: {
    borderColor: '#fca5a5',
    backgroundColor: '#fffaf9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tagAvisoCmt: {
    color: '#dc2626',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagChecklist: {
    color: '#16a34a',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagSeg: {
    color: '#d97706',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#94a3b8',
    fontSize: 10,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardBody: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 18,
  },
  cardAuthor: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 8,
    fontStyle: 'italic',
  },
  escalaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  escalaItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  escalaLabel: {
    color: '#64748b',
    fontSize: 11,
    marginBottom: 4,
  },
  escalaValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  checklistItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  checklistItemText: {
    color: '#1e293b',
    fontSize: 12,
    flex: 1,
  },
  okPill: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  okPillText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusBadge: {
    marginTop: 10,
    backgroundColor: '#fef3c7',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  statusBadgeText: {
    color: '#92400e',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingBottom: 16,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    color: '#94a3b8',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '600',
  },
  tabActiveText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
});
