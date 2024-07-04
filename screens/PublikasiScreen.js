import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';

const App = () => {
  const { selectedWilayah, setWilayah } = useWilayah();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigation2 = useNavigation();
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

      // Reset isMounted on focus
      isMountedRef.current = true;

      
      return () => {
        setPage(1);
      
      };
    }, [selectedWilayah])
  );

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${isFirstRender ? 1 : page}`;
    
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
 
      fetchData(); // Fetch the next page when reaching the end
      
    
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation2.navigate('Publikasi Detail', { pubId: item.pub_id })}
    >
      <View style={styles.itemContent}>
        <Image style={styles.itemImage} source={{ uri: item.cover }} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.date}>{item.rl_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => `${item.pub_id || 'fallback'}_${index}`}
        renderItem={renderItem}
        horizontal={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  container: {
    flex: 1,
  },
  itemContainer: {
    // Add any additional styling for the item container if needed
  },
});

export default App;