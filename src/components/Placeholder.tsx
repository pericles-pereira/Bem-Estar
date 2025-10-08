// Placeholder.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlaceholderProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
});
