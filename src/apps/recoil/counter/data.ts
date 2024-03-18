import { useCallback } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const counterState = atom({
  key: "counter",
  default: 0,
});

const selectSquare = selector({
  key: "counterSquare",
  get: ({ get }) => {
    const counter = get(counterState);

    return counter * counter;
  },
});

const selectPowerOfTwo = selector({
  key: "counterPowerOfTwo",
  get: ({ get }) => {
    const counter = get(counterState);

    return Math.pow(2, counter);
  },
});

export const useCounter = () => {
  const [counter, setCounter] = useRecoilState(counterState);

  const inc = useCallback(() => {
    setCounter((current) => current + 1);
  }, [setCounter]);

  const square = useRecoilValue(selectSquare);

  const powerOfTwo = useRecoilValue(selectPowerOfTwo);

  return { counter, square, inc, powerOfTwo } as const;
};
