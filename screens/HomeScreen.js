import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, FlatList,Modal, TouchableWithoutFeedback, Pressable, ScrollView, StyleSheet, Dimensions, useWindowDimensions, TouchableOpacity, Linking, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../components/Search';
import Menu from '../components/Menu';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen'
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import DecoLines from '../assets/DecoLines.svg'
import DocumentIcon from '../assets/icons/Document.svg'
import TabelIcon from '../assets/icons/Tabel.svg'
import InfografisIcon from '../assets/icons/Infografis.svg'
import RilisDataIcon from '../assets/icons/RilisData.svg'
import BeritaIcon from '../assets/icons/Berita.svg'
import JadwalRilisIcon from '../assets/icons/JadwalRilis.svg'
import KonsultasiIcon from '../assets/icons/Konsultasi.svg'
import PPIDIcon from '../assets/icons/PPID.svg'
import DownloadIcon from '../assets/icons/Download.svg'
// import { Home } from 'react-native-iconly';
import WorkIcon from '../assets/icons/Work.svg'
import DecoEllipse from '../assets/icons/DecoEllipse.svg'
import ArrowRight from '../assets/icons/ArrowRight.svg'
import { useNavigation } from '@react-navigation/native';
import { useBookmarkContext } from '../BookmarkContext';
import ModalDropdown from 'react-native-modal-dropdown';
import { useWilayah } from '../WilayahContext';


const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans',
    color: 'white',
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
  textIndikator: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'DMSansBold'

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },

  blueBox: {
    backgroundColor: '#1B85F3',
    borderRadius: 14,
    padding: 20,
    width: '80%', // Adjust the width as needed
  },

  optionItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    width: 300, // Set the desired width for each item
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
  itemContentPublikasi: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingLeft: '2%',
    paddingRight: '3%',
    
  },
  itemContent: {
    borderBottomColor: '#ccc',
    paddingLeft: '2%',
    paddingRight: '3%',
    
  },
  itemImage: {
    width: 100, // Set the desired width for the image
    height: 100, // Set the desired height for the image
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16, // Adjust the margin as needed
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
   
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
})

const PublikasiRoute = () => (
  <View style={{ flex: 1, height: 300 }}>
    <PublikasiCard />
  </View>
)

const TabelRoute = () => (
  <View style={{ flex: 1, height: 500 }}>
   <TabelCard />
  </View>
)

const BRSRoute = () => (
  <View style={{ flex: 1, height: 500 }}>
    <BRSCard />
  </View>
)


const renderScene = SceneMap({
  first: PublikasiRoute,
  second: TabelRoute,
  third: BRSRoute,
  
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#b6b6b6' }}
    style={{ backgroundColor: '#f6f6f6' }}
    scrollEnabled={true}
    activeColor='#0d49a8'
    inactiveColor='#b6b6b6'
    tabStyle={{
      gap: 5,
      fontFamily: 'DMSans',
    }}
    renderLabel={({ route, focused, color }) => {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {route.title === 'BRS' ? (
            <Text style={{ color, fontFamily: 'DMSans' }}>{route.title}</Text>
          ) : (
            <>
              <Text style={{ color, fontFamily: 'DMSans' }}>{route.title}</Text>
              <ArrowRight style={{ marginLeft: 5 }} fill="#6895D2" />
            </>
          )}
        </View>
      );
    }}
  />
);

const dimensionsWidth = Dimensions.get('window').width

function Card(props) {
  return (
    <View style={{
      width: 180,
      height: 210,
      backgroundColor: props.bgcolor,
      borderRadius: 16,
      flex: 1,
      margin: 10,
    }}>
      <View style={{
        position: 'absolute',
      }}>
        <DecoEllipse />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '80%',
        top: '10%',
      }}>
        <WorkIcon />
        <ArrowRight />
      </View> 

      <View style={{
        height: '10%',
        width: '80%',
        position: 'relative',
        bottom: '5%',
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
      }}>
        <Text style={[ styles.textIndikator, ]}>{props.indikator}</Text>
        <Text style={[ styles.textWaktu]}>{props.waktu}</Text>
        <Text style={[ styles.textStat]}>{props.stat}</Text>
      </View>
    </View>
  
  )
}

function PublikasiCard() {
  const { selectedWilayah, setWilayah } = useWilayah(); 
  const API_URL_PUBLIKASI = `https://webapi.bps.go.id/v1/api/list/?model=publication&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=1`;
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation2 = useNavigation();

  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data only if the page is equal to 1
      const response = await fetch(API_URL_PUBLIKASI);
      const result = await response.json();

      if (result.status === 'OK') {
        setData(result.data[1]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    // No need for handling end reached for page 1
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation2.navigate('Publikasi Detail', { pubId: item.pub_id })}
    >
      <View style={styles.itemContentPublikasi}>
        <Image style={styles.itemImage} source={{ uri: item.cover }} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.date}>{item.rl_date}</Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
  const onEndReached = () => {
    
  };



  return (
    <View style={styles.container}>
      <FlatList
      nestedScrollEnabled
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.pub_id}
        renderItem={renderItem}
        horizontal={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        
      />
    </View>
  )
}


function TabelCard() {
  const { selectedWilayah, setWilayah } = useWilayah(); 
  const API_URL_TABEL = `https://webapi.bps.go.id/v1/api/list/?model=statictable&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=1`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation2 = useNavigation();

  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data only if the page is equal to 1
      const response = await fetch(API_URL_TABEL);
      const result = await response.json();

      if (result.status === 'OK') {
        setData(result.data[1].slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    // No need for handling end reached for page 1
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainerTabel}
      onPress={() => navigation2.navigate('Tabel Detail', { tableId: item.table_id })}
    >
      <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.date}>{item.updt_date}</Text>
      </View>
    </TouchableOpacity>
  );
  const onEndReached = () => {
    
  };



  return (
    
    <View style={styles.container}>
      <FlatList nestedScrollEnabled
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.table_id}
        renderItem={renderItem}
        horizontal={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

function IndikatorCard() {
  const API_URL = 'https://webapi.bps.go.id/v1/api/list/?model=indicators&domain=7400&key=1f5ea27aa195656fa79ee36110bda985';
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { bookmarkedItems } = useBookmarkContext();
  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL}&page=${page}`);
    const result = await response.json();

    if (result.status === 'OK' && result.data && result.data[1]) {
      // Use slice to get only the first 10 items
      const first10Items = result.data[1].slice(0, 10);

      setData((prevData) => [...prevData, ...first10Items]);
      setPage(page + 1);
    } else {
      console.error('Invalid data structure:', result);
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
    <TouchableOpacity>
      <View style={styles.itemContainerIndikator}>
        <View
          style={{
            width: 180, // Adjust the width based on your design
            height: 210,
            backgroundColor: '#1B85F3',
            borderRadius: 16,
            margin: 10,
          }}
        >
          {/* Your Ellipse and ArrowRight components */}
          <View style={{ position: 'absolute' }}>
            <DecoEllipse />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '80%',
              top: '5%',
              paddingLeft: '4%',
            }}
          >
            <WorkIcon />
            
          </View>
  
          {/* Content */}
          <View
  style={{
    height: '90%', // Increase the height as needed
    width: '80%',
    position: 'relative',
    bottom: '5%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    paddingLeft: '4%',
  }}
>
        <Text style={styles.textIndikator}>{item.title}</Text>
        <Text style={styles.textWaktu}>{item.value}</Text>
            {/* Add other text components as needed */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bookmarkedItems}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.hash_id || 'fallback'}_${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      horizontal={true} // Set to true for horizontal view
      ref={flatListRef}
    />
  );
}


function BRSCard() {

  const { selectedWilayah, setWilayah } = useWilayah(); 
  const API_URL_TABEL = `https://webapi.bps.go.id/v1/api/list/?model=pressrelease&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985&page=1`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation2 = useNavigation();

  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data only if the page is equal to 1
      const response = await fetch(API_URL_TABEL);
      const result = await response.json();

      if (result.status === 'OK') {
        setData(result.data[1].slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    // No need for handling end reached for page 1
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainerTabel}
      onPress={() => navigation2.navigate('BRS Detail', { brsId: item.brs_id })}
    >
      <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.date}>{item.rl_date}</Text>
      </View>
    </TouchableOpacity>
  );
  const onEndReached = () => {
    
  };



  return (
    
    <View style={styles.container}>
      <FlatList nestedScrollEnabled
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.brs_id}
        renderItem={renderItem}
        horizontal={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}


function InfografisCard() {
  const { selectedWilayah, setWilayah } = useWilayah(); 
  const API_URL_INFOGRAFIS = `https://webapi.bps.go.id/v1/api/list/?model=infographic&domain=${selectedWilayah.value}&key=1f5ea27aa195656fa79ee36110bda985`;
 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, [selectedWilayah]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (page === 1) {
        // Only fetch the first page
        const response = await fetch(`${API_URL_INFOGRAFIS}&page=${page}`);
        const result = await response.json();

        if (result.status === 'OK') {
          setData(result.data[1]);
        }
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    // No need to fetch more pages
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
      <Image style={styles.InforagisImage} source={{ uri: item.img }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.inf_id.toString()}
        onEndReached={handleEndReached}
        horizontal={true}
        onEndReachedThreshold={0}
      />

      {/* Modal for displaying the selected image */}
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

function HomeScreen({navigation}) {

  
  const [isModalVisible, setModalVisible] = useState(false);
  const { selectedWilayah, setWilayah } = useWilayah();
  
  const wilayahOptions = [
    { label: 'Prov. Sulawesi Tenggara', value: 7400 },
    { label: 'Buton', value: 7401 },
    { label: 'Muna', value: 7402 },
    { label: 'Konawe', value: 7403 },
    { label: 'Kolaka', value: 7404 },
    { label: 'Konawe Selatan', value: 7405 },
    { label: 'Bombana', value: 7406 },
    { label: 'Wakatobi', value: 7407 },
    { label: 'Kolaka Utara', value: 7408 },
    { label: 'Buton Utara', value: 7409 },
    { label: 'Konawe Utara', value: 7410 },
    { label: 'Kolaka Timur', value: 7411 },
    { label: 'Konawe Kepulauan', value: 7412 },
    { label: 'Muna Barat', value: 7413 },
    { label: 'Buton Tengah', value: 7414 },
    { label: 'Buton Selatan', value: 7415 },
    { label: 'Kota Kendari', value: 7471 },
    { label: 'Kota Baubau', value: 7472 },
    // Add more options as needed
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionPress = (option) => {
    setWilayah(option);
    toggleModal();
    // Add your logic for the selected option
  };

  const renderItemModal = ({ item }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleOptionPress(item)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  
  const layout = useWindowDimensions()

  // const [fontsLoaded] = useFonts({
  //     "DMSans": require("../assets/fonts/DMSans.ttf")
  // })

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Publikasi' },
    { key: 'second', title: 'Tabel' },
    { key: 'third', title: 'BRS' },
    
  ])

  // useEffect(() => {
  //     async function prepare(){
  //       await SplashScreen.preventAutoHideAsync()
  //     }
  //     prepare()
  //   }, [])

  //   if(!fontsLoaded){
  //     return undefined
  //   } else {
  //     SplashScreen.hideAsync()
  //   }
  const navigateToSearchResult = () => {
    // Navigate to the desired screen (replace 'SearchResult' with the actual screen name)
    navigation.navigate('Search');
  };


  return (
    <ScrollView horizontal={false} style={{
      flex: 1,
      backgroundColor: 'white'
    }}>

      <View style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#1B85F3',
        borderRadius: 14,
        paddingLeft: 15,
        width: '90%',
        alignSelf: 'center',
        flexWrap: 'wrap',
        
      }}>


        <View style={{
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          flex: 1,
          // margin: 0,
        }}>
          <DecoLines />
          <View style={{
            position: 'absolute',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            paddingVertical: 30,
            width: '70%',
          }}>
            <Text
              style={{
                // position: 'absolute',
                fontFamily: 'DMSans',
                fontSize: 14,
                color: '#ECEFF2'
              }}
            >Selamat datang di SISERA!</Text>
            <Text
              style={{
                // position: 'absolute',
                fontFamily: 'DMSansBold',
                fontSize: 18,
                color: 'white'
              }}>Data Sulawesi Tenggara Dalam Genggaman</Text>
          </View>
        </View>
      </View>

      <View style={{
        alignSelf: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#CCE1F7',
        width: '70%',
        height: 10,
        position: 'relative',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
      }}>
        {/* kotak biru shadow */}
      </View>
      

      <View style={{ flexDirection: 'row', flex: 1, paddingLeft : '4%', marginTop: 20 }}>

      <TextInput
  onFocus={() => navigation.navigate('Search')}
  placeholder="Cari Disini..."
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flex :1,
    
  }}
/>
<View style={{ flex: 1, paddingLeft : '4%' }}>
      <Text style={styles.label}>Pilih Wilayah:</Text>

      <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
        <Text>{selectedWilayah ? selectedWilayah.label : 'Pilih Wilayah'}</Text>
      </TouchableOpacity>

      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={toggleModal}
>
  <TouchableWithoutFeedback onPress={toggleModal}>
    <View style={styles.modalContainer}>
      <View style={styles.blueBox}>
        <FlatList
          data={wilayahOptions}
          renderItem={renderItemModal}
          keyExtractor={(item) => item.value.toString()}
        />
      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>

</View>
    </View>
    
    <Text style={{
          fontFamily: 'DMSansBold',
          fontSize: 20,
          padding: 20,
          paddingBottom: 5,
        }}>Indikator Strategis: </Text>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: '4%',
          
        }}
      >
        <IndikatorCard/>

      </ScrollView>
      {/* <Document /> */}
      <View style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        length: 500,
        backgroundColor: '#0d49a8',
        borderRadius: 32,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingVertical: 20,
        // length: {dimensionsWidth},
      }}>
        <Menu navigation={navigation} name='Publikasi' menuIcon={<DocumentIcon />} />
        <Menu navigation={navigation} name='Tabel' menuIcon={<TabelIcon />} />
        <Menu navigation={navigation} name='Infografis' menuIcon={<InfografisIcon />} />
        <Menu navigation={navigation} name='BRS' menuIcon={<RilisDataIcon />} />
        <Menu navigation={navigation} name='Berita' menuIcon={<BeritaIcon />} />
        <Menu navigation={navigation} name='Jadwal Rilis' menuIcon={<JadwalRilisIcon />} />
        <Menu navigation={navigation} name='Konsultasi' menuIcon={<KonsultasiIcon />} />
        <Menu navigation={navigation} name='Syantik' menuIcon={<PPIDIcon />} />

      </View>

      
      <View style={{
        backgroundColor: '#f6f6f6',
        height: 450,
      }}>
        
        <Text style={{
          fontFamily: 'DMSansBold',
          fontSize: 20,
          padding: 20,
          paddingBottom: 5,
        }}>Informasi Terbaru</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          
        />
      </View>
        

      <View style={{
        backgroundColor: '#f6f6f6',
        height: 330, 
          paddingLeft: '2%',
          
        
      }}>
        <Text style={{
          fontFamily: 'DMSansBold',
          fontSize: 20,
          padding: 20,
          paddingBottom: 5,
        }}>Infografis</Text>
      <Text></Text>
        <InfografisCard />
      </View>
    </ScrollView>
  );
}

export default HomeScreen