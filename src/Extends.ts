/**
 * ONLY use this type if you know exactly what you're doing.
 *
 * This type appears to return `true` if and only if `A extends B`, however, if you look at the tests you'll find that this is unfortunately not quite exactly how TypeScript works.  There are many edge cases that return surprising results due to how TypeScript is structured.  Of course these results may make sense eventually if you look deeply enough at them, but the hazard is always present.
 *
 * For example, distributivity is in play any time you set up `extends` clauses, which means that it can actually return _MULTIPLE_ paths at once (yielding a return type of `boolean`) or even _NO PATHS_ (yielding a return type of `never`).
 *
 * ```ts
 * Extends<1 & 2, never> //=> never
 * Extends<string & number, never> //=> never
 * Extends<never, never> //=> never
 *
 * Extends<any, never> //=> boolean
 * Extends<1 | 2, 1> //=> boolean
 * Extends<boolean, true> //=> boolean
 * Extends<any, 1> //=> boolean
 *
 * Extends<[], unknown[]> //=> true
 * Extends<unknown[], []> //=> false
 *
 * Extends<any, {}> //=> boolean
 * Extends<{}, any> //=> true
 *
 * Extends<never, 1> //=> never
 * Extends<1, never> //=> false
 *
 * Extends<{}, unknown> //=> true
 * Extends<unknown, {}> //=> false
 * ```
 *
 * @deprecated It's marked deprecated because the risk of accidental misuse is so high unless you're absolutely certain you know what you're doing.  There are rare but present situations when you want this type instead of Equal, hence it's inclusion in the library.
 */
export type Extends<A, B> = A extends B ? true : false;
