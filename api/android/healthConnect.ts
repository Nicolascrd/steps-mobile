import { Platform } from "react-native";
import {
  initialize,
  readRecords,
  requestPermission,
} from "react-native-health-connect";

export const askPermissionToReadSteps = async () => {
  const isInitialized = await initialize();

  if (!isInitialized) {
    console.error("not initialized");
    return false;
  }

  // request permissions
  const grantedPermissions = await requestPermission([
    { accessType: "read", recordType: "Steps" },
  ]);
  return grantedPermissions
    .map((permission) => permission.recordType)
    .includes("Steps");
};

export const readData = async () => {
  const hasPermission = await askPermissionToReadSteps();
  if (!hasPermission) {
    return [];
  }
};

export const readSampleData = async () => {
  console.log("read sample data", Platform.OS, Platform.Version);
  // initialize the client
  const isInitialized = await initialize();

  if (!isInitialized) {
    console.error("not initialized");
  }

  // request permissions
  const grantedPermissions = await requestPermission([
    { accessType: "read", recordType: "Steps" },
  ]);

  // check if granted
  console.log(grantedPermissions);

  const { records } = await readRecords("Steps", {
    timeRangeFilter: {
      operator: "after",
      startTime: "2024-01-12T12:00:00.405Z",
    },
  });
  console.log("records", records);
  return records;
};
