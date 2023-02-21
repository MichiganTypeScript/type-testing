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

<!-- Insert JSDoc: Equal -->

### `NotEqual`

<!-- Insert JSDoc: NotEqual -->

### `Expect`

<!-- Insert JSDoc: Expect -->

### `ExpectFalse`

<!-- Insert JSDoc: ExpectFalse -->

### `IsAny`

<!-- Insert JSDoc: IsAny -->

### `IsNever`

<!-- Insert JSDoc: IsNever -->

### `IsTuple`

<!-- Insert JSDoc: IsTuple -->

### `IsUnion`

<!-- Insert JSDoc: IsUnion -->

### `TrueCases`

<!-- Insert JSDoc: TrueCases -->

### `FalseCases`

<!-- Insert JSDoc: FalseCases -->

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
