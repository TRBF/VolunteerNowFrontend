import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#FFFFFF",
  },

  mainView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: "3%",
    paddingVertical: "5%",
  },
  registerText: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 50,
    color: 'rgba(114, 17, 162, .8)',
  },

  inputView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingVertical: "5%",
    borderRadius: 20, 
    shadowColor: '#7211A2', 
    shadowOffset: {
      width: 0,
      height: 20, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
    elevation: 10, 
  },

  inputText: {
    marginTop: "8%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  nameView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },

  nameText: {
    marginTop: "5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "40%",
    alignSelf: "center",
    padding: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 8,
  },

  genderAgeView: {
    marginTop: "5%",
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  dropdown: {
    height: 50,
    width: 150,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },

  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  redirectView: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: "20%"
  },

  btnSubmitText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  btnLogin: {
    paddingTop: 20,
    fontSize: 15,
    color: "#7d4cb6",
  },
  button: {
    backgroundColor: 'rgba(114, 17, 162, .8)',
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: "10%", 
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    width: "40%"
  },
});
