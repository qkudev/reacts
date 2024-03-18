import { Queue } from "../queue";

type Task = (() => void) | (() => Promise<void>);

export class IdleQueue {
  private running = false;
  private queue: Queue<Task> = new Queue();

  public scheduleTask(task: Task) {
    this.queue.enqueue(task);

    requestIdleCallback(this.run);
  }

  private run = async () => {
    if (this.running) {
      return;
    }
    if (!this.queue.size) {
      return;
    }

    this.running = true;
    for (const task of this.queue) {
      await task!();
    }

    this.running = false;
  };
}
