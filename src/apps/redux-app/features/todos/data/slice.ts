import { SerializedError, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppError } from "src/apps/redux-app/utils/app-error";
import { AppComponent } from "src/apps/redux-app/utils/constants";
import { createAppAsyncThunk } from "src/apps/redux-app/redux-typed";
import { TodosFilter } from "./constants";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: false;
}

interface TodosState {
  byId: Record<number, Todo>;
  ids: number[];
  loading: boolean;
  error: null | SerializedError;
}

export const initialState: TodosState = {
  byId: {},
  ids: [],
  loading: false,
  error: null,
};

const serializeError = (error: unknown) =>
  AppError.fromError(error, AppComponent.TODOS).serialize();

export const fetchTodos = createAppAsyncThunk<Todo[], void>(
  "fetch",
  async (__, thunkApi) => {
    const { http } = thunkApi.extra;
    const response = await http.get("todos");

    return response.data;
  },
  {
    serializeError,
    condition: (__, thunkApi) =>
      !todosSelectors.getTodos(thunkApi.getState()).length,
  },
);

export const fetchWithError = createAppAsyncThunk<Todo[], void>(
  "fetchWithError",
  async (__, thunkApi) => {
    const { http } = thunkApi.extra;
    const response = await http.get("404-not-found");

    return response.data;
  },
  {
    serializeError,
  },
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setWithError: () => {
      throw new Error("Reducer error");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.byId = action.payload.reduce((map, todo) => {
          map[todo.id] = todo;

          return map;
        }, state.byId);
        state.ids = action.payload.map((todo) => todo.id);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getTodos: createSelector([(state: TodosState) => state.byId], (byId) =>
      Object.values(byId),
    ),
    getTodosWithFilter: createSelector(
      [
        (state: TodosState, __: TodosFilter) => state.byId,
        (__: TodosState, filter: TodosFilter) => filter,
      ],
      (byId, filter) => {
        const filters: Record<TodosFilter, (todo: Todo) => boolean> = {
          [TodosFilter.ALL]: Boolean,
          [TodosFilter.COMPLETED]: (todo) => todo.completed,
          [TodosFilter.NOT_COMPLETED]: (todo) => !todo.completed,
        };

        return Object.values(byId).filter(filters[filter]);
      },
    ),
  },
});

export const todosSelectors = todosSlice.selectors;

export const todosActions = {
  ...todosSlice.actions,
  fetch: fetchTodos,
  fetchError: fetchWithError,
};
