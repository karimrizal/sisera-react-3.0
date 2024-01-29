import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans',
    color: 'white',
  },
  textIndikator: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'DMSansBold'

  },
  textWaktu: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'DMSans',
    marginVertical: '5%',
  },
  textStat: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'DMSansBold'
  },
  inf10: {
    fontSize: 10,
    fontFamily: 'DMSans'
  },
  infJudul: {
    fontSize: 14,
    fontFamily: 'DMSansBold'
  },
  itemContainer: {
    flex: 1, // Set the desired width for each item
    marginRight: 16,
    paddingLeft: '4%',
    paddingTop: '4%',
   
  },
  itemContainerTabel: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    paddingTop: '4%',
    paddingLeft: '4%',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  itemImage: {
    width: 100, // Set the desired width for the image
    height: 100, // Set the desired height for the image
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16, // Adjust the margin as needed
  },
  itemImageInfografis: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  InforagisImage: {
    width: 300, // Set the desired width for the image
    height: 300, // Set the desired height for the image
    
    borderRadius: 4,
    marginRight: 1, // Adjust the margin as needed
  },
  textContainer: {
  
    marginLeft: 10,
    marginRight: 0,
    width: 200,
    textAlign: 'justify',
    
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  date: {
    fontSize: 14,
    color: '#666',
    
  },

  itemContainerIndikator: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  textIndikator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    // Add the following style to allow multiline
    // Adjust the number of lines as needed
    // You may also want to adjust the height of the container accordingly
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  textWaktu: {
    fontSize: 14,
    color: 'white',
    // Add the following style to allow multiline
    // Adjust the number of lines as needed
    // You may also want to adjust the height of the container accordingly
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    flex: 1,
    width: '100%', // Set the width to 100% of the screen width
    height: '100%', // Set the height to 100% of the screen height
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

const Tab = createMaterialTopTabNavigator();

export default function App() {
    const route = useRoute();
    const { searchQuery } = route.params;
    
  return (
    
    <Tab.Navigator
  tabBarOptions={{
    scrollEnabled: true,
    tabStyle: { width: 'auto' }, // set the width to 'auto' for each tab
  
  }}
>
    <Tab.Screen name="Publikasi">
    {() => <PublikasiScreen searchQuery={searchQuery} />}
  </Tab.Screen>
  <Tab.Screen name="BRS">
    {() => <BRSScreen searchQuery={searchQuery} />}
  </Tab.Screen>
  <Tab.Screen name="Tabel">
    {() => <TabelScreen searchQuery={searchQuery} />}
  </Tab.Screen>
  <Tab.Screen name="Infografis">
    {() => <InfografisScreen searchQuery={searchQuery} />}
  </Tab.Screen>
  <Tab.Screen name="Berita">
    {() => <BeritaScreen searchQuery={searchQuery} />}
  </Tab.Screen>
    
</Tab.Navigator>
 
  );
}

function PublikasiScreen({ searchQuery }) {
    
    const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=7400&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
     const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { selectedWilayah, setWilayah } = useWilayah();
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
  
    const flatListRef = useRef();
  
    useEffect(() => {
      setData([]);
      setPage(0);
      fetchData();
      
      
    }, [selectedWilayah]);
  
    const fetchData = async () => {
      try {
        
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
        console.log('API URL:', API_URL_PUBLIKASI);
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        console.log('API Response:', result);
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          setData((prevData) => [...prevData, ...result.data[1]]);
          setTotalPages(result.page);
          setPage(page + 1);
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
  const handleExcelDownload = (excelUrl) => {
      Linking.openURL(excelUrl);
    };
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Publikasi Detail', { pubId: item.pub_id })}
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
  
  const onEndReached = () => {
      if (!loading) {
        fetchData();
      }
    };
    
    return (
      <View style={styles.container}>
        {data.length === 0 ? (
          <Text style={styles.noDataText}>No data available</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item, index) => `${item.pub_id || 'fallback'}_${index}`}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    );
  }

  function BRSScreen({ searchQuery }) {
    const API_URL_BRS = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=7400&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
    const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { selectedWilayah, setWilayah } = useWilayah();
 
  const [totalPages, setTotalPages] = useState(1);

  const flatListRef = useRef();

  useEffect(() => {
    setData([]);
    setPage(0);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
      console.log('API URL:', API_URL);
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log('API Response:', result);

      if (result.status === 'OK' && result.data && result.data.length > 1 ) {
        setData((prevData) => [...prevData, ...result.data[1]]);
        setTotalPages(result.page);
        setPage(page + 1);
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
        <Text style={styles.date}>{item.updt_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => `${item.brs_id || 'fallback'}_${index}`}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

function TabelScreen({ searchQuery }) {
  const [data, setData] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const navigation = useNavigation();
const { selectedWilayah, setWilayah } = useWilayah();
const API_URL_TABEL = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
  

const flatListRef = useRef();

useEffect(() => {
  fetchData();
}, [selectedWilayah]);

const fetchData = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL_TABEL}&page=${page}`);
    const result = await response.json();

    if (result.status === 'OK' && result.data && result.data.length > 1) {
      // Check if result.data[1] is defined, if not, use an empty array
      const newData = result.data[1] || [];
      setData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
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
  <TouchableOpacity onPress={() => navigation.navigate('Tabel Detail', { tableId: item.table_id })}>
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.updt_date}</Text>
    </View>
  </TouchableOpacity>
);

return (
  <View style={styles.container}>
    {data.length === 0 ? (
      <Text style={styles.noDataText}>No data available</Text>
    ) : (
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => `${item.table_id || 'fallback'}_${index}`}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    )}
  </View>
);
}

function InfografisScreen({ searchQuery }) {
  const API_URL_INFOGRAFIS = `https://webapi.bps.go.id/v1/api/list/?model=infographic&domain=7400&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { selectedWilayah, setWilayah } = useWilayah();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
 
  const [totalPages, setTotalPages] = useState(1);

  const flatListRef = useRef();

  useEffect(() => {
    setData([]);
    setPage(1);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=infographic&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
      console.log('API URL:', API_URL);
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log('API Response:', result);

      if (result.status === 'OK' && result.data && result.data.length > 1) {
        setData((prevData) => [...prevData, ...result.data[1]]);
        setTotalPages(result.page);
        setPage(page + 1);
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
  const handleImagePress = (imageUri) => {
    // Set the selected image URI and open the modal
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleImagePress(item.img)}
    > 
    <View style={styles.itemContainer}>
      <Image style={styles.itemImageInfografis} source={{ uri: item.img }} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => `${item.inf_id || 'fallback'}_${index}`}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Image style={styles.modalImage} source={{ uri: selectedImage }} />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            {/* Close button */}
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function BeritaScreen({ searchQuery }) {
  const API_URL_BERITA = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=7400&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { selectedWilayah, setWilayah } = useWilayah();
 
  const [totalPages, setTotalPages] = useState(1);

  const flatListRef = useRef();

  useEffect(() => {
    setData([]);
    setPage(0);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
      console.log('API URL:', API_URL);
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log('API Response:', result);

      if (result.status === 'OK' && result.data && result.data.length > 1 ) {
        setData((prevData) => [...prevData, ...result.data[1]]);
        setTotalPages(result.page);
        setPage(page + 1);
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
    <TouchableOpacity onPress={() => navigation.navigate('Berita Detail', { beritaId: item.news_id })}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.rl_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => `${item.news_id || 'fallback'}_${index}`}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}



