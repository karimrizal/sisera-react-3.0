import React, { useState, useEffect } from "react"; 
import { View,Platform, Image, Pressable, TouchableOpacity, Text, Linking,Dimensions } from "react-native";
import { Badge, BottomSheet, ListItem } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import PublikasiScreen from "./screens/PublikasiScreen";
import TabelScreen from "./screens/TabelScreen";
import BRSScreen from "./screens/BRSScreen";
import BeritaScreen from "./screens/BeritaScreen";
import SubjectScreen from "./screens/SubjectScreen";
import SearchScreen from "./screens/SearchScreen";
import InfografisScreen from "./screens/InfografisScreen";
import KonsultasiScreen from "./screens/KonsultasiScreen";
import NotifikasiScreen from "./screens/NotifikasiScreen";
import Syantik from "./screens/Syantik";
import SyantikScreen from "./screens/SyantikScreen";
import IndikatorScreen from "./screens/IndikatorScreen";
import LainnyaScreen from "./screens/LainnyaScreen";
import ARCScreen from "./screens/ARCScreen";
import BarIconActive_Beranda from './assets/icons/BarIconActive_Beranda'
import BarIconInactive_Beranda from './assets/icons/BarIconInactive_Beranda'
import BarIconActive_Publikasi from './assets/icons/BarIconActive_Publikasi'
import BarIconInactive_Publikasi from './assets/icons/BarIconInactive_Publikasi'
import BarIconActive_Tabel from './assets/icons/BarIconActive_Tabel'
import BarIconInactive_Tabel from './assets/icons/BarIconInactive_Tabel'
import BarIconActive_Infografis from './assets/icons/BarIconActive_Bookmark'
import BarIconInactive_Infografis from './assets/icons/BarIconInactive_Bookmark'
import BarIconActive_Lainnya from './assets/icons/BarIconActive_Lainnya'
import BarIconInactive_Lainnya from './assets/icons/BarIconInactive_Lainnya'
import PublikasiDetail from "./activity/PublikasiDetail";
import TabelDetail from "./activity/TabelDetail";
import BRSDetail from "./activity/BRSDetail";
import BeritaDetail from "./activity/BeritaDetail";
import SearchDetail from "./activity/SearchDetail";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocus } from './FocusContext';


const Tab = createBottomTabNavigator()

const Stack = createNativeStackNavigator()

// Create a custom tab bar button component
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </TouchableOpacity>
);

function LogoBPS() {
  return (
    <Image
      source={require('./assets/logoBPS.png')}
      style={
        { marginHorizontal: 10 }
      }
    />
  )
}


function RightHeader() {
  const navigation = useNavigation();
  const { badgeStatus } = useFocus();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: 10,
        marginHorizontal: 20
      }}
    >

{/* Middle header with text */}
<View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>SISERA BPS </Text>
      </View>


      <Pressable
        onPress={() => navigation.navigate('Notifikasi')}
        style={{
          flexDirection: 'row',
        }}
      >
        <Image source={require('./assets/Iconly_notification.png')} />
        {/* <Image source={require('./assets/number_badge.png')}/> */}
       <Badge status={badgeStatus} />
      </Pressable>

    </View>
  )
}



// function MainTabBar({state, descriptors, navigation}) {
//   return (
//     <View style = {{
//       flexDirection: "row",
//     }}>
//       {/* {state.routes.map((route, index) => )} */}
//     </View>
//   )
// }




const PublikasiStack = () => {
  return (
    <Stack.Navigator initialRouteName="PublikasiScreen">
      <Stack.Screen
        name="PublikasiScreen"
        component={PublikasiScreen}
        //options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}





const InfografisStack = () => {
  return (
    <Stack.Navigator initialRouteName="InfografisScreen">
      <Stack.Screen name="InfografisScreen" component={InfografisScreen} />
    </Stack.Navigator>
  )
}

const LainnyaStack = () => {
  return (
    <Stack.Navigator initialRouteName="LainnyaScreen">
      <Stack.Screen name="LainnyaScreen" component={LainnyaScreen} />
    </Stack.Navigator>
  )
}

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{
      flexDirection: "row",
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index

        const tabIcon = isFocused ? route.activeIcon : route.inactiveIcon

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.taBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            {isFocused ? route.params.activeIcon : route.params.inactiveIcon}
            <Text style={{
              color: isFocused ? 'black' : 'red'
            }}>
              {label}
            </Text>
          </TouchableOpacity>)
      })}
    </View>
  )
}

function StackPublikasi() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Publikasi " component={PublikasiScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Publikasi Detail" component={PublikasiDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    
  </Stack.Navigator>
  );
}

function StackHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Beranda " component={HomeScreen} options={{ headerShown: false,}} />
    <Stack.Screen name="Publikasi Detail" component={PublikasiDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Tabel Detail" component={TabelDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="BRS Detail" component={BRSDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }}   />
    <Stack.Screen name="Berita Detail" component={BeritaDetail}   />
    
  </Stack.Navigator>
  );
}

function StackNotifikasi() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifikasi " component={NotifikasiScreen} options={{ tabBarStyle: {
            height: 80,
            backgroundColor: '#F5FBFF',
            justifyContent: "center",
            alignItems: "center",
          },   headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}  }} />
    <Stack.Screen name="Publikasi Detail" component={PublikasiDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Tabel Detail" component={TabelDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="BRS Detail" component={BRSDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }}   />
    <Stack.Screen name="Berita Detail" component={BeritaDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }}   />
    
  </Stack.Navigator>
  );
}

function StackBRS() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="BRS " component={BRSScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="BRS Detail" component={BRSDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }}   />
    
  </Stack.Navigator>
  );
}

function StackBerita() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Berita " component={BeritaScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Berita Detail" component={BeritaDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    
  </Stack.Navigator>
  );
}

function StackLainnya() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Lainnya" component={LainnyaScreen} />

    
  </Stack.Navigator>
  );
}

function StackTabel() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Tabel " component={SubjectScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }}  />
    <Stack.Screen name="Tabel Subject" component={TabelScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Tabel Detail" component={TabelDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
  </Stack.Navigator>
  );
}

function StackSyantik() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Syantik " component={Syantik} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Tabel Syantik" component={SyantikScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    
  </Stack.Navigator>
  );
}

function StackSearch() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Search "
        component={SearchScreen}
        options={{  headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left"  size={30} />
          </TouchableOpacity>
        ),
          headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}
        }}
      />
    <Stack.Screen name="Search Detail" component={SearchDetail} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'} }} />
    <Stack.Screen name="Publikasi Detail" component={PublikasiDetail} options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <MaterialCommunityIcons name="arrow-left"  size={30} />
            </TouchableOpacity>
          ),
        }} />
    <Stack.Screen name="BRS Detail" component={BRSDetail} options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <MaterialCommunityIcons name="arrow-left"  size={30} />
            </TouchableOpacity>
          ),
        }} />
    <Stack.Screen name="Tabel Detail" component={TabelDetail} options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <MaterialCommunityIcons name="arrow-left"  size={30} />
            </TouchableOpacity>
          ),
        }} />
    
    <Stack.Screen name="Berita Detail" component={BeritaDetail} options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <MaterialCommunityIcons name="arrow-left"  size={30} />
            </TouchableOpacity>
          ),
        }} />
    
  </Stack.Navigator>
  );
}


export default function TabNavigator() {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const { isLainnyaFocused } = useFocus();

  const { width, height } = Dimensions.get('window');

const getDynamicFontSize = () => {
  if (width >= 1024){
    return width/46;
  }
  else{
    return 14;
  }
}
 
  const list = [
    { title: 'Infografis', onPress: () => { navigation.navigate('Infografis', { /* optional params */ });setIsVisible(false); } },
    { title: 'BRS', onPress: () => { navigation.navigate('BRS', { /* optional params */ });setIsVisible(false); } },
    { title: 'Berita', onPress: () => { navigation.navigate('Berita', { /* optional params */ });setIsVisible(false); } },
    
    { title: 'Jadwal Rilis', onPress: () => { navigation.navigate('Jadwal Rilis', { /* optional params */ });setIsVisible(false); } },
    { title: 'Konsultasi', onPress: () => { navigation.navigate('Konsultasi', { /* optional params */ });setIsVisible(false); } },
    { title: 'Syantik', onPress: () => { navigation.navigate('Syantik', { /* optional params */ });setIsVisible(false); } },
    {
      title: 'PPID',
      onPress: () => {
        Linking.openURL('https://ppid.bps.go.id/?mfd=7400');
        setIsVisible(false);
      },
    },
   
    {
      title: 'Survey Kepuasan Pelanggan',
      onPress: () => {
        Linking.openURL('https://sultradata.com/project/display-antrian/sisera');
        setIsVisible(false);
      },
    },
    {
      title: 'Standar dan Maklumat Pelayanan',
      onPress: () => {
        Linking.openURL('https://ppid.bps.go.id/app/konten/7400/Layanan-BPS.html#pills-1');
        setIsVisible(false);
      },
    },
    

    {
      title: 'Hasil Survey Kepuasan Masyarakat',
      onPress: () => {
        Linking.openURL('https://ppid.bps.go.id/app/konten/7400/Layanan-BPS.html#pills-8');
        setIsVisible(false);
      },
    },
    {
      title: 'Tutup',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
  if (Platform.OS === 'android') {
  return (
    
    
    <View style={{ flex: 1 }}>
      
      <Tab.Navigator 
        
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 100,
            backgroundColor: '#F5FBFF',
            justifyContent: "center",
            alignItems: "center",
          },
          
          
          tabBarLabel: ({ focused }) => {
            return focused
              ? <Text style={{
                fontFamily: 'DMSansBold',
                fontSize: getDynamicFontSize(),
                color: '#093C88',
                alignSelf: "center",
                justifyContent: "center",
                flex : 1,
              }}>{route.name}</Text>
              : <Text style={{
                fontFamily: 'DMSansRegular',
                fontSize: getDynamicFontSize(),
                color: '#093C88',
                alignSelf: "center",
                justifyContent: "center",
                flex :1,
                
              }}>{route.name}</Text>

          },
          
          
          
        })}
      >


      <Tab.Screen
        name="Beranda"
        component={StackHome}
        options={{
          headerShadowVisible: false,
          headerTitle: () => <LogoBPS />,
          
          headerRight: () => <RightHeader />,
          // tabBarStyle: { color: '#093C88', backgroundColor: '#e3ecfc' },
          headerTitleAlign :'left',
          tabBarIcon: ({focused, color}) => {
            return focused ? < BarIconActive_Beranda/> : <BarIconInactive_Beranda />
          },
        }}

      />

      <Tab.Screen name="Publikasi" 
      component={StackPublikasi} 
      options={{
        
        headerShown: false,
        
        tabBarIcon: ({focused, color}) => {
          return focused ? <BarIconActive_Publikasi /> : <BarIconInactive_Publikasi />    
        },
      }}
       />

<Tab.Screen
        name="Indikator Strategis"
        component={IndikatorScreen}
        options={{
          headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'},
          tabBarIcon: ({ color, size }) => (
            <View
             style={{
               position: "absolute",
               bottom: 0,
               height: 64,
               width: 64,
               borderRadius: 24,
               justifyContent: 'center',
               alignItems: 'center'
             }}
             >
              <Image source={require('./assets/sisera-button.png')} style={{ width: 64, height: 64 }} />
           </View>
         ),
         

        }}
      />
      
      <Tab.Screen
        name="Tabel"
        component={StackTabel}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return focused ? <BarIconActive_Tabel /> : <BarIconInactive_Tabel />
          }
        }}
      />


<Tab.Screen
  name="Lainnya"
  component={StackLainnya}
  options={({ route }) => ({
     
    tabBarIcon: ({ focused, color }) => {
      return  isLainnyaFocused ? <BarIconActive_Lainnya /> : <BarIconInactive_Lainnya />;
    },
    tabBarButton: (props) => (
      <CustomTabBarButton {...props}  onPress={() => setIsVisible(true)  }>
       
      </CustomTabBarButton>
    ),
  })}
  
/>
      
      

      
  <Stack.Screen name="Infografis" component={InfografisScreen} options={{ headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />    
 <Stack.Screen name="BRS" component={StackBRS} options={{ headerShown: false, tabBarButton: () => null }} />
 <Stack.Screen name="Berita" component={StackBerita} options={{ headerShown: false, tabBarButton: () => null }} />
 <Stack.Screen name="Konsultasi" component={KonsultasiScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} /> 
 <Stack.Screen name="Jadwal Rilis" component={ARCScreen} options={{ headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />
 <Stack.Screen name="Syantik" component={StackSyantik} options={{headerShown: false,  tabBarButton: () => null }} />
 <Stack.Screen name="Notifikasi" component={StackNotifikasi} options={{ headerShown: false, headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />
 <Stack.Screen name="Search" component={StackSearch} options={{headerShown: false,  tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />

 
 
      
    </Tab.Navigator>
    <BottomSheet modalProps={{}} isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {list.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={item.containerStyle}
            onPress={() => {
              item.onPress && item.onPress();
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  )
} else 
return (
    
    
  <View style={{ flex: 1 }}>
    
    <Tab.Navigator 
      
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 100,
          backgroundColor: '#F5FBFF',
          justifyContent: "center",
          alignItems: "center",
        },
        
        
        tabBarItemStyle: {
          height: 75
        },
        tabBarLabel: ({ focused }) => {
          return focused
            ? <Text style={{
              fontFamily: 'DMSansBold',
              fontSize: getDynamicFontSize(),
              color: '#093C88',
              alignSelf: "center",
              justifyContent: "center",
              flex : 1,
            }}>{route.name}</Text>
            : <Text style={{
              fontFamily: 'DMSansRegular',
              fontSize: getDynamicFontSize(),
              color: '#093C88',
              alignSelf: "center",
              justifyContent: "center",
              flex :1,
              
            }}>{route.name}</Text>

        },
        
        
        
      })}
    >


    <Tab.Screen
      name="Beranda"
      component={StackHome}
      options={{
        headerShadowVisible: false,
        headerTitle: () => <LogoBPS />,
        
        headerRight: () => <RightHeader />,
        // tabBarStyle: { color: '#093C88', backgroundColor: '#e3ecfc' },
        headerTitleAlign :'left',
        tabBarIcon: ({focused, color}) => {
          return focused ? < BarIconActive_Beranda/> : <BarIconInactive_Beranda />
        },
      }}

    />

    <Tab.Screen name="Publikasi" 
    component={StackPublikasi} 
    options={{
      
      headerShown: false,
      
      tabBarIcon: ({focused, color}) => {
        return focused ? <BarIconActive_Publikasi /> : <BarIconInactive_Publikasi />    
      },
    }}
     />

<Tab.Screen
      name="Indikator Strategis"
      component={IndikatorScreen}
      options={{
        headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'},
        tabBarIcon: ({ color, size }) => (
          <View
           style={{
             position: "absolute",
             bottom: 0,
             height: 64,
             width: 64,
             borderRadius: 24,
             justifyContent: 'center',
             alignItems: 'center'
           }}
           >
            <Image source={require('./assets/sisera-button.png')} style={{ width: 64, height: 64 }} />
         </View>
       ),
       

      }}
    />
    
    <Tab.Screen
      name="Tabel"
      component={StackTabel}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
          return focused ? <BarIconActive_Tabel /> : <BarIconInactive_Tabel />
        }
      }}
    />


<Tab.Screen
name="Lainnya"
component={StackLainnya}
options={({ route }) => ({
   
  tabBarIcon: ({ focused, color }) => {
    return  isLainnyaFocused ? <BarIconActive_Lainnya /> : <BarIconInactive_Lainnya />;
  },
  tabBarButton: (props) => (
    <CustomTabBarButton {...props}  onPress={() => setIsVisible(true)  }>
     
    </CustomTabBarButton>
  ),
})}

/>
    
    

    
<Stack.Screen name="Infografis" component={InfografisScreen} options={{ headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />    
<Stack.Screen name="BRS" component={StackBRS} options={{ headerShown: false, tabBarButton: () => null }} />
<Stack.Screen name="Berita" component={StackBerita} options={{ headerShown: false, tabBarButton: () => null }} />
<Stack.Screen name="Konsultasi" component={KonsultasiScreen} options={{  headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} /> 
<Stack.Screen name="Jadwal Rilis" component={ARCScreen} options={{ headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />
<Stack.Screen name="Syantik" component={StackSyantik} options={{headerShown: false,  tabBarButton: () => null }} />
<Stack.Screen name="Notifikasi" component={StackNotifikasi} options={{ headerShown: false, headerStyle: {backgroundColor: '#1A8EEA'}, headerTitleStyle: {color: '#fff'}, tabBarButton: () => null }} />
<Stack.Screen name="Search" component={StackSearch} options={{headerShown: false,  tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />



    
  </Tab.Navigator>
  <BottomSheet modalProps={{}} isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      {list.map((item, index) => (
        <ListItem
          key={index}
          containerStyle={item.containerStyle}
          onPress={() => {
            item.onPress && item.onPress();
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={item.titleStyle}>{item.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </View>
) }