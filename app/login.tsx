import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ImageBackground, ImageSource } from "expo-image";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [logoBackground] = useState<ImageSource>(
    require("../assets/images/image.png")
  );

  const loginButton = async () => {
    console.log(
      "Login button pressed with email:",
      email,
      "and password:",
      password
    );
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <ImageBackground source={logoBackground}>
      <ScrollView style={localStyles.container}>
        <Text style={localStyles.title}>Log In</Text>
        <View style={localStyles.formContainer}>
          <Text style={localStyles.label}>Email</Text>
          <TextInput
            onChangeText={onChangeEmail}
            value={email}
            style={localStyles.input}
          />
          <Text style={[localStyles.label, localStyles.labelMarginTop]}>
            Password
          </Text>
          <TextInput
            onChangeText={onChangePassword}
            value={password}
            style={localStyles.input}
            secureTextEntry={true}
          />
          <View style={localStyles.buttonContainer}>
            <Pressable onPress={loginButton}>
              <Text style={localStyles.buttonText}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.9)",
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
});
