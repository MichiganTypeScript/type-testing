/**
 * returns `true` if the provided arguments resolve to the same TypeScript value.
 * 
 * `Equal` is the cornerstone of TypeScript type testing.
 */
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
