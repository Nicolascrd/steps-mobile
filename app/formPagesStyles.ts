import { StyleSheet } from "react-native";

export const formPageStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.92)",
    height: "100%",
  },
  title: {
    color: "#FF912D",
    fontSize: 100,
    fontFamily: "Oswald-Bold",
    textAlign: "center",
    marginTop: 100,
  },
  formContainer: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  label: {
    color: "#EFE5DB",
    fontSize: 22,
    fontFamily: "Oswald-SemiBold",
  },
  labelMarginTop: {
    marginTop: 20,
  },
  input: {
    color: "#EFE5DB",
    fontSize: 18,
    fontFamily: "Oswald-SemiBold",
    borderColor: "#EFE5DB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 54,
    marginTop: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    color: "#141E2D",
    backgroundColor: "#FF912D",
    fontFamily: "Oswald-SemiBold",
    fontSize: 38,
    textAlign: "center",
    borderRadius: 5,
  },
  summaryText: {
    color: "#EFE5DB",
    fontSize: 18,
    fontFamily: "Oswald-SemiBold",
    marginTop: 10,
    textAlign: "center",
  },
});
