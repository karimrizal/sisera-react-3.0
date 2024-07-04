import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, Button, Modal, Share } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useWilayah } from '../WilayahContext';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocus } from '../FocusContext';

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
    
    paddingLeft: '4%',
    paddingTop: '4%',
    backgroundColor: '#fff',
   
  },

  itemContainerInfografis: {
    flex: 1, // Set the desired width for each item
    paddingRight: '4%',
    paddingLeft: '4%',
    paddingTop: '4%',
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Add border color
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
    width: 100, // Set the desired width for the image
    height: 100, // Set the desired height for the image
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16, // Adjust the margin as needed
  },
  itemImageInfografis: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    objectFit : 'fill'
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
    fontSize: 15,
    fontWeight: 'bold',
   
  },
  date: {
    fontSize: 12,
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
    const { isLainnyaFocused, setLainnyaFocused } = useFocus();

    useFocusEffect(
      React.useCallback(() => {
        setLainnyaFocused(true);
        
        return () => {
          setLainnyaFocused(false);
          
        };
      }, [])
    );
  
    useEffect(() => {
      setData([]);
      setPage(0);
      fetchData();
      
      
    }, [selectedWilayah]);
  
    const fetchData = async () => {
      try {
        
        const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
       
        const response = await fetch(API_URL_PUBLIKASI);
        const result = await response.json();
        
  
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
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();

    useFocusEffect(
      React.useCallback(() => {
        setLainnyaFocused(true);
        
        return () => {
          setLainnyaFocused(false);
          
        };
      }, [])
    );

  

  useEffect(() => {
    setData([]);
    setPage(0);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
      
      const response = await fetch(API_URL);
      const result = await response.json();
      

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

function TabelScreen({ searchQuery }) {
  const [data, setData] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const navigation = useNavigation();
const { selectedWilayah, setWilayah } = useWilayah();
const API_URL_TABEL = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&keyword=${searchQuery}&page=1`;
  

const flatListRef = useRef();

const { isLainnyaFocused, setLainnyaFocused } = useFocus();

    useFocusEffect(
      React.useCallback(() => {
        setLainnyaFocused(true);
        
        return () => {
          setLainnyaFocused(false);
          
        };
      }, [])
    );

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

  const { isLainnyaFocused, setLainnyaFocused } = useFocus();

    useFocusEffect(
      React.useCallback(() => {
        setLainnyaFocused(true);
        
        return () => {
          setLainnyaFocused(false);
          
        };
      }, [])
    );

  useEffect(() => {
    setData([]);
    setPage(1);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=infographic&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
   
      const response = await fetch(API_URL);
      const result = await response.json();
     

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

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const saveFile = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
            showToast('success', 'File saved', 'The file has been saved successfully!');
          })
          .catch(e => {
            console.log(e);
            showToast('error', 'Save failed', 'There was an error during file save.');
          });
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  
  const handleInfografisDownload = async (dlUrl, title) => {
    try {
      if (dlUrl) {
        showToast('info', 'Download started', 'Your image download is in progress...');
  
        const sanitizedTitle = title.replace(/\//g, '_'); // Replace slashes with underscores
        const fileInfo = await FileSystem.downloadAsync(
          dlUrl,
          FileSystem.documentDirectory + `${sanitizedTitle}.png` // Change the extension to PNG or another suitable image format
        );
  
      
        // Save the downloaded file using saveFile function with the appropriate MIME type
        await saveFile(fileInfo.uri, `${sanitizedTitle}.png`, 'image/png'); // Adjust MIME type and file extension accordingly
      } else {
        console.error('Invalid file URL:', dlUrl);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleShare = async (dlUrl, title) => {
    try {
      if (dlUrl) {
        const fileUri = dlUrl; // Use the specific dlUrl passed as a parameter
  
        if (typeof fileUri === 'string' && fileUri.trim() !== '') {
          const message = `Temukan Infografis ${title} pada link berikut: ${fileUri}`;
  
          await Share.share({
            message: message,
            url: fileUri,
          });
        } else {
          console.error('Invalid file URL:', fileUri);
        }
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleImagePress = (imageUri) => {
    // Set the selected image URI and open the modal
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainerInfografis}
      onPress={() => handleImagePress(item.img)}
    > 
    <View >
      <Image style={styles.itemImageInfografis} source={{ uri: item.img }} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View>
    <View style={{ flexDirection: 'row' }}>
      
    <TouchableOpacity
          onPress={() => {
            handleInfografisDownload(item.dl, item.title);
          }}
          style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="download-box"  size={30} />
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleShare(item.dl, item.title);
          }}
          style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="share-variant"  size={30} />
          
        </TouchableOpacity>
        <TouchableOpacity
          
          style={{ width: '60%',  padding: 12, borderRadius: 4, alignItems: 'center' }}
        >
        </TouchableOpacity>
      </View>
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
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

  const { isLainnyaFocused, setLainnyaFocused } = useFocus();

    useFocusEffect(
      React.useCallback(() => {
        setLainnyaFocused(true);
        
        return () => {
          setLainnyaFocused(false);
          
        };
      }, [])
    );

  useEffect(() => {
    setData([]);
    setPage(0);
    
    fetchData();
    
    
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=news&domain=${selectedWilayah.value}&keyword=${searchQuery}&key=1f5ea27aa195656fa79ee36110bda985&page=${page}`;
      
      const response = await fetch(API_URL);
      const result = await response.json();
     

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



