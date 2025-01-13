import { StyleSheet } from "react-native";
import { verticalUnits } from "../jmecheriis/ddunits";

export const styles = StyleSheet.create({
  header: {
    height: verticalUnits(6.9),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "6%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 30,
    color: "#9394a5",
  },
  settingsIcon: {
    fontSize: 22,
    //color: "#9394a5",
    color: "#ffffff",
  },
  coverImageContainer: {
    height: verticalUnits(33),
    width: "100%",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainSection: {
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: 20,
  },
  topSection: {
    alignItems: "center",
    marginTop: verticalUnits(-6),
  },
  eventImageContainer: {
    height: verticalUnits(16),
    aspectRatio: 1,
    borderRadius: 1000,
    overflow: "hidden",
    borderColor: "#ffffff",
    borderWidth: 4,
    marginBottom: verticalUnits(1),
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  titleAndAuthor: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "#C981EC",
  },
  infoSection: {
    marginTop: verticalUnits(4),
    marginBottom: verticalUnits(2),
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    //marginBottom: verticalUnits(5),
    //borderBottomWidth: 0.6,
    borderBottomColor: "gray",
    paddingBottom: "7%",
  },
  requirement: {
    color: "#333",
    fontSize: 14,
  },
  requirementV2: {
    color: "#C981EC",
    fontSize: 14,
    marginBottom: 10,
  },
  applyNowButton: {
    backgroundColor: "#C981EC",
    paddingVertical: verticalUnits(2),
    marginBottom: verticalUnits(2),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  applyNowButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  applyNowContainer: {
    width: "55%", // Set the width to be smaller
    height: "70%",
    alignSelf: "center", // Center the container within its parent
    paddingTop: 20, // Add padding to the top
    paddingBottom: 20,
  },
});
