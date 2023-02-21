import { IsNever } from './IsNever';
import { Expect } from './Expect';
import { Equal } from './Equal';

type Cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<string & number>, true>>,

  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
  Expect<Equal<IsNever<never | string>, false>>,
];

type Errors = [
  // @ts-expect-error(2314) only accepts one argument
  IsNever<1, 2>,
];
