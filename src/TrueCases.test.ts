import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { IsUnion } from "./IsUnion";
import { TrueCases } from "./TrueCases";

type EET = [
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  // @ts-expect-error(2344) errors at the level of the individual case
  Expect<Equal<IsUnion<1>, true>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
];

// @ts-expect-error(2344) must be ignored at the top level
type T = TrueCases<[
  IsUnion<undefined | null | void | ''>,
  IsUnion<1>,
  IsUnion<string | number>,
  IsUnion<'a' | 'b' | 'c' | 'd'>,
]>;
