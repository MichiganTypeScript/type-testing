import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { IsUnknown } from "./IsUnknown";

type Cases = [
  Expect<Equal<IsUnknown<unknown>, true>>,

  Expect<Equal<IsUnknown<never | unknown>, true>>,
  Expect<Equal<IsUnknown<1 | unknown>, true>>,
  Expect<Equal<IsUnknown<{} | unknown>, true>>,
  
  Expect<Equal<IsUnknown<never>, false>>,
  Expect<Equal<IsUnknown<any>, false>>,
  Expect<Equal<IsUnknown<1>, false>>,
  Expect<Equal<IsUnknown<'a'>, false>>,
  Expect<Equal<IsUnknown<true>, false>>,
  Expect<Equal<IsUnknown<boolean>, false>>,
  Expect<Equal<IsUnknown<{}>, false>>,
  
  Expect<Equal<IsUnknown<any | unknown>, false>>,
  Expect<Equal<IsUnknown<any & unknown>, false>>,
  Expect<Equal<IsUnknown<never & unknown>, false>>,
  Expect<Equal<IsUnknown<{} & unknown>, false>>,
];

