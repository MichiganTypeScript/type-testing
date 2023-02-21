type IsUnionInternal<T, Copy = T> =
  [T] extends [never] // IsNever check
    ? false
    : T extends never // force distributivity
      ? false
      : [Copy] extends [T] // distributed union equality check
        ? false
        : true
;

/**
 * returns `true` when passed something that resolves to a union
 *
 * the following all return `true`:
 *
 * ```ts
 * IsUnion<undefined | null | void | ''>;
 * IsUnion<{ a: string } | { a: number }>;
 * IsUnion<string | number>;
 * IsUnion<'a' | 'b' | 'c' | 'd'>;
 * IsUnion<boolean>;
 * ```
 *
 * the following all return `false`:
 *
 * ```ts
 * IsUnion<string>;
 * IsUnion<{ a: string | number }>;
 * IsUnion<[string | number]>;
 * ```
 *
 * _Note_ how TypeScript treats types that resolve to a non-union.
 *
 * the following all return `false`:
 *
 * ```ts
 * IsUnion<string | never>; // resolves to `string`
 * IsUnion<string | unknown>; // resolves to `unknown`
 * IsUnion<string | any>; // resolves to `any`
 * IsUnion<string | 'a'>; // `resolves to `string`
 * IsUnion<never>; // `never` is an empty union
 * ```
 */
export type IsUnion<T> = IsUnionInternal<T>;
