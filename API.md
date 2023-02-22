# API Guide

- [API Guide](#api-guide)
  - [Equal](#equal)
  - [NotEqual](#notequal)
  - [Expect](#expect)
  - [ExpectFalse](#expectfalse)
  - [IsAny](#isany)
  - [IsNever](#isnever)
  - [IsTuple](#istuple)
  - [IsUnion](#isunion)
  - [IsUnknown](#isunknown)
  - [TrueCases](#truecases)
  - [FalseCases](#falsecases)

## Equal

returns `true` if the provided arguments resolve to the same TypeScript value.

`Equal` is the cornerstone of TypeScript type testing.

## NotEqual

The opposite of `Equal`, will return false if the two inputs are not equal.

## Expect

errors at TypeScript compile-time if passed a value that is not `true`:

the following will not error and will return `true`;

```ts
Expect<true>;
```

all other inputs will return `false`.

all other inputs will error, except for `never`.

## ExpectFalse

A type that will error if passed anything other than literal `false` or `never`

The following will not error:

```ts
IsFalse<false>;
IsFalse<never>;
```

The following will error:

```ts
IsFalse<true>;
IsFalse<boolean>;
IsFalse<1 | false>;
IsFalse<'false'>;
IsFalse<''>;
IsFalse<0>;
IsFalse<undefined>;
IsFalse<null>;
IsFalse<unknown>;
```

## IsAny

Returns `true` if the input is of type `any` and false for all other inputs.

The following will return true:

```ts
IsAny<any>;
```

The following will return false:

```ts
IsAny<undefined>;
IsAny<unknown>;
IsAny<never>;
IsAny<string>;
```

Note unions with `any` resolve to `any`, so:

```ts
IsAny<string | any>;
```

returns `true`;

## IsNever

returns `true` when passed a literal `never`:

```ts
IsNever<never>;
```

returns `false` for all other values

## IsTuple

returns `true` for types that are Tuples

the following all return `true`:

```ts
IsTuple<[]>;
IsTuple<[number]>;
IsTuple<readonly [1]>;
```

the following all return `false`:

```ts
IsTuple<{ length: 1 }>;
IsTuple<number[]>;
IsTuple<never>;
```

## IsUnion

returns `true` when passed something that resolves to a union

the following all return `true`:

```ts
IsUnion<undefined | null | void | ''>;
IsUnion<{ a: string } | { a: number }>;
IsUnion<string | number>;
IsUnion<'a' | 'b' | 'c' | 'd'>;
IsUnion<boolean>;
```

the following all return `false`:

```ts
IsUnion<string>;
IsUnion<{ a: string | number }>;
IsUnion<[string | number]>;
```

_Note_ how TypeScript treats types that resolve to a non-union.

the following all return `false`:

```ts
IsUnion<string | never>; // resolves to `string`
IsUnion<string | unknown>; // resolves to `unknown`
IsUnion<string | any>; // resolves to `any`
IsUnion<string | 'a'>; // `resolves to `string`
IsUnion<never>; // `never` is an empty union
```

## IsUnknown

This predicate tests for whether a given value is `unknown`.

It will return `true` for `unknown` (and any value that resolves to unknown such as `never | unknown` or `{} | unknown`).
It will return `false` for all other values (including values that resolve to something that is not unknown such as `any | unknown`).

## TrueCases

A helper type that will allow you to test many cases at once with minimal boilerplate.

instead of

```ts
type TrueCases = [
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
];
```

you can write:

```ts
type T = TrueCases<[
  IsUnion<undefined | null | void | ''>,
  IsUnion<{ a: string } | { a: number }>,
  IsUnion<string | number>,
  IsUnion<'a' | 'b' | 'c' | 'd'>,
]>;
```

The drawback of this type is that the error message is not as friendly if one of the test cases has an error:

```text
Type '[true, true, false, true]' does not satisfy the constraint 'readonly true[]'.
  Type 'boolean' is not assignable to type 'true'.ts(2344)
```

Whereas with inline `Expect` and `Equal` you'd get an error just on the line of the failing test.

If the tradeoff of debuggability is desirable to you, then use this type.

## FalseCases

A helper type that will allow you to test many cases at once with minimal boilerplate.

instead of

```ts
type FalseCases = [
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
  Expect<Equal<IsNever<never | string>, false>>,
];
```

you can write:

```ts
type F = FalseCases<[
  IsNever<''>,
  IsNever<undefined>,
  IsNever<null>,
  IsNever<[]>,
  IsNever<{}>,
  IsNever<never | string>,
]>;
```

The drawback of this type is that the error message is not as friendly if one of the test cases has an error:

```text
Type '[false, false, true, false, false, false]' does not satisfy the constraint 'readonly false[]'.
  Type 'boolean' is not assignable to type 'false'.ts(2344)
```

Whereas with inline `Expect` and `Equal` you'd get an error just on the line of the failing test.

If the tradeoff of debuggability is desirable to you, then use this type.

Note that because of the constraints