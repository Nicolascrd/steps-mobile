import { ImageBackground, ImageSource } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { formPageStyles } from "../styles/formPagesStyles";
import EnlistmentSummary from "@/components/EnlistmentSummary";
import { Stage } from "@/types/register.t";
import registerUser from "@/api/server/register";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,}$/;
const FULL_NAME_REGEX = /^[a-zA-Z\s]{3,}$/;
// eslint-disable-next-line no-useless-escape
const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}:;,.<>/?]{8,}$/;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const [logoBackground] = useState<ImageSource>(
    require("../assets/images/image.png")
  );
  const [stage, setStage] = useState<Stage>(Stage.email);
  const [email, setEmail] = useState("");
  const [at, setAt] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const emailError = !EMAIL_REGEX.test(email);
  const atError = !USERNAME_REGEX.test(at);
  const fullNameError = !FULL_NAME_REGEX.test(fullName);
  const passwordError = !PASSWORD_REGEX.test(password);

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
    await registerUser(email, at, fullName, password);
  };

  let formPart: JSX.Element | null = null;
  switch (stage) {
    case Stage.email:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Email</Text>
          <TextInput
            accessibilityRole="text"
            testID="email-input"
            onChangeText={setEmail}
            value={email}
            style={formPageStyles.input}
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setStage(Stage.at)}
              disabled={emailError}
            >
              <Text
                style={
                  emailError
                    ? formPageStyles.buttonTextDisabled
                    : formPageStyles.buttonText
                }
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case Stage.at:
      formPart = (
        <View style={formPageStyles.formContainer}>
          <Text style={formPageStyles.label}>Username</Text>
          <TextInput
            onChangeText={setAt}
            value={at}
            style={formPageStyles.input}
            testID="at-input"
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setStage(Stage.fullName)}
              disabled={atError}
            >
              <Text
                style={
                  atError
                    ? formPageStyles.buttonTextDisabled
                    : formPageStyles.buttonText
                }
              >
                Submit
              </Text>
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
            testID="full-name-input"
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setStage(Stage.password)}
              disabled={fullNameError}
            >
              <Text
                style={
                  fullNameError
                    ? formPageStyles.buttonTextDisabled
                    : formPageStyles.buttonText
                }
              >
                Submit
              </Text>
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
            testID="password-input"
            secureTextEntry
          />
          <View style={formPageStyles.buttonContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={submitRegistration}
              disabled={passwordError}
            >
              <Text
                style={
                  passwordError
                    ? formPageStyles.buttonTextDisabled
                    : formPageStyles.buttonText
                }
              >
                Submit
              </Text>
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
            goToStage={(newStage: Stage) => setStage(newStage)}
          ></EnlistmentSummary>
        )}
        {formPart}
      </ScrollView>
    </ImageBackground>
  );
}
