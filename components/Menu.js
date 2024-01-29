import { Button } from "@rneui/themed";
import React from "react";
import { View , Text, TouchableOpacity, Image, Pressable} from "react-native";
// import { Document } from "react-iconly";

export default function Menu(props) {
    console.log(props)
    return (
        <TouchableOpacity style={{
            backgroundColor: 'white',
            borderRadius: 16,
            borderColor: 'white',
            width: 75,
            height: 75,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        
        }}
            onPress={() => props.navigation.navigate(props.name)}
        >
            {props.menuIcon}
            <Text
                style = {{
                alignSelf: "center",
                fontFamily: "DMSans",
                fontSize: 12,
                lineHeight: 20,
                }}
            >{props.name}</Text>
        </TouchableOpacity>
    )
}