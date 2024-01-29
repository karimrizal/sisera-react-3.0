import React from "react";
import { View, Button, Text } from "react-native";

export default function LainnyaScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Lainnya Screen</Text>
      <Button 
        title='Go back'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
