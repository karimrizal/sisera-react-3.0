import React from "react";
import { View, Button, Text } from "react-native";

export default function BookmarkScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bookmark Screen</Text>
      <Button 
        title='Go back'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
