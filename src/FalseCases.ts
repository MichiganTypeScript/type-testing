import { Equal } from "./Equal";
import { IsTuple } from "./IsTuple";

/**
 * A helper type that will allow you to test many cases at once with minimal boilerplate.
 *
 * instead of
 * 
 * ```ts
 * type FalseCases = [
 *   Expect<Equal<IsNever<''>, false>>,
 *   Expect<Equal<IsNever<undefined>, false>>,
 *   Expect<Equal<IsNever<null>, false>>,
 *   Expect<Equal<IsNever<[]>, false>>,
 *   Expect<Equal<IsNever<{}>, false>>,
 *   Expect<Equal<IsNever<never | string>, false>>,
 * ];
 * ```
 *
 * you can write:
 *
 * ```ts
 * type F = FalseCases<[
 *   IsNever<''>,
 *   IsNever<undefined>,
 *   IsNever<null>,
 *   IsNever<[]>,
 *   IsNever<{}>,
 *   IsNever<never | string>,
 * ]>;
 * ```
 *
 * The drawback of this type is that the error message is not as friendly if one of the test cases has an error:
 *
 * ```text
 * Type '[false, false, true, false, false, false]' does not satisfy the constraint 'readonly false[]'.
 *   Type 'boolean' is not assignable to type 'false'.ts(2344)
 * ```
 *
 * Whereas with inline `Expect` and `Equal` you'd get an error just on the line of the failing test.
 *
 * If the tradeoff of debuggability is desirable to you, then use this type.
 */
export type FalseCases<T extends readonly false[]> =
  Equal<T[number], false> extends true
  ? IsTuple<T> extends true
    ? true
    : false
  : false;