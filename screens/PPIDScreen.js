import React, { useEffect } from "react";
import { View, Button, Text, Linking } from "react-native";

export default function PPIDScreen({ navigation }) {
  // useEffect is used to open the URL when the component mounts
  useEffect(() => {
    openGoogle();
  }, []);

  const openGoogle = () => {
    // Open the Google website in the device's default browser
    Linking.openURL('https://www.google.com');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PPID Screen</Text>
      <Button 
        title='Go back'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}