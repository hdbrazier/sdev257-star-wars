import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
export default function Spaceships() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Spaceships Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'} });
