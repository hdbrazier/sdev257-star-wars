import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * A horizontally swipeable row built with ScrollView,
 * Props:
 *  - label: string (what to display in the row)
 *  - onSwiped: function called when user swipes far enough
 */
export default function SwipeableRow({ label, onSwiped }) {
  const [triggered, setTriggered] = useState(false);

  const handleScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    // When scrolled far enough to the "blank" page, fire once
    if (!triggered && x >= 150) {
      setTriggered(true);
      onSwiped && onSwiped();
    }
  };

  const scrollProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    scrollEventThrottle: 16,
    onScroll: handleScroll,
  };

  return (
    <View style={styles.swipeContainer}>
      <ScrollView {...scrollProps}>
        {/* Page 1: visible row */}
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.swipeItem}>
            <Text style={styles.swipeItemText}>{label}</Text>
          </View>
        </TouchableOpacity>
        {/* Page 2: blank area (for the cancellable behavior) */}
        <View style={styles.swipeBlank} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    width: 260,
    height: 40,
    marginBottom: 12,
    alignSelf: 'center',
  },
  swipeItem: {
    width: 260,
    height: 40,
    backgroundColor: '#111827',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#4B5563',
    paddingHorizontal: 10,
  },
  swipeItemText: {
    textAlign: 'center',
    color: '#E5E7EB',
    fontSize: 14,
  },
  swipeBlank: {
    width: 260,
    height: 40,
  },
});
