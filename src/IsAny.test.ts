import { IsAny } from './IsAny';
import { Expect } from './Expect';
import { Equal } from './Equal';

type Cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<any | 1>, true>>, // a type resolving to any

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
];

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2314) only accepts one argument
    IsAny<any, any>,
    any
  >>,
];
