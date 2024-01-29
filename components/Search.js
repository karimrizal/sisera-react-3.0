import * as React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Search() {
  const navigation = useNavigation();

  const handleSearch = () => {
    // Navigate to SearchScreen.js when the "Go" button is pressed
    navigation.navigate('SearchScreen');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: 50,
        flexDirection: 'row',
        borderColor: '#ffa30a',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 14,
        marginHorizontal: 20,
      }}
    >
      <TextInput
        placeholder='Cari data di sini'
        style={{
          flex: 1,
          paddingLeft: 10,
          // fontFamily: 'DMSans-Regular'
        }}
        onSubmitEditing={handleSearch} // This will be triggered when the "Go" button is pressed
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#ffa30a',
          borderTopEndRadius: 12,
          borderBottomEndRadius: 12,
          width: 102,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          // fontFamily: 'DMSans-Regular'
        }}
        onPress={handleSearch} // This will be triggered when the TouchableOpacity is pressed
      >
        <Text
          style={{
            color: 'white',
            // fontFamily: 'DMSans-Regular'
          }}
        >
          Cari
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Search;