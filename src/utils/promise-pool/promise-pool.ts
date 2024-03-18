import { Queue } from "../queue";

type Task = () => Promise<void>;

export const promisePool = (tasks: Task[], n: number) => {
  const queue = new Queue(...tasks);

  const run = async (): Promise<void> => {
    if (queue.isEmpty) {
      return;
    }

    return queue.dequeue()!().then(run);
  };

  return Promise.all(new Array(n).fill(null).map(run));
};
