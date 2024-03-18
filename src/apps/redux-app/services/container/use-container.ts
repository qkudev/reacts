import { useContext } from "react";
import { SharedContainer, SharedContainerDeps } from "./container.types";
import { ContainerContext } from "./container.context";

export function useContainer(): SharedContainer;

export function useContainer<K extends keyof SharedContainerDeps>(
  key: K,
): SharedContainerDeps[typeof key];

export function useContainer<K extends keyof SharedContainerDeps>(key?: K) {
  const container = useContext(ContainerContext);
  if (!key) {
    return container;
  }

  return container.resolve(key);
}
