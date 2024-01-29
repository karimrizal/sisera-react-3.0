import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';
import { useFocus } from '../FocusContext';
import moment from 'moment';


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
const CustomTabBar = () => {
    return (
      <View style={styles.customTabBarContainer}>
        <Text style={styles.customTabBarText}>Your Custom Text</Text>
      </View>
    );
  };

export default function App() {
    
const { isLainnyaFocused, setLainnyaFocused } = useFocus();
const [currentMonthText, setCurrentMonthText] = useState('');
useFocusEffect(
    React.useCallback(() => {
      // Runs when the screen is focused
      setLainnyaFocused(true);

      // Clean up function for when the component unmounts or loses focus
      return () => {
        setLainnyaFocused(false);
      };
    }, [setLainnyaFocused])
  );
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = moment(currentDate).locale('id').format('MMMM');
    setCurrentMonthText(`Data Terbaru Bulan ${currentMonth}`);
  }, []);
    
  return (
    <View style={{ flex: 1 }}>
        <Text style={{marginVertical: 10, fontWeight: 'bold',textAlign: 'center', fontSize : 24}}>{currentMonthText}</Text>
    <Tab.Navigator>
    <Tab.Screen name="Publikasi">
    {() => <PublikasiScreen/>}
  </Tab.Screen>
  <Tab.Screen name="BRS">
    {() => <BRSScreen/>}
  </Tab.Screen>
  <Tab.Screen name="Tabel">
    {() => <TabelScreen/>}
  </Tab.Screen>
  <Tab.Screen name="Berita">
    {() => <BeritaScreen/>}
  </Tab.Screen>
  
</Tab.Navigator>
</View>
 
  );
}

function BRSScreen() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { selectedWilayah, setWilayah } = useWilayah();
    const [totalPages, setTotalPages] = useState(1);
    const flatListRef = useRef();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
        console.log('API URL:', API_URL_PUBLIKASI);
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        console.log('API Response:', result);
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          // Filter data for unique combinations of month and year
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.brs_id}`;
  
            // Only add the item to uniqueItems if it hasn't been added for this month and year
            if (itemMonth === currentMonth && itemYear === currentYear && !uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
  
          setData((prevData) => [...prevData, ...Array.from(uniqueItems.values())]);
          setTotalPages(result.page);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }, [selectedWilayah]);
  
    useEffect(() => {
      fetchData(1);
    }, [selectedWilayah]);
    useFocusEffect(
        React.useCallback(() => {
          console.log('Screen is focused');
          setData([]);
          setPage(1);
          fetchData(1);
    
          // Cleanup function to be executed when the component loses focus
          return () => {
            setPage(1);
            console.log('Screen is not focused');
            // You can add cleanup logic here, such as clearing data or cancelling ongoing requests
            
          };
        }, [selectedWilayah])
      );
  
    const fetchData = async (currentPage) => {
      setLoading(true);
      setPage(currentPage);
  
      await fetchAndUpdateData(currentPage);
  
      setLoading(false);
    };
  
    const handleEndReached = () => {
      if (!loading && page < totalPages) {
        fetchData(page + 1);
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

  function BeritaScreen() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { selectedWilayah, setWilayah } = useWilayah();
    const [totalPages, setTotalPages] = useState(1);
    const flatListRef = useRef();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
        console.log('API URL:', API_URL_PUBLIKASI);
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        console.log('API Response:', result);
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          // Filter data for unique combinations of month and year
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.news_id}`;
  
            // Only add the item to uniqueItems if it hasn't been added for this month and year
            if (itemMonth === currentMonth && itemYear === currentYear && !uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
  
          setData((prevData) => [...prevData, ...Array.from(uniqueItems.values())]);
          setTotalPages(result.page);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }, [selectedWilayah]);
  
    useEffect(() => {
      fetchData(1);
    }, [selectedWilayah]);
    useFocusEffect(
        React.useCallback(() => {
          console.log('Screen is focused');
          setData([]);
          setPage(1);
          fetchData(1);
    
          // Cleanup function to be executed when the component loses focus
          return () => {
            setPage(1);
            console.log('Screen is not focused');
            // You can add cleanup logic here, such as clearing data or cancelling ongoing requests
            
          };
        }, [selectedWilayah])
      );
  
    const fetchData = async (currentPage) => {
      setLoading(true);
      setPage(currentPage);
  
      await fetchAndUpdateData(currentPage);
  
      setLoading(false);
    };
  
    const handleEndReached = () => {
      if (!loading && page < totalPages) {
        fetchData(page + 1);
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

  function TabelScreen() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { selectedWilayah, setWilayah } = useWilayah();
    const [totalPages, setTotalPages] = useState(1);
    const flatListRef = useRef();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
        console.log('API URL:', API_URL_PUBLIKASI);
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        console.log('API Response:', result);
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          // Filter data for unique combinations of month and year
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.updt_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.table_id}`;
  
            // Only add the item to uniqueItems if it hasn't been added for this month and year
            if (itemMonth === currentMonth && itemYear === currentYear && !uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
  
          setData((prevData) => [...prevData, ...Array.from(uniqueItems.values())]);
          setTotalPages(result.page);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }, [selectedWilayah]);
  
    useEffect(() => {
      fetchData(1);
    }, [selectedWilayah]);
    useFocusEffect(
        React.useCallback(() => {
          console.log('Screen is focused');
          setData([]);
          setPage(1);
          fetchData(1);
    
          // Cleanup function to be executed when the component loses focus
          return () => {
            setPage(1);
            console.log('Screen is not focused');
            // You can add cleanup logic here, such as clearing data or cancelling ongoing requests
            
          };
        }, [selectedWilayah])
      );
  
    const fetchData = async (currentPage) => {
      setLoading(true);
      setPage(currentPage);
  
      await fetchAndUpdateData(currentPage);
  
      setLoading(false);
    };
  
    const handleEndReached = () => {
      if (!loading && page < totalPages) {
        fetchData(page + 1);
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

  function PublikasiScreen() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { selectedWilayah, setWilayah } = useWilayah();
    const [totalPages, setTotalPages] = useState(1);
    const flatListRef = useRef();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
        console.log('API URL:', API_URL_PUBLIKASI);
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        console.log('API Response:', result);
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          // Filter data for unique combinations of month and year
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.pub_id}`;
  
            // Only add the item to uniqueItems if it hasn't been added for this month and year
            if (itemMonth === currentMonth && itemYear === currentYear && !uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
  
          setData((prevData) => [...prevData, ...Array.from(uniqueItems.values())]);
          setTotalPages(result.page);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }, [selectedWilayah]);
  
    useEffect(() => {
      fetchData(1);
    }, [selectedWilayah]);
    useFocusEffect(
        React.useCallback(() => {
          console.log('Screen is focused');
          setData([]);
          setPage(1);
          fetchData(1);
    
          // Cleanup function to be executed when the component loses focus
          return () => {
            setPage(1);
            console.log('Screen is not focused');
            // You can add cleanup logic here, such as clearing data or cancelling ongoing requests
            
          };
        }, [selectedWilayah])
      );
  
    const fetchData = async (currentPage) => {
      setLoading(true);
      setPage(currentPage);
  
      await fetchAndUpdateData(currentPage);
  
      setLoading(false);
    };
  
    const handleEndReached = () => {
      if (!loading && page < totalPages) {
        fetchData(page + 1);
      }
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
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    );
  }





