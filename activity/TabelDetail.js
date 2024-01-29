import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView,TouchableOpacity, Share, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native';
import { useWilayah } from '../WilayahContext';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ApiView = ({ route }) => {
  const [apiData, setApiData] = useState(null);
  const { tableId } = route.params;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { selectedWilayah, setWilayah } = useWilayah();
  const [webViewHeight, setWebViewHeight] = useState(1350);
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {

    // Function to hide the bottom tab bar
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


    const fetchData = async () => {
      try {
        hideTabBar();
        const response = await fetch(`https://webapi.bps.go.id/v1/api/view/?model=statictable&id=${tableId}&lang=ind&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`);
        const data = await response.json();
        
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      showTabBar();
    };
  }, [tableId, navigation, selectedWilayah]);



  const showToast = (type, text1, text2, progress) => {
    Toast.show({
      type,
      text1,
      text2: progress !== undefined ? `${text2} ${progress}%` : text2,
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

  const handleExcelDownload = async () => {
    try {
      if (apiData && apiData.data && apiData.data.excel) {
        const fileUri = apiData.data.excel;
        

        // Check if the fileUri is a valid string
        if (typeof fileUri === 'string' && fileUri.trim() !== '') {
          showToast('info', 'Download started', 'Your PDF download is in progress...', 0);

          const downloadResumable = FileSystem.createDownloadResumable(
            fileUri,
            FileSystem.documentDirectory + `${apiData.data.title.replace(/\//g, '_')}.pdf`,
            {},
            (progress) => handleDownloadProgress(progress)
          );
  
          const { uri } = await downloadResumable.downloadAsync();

          // Use the fileInfo.uri to access the downloaded file path

          // Save the downloaded file using saveFile function
          await saveFile(uri, `${apiData.data.title}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        } else {
          console.error('Invalid file URL:', fileUri);
        }
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownloadProgress = (progress) => {
    const percentage = progress.totalBytesExpectedToWrite !== 0
      ? Math.round((progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100)
      : 0;
    showToast('info', 'Download in progress', `Downloaded `, percentage);
  };

  const handleShare = async () => {
    try {
      if (apiData && apiData.data && apiData.data.excel) {
        const fileUri = apiData.data.excel;
  
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
 
  const onWebViewMessage = (event) => {
    if (event.nativeEvent.data) {
      const height = parseInt(event.nativeEvent.data, 10);
      setWebViewHeight(height);
    }
  }; 



  const onWebViewLoad = () => {
    const script = `
      const table = document.querySelector('table');
      if (table) {
        const height = table.offsetHeight;
        window.ReactNativeWebView.postMessage(String(height));
      }
      document.body.style.zoom = 3.5;
    `;

    webViewRef.current.injectJavaScript(script);
  };


  return (

    <View style={{ flex: 1, paddingTop : '2%', }}>
    <ScrollView>
       
      <View style={{ marginHorizontal: 5, flex: 1 }}>
        {apiData && apiData.data && apiData.data.table ? (
          <WebView
          ref={(ref) => (webViewRef.current = ref)}
            source={{ html: apiData.data.table.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/nbsp;/g, '').replace(/&amp;/g, '').replace(/<table/g, '<table style="font-size: 18.0pt;"')
            .replace(/<td/g, '<td style="width: auto; text-align: left;"')  }} 
            originWhitelist={['*']}
            style={{ flex: 1, height: webViewHeight   }}
         
            onLoad={onWebViewLoad}
            useWebKit={true}
            onMessage={onWebViewMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="compatibility" // Set this prop
          />
        ) : null}
      </View>
          
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>

    <View style={styles.bottomButtonContainer}>
    <View style={{ flexDirection: 'row' }}>
      
    <TouchableOpacity
          onPress={handleExcelDownload}
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

export default ApiView;