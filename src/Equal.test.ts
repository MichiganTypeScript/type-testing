// note: every other test utilizes this type

import { Equal } from "./Equal";
import { Expect } from "./Expect";

type Cases = [
  Expect<Equal<Equal<1, 1>, true>>,
  Expect<Equal<Equal<1n, 1n>, true>>,
  Expect<Equal<Equal<'a', 'a'>, true>>,
  Expect<Equal<Equal<{ a: 1 }, { a: 1 }>, true>>,
  Expect<Equal<Equal<{}, {}>, true>>,
  Expect<Equal<Equal<[], []>, true>>,
  Expect<Equal<Equal<[1, 'a'], [1, 'a']>, true>>,
  Expect<Equal<Equal<any, any>, true>>,
  Expect<Equal<Equal<never, never>, true>>,
  Expect<Equal<Equal<unknown, unknown>, true>>,
  Expect<Equal<Equal<true | false, boolean>, true>>,

  /// Union
  Expect<Equal<Equal<1 | 2, 1>, false>>,
  Expect<Equal<Equal<'a' | 'b', string>, false>>,
  Expect<Equal<Equal<1 | 2, number>, false>>,
  Expect<Equal<Equal<{ a: 1 | 2 }, object>, false>>,

  /// Intersection
  Expect<Equal<Equal<{ a: 1, b: 2 }, { a: 1 } & { b: 2 }>, false>>, // intersection detection :)
  Expect<Equal<Equal<1 & 2, never>, true>>, // expected behavior of resolution
  Expect<Equal<Equal<string & number, never>, true>>, // expected behavior of resolution

  /// Literal Values
  Expect<Equal<Equal<1, 2>, false>>, // literal numbers
  Expect<Equal<Equal<'a', 'b'>, false>>, // literal string
  Expect<Equal<Equal<1n, 2n>, false>>, // literal bigint
  Expect<Equal<Equal<1n, 1>, false>>, // literal bigint vs literal number
  Expect<Equal<Equal<true, boolean>, false>>, // literal boolean vs boolean
  Expect<Equal<Equal<'a', string>, false>>, // literal string vs string
  Expect<Equal<Equal<1, number>, false>>, // literal number vs number
  Expect<Equal<Equal<1n, bigint>, false>>, // literal bigint vs bigint
  Expect<Equal<Equal<[1, 'a'], ['a', 1]>, false>>, // tuple order matters
  Expect<Equal<Equal<[], unknown[]>, false>>, // empty tuple detection
  Expect<Equal<Equal<any, {}>, false>>, // any vs {}
  Expect<Equal<Equal<any, 1>, false>>, // any vs literal number
  Expect<Equal<Equal<unknown, 1>, false>>,
  Expect<Equal<Equal<never, 1>, false>>,

  Expect<Equal<Equal<any, never>, false>>,
  Expect<Equal<Equal<unknown, {}>, false>>,
  Expect<Equal<Equal<unknown, never>, false>>,
  Expect<Equal<Equal<never, {}>, false>>,
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