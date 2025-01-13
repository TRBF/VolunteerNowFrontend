import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#FFFFFF",
  },

  mainView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  bgImage: {
    resizeMode: "contain",
    height: "30%",
    width: "80%",
    alignSelf: "center",
    marginTop: "5%",
    position: "absolute",
  },

  loginInfo: {
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    marginTop: "50%",
  },

  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 0,
    marginBottom: "5%",
    color: "rgba(114, 17, 162, .8)",
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

  viewSignUp: {
    paddingTop: "7%",
    alignItems: "center",
  },
  btnView: {
    backgroundColor: "white",
  },

  btnText: {
    color: "#7d4cb6",
    fontSize: 15,
  },

  textSignUp: {
    paddingTop: 30,
    fontSize: 15,
  },

  loginCard3D: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: "15%",
    borderRadius: 20,
    shadowColor: "#7211A2",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
  },

  button: {
    backgroundColor: "rgba(114, 17, 162, .8)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignSelf: "center",
    marginTop: "10%",
  },

  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  forgotPasswordText: {
    color: "#7d4cb6",
    fontSize: 14,
  },
});


