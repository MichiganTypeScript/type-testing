// note: every other test utilizes this type

import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { SimpleEqual } from "./SimpleEqual";

type Cases = [
  Expect<Equal<SimpleEqual<1, 1>, true>>,
  Expect<Equal<SimpleEqual<1n, 1n>, true>>,
  Expect<Equal<SimpleEqual<'a', 'a'>, true>>,
  Expect<Equal<SimpleEqual<{ a: 1 }, { a: 1 }>, true>>,
  Expect<Equal<SimpleEqual<{}, {}>, true>>,
  Expect<Equal<SimpleEqual<[], []>, true>>,
  Expect<Equal<SimpleEqual<[1, 'a'], [1, 'a']>, true>>,
  Expect<Equal<SimpleEqual<any, any>, true>>,

  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<never, never>, never>>,
  Expect<Equal<SimpleEqual<unknown, unknown>, true>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<true | false, boolean>, boolean>>,

  /// Union

  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<1 | 2, 1>, boolean>>,
  Expect<Equal<SimpleEqual<'a' | 'b', string>, false>>,
  Expect<Equal<SimpleEqual<1 | 2, number>, false>>,
  Expect<Equal<SimpleEqual<{ a: 1 | 2 }, object>, false>>,

  /// Intersection
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<{ a: 1, b: 2 }, { a: 1 } & { b: 2 }>, true>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<1 & 2, never>, never>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<string & number, never>, never>>,

  /// Literal Values
  Expect<Equal<SimpleEqual<1, 2>, false>>, // literal numbers
  Expect<Equal<SimpleEqual<'a', 'b'>, false>>, // literal string
  Expect<Equal<SimpleEqual<1n, 2n>, false>>, // literal bigint
  Expect<Equal<SimpleEqual<1n, 1>, false>>, // literal bigint vs literal number
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<true, boolean>, boolean>>, // literal boolean vs boolean
  Expect<Equal<SimpleEqual<'a', string>, false>>, // literal string vs string
  Expect<Equal<SimpleEqual<1, number>, false>>, // literal number vs number
  Expect<Equal<SimpleEqual<1n, bigint>, false>>, // literal bigint vs bigint
  Expect<Equal<SimpleEqual<[1, 'a'], ['a', 1]>, false>>, // tuple order matters
  Expect<Equal<SimpleEqual<[], unknown[]>, false>>, // empty tuple detection
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<any, {}>, boolean>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<any, 1>, boolean>>,
  Expect<Equal<SimpleEqual<unknown, 1>, false>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<never, 1>, never>>,

  Expect<Equal<SimpleEqual<any, never>, false>>,
  Expect<Equal<SimpleEqual<unknown, {}>, false>>,
  Expect<Equal<SimpleEqual<unknown, never>, false>>,
  
  // !!!!! behavioral difference with `Equal` !!!!!
  Expect<Equal<SimpleEqual<never, {}>, never>>,
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