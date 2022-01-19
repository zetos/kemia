import { Box } from './util';

export type Ingredient = {
  readonly name: string;
  readonly qtd: number;
  readonly aw: 0 | 1;
  readonly pdh: number;
  readonly dhm: number;
  readonly pdp?: number;
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

const calcPotionUnit = (recipe: Recipe): number =>
  Box(recipe)
    .map(
      ({ base, multipliers }) =>
        base.aw * base.qtd +
        multipliers.reduce((acc, cur) => cur.aw * cur.qtd + acc, 0)
    )
    .fold((totalAW) => ((totalAW - 1) / 10) | 0);

const calcTotalDissolution = ({ base, multipliers }: Recipe) =>
  base.qtd + multipliers.reduce((acc, cur) => acc + cur.qtd, 0);

const calcTotalMultipliers = (multipliers: Ingredient[], dissolution: number) =>
  multipliers.reduce(
    (acc, cur) =>
      !acc
        ? 1 + Math.sqrt(cur.qtd / dissolution) * cur.dhm
        : acc * (1 + Math.sqrt(cur.qtd / dissolution) * cur.dhm),

    0
  );

const calcDirectHealing = (
  { base, multipliers }: Recipe,
  dissolution: number
): number => {
  const herbalismFactor = (5 / 3) * 1.2; // 2
  const multDH = multipliers.reduce(
    (acc, cur) => acc + cur.pdh * (cur.qtd / dissolution),
    0
  );

  return (
    herbalismFactor *
    ((base.pdh * base.qtd) / dissolution + multDH) *
    (1 + Math.sqrt(base.qtd / dissolution) * base.dhm)
  );
};

const mix = ({ base, multipliers }: Recipe): Potion => {
  const totalDissolution = calcTotalDissolution({ base, multipliers });

  const totalMultipliers = calcTotalMultipliers(multipliers, totalDissolution);

  const calcDH = calcDirectHealing({ base, multipliers }, totalDissolution);

  return {
    pdh: Number(
      (calcDH * (totalMultipliers ? totalMultipliers : 1)).toFixed(3)
    ),
    pu: calcPotionUnit({ base, multipliers }),
  };
};

export { mix, calcPotionUnit };
