export const inc = (x: number) => x + 1;

type NumMulArr = number | NumMulArr[];

const isNumber = (x: unknown): x is number => typeof x === "number";

export const sum = (...arr: NumMulArr[]): number =>
  arr.reduce<number>((acc, curr) => {
    if (isNumber(curr)) {
      return acc + curr;
    }

    return acc + sum(...curr);
  }, 0);
