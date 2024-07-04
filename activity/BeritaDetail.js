import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView,TouchableOpacity,Linking, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { useWilayah } from '../WilayahContext';

const ApiView = ({ route }) => {
  const [apiData, setApiData] = useState(null);
  const { beritaId } = route.params;
  const { selectedWilayah, setWilayah } = useWilayah();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://webapi.bps.go.id/v1/api/view/?model=news&id=${beritaId}&lang=ind&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedWilayah]);

  const injectedJavaScript = `
    const style = document.createElement('style');
    style.innerHTML = 'body { font-size: 30pt; }';
    document.head.appendChild(style);
  `;

  return (
    <ScrollView style={{ flex: 1, paddingTop : '2%',backgroundColor: '#fff', }}>
      <Image source={{ uri: apiData?.data?.picture }} style={{  height: 300, maxWidth:'100%', marginLeft : 15, marginRight : 15,objectFit : 'fill' }} />
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'justify', marginVertical: 10, paddingLeft : '4%', paddingRight : '4%' }}>
        {apiData?.data?.title}
      </Text>
      <View style={{ marginHorizontal: 5, flex: 1 }}>
        {apiData && apiData.data && apiData.data.news ? (
          <WebView nestedScrollEnabled
            source={{ html: apiData.data.news.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '') }}
            originWhitelist={['*']}
            injectedJavaScript={injectedJavaScript}
            style={{ flex: 10, height: 300, adjustsFontSizeToFit: true }}
          />
        ) : null}
      </View>
      <Text>{'\n'}</Text>
      
    </ScrollView>
  );
};

export default ApiView;