import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFinish();
    }, 3000); // 10 seconds

    return () => clearTimeout(timeoutId);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/splashscreen.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your desired background color
  },
  logo: {
    flex :1,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;