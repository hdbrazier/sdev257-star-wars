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
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import LazyImage from "../components/LazyImage";



export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    async function fetchPlanets() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://swapi.dev/api/planets/');
        const json = await response.json();

        setPlanets(json.results || []);
      } catch (e) {
        setError('Failed to load planets 🪐');
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  const handleSearchSubmit = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;
    setModalText(`Search: ${trimmed}`);
    setModalVisible(true);
  };

  const handlePlanetSwiped = (planet) => {
    // Show item text in the modal
    setModalText(`Planet: ${planet.name}`);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading planets…</Text>
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
      {/* Search input + button */}
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

      <LazyImage
        style={styles.headerImage}
        source={require("../assets/planets-header.png")}
      />

      {/* ScrollView wrapping the list of items */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {planets.map((planet) => (
          <Animated.View 
            key={planet.url}
            entering={SlideInLeft.duration(400)}
            exiting={SlideOutRight.duration(300)}
          >
            <View style={styles.planetBlock}>
              <SwipeableRow
                label={planet.name}
                onSwiped={() => handlePlanetSwiped(planet)}
              />
              {/* Extra details below the swipe row */}
              <Text style={styles.subtitle}>Climate: {planet.climate}</Text>
              <Text style={styles.subtitle}>Population: {planet.population}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>


      {/* Modal that shows search text or swiped item text */}
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

  planetBlock: {
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
  headerImage: {
    width: "100%",
    height: 180,
    marginBottom: 16,
    overflow: "hidden", // keeps the image nicely clipped
  },

});
