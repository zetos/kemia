const pipe = <T extends unknown[], U>(
  fn1: (...args: T) => U,
  ...fns: Array<(a: U) => U>
): ((...args: T) => U) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: U) => nextFn(prevFn(value)),
    (value) => value
  );
  return (...args: T) => piped(fn1(...args));
};

const Box = <T>(arg: T) => ({
  map: <U>(fn: (x: T) => U) => Box(fn(arg)),
  fold: <U>(fn: (x: T) => U) => fn(arg),
  chain: <U>(fn: (x: T) => U) => fn(arg),
  toString: `Box(${arg})`,
});

export { pipe, Box };
