import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Platform, TouchableOpacity, Linking, StyleSheet, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { useWilayah } from '../WilayahContext';
import * as FileSystem from 'expo-file-system';
import * as shareAsync from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const App = ({ route }) => {
  const [data, setData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const { selectedWilayah, setWilayah } = useWilayah();
  
  const { pubId } = route.params;
  const navigation = useNavigation();

  const apiUrl = `https://webapi.bps.go.id/v1/api/view/?model=publication&id=${pubId}&lang=ind&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`;

  useEffect(() => {
    const hideTabBar = () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    };
  
    // Function to show the bottom tab bar
    const showTabBar = () => {
      navigation.getParent()?.setOptions({ tabBarStyle: {
        height: 70,
        backgroundColor: '#E3ECFC',
        justifyContent: "center",
        alignItems: "center",
      }, });
    };

    hideTabBar();

    fetchData();
    return () => {
      showTabBar();
    };
  }, [pubId, navigation, selectedWilayah]);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showToast = (type, text1, text2, progress) => {
    Toast.show({
      type,
      text1,
      text2: progress !== undefined ? `${text2} ${progress} Bytes` : text2,
      visibilityTime: type === 'info' ? 1000 : 4000, // Adjust the visibility time as needed
      autoHide: progress === 100, // Auto hide the toast when progress reaches 100%
    });
  };
  const showToast2 = (type, text1, text2, progress) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: type === 'info' ? 1000 : 3000, // Adjust the visibility time as needed
      autoHide: true, // Auto hide the toast when progress reaches 100%
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
            showToast2('success', 'File saved', 'The file has been saved successfully!');
          })
          .catch(e => {
            console.log(e);
            showToast2('error', 'Save failed', 'There was an error during file save.');
          });
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (apiData && apiData.data && apiData.data.pdf) {
        const fileUri = apiData.data.pdf;
  
        // Check if the fileUri is a valid string
        if (typeof fileUri === 'string' && fileUri.trim() !== '') {
          showToast('info', 'Download started', 'Your PDF download is in progress...', 0); // Start with 0% progress
  
          // Create a download resumable to handle the download progress
          const downloadResumable = FileSystem.createDownloadResumable(
            fileUri,
            FileSystem.documentDirectory + `${apiData.data.title.replace(/\//g, '_')}.pdf`,
            {},
            (progress) => {console.log(progress); handleDownloadProgress(progress) }
          );
  
          const { uri } = await downloadResumable.downloadAsync();
  
          // Save the downloaded file using saveFile function
          await saveFile(uri, `${apiData.data.title}.xlsx`, 'application/pdf');
        } else {
          console.error('Invalid file URL:', fileUri);
        }
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      showToast('error', 'Download failed', 'There was an error during PDF download.', 100); // Show 100% progress to dismiss the toast
    }
  };
  
  const handleDownloadProgress = (progress) => {
    const percentage = progress.totalBytesExpectedToWrite !== 0
      ? Math.round((progress.totalBytesWritten ) )
      : 0;
  
    showToast('info', 'Download in progress', `Downloaded `, percentage);
  };

  const handleShare = async () => {
    try {
      if (apiData && apiData.data && apiData.data.pdf) {
        const fileUri = apiData.data.pdf;
  
        // Check if the fileUri is a valid string
        if (typeof fileUri === 'string' && fileUri.trim() !== '') {
          const message = `Check out this link: ${fileUri}`;
          
          // Share the link using Expo's Sharing module
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


  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={{ padding: 16 }}>
      {apiData && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign : 'justify' }}>
          {apiData?.data?.title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: apiData?.data?.cover }}
              style={{ width: '40%', height: 200, marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, marginBottom: 8 }}>No. Katalog: {apiData?.data?.kat_no}</Text>
              <Text style={{ fontSize: 14, marginBottom: 8 }}>No. Publikasi: {apiData?.data?.pub_no}</Text>
              <Text style={{ fontSize: 14, marginBottom: 8 }}>ISSN/ISBN: {apiData?.data?.issn}</Text>
              <Text style={{ fontSize: 14, marginBottom: 8 }}>Tgl. Rilis: {apiData?.data?.rl_date}</Text>
              <Text style={{ fontSize: 14, marginBottom: 16 }}>Ukuran File: {apiData?.data?.size}</Text>
              
            </View>
          </View>
          <Text></Text>
          <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'justify' }}>
            {apiData?.data?.abstract.replace(/\r\n/g, ' ').replace(/<br>/g, '')}
          </Text>
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
    <View style={styles.bottomButtonContainer}>
    <View style={{ flexDirection: 'row' }}>
      
    <TouchableOpacity
          onPress={handleDownloadPDF}
          style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="download-box"  size={30} />
          <Text>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="share-variant"  size={30} />
          <Text>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          
          style={{ width: '60%',  padding: 12, borderRadius: 4, alignItems: 'center' }}
        >
        </TouchableOpacity>
      </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    padding: 6,
    
  },
});

export default App;