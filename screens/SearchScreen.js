import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocus } from '../FocusContext';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const isFocused = useRef(false);
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();
  
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };

    loadSearchHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLainnyaFocused(true);
      isFocused.current = true;
      inputRef.current.focus();
      return () => {
        setLainnyaFocused(false);
        isFocused.current = false;
      };
    }, [])
  );

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      setSearchHistory((prevHistory) => [searchText, ...prevHistory]);
      navigation.navigate('Search Detail', { searchQuery: searchText });
      setSearchText('');
  
      // Use the callback form of setState to ensure the latest state is used
      setSearchHistory((updatedHistory) => {
        AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
          .catch((error) => {
            console.error('Error saving search history:', error);
          });
  
        return updatedHistory;
      });
    }
  };

  const handlePressOutside = () => {
    // Unfocus the TextInput when clicking outside
    Keyboard.dismiss();
    // Set auto-focus to false
    isFocused.current = false;
  };

  const handleDeleteHistoryItem = (item) => {
    setSearchHistory((prevHistory) => prevHistory.filter((historyItem) => historyItem !== item));
  
    // Use the callback form of setState to ensure the latest state is used
    setSearchHistory((updatedHistory) => {
      AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
        .catch((error) => {
          console.error('Error saving search history:', error);
        });
  
      return updatedHistory;
    });
  };

  const handlePressHistoryItem = (item) => {
    navigation.navigate('Search Detail', { searchQuery: item });
  };

  const renderHistoryItem = ({ item }) => (

    <View style={{ flexDirection: 'row', flex : 1 }}>
    
    <TouchableOpacity style={{ width: '10%',  padding: 6, borderRadius: 8, paddingLeft : '4%' }} onPress={() => handlePressHistoryItem(item)}>
    <MaterialCommunityIcons name="reload"  size={20} />
    </TouchableOpacity>

    <TouchableOpacity style={{ width: '70%',  padding: 6, borderRadius: 8, paddingLeft : '4%' }} onPress={() => handlePressHistoryItem(item)}>
        <Text >{item}</Text>
    </TouchableOpacity>
    
     <TouchableOpacity style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center' }} onPress={() => handleDeleteHistoryItem(item)}>
     <MaterialCommunityIcons name="delete"  size={20} />
   </TouchableOpacity>

   </View>

  );

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Search text input */}
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Enter search text"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            autoFocus={isFocused.current} // Set autoFocus based on isFocused
          />

          {/* Search button */}
          <Button title="Search" onPress={handleSearch} />
        </View>

        {/* Search history */}
        <FlatList
          data={searchHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop : '5%',
    paddingLeft : '2%',
    paddingRight : '2%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    flex : 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    color: 'red',
    flex : 1,
    marginRight: 10,
  },
});

export default SearchScreen;