import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppError } from "./utils/app-error";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SharedContainerDeps } from "./services";
import { AppDispatch, AppState } from "./services/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: AppError;
  extra: SharedContainerDeps;
}>();

export const useAppDispatch = useDispatch as () => AppDispatch;
export const useAppSelector = useSelector as TypedUseSelectorHook<AppState>;
