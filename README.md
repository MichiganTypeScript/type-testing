# type-testing

> 🌱 A micro library for testing your TypeScript types.

Sometimes your project's TypeScript types really matter.  More and more often, the TypeScript types _themselves_ are a core part of the product.  But there hasn't been a good way to make sure the types don't subtly break from day to day.  This is the problem `type-testing` solves.

A lot of popular projects with incredible type inferencing already use the code in `type-testing`.  For example [Zod](https://github.com/colinhacks/zod/blob/master/src/helpers/util.ts#L2), [Tan](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/react-query/src/__tests__/useQuery.types.test.tsx#L3-L11)[Stack](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/solid-query/src/__tests__/createQuery.types.test.tsx#L3) [Query](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/vue-query/src/__tests__/test-utils.ts#L54), [zustand](https://github.com/pmndrs/zustand/blob/fbfcdc54e679cf1cb6d887078b4b9b19319417e9/tests/types.test.tsx#L106), [tRPC](https://github.com/trpc/trpc/blob/main/packages/tests/server/inferenceUtils.ts#L116), [MUI](https://github.com/mui/material-ui/blob/master/packages/mui-styled-engine/src/index.d.ts#L65), [type-fest](https://github.com/sindresorhus/type-fest/blob/main/source/is-equal.d.ts#L26), [ts-reset](https://github.com/total-typescript/ts-reset/blob/main/src/tests/utils.ts#L7), and the [TypeScript Challenges](https://github.com/type-challenges/type-challenges/blob/main/utils/index.d.ts#L7) all have variants of the same code.  We collected that code here and wrote tests for them (yes: test inception).

## Goals

1. Bring this commonly copy-pasta'd code into one place where the utilities are tested and correct.
2. Demonstrate how to test types in TypeScript project.

| Before testing your types                                                                                                                                             | After using `type-testing`                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| :dizzy_face: Your inferred types work great on Monday, but by Friday you realize they don't infer correctly anymore.                                                  | :green_salad: At 11:53am on Wednesday, a type test fails and you realize you should probably stop to eat some lunch before you break anything else. |
| :see_no_evil: You want to make awesome TypeScript types.. but every time you try to add or fix something, you are left wondering if you broke something else.         | :mechanical_arm: You can refactor with confidence.                                                                                              |
| :crossed_fingers: Your open source project can be tough to keep up with.  You want to accept community PRs but you're not sure if they possibly break something.      | :partying_face: A community PR won't break anything, and you can request new tests that cover any areas of concern.                                 |
| :clown_face: You wonder about what will happen if there's some weird TypeScript edge-case where `never` or `unknown` or `any` is passed to your type by an end-user. | :mage: You don't have to be a TypeScript wizard to write great TypeScript types.  You can write a test and be sure things will work as expected!    |

## Quickstart

What if you have a fancy TypeScript function with an inferred type in your library:

```ts
const shoutItOutLoud = <T extends string>(str: T) => (
  `${str.toUpperCase() as Uppercase<T>}!!!` as const
);
```

The type of this function isn't just `string`, it's _the actual result_ as a TypeScript string literal.  But how do you write a test for that behavior of your library?

Now you can write a test for the type for your function!

```ts
import { Expect, Equal } from "type-testing";

const hello = shoutItOutLoud('hello');
type test_hello = Expect<Equal<typeof hello, 'HELLO!!!'>>;
```

You can do this right alongside your regular tests!

```ts
import { Expect, Equal } from 'type-testing';
import { shoutItOutLoud } from './shout';

describe('shoutItOudLoud', () => {
  it('has the intended API surface', () => {
    const hello = shoutItOutLoud('hello');

    // this tests the type
    type test_hello = Expect<Equal<typeof hello, 'HELLO!!!'>>;

    // this tests the runtime behavior
    expect(hello).toEqual('HELLO!!!');
  });
});
```

> [!IMPORTANT]
> Now, if your fancy type isn't **exactly** correct, your test suite will fail!
>
> <sup><sub>just like you'd want it to</sub></sup>

## Example: type-only libraries

Consider, though, that many libraries are shipping TypeScript types _as part of the product_.  In this case, they have very little way to be sure that the types they're shipping to their users are working as intended.  Consider the above but written in types:

```ts
type ShoutItOutLoud<T extends string> = `${Uppercase<T>}!!!`;
type Hello = 'hello';

// Compiler error! this should be `HELLO!!!` (all caps)
type test_Hello = Expect<Equal<ShoutItOutLoud<Hello>, 'HeLLO!!!'>>
```

> protip: you can see some great examples of what these kinds of test looks like [in this very repo itself](./src/Equal.test.ts).

### Example: testing functions

Now, you can write tests that will lock-in the intended behavior _of your types_.

If someone changes a type parameter or return type accidentally, now you'll know about it right away!

```ts
type test_params = Expect<Equal<
  Parameters<typeof shoutItOutLoud>,
  [string]
>>;

type test_return = Expect<Equal<
   ReturnType<typeof shoutItOutLoud>,
   `${Uppercase<string>}!!!`
>>;
```

## :family_man_woman_girl_boy: Your New Type Testing Family

[See API Guide](./API.md)

- [`Equal`](./API.md#equal)
- [`NotEqual`](./API.md#notequal)
- [`Expect`](./API.md#expect)
- [`ExpectFalse`](./API.md#expectfalse)
- [`Extends`](./API.md#extends)
- [`IsAny`](./API.md#isany)
- [`IsNever`](./API.md#isnever)
- [`IsTuple`](./API.md#istuple)
- [`IsUnion`](./API.md#isunion)
- [`TrueCases`](./API.md#truecases)
- [`SimpleEqual`](./API.md#simpleEquals)
- [`FalseCases`](./API.md#falsecases)

Also, if you just install and start using the library you'll discover that every type has lots of JSDoc description to help you along the way!

## FAQ

### Why not just rely on explicit return types?

Lots of reasons.

1. Because a lot of times you can't.  What you ship is often an abstraction (i.e. generic), so you really need to write a specific unit test to make sure that your end users of your library have the right type experience (whether those users are external to your team or not).
1. Because being able to write these tests while you're working enables you to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development) with the types themselves.  Even if you don't do full-blown 100% TDD, it's pretty useful to be able to be sure that you've got your core use-cases covered.  Then, you can refactor and improve your code with a lot more confidence.
1. Because return types [can lie](https://youtu.be/I6V2FkW1ozQ?t=439).

### Is this a new idea?

Nope!  It's been knocking around in the TypeScript community for a while, but there has yet to be someone to write tests for these types (ironically) and package them into a micro library.

### Can `Expect` and `Equal` be combined to a type `ExpectEqual`?

Unfortunately, no.  The power of this approach taken in this library is that it will error at build time while being type checked, and currently there's no way to combine the two utilities.

If you do happen to find a way... we're all waiting to hear about it!  File an issue!!

### Where are all the aliases?

> "no API is the best API".

You may have seen a version of this code copied around that contained aliases for `Expect` like `IsTrue` and `ExpectTrue`, as well as aliases for `ExpectFalse` like `IsFalse`.  The hope is to avoid people having to learn or memorize the quirks of different assertion APIs.  This is still a pretty cutting-edge part of the TypeScript world, but if you look around, you're going to find that 98% of the time (or more!) you just need `Expect` and `Equal`.

### What about \_\_\_\_\_ other way of testing types?

You might be familiar with other projects that attempt to do something similar.  Here's a quick overview:

- [`eslint-plugin-expect-type`](https://www.npmjs.com/package/eslint-plugin-expect-type) is powerful, but relies on comments and requires ESLint.  This means that refactoring and renaming will get out of sync because the tests themselves aren't actually code.  On top of that, there's a problem with the order of unions in TypeScript not being stable from release-to-release, which causes very annoying false positive test failures that you have to manually fix.
- [`tsd`](https://github.com/SamVerschueren/tsd) is nice, but it's not for the type layer itself.  For that matter, there are a few nice alternatives if you can integrate this into your test runner, e.g. Jest's [Expect](https://github.com/facebook/jest/blob/main/packages/expect/src/types.ts#L99) type is built into it's assertion functions.  The same goes for [`expect-type`](https://github.com/mmkal/expect-type).
- [`ts-expect`](https://github.com/TypeStrong/ts-expect) is probably the most similar currently existing thing but it is built more for things that have runtime manifestations (i.e. things that JavaScript, unlike TypeScript types).  The code in this library is already battle tested and used by lots of production projects.

### What about ESLint/TypeScript complaining of unused variables?

If you have [noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals) enabled, you can safely disable it just for your [`tsconfig.eslint.json`](https://typescript-eslint.io/linting/typed-linting/monorepos#one-root-tsconfigjson).  It can still be left on for building for production.

For ESLint, there's a more powerful way to do it which is just to turn off this specific pattern for test files:

```ts
/** @type { import('@typescript-eslint/utils').TSESLint.Linter.Config } */
const config = {
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: 'test_.*', // TypeScript type tests
            argsIgnorePattern: '_',
          },
        ],
      },
    },
  ],
};
```

### So, it looks like TypeScript has jumped the shark, eh? 🦈🌊🦈

Well.  This level of type testing isn't "for everyone".  It's largely for library authors or projects that have very powerful inferred types.

If:

- you don't use a lot of generics
- you aren't using TypeScript `strict` mode
- you use `any` a lot
- your codebase has hundreds of `// @ts-ignore` lines
- your library or project doesn't mind breaking changes at the type layer

...then this library might not be something you'd benefit from introducing.

But as we start seeing projects like Zod, where the types "working" is fully half of the entire project (or type-fest where it's the _whole_ project).. it starts to feel a little lopsided to be able to write tests and assertions about the JavaScript part, but not as much about the TypeScript part.

### Why not just pass the type to the generic of `expect`?

Depending on your testing library, you may be able to do something like this:

```ts
expect<'HELLO!!!'>(hello).toEqual('HELLO!!!');
```

This approach can work, but there are lots of libraries that operate exclusively at the type level.  They could never use such an approach because they don't have any runtime code with which to test.

You also put yourself at the mercy of the error message generated by the expect types.  With type-testing, it's quite clear that the types are wrong, and therefore much more clear what you need to fix.
