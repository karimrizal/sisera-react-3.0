// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'
import { Badge } from '@rneui/themed';
import Search from './components/Search';
import { useFonts } from 'expo-font';
import TabNavigator from './Tabs2';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import LoadingScreen from './screens/LoadingScreen';

import { createStackNavigator } from '@react-navigation/stack';
import PublikasiScreen from "./screens/PublikasiScreen";
import PublikasiDetail from "./activity/PublikasiDetail";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BookmarkProvider } from './BookmarkContext';
import { WilayahProvider } from './WilayahContext';
import { FocusProvider } from './FocusContext';
import { useNavigation } from '@react-navigation/native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useState, useRef } from 'react';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function LogoBPS() {
  return (
    <Image 
      source={require('./assets/logoBPS.png')}
    />
  )
}

function RightHeader() {
  return (
    <View
      style = {{
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end"
      }}
    >

      <Pressable 
        onPress={() => alert('Language setting clicked!')}
        style={{
          flexDirection: 'row',
          paddingLeft: '50px',
          paddingRight: '50px'
        }}
      >
        <Image source={require('./assets/Iconly.png')}/>
        {/* <Image source={require('./assets/language_badge.png')}/> */}
        <Badge value='ID' status='success'/>
      </Pressable>

      <Pressable 
        onPress={() => alert('Notification clicked!')}
        style={{
          flexDirection: 'row',
        }}
      >
        <Image source={require('./assets/Iconly_notification.png')}/>
        {/* <Image source={require('./assets/number_badge.png')}/> */}
        <Badge value='99' status='error'/>
      </Pressable>

    </View>
  )
}

// function DetailsScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button 
//         title='Go back'
//         onPress={() => navigation.goBack()}
//       />
//     </View>
//   );
// }


//push notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  

  if (Device.isDevice) {
  
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

function App() {

  const [fontsLoaded] = useFonts({
    "DMSans": require("./assets/fonts/DMSans.ttf"),
    "DMSansRegular": require("./assets/fonts/DMSansRegular.ttf"),
    "DMSansBold": require("./assets/fonts/DMSansBold.ttf")
  })

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigationRef = useRef(null);
  
  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()

    //push notifications
    // AAAAHCzuHrE:APA91bExmjp4ZkOaBhAT9eOrjNxTYdQ0VtQWiGFB0v1qCiWHy01B618FhmXc9PZhucHbuN1y6XUp2kNPEVT5DnZalZPjAgIqiokfXQeA6y6trN42FoejE2lZVHdTGtbMoHedfszuwn30
    

    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      let data = {
        expo_token : token,
        device_detail : Device.modelName
      }
      console.log("sultradata", data);
      fetch("https://sultradata.com/project/sisera2024/api-view.php/records/device", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Save Sultradata Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      if (navigationRef.current) {
        
    
        // Wait for the reset to 'Beranda' navigation to complete and then navigate to 'Notifikasi'
        setTimeout(() => {
          navigationRef.current.dispatch(
            CommonActions.navigate({
              name: 'Notifikasi',
            })
          );
        }, 1000);
      }
    });

    

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };




  }, []);

  if(!fontsLoaded){
    return <LoadingScreen/>
  } else {
    SplashScreen.hideAsync()
  }

  return (

<BottomSheetModalProvider>
<NavigationContainer ref={navigationRef}>
    <WilayahProvider>
    <BookmarkProvider>
    <FocusProvider>
      <TabNavigator />
      </FocusProvider>
      </BookmarkProvider>
      
      </WilayahProvider>
    </NavigationContainer>
    </BottomSheetModalProvider>
   
  )
}


export default App;