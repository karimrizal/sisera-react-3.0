import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import { useWilayah } from '../WilayahContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ApiDataScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { subId } = route.params;
  const { selectedWilayah, setWilayah } = useWilayah();
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(true);
  const isMountedRef = useRef(true);
 
  const apiUrl = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&page=1&key=1f5ea27aa195656fa79ee36110bda985`;

  useEffect(() => {
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      
     
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

  const fetchData = async (page) => {
    let filteredData;

    try {
      const response = await fetch(`${apiUrl}&page=${page}`);
      const result = await response.json();
      const total = result['data'][0]['pages'];
    
      
      if ( isMountedRef.current && isFocused && result.status === 'OK' && result.data && result.data.length > 1) {
       filteredData = result.data[1].filter(item => item.subj_id == subId);
        setData((prevData) => [...prevData, ...filteredData]);

        if(page < total){
        fetchData(page + 1);
        
      }
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (filteredData.length > 0){
      setLoading(false); 
    }
    
    }
  };

 

  const handleExcelDownload = (excelUrl) => {
    Linking.openURL(excelUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Tabel Detail', { tableId: item.table_id })}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.updt_date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.table_id || 'fallback'}_${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

export default ApiDataScreen;