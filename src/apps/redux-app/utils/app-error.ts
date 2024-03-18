import { AppComponent } from "./constants";

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly component: AppComponent,
    public extra: Record<string, unknown> = {},
  ) {
    super(message);
  }

  public static fromError(
    error: unknown,
    component: AppComponent,
    extra: Record<string, unknown> = {},
  ) {
    if (error instanceof AppError) {
      return error;
    }
    if (error instanceof Error) {
      const appError = new AppError(error.message, component, extra);
      appError.name = error.name;
      appError.stack = error.stack;

      return appError;
    }

    return new AppError(`Unknown error: ${error}`, component, extra);
  }

  public serialize() {
    return {
      name: this.name,
      stack: this.stack,
      component: this.component,
      extra: JSON.parse(JSON.stringify(this.extra)),
    };
  }
}
