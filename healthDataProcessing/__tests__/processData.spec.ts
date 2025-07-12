import samsungStepsMock from "../../mocks/android/stepsUpload_samsung.json";
import { processHealthDataIntoDailySteps } from "../processData";

describe("processHealthDataIntoDailySteps", () => {
  // it.only("should write the result to a new JSON file", () => {
  //   const steps = processHealthDataIntoDailySteps(samsungStepsMock, "+01:00");
  //   expect(steps).toBeDefined();

  //   fs.writeFileSync(
  //     "./samsungProcessedMock_EST.json",
  //     JSON.stringify(steps, null, 2)
  //   );
  // });
  it("should process health data correctly into daily steps, with empty last log", () => {
    const steps = processHealthDataIntoDailySteps(samsungStepsMock, "+01:00");
    expect(steps).toBeDefined();
    expect(steps.length).toBe(78);
    expect(steps[0]).toEqual({
      date: "2024-12-29",
      TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
      count: 4733,
    });
    expect(steps[7]).toEqual({
      date: "2025-01-05",
      TZmidnight: 1736031600, // "2025-01-04T23:00:00.000Z",
      count: 7823,
    });
    expect(steps[77]).toEqual({
      date: "2025-03-16",
      TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
      count: 18382,
    });
  });

  it("should process health data correctly into daily steps, with last log detached", () => {
    const steps = processHealthDataIntoDailySteps(samsungStepsMock, "+01:00", {
      date: "2024-12-18",
      TZmidnight: 1734476400, // "2024-12-17T23:00:00.000Z",
      count: 1048,
    });
    expect(steps).toBeDefined();
    expect(steps.length).toBe(78);
    expect(steps[0]).toEqual({
      date: "2024-12-29",
      TZmidnight: 1735426800, // "2024-12-28T23:00:00.000Z",
      count: 4733,
    });
    expect(steps[7]).toEqual({
      date: "2025-01-05",
      TZmidnight: 1736031600, // "2025-01-04T23:00:00.000Z",
      count: 7823,
    });
    expect(steps[77]).toEqual({
      date: "2025-03-16",
      TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z"
      count: 18382,
    });
  });

  it("should process health data correctly into daily steps, with last log", () => {
    const steps = processHealthDataIntoDailySteps(samsungStepsMock, "+01:00", {
      date: "2025-01-05",
      TZmidnight: 1736031600, // "2025-01-04T23:00:00.000Z",
      count: 1048,
    });
    expect(steps).toBeDefined();
    expect(steps.length).toBe(71);
    expect(steps[0]).toEqual({
      date: "2025-01-05",
      TZmidnight: 1736031600, //"2025-01-04T23:00:00.000Z",
      count: 7823,
    });
    expect(steps[70]).toEqual({
      date: "2025-03-16",
      TZmidnight: 1742079600, // "2025-03-15T23:00:00.000Z",
      count: 18382,
    });
  });
});
