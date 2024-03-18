import {
  ListenerMiddlewareInstance,
  Middleware,
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isRejected,
} from "@reduxjs/toolkit";
import { SharedContainerDeps } from "../container";
import { formSlice } from "../../features/form";
import { todosSlice } from "../../features/todos";
import { AppError } from "../../utils/app-error";
import { AppComponent } from "../../utils/constants";

export const makeStore = (deps: SharedContainerDeps) => {
  const listenerMiddlewareUntyped = createListenerMiddleware({
    extra: deps,
  });

  // hack for type circular reference
  const listenerMiddleware =
    listenerMiddlewareUntyped as unknown as ListenerMiddlewareInstance<
      AppStore,
      AppDispatch,
      SharedContainerDeps
    >;

  /**
   * Error tracking listener
   */
  listenerMiddleware.startListening({
    matcher: isRejected,
    effect: (action, thunkApi) => {
      const { errorTracker } = thunkApi.extra;

      errorTracker.catch(action.error);
    },
  });

  const catchMiddleware: Middleware = () => (next) => (action) => {
    try {
      next(action);
    } catch (error) {
      const { errorTracker } = deps;
      const actionType =
        typeof action === "object" && action && "type" in action
          ? action?.type
          : "unknown";

      errorTracker.catch(
        AppError.fromError(error, AppComponent.APP, {
          component: "redux",
          action: actionType,
        }),
      );
    }
  };

  const store = configureStore({
    reducer: combineReducers({
      form: formSlice.reducer,
      todos: todosSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: deps,
        },
      })
        .prepend(listenerMiddlewareUntyped.middleware)
        .concat(catchMiddleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
