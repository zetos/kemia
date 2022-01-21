import { Box } from './util';

export type Ingredient = {
  readonly name?: string;
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

export type Potion = { pdh: number; pu: number };

const calcPotionUnit = (recipe: Ingredient[]): number =>
  Box(recipe)
    .map((ingredients) =>
      ingredients.reduce((acc, cur) => cur.aw * cur.qtd + acc, 0)
    )
    .fold((totalAW) => ((totalAW - 1) / 10) | 0);

const calcTotalDissolution = (recipe: Ingredient[]) =>
  recipe.reduce((acc, cur) => acc + cur.qtd, 0);

const calcTotalMultipliers = (recipe: Ingredient[], dissolution: number) =>
  recipe.reduce(
    (acc, cur) =>
      !acc
        ? 1 + Math.sqrt(cur.qtd / dissolution) * cur.dhm
        : acc * (1 + Math.sqrt(cur.qtd / dissolution) * cur.dhm),
    0
  );

const calcDirectHealing = (recipe: Ingredient[], dissolution: number): number =>
  Box(recipe)
    .map((rcp) =>
      rcp.reduce((acc, cur) => acc + cur.pdh * (cur.qtd / dissolution), 0)
    )
    .fold((totalDH) => (5 / 3) * 1.2 * totalDH);
//   herbalismFactor = (5 / 3) * 1.2; // 2

const mix = (recipe: Ingredient[]): Potion =>
  Box(calcTotalDissolution(recipe))
    .chain((totalDissolution) =>
      Box(calcDirectHealing(recipe, totalDissolution)).chain((totalDH) =>
        Box(calcTotalMultipliers(recipe, totalDissolution)).map((totalMult) =>
          Number((totalDH * (totalMult ? totalMult : 1)).toFixed(3))
        )
      )
    )
    .fold((pdh) => ({ pdh, pu: calcPotionUnit(recipe) }));

export { mix, calcPotionUnit };
