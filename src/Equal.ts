/**
 * returns `true` if the provided arguments resolve to the same TypeScript value.
 * 
 * `Equal` is the cornerstone of TypeScript type testing.
 */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
