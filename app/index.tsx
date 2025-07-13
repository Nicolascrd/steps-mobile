import { AuthProvider } from "@/contexts/AuthContext";
import LoginScreen from "./login";
import { StatusBar } from "expo-status-bar";
import RegisterScreen from "./register";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="rgb(2, 3, 4)" />
      <RegisterScreen></RegisterScreen>
      <LoginScreen></LoginScreen>
    </AuthProvider>
  );
}
