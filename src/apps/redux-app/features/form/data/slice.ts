import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  input: string;
}

const initialState: FormState = {
  input: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
  selectors: {
    getInput: (state) => state.input,
  },
});

export const formActions = formSlice.actions;
