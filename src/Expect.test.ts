import { Equal } from './Equal';
import { Expect } from './Expect';

type Cases = [
  Expect<Equal<Expect<true>, true>>,
  Expect<Equal<Expect<never>, false>>,
];

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2344) literal boolean
    Expect<boolean>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) union containing false
    Expect<1 | false>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) unknown
    Expect<unknown>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) literal false
    Expect<false>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) string
    Expect<string>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) literal string
    Expect<'true'>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) falsy string
    Expect<''>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) falsy number
    Expect<0>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) undefined
    Expect<undefined>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) null
    Expect<null>,
    false
  >>,

  Expect<Equal<
    // @ts-expect-error(2314) only accepts one argument
    Expect<true, true>,
    any
  >>,
];