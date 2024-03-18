import { makeTransport } from "../transport";
import { ErrorTracker } from "../error-tracker";
import { asClass, asFunction, createContainer } from "awilix";
import type { SharedContainer } from "./container.types";
import { makeStore } from "../store";

export const makeContainer = (): SharedContainer => {
  const container: SharedContainer = createContainer();

  container.register({
    http: asFunction(makeTransport).singleton(),
    errorTracker: asClass(ErrorTracker).singleton(),
    store: asFunction(makeStore),
  });

  return container;
};
