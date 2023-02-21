/**
 * Returns `true` if the input is of type `any` and false for all other inputs.
 *
 * The following will return true:
 *
 * ```ts
 * IsAny<any>;
 * ```
 *
 * The following will return false:
 *
 * ```ts
 * IsAny<undefined>;
 * IsAny<unknown>;
 * IsAny<never>;
 * IsAny<string>;
 * ```
 *
 * Note unions with `any` resolve to `any`, so:
 *
 * ```ts
 * IsAny<string | any>;
 * ```
 *
 * returns `true`;
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false;
