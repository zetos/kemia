type Ingredient = {
  readonly name: string;
  readonly qtd: number;
  readonly aw: 0 | 1;
  readonly dh: number;
  readonly dhm: number;
  readonly dp?: number;
  readonly hot?: number;
  readonly hotm?: number;
  readonly hl?: number;
  readonly hlm?: number;
  readonly pot?: number;
  readonly potm?: number;
  readonly pl?: number;
  readonly plm?: number;
  readonly a?: number;
  readonly am?: number;
};

export type Recipe = {
  base: Ingredient;
  multipliers: Ingredient[];
};

export type Potion = { pdh: number; pu: number };

const mix = ({ base, multipliers }: Recipe): Potion => {
  // 15 PU - Minor Vial
  // 40 PU - Medium Vial

  const AW =
    base.aw * base.qtd +
    multipliers.reduce((acc, cur) => cur.aw * cur.qtd + acc, 0);

  const pu = (AW / 10) % 2 ? (AW / 10) | 0 : AW / 10 - 1;

  const herbalismFactor = (5 / 3) * 1.2; // 2

  const dissolution =
    base.qtd + multipliers.reduce((acc, cur) => acc + cur.qtd, 0);

  const totalMultipliers = multipliers.reduce(
    (acc, cur) => acc + (1 + Math.sqrt(cur.qtd / dissolution) * cur.dhm),
    0
  );

  const multDH = multipliers.reduce(
    (acc, cur) => acc + cur.dh * (cur.qtd / dissolution),
    0
  );

  const calcDH =
    herbalismFactor *
    ((base.dh * base.qtd) / dissolution + multDH) *
    (1 + Math.sqrt(base.qtd / dissolution) * base.dhm);

  return {
    pdh: Number(
      (calcDH * (totalMultipliers ? totalMultipliers : 1)).toFixed(3)
    ),
    pu,
  };
};

export { mix };
