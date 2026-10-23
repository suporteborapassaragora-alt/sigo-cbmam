import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';

export default function App() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c1322" />

      {/* TOP BAR: IDENTIFICAÇÃO MILITAR E PRONTIDÃO */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.badgeCbmam}>
            <Text style={styles.badgeCbmamText}>CBMAM</Text>
          </View>
          <View>
            <Text style={styles.militarNome}>Sd BM Rocha</Text>
            <Text style={styles.militarStatus}>Guarnição Alfa • ABT-01 Itacoatiara</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notifBtn} 
          onPress={() => Alert.alert('Notificações', 'Você não possui avisos urgentes pendentes.')}
        >
          <Text style={styles.notifBtnText}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      <ScrollView style={styles.contentArea} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* ABA 1: FEED OPERACIONAL ("REDE SOCIAL DO QUARTEL") */}
        {currentTab === 'feed' && (
          <View>
            <Text style={styles.sectionTitle}>Feed Operacional em Tempo Real</Text>
            
            {/* Aviso Comandante Pinado */}
            <View style={[styles.card, styles.pinnedCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagAvisoCmt}>📌 AVISO DO COMANDANTE</Text>
                <Text style={styles.cardTime}>Há 2 horas</Text>
              </View>
              <Text style={styles.cardTitle}>Diretriz Operacional do Festival da Canção (Fecani)</Text>
              <Text style={styles.cardBody}>
                Todos os militares escalados devem se atentar às normas de segurança para contenção aquática e prontidão no Rio Amazonas.
              </Text>
              <Text style={styles.cardAuthor}>Por: Maj BM Rodrigo (Comandante da Unidade)</Text>
            </View>

            {/* Checklist Matinal Concluído */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagChecklist}>✅ CHECKLIST 08H00</Text>
                <Text style={styles.cardTime}>Hoje 08:15</Text>
              </View>
              <Text style={styles.cardTitle}>Viatura ABT-01 Liberada (100% Operacional)</Text>
              <Text style={styles.cardBody}>
                Conferência de materiais concluída por Cb BM Lucas Mendes. Tanque com 5.000 L e desencarcerador testado.
              </Text>
            </View>

            {/* Nova SEG Aberta */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.tagSeg}>⭐ NOVA SEG ABERTA</Text>
                <Text style={styles.cardTime}>Ontem</Text>
              </View>
              <Text style={styles.cardTitle}>Edital SEG: Salvamento Prainha de Itacoatiara</Text>
              <Text style={styles.cardBody}>
                Remuneração: R$ 280,00 • Turno de 8h no fim de semana. Acesse a aba Escala/SEG para se inscrever.
              </Text>
            </View>
          </View>
        )}

        {/* ABA 2: MINHA ESCALA & SEG */}
        {currentTab === 'escala' && (
          <View>
            <Text style={styles.sectionTitle}>Minha Escala & Serviços Extras</Text>
            
            {/* Card Minha Escala */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Status de Escala Pessoal</Text>
              <View style={styles.escalaRow}>
                <View style={styles.escalaItem}>
                  <Text style={styles.escalaLabel}>Hoje (23/10)</Text>
                  <Text style={[styles.escalaValue, { color: '#ef4444' }]}>PRONTIDÃO (Alfa)</Text>
                </View>
                <View style={styles.escalaItem}>
                  <Text style={styles.escalaLabel}>Amanhã (24/10)</Text>
                  <Text style={[styles.escalaValue, { color: '#10b981' }]}>FOLGA 1º DIA</Text>
                </View>
              </View>
            </View>

            {/* SEG Disponível para Candidatura */}
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
                Uniforme: 5º RBM (Operacional Leve/Bermuda Térmica)
              </Text>

              <TouchableOpacity 
                style={[styles.primaryBtn, candidatadoSeg && { backgroundColor: '#10b981' }]}
                onPress={() => {
                  setCandidatadoSeg(!candidatadoSeg);
                  Alert.alert('SEG CBMAM', candidatadoSeg ? 'Candidatura cancelada.' : 'Candidatura realizada com sucesso! Critério de seleção: menor número de SEGs no mês.');
                }}
              >
                <Text style={styles.primaryBtnText}>
                  {candidatadoSeg ? '✓ Candidatura Confirmada (Fila)' : 'Candidatar-se à Vaga'}
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
                Confira fisicamente cada item antes de assumir o socorro. Conforme diretriz CBMAM, checklist finalizado é imutável.
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
            <Text style={styles.sectionTitle}>Central de Permutas de Serviço</Text>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Minha Solicitação Atual</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardBody}>
                  • Solicitante: <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sd BM Rocha</Text>{'\n'}
                  • Substituto: <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sd BM Lima</Text>{'\n'}
                  • Data Original: 14/05/2026 (Guarnição Alfa){'\n'}
                  • Data Paga: 22/05/2026 (Guarnição Bravo)
                </Text>
                
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>⏳ Aguardando Homologação do Comando</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, { marginTop: 15 }]}
              onPress={() => Alert.alert('Nova Permuta', 'Abra o formulário para selecionar o militar parceiro e datas de compensação.')}
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
  container: {
    flex: 1,
    backgroundColor: '#070b12',
  },
  topBar: {
    backgroundColor: '#0c1322',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeCbmam: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeCbmamText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  militarNome: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  militarStatus: {
    color: '#94a3b8',
    fontSize: 11,
  },
  notifBtn: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  notifBtnText: {
    fontSize: 16,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  pinnedCard: {
    borderColor: '#dc2626',
    backgroundColor: '#16131d',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tagAvisoCmt: {
    color: '#f87171',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagChecklist: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagSeg: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#64748b',
    fontSize: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardBody: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
  },
  cardAuthor: {
    color: '#cbd5e1',
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
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
  },
  escalaLabel: {
    color: '#94a3b8',
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
    borderRadius: 8,
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
    borderBottomColor: '#1e293b',
  },
  checklistItemText: {
    color: '#e2e8f0',
    fontSize: 12,
    flex: 1,
  },
  okPill: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#059669',
  },
  okPillText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusBadge: {
    marginTop: 10,
    backgroundColor: '#451a03',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#b45309',
  },
  statusBadgeText: {
    color: '#fde68a',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomBar: {
    backgroundColor: '#0c1322',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
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
    color: '#64748b',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '600',
  },
  tabActiveText: {
    color: '#ef4444',
  },
});
