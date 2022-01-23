import test from 'ava';
import { Box } from './util';

const plusOne = (n: number) => n + 1;

test('Box of 8 + 1 + 1 returns 10', (t) => {
  t.is(
    Box(8)
      .map(plusOne)
      .map(plusOne)
      .fold((x) => x),
    10
  );
});
