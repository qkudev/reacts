import { Queue } from "..";

describe("queue", () => {
  it("should create queue and do FIFO", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
  });

  it("should start with initial array", () => {
    const queue = new Queue(1, 2);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
  });
});
