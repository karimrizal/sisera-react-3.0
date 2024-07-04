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
import { Badge, BottomSheet, ListItem } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    flex: 1, 
    marginRight: 16,
    paddingLeft: '4%',
    paddingTop: '4%',
    backgroundColor: '#fff',
   
  },
  container: {
    flex: 1, 
    
    backgroundColor: '#fff',
   
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
    width: 100, 
    height: 100, 
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16, 
  },
  itemImageInfografis: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  InforagisImage: {
    width: 300,
    height: 300, 
    
    borderRadius: 4,
    marginRight: 1, 
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
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  textWaktu: {
    fontSize: 14,
    color: 'white',
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
    width: '100%', 
    height: '100%',
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
const { setBadgeStatus } = useFocus();
const { cumulativeTotal } = useFocus();

const { brsStatus } = useFocus();
const { brsCount } = useFocus();

const { publikasiStatus } = useFocus();
const { publikasiCount } = useFocus();

const { tabelStatus } = useFocus();
const { tabelCount } = useFocus();

const { beritaStatus } = useFocus();
const { beritaCount } = useFocus();

useFocusEffect(
    React.useCallback(() => {
      
      setLainnyaFocused(true);
      setBadgeStatus('ok');
       AsyncStorage.setItem('currentTotal', String(cumulativeTotal));
      return () => {
        
        setLainnyaFocused(false);
      };
    }, [setLainnyaFocused, setBadgeStatus])
  );
  useEffect(() => {
    const currentDate = new Date();
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const currentMonth = months[currentDate.getMonth()];
    setCurrentMonthText(`Data Terbaru Bulan ${currentMonth}`);
  }, []);
    
  return (
    <View style={{ flex: 1,backgroundColor: '#fff', }}>
        <Text style={{marginVertical: 10, fontWeight: 'bold',textAlign: 'center', fontSize : 20}}>{currentMonthText}</Text>
    <Tab.Navigator>
    <Tab.Screen
      name="BRS"
      
      options={{
        tabBarLabel: ({ color, focused }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color, marginRight: 5 }}>BRS</Text>
            <Badge status={ brsStatus } value={ brsCount } />
          </View>
        ),
      }}
    >
    {() => <BRSScreen/>}
  </Tab.Screen>
  <Tab.Screen
      name="Publikasi"
      
      options={{
        tabBarLabel: ({ color, focused }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color, marginRight: 5 }}>Publikasi</Text>
            <Badge status={ publikasiStatus } value={ publikasiCount } />
          </View>
        ),
      }}
    >
    {() => <PublikasiScreen/>} 
  </Tab.Screen>
  
  <Tab.Screen
      name="Tabel"
      
      options={{
        tabBarLabel: ({ color, focused }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color, marginRight: 5 }}>Tabel</Text>
            <Badge status={ tabelStatus } value={ tabelCount } />
          </View>
        ),
      }}
    >
    {() => <TabelScreen/>}
  </Tab.Screen>
  <Tab.Screen
      name="Berita"
      
      options={{
        tabBarLabel: ({ color, focused }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color, marginRight: 5 }}>Berita</Text>
            <Badge status={ beritaStatus } value={ beritaCount } />
          </View>
        ),
      }}
    >
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

    const { setBRSStatus } = useFocus();
    const { setBRSCount } = useFocus();
    const { totalBRS } = useFocus();

    const { brsStatus } = useFocus();
    const { brsCount } = useFocus();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.brs_id}`;
  
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
      const fetchDataAndUpdate = async (currentPage) => {
        try {
          setLoading(true);
          setPage(currentPage);
          
    
        } finally {
          setLoading(false);
        }
      };
    
      fetchDataAndUpdate(1);
    
    }, [selectedWilayah]);
   
  
    useFocusEffect(
        React.useCallback(() => {
        
          setData([]);
          setPage(1);
          fetchAndUpdateData(1);

          
    
          return () => {
          setPage(1);
          setBRSStatus('ok');
          setBRSCount(0);
          AsyncStorage.setItem('currentBRSTotal', String(totalBRS));
            
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

    const { setBeritaStatus } = useFocus();
    const { setBeritaCount } = useFocus();
    const { totalBerita } = useFocus();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.news_id}`;
  
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
      const fetchDataAndUpdate = async (currentPage) => {
        try {
          setLoading(true);
          setPage(currentPage);
          
    
        } finally {
          setLoading(false);
        }
      };
    
      fetchDataAndUpdate(1);
    
    }, [selectedWilayah]);
   
  
    useFocusEffect(
        React.useCallback(() => {
        
          setData([]);
          setPage(1);
          fetchAndUpdateData(1);
    
          return () => {
            setPage(1);

            setBeritaStatus('ok');
            setBeritaCount(0);
            AsyncStorage.setItem('currentBeritaTotal', String(totalBerita));
            
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

    const { setTabelStatus } = useFocus();
    const { setTabelCount } = useFocus();
    const { totalTabel } = useFocus();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.updt_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.table_id}`;
  
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
      const fetchDataAndUpdate = async (currentPage) => {
        try {
          setLoading(true);
          setPage(currentPage);
          
    
        } finally {
          setLoading(false);
        }
      };
    
      fetchDataAndUpdate(1);
    
    }, [selectedWilayah]);
   
  
    useFocusEffect(
        React.useCallback(() => {
        
          setData([]);
          setPage(1);
          fetchAndUpdateData(1);
    
          return () => {
            setPage(1);

            setTabelStatus('ok');
            setTabelCount(0);
            AsyncStorage.setItem('currentTabelTotal', String(totalTabel));
            
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

    const { setPublikasiStatus } = useFocus();
    const { setPublikasiCount } = useFocus();
    const { totalPublikasi } = useFocus();
  
    const fetchAndUpdateData = async (currentPage) => {
      try {
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${currentPage}`;
  
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
  
        if (result.status === 'OK' && result.data && result.data.length > 1) {
          
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear();
          const uniqueItems = new Map();
  
          result.data[1].forEach((item) => {
            const itemDate = new Date(item.rl_date);
            const itemMonth = itemDate.getMonth() + 1;
            const itemYear = itemDate.getFullYear();
            const key = `${itemMonth}_${itemYear}_${item.pub_id}`;
  
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
      const fetchDataAndUpdate = async (currentPage) => {
        try {
          setLoading(true);
          setPage(currentPage);
          
    
        } finally {
          setLoading(false);
        }
      };
    
      fetchDataAndUpdate(1);
    
    }, [selectedWilayah]);
   
  
    useFocusEffect(
        React.useCallback(() => {
        
          setData([]);
          setPage(1);
          fetchAndUpdateData(1);
    
          return () => {
            setPage(1);
          setPublikasiStatus('ok');
          setPublikasiCount(0);
          AsyncStorage.setItem('currentPublikasiTotal', String(totalPublikasi));
            
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





