import { AggregatedDailyStepCount } from "../../common";
import googleEstStepsMock from "../../mocks/android/stepsUpload_EST_google.json";
import samsungEstStepsMock from "../../mocks/android/stepsUpload_EST_samsung.json";
import googleStepsMock from "../../mocks/android/stepsUpload_google.json";
import samsungStepsMock from "../../mocks/android/stepsUpload_samsung.json";
import { filterRecord, groupSteps } from "../groupSteps";

describe("filterRecord", () => {
  describe("google data", () => {
    it("should filter out records which are irrelevant, last db date is first record", () => {
      // irrelevant = before the last DB record, which is the only modifiable one
      const lastDBLog: AggregatedDailyStepCount = {
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      };
      const filteredRecords = filterRecord(googleStepsMock, lastDBLog);
      expect(filteredRecords.length).toBe(googleStepsMock.length);
    });

    it("should filter out records which are irrelevant", () => {
      // irrelevant = before the last DB record, which is the only modifiable one
      const lastDBLog: AggregatedDailyStepCount = {
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 10748,
      };
      const filteredRecords = filterRecord(googleStepsMock, lastDBLog);
      expect(filteredRecords.length).toBe(googleStepsMock.length - 29);
      expect(filteredRecords[0]).toEqual({
        count: 8073,
        endTime: "2025-01-11T17:01:38.623Z",
        metadata: {
          clientRecordId: null,
          clientRecordVersion: 0,
          dataOrigin: "com.google.android.apps.fitness",
          device: "object unknown",
          id: "86823e2c-b138-4786-b264-be936c7e3e48",
          lastModifiedTime: "2025-01-12T13:00:31.583Z",
          recordingMethod: 0,
        },
        startTime: "2025-01-10T23:00:00Z",
      });
    });

    it("should filter out records which are irrelevant", () => {
      const lastDBLog: AggregatedDailyStepCount = {
        date: "2025-03-15",
        TZmidnight: 1742018400, // "2025-03-15T06:00:00.000Z", // GMT-6
        count: 999,
      };
      const filteredRecords = filterRecord(googleEstStepsMock, lastDBLog);
      expect(filteredRecords.length).toBe(googleEstStepsMock.length - 283);
      expect(filteredRecords[0]).toEqual({
        count: 2297,
        endTime: "2025-03-15T17:23:27.094Z",
        metadata: {
          clientRecordId: null,
          clientRecordVersion: 0,
          dataOrigin: "com.google.android.apps.fitness",
          device: "unknown device",
          id: "b8ff4a9f-7472-4d1e-9c69-02263c08921d",
          lastModifiedTime: "2025-04-10T17:00:36.754Z",
          recordingMethod: 0,
        },
        startTime: "2025-03-15T04:00:00Z",
      });
    });
  });

  describe("samsung data", () => {
    it("should filter out records which are irrelevant, last db date is first record", () => {
      const lastDBLog: AggregatedDailyStepCount = {
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      };
      const filteredRecords = filterRecord(samsungStepsMock, lastDBLog);
      expect(filteredRecords.length).toBe(samsungStepsMock.length);
    });

    it("should filter out records which are irrelevant", () => {
      const lastDBLog: AggregatedDailyStepCount = {
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 10748,
      };
      const filteredRecords = filterRecord(samsungStepsMock, lastDBLog);
      expect(filteredRecords.length).toBe(samsungStepsMock.length - 13);
      expect(filteredRecords[0]).toEqual({
        count: 10748,
        endTime: "2025-01-11T22:59:59.999Z",
        metadata: {
          clientRecordId: null,
          clientRecordVersion: 0,
          dataOrigin: "com.sec.android.app.shealth",
          device: "object unknown",
          id: "0f01cbb1-680a-43b9-af5e-ab95d00521b5",
          lastModifiedTime: "2025-01-11T22:51:45.710Z",
          recordingMethod: 0,
        },
        startTime: "2025-01-10T23:00:00Z",
      });
    });
  });
});
describe("groupSteps", () => {
  describe("samsung data", () => {
    it("should group steps correctly with samsung entries", () => {
      const result = groupSteps(samsungStepsMock, "+01:00");
      expect(result).toBeDefined();
      expect(result.length).toBe(78);
      expect(result[0]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      });
      expect(result[1]).toEqual({
        date: "2024-12-30",
        TZmidnight: 1735513200, // "2024-12-29T23:00:00.000Z",
        count: 4035,
      });
      expect(result[12]).toEqual({
        date: "2025-01-10",
        TZmidnight: 1736463600, // "2025-01-09T23:00:00.000Z",
        count: 11637,
      });
      expect(result[13]).toEqual({
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 10748,
      });
      expect(result[14]).toEqual({
        date: "2025-01-12",
        TZmidnight: 1736636400, // "2025-01-11T23:00:00.000Z",
        count: 162,
      });
      expect(result[77]).toEqual({
        date: "2025-03-16",
        TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
        count: 18382,
      });
    });

    it("should group steps correctly with samsung entries with gap", () => {
      const result = groupSteps(
        [...samsungStepsMock.slice(0, 13), ...samsungStepsMock.slice(14)],
        "+01:00"
      );
      expect(result).toBeDefined();
      expect(result.length).toBe(samsungStepsMock.length);
      expect(result[0]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      });
      expect(result[1]).toEqual({
        date: "2024-12-30",
        TZmidnight: 1735513200, // "2024-12-29T23:00:00.000Z",
        count: 4035,
      });
      expect(result[12]).toEqual({
        date: "2025-01-10",
        TZmidnight: 1736463600, // "2025-01-09T23:00:00.000Z",
        count: 11637,
      });
      expect(result[13]).toEqual({
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 0,
      });
      expect(result[14]).toEqual({
        date: "2025-01-12",
        TZmidnight: 1736636400, // "2025-01-11T23:00:00.000Z",
        count: 162,
      });
      expect(result[77]).toEqual({
        date: "2025-03-16",
        TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
        count: 18382,
      });
    });

    it("should group steps correctly with samsung entries with TZ change", () => {
      const result = groupSteps(samsungEstStepsMock, "-04:00");
      expect(result).toBeDefined();
      expect(result.length).toBe(105);
      expect(result[0]).toEqual({
        date: "2024-12-28",
        TZmidnight: 1735358400, // "2024-12-28T04:00:00.000Z",
        count: 986, // 5/24 * 4733
      });
      expect(result[1]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735444800, // "2024-12-29T04:00:00.000Z",
        count: 4588, // 19/24 * 4733 + 5/24 * 4035
      });
      expect(result[13]).toEqual({
        date: "2025-01-10",
        TZmidnight: 1736481600, // "2025-01-10T04:00:00.000Z",
        count: 11452, // 19/24 * 11637 + 5/24 * 10748
      });
      expect(result[73]).toEqual({
        date: "2025-03-11",
        TZmidnight: 1741665600, // "2025-03-11T04:00:00.000Z",
        count: 2656,
      });
      expect(result[74]).toEqual({
        date: "2025-03-12",
        TZmidnight: 1741752000, // "2025-03-12T04:00:00.000Z",
        count: 3266, // 19/24*4126 + 0
      });
      expect(result[75]).toEqual({
        date: "2025-03-13",
        TZmidnight: 1741838400, // "2025-03-13T04:00:00.000Z",
        count: 8844, // TZ aligned again
      });
      expect(result[104]).toEqual({
        date: "2025-04-11",
        TZmidnight: 1744344000, // "2025-04-11T04:00:00.000Z",
        count: 4775,
      });
    });
  });

  describe("google data", () => {
    it("should group steps correctly with google entries", () => {
      const result = groupSteps(googleStepsMock, "+01:00");
      expect(result).toBeDefined();
      expect(result[0]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      });
      expect(result[1]).toEqual({
        date: "2024-12-30",
        TZmidnight: 1735513200, // "2024-12-29T23:00:00.000Z",
        count: 4035,
      });
      expect(result[13]).toEqual({
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 10748,
      });
      expect(result[33]).toEqual({
        date: "2025-01-31",
        TZmidnight: 1738278000, // "2025-01-30T23:00:00.000Z",
        count: 4876,
      });
      expect(result[34]).toEqual({
        date: "2025-02-01",
        TZmidnight: 1738364400, //"2025-01-31T23:00:00.000Z",
        count: 6100,
      });
      expect(result[35]).toEqual({
        date: "2025-02-02",
        TZmidnight: 1738450800, //  "2025-02-01T23:00:00.000Z",
        count: 1217,
      });
      expect(result[36]).toEqual({
        date: "2025-02-03",
        TZmidnight: 1738537200, //"2025-02-02T23:00:00.000Z",
        count: 5241,
      });
      expect(result[37]).toEqual({
        date: "2025-02-04",
        TZmidnight: 1738623600, // "2025-02-03T23:00:00.000Z",
        count: 11601,
      });
      expect(result[38]).toEqual({
        date: "2025-02-05",
        TZmidnight: 1738710000, // "2025-02-04T23:00:00.000Z",
        count: 6665,
      });
      expect(result[39]).toEqual({
        date: "2025-02-06",
        TZmidnight: 1738796400, // "2025-02-05T23:00:00.000Z",
        count: 1878,
      });
      expect(result[77]).toEqual({
        date: "2025-03-16",
        TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
        count: 15033,
      });
    });
    it("should group steps correctly with google entries with gap", () => {
      const result = groupSteps(
        [...googleStepsMock.slice(0, 98), ...googleStepsMock.slice(112)],
        "+01:00"
      );
      expect(result).toBeDefined();
      expect(result[0]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
        count: 4733,
      });
      expect(result[1]).toEqual({
        date: "2024-12-30",
        TZmidnight: 1735513200, // "2024-12-29T23:00:00.000Z",
        count: 4035,
      });
      expect(result[13]).toEqual({
        date: "2025-01-11",
        TZmidnight: 1736550000, // "2025-01-10T23:00:00.000Z",
        count: 10748,
      });
      expect(result[33]).toEqual({
        date: "2025-01-31",
        TZmidnight: 1738278000, //  "2025-01-30T23:00:00.000Z",
        count: 4876,
      });
      expect(result[34]).toEqual({
        date: "2025-02-01",
        TZmidnight: 1738364400, // "2025-01-31T23:00:00.000Z",
        count: 0,
      });
      expect(result[35]).toEqual({
        date: "2025-02-02",
        TZmidnight: 1738450800, // "2025-02-01T23:00:00.000Z",
        count: 0,
      });
      expect(result[36]).toEqual({
        date: "2025-02-03",
        TZmidnight: 1738537200, //  "2025-02-02T23:00:00.000Z",
        count: 0,
      });
      expect(result[37]).toEqual({
        date: "2025-02-04",
        TZmidnight: 1738623600, // "2025-02-03T23:00:00.000Z",
        count: 0,
      });
      expect(result[38]).toEqual({
        date: "2025-02-05",
        TZmidnight: 1738710000, // "2025-02-04T23:00:00.000Z",
        count: 1504,
      });
      expect(result[39]).toEqual({
        date: "2025-02-06",
        TZmidnight: 1738796400, // "2025-02-05T23:00:00.000Z",
        count: 1878,
      });
      expect(result[77]).toEqual({
        date: "2025-03-16",
        TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
        count: 15033,
      });
    });
    it("should group steps correctly with google entries with TZ change", () => {
      const result = groupSteps(googleEstStepsMock, "-04:00");
      expect(result.length).toBe(105);
      expect(result[0]).toEqual({
        date: "2024-12-28",
        TZmidnight: 1735358400, // "2024-12-28T04:00:00.000Z",
        count: 986, // 5/24 * 4733
      });
      expect(result[1]).toEqual({
        date: "2024-12-29",
        TZmidnight: 1735444800, //"2024-12-29T04:00:00.000Z",
        count: 4588, // 19/24 * 4733 + 5/24 * 4035
      });
      expect(result[13]).toEqual({
        date: "2025-01-10",
        TZmidnight: 1736481600, // "2025-01-10T04:00:00.000Z",
        count: 11452, // 19/24 * 11637 + 5/24 * 10748
      });
      expect(result[73]).toEqual({
        date: "2025-03-11",
        TZmidnight: 1741665600, //"2025-03-11T04:00:00.000Z",
        count: 1795,
      });
      expect(result[74]).toEqual({
        date: "2025-03-12",
        TZmidnight: 1741752000, // "2025-03-12T04:00:00.000Z",
        count: 3266, // 19/24*4126 + 0
      });
      expect(result[75]).toEqual({
        date: "2025-03-13",
        TZmidnight: 1741838400, // "2025-03-13T04:00:00.000Z",
        count: 6215, // TZ aligned again
      });
      expect(result[76]).toEqual({
        date: "2025-03-14",
        TZmidnight: 1741924800, // "2025-03-14T04:00:00.000Z",
        count: 4265,
      });
      expect(result[104]).toEqual({
        date: "2025-04-11",
        TZmidnight: 1744344000, // 2025-04-11T04:00:00.000Z",
        count: 4477,
      });
    });
  });
});
