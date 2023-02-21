import { Equal } from "./Equal";

/**
 * errors at TypeScript compile-time if passed a value that is not `true`:
 * 
 * the following will not error and will return `true`;
 *
 * ```ts
 * Expect<true>;
 * ```
 * 
 * all other inputs will return `false`.
 * 
 * all other inputs will error, except for `never`.
 */
export type Expect<T extends true> = Equal<T, true>;
