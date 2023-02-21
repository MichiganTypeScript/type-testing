import { Equal } from './Equal';
import { Expect } from './Expect';
import { ExpectFalse } from './ExpectFalse';

type Cases = [
  Expect<Equal<ExpectFalse<false>, true>>,
  Expect<Equal<ExpectFalse<never>, false>>,
];

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2344) literal boolean
    ExpectFalse<boolean>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) union containing false
    ExpectFalse<1 | false>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) unknown
    ExpectFalse<unknown>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) literal true
    ExpectFalse<true>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) string
    ExpectFalse<string>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) literal string
    ExpectFalse<'false'>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) falsy string
    ExpectFalse<''>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) falsy number
    ExpectFalse<0>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) undefined
    ExpectFalse<undefined>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) null
    ExpectFalse<null>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2314) only accepts one argument
    ExpectFalse<false, false>,
    any
  >>,
];
