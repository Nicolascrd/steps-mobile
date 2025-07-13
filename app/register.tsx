import { ImageBackground, ImageSource } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { formPageStyles } from "./formPagesStyles";
import EnlistmentSummary from "@/components/EnlistmentSummary";
import { Stage } from "@/types/register.t";

export default function RegisterScreen() {
  const [logoBackground] = useState<ImageSource>(
    require("../assets/images/image.png")
  );
  const [stage, setStage] = useState<Stage>(Stage.email);
  const [email, setEmail] = useState("");
  const [at, setAt] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const submitRegistration = async () => {
    console.log(
      "Register button pressed with email:",
      email,
      "at:",
      at,
      "fullName:",
      fullName,
      "password:",
      password
    );
    try {
      // Simulate a registration API call
      console.log("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  let formPart: JSX.Element | null = null;
  switch (stage) {
    case Stage.email:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Email</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={formPageStyles.input}
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable onPress={() => setStage(Stage.at)}>
              <Text style={formPageStyles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case Stage.at:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>At</Text>
          <TextInput
            onChangeText={setAt}
            value={at}
            style={formPageStyles.input}
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable onPress={() => setStage(Stage.fullName)}>
              <Text style={formPageStyles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case Stage.fullName:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Full Name</Text>
          <TextInput
            onChangeText={setFullName}
            value={fullName}
            style={formPageStyles.input}
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable onPress={() => setStage(Stage.password)}>
              <Text style={formPageStyles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case Stage.password:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            style={formPageStyles.input}
            secureTextEntry
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable onPress={submitRegistration}>
              <Text style={formPageStyles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      );
  }

  return (
    <ImageBackground source={logoBackground}>
      <ScrollView style={formPageStyles.container}>
        <Text
          style={{
            ...formPageStyles.title,
            marginTop: stage === Stage.email ? 100 : 50,
          }}
        >
          Enroll
        </Text>
        {stage !== Stage.email && (
          <EnlistmentSummary
            fullName={fullName}
            username={at}
            email={email}
            stage={stage}
          ></EnlistmentSummary>
        )}
        {formPart}
      </ScrollView>
    </ImageBackground>
  );
}
