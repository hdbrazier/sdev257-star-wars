import React, { useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function LazyImage({ style, source, resizeMode = "cover" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {/* Spinner while the real image is loading. Had issues using real image */}
      {!loaded && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <Image
        source={source}
        style={StyleSheet.absoluteFillObject}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoaded(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000", 
  },
});
