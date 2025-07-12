export interface HealthConnectStepRecord {
  count: number;
  endTime: string;
  metadata: {
    clientRecordId: string | null;
    clientRecordVersion: number;
    dataOrigin: string;
    device: any;
    id: string;
    lastModifiedTime: string;
    recordingMethod: number;
  };
  startTime: string;
}
