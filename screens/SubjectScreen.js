import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';



const API_URL_2 = 'https://webapi.bps.go.id/v1/api/list/?model=subject&subcat=2&domain=7400&key=1f5ea27aa195656fa79ee36110bda985';
const API_URL_3 = 'https://webapi.bps.go.id/v1/api/list/?model=subject&subcat=3&domain=7400&key=1f5ea27aa195656fa79ee36110bda985';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [data2, setData2] = useState([]);
  const [loading2, setLoading2] = useState(false);
  
  const [data3, setData3] = useState([]);
  const [loading3, setLoading3] = useState(false);

  const [showData, setShowData] = useState(false);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const { selectedWilayah, setWilayah } = useWilayah();

  const fetchData = async (url, setDataFunc, setLoadingFunc) => {
    try {
      setLoadingFunc(true);

      let page = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(`${url}&page=${page}`);
        const result = await response.json();

        if (result.status === 'OK' && result.data && result.data.length > 1) {
          setDataFunc((prevData) => [...prevData, ...result.data[1]]);
          page++;
        } else {
          hasMoreData = false;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingFunc(false);
    }
  };

  useEffect(() => {
    fetchData(`https://webapi.bps.go.id/v1/api/list/?model=subject&subcat=1&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`, setData, setLoading);
    fetchData(`https://webapi.bps.go.id/v1/api/list/?model=subject&subcat=2&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`, setData2, setLoading2);
    fetchData(`https://webapi.bps.go.id/v1/api/list/?model=subject&subcat=3&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`, setData3, setLoading3);
  }, [selectedWilayah]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Tabel Subject', { subId: item.sub_id })}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Text></Text>
     <Button
        title={showData ? 'Sosial dan Kependudukan' : 'Sosial dan Kependudukan'}
        onPress={() => setShowData(!showData)}
      />
      {showData && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sub_id || 'fallback'}_${index}`}
        />
      )}

      <Text></Text>
 <Button
        title={showData2 ? 'Ekonomi dan Perdagangan' : 'Ekonomi dan Perdagangan'}
        onPress={() => setShowData2(!showData2)}
      />
      
      {showData2 && (
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sub_id || 'fallback'}_${index}`}
        />
      )}
      
      <Text></Text>
 <Button
        title={showData3 ? 'Pertanian dan Pertambangan' : 'Pertanian dan Pertambangan'}
        onPress={() => setShowData3(!showData3)}
      />
      
      {showData3 && (
        <FlatList
          data={data3}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sub_id || 'fallback'}_${index}`}
        />
      )}

     
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
    paddingTop : '4%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;