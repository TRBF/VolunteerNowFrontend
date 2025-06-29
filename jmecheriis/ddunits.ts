import { Dimensions } from "react-native";

export function verticalUnits(num: number) {
  const height = Dimensions.get("window").height;
  return (height / 100) * num;
}

export function horizontalUnits(num: number) {
  const width = Dimensions.get("window").width;
  return (width / 100) * num;
}

