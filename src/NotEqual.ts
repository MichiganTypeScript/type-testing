/**
 * The opposite of `Equal`, will return false if the two inputs are not equal.
 */
export type NotEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? false : true;
