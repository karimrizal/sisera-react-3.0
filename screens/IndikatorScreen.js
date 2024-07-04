import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DecoLines from '../assets/DecoLines.svg'
import DecoEllipse from '../assets/icons/DecoEllipse.svg'
import WorkIcon from '../assets/icons/Work.svg'
import ArrowRight from '../assets/icons/ArrowRight.svg'
import { useBookmarkContext } from '../BookmarkContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://webapi.bps.go.id/v1/api/list/?model=indicators&domain=7400&key=1f5ea27aa195656fa79ee36110bda985';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { bookmarkedItems, addBookmark, removeBookmark } = useBookmarkContext();

  const { width, height } = Dimensions.get('window');
const baseFontSize = 13;
const baseFontSizeA = 11;
const getDynamicFontSize = () => {
  if (width >= 1024){
    return width/36;
  }
  else{
    return 16;
  }
}

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
  },
  textIndikator: {
    fontSize: getDynamicFontSize(),
    color: 'white',
    fontFamily: 'DMSansBold',
    paddingBottom: 8,

  },  
  textWaktu: {
    fontSize: (width / 360) * baseFontSizeA,
    color: 'white',
    fontFamily: 'DMSans',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: '#666',
  },
});


  const flatListRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}&page=${page}`);
      const result = await response.json();

      if (result.status === 'OK' && result.data && result.data.length > 1) {
        setData((prevData) => [...prevData, ...result.data[1]]);
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
  const handleBookmark = (item) => {
    const isBookmarked = bookmarkedItems.some((bookmark) => bookmark.hash_id === item.hash_id);
    if (isBookmarked) {
      removeBookmark(item);
    } else {
      addBookmark(item);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <View
          style={{
            width: '97%',
            height: 150,
            backgroundColor: '#1B85F3',
            borderRadius: 16,
            flex: 1,
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
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: '80%',
              top: '2%',
            }}
          >
           
            
          </View>
  
          {/* Content */}
          <View
            style={{
              height: '20%',
              width: '80%',
              position: 'relative',
              bottom: '4%',
              flex: 1,
              alignItems: 'flex-start',
              alignSelf: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <Text style={[styles.textIndikator]}>{item.title}
            {'\n'}
            {parseFloat(item.value).toLocaleString('en-US', { useGrouping: true }).replace(/,/g, ' ')} {item.unit !== 'Tidak Ada Satuan' && `(${item.unit})`}
            </Text>
            
            {/* Add other text components as needed */}
          
          
          </View>
          <TouchableOpacity onPress={() => handleBookmark(item)}>
            <Text style={{ fontSize: (width / 360) * baseFontSizeA,paddingTop: 8, paddingLeft : 15, paddingBottom : 8 }}>{bookmarkedItems.some((bookmark) => bookmark.hash_id === item.hash_id) ? 'Unbookmark' : 'Bookmark'}</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.hash_id || 'fallback'}_${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      horizontal={false}
      ref={flatListRef}
    />
  );
};



export default App;