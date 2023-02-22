# type-testing

> 🌱 A micro library for testing your TypeScript types.

Sometimes your project's TypeScript types really matter.  More and more often, the TypeScript types _themselves_ are a core part of the product.  But there hasn't been a good way to make sure the types don't subtly break from day to day.  That's what `type-testing` solves.

A lot of popular projects with incredible type inferencing already use this approach.  For example [Zod](https://github.com/colinhacks/zod/blob/master/src/helpers/util.ts#L2), [Tan](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/react-query/src/__tests__/useQuery.types.test.tsx#L3-L11)[Stack](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/solid-query/src/__tests__/createQuery.types.test.tsx#L3) [Query](https://github.com/TanStack/query/blob/eeec5f77bc9a703ffb6a6d283dcedada34aa3c75/packages/vue-query/src/__tests__/test-utils.ts#L54), [zustand](https://github.com/pmndrs/zustand/blob/fbfcdc54e679cf1cb6d887078b4b9b19319417e9/tests/types.test.tsx#L106), [tRPC](https://github.com/trpc/trpc/blob/main/packages/tests/server/inferenceUtils.ts#L116), [MUI](https://github.com/mui/material-ui/blob/master/packages/mui-styled-engine/src/index.d.ts#L65), [type-fest](https://github.com/sindresorhus/type-fest/blob/main/source/is-equal.d.ts#L26), [ts-reset](https://github.com/total-typescript/ts-reset/blob/main/src/tests/utils.ts#L7), and the [TypeScript Challenges](https://github.com/type-challenges/type-challenges/blob/main/utils/index.d.ts#L7) all have variants of the same code.

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

Say you have a function with an inferred type:

```ts
const shoutItOutLoud = <T extends string>(str: T) => (
  `${str.toUpperCase() as Uppercase<T>}!!!` as const
);
```

You can test the types for that function right in exactly the same place as your regular unit tests.

```ts
import { Expect, Equal } from 'type-testing';
import { shoutItOutLoud } from './shout';

describe('shoutItOudLoud', () => {
  it('has the intended API surface', () => {
    // you can test your function's inputs 🧪
    //
    // note:
    // this test will fail if anyone adds or removes an argument in the future 🔥
    type test_params = Expect<Equal<
      Parameters<typeof shoutItOutLoud>,
      [string]
    >>;

    // as well as your outputs 💩
    type test_return = Expect<Equal<
      ReturnType<typeof shoutItOutLoud>,
      `${Uppercase<string>}!!!`
    >>;

    // of course, you can test exact usages 🥷
    const hello = shoutItOutLoud('hello');
    type test_hello = Expect<Equal<typeof hello, 'HELLO!!!'>>;

    // or test inline if your runner supports it 🛼
    // (but then you may have to duplicate inputs and outputs)
    expect<'HELLO!!!'>(hello).toEqual('HELLO!!!');
  });
});
```

## :family_man_woman_girl_boy: Your New Type Testing Family

[See API Guide](./API.md)

- [`Equal`](./API.md#equal)
- [`NotEqual`](./API.md#notequal)
- [`Expect`](./API.md#expect)
- [`ExpectFalse`](./API.md#expectfalse)
- [`IsAny`](./API.md#isany)
- [`IsNever`](./API.md#isnever)
- [`IsTuple`](./API.md#istuple)
- [`IsUnion`](./API.md#isunion)
- [`TrueCases`](./API.md#truecases)
- [`FalseCases`](./API.md#falsecases)

## FAQ

### Why not just rely on explicit return types?

Lots of reasons.

1. Because a lot of times you can't.  What you ship is often an abstraction (i.e. generic), so you really need to write a specific unit test to make sure that your end users of your library have the right type experience (whether those users are external to your team or not).
1. Because being able to write these tests while you're working enables you to do [TDD](https://en.wikipedia.org/wiki/Test-driven_development) with the types themselves.  Even if you don't do full-blown 100% TDD, it's pretty useful to be able to be sure that you've got your core use-cases covered.  Then, you can refactor and improve your code with a lot more confidence.
1. Because return types [can lie](https://youtu.be/I6V2FkW1ozQ?t=439).

### Is this a new idea?

Nope!  It's been knocking around in the TypeScript community for a while, but there has yet to be someone to write tests for these types (ironically) and package them into a micro library.

### Can `Expect` and `Equal` be combined to a type `ExpectEqual`?

Unfortunately, no.  The power of this approach is that it will error at build time while being type checked.

### Where are all the aliases?

> "no API is the best API".

You may have seen a version of this code copied around that contained aliases for `Expect` like `IsTrue` and `ExpectTrue`, as well as aliases for `ExpectFalse` like `IsFalse`.  The hope is to avoid people having to learn or memorize the quirks of different assertion APIs.  This is still a pretty cutting-edge part of the TypeScript world, but if you look around, you're going to find that 98% of the time (or more!) you just need `Expect` and `Equal`.

### What about \_\_\_\_\_ other way of testing types?

You might be familiar with other projects that attempt to do something similar.  Here's a quick overview:

- [`eslint-plugin-expect-type`](https://www.npmjs.com/package/eslint-plugin-expect-type) is powerful, but relies on comments and requires ESLint.  This means that refactoring and renaming will get out of sync because the tests themselves aren't actually code.  On top of that, there's a problem with the order of unions in TypeScript not being stable from release-to-release, which causes very annoying false positive test failures that you have to manually fix.
- [`tsd`](https://github.com/SamVerschueren/tsd) is nice, but it's not for the type layer itself.  For that matter, there are a few nice alternatives if you can integrate this into your test runner, e.g. Jest's [Expect](https://github.com/facebook/jest/blob/main/packages/expect/src/types.ts#L99) type is built into it's assertion functions.  The same goes for [`expect-type`](https://github.com/mmkal/expect-type).

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
