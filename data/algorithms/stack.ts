export class Stack<T> {
    private stack: T[];
  
    constructor() {
      this.stack = [];
    }
  
    push(item: T): void {
      this.stack.push(item);
    }
  
    pop(): T | undefined {
      return this.stack.pop();
    }
  
    isEmpty(): boolean {
      return this.stack.length === 0;
    }
  
    size(): number {
      return this.stack.length;
    }
  }
  