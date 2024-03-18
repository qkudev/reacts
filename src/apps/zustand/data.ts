import { create } from "zustand";

interface CounterState {
  value: number;
  inc: () => void;
}

export const useCounter = create<CounterState>((set) => ({
  value: 0,
  inc: () => {
    set((curr) => ({
      value: curr.value + 1,
    }));
  },
}));
