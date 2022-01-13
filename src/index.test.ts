import test from 'ava';
import { mix, Recipe } from './index';

const rcp1: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    dh: 1.2,
    aw: 1,
    dhm: 0,
  },
  multipliers: [],
};

const rcp2: Recipe = {
  base: {
    name: 'Muse Fruit',
    qtd: 1,
    dh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
  multipliers: [],
};

const rcp3: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    dh: 1.2,
    aw: 1,
    dhm: 0,
  },
  multipliers: [
    {
      name: 'Muse Fruit',
      qtd: 1,
      dh: 0.15,
      dhm: 0.44,
      aw: 1,
    },
  ],
};

const rcp4: Recipe = {
  base: {
    name: 'Sea Dew Leaves',
    qtd: 11,
    dh: 1.2,
    aw: 1,
    dhm: 0,
  },
  multipliers: [
    {
      name: 'Muse Fruit',
      qtd: 100,
      dh: 0.15,
      dhm: 0.44,
      aw: 1,
    },
  ],
};

const rcp5: Recipe = {
  base: {
    name: 'Salvia',
    qtd: 85,
    dh: 1.8,
    aw: 1,
    dhm: 0,
  },
  multipliers: [
    {
      name: 'Muse Fruit',
      qtd: 16,
      dh: 0.15,
      dhm: 0.44,
      aw: 1,
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

test('PU of 85 Salvia + 16 Muse Fruit returns 10', (t) => {
  t.is(mix(rcp5).pu, 10);
});
