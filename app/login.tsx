import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ImageBackground, ImageSource } from "expo-image";
import { formPageStyles } from "../styles/formPagesStyles";

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
      <ScrollView style={formPageStyles.container}>
        <Text style={formPageStyles.title}>Log In</Text>
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Email</Text>
          <TextInput
            onChangeText={onChangeEmail}
            value={email}
            style={formPageStyles.input}
          />
          <Text style={[formPageStyles.label, formPageStyles.labelMarginTop]}>
            Password
          </Text>
          <TextInput
            onChangeText={onChangePassword}
            value={password}
            style={formPageStyles.input}
            secureTextEntry={true}
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable onPress={loginButton}>
              <Text style={formPageStyles.buttonText}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
