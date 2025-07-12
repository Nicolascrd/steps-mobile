import {
  getDayLegacy,
  getPreviousMidnightEpoch,
  getPreviousMidnightFormatted,
  getUnixTimeUTC,
  windowOverlap,
} from "../time.helper";

describe("getPreviousMidnight", () => {
  test("getPreviousMidnight should return the previous local midnight in UTC format", () => {
    expect(
      getPreviousMidnightFormatted("2024-12-31T09:42:56.444Z", "+01:00")
    ).toBe("2024-12-30T23:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2024-12-31T09:42:56.444Z", "+13:00")
    ).toBe("2024-12-30T11:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2024-12-31T09:42:56.444Z", "-10:00")
    ).toBe("2024-12-30T10:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2025-01-02T22:05:00.000Z", "+01:00")
    ).toBe("2025-01-01T23:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2025-01-02T22:05:00.000Z", "+13:00")
    ).toBe("2025-01-02T11:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2025-01-02T22:05:00.000Z", "-10:00")
    ).toBe("2025-01-02T10:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2025-01-02T12:05:00.000Z", "+13:00")
    ).toBe("2025-01-02T11:00:00.000Z");
    expect(
      getPreviousMidnightFormatted("2025-01-02T12:05:00.000Z", "-10:00")
    ).toBe("2025-01-02T10:00:00.000Z");
    // Kabul is UTC+04:30
    expect(
      getPreviousMidnightFormatted("2024-12-31T09:42:56.444Z", "Asia/Kabul")
    ).toBe("2024-12-30T19:30:00.000Z");
  });
});

describe("getPreviousMidnightEpoch", () => {
  test("getPreviousMidnightEpoch should return the previous local midnight epoch", () => {
    expect(getPreviousMidnightEpoch("2024-12-31T09:42:56.444Z", "+01:00")).toBe(
      1735599600
    );
  });
});

describe("getDay", () => {
  test("getDay should return the correct day for a given ISO date and timezone", () => {
    expect(getDayLegacy("2024-12-31T09:42:56.444Z", "UTC")).toBe("2024-12-31");
    expect(getDayLegacy("2024-12-31T09:42:56.444Z", "+01:00")).toBe(
      "2024-12-31"
    );
    expect(getDayLegacy("2024-12-31T09:42:56.444Z", "+13:00")).toBe(
      "2024-12-31"
    );
    expect(getDayLegacy("2024-12-31T09:42:56.444Z", "-10:00")).toBe(
      "2024-12-30"
    );
    expect(getDayLegacy("2024-12-30T23:00:00.000Z", "+01:00")).toBe(
      "2024-12-31"
    );
    expect(getDayLegacy("2024-12-30T19:30:00.000Z", "Asia/Kabul")).toBe(
      "2024-12-31"
    );
  });

  test("getDay should format return date correctly", () => {
    expect(getDayLegacy("2024-01-01T09:42:56.444Z", "UTC")).toBe("2024-01-01"); // NOT 1/1/2024
  });
});

describe("getUnixTimeUTC", () => {
  test("getUnixTimeUTC should return the correct Unix timestap for a given ISO date in UTC", () => {
    expect(getUnixTimeUTC("2024-12-31T09:42:56.444Z")).toBe(1735638176);
    expect(getUnixTimeUTC("2025-01-01T00:00:00.000Z")).toBe(1735689600);
    expect(getUnixTimeUTC("1970-01-01T00:00:00.000Z")).toBe(0);
  });
});

describe("windowOverlap", () => {
  test("windowOverlap should return 0 when there is no overlap", () => {
    expect(windowOverlap(10, 20, 0, 5)).toBe(0); // log ends before window starts
    expect(windowOverlap(10, 20, 25, 30)).toBe(0); // log starts after window ends
  });

  test("windowOverlap should return 1 when the log is fully within the window", () => {
    expect(windowOverlap(10, 20, 12, 18)).toBe(1);
    expect(windowOverlap(10, 20, 10, 20)).toBe(1); // log matches window exactly
  });

  test("windowOverlap should return the correct proportion when there is partial overlap", () => {
    expect(windowOverlap(10, 20, 5, 15)).toBe(0.5); // overlap is half of the log
    expect(windowOverlap(10, 20, 15, 25)).toBe(0.5); // overlap is half of the log
    expect(windowOverlap(10, 20, 5, 25)).toBe(0.5); // overlap is half of the log
    expect(windowOverlap(10, 20, 12, 22)).toBe(0.8); // overlap is 80% of the log
  });

  test("windowOverlap should return 0 when overlapStart equals overlapEnd", () => {
    expect(windowOverlap(10, 20, 20, 30)).toBe(0); // overlapStart equals overlapEnd
    expect(windowOverlap(10, 20, 0, 10)).toBe(0); // overlapStart equals overlapEnd
  });
});
