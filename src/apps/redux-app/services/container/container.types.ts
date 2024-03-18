import type { AwilixContainer } from "awilix";
import type { ErrorTracker } from "../error-tracker";
import type { HttpTransport } from "../transport";
import type { AppStore } from "../../data";

export interface SharedContainerDeps {
  http: HttpTransport;
  errorTracker: ErrorTracker;
  store: AppStore;
}

export type SharedContainer = AwilixContainer<SharedContainerDeps>;
