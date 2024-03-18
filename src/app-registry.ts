import { FC, LazyExoticComponent } from "react";
import { reactive } from "./reactive";

interface MiniApp {
  name: string;
  Component: LazyExoticComponent<FC>;
}

export const appRegistry = reactive<MiniApp[]>([]);

export const registerApp = (app: MiniApp) => {
  appRegistry([...appRegistry(), app]);
};
