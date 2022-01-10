export type Recipe = {
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

export type Potion = { pdh: number; pu: number };

const mix = ({ base, multipliers }: Recipe): Potion => {
  // 15 PU - Minor Vial
  // 40 PU - Medium Vial

  const AW =
    base.Aw * base.qtd +
    multipliers.reduce((acc, cur) => cur.Aw * cur.qtd + acc, 0);

  const pu = (AW / 10) % 2 ? (AW / 10) | 0 : AW / 10 - 1;

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

  const calcDH =
    loreFactor *
    ((base.Dh * base.qtd) / dissolution + multDH) *
    (1 + Math.sqrt(base.qtd / dissolution) * base.DhMult);

  const PRECISION = 1e3;

  return {
    pdh:
      Math.round(
        calcDH * (totalMultipliers ? totalMultipliers : 1) * PRECISION
      ) / PRECISION,
    pu,
  };
};

export { mix };
