import {
  getUnixTimeUTC,
  windowOverlap,
  getPreviousMidnightEpoch,
  getDay,
} from "@/helpers/time.helper";
import { HealthConnectStepRecord } from "./interfaces";
import { AggregatedDailyStepCount } from "../common";

/**
 * The steps coming from Health Connect must be filtered to keep only the ones
 * that are not already in the DB. Exept for the last DB log, which can still be modified.
 * @param records
 * @param lastDBLog
 */
export const filterRecord = (
  records: HealthConnectStepRecord[],
  lastDBLog: AggregatedDailyStepCount
): HealthConnectStepRecord[] => {
  return records.filter(
    (record) => getUnixTimeUTC(record.endTime) > lastDBLog.TZmidnight
  );
};

export const groupSteps = (
  records: HealthConnectStepRecord[],
  tz: string // create the type timezone
): AggregatedDailyStepCount[] => {
  if (!records.length || !tz.length) {
    return [];
  }

  let midnight = getPreviousMidnightEpoch(records[0].startTime, tz);
  const dailySteps: AggregatedDailyStepCount[] = initializeDailySteps(
    records[0].startTime,
    tz
  );

  let i = 0;
  while (i < records.length) {
    if (midnight !== dailySteps[dailySteps.length - 1].TZmidnight) {
      throw Error(
        `Midnight (${midnight}) should correspond to last daily steps midnight ${
          dailySteps[dailySteps.length - 1].TZmidnight
        }`
      );
    }

    const currentDay = dailySteps[dailySteps.length - 1];
    const overlap = windowOverlap(
      currentDay.TZmidnight,
      addDayWorthOfSeconds(currentDay.TZmidnight),
      getUnixTimeUTC(records[i].startTime),
      getUnixTimeUTC(records[i].endTime)
    );

    if (overlap === 1) {
      currentDay.count += Math.round(records[i].count);
      i++;
      continue;
    }

    if (overlap > 0) {
      currentDay.count += Math.round(overlap * records[i].count);
      midnight = addDayWorthOfSeconds(midnight);
      dailySteps.push(
        createNextDaySteps(
          midnight,
          tz,
          Math.round((1 - overlap) * records[i].count)
        )
      );
      i++;
      continue;
    }

    midnight = addDayWorthOfSeconds(midnight);
    dailySteps.push(createNextDaySteps(midnight, tz, 0));
  }

  return dailySteps;
};

const initializeDailySteps = (
  startTime: string,
  tz: string
): AggregatedDailyStepCount[] => {
  const TZmidnight = getPreviousMidnightEpoch(startTime, tz);
  return [
    {
      date: getDay(TZmidnight, tz),
      TZmidnight,
      count: 0,
    },
  ];
};

const createNextDaySteps = (
  midnight: number,
  tz: string,
  count: number = 0
): AggregatedDailyStepCount => ({
  date: getDay(midnight, tz),
  TZmidnight: midnight,
  count,
});

const addDayWorthOfSeconds = (epoch: number): number => epoch + 3600 * 24;
