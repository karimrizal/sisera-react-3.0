import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocus } from '../FocusContext';
import { useFocusEffect } from '@react-navigation/native';

const CoolViewLayout = () => {

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

  const openWhatsAppChat = () => {
    Linking.openURL('https://api.whatsapp.com/send/?phone=6281231007474&text&type=phone_number&app_absent=0');
  };
  const openStarla = () => {
    Linking.openURL('https://sultradata.com/project/display-antrian/daftar');
  };
  const openChatWeb = () => {
    Linking.openURL('https://webapps.bps.go.id/chat/index.php/idn/chat/startchat/(leaveamessage)/true/(theme)/2/(department)/451/(vid)/ba16aec99a9860c393a3/(er)/1?URLReferer=%2F%2Fsultra.bps.go.id%2F%23&tzuser=9');
  };
  

  return (
    <View style={styles.container}>

<Text style={styles.title}>Pada Hari Kerja</Text>
<Text style={styles.explanationTextLayanan}>
        Waktu Pelayanan: {'\n'}Senin - Kamis ( 08.00 - 16.00 WITA) {'\n'}Jumat ( 08.00 - 16.30 WITA)
        </Text>


      <View style={{ flexDirection: 'row', flex:1, borderBottomWidth: 1 }}>
        <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={openWhatsAppChat}>
         <MaterialCommunityIcons name="whatsapp"  size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '60%',justifyContent: 'center' }} onPress={openWhatsAppChat}>
        <Text style={styles.itemTitle}>Chat WhatsApp</Text>
          <Text style={styles.date}>Klik disini untuk chat lewat WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center',justifyContent: 'center' }} onPress={openWhatsAppChat}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
   </View>

   <View style={{ flexDirection: 'row', borderBottomWidth: 1,flex:1,}}>
        <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={openChatWeb}>
         <MaterialCommunityIcons name="web"  size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '60%',justifyContent: 'center' }} onPress={openChatWeb}>
        <Text style={styles.itemTitle}>Chat Web</Text>
          <Text style={styles.date}>Klik disini untuk chat lewat Web</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center',justifyContent: 'center' }} onPress={openChatWeb}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
   </View>

   <View style={{ flexDirection: 'row', flex:1, borderBottomWidth: 1 }}>
        <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={openStarla}>
         <MaterialCommunityIcons name="star"  size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '60%',justifyContent: 'center' }} onPress={openStarla}>
        <Text style={styles.itemTitle}>Tatap Muka (Jam Kerja)</Text>
          <Text style={styles.date}>Klik untuk ambil antrian dan datang langsung di kantor BPS Sultra</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ width: '20%',  padding: 6, borderRadius: 8, alignItems: 'center',justifyContent: 'center' }} onPress={openStarla}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
   </View>


      <Text style={styles.title}>{'\n'}Diluar Hari Kerja</Text>
      <Text style={styles.explanationTextLayanan}>
        Waktu Pelayanan: {'\n'}Sabtu ( 10.00 - 12.00 WITA)
        </Text>

        <View style={{ flexDirection: 'row', flex:1 }}>
        <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={openWhatsAppChat}>
         <MaterialCommunityIcons name="book-check"  size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '60%',justifyContent: 'center' }} onPress={openWhatsAppChat}>
        <Text style={styles.itemTitle}>Tatap Muka (Luar Jam Kerja)</Text>
          <Text style={styles.date}>Klik Untuk Reservasi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ width: '10%',  padding: 6, borderRadius: 8, alignItems: 'center',justifyContent: 'center' }} onPress={openWhatsAppChat}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
   </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft : '8%',
    paddingRight : '4%',
    paddingTop : '4%',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'flex-start', // Align text to the left
  },
  itemText: {
    
    fontSize: 16,
  },
  explanationText: {
    
    fontSize: 12,
    marginTop: 5,
  },
  explanationTextLayanan: {
    
    fontSize: 12,
    marginTop: 5,
  },

  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CoolViewLayout;