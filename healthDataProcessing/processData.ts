import { RecordResult } from "react-native-health-connect";
import { filterRecord, groupSteps } from "./groupSteps";
import { HealthConnectStepRecord } from "./interfaces";
import { AggregatedDailyStepCount } from "../common";

const GOOGLE = "com.google.android.apps.fitness";
const SAMSUNG = "com.sec.android.app.shealth";

/**
 * Select the Health Connect records from the right provider
 * By default, Samsung, then Google, otherwise, the one available
 * TODO : modify to allow the user to select the provider / maybe use array is the provider dataOrigin can change
 * @param records
 */
export const selectHealthConnectRecords = (
  records: HealthConnectStepRecord[]
): HealthConnectStepRecord[] => {
  if (!records.length) {
    return [];
  }
  const providerToRecords = new Map<string, HealthConnectStepRecord[]>();
  records.forEach((record) => {
    const provider = record.metadata.dataOrigin;
    if (!providerToRecords.has(provider)) {
      providerToRecords.set(provider, []);
    }
    providerToRecords.get(provider)?.push(record);
  });
  if (providerToRecords.has(SAMSUNG)) {
    return providerToRecords.get(SAMSUNG) || [];
  }
  if (providerToRecords.has(GOOGLE)) {
    return providerToRecords.get(GOOGLE) || [];
  }
  // If no provider is found, return the first one
  const firstProvider = Array.from(providerToRecords.keys())[0];
  return providerToRecords.get(firstProvider) || [];
};

/**
 * Take the Health Connect records and the last DB log and return the daily steps to post to DB
 * @param records
 * @param lastDBLog
 * @param tz
 * @returns DailySteps[] from the last DB log (included) to last record
 */
export const processHealthDataIntoDailySteps = (
  records: HealthConnectStepRecord[],
  tz: string,
  lastDBLog?: AggregatedDailyStepCount
): AggregatedDailyStepCount[] => {
  if (!records.length) {
    return [];
  }
  if (!lastDBLog) {
    return groupSteps(records, tz);
  }

  const filteredRecords = filterRecord(records, lastDBLog);
  const groupedRecords = groupSteps(filteredRecords, tz);

  return groupedRecords;
};

export const sanitizeHealthConnectData = (
  records: RecordResult<"Steps">[]
): HealthConnectStepRecord[] => {
  try {
    return records.map((record) => ({
      count: (record as any).count,
      startTime: (record as any).startTime,
      endTime: (record as any).endTime,
      metadata: {
        clientRecordId: (record as any).metadata.clientRecordId,
        clientRecordVersion: (record as any).metadata.clientRecordVersion,
        dataOrigin: (record as any).metadata.dataOrigin,
        device: (record as any).metadata.device,
        id: (record as any).metadata.id,
        lastModifiedTime: (record as any).metadata.lastModifiedTime,
        recordingMethod: (record as any).metadata.recordingMethod,
      },
    }));
  } catch (error) {
    console.error("Error sanitizing Health Connect data", error);
    throw new Error("Invalid Health Connect data");
  }
};
