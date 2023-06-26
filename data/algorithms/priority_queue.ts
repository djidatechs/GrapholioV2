export class PriorityQueue<T> {
    private queue: { item: T; priority: number }[];
  
    constructor() {
      this.queue = [];
    }
  
    enqueue(item: T, priority: number): void {
      this.queue.push({ item, priority });
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue(): T | undefined {
      return this.queue.shift()?.item;
    }
  
    isEmpty(): boolean {
      return this.queue.length === 0;
    }
  
    size(): number {
      return this.queue.length;
    }
  }
  