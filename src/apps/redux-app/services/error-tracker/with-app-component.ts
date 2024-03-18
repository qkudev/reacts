import { ComponentType, FC, createElement } from "react";
import { AppComponent } from "../../utils/constants";
import { AppErrorBoundary } from "./error-boundary";
import { AppComponentContext } from "./app-component-context";

export function withAppComponent<P>(
  Component: ComponentType<P>,
  appComponent: AppComponent,
) {
  const WithAppComponent = (props: P) =>
    createElement(
      AppComponentContext.Provider,
      {
        value: appComponent,
      },
      createElement(
        AppErrorBoundary,
        { component: appComponent },
        // @ts-expect-error wtf idk
        createElement(Component as unknown as FC<P>, props),
      ),
    );

  WithAppComponent.displayName = `WithAppComponent(${appComponent})`;

  return WithAppComponent;
}
