/**
 * The opposite of `Equal`, will return false if the two inputs are not equal.
 */
export type NotEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? false : true;
