import { StyleSheet } from "react-native";
import { verticalUnits } from "../jmecheriis/ddunits";

export const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    paddingHorizontal: "1%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: verticalUnits(8),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 30,
  },
  calloutSection: {
    display: "flex",
    flexDirection: "row",
    width: "94%",
    paddingHorizontal: "3%",
    paddingVertical: verticalUnits(1.5),
    marginTop: verticalUnits(1),
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    borderRadius: 10,
    marginRight: "5%",
    marginBottom: "12%",
  },
  calloutName: {
    color: "#000000",
  },
  calloutUsername: {
    color: "#9394a5",
  },
  calloutDate: {
    color: "#9394a5",
    fontSize: 12,
    //marginLeft: "5%",
    width: "80%",
    textAlign: "center",
  },
  calloutDescription: {
    color: "#000000",
  },
  calloutIdentifiers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "2%",
  },
});
