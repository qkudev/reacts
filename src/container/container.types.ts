import { AwilixContainer } from "awilix";
import type { Logger } from "../services/logger";
import type { Analytics } from "src/services/analytics";
import type { createHttpClient } from "src/services/http";

export interface Shared {
  logger: Logger;
  analytics: Analytics;
  http: ReturnType<typeof createHttpClient>;
}

export type Container = AwilixContainer<Shared>;
