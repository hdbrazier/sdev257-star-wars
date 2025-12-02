import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const placeholder = require("../assets/placeholder.png");

export default function LazyImage({ style, source, resizeMode = "cover" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {/* Placeholder while the real image is loading */}
      {!loaded && (
        <Image
          source={placeholder}
          style={StyleSheet.absoluteFillObject}
          resizeMode={resizeMode}
        />
      )}

      {/* Actual image; when it loads we hide the placeholder */}
      <Image
        source={source}
        style={StyleSheet.absoluteFillObject}
        resizeMode={resizeMode}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}
