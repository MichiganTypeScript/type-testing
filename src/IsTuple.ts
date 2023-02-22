import { IsNever } from "./IsNever";

/**
 * returns `true` for types that are Tuples
 *
 * the following all return `true`:
 *
 * ```ts
 * IsTuple<[]>;
 * IsTuple<[number]>;
 * IsTuple<readonly [1]>;
 * ```
 *
 * the following all return `false`:
 *
 * ```ts
 * IsTuple<{ length: 1 }>;
 * IsTuple<number[]>;
 * IsTuple<never>;
 * ```
 */
export type IsTuple<T> =
  IsNever<T> extends true
  ? false
  : T extends readonly unknown[]
    ? number extends T["length"]
      ? false
      : true
    : false
;