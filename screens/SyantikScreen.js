import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import *  as Sharing from 'expo-sharing';

const DynamicTable = ({ route }) => {
  const [data, setData] = useState([]);
  const [columnDescriptions, setColumnDescriptions] = useState({});

  const { tableId, tahun, judul, sumber } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const hideTabBar = () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    };
  
    const showTabBar = () => {
      navigation.getParent()?.setOptions({ tabBarStyle: {
        height: 100,
        backgroundColor: '#F5FBFF',
        justifyContent: "center",
        alignItems: "center",
      }, });
    };

    hideTabBar();
    fetchData();
    fetchColumnDescriptions();

    return () => {
      showTabBar();
    };
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://webapps.bps.go.id/sultra/syantik/api/fetch-data/${tableId}s/${tahun}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchColumnDescriptions = async () => {
    try {
      const response = await fetch('https://webapps.bps.go.id/sultra/syantik/api/master-kolom');
      const result = await response.json();
      const descriptions = {};

      result.forEach((item) => {
        descriptions[item.nama_kolom] = item.deskripsi;
      });

      setColumnDescriptions(descriptions);
    } catch (error) {
      console.error('Error fetching column descriptions:', error);
    }
  };

  const excludedColumns = ['id', 'idkab','idkec', 'updated_at','tahun'];
  const columns = Object.keys(data[0] || {}).filter(column => !excludedColumns.includes(column));

  const renderHeader = () => {
    return (
      <Row data={columns.map(column => columnDescriptions[column] || column)} style={styles.header} textStyle={styles.headerText} />
    );
  };

  const renderRows = () => {
    return data.map((item, index) => (
      <Row key={index} data={columns.map(column => item[column])} style={styles.row} textStyle={styles.cellText} />
    ));
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };


  if (Platform.OS === 'IOS') {
  const downloadAndShareCSV = async () => {
    try {
      const csvData = convertToCSV(data);
      const fileName = `table_data_${tableId}_${tahun}.csv`;
      const filePath = FileSystem.cacheDirectory + fileName;
      
      // Adding title to CSV content
      const title = `Title: ${judul}, Year: ${tahun}, Source: ${sumber}\n\n`;
      const csvContent = title + csvData;
  
      await FileSystem.writeAsStringAsync(filePath, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
  
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(filePath);
      } else {
        showToast('info', 'Downloaded CSV', 'Check your Downloads folder');
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const convertToCSV = (data) => {
    const header = columns.map(column => columnDescriptions[column] || column);
    const rows = data.map(item => columns.map(column => item[column]));

    const csvContent = [header.join(','), ...rows.map(row => row.join(','))].join('\n');

    return csvContent;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Text>{judul}, {tahun}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
              {renderHeader()}
              {renderRows()}
            </Table>
            <Text>Sumber: {sumber}</Text>
          </View>
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={downloadAndShareCSV}
          style={{ width: '20%', padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="download-box" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
else{
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

  const downloadExcel = async () => {
    try {
      const response = await fetch(`https://webapps.bps.go.id/sultra/syantik/api/fetch-data/${tableId}s/${tahun}`);
      const data = await response.json();

      // Create a CSV string from the data
      const csvData = columns.map(column => columnDescriptions[column] || column).join(',') + '\n' +
                      data.map(item => columns.map(column => item[column]).join(',')).join('\n');

      // Create a file in the document directory
      const filePath = `${FileSystem.documentDirectory}${judul}_${tahun}.csv`;

      await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });

      // Save the file using the saveFile function
      await saveFile(filePath, `${judul}_${tahun}.csv`, 'text/csv');
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Text>{judul}, {tahun}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
              {renderHeader()}
              {renderRows()}
            </Table>
            <Text>Sumber: {sumber}</Text>
          </View>
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={downloadExcel}
          style={{ width: '20%', padding: 6, borderRadius: 8, alignItems: 'center' }}
        >
          <MaterialCommunityIcons name="download-box" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );

}



};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
  },
  header: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 150,
  },
  row: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row', // Ensure that the rows have the same width as the header
  },
  cellText: {
    textAlign: 'center',
    width: 150,
  },
  bottomButtonContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    padding: 6,
  },
});

export default DynamicTable;