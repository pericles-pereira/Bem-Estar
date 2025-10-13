// QuickActions.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Smile, Heart, Brain } from 'lucide-react-native';

type QuickAction = { label: string; Icon: React.ElementType; onPress: () => void };

const actions: QuickAction[] = [
  { label: 'Humor', Icon: Smile, onPress: () => console.log('Humor') },
  { label: 'Cuidados', Icon: Heart, onPress: () => console.log('Cuidados') },
  { label: 'Meditação', Icon: Brain, onPress: () => console.log('Meditação') },
];

const QuickActions: React.FC = () => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity key={action.label} style={styles.button} onPress={action.onPress}>
          <action.Icon size={24} color="#4F46E5" />
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  button: { alignItems: 'center', backgroundColor: '#EDE9FE', padding: 10, borderRadius: 12, width: 80 },
  label: { marginTop: 5, fontSize: 12, textAlign: 'center', color: '#4F46E5' },
});

export default QuickActions;
