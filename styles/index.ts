import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  post: {
    backgroundColor: "#ffffff",
    borderColor: "#C981EC",
    display: "flex",
    flexDirection: "row",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    fontFamily: "Roboto",
  },

  authorData: {
    display: "flex",
    flexDirection: "row",
  },

  postInfo: {
    width: "85%",
    fontFamily: "Roboto",
  },

  creationData: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    fontFamily: "Roboto",
  },

  authorName: {
    fontWeight: "700",
    color: "#000000",
    fontSize: 14,
    fontFamily: "Roboto",
    marginRight: "5%",
  },

  authorUsername: {
    color: "#9394a5",
  },

  timeElapsed: {
    color: "#9394a5",
  },

  bannerContainer: {
    shadowColor: "#0000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    backgroundColor: "#ffffff",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    paddingTop: "15%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",

    marginTop: "-13%",
    marginBottom: "5%",
  },

  bannerImage: {
    aspectRatio: 4,
    width: "60%",
    resizeMode: "contain",
  },

  headerImageContainerLeft: {
    width: "11%",
    aspectRatio: 1,
    resizeMode: "cover",
  },

  headerImageContainerRight: {
    width: "8%",
    aspectRatio: 1,
    resizeMode: "cover",
  },

  buttonText: {
    color: "#000000",
    fontSize: 16,
  },

  postContent: {
    width: "90%",
    marginTop: "2%",
    color: "#000",
    fontFamily: "sans-serif",
    fontSize: 14,
    lineHeight: 18,
  },

  featureImage: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },

  bottomSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },

  postImage: {
    width: "80%",
    borderRadius: 10,
  },

  volunteersNeeded: {
    color: "#9394a5",
  },

  rightButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icon: {
    fontSize: 18,
  },
  modalOverlay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    backgroundColor: "#fcfcfc",
    flex: 1,
    height: "80%",
    marginTop: "20%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#0000000",
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  modalView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  commentContainer: {
    flexDirection: "row",
    marginHorizontal: "3%",
    marginTop: "3%",
    borderRadius: 15,
    backgroundColor: "#fcfcfc",
    borderColor: "gray",
  },
  commentInput: {
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});

