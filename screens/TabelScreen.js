import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useWilayah } from '../WilayahContext';
import { useNavigation } from '@react-navigation/native';

const ApiDataScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { subId } = route.params;
  const { selectedWilayah, setWilayah } = useWilayah();
  const navigation = useNavigation();

  const apiUrl = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&page=1&key=1f5ea27aa195656fa79ee36110bda985`;
  const subjIdToFilter = '53'; // Replace with the actual subj_id you want to filter by

  const fetchData = async (page) => {
    try {
      const response = await fetch(`${apiUrl}&page=${page}`);
      const result = await response.json();

      if (result.data[1].length > 0) {
        const filteredData = result.data[1].filter(item => item.subj_id === subId);
        setData((prevData) => [...prevData, ...filteredData]);
        fetchData(page + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [selectedWilayah]);


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
  },
  itemContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default ApiDataScreen;