[name TBD]

<!-- omit in toc -->
# `type-testing`

Sometimes your project's TypeScript types really matter.  Use `type-testing` to ship with confidence.

As libraries with incredible type inferencing like Zod, tRPC, and TanStack Query have gained popularity, we've seen more and more projects where the TypeScript types _themselves_ are a core part of the shippable product.  But there hasn't been a good way to make sure they don't subtly break from day to day.

| Before                                                                                                                                                              | After                                                                                                                                               |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| :dizzy_face: Your inferred types work great on Monday, but by Friday you realize they don't infer correctly anymore.                                                | :green_salad: At 11:53am on Wednesday, a type test fails and you realize you should probably take a break for lunch before you break anything else. |
| :see_no_evil: You want to make awesome TypeScript types.. but every time you try to add or fix something, you are left wondering if you broke something else        | :mechanical_arm: You can can refactor with confidence.                                                                                             |
| :crossed_fingers: Your open source project can be tough to keep up with.  You want to accept community PRs but you&#39;re not sure if they possibly break something | :mage: You can be confident that a community PR won't break anything, and you can request new tests that cover any areas of concern                 |

## Why not just rely on explicit return types?

Lots of reasons.

1. Because a lot of times you can't.  What you ship is often an abstraction (i.e. generic), so you really need to write a specific unit test to make sure that your end users of your library have the right type experience (whether those users are external to your team or not).
1. Because being able to write these tests while you're working enables you to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development) with the types themselves.  Even if you don't do full-blown 100% TDD, it's pretty useful to be able to be sure that you've got your core use-cases covered.  Then, you can refactor and improve your code with a lot more confidence.
1. Because return types [can lie](https://youtu.be/I6V2FkW1ozQ?t=439).

## :family_man_woman_girl_boy: Your New Type Testing Family

- [`Equal`](#equal)
- [`NotEqual`](#notequal)
- [`Expect`](#expect)
- [`ExpectFalse`](#expectfalse)
- [`IsAny`](#isany)
- [`IsNever`](#isnever)
- [`IsTuple`](#istuple)
- [`IsUnion`](#isunion)
- [`TrueCases`](#truecases)
- [`FalseCases`](#falsecases)

### `Equal`

returns `true` if the provided arguments resolve to the same TypeScript value.

`Equal` is the cornerstone of TypeScript type testing.

### `NotEqual`

The opposite of `Equal`, will return false if the two inputs are not equal.

### `Expect`

errors at TypeScript compile-time if passed a value that is not `true`:

the following will not error and will return `true`;

```ts
Expect<true>;
```

all other inputs will return `false`.

all other inputs will error, except for `never`.

### `ExpectFalse`

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

### `IsAny`

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

### `IsNever`

returns `true` when passed a literal `never`:

```ts
IsNever<never>;
```

returns `false` for all other values

### `IsTuple`

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

### `IsUnion`

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

### `TrueCases`

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

### `FalseCases`

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

## FAQ

### Can `Expect` and `Equal` be combined to a type `ExpectEqual`?

Unfortunately, no.  The power of this approach is that it will error at build time while being type checked.

### Why aren't there aliases for `Expect` like `IsTrue` and `ExpectTrue`, as well as aliases for `ExpectFalse` like `IsFalse`?

Because "no API is the best API".  The hope is to avoid people having to learn or memorize the quirks of different assertion APIs.  This is a pretty cutting-edge part of the TypeScript world, but if you look around, you're going to find that 98% (or more!) of usage just needs `Expect` and `Equal`.

### Is this a new idea?

Nope!  It's been knocking around in the TypeScript community for a while, but there has yet to be someone to, hilariously enough, write tests for these types and package them into a micro library.

### What about \_\_\_\_\_

You might be familiar with other projects that attempt to do something similar.  Here's a quick overview:

- [`eslint-plugin-expect-type`](https://www.npmjs.com/package/eslint-plugin-expect-type) is powerful, but relies on comments and requires ESLint.  This means that refactoring and renaming will get out of sync because the tests themselves aren't actually code.  On top of that, there's a problem with the order of unions in TypeScript not being stable from release-to-release, which causes very annoying false positive test failures that you have to manually fix.
- [`tsd`](https://github.com/SamVerschueren/tsd) is nice, but it's not for type layer itself.  For that matter, there are a few nice alternatives if you can integrate this into your test runner, e.g. Jest's [Expect](https://github.com/facebook/jest/blob/main/packages/expect/src/types.ts#L99) type is built into it's assertion functions.  The same goes for [`expect-type`](https://github.com/mmkal/expect-type).
