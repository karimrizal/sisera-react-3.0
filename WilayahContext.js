import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WilayahContext = createContext();

export const WilayahProvider = ({ children }) => {
  const [selectedWilayah, setSelectedWilayah] = useState({
    label: 'Prov. Sulawesi Tenggara',
    value: 7400,
  });

  // Load the initial selectedWilayah from AsyncStorage
  useEffect(() => {
    const loadSelectedWilayah = async () => {
      try {
        const storedSelectedWilayah = await AsyncStorage.getItem('selectedWilayah');
        if (storedSelectedWilayah) {
          setSelectedWilayah(JSON.parse(storedSelectedWilayah));
        }
      } catch (error) {
        console.error('Error loading selectedWilayah from AsyncStorage:', error);
      }
    };

    loadSelectedWilayah();
  }, []);

  // Update AsyncStorage whenever selectedWilayah changes
  useEffect(() => {
    const saveSelectedWilayah = async () => {
      try {
        await AsyncStorage.setItem('selectedWilayah', JSON.stringify(selectedWilayah));
      } catch (error) {
        console.error('Error saving selectedWilayah to AsyncStorage:', error);
      }
    };

    saveSelectedWilayah();
  }, [selectedWilayah]);

  const setWilayah = (wilayah) => {
    setSelectedWilayah(wilayah);
  };

  return (
    <WilayahContext.Provider value={{ selectedWilayah, setWilayah }}>
      {children}
    </WilayahContext.Provider>
  );
};

export const useWilayah = () => {
  const context = useContext(WilayahContext);
  if (!context) {
    throw new Error('useWilayah must be used within a WilayahProvider');
  }
  return context;
};