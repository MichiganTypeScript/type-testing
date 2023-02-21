/**
 * returns `true` when passed a literal `never`:
 * 
 * ```ts
 * IsNever<never>;
 * ```
 *
 * returns `false` for all other values
 */
export type IsNever<T> = [T] extends [never] ? true : false;