import test from 'ava';
import { mix, calcPotionUnit, Ingredient } from './index';

const rcp1: Ingredient[] = [
  { name: 'Sea Dew Leaves', qtd: 11, pdh: 1.2, aw: 1, dhm: 0 },
];

const rcp2: Ingredient[] = [
  {
    name: 'Muse Fruit',
    qtd: 1,
    pdh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
];

const rcp3: Ingredient[] = [
  {
    name: 'Sea Dew Leaves',
    qtd: 11,
    pdh: 1.2,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Muse Fruit',
    qtd: 1,
    pdh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
];

const rcp4: Ingredient[] = [
  {
    name: 'Sea Dew Leaves',
    qtd: 11,
    pdh: 1.2,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Muse Fruit',
    qtd: 100,
    pdh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
];

const rcp5: Ingredient[] = [
  {
    name: 'Salvia',
    qtd: 85,
    pdh: 1.8,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Muse Fruit',
    qtd: 16,
    pdh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
];

const rcp6: Ingredient[] = [
  {
    name: 'Salvia Oil',
    qtd: 285,
    pdh: 2.1,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Argus Sponge',
    qtd: 26,
    pdh: 0,
    aw: 1,
    dhm: 0.96,
  },
  {
    name: 'Skadite',
    qtd: 26,
    pdh: 0,
    aw: 0,
    dhm: 0.96,
  },
  {
    name: 'Jadeite',
    qtd: 16,
    pdh: 0,
    aw: 0,
    dhm: 0.69,
  },
  {
    name: 'Nitre Queen Carcass',
    qtd: 16,
    pdh: 0,
    aw: 1,
    dhm: 0.69,
  },
  {
    name: 'Great Horn',
    qtd: 16,
    pdh: 0,
    aw: 0,
    dhm: 0.69,
  },
  {
    name: 'Gold',
    qtd: 16,
    pdh: 0,
    aw: 0,
    dhm: 0.69,
  },
  {
    name: 'Pirum Juice',
    qtd: 11,
    pdh: 0,
    aw: 1,
    dhm: 0.56,
  },
  {
    name: 'Electrum',
    qtd: 11,
    pdh: 0,
    aw: 0,
    dhm: 0.56,
  },
  {
    name: 'Green Jambura Juice',
    qtd: 11,
    pdh: 0,
    aw: 1,
    dhm: 0.56,
  },
  {
    name: 'Muse Fruit',
    qtd: 8,
    pdh: 0.15,
    aw: 1,
    dhm: 0.44,
  },
  {
    name: 'Green Jamburra',
    qtd: 7,
    pdh: 0,
    aw: 1,
    dhm: 0.44,
  },
  {
    name: 'Pirum',
    qtd: 7,
    pdh: 0,
    aw: 1,
    dhm: 0.44,
  },
  {
    name: 'Blood Ore',
    qtd: 7,
    pdh: 0,
    aw: 0,
    dhm: 0.44,
  },
  {
    name: 'Compact Horn',
    qtd: 7,
    pdh: 0,
    aw: 0,
    dhm: 0.44,
  },
  {
    name: 'Basileus',
    qtd: 7,
    pdh: 0,
    aw: 1,
    dhm: 0.44,
  },
];

const rcp7: Ingredient[] = [
  {
    name: 'Sea Dew Leaves',
    qtd: 321,
    pdh: 1.2,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Gold',
    qtd: 20,
    pdh: 0,
    dhm: 0.69,
    aw: 0,
  },
  {
    name: 'Pirum Juice',
    qtd: 13,
    pdh: 0,
    dhm: 0.56,
    aw: 1,
  },
  {
    name: 'Electrum',
    qtd: 13,
    pdh: 0,
    dhm: 0.56,
    aw: 0,
  },
  {
    name: 'Green Jamburra Juice',
    qtd: 13,
    pdh: 0,
    dhm: 0.56,
    aw: 1,
  },
  {
    name: 'Gamum Oil',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 1,
  },
  {
    name: 'Compact Horn',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 0,
  },
  {
    name: 'Basileus',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 1,
  },
  {
    name: 'Kyanite',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 0,
  },
  {
    name: 'Pirum',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 1,
  },
  {
    name: 'Waterstone',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 0,
  },
  {
    name: 'White Bear Carcass',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 1,
  },
  {
    name: 'Blood Ore',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 0,
  },
  {
    name: 'Green Jamburra',
    qtd: 10,
    pdh: 0,
    dhm: 0.44,
    aw: 1,
  },
  {
    name: 'Muse Fruit',
    qtd: 10,
    pdh: 0.15,
    dhm: 0.44,
    aw: 1,
  },
];

const rcp8: Ingredient[] = [
  {
    name: 'Sea Dew Leaves',
    qtd: 404,
    pdh: 1.2,
    aw: 1,
    dhm: 0,
  },
  {
    name: 'Gold',
    qtd: 16,
    pdh: 0,
    dhm: 0.69,
    aw: 0,
  },
  {
    name: 'Pirum Juice',
    qtd: 8,
    pdh: 0,
    dhm: 0.56,
    aw: 1,
  },
];

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

// 15 PU - Minor Vial
// 40 PU - Medium Vial
test('PU of 85 Salvia + 16 Muse Fruit returns 10', (t) => {
  t.is(calcPotionUnit(rcp5), 10);
});

test('PU of 10 Purified Water returns 0', (t) => {
  t.is(
    calcPotionUnit([
      {
        name: 'Purified Water',
        qtd: 10,
        pdh: 0,
        aw: 1,
        dhm: 0,
      },
    ]),
    0
  );
});

test('PU of 11 Purified Water returns 1', (t) => {
  t.is(
    calcPotionUnit([
      {
        name: 'Purified Water',
        qtd: 11,
        pdh: 0,
        aw: 1,
        dhm: 0,
      },
    ]),
    1
  );
});

test('PU of 29 Purified Water returns 2', (t) => {
  t.is(
    calcPotionUnit([
      {
        name: 'Purified Water',
        qtd: 29,
        pdh: 0,
        aw: 1,
        dhm: 0,
      },
    ]),
    2
  );
});

test('PU of 33 Purified Water returns 3', (t) => {
  t.is(
    calcPotionUnit([
      {
        name: 'Purified Water',
        qtd: 33,
        pdh: 0,
        aw: 1,
        dhm: 0,
      },
    ]),
    3
  );
});

test('PU of 40 Purified Water returns 3', (t) => {
  t.is(
    calcPotionUnit([
      {
        name: 'Purified Water',
        qtd: 40,
        pdh: 0,
        aw: 1,
        dhm: 0,
      },
    ]),
    3
  );
});

test('Potion of the recipe 6 returns { pdh: 10.617, pu: 37 }', (t) => {
  t.deepEqual(mix(rcp6), { pdh: 10.617, pu: 37 });
});

test('Potion of the recipe 7 returns { pdh: 4.289, pu: 40 }', (t) => {
  t.deepEqual(mix(rcp7), { pdh: 4.433, pu: 40 });
});

test('Potion of the recipe 8 returns { pdh: 2.764, pu: 40 }', (t) => {
  t.deepEqual(mix(rcp8), { pdh: 2.764, pu: 41 });
});
