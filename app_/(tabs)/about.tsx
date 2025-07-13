import { Text, View } from "react-native";
import styles from "../../styles/main";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function AboutScreen() {
  const { token, isLoading } = useAuth();
  useEffect(() => {
    fetch("http://192.168.1.88:3333/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ at: "nico", password: "my password" }),
    })
      .then((res) =>
        res.json().then((value) => console.log("Hello response:", value))
      )
      .catch((error) => {
        console.error("Error fetching about data:", error);
      });
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      {isLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <Text style={styles.text}>
          {token ? `Token: ${token}` : "No token found"}
        </Text>
      )}
    </View>
  );
}
