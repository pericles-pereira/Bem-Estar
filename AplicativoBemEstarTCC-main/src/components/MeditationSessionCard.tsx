  import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
  import Feather from 'react-native-vector-icons/Feather'; // ✅ Substituição aqui

  // Tipagem para os dados da sessão
  export interface Session {
    id: number;
    title: string;
    description: string;
    time: number; // em minutos
    iconName: string; // Nome do ícone Feather
    iconBgColor: string; // Cor de fundo do ícone
  }

  // Tipagem para as Props
  interface SessionCardProps {
    session: Session;
    onPress: (sessionId: number) => void;
  }

  const MeditationSessionCard: React.FC<SessionCardProps> = ({ session, onPress }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.contentRow}>
          {/* Ícone com Fundo Colorido */}
          <View style={[styles.iconWrapper, { backgroundColor: session.iconBgColor }]}>
            <Feather name={session.iconName} size={28} color="#FFFFFF" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.sessionDescription}>{session.description}</Text>

            {/* Tempo e Botão */}
            <View style={styles.footerRow}>
              {/* Tempo */}
              <View style={styles.timeWrapper}>
                <Feather name="clock" size={16} color="#666666" />
                <Text style={styles.timeText}>{session.time} min</Text>
              </View>

              {/* Botão Começar */}
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => onPress(session.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Começar</Text>
                <Feather
                  name="arrow-right"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#EEEEEE',
    },
    contentRow: {
      flexDirection: 'row',
    },
    iconWrapper: {
      width: 60,
      height: 60,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
    },
    sessionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 4,
    },
    sessionDescription: {
      fontSize: 14,
      color: '#666666',
      marginBottom: 10,
      lineHeight: 20,
    },
    footerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    timeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeText: {
      fontSize: 14,
      color: '#666666',
      marginLeft: 5,
    },
    startButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333333',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    startButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 14,
    },
  });

  export default MeditationSessionCard;