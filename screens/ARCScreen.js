import React from "react";
import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useFocus } from '../FocusContext';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();


export default function App() {
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
  return (

      <Tab.Navigator>
        <Tab.Screen name="Publikasi" component={PublikasiScreen} />
        <Tab.Screen name="BRS" component={BRSScreen} />
      </Tab.Navigator>
 
  );
}

function PublikasiScreen() {
  return <Publikasicreen />;
}

function BRSScreen() {
  return <ARCScreen />;
}

function ARCScreen({ navigation }) {

  const webViewScript = `
    (function() {
      document.body.style.zoom = 0.5; 
    })();
  `;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <WebView
      nestedScrollEnabled
      source={{ html: generateHTMLTable() }}
      style={{ flex: 1 }}
      contentContainerStyle={{ width: '100%', overflowX: 'auto' }}
      injectedJavaScript={webViewScript}
      javaScriptEnabled={true}
    />
  </View>
  );
}

function Publikasicreen() {
  const jsonData = generateJSONPublikasi();
  const data = JSON.parse(jsonData);

  return (
    <ScrollView style={{ flex: 1, paddingtop : '15%', }}>
  {data.map((item, index) => (
    <View key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F0F0F0', flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: 'black' }}>
      <Text style={{ flex: 1, padding: 10, textAlign: "center" }}>
      {item.date.replace(/\s/g, '\n')}
      </Text>
      <Text style={{ flex: 2, padding: 10, textAlign : 'justify' }}>
        {item.judul_publikasi}{'\n'}{item.jadwal_rilis}
      </Text>
    </View>
  ))}
  <Text></Text>
  <Text></Text>
 
</ScrollView>

  );
}

function generateHTMLTable() {
  const tableContent = `
    
    <table style="border-collapse: collapse; width: 100%;">
    
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Materi</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Jan</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Feb</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Mar</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Apr</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Mei</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Jun</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Jul</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Ags</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Sep</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Okt</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Nov</th>
          <th style="border: 1px solid black; padding: 10px; text-align: center;">Des</th>
          <!-- Add more headers as needed -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Perkembangan Indeks Harga Konsumen</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">03</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Perkembangan Nilai Tukar Petani, Harga Gabah dan Beras</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">03</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Perkembangan Pariwisata</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">03</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Perkembangan Transportasi</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">03</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">	Profil Kemiskinan </td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">15</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">	Tingkat Ketimpangan Pengeluaran Penduduk </td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">15</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">	Perkembangan Ekspor dan Impor</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">03</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Pertumbuhan Ekonomi </td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">05</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">06</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">05</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">05</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">	Indeks Pembangunan Manusia (IPM)</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Keadaan Ketenagakerjaan</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">06</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">05</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">Luas Panen dan Produksi Padi</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">01</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">	Indeks Harga Konsumen Kota Kendari </td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;">02</td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <td style="border: 1px solid black; padding: 10px; text-align: center;"></td>
          <!-- Add more cells as needed -->
        </tr>
        <!-- Repeat for each row -->
      </tbody>
    </table>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        ${tableContent}
      </body>
    </html>
  `;
}

function generateJSONPublikasi() {
  const data = [
      {
         date: "31 JAN",
         judul_publikasi: "Statistik Nilai Tukar Petani Provinsi Sulawesi Tenggara Triwulan IV Tahun 2023",
         jadwal_rilis: "Jadwal Rilis 31 Jan 2024",
        },
        {
         date: "28 FEB",
         judul_publikasi: "Provinsi Sulawesi Tenggara Dalam Angka 2024",
         jadwal_rilis: "Jadwal Rilis 28 Feb 2024",
        },
        {
         date: "29 FEB",
         judul_publikasi: "Statistik Harga Konsumen Kota Kendari Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 29 Feb 2024",
        },
        {
         date: "29 FEB",
         judul_publikasi: "Statistik Nilai Tukar Petani Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 29 Feb 2024",
        },
        {
         date: "28 MAR",
         judul_publikasi: "Indeks Kemahalan Konstruksi Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 28 Mar 2024",
        },
        {
         date: "28 MAR",
         judul_publikasi: "Statistik Keuangan Daerah Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 28 Mar 2024",
        },
        {
         date: "28 MAR",
         judul_publikasi: "Indeks Harga Konsumen dan Inflasi Kota Kendari Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 28 Mar 2024",
        },
        {
         date: "28 MAR",
         judul_publikasi: "Pengeluaran Konsumsi Penduduk Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 28 Mar 2024",
        },
        {
         date: "4 APR",
         judul_publikasi: "Produk Domestik Regional Bruto Provinsi Sulawesi Tenggara Menurut Lapangan Usaha 2019- 2023",
         jadwal_rilis: "Jadwal Rilis 4 Apr 2024",
        },
        {
         date: "4 APR",
         judul_publikasi: "Produk Domestik Regional Bruto Provinsi Sulawesi Tenggara Menurut Pengeluaran 2019-2023",
         jadwal_rilis: "Jadwal Rilis 4 Apr 2024",
        },
        {
         date: "22 APR",
         judul_publikasi: "Keadaan Ketenagakerjaan Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 22 Apr 2024",
        },
        {
         date: "2 MEI",
         judul_publikasi: "Statistik Nilai Tukar Petani Provinsi Sulawesi Tenggara Triwulan I Tahun 2024",
         jadwal_rilis: "Jadwal Rilis 2 Mei 2024",
        },
        {
         date: "30 MEI",
         judul_publikasi: "Indeks Pembangunan Manusia Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 30 Mei 2024",
        },
        {
         date: "31 MEI",
         judul_publikasi: "Statistik Transportasi Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 31 Mei 2024",
        },
        {
         date: "1 JUL",
         judul_publikasi: "Statistik Harga Produsen Perdesaan Provinsi Sulawesi Tenggara 2021-2023",
         jadwal_rilis: "Jadwal Rilis 1 Jul 2024",
        },
        {
         date: "31 JUL",
         judul_publikasi: "Ekspor dan Impor Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 31 Jul 2024",
        },
        {
         date: "1 AGU",
         judul_publikasi: "Statistik Nilai Tukar Petani Provinsi Sulawesi Tenggara Triwulan II Tahun 2024",
         jadwal_rilis: "Jadwal Rilis 1 Agu 2024",
        },
        {
         date: "30 AGU",
         judul_publikasi: "Direktori Desa Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 30 Agu 2024",
        },
        {
         date: "30 AGU",
         judul_publikasi: "Statistik Harga Konsumen Perdesaan Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 30 Agu 2024",
        },
        {
         date: "26 SEP",
         judul_publikasi: "Statistik Daerah Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 26 Sep 2024",
        },
        {
         date: "2 OKT",
         judul_publikasi: "Statistik Produksi Tanaman Hortikultura Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 2 Okt 2024",
        },
        {
         date: "1 NOV",
         judul_publikasi: "Statistik Nilai Tukar Petani Provinsi Sulawesi Tenggara Triwulan III Tahun 2024",
         jadwal_rilis: "Jadwal Rilis 1 Nov 2024",
        },
        {
         date: "29 NOV",
         judul_publikasi: "Statistik Hotel dan Tingkat Penghunian Kamar Hotel Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 29 Nov 2024",
        },
        {
         date: "29 NOV",
         judul_publikasi: "Indikator Kesejahteraan Rakyat Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 29 Nov 2024",
        },
        {
         date: "29 NOV",
         judul_publikasi: "Statistik Politik dan Kemanan Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 29 Nov 2024",
        },
        {
         date: "6 DES",
         judul_publikasi: "Analisis Hasil Survei Kebutuhan Data BPS Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 6 Des 2024",
        },
        {
         date: "13 DES",
         judul_publikasi: "Statistik Kesejahteraan Rakyat Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 13 Des 2024",
        },
        {
         date: "13 DES",
         judul_publikasi: "Direktori Perusahaan Konstruksi Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 13 Des 2024",
        },
        {
         date: "27 DES",
         judul_publikasi: "Direktori Industri Besar dan Sedang Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 27 Des 2024",
        },
        {
         date: "27 DES",
         judul_publikasi: "Statistik Air Bersih Provinsi Sulawesi Tenggara 2023",
         jadwal_rilis: "Jadwal Rilis 27 Des 2024",
        },
        {
         date: "27 DES",
         judul_publikasi: "Statistik Industri Besar dan Sedang Provinsi Sulawesi Tenggara 2022",
         jadwal_rilis: "Jadwal Rilis 27 Des 2024",
        },
        {
         date: "30 DES",
         judul_publikasi: "Analisis Isu Terkini Provinsi Sulawesi Tenggara 2024",
         jadwal_rilis: "Jadwal Rilis 30 Des 2024",
        },
      
      
    
  ];

  return JSON.stringify(data);
}