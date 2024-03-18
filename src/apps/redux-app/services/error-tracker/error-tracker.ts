export class ErrorTracker {
  public catch = (error: unknown) => {
    console.log(`[ERROR] `, error);
  };
}
