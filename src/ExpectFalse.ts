import { Equal } from "./Equal";

/**
 * A type that will error if passed anything other than literal `false` or `never`
 * 
 * The following will not error:
 *
 * ```ts
 * IsFalse<false>;
 * IsFalse<never>;
 * ```
 *
 * The following will error:
 *
 * ```ts
 * IsFalse<true>;
 * IsFalse<boolean>;
 * IsFalse<1 | false>;
 * IsFalse<'false'>;
 * IsFalse<''>;
 * IsFalse<0>;
 * IsFalse<undefined>;
 * IsFalse<null>;
 * IsFalse<unknown>;
 * ```
 */
export type ExpectFalse<T extends false> = Equal<T, false>;