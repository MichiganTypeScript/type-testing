import { IsAny } from "./IsAny";
import { IsNever } from "./IsNever";

/**
 * This predicate tests for whether a given value is `unknown`.
 * 
 * It will return `true` for `unknown` (and any value that resolves to unknown such as `never | unknown` or `{} | unknown`).
 * It will return `false` for all other values (including values that resolve to something that is not unknown such as `any | unknown`).
 */
export type IsUnknown<T> =
  [unknown] extends [T]
  ? IsAny<T> extends true
    ? false
    : IsNever<T> extends true
      ? false
      : true
  : false;