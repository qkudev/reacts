import { Provider } from "react-redux";
import { ContainerContext, makeContainer } from "./services";
import { App } from "./app";
import { useMemo } from "react";

export const Root = () => {
  const container = useMemo(() => makeContainer(), []);

  return (
    <ContainerContext.Provider value={container}>
      <Provider store={container.resolve("store")}>
        <App />
      </Provider>
    </ContainerContext.Provider>
  );
};
