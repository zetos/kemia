![paracelso](./media/paracelso.jpg)

---

**Kemia** is a calculator for potion making on the game [Mortal Online 2](https://www.mortalonline2.com/). It calculates the *Potion Direct Healing* and the *Potion Units* based on the input `recipe`. Theres no recipes or ingredient information other than the public disclosed on the `index.test.ts` file, this is just a tool to help the alchemy exploration.

> **Notes:**
> - Kemia assumes that you have the *Herbology*, *Alchemy*, *Potion Making* and *Advanced Potion Making* lores at 100.
> - Only the Herbology Lore Factor is currently suported.
> - Although the calculation for the other potion properties looks to be the same only the *Potion Direct Healing* is currently suported for the lack of test examples of the other properties.

## Usage

Create a recipe containing a `Ingredient[]` with the material properties:
`qtd` the quantity of the material, 
`pdh` the *Potion Direct Healing* or the raw material,
`aw` the *Alchemical Weight* of the material, it can only be `0` or `1`,
`dhm` the *Direct Healing Multiplier* of the material.

```ts
import { mix } from 'kemia';

const recipe = [
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

mix(rcp3); // output: { pdh: 2.508, pu: 1 }

```

## References

- [Alchemy for the Masses](https://www.starvault.se/mortalforums/threads/alchemy-for-the-masses.91285/)
- [Alchemy Demystified](https://mortalonline2.com/forums/threads/alchemy-demystified.3348/)
- [Basic Alchemy Emulator](https://www.mortalonlinemap.info/emulator/alchemy.php)
