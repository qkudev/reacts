import { IdleQueue } from "src/utils/idle-queue";
import { Queue } from "src/utils/queue";

export class Analytics {
  private queue = new IdleQueue();

  private timer: NodeJS.Timeout | null = null;

  private batch: Queue<object> = new Queue();

  private storage = window.localStorage;

  private key = "@@analytics/persist";

  private debounceMs = 2000;

  constructor() {
    this.setup();

    const persisted = JSON.parse(this.storage.getItem(this.key) || "[]");
    persisted.forEach(this.sendEvent);
  }
  public event = (ev: object) => {
    this.queue.scheduleTask(() => {
      this.sendEvent({
        ...ev,
        ts: new Date().valueOf(),
      });
    });
  };

  /**
   * @param {object} ev – event that will be placed to next batch
   */
  private sendEvent = (ev: object) => {
    this.batch.enqueue(ev);

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.batchSend, this.debounceMs);
  };

  private batchSend = () => {
    if (!this.batch.size) {
      return;
    }

    console.group("[ANALYTICS]");
    while (this.batch.size) {
      console.log(this.batch.dequeue());
    }
    console.groupEnd();
  };

  private setup = () => {
    window.onbeforeunload = () => {
      this.storage.setItem(this.key, JSON.stringify([...this.batch]));
    };
  };
}
