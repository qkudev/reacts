import { InjectionMode, asClass, asFunction, createContainer } from "awilix";
import { Shared } from "./container.types";
import { Logger } from "src/services/logger";
import { Analytics } from "src/services/analytics";
import { createHttpClient } from "src/services/http";

export const container = createContainer<Shared>({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  logger: asClass(Logger).singleton(),
  analytics: asClass(Analytics).singleton(),
  http: asFunction(createHttpClient).singleton(),
});
