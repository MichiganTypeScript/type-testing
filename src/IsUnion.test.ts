import { Equal } from './Equal';
import { Expect } from './Expect';
import { IsUnion } from './IsUnion';

type Cases = [
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<boolean>, true>>,

  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,

  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
];

type Errors = [
  // @ts-expect-error(2314) only accepts one argument
  IsUnion<1, 2>
];