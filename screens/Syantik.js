import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { Table, Row, Rows } from 'react-native-table-component';
import Pagination from './Pagination';
import { useNavigation } from '@react-navigation/native';
import { useFocus } from '../FocusContext';
import { useFocusEffect } from '@react-navigation/native';

const ApiComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const itemsPerPage = 10;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Add loading state
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();
useFocusEffect(
  React.useCallback(() => {
    // Runs when the screen is focused
    setLainnyaFocused(true);

    // Clean up function for when the component unmounts or loses focus
    return () => {
      setLainnyaFocused(false);
    };
  }, [setLainnyaFocused])
);

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch('https://webapps.bps.go.id/sultra/syantik/api/master-tabel')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const filteredData = data
    .filter(
      item =>
        item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.dinas.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderTable = () => {
      const tableHead = ['Judul', 'Dinas', 'Tahun'];
      const widthArr = [150, 150, 50]; // Set the width for each column
    
      const headerCells = tableHead.map((header, index) => (
        <View key={header} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#1A8EEA' }}>{header}</Text>
        </View>
      ));
    
      const tableData = filteredData
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => [
          <TouchableOpacity key={item.nama} onPress={() => navigation.navigate('Tabel Syantik', { sumber: item.dinas, judul: item.nama, tableId: item.judul, tahun: item.tahun })}>
            <Text style={{ textAlign: 'left', color: '#1A8EEA', width: widthArr[0], padding: 10 }}>{item.nama}</Text>
          </TouchableOpacity>,
          <Text style={{ width: widthArr[1], padding: 10 }}>{item.dinas}</Text>,
          <Text style={{ width: widthArr[2], padding: 6 }}>{item.tahun}</Text>,
        ]);
    
      return (
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={headerCells} style={{ height: 40, backgroundColor: '#f1f8ff' }} widthArr={widthArr} />
          <Rows data={tableData} widthArr={widthArr} />
        </Table>
      );
    };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleItemPress = itemName => {
    // Handle the onPress action for the item.nama here
   
  };

  return (
    <ScrollView nestedScrollEnabled style={{ flex: 1, paddingLeft : '4%', paddingRight : '4%', backgroundColor: '#fff', }}>
      <View>
        <Text></Text>
        <TextInput
          placeholder="Cari berdasarkan Judul atau Dinas"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            flex :1,
            
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
        ) : (
          data.length > 0 ? renderTable() : <Text>No data available</Text>
        )}
        <Pagination total={Math.ceil(filteredData.length / itemsPerPage)} current={currentPage} onPageChange={handlePageChange} />
        <Text></Text>
        <Text></Text>
      </View>
     
    </ScrollView>
  );
};

export default ApiComponent;