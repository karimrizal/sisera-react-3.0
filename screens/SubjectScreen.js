import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



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


  const handleShowDataPress = () => {
    setShowData(!showData);
    setShowData2(false);
    setShowData3(false);
  };

  const handleShowData2Press = () => {
    setShowData2(!showData2);
    setShowData(false);
    setShowData3(false);
  };

  const handleShowData3Press = () => {
    setShowData3(!showData3);
    setShowData(false);
    setShowData2(false);
  };

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
    <View style={styles.itemBorder}>
    <View style={{ flexDirection: 'row' }}>
    <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={handleShowDataPress}>
            
      <MaterialCommunityIcons name="account-group"  size={20} color ='blue' />
        </TouchableOpacity>

      <TouchableOpacity style={{ width: '75%',justifyContent: 'center' }} onPress={handleShowDataPress}>
          <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color:  '#000' }}>{showData ? 'Sosial dan Kependudukan' : 'Sosial dan Kependudukan'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={handleShowDataPress}>
            
         <MaterialCommunityIcons name="chevron-down"  size={20} />
        </TouchableOpacity>
</View>
      </View>
      {showData && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sub_id || 'fallback'}_${index}`}
        />
      )}

      <Text></Text>

      <View style={styles.itemBorder}>
      <View style={{ flexDirection: 'row'}}>
<TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={handleShowData2Press}>
  <MaterialCommunityIcons name="store"  size={20} color ='orange' />
    </TouchableOpacity>

  <TouchableOpacity style={{ width: '75%',justifyContent: 'center'}} onPress={handleShowData2Press}>
      <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color:  '#000' }}>{showData2 ? 'Ekonomi dan Perdagangan' : 'Ekonomi dan Perdagangan'}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={handleShowData2Press}>
     <MaterialCommunityIcons name="chevron-down"  size={20} />
    </TouchableOpacity>
</View>
  </View>
      
      {showData2 && (
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sub_id || 'fallback'}_${index}`}
        />
      )}
      
      <Text></Text>


<View style={styles.itemBorder}>
<View style={{ flexDirection: 'row' }}>
<TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={handleShowData3Press}>
  <MaterialCommunityIcons name="leaf"  size={20} color ='green' />
    </TouchableOpacity>

  <TouchableOpacity style={{ width: '75%',justifyContent: 'center' }} onPress={handleShowData3Press}>
      <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color:  '#000' }}>{showData3 ? 'Pertanian dan Pertambangan' : 'Pertanian dan Pertambangan'}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }}  onPress={handleShowData3Press}>
     <MaterialCommunityIcons name="chevron-down"  size={20} />
    </TouchableOpacity>
    </View>
  </View>
      
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
    backgroundColor: '#fff',
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
  itemBorder: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
    borderWidth: 1,  
    borderColor: '#0080e4', 
  },
});

export default App;