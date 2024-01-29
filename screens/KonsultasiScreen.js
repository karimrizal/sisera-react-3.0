import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import { useFocus } from '../FocusContext';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const CoolViewLayout = () => {
  
  
  const isTimeInRange = () => {
    const currentUTCHour = new Date().getUTCHours() + 8;
    const currentUTCMinutes = new Date().getUTCMinutes();

    if ( new Date().getUTCDay() == 1) {
      return currentUTCHour >= 8 && (currentUTCHour <= 15 && currentUTCMinutes <= 59);
    }
    if ( new Date().getUTCDay() == 2) {
      return currentUTCHour >= 8 && (currentUTCHour <= 15 && currentUTCMinutes <= 59);
    }
    if ( new Date().getUTCDay() == 3) {
      return currentUTCHour >= 8 && (currentUTCHour <= 15 && currentUTCMinutes <= 59);
    }
    if ( new Date().getUTCDay() == 4) {
      return currentUTCHour >= 8 && (currentUTCHour <= 15 && currentUTCMinutes <= 59);
    }

    if (new Date().getUTCDay() === 5) { 
      return   (currentUTCHour > 8 && (currentUTCHour <= 16 && currentUTCMinutes <= 30));
    }

    return false;
  };
  console.log(isTimeInRange())
  const { isLainnyaFocused, setLainnyaFocused } = useFocus();
  const [isButtonDisabled, setButtonDisabled] = useState(isTimeInRange());


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
    const intervalId = setInterval(() => {
      setButtonDisabled(isTimeInRange());
    }, 2000); // Check every minute

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  
  const openWhatsAppChat = () => {
    Linking.openURL('https://api.whatsapp.com/send/?phone=6281231007474&text&type=phone_number&app_absent=0');
  };
  const openStarla = () => {
    Linking.openURL('https://sultradata.com/project/display-antrian/daftar');
  };
  const openReservasi = () => {
    Linking.openURL('https://forms.gle/YiQyFLPAyAXXUEGv8');
  };
  const openChatWeb = () => {
    Linking.openURL('https://webapps.bps.go.id/chat/index.php/idn/chat/startchat/(leaveamessage)/true/(theme)/2/(department)/451/(vid)/ba16aec99a9860c393a3/(er)/1?URLReferer=%2F%2Fsultra.bps.go.id%2F%23&tzuser=9');
  };

  const handlePress = (callback) => {
    if (isTimeInRange()) {
      callback();
    } else {
      
      alert('Sudah melewati jam pelayanan.');
    }
  };
  const chatWaImageSource = !isButtonDisabled
    ? require('../assets/chat-wa-gray.png')
    : require('../assets/chat-wa.png');

    const chatWebImageSource = !isButtonDisabled
    ? require('../assets/chat-web-gray.png')
    : require('../assets/chat-web.png');

    const starlaImageSource = !isButtonDisabled
    ? require('../assets/starla-gray.png')
    : require('../assets/starla.png');

    const reservasiImageSource = !isButtonDisabled
    ? require('../assets/luar-jam-gray.png')
    : require('../assets/luar-jam.png');
  

  return (
  
  <ScrollView>
  <View style={styles.body}>

    <View style={styles.container}>

      <Text style={styles.title}>
        Hari Kerja   
      </Text>
      <Text style={styles.explanationTextLayanan}>
        <Text style={{ fontFamily: 'DMSansBold' }}>Waktu Pelayanan:</Text>
        {'\n'}⏰ Senin - Kamis (08.00 - 16.00 WITA)
        {'\n'}⏰ Jumat (08.00 - 16.30 WITA)
      </Text>

      <View style={styles.itemBorder}>
      
      <View style={{ flexDirection: 'row', flex:1 }}>
      <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={() => handlePress(openWhatsAppChat)}
            disabled={!isButtonDisabled}>
      <Image source={chatWaImageSource} style={{ width: 54, height: 54 }} />
        </TouchableOpacity>
        
        <TouchableOpacity style={{ width: '75%',justifyContent: 'center', paddingLeft: '6%' }} onPress={() => handlePress(openWhatsAppChat)}
            disabled={!isButtonDisabled}>
          <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color: !isButtonDisabled ? 'gray' : '#0080e4' }}>Chat Whatsapp</Text>
            <Text style={{ fontSize: 12,marginTop: 5, color: !isButtonDisabled ? 'gray' : '#000' }}>
              Klik disini untuk chat lewat whatsapp
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={() => handlePress(openWhatsAppChat)}
            disabled={!isButtonDisabled}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemBorder}>
      <View style={{ flexDirection: 'row', flex:1 }}>

      <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={() => handlePress(openChatWeb)}
            disabled={!isButtonDisabled}>
      <Image source={chatWebImageSource} style={{ width: 54, height: 54 }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '75%',justifyContent: 'center', paddingLeft: '6%' }} onPress={() => handlePress(openChatWeb)}
            disabled={!isButtonDisabled}>
          <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color: !isButtonDisabled ? 'gray' : '#0080e4' }}>Chat Web</Text>
            <Text style={{ fontSize: 12,marginTop: 5, color: !isButtonDisabled ? 'gray' : '#000' }}>
              Klik disini untuk chat lewat web (sultra.bps.go.id)
            </Text>
        </TouchableOpacity> 

        <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={() => handlePress(openChatWeb)}
            disabled={!isButtonDisabled}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemBorder}>
      <View style={{ flexDirection: 'row', flex:1 }}>
      <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={() => handlePress(openStarla)}
            disabled={!isButtonDisabled}>
      <Image source={starlaImageSource} style={{ width: 54, height: 54 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '75%',justifyContent: 'center', paddingLeft: '6%' }} onPress={() => handlePress(openStarla)}
            disabled={!isButtonDisabled}>
          <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color: !isButtonDisabled ? 'gray' : '#0080e4' }}>Tatap Muka (Jam Kerja)</Text>
            <Text style={{ fontSize: 12,marginTop: 5, color: !isButtonDisabled ? 'gray' : '#000' }}>
              Klik untuk ambil antrian dan datang langsung di kantor BPS Sultra 
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={() => handlePress(openStarla)}
            disabled={!isButtonDisabled}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Di Luar Hari Kerja</Text>
      <Text style={styles.explanationTextLayanan}>
      <Text style={{ fontFamily: 'DMSansBold' }}>Waktu Pelayanan:</Text>
        {'\n'}⏰ Sabtu ( 10.00 - 12.00 WITA)
        </Text>

      <View style={styles.itemBorderLuar}>
      <View style={{ flexDirection: 'row', flex:1 }}>
      <TouchableOpacity style={{ width: '15%',  justifyContent: 'center' }} onPress={openReservasi}>
      <Image source={require('../assets/luar-jam.png')} style={{ width: 54, height: 54 }} />
        </TouchableOpacity>
      <TouchableOpacity style={{ width: '75%',justifyContent: 'center', paddingLeft: '6%' }} onPress={openReservasi}>
        <Text style={{ fontFamily: 'DMSansBold', fontSize: 16, color:  '#0080e4' }}>Tatap Muka (Luar Jam Kerja)</Text>
        <Text style={{ fontSize: 12,marginTop: 5, color: '#000' }}>
          Klik Untuk Reservasi
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '10%',  justifyContent: 'center' }} onPress={openReservasi}>
         <MaterialCommunityIcons name="chevron-right"  size={20} />
        </TouchableOpacity>

        </View>
      </View>


    </View>
  </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#1A8EEA',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'left',
    borderTopLeftRadius: 50,   
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop:40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
  },
  itemBorder: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
    borderWidth: 1,  
    borderColor: '#0080e4', 
  },
  itemBorderLuar: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
    borderWidth: 1,  
    borderColor: '#00b0c5', 
  },
  itemText: {
    fontFamily: 'DMSansBold',
    color: '#0080e4',
    fontSize: 16,
  },
  itemTextLuar: {
    fontFamily: 'DMSansBold',
    color: '#00b0c5',
    fontSize: 16,
  },
  explanationText: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
    
  },
  explanationTextLayanan: {
    
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default CoolViewLayout;