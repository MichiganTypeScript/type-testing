import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { FalseCases } from "./FalseCases";
import { IsNever } from "./IsNever";

type EEF = [
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  // @ts-expect-error(2344) errors at the level of the individual case
  Expect<Equal<IsNever<never>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
  Expect<Equal<IsNever<never | string>, false>>,

  Expect<Equal<FalseCases<[]>, false>>,
  Expect<Equal<FalseCases<[never]>, false>>,
  Expect<Equal<FalseCases<[any]>, false>>,
  Expect<Equal<FalseCases<never>, false>>,
  Expect<Equal<FalseCases<any>, false>>,
];

// @ts-expect-error(2344) must be ignored at the top level
type Bad = FalseCases<[
  // cannot be ignored here, at the individual case
  IsNever<never>,
]>;

type F = FalseCases<[
  IsNever<''>,
  IsNever<undefined>,
  IsNever<[]>,
  IsNever<{}>,
  IsNever<never | string>,

  FalseCases<[]>,
  FalseCases<[never]>,
  FalseCases<[any]>,
  FalseCases<never>,
  FalseCases<any>,
]>;

type Errors = [
  Expect<Equal<
    // @ts-expect-error(2314) only accepts one argument
    FalseCases<[], []>,
    any
  >>,

  Expect<Equal<
    // @ts-expect-error(2344) does not accept literals
    FalseCases<true>,
    false
  >>,
]