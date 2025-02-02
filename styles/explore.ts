import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { verticalUnits } from "../jmecheriis/ddunits";

export const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  exploreText: {
    width: "100%",
    textAlign: "center",
    paddingTop: "40%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontSize: 18,
    fontWeight: "300",
  },
  profilePicture: {
    width: 100,
    height: 100,
  },
  resultsSection: {
    flex: 1,
  },
  result: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  resultPFP: {
    height: verticalUnits(6),
    width: verticalUnits(6),
    marginRight: 10,
    borderRadius: 50,
  },
  resultName: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
  resultUsername: {
    color: "#C981EC",
  },
  resultInfo: {
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: "#FBF2FF",
    borderRadius: 30,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    color: "#7211A2",
    shadowColor: "#C981EC",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  button: {
    width: "32%",
  },
  topProfileButton: {
    width: "100%",
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 15,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});

