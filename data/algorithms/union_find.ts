export class DisjointSet<T> {
    private parent: Map<T, T>;
    private rank: Map<T, number>;
  
    constructor() {
      this.parent = new Map<T, T>();
      this.rank = new Map<T, number>();
    }
  
    makeSet(item: T): void {
      this.parent.set(item, item);
      this.rank.set(item, 0);
    }
  
    find(item: T): T {
      if (item !== this.parent.get(item)) {
        this.parent.set(item, this.find(this.parent.get(item)!));
      }
      return this.parent.get(item)!;
    }
  
    union(item1: T, item2: T): void {
      const root1 = this.find(item1);
      const root2 = this.find(item2);
  
      if (root1 === root2) return;
  
      if (this.rank.get(root1)! < this.rank.get(root2)!) {
        this.parent.set(root1, root2);
      } else if (this.rank.get(root1)! > this.rank.get(root2)!) {
        this.parent.set(root2, root1);
      } else {
        this.parent.set(root2, root1);
        this.rank.set(root1, this.rank.get(root1)! + 1);
      }
    }
  }
  