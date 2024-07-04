import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button, Modal, Share } from 'react-native';
import { useWilayah } from '../WilayahContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import { useFocus } from '../FocusContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { selectedWilayah, setWilayah } = useWilayah();
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isFirstRender, setIsFirstRender] = useState(true);
  const isMountedRef = useRef(true);
  const flatListRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();

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
      isMountedRef.current = true;
      setLainnyaFocused(true);

      return () => {
        setLainnyaFocused(false);
        setPage(1);
      };
    }, [selectedWilayah])
  );

  const fetchData = async () => {
    try {
      const API_URL = `https://webapi.bps.go.id/v1/api/list/?model=infographic&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=${isFirstRender ? 1 : page}`;
      setIsFirstRender(false);
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.status === 'OK' && result.data && result.data.length > 1) {
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


  const handleModal = async (dlUrl, title) => {
    try {
      if (dlUrl) {

        const sanitizedTitle = title.replace(/\//g, '_');
        const fileInfo = await FileSystem.downloadAsync(
          dlUrl,
          FileSystem.documentDirectory + `${sanitizedTitle}.png`
        );

      
        
        // Show the image in the modal
        setSelectedImage(fileInfo.uri);
        setModalVisible(true);
      } else {
        console.error('Invalid file URL:', dlUrl);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const renderItem = ({ item }) => (

    <View style={{ flex: 1 }}>
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        handleModal(item.dl, item.title);
      }}
    >
      <Image style={styles.itemImage} source={{ uri: item.img }} />
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
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.inf_id || 'fallback'}_${index}`}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />

      {/* Modal for displaying the image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalImage}
            source={{ uri: selectedImage }}
            resizeMode="contain"
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingleft : '8%'
  },
  itemContainer: {
    
    flex : 1,
    paddingTop: '4%',
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Add border color
    borderRadius: 8,
    overflow: 'hidden', // To ensure border-radius works on the image
    padding : 10
  },
  itemImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    objectFit :'fill',
    paddingleft : '8%'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
  },
});

export default App;