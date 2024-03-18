import { pipe, reactive, combine } from "../../reactive";

export const $counter = reactive(0);

export const inc = () => {
  $counter($counter() + 1);
};

export const $square = pipe($counter, (counter) => counter * counter);

export const $double = pipe($counter, (counter) => counter * 2);

export const $doubleSquare = pipe($double, (double) => double * double);

export const $combined = combine({
  square: $square,
  double: $double,
  string: pipe($counter, (counter) => `"${counter}"`),
});

export const $megaCombined = combine({
  combined: $combined,
  reversed: pipe($counter, (counter) => -counter),
});
