import React from "react";
import { Link, Stack } from "expo-router";
import styles from "../styles/main";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oups, wrong route" }}></Stack.Screen>
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to home screen
        </Link>
      </View>
    </>
  );
}
