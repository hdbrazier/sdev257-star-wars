// Fetch from SWAPI
// Search Box
// Vertical ScrollView
// Swipeable Row
// Modal shows search text or swiped item text
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import SwipeableRow from '../components/SwipeableRow';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    async function fetchFilms() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://swapi.dev/api/films/');
        const json = await response.json();

        setFilms(json.results || []);
      } catch (e) {
        setError('Failed to load films 🎬');
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();
  }, []);

  const handleSearchSubmit = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;
    setModalText(`Search: ${trimmed}`);
    setModalVisible(true);
  };

  const handleFilmSwiped = (film) => {
    setModalText(`Film: ${film.title}`);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading films…</Text>
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
      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter search term…"
          placeholderTextColor="#6B7280"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
          <Text style={styles.searchButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable list */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {films.map((film) => (
          <View key={film.url} style={styles.block}>
            <SwipeableRow
              label={film.title}
              onSwiped={() => handleFilmSwiped(film)}
            />
            <Text style={styles.subtitle}>Episode: {film.episode_id}</Text>
            <Text style={styles.subtitle}>Director: {film.director}</Text>
            <Text style={styles.subtitle}>Release: {film.release_date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Info</Text>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  loadingText: { color: 'white', marginTop: 8 },
  errorText: { color: 'tomato', textAlign: 'center' },

  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#111827',
    borderRadius: 8,
    color: 'white',
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  block: {
    marginBottom: 16,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    color: '#E5E7EB',
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
