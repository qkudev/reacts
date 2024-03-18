import { Container } from "./container.types";
import { container } from "./container";
import {
  FC,
  PropsWithChildren,
  createContext,
  createElement,
  memo,
} from "react";

export const ContainerContext = createContext<Container>(
  null as unknown as Container,
);

export const ContainerProvider: FC<PropsWithChildren> = memo(({ children }) =>
  createElement(ContainerContext.Provider, { value: container }, children),
);

ContainerContext.displayName = "ContainerContextProvider";
