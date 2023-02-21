import { IsTuple } from './IsTuple';
import { Expect } from './Expect';
import { Equal } from './Equal';

type Cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,

  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
];

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2314) only accepts one argument
    IsTuple<1, 2>,
    any
  >>,
]
