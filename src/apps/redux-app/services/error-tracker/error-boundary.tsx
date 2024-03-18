import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";
import { AppComponentContext } from "./app-component-context";
import { AppComponent } from "../../utils/constants";
import { SharedContainer } from "../container";
import { ContainerContext } from "../container/container.context";

interface AppErrorBoundaryProps extends PropsWithChildren {
  component: AppComponent;
}

interface AppErrorBoundaryState {
  error: null | unknown;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState,
  SharedContainer
> {
  public static contextType = ContainerContext;

  public static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  public state: AppErrorBoundaryState = {
    error: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(`[RENDER ERROR] `, error, errorInfo);
    this.setState({
      error,
    });
  }

  private handleRetry = () => {
    this.setState({
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div>
          Error.{" "}
          <button onClick={this.handleRetry} type="button">
            Retry
          </button>
        </div>
      );
    }

    return (
      <AppComponentContext.Provider value={this.props.component}>
        {this.props.children}
      </AppComponentContext.Provider>
    );
  }
}
