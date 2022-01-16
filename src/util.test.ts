import test from 'ava';
import { pipe, Box } from './util';

const plusOne = (n: number) => n + 1;
const toStr = (n: number) => `${n}`;

test('pipe of 33 toStr returns "33"', (t) => {
  t.is(pipe(toStr)(33), '33');
});

test('pipe of 8 + 1 + 1 + 1 + 1 + 1 returns 13', (t) => {
  t.is(pipe(plusOne, plusOne, plusOne, plusOne, plusOne)(8), 13);
});

test('Box of 8 + 1 + 1 returns 10', (t) => {
  t.is(
    Box(8)
      .map(plusOne)
      .map(plusOne)
      .fold((x) => x),
    10
  );
});
