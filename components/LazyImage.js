import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const placeholder = require("../assets/placeholder.jpg");

export default function LazyImage({
  style,
  source,
  resizeMode = "contain",
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[style, styles.container]}>
      {/* Placeholder while the real image is loading */}
      {!loaded && (
        <Image
          source={placeholder}
          style={styles.image}
          resizeMode={resizeMode}
        />
      )}

      {/* Actual image*/}
      <Image
        source={source}
        style={styles.image}
        resizeMode={resizeMode}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden", 
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
