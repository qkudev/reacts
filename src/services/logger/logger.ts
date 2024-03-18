import { IdleQueue } from "../../utils/idle-queue";

export class Logger {
  private queue = new IdleQueue();
  public log(...args: unknown[]) {
    this.queue.scheduleTask(() => {
      console.log(...args);
    });
  }
}
