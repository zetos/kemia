type Recipe = {
  base: {
    qtd: number;
    name: string;
    Dh: number;
    Aw: number;
    DhMult: number;
  };
  multipliers: {
    name: string;
    qtd: number;
    Dh: number;
    DhMult: number;
    qtdPeak?: number;
    Aw: number;
  }[];
};

type Potion = { HealingPerPU: number; PU: number };

const recipe: Recipe = {
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

const mix = ({ base, multipliers }: Recipe): Potion => {
  // 15 PU - Minor Vial
  // 40 PU - Medium Vial

  const PU =
    base.Aw * base.qtd +
    multipliers.reduce((acc, cur) => cur.Aw * cur.qtd + acc, 0);

  console.log('PU:', PU);
  const loreFactor = (5 / 3) * 1.2; // 2
  const dissolution =
    base.qtd + multipliers.reduce((acc, cur) => acc + cur.qtd, 0);

  const totalMultipliers = multipliers.reduce(
    (acc, cur) => acc + (1 + Math.sqrt(cur.qtd / dissolution) * cur.DhMult),
    0
  );

  const multDH = multipliers.reduce(
    (acc, cur) => acc + cur.Dh * (cur.qtd / dissolution),
    0
  );

  console.log('multDH:', multDH);

  const calcDH = Number(
    (
      loreFactor *
      (base.Dh + multDH) *
      (base.qtd / dissolution) *
      (1 + Math.sqrt(base.qtd / dissolution) * base.DhMult)
    ).toFixed(3)
  );

  return {
    HealingPerPU: calcDH * (totalMultipliers ? totalMultipliers : 0),
    PU,
  };
};

console.log('mix:', mix(recipe));
