import { Stack } from "../stack";

export class Queue<T> {
  private in: Stack<T> = new Stack<T>();
  private out: Stack<T> = new Stack<T>();

  constructor(...initial: T[]) {
    this.enqueue(...initial);
  }

  public enqueue(...values: T[]) {
    this.in.push(...values);
  }

  public dequeue() {
    if (!this.out.size) {
      while (this.in.size) {
        this.out.push(this.in.pop()!);
      }
    }

    return this.out.pop();
  }

  *[Symbol.iterator]() {
    while (this.size) {
      yield this.dequeue();
    }
  }

  public get size() {
    return this.in.size + this.out.size;
  }

  public get isEmpty() {
    return !this.size;
  }
}
