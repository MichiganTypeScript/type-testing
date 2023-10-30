// note: every other test utilizes this type

import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { Extends } from "./Extends";

type Cases = [
  Expect<Equal<Extends<1, 1>, true>>,
  Expect<Equal<Extends<1n, 1n>, true>>,
  Expect<Equal<Extends<'a', 'a'>, true>>,
  Expect<Equal<Extends<{ a: 1 }, { a: 1 }>, true>>,
  Expect<Equal<Extends<{}, {}>, true>>,
  Expect<Equal<Extends<[], []>, true>>,
  Expect<Equal<Extends<[1, 'a'], [1, 'a']>, true>>,
  Expect<Equal<Extends<any, any>, true>>,

  // perhaps a surprising result
  Expect<Equal<Extends<never, never>, never>>,
  Expect<Equal<Extends<unknown, unknown>, true>>,
  Expect<Equal<Extends<true | false, boolean>, true>>,

  /// Union

  // perhaps a surprising result
  Expect<Equal<Extends<1 | 2, 1>, boolean>>,
  Expect<Equal<Extends<'a' | 'b', string>, true>>,
  Expect<Equal<Extends<1 | 2, number>, true>>,
  Expect<Equal<Extends<{ a: 1 | 2 }, object>, true>>,

  /// Intersection
  Expect<Equal<Extends<{ a: 1, b: 2 }, { a: 1 } & { b: 2 }>, true>>,
  Expect<Equal<Extends<1 & 2, never>, never>>,
  Expect<Equal<Extends<string & number, never>, never>>,

  /// Literal Values
  Expect<Equal<Extends<1, 2>, false>>,
  Expect<Equal<Extends<'a', 'b'>, false>>,
  Expect<Equal<Extends<1n, 2n>, false>>,
  Expect<Equal<Extends<1n, 1>, false>>,
  Expect<Equal<Extends<true, boolean>, true>>,
  Expect<Equal<Extends<'a', string>, true>>,
  Expect<Equal<Extends<1, number>, true>>,
  Expect<Equal<Extends<1n, bigint>, true>>,
  Expect<Equal<Extends<[1, 'a'], ['a', 1]>, false>>,
  Expect<Equal<Extends<[], unknown[]>, true>>,
  Expect<Equal<Extends<any, {}>, boolean>>,
  Expect<Equal<Extends<any, 1>, boolean>>,
  Expect<Equal<Extends<unknown, 1>, false>>,
  Expect<Equal<Extends<never, 1>, never>>,

  Expect<Equal<Extends<any, never>, boolean>>,
  Expect<Equal<Extends<unknown, {}>, false>>,
  Expect<Equal<Extends<unknown, never>, false>>,
  Expect<Equal<Extends<never, {}>, never>>,

  /// Literal Values (flipped)
  Expect<Equal<Extends<boolean, true>, boolean>>,
  Expect<Equal<Extends<string, 'a'>, false>>,
  Expect<Equal<Extends<number, 1>, false>>,
  Expect<Equal<Extends<bigint, 1n>, false>>,
  Expect<Equal<Extends<unknown[], []>, false>>,
  Expect<Equal<Extends<{}, any>, true>>,
  Expect<Equal<Extends<1, any>, true>>,
  Expect<Equal<Extends<1, unknown>, true>>,
  Expect<Equal<Extends<1, never>, false>>,

  Expect<Equal<Extends<never, any>, never>>,
  Expect<Equal<Extends<{}, unknown>, true>>,
  Expect<Equal<Extends<unknown, never>, false>>,
  Expect<Equal<Extends<never, {}>, never>>,
];

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2314) does not accept one parameter
    Equal<1>,
    any
  >>,

  Expect<Equal<
    // @ts-expect-error(2314) does not accept more than two parameters
    Equal<1, 1, 1>,
    any
  >>,
];