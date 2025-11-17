import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function Spaceships() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStarships() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://swapi.dev/api/starships/');
        const json = await response.json();

        setShips(json.results || []);
      } catch (e) {
        setError('Failed to load starships 🚀');
      } finally {
        setLoading(false);
      }
    }

    fetchStarships();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Model: {item.model}</Text>
      <Text style={styles.subtitle}>Manufacturer: {item.manufacturer}</Text>
      <Text style={styles.subtitle}>Crew: {item.crew}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading spaceships…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ships}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  listContent: { padding: 16 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  loadingText: { color: 'white', marginTop: 8 },
  errorText: { color: 'tomato', textAlign: 'center' },
  item: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  title: { color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#9CA3AF', fontSize: 14 },
});
