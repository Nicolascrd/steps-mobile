import { Stage } from "@/types/register.t";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function EnlistmentSummary({
  fullName,
  username,
  email,
  stage,
  goToStage,
}: {
  fullName: string;
  username: string;
  email: string;
  stage: Stage;
  goToStage: (stage: Stage) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RECRUIT PROFILE</Text>

      {stage > Stage.email && (
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() => goToStage(Stage.email)}
            >
              <Text style={styles.value}>{email}</Text>
              <Feather
                name="edit-3"
                size={14}
                style={{ marginTop: 3, color: "#FF912D" }}
              ></Feather>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {stage > Stage.at && (
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Username:</Text>
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() => goToStage(Stage.at)}
            >
              <Text style={styles.value}>{username}</Text>
              <Feather
                name="edit-3"
                size={14}
                style={{ marginTop: 3, color: "#FF912D" }}
              ></Feather>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {stage > Stage.fullName && (
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name:</Text>
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() => goToStage(Stage.fullName)}
            >
              <Text style={styles.value}>{fullName}</Text>
              <Feather
                name="edit-3"
                size={14}
                style={{ marginTop: 3, color: "#FF912D" }}
              ></Feather>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141E2D",
    borderWidth: 2,
    borderColor: "#FF912D",
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  header: {
    color: "#EFE5DB",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FF912D",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    color: "#FF912D",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: 14,
  },
  value: {
    color: "#EFE5DB",
    fontFamily: "monospace",
    fontSize: 14,
    paddingRight: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#FF912D",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#141E2D",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
