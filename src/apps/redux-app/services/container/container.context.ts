import { createContext } from "react";
import type { SharedContainer } from "./container.types";

export const ContainerContext = createContext<SharedContainer>(
  null as unknown as SharedContainer,
);
