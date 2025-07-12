import { TZDate } from "@date-fns/tz";
import { format, parseISO } from "date-fns";

const getPreviousMidnight = (isoDate: string, timeZone: string): TZDate => {
  const date = parseISO(isoDate);
  const zonedDate = new TZDate(date, timeZone);
  zonedDate.setHours(0, 0, 0, 0); // Set to midnight
  return new TZDate(zonedDate, "UTC");
};

/**
 * In UTC timezone, return the previous local (timezone) midnight
 * @param isoDate ISO formatted date
 * @param timeZone
 * @returns ISO formatted date
 */
export const getPreviousMidnightFormatted = (
  isoDate: string,
  timeZone: string
): string => {
  const utcDate = getPreviousMidnight(isoDate, timeZone);
  return format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};

export const getPreviousMidnightEpoch = (
  isoDate: string,
  timeZone: string
): number => {
  const utcDate = getPreviousMidnight(isoDate, timeZone);
  return Math.round(utcDate.getTime() / 1000);
};

/**
 * Once we have the UTC midnight which defines the start of the day, we can get the day
 * @param isoDate
 * @param timeZone
 */
export const getDayLegacy = (isoDate: string, timeZone: string): string => {
  const date = new TZDate(isoDate, timeZone);
  return format(date, "yyyy-MM-dd");
};

export const getDay = (isoDate: number, timezone: string): string => {
  const date = new TZDate(isoDate * 1000, timezone);
  return format(date, "yyyy-MM-dd");
};

/**
 * TIME MUST BE UTC
 */
export const getUnixTimeUTC = (isoDate: string): number => {
  const date = new TZDate(isoDate, "UTC");
  return Math.round(date.getTime() / 1000);
};

/**
 * Return the proportion of the log which is contained in the window
 * @param windowStart
 * @param windowEnd
 * @param logStart
 * @param logEnd
 */
export const windowOverlap = (
  windowStart: number,
  windowEnd: number,
  logStart: number,
  logEnd: number
) => {
  if (logEnd < windowStart || logStart > windowEnd) {
    // log before of after the window
    return 0;
  }
  const overlapStart = Math.max(windowStart, logStart);
  const overlapEnd = Math.min(windowEnd, logEnd);

  if (overlapStart >= overlapEnd) {
    return 0;
  }

  const overlapDuration = overlapEnd - overlapStart;
  const logDuration = logEnd - logStart;

  return overlapDuration / logDuration;
};
