import React, { useState } from "react";
import { View, Text } from "react-native";
import gdprText from "" 

export default function GDPRScreen() {

  async function init(){
    
  }

  const [text, setText] = useState("")

  return(
    <View>
      <Text>
        {text}
      </Text>      
    </View>
  );
}

