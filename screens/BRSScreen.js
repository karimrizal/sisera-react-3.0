import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';
import { useFocus } from '../FocusContext';


const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();
  const { selectedWilayah, setWilayah } = useWilayah();
 
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const isMountedRef = useRef(true);

  const flatListRef = useRef();

  useEffect(() => {
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      
      setIsFirstRender(true);
      setData([]);
      setPage(1);
      fetchData(1);
      setLainnyaFocused(true);

      // Reset isMounted on focus
      isMountedRef.current = true;

      // Cleanup function to be executed when the component loses focus
      return () => {

        setLainnyaFocused(false);
        setPage(1);
        // You can add cleanup logic here, such as clearing data or cancelling ongoing requests
        
      };
    }, [selectedWilayah])
  );

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${isFirstRender ? 1 : page}`;
    
      setIsFirstRender(false);
      const response = await fetch(API_URL);
      const result = await response.json();
     

      if (result.status === 'OK' && result.data && result.data.length > 1 ) {
        setData((prevData) => [...prevData, ...result.data[1]]);
        setTotalPages(result.page);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      fetchData();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BRS Detail', { brsId: item.brs_id })}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.rl_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.brs_id || 'fallback'}_${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ref={flatListRef}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: '4%',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

export default App;