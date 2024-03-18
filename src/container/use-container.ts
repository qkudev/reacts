import { useContext } from "react";
import { Container, Shared } from "./container.types";
import { ContainerContext } from "./context";

export function useContainer(): Container;
export function useContainer<K extends keyof Shared>(
  key: K,
): Shared[typeof key];
export function useContainer<K extends keyof Shared>(key?: K) {
  const container = useContext(ContainerContext);
  if (key) {
    return container.resolve(key) as Shared[typeof key];
  }

  return container;
}
