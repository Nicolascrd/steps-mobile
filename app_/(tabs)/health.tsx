import { Text, View } from "react-native";
import styles from "../../styles/main";
import Button from "@/components/Button";

// eslint-disable-next-line import/no-unresolved
import { testFunction } from "@/api/mobile/healthDataConnect";
import { useCalendars } from "expo-localization";

export default function HealthScreen() {
  const TimeZoneExample = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Format current time as a string (e.g., "10:23:45 AM")
    const currentTimeString = currentDate.toLocaleTimeString();

    const calendars = useCalendars();

    console.log(calendars);

    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "white" }}>
          Current Time: {currentTimeString}
        </Text>
        <Text style={{ color: "white" }}>
          Time Zone: {calendars[0].timeZone}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Health screenssss</Text>
      <Button label="Get data" theme="primary" onPress={testFunction}></Button>
      {TimeZoneExample()}
    </View>
  );
}
