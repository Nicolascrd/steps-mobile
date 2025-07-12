import {
  processHealthDataIntoDailySteps,
  sanitizeHealthConnectData,
  selectHealthConnectRecords,
} from "@/healthDataProcessing/processData";
import { readSampleData } from "../android/healthConnect";
import { getCalendars } from "expo-localization";

export const uploadHealthConnectDataToDB = async () => {
  try {
    // read timezone
    const tz = getCalendars()[0].timeZone!;

    const records = await readSampleData();
    const sanitizedRecords = sanitizeHealthConnectData(records);

    const selectedRecords = selectHealthConnectRecords(sanitizedRecords);
    const dailySteps = processHealthDataIntoDailySteps(
      selectedRecords,
      tz
      //lastDBLog
    );
    console.log(dailySteps);
  } catch (e) {
    console.error("couldn't upload steps", e);
  }
};
