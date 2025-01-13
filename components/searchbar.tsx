import React, { useState } from "react";
import {
  TextInput,
} from "react-native";
import { styles } from "../styles/explore";

export function SearchBar({ placeholder, onChangeText }) {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      onChangeText={(value) => {
        onChangeText(value);
      }}
      onFocus={() => setFocus(true)}
      placeholder={placeholder}
      style={[
        {
          color: "white",
          backgroundColor: focus ? "#C981EC" : "#FBF2FF",
          marginTop: "4%",
        },
        styles.searchBar,
      ]}
      selectionColor="#C981EC"
      placeholderTextColor={"#e3b5f7"}
      returnKeyType="search"
    />
  );
}

