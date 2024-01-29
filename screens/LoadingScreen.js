import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFinish();
    }, 10000); // 10 seconds

    return () => clearTimeout(timeoutId);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="download-box"  size={30} />
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
    width: 200, // Adjust the width and height based on your logo size
    height: 200,
    resizeMode: 'contain',
  },
});

export default LoadingScreen;