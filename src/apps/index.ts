import { lazy } from "react";
import { registerApp } from "../app-registry";

registerApp({
  name: "Counter",
  Component: lazy(() => import("./counter")),
});

registerApp({
  name: "Redux",
  Component: lazy(() => import("./redux-app")),
});

registerApp({
  name: "Zustand",
  Component: lazy(() => import("./zustand")),
});

registerApp({
  name: "React-Query",
  Component: lazy(() => import("./react-query")),
});

registerApp({
  name: "Recoil",
  Component: lazy(() => import("./recoil")),
});
