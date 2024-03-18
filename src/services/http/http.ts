import axios from "axios";
import type { Shared } from "src/container/container.types";

export const createHttpClient = ({
  analytics,
  logger,
}: Pick<Shared, "analytics" | "logger">) => {
  const client = axios.create();
  client.interceptors.response.use((response) => {
    analytics.event({
      name: "request",
      data: {
        url: response.config.url,
      },
    });

    logger.log(`[HTTP] ${response.status} ${response.config.url}`);

    return response;
  });
};
