type Functor<T> = {
  map: <U>(f: (y: T) => U) => Functor<U>;
  chain: <U>(f: (y: T) => Functor<U>) => Functor<U>;
  fold: <U>(f: (y: T) => U) => U;
  toString: string;
};

type Box = <T>(x: T) => Functor<T>;

const Box: Box = (arg) => ({
  map: (fn) => Box(fn(arg)),
  fold: (fn) => fn(arg),
  chain: (fn) => fn(arg),
  toString: `Box(${arg})`,
});

export { Box };
