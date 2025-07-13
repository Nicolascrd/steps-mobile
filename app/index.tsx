import { AuthProvider } from "@/contexts/AuthContext";
import LoginScreen from "./login";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="rgb(2, 3, 4)" />
      <LoginScreen></LoginScreen>
    </AuthProvider>
  );
}
