import { Equal } from "./Equal";
import { IsTuple } from "./IsTuple";

/**
 * A helper type that will allow you to test many cases at once with minimal boilerplate.
 *
 * instead of
 *
 * ```ts
 * type TrueCases = [
 *   Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
 *   Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
 *   Expect<Equal<IsUnion<string | number>, true>>,
 *   Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
 * ];
 * ```
 *
 * you can write:
 *
 * ```ts
 * type T = TrueCases<[
 *   IsUnion<undefined | null | void | ''>,
 *   IsUnion<{ a: string } | { a: number }>,
 *   IsUnion<string | number>,
 *   IsUnion<'a' | 'b' | 'c' | 'd'>,
 * ]>;
 * ```
 *
 * The drawback of this type is that the error message is not as friendly if one of the test cases has an error:
 *
 * ```text
 * Type '[true, true, false, true]' does not satisfy the constraint 'readonly true[]'.
 *   Type 'boolean' is not assignable to type 'true'.ts(2344)
 * ```
 *
 * Whereas with inline `Expect` and `Equal` you'd get an error just on the line of the failing test.
 *
 * If the tradeoff of debuggability is desirable to you, then use this type.
 */
export type TrueCases<T extends readonly true[]> =
  false extends Equal<T[number], true>
  ? false extends IsTuple<T>
    ? false
    : true
  : true;