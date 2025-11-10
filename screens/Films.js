import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
export default function Films() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Films Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'} });
