/**
 * AggregatedDailyStepCount is the steps out of the Health Connect mobile API
 * After processing, it represents the steps of a day of one user
 */
export interface AggregatedDailyStepCount {
  date: string; // yyyy-MM-dd
  count: number;
  TZmidnight: number; // epoch
}

/**
 * PartialOnly is a utility type that makes only the specified keys of T optional
 * while keeping the rest of the properties required.
 * @template T - The original type
 * @template K - The keys of T that should be made optional.
 * @returns A new type with the specified keys made optional.
 */
export type PartialOnly<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * RequireOnly is a utility type that makes only the specified keys of T required
 * while keeping the rest of the properties optional.
 * @template T - The original type
 * @template K - The keys of T that should be made required.
 * @returns A new type with the specified keys made required.
 * */
export type RequireOnly<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;
