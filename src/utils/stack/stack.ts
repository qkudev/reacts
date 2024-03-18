export class Stack<T> {
  private state: T[];

  constructor(...initial: T[]) {
    this.state = initial;
  }

  public push(...values: T[]) {
    this.state.push(...values);
  }

  public pop() {
    return this.state.pop();
  }

  public get size() {
    return this.state.length;
  }

  public get isEmpty() {
    return !this.state.length;
  }
}
