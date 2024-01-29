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

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{
//             headerShadowVisible: false,
//             headerStyle: {
//               backgroundColor: '#fff',
//               flexDirection: 'row',
//               alignContent: 'space-between'
//             },
//             headerTitle: (props) => <LogoBPS {...props}/>,
//             headerRight: () => <RightHeader />
//             }} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



function App() {

  const [fontsLoaded] = useFonts({
    "DMSans": require("./assets/fonts/DMSans.ttf"),
    "DMSansRegular": require("./assets/fonts/DMSansRegular.ttf"),
    "DMSansBold": require("./assets/fonts/DMSansBold.ttf")
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      // Add a delay (e.g., 2000 milliseconds) before hiding the splash screen
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (

<BottomSheetModalProvider>
    <NavigationContainer>
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