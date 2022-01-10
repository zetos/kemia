import test from 'ava';
import { mix, Recipe } from './index';

const rcp1: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    Dh: 1.2,
    Aw: 1,
    DhMult: 0,
  },
  multipliers: [],
};

const rcp2: Recipe = {
  base: {
    name: 'Muse Fruit',
    qtd: 1,
    Dh: 0.15,
    DhMult: 0.44,
    Aw: 1,
  },
  multipliers: [],
};

const rcp3: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    Dh: 1.2,
    Aw: 1,
    DhMult: 0,
  },
  multipliers: [
    {
      name: 'Muse Fruit',
      qtd: 1,
      Dh: 0.15,
      DhMult: 0.44,
      Aw: 1,
    },
  ],
};

const rcp4: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    Dh: 1.2,
    Aw: 1,
    DhMult: 0,
  },
  multipliers: [
    {
      name: 'Muse Fruit',
      qtd: 100,
      Dh: 0.15,
      DhMult: 0.44,
      Aw: 1,
    },
  ],
};

test('PDH of 11 Sea Dew Leaves returns 2.4', (t) => {
  t.is(mix(rcp1).pdh, 2.4);
});

test('PDH of 11 Muse Fruit returns 0.432', (t) => {
  t.is(mix(rcp2).pdh, 0.432);
});

test('PDH of 11 Sea Dew Leaves + 1 Muse Fruit returns 2.508', (t) => {
  t.is(mix(rcp3).pdh, 2.508);
});

test('PDH of 11 Sea Dew Leaves + 100 Muse Fruit returns 0.72', (t) => {
  t.is(mix(rcp4).pdh, 0.72);
});
